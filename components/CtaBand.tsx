import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand({
  title = "Let’s find your next Ethiopian coffee",
  href = "/inquiry",
  label = "Request a quote",
  cue,
  body,
}: {
  title?: string;
  href?: string;
  label?: string;
  cue?: "green" | "roasted";
  body?: string;
}) {
  return (
    <section className={`cta-band${cue ? ` cue-${cue}` : ""}`} aria-labelledby="cta-title">
      <div className="container cta-inner">
        <div>
          <h2 id="cta-title">{title}</h2>
          <p>
            {body ??
              `A few lines are enough to start. We reply ${site.responseTime ? `within ${site.responseTime}` : "promptly"} with questions or suitable coffees to consider.`}
          </p>
        </div>
        <Link className="button button-light" href={href}>
          {label}
        </Link>
      </div>
    </section>
  );
}
