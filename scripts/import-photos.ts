/**
 * Loads photos into the CMS image library, with their source and licence, and
 * fills EMPTY photo slots in "Page content" and EMPTY article featured images.
 * Anything you have already set in the CMS is left alone. Safe to re-run.
 *
 *   npm run images:import
 *
 * 1. content/site-photos.json      photos stored in this repository (content/photos/)
 * 2. content/photo-manifest.json   licensed Unsplash candidates (needs access to unsplash.com)
 */
import fs from "node:fs";
import path from "node:path";

type LocalPhoto = {
  key: string;
  file: string;
  alt: string;
  focal?: [number, number];
  slots?: string[];
  featuredFor?: string[];
  /** Defaults: owner-supplied, illustrative. */
  credit?: string;
  license?: "own" | "permission" | "other";
  licenseNotes?: string;
  illustrative?: boolean;
};
type UnsplashPhoto = { key: string; slot?: string; unsplashId: string; pageUrl: string; photographer?: string; alt: string };

const root = process.cwd();
const readJson = <T,>(p: string): T => JSON.parse(fs.readFileSync(path.resolve(root, p), "utf8")) as T;

const { getPayload } = await import("payload");
const config = (await import("@payload-config")).default;
const payload = await getPayload({ config });

const content = (await payload.findGlobal({ slug: "page-content", depth: 0 })) as unknown as Record<string, Record<string, unknown> | undefined>;
const slotUpdates: Record<string, Record<string, number | string>> = {};

function claimSlot(slot: string, id: number | string) {
  const [group, field] = slot.split(".");
  if (content?.[group]?.[field] || slotUpdates[group]?.[field]) return;
  (slotUpdates[group] ??= {})[field] = id;
}

async function findBySource(sourceUrl: string) {
  const r = await payload.find({ collection: "media", where: { sourceUrl: { equals: sourceUrl } }, limit: 1, depth: 0 });
  return r.docs[0]?.id;
}

// 1. Photos stored in the repository
for (const p of readJson<{ photos: LocalPhoto[] }>("content/site-photos.json").photos) {
  const sourceUrl = `repo:${p.file}`;
  let id = await findBySource(sourceUrl);
  if (!id) {
    const data = fs.readFileSync(path.resolve(root, p.file));
    const doc = await payload.create({
      collection: "media",
      data: {
        alt: p.alt,
        illustrative: p.illustrative ?? true,
        credit: p.credit ?? "",
        sourceUrl,
        license: p.license ?? "other",
        // Shown publicly on /photo-credits. Photographer and licence are tracked in content/site-photos.json.
        licenseNotes: p.licenseNotes ?? "Supplied by the site owner.",
        ...(p.focal ? { focalX: p.focal[0], focalY: p.focal[1] } : {}),
      },
      file: { data, mimetype: "image/jpeg", name: path.basename(p.file), size: data.length },
    });
    id = doc.id;
    payload.logger.info(`images: imported ${p.key}`);
  }
  for (const slot of p.slots ?? []) claimSlot(slot, id);
  for (const slug of p.featuredFor ?? []) {
    const post = (await payload.find({ collection: "posts", where: { slug: { equals: slug } }, draft: true, limit: 1, depth: 0 })).docs[0];
    if (post && !post.featuredImage) {
      await payload.update({ collection: "posts", id: post.id, draft: post._status !== "published", data: { featuredImage: id } });
      payload.logger.info(`images: featured image set on “${slug}”`);
    }
  }
}

// 2. Licensed Unsplash candidates (skipped if unsplash.com is unreachable)
for (const e of readJson<{ photos: UnsplashPhoto[] }>("content/photo-manifest.json").photos) {
  try {
    let id = await findBySource(e.pageUrl);
    if (!id) {
      const res = await fetch(`https://unsplash.com/photos/${e.unsplashId}/download?force=true&w=2400`, { redirect: "follow", signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = Buffer.from(await res.arrayBuffer());
      let photographer = e.photographer;
      if (!photographer) {
        const html = await (await fetch(e.pageUrl, { signal: AbortSignal.timeout(15_000) })).text().catch(() => "");
        photographer = html.match(/Photo by ([^<|]+?) on Unsplash/i)?.[1]?.trim();
      }
      const doc = await payload.create({
        collection: "media",
        data: {
          alt: e.alt,
          illustrative: true,
          credit: photographer ? `${photographer} / Unsplash` : "Unsplash",
          sourceUrl: e.pageUrl,
          license: "unsplash",
          licenseNotes: "Unsplash License (https://unsplash.com/license). Stock photo: does not show our suppliers, facilities or team.",
        },
        file: { data, mimetype: res.headers.get("content-type") || "image/jpeg", name: `${e.key}.jpg`, size: data.length },
      });
      id = doc.id;
      payload.logger.info(`images: imported ${e.key} from Unsplash`);
    }
    if (e.slot) claimSlot(e.slot, id);
  } catch (err) {
    payload.logger.warn(`images: Unsplash photo ${e.key} skipped (${(err as Error).message})`);
  }
}

if (Object.keys(slotUpdates).length) {
  const data: Record<string, unknown> = {};
  for (const [group, fields] of Object.entries(slotUpdates)) data[group] = { ...(content?.[group] ?? {}), ...fields };
  await payload.updateGlobal({ slug: "page-content", data: data as never });
  payload.logger.info(`images: filled page photo slots ${Object.entries(slotUpdates).map(([g, f]) => Object.keys(f).map((k) => `${g}.${k}`)).flat().join(", ")}`);
}
process.exit(0);
