/**
 * Loads the starter content into the CMS. Safe to re-run: anything that already
 * exists (matched by slug / name / file) is left alone, so your edits are kept.
 *   - categories
 *   - team members from content/team.json (with photo)
 *   - downloadable buyer tools from content/downloads/ (published)
 *   - starter articles from content/articles/*.md as DRAFTS (never published)
 *
 *   npm run seed
 */
import fs from "node:fs";
import path from "node:path";
import type { Payload } from "payload";
import { convertMarkdownToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";

const CATEGORIES = [
  { slug: "sourcing-guides", title: "Sourcing guides", description: "How to plan, specify and buy Ethiopian coffee as a business buyer." },
  { slug: "green-coffee", title: "Green coffee", description: "Guides for importers and roasters buying unroasted Ethiopian coffee." },
  { slug: "roasted-coffee", title: "Roasted coffee", description: "Guides for distributors, retailers and hospitality businesses buying roasted Ethiopian coffee." },
  { slug: "quality-samples", title: "Quality and samples", description: "Evaluating samples, quality information and communicating requirements." },
];

function parseFrontMatter(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error("Missing front matter");
  const meta: Record<string, string | string[]> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value.startsWith("[")) meta[key] = value.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    else meta[key] = value.replace(/^"(.*)"$/, "$1");
  }
  return { meta, body: m[2].trim() };
}

type Json = Record<string, unknown>;

/**
 * Markdown → Lexical. The bundled Markdown importer does not recognise tables,
 * so table blocks are converted into Lexical table nodes here.
 */
function markdownToLexical(markdown: string, editorConfig: Parameters<typeof convertMarkdownToLexical>[0]["editorConfig"]) {
  const convert = (md: string) => (convertMarkdownToLexical({ editorConfig, markdown: md }) as unknown as { root: { children: Json[] } }).root.children;
  const isRow = (l: string) => /^\|.*\|\s*$/.test(l);
  const isDivider = (l: string) => /^(\|\s*:?-+:?\s*)+\|\s*$/.test(l);
  const children: Json[] = [];
  const lines = markdown.split("\n");
  let buffer: string[] = [];
  const flush = () => {
    if (buffer.join("").trim()) children.push(...convert(buffer.join("\n")));
    buffer = [];
  };
  for (let i = 0; i < lines.length; i++) {
    if (!isRow(lines[i])) {
      buffer.push(lines[i]);
      continue;
    }
    flush();
    const rows: string[] = [];
    while (i < lines.length && isRow(lines[i])) rows.push(lines[i++]);
    i--;
    const hasHeader = rows.length > 1 && isDivider(rows[1]);
    const dataRows = rows.filter((r) => !isDivider(r));
    children.push({
      type: "table",
      version: 1,
      format: "",
      indent: 0,
      direction: null,
      children: dataRows.map((row, r) => ({
        type: "tablerow",
        version: 1,
        format: "",
        indent: 0,
        direction: null,
        children: row
          .trim()
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((cell) => ({
            type: "tablecell",
            version: 1,
            format: "",
            indent: 0,
            direction: null,
            colSpan: 1,
            rowSpan: 1,
            backgroundColor: null,
            headerState: hasHeader && r === 0 ? 1 : 0,
            children: cell.trim() ? convert(cell.trim()) : [{ type: "paragraph", version: 1, format: "", indent: 0, direction: null, textFormat: 0, textStyle: "", children: [] }],
          })),
      })),
    });
  }
  flush();
  return { root: { type: "root", version: 1, format: "", indent: 0, direction: "ltr", children } };
}

type TeamMember = {
  name: string;
  role?: string;
  bio?: string;
  highlights?: string[];
  photo?: string;
  photoAlt?: string;
  sortOrder?: number;
  showOnAbout?: boolean;
  authorOf?: string[];
};

const DOWNLOADS = [
  {
    file: "content/downloads/ethiopian-coffee-buyers-checklist.pdf",
    mimetype: "application/pdf",
    slug: "ethiopian-coffee-buyers-checklist",
    title: "The Ethiopian Coffee Buyer’s Checklist",
    description: "39 questions to put to any Ethiopian exporter or agent before you order: seller, coffee, quality evidence, samples, terms and documents.",
    format: "PDF, 3 pages",
    audience: "all" as const,
    sortOrder: 1,
  },
  {
    file: "content/downloads/sample-brief-and-evaluation-template.xlsx",
    mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    slug: "sample-brief-and-evaluation-template",
    title: "Sample brief & evaluation template",
    description: "Write a clear coffee brief, log every sample, score it consistently and send feedback a supplier can act on.",
    format: "Excel template, 4 sheets",
    audience: "green" as const,
    sortOrder: 2,
  },
];

