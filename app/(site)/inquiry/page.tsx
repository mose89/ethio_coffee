import { InquiryForm } from "@/components/InquiryForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/inquiry",
  title: "Send an Ethiopian coffee inquiry",
  description:
    "Tell us which Ethiopian coffee you need (green or roasted), where it is going and roughly how much. We reply with questions or next steps.",
});

export default function InquiryPage() {
  return (
    <section className="section inquiry-section" aria-labelledby="page-title">
      <div className="container inquiry-grid">
        <div className="inquiry-intro">
          <p className="eyebrow">Inquiry</p>
          <h1 id="page-title">Tell us what you’re looking for</h1>
          <p className="lead">
            A few details are enough to start. You don’t need a full specification. We’ll help you work it out.
          </p>
          <h2 className="h-small">What happens next</h2>
          <ol className="plain-steps">
            <li>We read your inquiry and reply{site.responseTime ? ` within ${site.responseTime}` : ""}, usually with a few questions.</li>
            <li>We check your requirement with suitable exporters in our Ethiopian network.</li>
            <li>We come back with options and next steps, or tell you honestly if we can’t help.</li>
          </ol>
          {(site.contactEmail || site.whatsappHref || site.phoneHref) && (
            <div className="direct-contact">
              <h2 className="h-small">Prefer to write directly?</h2>
              <ul>
                {site.contactEmail && <li><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></li>}
                {site.whatsappHref && <li><a href={site.whatsappHref} rel="noopener">WhatsApp: {site.whatsappNumber}</a></li>}
                {site.phoneHref && <li><a href={site.phoneHref}>{site.phoneNumber}</a></li>}
              </ul>
            </div>
          )}
        </div>
        <div className="form-card">
          <InquiryForm contactEmail={site.contactEmail} responseTime={site.responseTime} turnstileSiteKey={site.turnstileSiteKey} />
        </div>
      </div>
    </section>
  );
}
