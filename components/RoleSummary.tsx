export function RoleSummary() {
  return (
    <>
      <div className="role-grid">
        <div className="role-col">
          <h3>What we do</h3>
          <ul className="check-list">
            <li>Buy directly from farmers and washing stations</li>
            <li>Process and select coffee that fits your requirements</li>
            <li>Provide lot details, quality information and samples</li>
            <li>Sell to you as a licensed Ethiopian exporter</li>
            <li>Deliver FOB Djibouti or FCA Addis Ababa, or arrange freight to you</li>
          </ul>
        </div>
        <div className="role-col role-col-muted">
          <h3>What you do</h3>
          <ul className="check-list">
            <li>Evaluate samples and confirm the coffee you want</li>
            <li>Agree the quotation and contract terms</li>
            <li>Arrange import into your country, directly or through an importer</li>
          </ul>
        </div>
      </div>
      <p className="role-note">
        Before you commit, you’ll have in writing the price, payment and shipping terms, and the documents that come with your
        shipment.
      </p>
    </>
  );
}
