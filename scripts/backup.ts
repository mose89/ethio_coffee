/**
 * Creates a timestamped backup in ./backups/<timestamp>/:
 *   - content.json    all articles (including drafts), categories, authors, image records,
 *                     redirects, page content, inquiries, leads and downloads, readable by any tool
 *   - subscribers.csv people who agreed to receive updates by email (for sending the newsletter)
 *   - articles/*.html each article as standalone HTML, easy to read or move to another system
 *   - cms.db          a consistent copy of the SQLite database (local database only)
 *   - media/          the uploaded image files
 *   - downloads/      the buyer-tool files (PDF, XLSX…)
 *
 *   npm run backup
 */
import fs from "node:fs";
import path from "node:path";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { sql } from "@payloadcms/db-sqlite";

const { getPayload } = await import("payload");
const config = (await import("@payload-config")).default;
const payload = await getPayload({ config });

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const dir = path.resolve(process.cwd(), "backups", stamp);
fs.mkdirSync(path.join(dir, "articles"), { recursive: true });

const all = async (collection: "posts" | "categories" | "authors" | "media" | "redirects" | "inquiries" | "downloads") =>
  (await payload.find({ collection, limit: 0, pagination: false, depth: 0, draft: collection === "posts" })).docs;

const posts = (await payload.find({ collection: "posts", limit: 0, pagination: false, depth: 0, draft: true })).docs;
const out = {
  exportedAt: new Date().toISOString(),
  posts,
  categories: await all("categories"),
  authors: await all("authors"),
  media: await all("media"),
  redirects: await all("redirects"),
  pageContent: await payload.findGlobal({ slug: "page-content", depth: 0 }),
  inquiries: await all("inquiries"),
  leads: (await payload.find({ collection: "leads", limit: 0, pagination: false, depth: 0, sort: "createdAt" })).docs,
  downloads: await all("downloads"),
};
fs.writeFileSync(path.join(dir, "content.json"), JSON.stringify(out, null, 2));

// Only people who ticked the consent box (or subscribed directly) may receive marketing email.
const csvCell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const subscribers = new Map<string, (typeof out.leads)[number]>();
for (const l of out.leads) if (l.marketingConsent && !subscribers.has(l.email)) subscribers.set(l.email, l);
fs.writeFileSync(
  path.join(dir, "subscribers.csv"),
  ["email,name,company,buyer_type,signed_up", ...[...subscribers.values()].map((l) =>
    [l.email, l.name, l.company, l.buyerType, l.createdAt].map(csvCell).join(","),
  )].join("\n") + "\n",
);

const esc = (v: unknown) => String(v ?? "").replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
for (const p of posts) {
  const body = convertLexicalToHTML({ data: p.content as never });
  const html = `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>${esc(p.title)}</title>
<meta name="slug" content="${esc(p.slug)}"><meta name="status" content="${esc(p._status)}"><meta name="published" content="${esc(p.publishedAt)}">
<meta name="description" content="${esc(p.excerpt)}"></head>
<body><h1>${esc(p.title)}</h1>\n${body}\n</body></html>\n`;
  fs.writeFileSync(path.join(dir, "articles", `${p.slug}.html`), html);
}

const dbUrl = process.env.DATABASE_URL || "";
if (!dbUrl || dbUrl.startsWith("file:")) {
  const target = path.join(dir, "cms.db").replace(/'/g, "''");
  await (payload.db as unknown as { drizzle: { run: (q: unknown) => Promise<unknown> } }).drizzle.run(sql.raw(`VACUUM INTO '${target}'`));
}

const mediaDir = process.env.MEDIA_DIR || path.resolve(process.cwd(), "media");
if (fs.existsSync(mediaDir)) fs.cpSync(mediaDir, path.join(dir, "media"), { recursive: true });
const downloadsDir = process.env.DOWNLOADS_DIR || path.resolve(process.cwd(), "downloads");
if (fs.existsSync(downloadsDir)) fs.cpSync(downloadsDir, path.join(dir, "downloads"), { recursive: true });

payload.logger.info(`backup: written to ${dir}`);
process.exit(0);
