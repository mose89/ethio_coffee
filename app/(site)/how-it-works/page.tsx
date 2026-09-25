import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ProcessSteps } from "@/components/ProcessSteps";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/how-it-works",
  title: "How sourcing Ethiopian coffee with us works",
  description:
    "Our role as an Ethiopian coffee sourcing business, what happens after you inquire, and who does what between you, us and the Ethiopian exporter.",
});

const ROLES = [
  {
    party: "You, the buyer",
    does: "Shares the brief, cups the samples, accepts or declines the quotation, and arranges import into their country, directly or through an importer.",
  },
  {
    party: "Us",
    does: "Sharpens the brief, matches it with the right exporters, gathers lot details, samples and quotations, and keeps everyone in step through to shipment.",
  },
  {
    party: "The Ethiopian exporter",
    does: "Supplies, prepares and exports the coffee, and issues the quotation stating the seller, invoicing, payment and shipping terms.",
  },
];

const FAQ = [
  {
    q: "Do you export the coffee yourselves?",
    a: (
      <p>
        No. We’re a sourcing business: the coffee is supplied and exported by Ethiopian exporters in our network, who hold the export
        licences. Our role is to find the right coffee for you and manage the process on your behalf.
      </p>
    ),
  },
  {
    q: "Who will I contract with and pay?",
    a: (
      <p>
        It’s always set out in writing before you commit. The quotation states who sells the coffee to you, who invoices you, and the
        payment and shipping terms.
      </p>
    ),
  },
  {
    q: "How are you paid?",
    a: <p>We tell you how we’re compensated for your order before you commit to it. No surprises.</p>,
  },
  {
    q: "Why don’t you publish prices?",
    a: (
      <p>
        Green coffee prices move with the market and differ by lot, volume and shipping terms. Rather than publish figures that are out of
        date the week after, we quote current prices for your specific brief.
      </p>
    ),
  },
  {
    q: "Do you hold stock outside Ethiopia?",
    a: <p>No. Each order is sourced and shipped directly from Ethiopia.</p>,
  },
  {
    q: "What happens after I send an inquiry?",
    a: (
      <p>
        We read it and reply{site.responseTime ? ` within ${site.responseTime}` : ""}, usually with a few questions. Then we check your
        brief with the right exporters and come back with options, or an honest answer if we can’t help.
      </p>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container narrow">
          <p className="eyebrow">How it works</p>
          <h1 id="page-title">How sourcing with us works</h1>
          <p className="lead">
            Five steps from first message to shipment, with one point of contact throughout. Here’s what happens, who does what, and the
            questions buyers ask most.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <h2 id="steps-title">Five steps to your coffee</h2>
          <ProcessSteps />
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="roles-title">
        <div className="container">
          <h2 id="roles-title">Who does what</h2>
          <div className="spec-table-wrap">
            <table className="spec-table roles-table">
              <caption className="visually-hidden">Responsibilities of the buyer, the sourcing business and the exporter</caption>
              <thead>
                <tr>
                  <th scope="col">Party</th>
                  <th scope="col">Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r) => (
                  <tr key={r.party}>
                    <th scope="row">{r.party}</th>
                    <td data-label="Responsibilities">{r.does}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Faq items={FAQ} id="how-faq" />
      <CtaBand />
    </>
  );
}
