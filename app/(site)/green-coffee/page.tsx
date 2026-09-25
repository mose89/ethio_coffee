import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Visual } from "@/components/Visual";
import { asMedia, getPageContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/green-coffee",
  title: "Ethiopian green coffee for importers and roasters",
  description:
    "Source Ethiopian green coffee from origin. Share the region, process, grade and volume you need; we shortlist lots, arrange samples and bring you a formal offer.",
});

const REQUIREMENTS = [
  {
    field: "Origin",
    examples: "A region such as Yirgacheffe, Sidama, Guji, Limu, Jimma or Harar, or simply the cup profile you want.",
    why: "Ethiopian coffees vary enormously from one area to the next. A region or a flavour target narrows the search fast.",
  },
  {
    field: "Process",
    examples: "Washed, natural, or another method you’re looking for.",
    why: "Process shapes the cup, and availability differs from one method to another.",
  },
  {
    field: "Grade or quality level",
    examples: "An export grade (for example Grade 1 or 2), a minimum cup score under a named protocol, or your usual spec.",
    why: "It tells us which coffees to put in front of you, and which to leave out.",
  },
  {
    field: "Quantity",
    examples: "Kilos, 60 kg bags, tonnes or containers, per shipment or per year. A rough figure, or “not sure yet”, is fine.",
    why: "Volume decides which exporters and shipping options make sense.",
  },
  {
    field: "Destination",
    examples: "Country, and port if you know it.",
    why: "Routes, documents and shipping terms all depend on where the coffee is going.",
  },
  {
    field: "Timing",
    examples: "When you want the coffee shipped, or the crop you’re planning for.",
    why: "Ethiopian availability shifts through the harvest and export season.",
  },
  {
    field: "Packaging and documents",
    examples: "Bag type and liners, plus any certificates or paperwork your market or customers require.",
    why: "We confirm these with the exporter before any quotation. Nothing is assumed.",
  },
  {
    field: "Shipping terms",
    examples: "Your preferred Incoterm, if you have one (for example FOB or CIF).",
    why: "Terms are confirmed in the exporter’s quotation; knowing your preference early saves a round of emails.",
  },
];

const FAQ = [
  {
    q: "Do you have a list of available lots?",
    a: (
      <p>
        Not publicly. Ethiopian coffee is offered lot by lot and season by season, so any published list would be out of date within
        weeks. Instead, we check what’s available against your brief and share the exporter’s details for every coffee we propose.
      </p>
    ),
  },
  {
    q: "What is the minimum order for green coffee?",
    a: (
      <p>
        There’s no single minimum: it depends on the coffee, the exporter and how it ships. Tell us your rough volume, however small or
        uncertain, and we’ll tell you what’s realistic.
      </p>
    ),
  },
  {
    q: "Can I get samples before ordering?",
    a: (
      <p>
        We discuss samples for every coffee we propose. Availability, sample size and any cost depend on the exporter, and we confirm
        them with you before anything is sent.
      </p>
    ),
  },
  {
    q: "Can you supply certified coffee?",
    a: (
      <p>
        Yes, where the specific coffee holds a current certificate, and we’ll share the evidence with you. Tell us which certifications
        you need in your inquiry.
      </p>
    ),
  },
];

export default async function GreenCoffeePage() {
  const pc = (await getPageContent())?.green;
  return (
    <div className="cue-green">
      <section className="page-hero page-hero-media" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow eyebrow-cue">Green coffee</p>
            <h1 id="page-title">{pc?.heroTitle || "Ethiopian green coffee for importers and roasters"}</h1>
            <p className="lead">
              {pc?.heroIntro ||
                "Tell us the cup you’re after and the volume you need. We check what our Ethiopian exporter partners can offer this season, arrange samples, bring you a formal offer, and stay with your order all the way to shipment."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/inquiry?product=green">
                Send a green coffee inquiry
              </Link>
              <Link className="button button-outline" href="/how-it-works">
                How it works
              </Link>
            </div>
          </div>
          <Visual media={asMedia(pc?.heroImage)} fallback="green" sizes="(min-width: 960px) 40vw, 100vw" priority className="page-hero-visual" />
        </div>
      </section>

      <section className="section" aria-labelledby="who-title">
        <div className="container split">
          <div>
            <h2 id="who-title">Who we source for</h2>
          </div>
          <div className="prose">
            <ul className="check-list">
              <li>
                <strong>Importers and green coffee traders</strong> adding Ethiopian coffees to their offer lists, or looking for new
                export partners.
              </li>
              <li>
                <strong>Roasters</strong> buying from origin, or ready to start, who want one dependable contact for Ethiopia.
              </li>
              <li>
                <strong>Distributors and other trade buyers</strong> able to receive an international shipment, directly or through an importer.
              </li>
            </ul>
            <p>
              Every order ships directly from Ethiopia, so you buy at origin.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="spec-title">
        <div className="container">
          <h2 id="spec-title">Build your brief</h2>
          <p className="section-intro">
            You don’t need every answer to get started. The more you can share, the sharper our first shortlist.
          </p>
          <div className="spec-table-wrap">
            <table className="spec-table">
              <caption className="visually-hidden">Information that helps us source green coffee for you</caption>
              <thead>
                <tr>
                  <th scope="col">Detail</th>
                  <th scope="col">What to tell us</th>
                  <th scope="col">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {REQUIREMENTS.map((r) => (
                  <tr key={r.field}>
                    <th scope="row">{r.field}</th>
                    <td data-label="What to tell us">{r.examples}</td>
                    <td data-label="Why it matters">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="next-title">
        <div className="container split">
          <div>
            <h2 id="next-title">After you send your brief</h2>
          </div>
          <ol className="plain-steps">
            <li>We read it and come back with any questions.</li>
            <li>We check with the right exporters what they can offer against it.</li>
            <li>We share the lot details for each coffee that fits and arrange samples.</li>
            <li>When you’re ready, you receive a written quotation with the seller, price, payment and shipping terms.</li>
          </ol>
        </div>
      </section>

      <Faq items={FAQ} id="green-faq" />
      <CtaBand title="Ready to brief us on green coffee?" href="/inquiry?product=green" label="Send a green coffee inquiry" cue="green" />
    </div>
  );
}
