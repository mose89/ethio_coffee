import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RoleSummary } from "@/components/RoleSummary";
import { ORG_DESCRIPTION, site } from "@/lib/site";

export const metadata = site.siteUrl
  ? { alternates: { canonical: "/" }, openGraph: { type: "website", siteName: site.brand, locale: "en", url: "/" } }
  : {};

export default function HomePage() {
  const jsonLd = site.siteUrl && site.brandName
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
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Ethiopian coffee sourcing for business buyers</p>
            <h1 id="hero-title">Source Ethiopian coffee through one clear point of contact.</h1>
            <p className="lead">
              We help importers, roasters, distributors and hospitality businesses find suitable green and roasted coffee through our
              network of Ethiopian exporters, and we coordinate each step from your first message to samples, quotation and shipment.
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/green-coffee/">
                Green coffee
              </Link>
              <Link className="button button-roasted" href="/roasted-coffee/">
                Roasted coffee
              </Link>
            </div>
            <p className="hero-note">
              Not sure which you need? <Link href="/inquiry/">Send a general inquiry</Link>.
            </p>
          </div>

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
                <dd>The country it would be shipped to</dd>
              </div>
              <div>
                <dt>Quantity</dt>
                <dd>An approximate figure, or “not sure yet”</dd>
              </div>
              <div>
                <dt>Requirements</dt>
                <dd>Region, process, grade, format, timing: whatever you know</dd>
              </div>
            </dl>
            <p className="brief-foot">
              We reply{site.responseTime ? ` within ${site.responseTime}` : ""} with questions or next steps.
            </p>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="paths-title">
        <div className="container">
          <p className="eyebrow">Two buying paths</p>
          <h2 id="paths-title">What are you looking to source?</h2>
          <div className="paths">
            <article className="path-card path-green">
              <p className="path-label">Green coffee</p>
              <h3>Unroasted Ethiopian coffee for importers and roasters</h3>
              <p>
                Tell us the origin, process, grade, quantity and timing you need. We check what exporters in our network can offer and
                help you move from samples to a formal quotation.
              </p>
              <Link className="text-link" href="/green-coffee/">
                Explore green coffee <span aria-hidden="true">→</span>
              </Link>
            </article>
            <article className="path-card path-roasted">
              <p className="path-label">Roasted coffee</p>
              <h3>Roasted Ethiopian coffee for distributors, retailers and hospitality</h3>
              <p>
                Discuss format, quantity, destination and timing with us. We confirm what can be supplied for your market before any
                quotation.
              </p>
              <Link className="text-link" href="/roasted-coffee/">
                Explore roasted coffee <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="fit-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Is this for you?</p>
            <h2 id="fit-title">Built for businesses buying Ethiopian coffee</h2>
          </div>
          <div className="prose">
            <p>We work with trade buyers, not individual consumers. You are likely to be a good fit if:</p>
            <ul className="check-list">
              <li>you buy coffee for a business: importing, roasting, distribution, retail or hospitality;</li>
              <li>you want Ethiopian coffee specifically, green or roasted;</li>
              <li>you can receive an international shipment from Ethiopia, or work with an importer who can.</li>
            </ul>
            <p>
              We don’t hold stock outside Ethiopia. If you need small quantities quickly from local stock, a local importer may suit you
              better, but tell us anyway and we’ll say honestly what’s feasible.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2 id="process-title">From first message to shipment</h2>
          <ProcessSteps />
          <p className="section-link">
            <Link className="text-link" href="/how-it-works/">
              Read how we work in detail <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="role-title">
        <div className="container">
          <p className="eyebrow">Our role</p>
          <h2 id="role-title">A sourcing business, clear about what we do</h2>
          <RoleSummary />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
