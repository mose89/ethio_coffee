import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { ContactDock } from "@/components/ContactDock";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import "./globals.css";

const serif = localFont({
  src: "./fonts/fraunces-latin-wght.woff2",
  weight: "100 900",
  variable: "--font-serif",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/source-sans-3-latin-wght.woff2",
  weight: "200 900",
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Licensed Ethiopian coffee exporter. Green and roasted coffee for importers, roasters, distributors and hospitality, direct from farmers and washing stations. FOB Djibouti or FCA Addis Ababa.";

export const metadata: Metadata = {
  ...(site.siteUrl ? { metadataBase: new URL(site.siteUrl) } : {}),
  title: { default: `${site.brand}: Ethiopian green and roasted coffee for business buyers`, template: `%s | ${site.brand}` },
  description,
  applicationName: site.brand,
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: site.brand, locale: "en" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

/** Pages read CMS content on each request, so edits and publishing are live immediately. */
export const dynamic = "force-dynamic";

export const viewport: Viewport = { themeColor: "#2F5D50" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {!site.production && (
          <div className="preview-banner" role="note">
            Preview version, not yet live. Search engines are asked not to index it.
          </div>
        )}
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <ContactDock whatsappHref={site.whatsappHref} />
        <Analytics />
      </body>
    </html>
  );
}
