/**
 * Creates the starter categories and loads the starter articles in
 * content/articles/*.md into the CMS as DRAFTS (never published).
 * Safe to re-run: existing categories and articles (by slug) are left alone.
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
payload.logger.info("seed: done");
process.exit(0);
