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
  title: "About us: Norwegian–Ethiopian coffee sourcing",
  description:
    "Founded by Norwegians with Ethiopian roots, with a team on the ground in Ethiopia. We built a network of reliable, compliant Ethiopian exporters, and now help other businesses source with confidence.",
});

const WHY = [
  {
    title: "Both sides of the trade",
    body: "Norwegian business standards and Ethiopian roots. We understand what international buyers expect, and how things work at origin.",
  },
  {
    title: "On the ground in Ethiopia",
    body: "Our operations leader has lived in Ethiopia for ten years. Samples, questions and shipments are followed up locally, not from a distance.",
  },
  {
    title: "A network we trust",
    body: "Exporters we know, chosen because they deliver: reliable quality, correct paperwork, communication you can count on.",
  },
  {
    title: "Your language, your market",
    body: "Communication in more than seven languages, and experience from more than eleven countries. You get clear answers, in terms that fit your market.",
  },
];

const HELP = [
  { title: "A clear brief", body: "We help you turn “we’d like Ethiopian coffee” into a precise brief: origin, process, quality, volume, destination and timing." },
  { title: "The right exporters", body: "We check your brief with exporters in our network who fit it, not just a single company’s offer list." },
  { title: "Straight answers", body: "We pass on what the exporter provides, say plainly what is confirmed and what isn’t, and chase the follow-up questions for you." },
  { title: "Samples and offers, on track", body: "We keep samples, feedback and quotations moving, so you decide on facts, not guesswork." },
  { title: "Follow-through", body: "Once you order, we stay involved, keeping you and the exporter in step through to shipment." },
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
            <h1 id="page-title">{about?.heroTitle || "We built the exporter network we wish we’d had"}</h1>
            <p className="lead">
              {about?.heroIntro ||
                "Finding a reliable, compliant Ethiopian exporter took us time and hard lessons. Today we have a network we trust, and we use it to help other businesses source Ethiopian coffee with confidence."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/inquiry">
                Tell us what you’re looking for
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
            <h2 id="story-title">From a hard search to a trusted network</h2>
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
                  So we built the network we had been looking for. One of us has lived in Ethiopia for the past ten years and built an
                  extensive network there; the other brings more than a decade in international trade, logistics, quality
                  control and sales. Together, we got to know exporters personally and learned which ones deliver.
                </p>
                <p className="story-emphasis">
                  Now we put that network to work for other businesses, so you get the right Ethiopian coffee without the years of searching
                  it took us.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section section-stone" aria-labelledby="team-title">
          <div className="container">
            <p className="eyebrow">The founders</p>
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
            We don’t publish our exporter partners’ names. We introduce the right exporter when we propose a coffee, and every quotation
            states exactly who sells to you.
          </p>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="help-title">
        <div className="container split">
          <div>
            <p className="eyebrow">How we help</p>
            <h2 id="help-title">Buying from origin, made straightforward</h2>
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
