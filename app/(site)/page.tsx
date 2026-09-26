import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { DownloadList } from "@/components/Downloads";
import { NewsletterBand } from "@/components/NewsletterBand";
import { TeamStrip } from "@/components/Team";
import { TrustStrip } from "@/components/TrustStrip";
import { CtaBand } from "@/components/CtaBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Visual } from "@/components/Visual";
import { asMedia, getDownloads, getPageContent, getPublishedPosts, getTeam } from "@/lib/cms";
import { ORG_DESCRIPTION, site } from "@/lib/site";

export const metadata = site.siteUrl
  ? { alternates: { canonical: "/" }, openGraph: { type: "website", siteName: site.brand, locale: "en", url: "/" } }
  : {};

export default async function HomePage() {
  const content = await getPageContent();
  const home = content?.home;
  const [posts, team, downloads] = await Promise.all([getPublishedPosts({ limit: 3 }).catch(() => []), getTeam(), getDownloads()]);

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
            <p className="eyebrow">Green and roasted coffee from Ethiopia</p>
            <h1 id="hero-title">{home?.heroTitle || "Ethiopian coffee for roasters, importers and distributors."}</h1>
            <p className="lead">
              {home?.heroIntro ||
                "We supply Ethiopian green coffee to importers and roasters, and roasted coffee to distributors, retailers and hospitality. Tell us the quality, quantity and destination you need, and we’ll propose suitable coffees, arrange samples and quote. One company, accountable from first sample to shipment."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/green-coffee">
                Explore green coffee
              </Link>
              <Link className="button button-roasted" href="/roasted-coffee">
                Explore roasted coffee
              </Link>
            </div>
            <p className="hero-note">
              Know what you need? <Link href="/inquiry">Request a quote</Link> or <Link href="/inquiry?request=samples">request samples</Link>.
            </p>
          </div>
          <div className="hero-media">
            <Visual media={asMedia(home?.heroImage)} fallback="cherries" sizes="(min-width: 960px) 48vw, 100vw" priority className="hero-visual" />
            <aside className="brief-card" aria-labelledby="brief-title">
              <p className="brief-kicker">Start here</p>
              <h2 id="brief-title" className="brief-title">
                Three things we need to know
              </h2>
              <dl className="brief-list">
                <div>
                  <dt>Coffee</dt>
                  <dd>Green, roasted, or undecided</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd>Country, and port if you know it</dd>
                </div>
                <div>
                  <dt>Quantity</dt>
                  <dd>A rough figure is enough</dd>
                </div>
              </dl>
              <Link className="text-link" href="/inquiry">
                Request a quote <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="section" aria-labelledby="paths-title">
        <div className="container">
          <p className="eyebrow">Two ways to buy</p>
          <h2 id="paths-title">Start with what you buy</h2>
          <div className="paths">
            <article className="path-card path-green">
              <Visual media={asMedia(content?.green?.heroImage)} fallback="green" sizes="(min-width: 820px) 46vw, 100vw" className="path-visual" />
              <div className="path-body">
                <p className="path-label">Green coffee</p>
                <h3>Green coffee for importers and roasters</h3>
                <p>
                  Share the origin, process, grade and volume you’re after. We propose suitable coffees from what’s available this
                  season, share the lot details, arrange samples and quote you directly.
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
                <h3>Roasted coffee for distributors, retailers and hospitality</h3>
                <p>
                  Tell us the format, volume and market. We confirm what we can supply for your market before anything is
                  quoted.
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
            <h2 id="intro-title">{home?.introTitle || "Built from our own search for a reliable Ethiopian supplier"}</h2>
            <p>
              {home?.introText ||
                "We are Norwegians with Ethiopian roots. Finding a reliable, compliant Ethiopian exporter took us time and hard lessons. Along the way we built strong relationships in Ethiopia, with a co-founder on the ground for the past ten years. Now we supply Ethiopian coffee ourselves, with the clarity we were looking for as buyers."}
            </p>
            <p>
              You buy from us. We select the coffee, share the product information, arrange samples, agree the quotation with you, and
              prepare and ship your order from Ethiopia.
            </p>
            <TeamStrip team={team} />
            <Link className="text-link" href="/about">
              Our story and the founders <span aria-hidden="true">→</span>
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
              See the full process <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="serve-title">
        <div className="container">
          <p className="eyebrow">Who we work with</p>
          <h2 id="serve-title">Built for the coffee trade</h2>
          <ul className="topic-grid topic-grid-4">
            <li className="topic">
              <h3>Importers and traders</h3>
              <p>Ethiopian coffees for your offer list, from one accountable supplier.</p>
            </li>
            <li className="topic">
              <h3>Roasters</h3>
              <p>Green coffee selected for your roast profile, with samples to cup where available.</p>
            </li>
            <li className="topic">
              <h3>Distributors and retailers</h3>
              <p>Green or roasted Ethiopian coffee for your own customers.</p>
            </li>
            <li className="topic">
              <h3>Hospitality</h3>
              <p>Roasted Ethiopian coffee for hotels, restaurant groups and cafés.</p>
            </li>
          </ul>
          <p className="section-note">
            Every order ships directly from Ethiopia. Large volume or small, tell us what you need and we’ll tell you honestly what makes
            sense. <Link href="/inquiry">Request a quote</Link>
          </p>
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
                All guides <span aria-hidden="true">→</span>
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

      {downloads.length > 0 && (
        <section className="section section-stone" aria-labelledby="tools-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Free buyer tools</p>
                <h2 id="tools-title">Buy Ethiopian coffee with fewer surprises</h2>
              </div>
              <Link className="text-link" href="/resources">
                All resources <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="section-intro">Practical tools we use ourselves. Free to download in exchange for your email.</p>
            <DownloadList downloads={downloads} />
          </div>
        </section>
      )}

      <NewsletterBand />
      <CtaBand />
    </>
  );
}
