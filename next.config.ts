import type { NextConfig } from "next";
import { missingForProduction, site } from "./lib/site";

if (site.production && missingForProduction.length) {
  throw new Error(
    `SITE_ENV=production but site.config.json is missing: ${missingForProduction.join(", ")}. ` +
      "Refusing to build a public site with incomplete business identity.",
  );
}

const turnstile = site.turnstileSiteKey ? " https://challenges.cloudflare.com" : "";

// Next.js injects small inline bootstrapping scripts and font styles, hence 'unsafe-inline'.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${turnstile}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  `frame-src ${turnstile ? turnstile.trim() : "'none'"}`,
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(site.indexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
