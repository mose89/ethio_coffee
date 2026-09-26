/** Short, verifiable reasons to trust us, shown under the hero. */
export function TrustStrip() {
  const items = [
    { title: "Licensed Ethiopian exporter", body: "You buy direct from origin" },
    { title: "Direct from farmers", body: "Estates, single farms and washing stations" },
    { title: "Team on the ground in Ethiopia", body: "Processing, samples and shipments followed up locally" },
    { title: "Shipped by sea or air", body: "FOB Djibouti or FCA Addis Ababa, freight on request" },
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
