import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/inquiry/thanks/",
  title: "Inquiry received",
  description: "Thank you for your inquiry.",
  noindex: true,
});

export default function ThanksPage() {
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="container narrow form-success">
        <h1 id="page-title">Thank you. We’ve received your inquiry.</h1>
        <p>
          We’ll reply to the email address you gave{site.responseTime ? ` within ${site.responseTime}` : ""}, usually with a few questions
          about your requirement. Please check your spam folder if you don’t see our reply.
        </p>
        <p>
          <Link className="text-link" href="/how-it-works/">
            Read how the process works <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
