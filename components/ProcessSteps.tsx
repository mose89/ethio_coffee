const STEPS = [
  {
    title: "Share your brief",
    body: "Coffee type, destination and a rough volume. Add anything else you know: region, process, grade, timing.",
  },
  {
    title: "We shortlist",
    body: "We fill any gaps with a few questions, then check with the right exporters what they can offer this season.",
  },
  {
    title: "You taste before you buy",
    body: "For coffees that fit, we arrange samples where available and pass on the lot details, so you judge the coffee itself, not just a description.",
  },
  {
    title: "A clear written offer",
    body: "The quotation names the seller and sets out price, payment and shipping terms. Nothing is agreed until you say yes.",
  },
  {
    title: "We see it through",
    body: "Once you order, we keep you and the exporter in step through to shipment.",
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
