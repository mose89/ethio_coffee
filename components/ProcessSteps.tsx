const STEPS = [
  {
    title: "Tell us what you need",
    body: "Use the inquiry form or email us: coffee type, destination, approximate quantity and any requirements you already know.",
  },
  {
    title: "We clarify and check",
    body: "We review your requirement, ask about anything missing, and check with suitable exporters in our network what they can offer.",
  },
  {
    title: "Samples and details",
    body: "When a coffee looks suitable, we discuss samples and pass on the information the exporter provides, so you can judge it before committing.",
  },
  {
    title: "Written quotation",
    body: "You receive a quotation that sets out the seller, price, payment terms and shipping terms. You decide whether to proceed.",
  },
  {
    title: "Follow-through",
    body: "If you order, we stay involved, coordinating communication with the exporter through to shipment.",
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
