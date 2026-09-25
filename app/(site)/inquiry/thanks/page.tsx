import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/inquiry/thanks",
  title: "Inquiry received",
  description: "Thank you for your inquiry.",
  noindex: true,
});

export default function ThanksPage() {
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="container narrow form-success">
        <h1 id="page-title">Thank you. Your brief is with us.</h1>
        <p>
          We’ll reply to the email address you gave{site.responseTime ? ` within ${site.responseTime}` : ""}, usually with a few questions or a
          first shortlist. If you don’t see our reply, please check your spam folder.
        </p>
        <p>
          <Link className="text-link" href="/how-it-works">
            See what happens next <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
