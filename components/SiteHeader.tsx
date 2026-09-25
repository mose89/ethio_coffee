import Link from "next/link";
import { BeanMark } from "./BeanMark";
import { NavLink } from "./NavLink";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label={`${site.brand}, home`}>
          <BeanMark className="brand-mark" />
          <span className="brand-name">{site.brand}</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <ul>
            <li>
              <NavLink href="/green-coffee/">Green coffee</NavLink>
            </li>
            <li>
              <NavLink href="/roasted-coffee/">Roasted coffee</NavLink>
            </li>
            <li>
              <NavLink href="/how-it-works/">How it works</NavLink>
            </li>
            <li className="nav-cta">
              <NavLink href="/inquiry/" className="button button-small">
                Send an inquiry
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
