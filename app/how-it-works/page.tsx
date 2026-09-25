import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RoleSummary } from "@/components/RoleSummary";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/how-it-works/",
  title: "How sourcing Ethiopian coffee with us works",
  description:
    "Our role as an Ethiopian coffee sourcing business, what happens after you inquire, and who does what between you, us and the Ethiopian exporter.",
});

const ROLES = [
  {
    party: "You, the buyer",
    does: "Share your requirement, evaluate information and samples, decide whether to accept a quotation, and arrange import in your country (directly or through your importer).",
  },
  {
    party: "Us",
    does: "Clarify your requirement, match it with suitable exporters in our network, gather information, samples and quotations, and coordinate communication through to shipment.",
  },
  {
    party: "The Ethiopian exporter",
    does: "Supplies and exports the coffee. The quotation states the seller, invoicing, payment and shipping terms for your order.",
  },
];

const FAQ = [
  {
    q: "Do you export the coffee yourselves?",
    a: (
      <p>
        No. We are a sourcing business. The coffee is supplied and exported by Ethiopian exporters in our network. We don’t own farms,
        washing stations, processing facilities or warehouses, and we don’t hold an export licence.
      </p>
    ),
  },
  {
    q: "Who will I contract with and pay?",
    a: (
      <p>
        It depends on the coffee and the exporter, and it is always stated in writing before you commit: the quotation sets out who sells
        the coffee to you, who invoices you, and the payment and shipping terms.
      </p>
    ),
  },
  {
    q: "How are you paid?",
    a: <p>We explain how we are compensated for your order before you commit to it.</p>,
  },
  {
    q: "Why don’t you publish prices?",
    a: (
      <p>
        Coffee prices and availability change through the season and differ by lot, quantity and shipping terms. Rather than publish
        figures that may be out of date, we confirm current options and prices for your specific requirement.
      </p>
    ),
  },
  {
    q: "Do you hold stock outside Ethiopia?",
    a: <p>No. Coffee is sourced and shipped from Ethiopia for each order.</p>,
  },
  {
    q: "What happens after I send an inquiry?",
    a: (
      <p>
        We review it and reply{site.responseTime ? ` within ${site.responseTime}` : ""}, usually with a few questions. Then we check your
        requirement with suitable exporters and come back with options or an honest answer if we can’t help.
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
          <h1 id="page-title">How sourcing Ethiopian coffee with us works</h1>
          <p className="lead">
            We are a sourcing business focused only on Ethiopian coffee. We connect international business buyers with exporters in our
            Ethiopian network, and we coordinate the process so you have clear information and one point of contact from first inquiry to
            shipment.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <h2 id="steps-title">The process, step by step</h2>
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

      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <p className="eyebrow">About us</p>
          <h2 id="about-title">{site.brandName ? `About ${site.brandName}` : "About us"}</h2>
          {site.founderName && (
            <div className="founder prose">
              <p className="founder-name">{site.founderName}, founder</p>
              {site.founderBio && <p>{site.founderBio}</p>}
            </div>
          )}
          <RoleSummary />
        </div>
      </section>

      <Faq items={FAQ} id="how-faq" />
      <CtaBand />
    </>
  );
}
