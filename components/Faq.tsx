export type FaqItem = { q: string; a: React.ReactNode };

export function Faq({ items, id = "faq", title = "Questions buyers ask" }: { items: FaqItem[]; id?: string; title?: string }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className="container narrow">
        <h2 id={id}>{title}</h2>
        <div className="faq">
          {items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
