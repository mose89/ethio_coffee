import "server-only";
import config from "@payload-config";
import { cache } from "react";
import { getPayload, type Where } from "payload";
import type { Category, Media, PageContent, Post } from "@/payload-types";

export const getPayloadClient = cache(() => getPayload({ config }));

export type MediaDoc = Media;

/** Returns the populated media document, or null when the field is empty/unpopulated. */
export function asMedia(value: unknown): Media | null {
  return value && typeof value === "object" && "url" in value && (value as Media).url ? (value as Media) : null;
}

export const getPageContent = cache(async (): Promise<PageContent | null> => {
  try {
    const payload = await getPayloadClient();
    return await payload.findGlobal({ slug: "page-content", depth: 1 });
  } catch (err) {
    console.error("page-content unavailable, using built-in copy:", (err as Error).message);
    return null;
  }
});

const PUBLISHED: Where = { _status: { equals: "published" } };

export const getPublishedPosts = cache(async (opts: { category?: string; limit?: number } = {}) => {
  const payload = await getPayloadClient();
  const where: Where = opts.category ? { and: [PUBLISHED, { "categories.slug": { equals: opts.category } }] } : PUBLISHED;
  const res = await payload.find({
    collection: "posts",
    where,
    sort: "-publishedAt",
    limit: opts.limit ?? 100,
    depth: 1,
    overrideAccess: false,
  });
  return res.docs as Post[];
});

/** Published post, or (when `draft` is true and a CMS user is logged in) the latest draft. */
export async function getPost(slug: string, opts: { draft?: boolean; user?: unknown } = {}): Promise<Post | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: Boolean(opts.draft),
    overrideAccess: false,
    user: opts.user as never,
  });
  return (res.docs[0] as Post) ?? null;
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const chosen = (post.relatedPosts ?? []).filter((p): p is Post => typeof p === "object" && p?._status === "published");
  if (chosen.length) return chosen.slice(0, limit);
  const categoryIds = (post.categories ?? []).map((c) => (typeof c === "object" ? c.id : c));
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: {
      and: [PUBLISHED, { id: { not_equals: post.id } }, ...(categoryIds.length ? [{ categories: { in: categoryIds } }] : [])],
    },
    sort: "-publishedAt",
    limit,
    depth: 1,
    overrideAccess: false,
  });
  return res.docs as Post[];
}

/** Categories that have at least one published article (so we never link to empty category pages). */
export const getActiveCategories = cache(async (): Promise<(Category & { count: number })[]> => {
  const posts = await getPublishedPosts();
  const map = new Map<number | string, Category & { count: number }>();
  for (const p of posts) {
    for (const c of p.categories ?? []) {
      if (typeof c !== "object") continue;
      const entry = map.get(c.id) ?? { ...c, count: 0 };
      entry.count += 1;
      map.set(c.id, entry);
    }
  }
  return [...map.values()].sort((a, b) => a.title.localeCompare(b.title));
});

export async function getCategory(slug: string): Promise<Category | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: "categories", where: { slug: { equals: slug } }, limit: 1 });
  return (res.docs[0] as Category) ?? null;
}

/** Resolves a redirect created when an article's slug changed. */
export async function findRedirect(fromPath: string): Promise<string | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: "redirects", where: { from: { equals: fromPath } }, limit: 1, depth: 1 });
  const r = res.docs[0] as
    | { to?: { type?: string; url?: string | null; reference?: { relationTo: string; value: Post | number | string } | null } }
    | undefined;
  if (!r?.to) return null;
  if (r.to.type === "custom" && r.to.url) return r.to.url;
  const target = r.to.reference?.value;
  if (target && typeof target === "object" && target._status === "published" && target.slug) return `/resources/${target.slug}`;
  return null;
}
