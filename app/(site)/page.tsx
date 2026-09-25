import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { CtaBand } from "@/components/CtaBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Visual } from "@/components/Visual";
import { asMedia, getPageContent, getPublishedPosts } from "@/lib/cms";
import { ORG_DESCRIPTION, site } from "@/lib/site";

export const metadata = site.siteUrl
  ? { alternates: { canonical: "/" }, openGraph: { type: "website", siteName: site.brand, locale: "en", url: "/" } }
  : {};

export default async function HomePage() {
  const content = await getPageContent();
  const home = content?.home;
  const posts = (await getPublishedPosts({ limit: 3 }).catch(() => [])) ?? [];

  const jsonLd =
    site.siteUrl && site.brandName
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${site.siteUrl}/#organization`,
            name: site.brandName,
            url: `${site.siteUrl}/`,
            description: ORG_DESCRIPTION,
            ...(site.contactEmail ? { email: site.contactEmail } : {}),
            ...(site.linkedinUrl ? { sameAs: [site.linkedinUrl] } : {}),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.brandName,
            url: `${site.siteUrl}/`,
            publisher: { "@id": `${site.siteUrl}/#organization` },
          },
        ]
      : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Ethiopian coffee sourcing for business buyers</p>
            <h1 id="hero-title">{home?.heroTitle || "Source Ethiopian coffee through one clear point of contact."}</h1>
            <p className="lead">
              {home?.heroIntro ||
                "We help importers, roasters, distributors and hospitality businesses find suitable green and roasted coffee through our network of Ethiopian exporters, and coordinate each step from your first message to samples, quotation and shipment."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/green-coffee">
                Green coffee
              </Link>
              <Link className="button button-roasted" href="/roasted-coffee">
                Roasted coffee
              </Link>
            </div>
            <p className="hero-note">
              Not sure which you need? <Link href="/inquiry">Send a general inquiry</Link>.
            </p>
          </div>
          <div className="hero-media">
            <Visual media={asMedia(home?.heroImage)} fallback="cherries" sizes="(min-width: 960px) 48vw, 100vw" priority className="hero-visual" />
            <aside className="brief-card" aria-labelledby="brief-title">
              <p className="brief-kicker">Your inquiry brief</p>
              <h2 id="brief-title" className="brief-title">
                What to tell us
              </h2>
              <dl className="brief-list">
                <div>
                  <dt>Coffee</dt>
                  <dd>Green, roasted, or not sure yet</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd>Where it would be shipped</dd>
                </div>
                <div>
                  <dt>Quantity</dt>
                  <dd>Approximate, or “not sure yet”</dd>
                </div>
              </dl>
              <Link className="text-link" href="/inquiry">
                Start an inquiry <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="paths-title">
        <div className="container">
          <p className="eyebrow">Two buying paths</p>
          <h2 id="paths-title">What are you looking to source?</h2>
          <div className="paths">
            <article className="path-card path-green">
              <Visual media={asMedia(content?.green?.heroImage)} fallback="green" sizes="(min-width: 820px) 46vw, 100vw" className="path-visual" />
              <div className="path-body">
                <p className="path-label">Green coffee</p>
                <h3>Unroasted Ethiopian coffee for importers and roasters</h3>
                <p>
                  Tell us the origin, process, grade, quantity and timing you need. We check what exporters in our network can offer and
                  help you move from samples to a formal quotation.
                </p>
                <Link className="text-link" href="/green-coffee">
                  Explore green coffee <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
            <article className="path-card path-roasted">
              <Visual media={asMedia(content?.roasted?.heroImage)} fallback="roasted" sizes="(min-width: 820px) 46vw, 100vw" className="path-visual" />
              <div className="path-body">
                <p className="path-label">Roasted coffee</p>
                <h3>Roasted Ethiopian coffee for distributors, retailers and hospitality</h3>
                <p>
                  Discuss format, quantity, destination and timing with us. We confirm what can be supplied for your market before any
                  quotation.
                </p>
                <Link className="text-link" href="/roasted-coffee">
                  Explore roasted coffee <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="intro-title">
        <div className="container media-split">
          <Visual media={asMedia(home?.introImage)} fallback="highlands" sizes="(min-width: 900px) 45vw, 100vw" className="split-visual" />
          <div className="prose">
            <p className="eyebrow">About us</p>
            <h2 id="intro-title">{home?.introTitle || "A sourcing business focused only on Ethiopian coffee"}</h2>
            <p>
              {home?.introText ||
                "We work through established relationships with Ethiopian coffee exporters. Our job is to understand what your business needs, find suitable coffee in our network, and keep the process clear: who sells, what is confirmed, and what happens next."}
            </p>
            <p>
              We don’t own farms, washing stations or warehouses, and we don’t export in our own name. The coffee is supplied and exported
              by the exporter; we coordinate the sourcing on your behalf.
            </p>
            <Link className="text-link" href="/about">
              More about us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 id="process-title">From first message to shipment</h2>
            </div>
            <Link className="text-link" href="/how-it-works">
              The process in detail <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="fit-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Is this for you?</p>
            <h2 id="fit-title">Built for businesses buying Ethiopian coffee</h2>
          </div>
          <div className="prose">
            <ul className="check-list">
              <li>You buy coffee for a business: importing, roasting, distribution, retail or hospitality.</li>
              <li>You want Ethiopian coffee specifically, green or roasted.</li>
              <li>You can receive an international shipment from Ethiopia, or work with an importer who can.</li>
            </ul>
            <p>
              We don’t hold stock outside Ethiopia. If you need small quantities quickly from local stock, a local importer may suit you
              better, but tell us anyway and we’ll say honestly what’s feasible.
            </p>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" aria-labelledby="resources-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Resources</p>
                <h2 id="resources-title">Buying guides</h2>
              </div>
              <Link className="text-link" href="/resources">
                All resources <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="card-grid">
              {posts.map((p) => (
                <ArticleCard key={p.id} post={p} headingLevel={3} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
