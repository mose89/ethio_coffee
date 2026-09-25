import { site } from "@/lib/site";

/** Short, verifiable reasons to trust us, shown under the hero. */
export function TrustStrip() {
  const items = [
    { title: "Norwegian–Ethiopian founders", body: "Business standards you expect, roots at origin" },
    { title: "Team on the ground in Ethiopia", body: "In close contact with exporters, day to day" },
    { title: "Communication in 7+ languages", body: "Clear answers, in your language" },
    ...(site.responseTime ? [{ title: `Reply within ${site.responseTime}`, body: "Questions or a first shortlist" }] : []),
  ];
  return (
    <section className="trust-strip" aria-label="Why buyers work with us">
      <ul className="container trust-list">
        {items.map((i) => (
          <li key={i.title}>
            <strong>{i.title}</strong>
            <span>{i.body}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
