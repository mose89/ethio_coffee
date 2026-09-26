import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy notice",
  description: "How we handle the information you send us through our website inquiry form.",
});

const LAST_UPDATED = "26 September 2026";

export default function PrivacyPage() {
  const operator = site.operatorName
    ? `${site.operatorName}${site.operatorCountry ? ` (${site.operatorCountry})` : ""}`
    : "";
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="container narrow prose legal">
        <p className="eyebrow">Legal</p>
        <h1 id="page-title">Privacy notice</h1>
        <p className="muted">Last updated {LAST_UPDATED}</p>

        <h2>Who we are</h2>
        {operator ? (
          <p>
            This website{site.brandName ? ` (${site.brandName})` : ""} is operated by {operator}, which is responsible for the personal
            information described in this notice.
            {site.contactEmail && (
              <>
                {" "}You can contact us about privacy at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
              </>
            )}
          </p>
        ) : (
          <p>The operator’s identity and contact details will be published here before this website goes live.</p>
        )}

        <h2>What we collect</h2>
        <p>When you send an inquiry, download a buyer tool or subscribe to updates, we receive the information you enter:</p>
        <ul>
          <li>your name, email address and company;</li>
          <li>the coffee type, destination country and approximate quantity you are interested in;</li>
          <li>anything you write in the message field;</li>
          <li>for downloads and updates: your business type, which download you requested, and whether you agreed to receive updates by email;</li>
          <li>the page of our website you sent the form from.</li>
        </ul>
        <p>
          Like most websites, our hosting provider processes technical information, such as your IP address and browser type, to deliver
          the website and protect it from abuse. We use your IP address briefly to limit repeated submissions. We don’t use advertising
          or analytics cookies.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>to reply to your inquiry and discuss your coffee requirement;</li>
          <li>to prepare the samples and quotations you ask for and, if you order, to arrange your contract, shipment and shipping documents;</li>
          <li>to send you the download you requested;</li>
          <li>to send you crop updates and offers by email, only if you agreed to this (you can unsubscribe at any time, by replying to any email or contacting us);</li>
          <li>to keep a record of our business communications.</li>
        </ul>
        <p>
          We process this information to take steps you request before a possible contract, to perform a contract with you, and because
          we have a legitimate interest in responding to business inquiries. We don’t sell your information or use it for unrelated marketing.
        </p>

        <h2>Who we share it with</h2>
        <ul>
          <li>
            <strong>Couriers, freight forwarders and shipping providers</strong>, when you go ahead with samples or an order. We share
            only what they need to deliver, such as your company name, delivery address and contact details. Some of these providers
            are located in Ethiopia.
          </li>
          <li>
            <strong>Service providers</strong> that run this website for us: our hosting provider
            {site.emailNotifications && ", our email delivery provider (Resend), which forwards inquiries to our inbox"}
            {site.turnstileSiteKey && ", and Cloudflare Turnstile, which helps us tell people apart from automated spam"}. They process
            the information only to provide their service and may do so in other countries.
          </li>
        </ul>

        <p>
          Part of our team is based in Ethiopia, so your information may be accessed from there to handle your inquiry or order.
        </p>

        <p>
          If you contact us on WhatsApp, WhatsApp (Meta) processes that conversation under its own privacy terms.
          {site.analyticsDomain && " We use Plausible Analytics, which measures visits without cookies and without collecting personal data."}
        </p>

        <h2>Where it is stored</h2>
        <p>
          Inquiries, downloads and subscriptions are stored in our website’s content management system on our hosting provider’s servers. Only people we authorise can
          log in to read them.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep inquiries for as long as needed to handle them and any business relationship that follows. We delete inquiries that
          don’t lead to business within 24 months.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you are, you may have the right to access, correct or delete your information, to object to or restrict how
          we use it, and to complain to your data protection authority.
          {site.contactEmail ? (
            <>
              {" "}To make a request, email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </>
          ) : (
            " To make a request, contact us using the details above."
          )}
        </p>
      </div>
    </section>
  );
}
