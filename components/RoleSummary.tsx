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
          <h3>What we don’t do</h3>
          <ul className="cross-list">
            <li>Own farms, washing stations or processing facilities</li>
            <li>Hold stock or run warehouses, in Ethiopia or abroad</li>
            <li>Hold an export licence or export coffee in our own name</li>
            <li>Publish prices or availability that may be out of date</li>
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
