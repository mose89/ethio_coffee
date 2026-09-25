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
    "A sourcing business dedicated to Ethiopian green and roasted coffee. We connect international trade buyers with established Ethiopian exporters and manage the process from brief to shipment.",
});

const SERVE = [
  { title: "Importers and green traders", body: "Adding Ethiopian coffees to their offer, or looking for new export partners." },
  { title: "Roasters", body: "Buying from origin, or ready to start, with one dependable contact for Ethiopia." },
  { title: "Distributors and retailers", body: "Supplying Ethiopian coffee, green or roasted, to their own customers." },
  { title: "Hospitality", body: "Hotels, restaurant groups and cafés serving Ethiopian coffee." },
];

const HELP = [
  { title: "A clear brief", body: "We help you turn “we’d like Ethiopian coffee” into a precise brief: origin, process, quality, volume, destination and timing." },
  { title: "More than one exporter’s list", body: "We check your brief with the right exporters in our network, not just a single company’s offer." },
  { title: "Straight answers", body: "We pass on what the exporter provides, say plainly what is confirmed and what isn’t, and chase the follow-up questions for you." },
  { title: "Samples and offers, on track", body: "We keep samples, feedback and quotations moving, so you decide on facts, not guesswork." },
  { title: "Follow-through", body: "Once you order, we stay involved, keeping you and the exporter in step through to shipment." },
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
            <h1 id="page-title">{about?.heroTitle || "Your partner for sourcing Ethiopian coffee"}</h1>
            <p className="lead">
              {about?.heroIntro ||
                "We’re a sourcing business dedicated to Ethiopian coffee, green and roasted. Through established relationships with Ethiopian exporters, we help international buyers find the right coffee, and we keep every step clear from first inquiry to shipment."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/inquiry">
                Tell us what you’re looking for
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
            <h2 id="what-title">Ethiopian coffee, and nothing else</h2>
          </div>
          <div className="prose">
            <p>
              We help businesses around the world buy Ethiopian coffee: <Link href="/green-coffee">green coffee</Link> for importers and
              roasters, and <Link href="/roasted-coffee">roasted coffee</Link> for distributors, retailers and hospitality. Coffee is our only
              product, and Ethiopia our only origin.
            </p>
            <p>
              We work through established relationships with Ethiopian coffee exporters. They supply and export the coffee; we make sure it’s
              the right coffee for you, and that the path from first sample to shipment is clear, with no surprises about who does what.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="serve-title">
        <div className="container">
          <p className="eyebrow">Whom we serve</p>
          <h2 id="serve-title">Built for the coffee trade</h2>
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
              Buying from origin means grades, samples, shipping terms, documents and timing. We guide you through each of them.
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
            <h2 id="contact-title">Get in touch</h2>
          </div>
          <div className="prose">
            <p>
              The quickest way to start is our <Link href="/inquiry">inquiry form</Link>. Tell us the coffee type, destination and a rough
              volume, and we’ll reply{site.responseTime ? ` within ${site.responseTime}` : ""}.
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
