export function RoleSummary() {
  return (
    <>
      <div className="role-grid">
        <div className="role-col">
          <h3>What we do</h3>
          <ul className="check-list">
            <li>Understand your coffee requirement and your market</li>
            <li>Match it with suitable exporters in our Ethiopian network</li>
            <li>Gather and clarify coffee information, samples and quotations</li>
            <li>Coordinate communication with the exporter from inquiry to shipment</li>
          </ul>
        </div>
        <div className="role-col role-col-muted">
          <h3>What the exporter does</h3>
          <ul className="check-list">
            <li>Supplies the coffee and prepares it for export</li>
            <li>Handles export licensing, export documents and shipping from Ethiopia</li>
            <li>Confirms the offer for your order in a written quotation</li>
          </ul>
        </div>
      </div>
      <p className="role-note">
        Before you commit to anything, you’ll know who sells the coffee to you, who invoices you, the payment and shipping terms, and how
        we are paid.
      </p>
    </>
  );
}
