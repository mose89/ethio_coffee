import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{site.brand}</p>
          <p>
            Sourcing Ethiopian green and roasted coffee for international business buyers through our network of Ethiopian exporters.
            Coffee is our only product.
          </p>
          <Link className="button button-light button-small" href="/inquiry">
            Request a quote
          </Link>
        </div>
        <nav aria-label="Coffee">
          <p className="footer-heading">Coffee</p>
          <ul>
            <li><Link href="/green-coffee">Green coffee</Link></li>
            <li><Link href="/roasted-coffee">Roasted coffee</Link></li>
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="footer-heading">Company</p>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/inquiry">Contact</Link></li>
            <li><Link href="/privacy">Privacy notice</Link></li>
            <li><Link href="/photo-credits">Photo credits</Link></li>
          </ul>
        </nav>
        <div>
          <p className="footer-heading">Contact</p>
          <ul>
            <li><Link href="/inquiry">Inquiry form</Link></li>
            {site.contactEmail && <li><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></li>}
            {site.whatsappHref && <li><a href={site.whatsappHref} rel="noopener">WhatsApp: {site.whatsappNumber}</a></li>}
            {site.phoneHref && <li><a href={site.phoneHref}>{site.phoneNumber}</a></li>}
            {site.linkedinUrl && <li><a href={site.linkedinUrl} rel="noopener">LinkedIn</a></li>}
          </ul>
        </div>
      </div>
      <div className="container footer-legal">
        <p>
          © {year} {site.brand}
          {site.operatorName && <> · Operated by {site.operatorName}{site.operatorCountry && `, ${site.operatorCountry}`}</>}. We are a
          sourcing business. We do not own farms, processing facilities or warehouses, and we do not hold an export licence. Photos
          marked “illustrative” are stock images and do not show our suppliers or team.
        </p>
      </div>
    </footer>
  );
}
