/**
 * Downloads the licensed photos listed in content/photo-manifest.json,
 * uploads them to the CMS image library with their source and licence, and
 * fills empty photo slots in "Page content". Existing images (same source URL)
 * and slots you have already filled are left alone. Review every image in the
 * CMS afterwards: swap anything that doesn't fit.
 *
 *   npm run images:import
 *
 * Needs network access to unsplash.com and images.unsplash.com.
 */
import fs from "node:fs";
import path from "node:path";

type Entry = { key: string; slot?: string; unsplashId: string; pageUrl: string; photographer?: string; alt: string };

const manifest = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "content/photo-manifest.json"), "utf8")) as { photos: Entry[] };
const { getPayload } = await import("payload");
const config = (await import("@payload-config")).default;
const payload = await getPayload({ config });

async function photographerFor(e: Entry): Promise<string | undefined> {
  if (e.photographer) return e.photographer;
  try {
    const html = await (await fetch(e.pageUrl, { signal: AbortSignal.timeout(15_000) })).text();
    const m = html.match(/Photo by ([^<|]+?) on Unsplash/i);
    return m?.[1]?.trim();
  } catch {
    return undefined;
  }
}

const slotUpdates: Record<string, Record<string, number | string>> = {};
const content = (await payload.findGlobal({ slug: "page-content", depth: 0 })) as unknown as Record<string, Record<string, unknown> | undefined>;

for (const e of manifest.photos) {
  const existing = await payload.find({ collection: "media", where: { sourceUrl: { equals: e.pageUrl } }, limit: 1 });
  let id = existing.docs[0]?.id;
  if (!id) {
    const res = await fetch(`https://unsplash.com/photos/${e.unsplashId}/download?force=true&w=2400`, { redirect: "follow", signal: AbortSignal.timeout(60_000) });
    if (!res.ok) {
      payload.logger.error(`images: could not download ${e.key} (${res.status}); skipped`);
      continue;
    }
    const data = Buffer.from(await res.arrayBuffer());
    const photographer = await photographerFor(e);
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
    payload.logger.info(`images: imported ${e.key}`);
  }
  if (e.slot) {
    const [group, field] = e.slot.split(".");
    if (!content?.[group]?.[field]) (slotUpdates[group] ??= {})[field] = id;
  }
}

if (Object.keys(slotUpdates).length) {
  const data: Record<string, unknown> = {};
  for (const [group, fields] of Object.entries(slotUpdates)) data[group] = { ...(content?.[group] ?? {}), ...fields };
  await payload.updateGlobal({ slug: "page-content", data: data as never });
  payload.logger.info(`images: filled slots ${JSON.stringify(slotUpdates)}`);
}
process.exit(0);
