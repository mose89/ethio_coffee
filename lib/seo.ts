import type { Metadata } from "next";
import { site } from "./site";

/** Per-page metadata. Canonical and og:url are emitted only once the real domain is configured. */
export function pageMetadata({ path, title, description, noindex = false }: { path: string; title: string; description: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    ...(site.siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: { type: "website", siteName: site.brand, locale: "en", title, description, ...(site.siteUrl ? { url: path } : {}) },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
