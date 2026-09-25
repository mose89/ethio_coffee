import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { missingForProduction, site } from "./lib/site";

if (site.production && missingForProduction.length) {
  throw new Error(
    `SITE_ENV=production but site.config.json is missing: ${missingForProduction.join(", ")}. ` +
      "Refusing to build a public site with incomplete business identity.",
  );
}

const turnstile = site.turnstileSiteKey ? " https://challenges.cloudflare.com" : "";
const analytics = site.analyticsDomain ? " https://plausible.io" : "";

// Public website CSP. Next.js injects small inline bootstrapping scripts and font styles, hence 'unsafe-inline'.
const siteCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${turnstile}${analytics}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${analytics}`,
  `frame-src ${turnstile ? turnstile.trim() : "'none'"}`,
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
].join("; ");

const common = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // CMS uploads are served by Payload from /api/media/file/…
    localPatterns: [{ pathname: "/api/media/file/**", search: "" }, { pathname: "/**", search: "" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/:path*", headers: common },
      {
        // Public pages (everything except the CMS admin and its API).
        source: "/((?!admin|api/(?!inquiry)).*)",
        headers: [
          { key: "Content-Security-Policy", value: siteCsp },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          ...(site.indexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "X-Frame-Options", value: "SAMEORIGIN" }] },
      { source: "/preview/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