async function seedTeam(payload: Payload) {
  const file = path.resolve(process.cwd(), "content/team.json");
  if (!fs.existsSync(file)) return;
  const { members } = JSON.parse(fs.readFileSync(file, "utf8")) as { members: TeamMember[] };
  for (const m of members) {
    const existing = await payload.find({ collection: "authors", where: { name: { equals: m.name } }, limit: 1, depth: 0 });
    let id = existing.docs[0]?.id;
    if (!id) {
      let photoId: number | undefined;
      if (m.photo && fs.existsSync(path.resolve(process.cwd(), m.photo))) {
        const data = fs.readFileSync(path.resolve(process.cwd(), m.photo));
        const media = await payload.create({
          collection: "media",
          data: { alt: m.photoAlt || m.name, illustrative: false, license: "own", sourceUrl: `repo:${m.photo}`, credit: "" },
          file: { data, mimetype: m.photo.endsWith(".webp") ? "image/webp" : "image/jpeg", name: path.basename(m.photo), size: data.length },
        });
        photoId = media.id as number;
      }
      const doc = await payload.create({
        collection: "authors",
        data: {
          name: m.name,
          slug: m.name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          role: m.role,
          bio: m.bio,
          highlights: (m.highlights ?? []).map((text) => ({ text })),
          photo: photoId,
          sortOrder: m.sortOrder ?? 10,
          showOnAbout: m.showOnAbout ?? false,
        },
      });
      id = doc.id;
      payload.logger.info(`seed: team member “${m.name}” created`);
    }
    for (const slug of m.authorOf ?? []) {
      const post = (await payload.find({ collection: "posts", where: { slug: { equals: slug } }, draft: true, limit: 1, depth: 0 })).docs[0];
      if (post && !post.author) {
        await payload.update({ collection: "posts", id: post.id, draft: post._status !== "published", data: { author: id as number } });
        payload.logger.info(`seed: “${m.name}” set as author of “${slug}”`);
      }
    }
  }
}

async function seedDownloads(payload: Payload) {
  for (const d of DOWNLOADS) {
    const existing = await payload.find({ collection: "downloads", where: { slug: { equals: d.slug } }, limit: 1, depth: 0 });
    if (existing.docs[0]) continue;
    const abs = path.resolve(process.cwd(), d.file);
    if (!fs.existsSync(abs)) continue;
    const data = fs.readFileSync(abs);
    const { file, mimetype, ...fields } = d;
    await payload.create({
      collection: "downloads",
      data: { ...fields, published: true },
      file: { data, mimetype, name: path.basename(file), size: data.length },
    });
    payload.logger.info(`seed: download “${d.title}” created`);
  }
}

export async function seed(payload: Payload) {
  const categoryIds: Record<string, number | string> = {};
  for (const c of CATEGORIES) {
    const existing = await payload.find({ collection: "categories", where: { slug: { equals: c.slug } }, limit: 1 });
    const doc = existing.docs[0] ?? (await payload.create({ collection: "categories", data: c }));
    categoryIds[c.slug] = doc.id;
  }

  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const dir = path.resolve(process.cwd(), "content/articles");
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
    const { meta, body } = parseFrontMatter(fs.readFileSync(path.join(dir, file), "utf8"));
    const slug = String(meta.slug);
    const existing = await payload.find({ collection: "posts", where: { slug: { equals: slug } }, limit: 1, draft: true });
    if (existing.docs[0]) {
      payload.logger.info(`seed: article “${slug}” already exists, skipping`);
      continue;
    }
    const content = markdownToLexical(body, editorConfig);
    await payload.create({
      collection: "posts",
      draft: true,
      data: {
        _status: "draft",
        title: String(meta.title),
        slug,
        excerpt: String(meta.excerpt),
        content: content as never,
        categories: ((meta.categories as string[]) ?? []).map((s) => categoryIds[s]).filter(Boolean) as number[],
        cta: (meta.cta as "general" | "green" | "roasted") ?? "general",
      },
    });
    payload.logger.info(`seed: created draft “${meta.title}”`);
  }
}

// `payload run scripts/seed.ts` executes this file with Payload initialised.
const { getPayload } = await import("payload");
const config = (await import("@payload-config")).default;
const payload = await getPayload({ config });
await seed(payload);
await seedTeam(payload);
await seedDownloads(payload);
payload.logger.info("seed: done");
process.exit(0);
