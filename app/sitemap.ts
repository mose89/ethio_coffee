import type { MetadataRoute } from "next";
import { getActiveCategories, getPublishedPosts } from "@/lib/cms";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const PATHS = ["/", "/coffees", "/green-coffee", "/roasted-coffee", "/origin-trips", "/about", "/how-it-works", "/resources", "/inquiry", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.indexable) return [];
  const [posts, categories] = await Promise.all([getPublishedPosts(), getActiveCategories()]);
  return [
    ...PATHS.map((p) => ({ url: `${site.siteUrl}${p === "/" ? "/" : p}` })),
    ...categories.map((c) => ({ url: `${site.siteUrl}/resources/category/${c.slug}` })),
    ...posts.map((p) => ({
      url: `${site.siteUrl}/resources/${p.slug}`,
      lastModified: p.contentUpdatedAt || p.publishedAt || undefined,
    })),
  ];
}
