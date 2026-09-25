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
            <p className="eyebrow">Ethiopian coffee sourcing for the trade</p>
            <h1 id="hero-title">{home?.heroTitle || "Ethiopian coffee, sourced with clarity."}</h1>
            <p className="lead">
              {home?.heroIntro ||
                "Green coffee for importers and roasters. Roasted coffee for distributors and hospitality. We connect you with the right Ethiopian exporters and manage everything in between, from first samples to shipment, so you deal with one accountable contact."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/green-coffee">
                Source green coffee
              </Link>
              <Link className="button button-roasted" href="/roasted-coffee">
                Source roasted coffee
              </Link>
            </div>
            <p className="hero-note">
              Not sure which you need? <Link href="/inquiry">Tell us what you have in mind</Link>.
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
                Send your brief <span aria-hidden="true">→</span>
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
                  Share the origin, process, grade and volume you’re after. We check what’s available this season, arrange samples and
                  bring you a formal offer from the exporter.
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
                  Tell us the format, volume and market. We confirm with the supplier what can be delivered to you before anything is
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
            <h2 id="intro-title">{home?.introTitle || "Built from our own search for a reliable exporter"}</h2>
            <p>
              {home?.introText ||
                "We are Norwegians with Ethiopian roots. Finding a reliable, compliant Ethiopian exporter took us time and hard lessons, so we built a network we trust, with a co-founder on the ground in Ethiopia for the past ten years. Now we use it to help other businesses buy with confidence."}
            </p>
            <p>
              The exporter supplies and ships the coffee. We find the right lots, coordinate samples and offers, and stay with your order
              until it leaves Ethiopia.
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
              <p>New Ethiopian offers and additional export partners, through a single point of contact.</p>
            </li>
            <li className="topic">
              <h3>Roasters</h3>
              <p>Green coffee matched to your roast profile, with samples to cup before you commit.</p>
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
            sense. <Link href="/inquiry">Start an inquiry</Link>
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
