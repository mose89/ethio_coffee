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
    "Source unroasted Ethiopian coffee through our exporter network. Describe the origin, process, grade, quantity and timing you need, and we check what can be offered.",
});

const REQUIREMENTS = [
  {
    field: "Origin",
    examples: "A region you have in mind, such as Yirgacheffe, Sidama, Guji, Limu, Jimma or Harar, or “open to suggestions”.",
    why: "Ethiopian coffees vary widely by area. Naming a preference, or the cup profile you want, narrows the search quickly.",
  },
  {
    field: "Process",
    examples: "Washed, natural, or another method you are looking for.",
    why: "Processing shapes flavour, and availability differs by process.",
  },
  {
    field: "Grade or quality level",
    examples: "An Ethiopian export grade, a quality level you buy against, or your usual quality specification.",
    why: "It tells us which coffees to put in front of you, and which not to.",
  },
  {
    field: "Quantity",
    examples: "Approximate kg, 60 kg bags, tonnes or containers, per shipment or per year. “Not sure yet” is fine.",
    why: "Volume affects which exporters and shipping options are realistic.",
  },
  {
    field: "Destination",
    examples: "Country, and port if you know it.",
    why: "Shipping routes, documents and terms depend on where the coffee is going.",
  },
  {
    field: "Timing",
    examples: "When you would like the coffee shipped, or the crop you are planning for.",
    why: "Ethiopian availability changes through the season.",
  },
  {
    field: "Packaging and documents",
    examples: "Bag type or liners you need, and any certificates or paperwork your market or customers require.",
    why: "We confirm these with the exporter before any quotation, rather than assuming them.",
  },
  {
    field: "Shipping terms",
    examples: "Your preferred terms, if you have them (for example FOB or CIF).",
    why: "Terms are confirmed in the exporter’s quotation. Telling us your preference early saves a round of questions.",
  },
];

const FAQ = [
  {
    q: "Do you have a list of available lots?",
    a: (
      <p>
        Not publicly. Ethiopian coffee is offered lot by lot and season by season, so a published list goes out of date quickly. Instead,
        we check current options against your requirement and share the details the exporter provides for each coffee we propose.
      </p>
    ),
  },
  {
    q: "What is the minimum order for green coffee?",
    a: (
      <p>
        There is no single minimum. It depends on the coffee, the exporter and how it is shipped. Tell us your approximate quantity, even
        if it is small or uncertain, and we’ll tell you what is realistic.
      </p>
    ),
  },
  {
    q: "Can I get samples before ordering?",
    a: (
      <p>
        We discuss samples for every coffee we propose. Whether samples are available, their size and any cost depend on the exporter and
        are confirmed with you before anything is sent.
      </p>
    ),
  },
  {
    q: "Can you supply certified coffee?",
    a: (
      <p>
        Only where the specific coffee holds a current certification, and we’ll share the evidence with you. Tell us which certifications
        you require in your inquiry.
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
                "We help importers, roasters and other trade buyers source unroasted Ethiopian coffee through our network of Ethiopian exporters. You tell us what you need; we check what can be offered, gather the details and samples you need to decide, and coordinate the process through to the exporter’s quotation and shipment."}
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
            <h2 id="who-title">Who this is for</h2>
          </div>
          <div className="prose">
            <ul className="check-list">
              <li>
                <strong>Importers and green coffee traders</strong> adding Ethiopian coffees or looking for further Ethiopian export
                partners.
              </li>
              <li>
                <strong>Roasters</strong> buying from origin, or ready to, who want one point of contact in Ethiopia.
              </li>
              <li>
                <strong>Distributors and other trade buyers</strong> who can receive an international shipment of green coffee.
              </li>
            </ul>
            <p>
              Coffee is shipped from Ethiopia for each order. We do not hold green coffee in warehouses abroad.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="spec-title">
        <div className="container">
          <h2 id="spec-title">Describe your requirement</h2>
          <p className="section-intro">
            You don’t need every answer to get started. The more of these you can share, the more useful our first reply will be.
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
            <h2 id="next-title">What happens after you inquire</h2>
          </div>
          <ol className="plain-steps">
            <li>We review your requirement and reply with any questions.</li>
            <li>We check with suitable exporters in our network what they can offer against it.</li>
            <li>We share the coffee information the exporter provides and discuss samples.</li>
            <li>If you want to proceed, you receive a written quotation stating the seller, price, payment and shipping terms.</li>
          </ol>
        </div>
      </section>

      <Faq items={FAQ} id="green-faq" />
      <CtaBand title="Looking for Ethiopian green coffee?" href="/inquiry?product=green" label="Send a green coffee inquiry" cue="green" />
    </div>
  );
}
