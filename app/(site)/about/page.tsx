import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RichContent } from "@/components/RichContent";
import { RoleSummary } from "@/components/RoleSummary";
import { Visual } from "@/components/Visual";
import { asMedia, getPageContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/about",
  title: "About us",
  description:
    "Who we are and how we work: a sourcing business focused on Ethiopian green and roasted coffee, helping international business buyers through established Ethiopian exporter relationships.",
});

const SERVE = [
  { title: "Importers and green coffee traders", body: "Looking for Ethiopian coffees or additional Ethiopian export partners." },
  { title: "Roasters", body: "Buying from origin, or preparing to, who want one clear point of contact in Ethiopia." },
  { title: "Distributors and retailers", body: "Looking to supply Ethiopian coffee, green or roasted, to their own customers." },
  { title: "Hospitality businesses", body: "Hotels, restaurant groups and others buying roasted coffee in volume." },
];

const HELP = [
  { title: "Clarifying what you need", body: "We help you turn a general interest into a clear requirement: origin, process, quality level, quantity, destination and timing." },
  { title: "Finding suitable coffee", body: "We check your requirement with suitable exporters in our network, rather than offering one company’s list." },
  { title: "Making information clear", body: "We pass on what the exporter provides, say what is confirmed and what isn’t, and ask the follow-up questions for you." },
  { title: "Coordinating samples and quotations", body: "We keep samples, feedback and quotations moving, so you can decide with the right information." },
  { title: "Following through", body: "If you order, we stay involved, coordinating communication with the exporter through to shipment." },
];

export default async function AboutPage() {
  const about = (await getPageContent())?.about;
  const portrait = asMedia(about?.founderPortrait);
  const hasStory = Boolean(about?.story?.root?.children?.length);

  return (
    <>
      <section className="page-hero page-hero-media" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow">About us</p>
            <h1 id="page-title">{about?.heroTitle || "Helping business buyers source Ethiopian coffee with confidence"}</h1>
            <p className="lead">
              {about?.heroIntro ||
                "We are a sourcing business focused only on Ethiopian coffee, green and roasted. We help international business buyers find suitable coffee through our established relationships with Ethiopian exporters, and we keep the process clear from first inquiry to shipment."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/inquiry">
                Talk to us about your requirement
              </Link>
            </div>
          </div>
          <Visual media={asMedia(about?.heroImage)} fallback="highlands" sizes="(min-width: 960px) 40vw, 100vw" priority className="page-hero-visual" />
        </div>
      </section>

      <section className="section" aria-labelledby="what-title">
        <div className="container split">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 id="what-title">Ethiopian coffee sourcing, and nothing else</h2>
          </div>
          <div className="prose">
            <p>
              We help companies outside Ethiopia source Ethiopian coffee. That includes <Link href="/green-coffee">green (unroasted) coffee</Link>{" "}
              for importers and roasters, and <Link href="/roasted-coffee">roasted coffee</Link> for distributors, retailers and hospitality
              businesses. Coffee is our only product.
            </p>
            <p>
              We work through existing relationships with Ethiopian coffee exporters. The exporter supplies and exports the coffee. Our role
              is to understand what you need, find suitable options in our network, and coordinate the sourcing process so you always know
              what has been confirmed and what happens next.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="serve-title">
        <div className="container">
          <p className="eyebrow">Whom we serve</p>
          <h2 id="serve-title">Business buyers of Ethiopian coffee</h2>
          <ul className="topic-grid topic-grid-4">
            {SERVE.map((s) => (
              <li key={s.title} className="topic">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="help-title">
        <div className="container split">
          <div>
            <p className="eyebrow">How we help</p>
            <h2 id="help-title">Navigating sourcing from Ethiopia</h2>
            <p className="muted">
              Buying from origin involves many details: grades, samples, shipping terms, documents and timing. We help you work through
              them.
            </p>
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

      {(hasStory || site.founderName || portrait) && (
        <section className="section section-stone" aria-labelledby="story-title">
          <div className={`container ${portrait ? "media-split" : "narrow"}`}>
            {portrait && <Photo media={portrait} sizes="(min-width: 900px) 40vw, 100vw" className="split-visual portrait" />}
            <div className="prose">
              <p className="eyebrow">Our story</p>
              <h2 id="story-title">{site.founderName ? `Founded by ${site.founderName}` : "Our story"}</h2>
              {site.founderBio && <p>{site.founderBio}</p>}
              {hasStory && <RichContent data={about!.story!} />}
            </div>
          </div>
        </section>
      )}

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
              <h2 id="process-title">How working with us works</h2>
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
            <h2 id="contact-title">Get in touch</h2>
          </div>
          <div className="prose">
            <p>
              The quickest way to start is the <Link href="/inquiry">inquiry form</Link>: tell us the coffee type, destination and
              approximate quantity, and we’ll reply{site.responseTime ? ` within ${site.responseTime}` : ""}.
            </p>
            {(site.contactEmail || site.whatsappHref || site.phoneHref) && (
              <ul className="contact-list">
                {site.contactEmail && (
                  <li>
                    Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                  </li>
                )}
                {site.whatsappHref && (
                  <li>
                    WhatsApp: <a href={site.whatsappHref} rel="noopener">{site.whatsappNumber}</a>
                  </li>
                )}
                {site.phoneHref && (
                  <li>
                    Phone: <a href={site.phoneHref}>{site.phoneNumber}</a>
                  </li>
                )}
              </ul>
            )}
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
