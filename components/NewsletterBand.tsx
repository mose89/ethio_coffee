import { NewsletterForm } from "./LeadForms";

export function NewsletterBand() {
  return (
    <section className="newsletter-band" aria-labelledby="newsletter-title">
      <div className="container newsletter-inner">
        <div>
          <p className="eyebrow eyebrow-light">Ethiopia crop updates</p>
          <h2 id="newsletter-title">Plan your next buy with news from origin</h2>
          <p>Harvest progress, shipment timing and current offers, straight from our team in Ethiopia. Occasional, useful, never spam.</p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
