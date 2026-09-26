import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ProcessSteps } from "@/components/ProcessSteps";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/how-it-works",
  title: "How buying Ethiopian coffee from us works",
  description:
    "From your requirements to shipment: how we, a licensed Ethiopian coffee exporter, select coffee, arrange samples, quote and ship your order FOB Djibouti or FCA Addis Ababa.",
});

const ROLES = [
  {
    party: "You, the buyer",
    does: "Shares the brief, cups the samples, accepts or declines the quotation, and arranges import into their country, directly or through an importer.",
  },
  {
    party: "Us",
    does: "Buys directly from farmers and washing stations, processes and selects suitable coffee, provides product information and samples, sells the coffee to you under our Ethiopian export licence, and delivers it FOB Djibouti or FCA Addis Ababa.",
  },
  {
    party: "Shipping and logistics providers",
    does: "Carry the coffee onwards under the agreed terms. You can book the freight yourself, or we can arrange it for you.",
  },
];

const FAQ = [
  {
    q: "Will I buy from you, or from another exporter?",
    a: (
      <p>
        From us. We are a licensed Ethiopian coffee exporter: we sell the coffee to you and ship it from Ethiopia, so you’re not handed
        over to another company partway through. Your quotation, contract and invoice come from us.
      </p>
    ),
  },
  {
    q: "Who will I contract with and pay?",
    a: (
      <p>
        With us. Before you commit, our written quotation sets out the price, payment terms and shipping terms for your order, and the
        agreed terms are confirmed in your contract.
      </p>
    ),
  },
  {
    q: "Does every order follow the same steps?",
    a: (
      <p>
        Not always. Some buyers want samples of every lot; others reorder a coffee they already know. Payment timing and shipping terms
        are agreed for each order and set out in the quotation.
      </p>
    ),
  },
  {
    q: "Which shipping terms do you offer?",
    a: (
      <p>
        FOB Djibouti for sea freight, and FCA Addis Ababa Bole International Airport for air freight. If you’d like the coffee delivered
        to your port or airport, we can arrange the freight and include it in the quotation.
      </p>
    ),
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
    a: <p>No. Each order is prepared and shipped directly from Ethiopia.</p>,
  },
  {
    q: "What happens after I send an inquiry?",
    a: (
      <p>
        We read it and reply{site.responseTime ? ` within ${site.responseTime}` : ""}, usually with a few questions. Then we check what we
        can offer against your brief and come back with options, or an honest answer if we can’t help.
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
          <h1 id="page-title">How buying from us works</h1>
          <p className="lead">
            Five steps from your requirements to shipment, with one accountable company throughout. Here’s what happens, who does what,
            and the questions buyers ask most.
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
              <caption className="visually-hidden">Responsibilities of the buyer, our company and logistics providers</caption>
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
