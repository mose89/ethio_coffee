import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const PATHS = ["/", "/green-coffee/", "/roasted-coffee/", "/how-it-works/", "/inquiry/", "/privacy/"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return PATHS.map((p) => ({ url: `${site.siteUrl}${p}` }));
}
