const STEPS = [
  {
    title: "Share your requirements",
    body: "Coffee type, quality, destination and a rough volume. Add anything else you know: region, process, grade, timing.",
  },
  {
    title: "We select suitable coffee",
    body: "We fill any gaps with a few questions, then propose coffees that fit from what’s available this season.",
  },
  {
    title: "Samples",
    body: "We share the lot details and quality information, and arrange samples where available, so you judge the coffee itself, not just a description.",
  },
  {
    title: "Quotation and agreement",
    body: "Our written quotation sets out price, payment and shipping terms. Nothing is agreed until you confirm, and the agreed terms are put in writing.",
  },
  {
    title: "Order preparation and shipment",
    body: "We prepare your order for export and keep you informed until it ships from Ethiopia.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="steps">
      {STEPS.map((step, i) => (
        <li key={step.title} className="step">
          <span className="step-number" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
