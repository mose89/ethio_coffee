export function RoleSummary() {
  return (
    <>
      <div className="role-grid">
        <div className="role-col">
          <h3>What we do</h3>
          <ul className="check-list">
            <li>Turn your needs into a clear coffee brief</li>
            <li>Match it with the right exporters in our network</li>
            <li>Gather samples, lot details and quotations</li>
            <li>Keep everything moving, from first inquiry to shipment</li>
          </ul>
        </div>
        <div className="role-col role-col-muted">
          <h3>What the exporter does</h3>
          <ul className="check-list">
            <li>Supplies the coffee and prepares it for export</li>
            <li>Handles the export licence, export documents and shipping</li>
            <li>Issues the written quotation for your order</li>
          </ul>
        </div>
      </div>
      <p className="role-note">
        Before you commit, you’ll know exactly who sells to you, who invoices you, the payment and shipping terms, and how we are
        paid.
      </p>
    </>
  );
}
