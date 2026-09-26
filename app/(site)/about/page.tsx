import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RichContent } from "@/components/RichContent";
import { RoleSummary } from "@/components/RoleSummary";
import { TeamGrid } from "@/components/Team";
import { Visual } from "@/components/Visual";
import { asMedia, getPageContent, getTeam } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/about",
  title: "About us: a Scandinavian–Ethiopian coffee exporter",
  description:
    "A licensed Ethiopian coffee exporter founded by Norwegians with Ethiopian roots, joined by coffee expert Seife Tuuloskorpi and his company Seife’s. Green and roasted coffee, direct from origin.",
});

const WHY = [
  {
    title: "Direct from origin",
    body: "A licensed Ethiopian exporter buying directly from farmers, washing stations and estates, with processing and export preparation in our own hands.",
  },
  {
    title: "On the ground in Ethiopia",
    body: "Our operations leader has lived in Ethiopia for ten years. Samples, questions and shipments are followed up locally, not from a distance.",
  },
  {
    title: "Coffee expertise",
    body: "Through Seife Tuuloskorpi and Seife’s, years in Ethiopian green coffee and more than SEK 100 million in coffee revenue since 2018.",
  },
  {
    title: "Both sides of the trade",
    body: "Scandinavian business standards and Ethiopian roots, communication in more than seven languages, and clear answers in terms that fit your market.",
  },
];

const HELP = [
  { title: "A clear brief", body: "We help you turn “we’d like Ethiopian coffee” into a precise brief: origin, process, quality, volume, destination and timing." },
  { title: "The right coffee", body: "We propose coffees that fit your brief from what’s available this season, and tell you plainly when nothing fits." },
  { title: "Clear product information", body: "Lot details, quality information and the evidence behind them, with a plain statement of what is confirmed and what isn’t." },
  { title: "Samples and quotations, on track", body: "We arrange samples where available and quote in writing, so you decide on facts, not guesswork." },
  { title: "One accountable company", body: "Once you order, we process and prepare it for export, deliver it FOB Djibouti or FCA Addis Ababa, and arrange freight if you need it." },
];

export default async function AboutPage() {
  const [content, team] = await Promise.all([getPageContent(), getTeam()]);
  const about = content?.about;
  const hasStory = Boolean(about?.story?.root?.children?.length);

  const jsonLd =
    site.siteUrl && site.brandName && team.length
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${site.siteUrl}/#organization`,
          name: site.brandName,
          url: `${site.siteUrl}/`,
          founder: team.map((p) => ({ "@type": "Person", name: p.name, ...(p.role ? { jobTitle: p.role } : {}) })),
        }
      : null;

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />}
      <section className="page-hero page-hero-media" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow">About us</p>
            <h1 id="page-title">{about?.heroTitle || "We went looking for a reliable exporter. Then we became one."}</h1>
            <p className="lead">
              {about?.heroIntro ||
                "Finding a reliable, compliant Ethiopian exporter took us time and hard lessons. Today we are a licensed exporter ourselves, buying directly from farmers and washing stations, with the clarity and follow-through we wanted as buyers."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/inquiry">
                Request a quote
              </Link>
              {site.whatsappHref && (
                <a className="button button-outline" href={site.whatsappHref} target="_blank" rel="noopener">
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
          <Visual media={asMedia(about?.heroImage)} fallback="highlands" sizes="(min-width: 960px) 40vw, 100vw" priority className="page-hero-visual" />
        </div>
      </section>

      <section className="section" aria-labelledby="story-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="story-title">From a hard search to our own export company</h2>
          </div>
          <div className="prose story">
            {hasStory ? (
              <RichContent data={about!.story!} />
            ) : (
              <>
                <p>
                  We are Norwegians with Ethiopian roots, so we know Ethiopian coffee from both sides: the culture it comes from, and the
                  standards international buyers expect.
                </p>
                <p>
                  When we set out to source Ethiopian coffee ourselves, we learned how hard it is to find an exporter that is both reliable
                  and fully compliant: quality that matches the sample, paperwork that is right first time, and communication you can count
                  on. It took time, persistence and a presence on the ground.
                </p>
                <p>
                  So we built the relationships we had been looking for. One of us has lived in Ethiopia for the past ten years and built
                  an extensive network there; the other brings more than a decade in international trade, logistics, quality control and
                  sales. Together, we learned what separates dependable Ethiopian supply from a difficult one, and we became a licensed
                  Ethiopian coffee exporter ourselves.
                </p>
                <p>
                  Then we joined forces with Seife Tuuloskorpi. Born in Ethiopia and raised in Sweden, Seife founded Seife’s in 2018, an
                  Ethiopian green coffee business that has since generated more than SEK 100 million in revenue. Seife’s operations and
                  relationships at origin, from washing stations to single farms and estates, are now becoming part of our company.
                </p>
                <p className="story-emphasis">
                  Together, we buy directly from the people who grow the coffee, process and prepare it ourselves, and sell it to you as one
                  accountable company.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section section-stone" aria-labelledby="team-title">
          <div className="container">
            <p className="eyebrow">The team</p>
            <h2 id="team-title">The people you’ll work with</h2>
            <TeamGrid team={team} />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="why-title">
        <div className="container">
          <p className="eyebrow">Why buyers work with us</p>
          <h2 id="why-title">What makes us different</h2>
          <ul className="topic-grid topic-grid-4">
            {WHY.map((w) => (
              <li key={w.title} className="topic">
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ul>
          <p className="section-note">
            As a licensed Ethiopian coffee exporter, we sell to you directly: your quotation, contract and invoice come from us, and we
            remain accountable for the agreed sale through to shipment.
          </p>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="help-title">
        <div className="container split">
          <div>
            <p className="eyebrow">How we help</p>
            <h2 id="help-title">Buying from Ethiopia, made straightforward</h2>
            <p className="muted">Grades, samples, shipping terms, documents and timing. We guide you through each of them.</p>
          </div>
          <ol className="help-list">
            {HELP.map((h) => (
              <li key={h.title}>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="role-title">
        <div className="container">
          <p className="eyebrow">Our role</p>
          <h2 id="role-title">Who does what</h2>
          <RoleSummary />
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Process</p>
              <h2 id="process-title">Working with us, step by step</h2>
            </div>
            <Link className="text-link" href="/how-it-works">
              Full process and FAQs <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="section" aria-labelledby="contact-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Talk to us</h2>
          </div>
          <div className="prose">
            <p>
              The quickest way to start is our <Link href="/inquiry">inquiry form</Link>. Tell us the coffee type, destination and a rough
              volume, and we’ll reply{site.responseTime ? ` within ${site.responseTime}` : ""}. Prefer to chat? Message us on WhatsApp.
            </p>
            <ul className="contact-list">
              {site.contactEmail && (
                <li>
                  Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                </li>
              )}
              {site.whatsappHref && (
                <li>
                  WhatsApp:{" "}
                  <a href={site.whatsappHref} target="_blank" rel="noopener">
                    {site.whatsappNumber}
                  </a>
                </li>
              )}
              {site.phoneHref && (
                <li>
                  Phone: <a href={site.phoneHref}>{site.phoneNumber}</a>
                </li>
              )}
            </ul>
            {site.operatorName && (
              <p className="muted">
                {site.brandName || "This website"} is operated by {site.operatorName}
                {site.operatorCountry ? `, ${site.operatorCountry}` : ""}.
              </p>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
