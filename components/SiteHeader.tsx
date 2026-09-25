import Link from "next/link";
import { BeanMark } from "./BeanMark";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { site } from "@/lib/site";

export const NAV = [
  { href: "/green-coffee", label: "Green coffee" },
  { href: "/roasted-coffee", label: "Roasted coffee" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About us" },
];

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
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
            <li className="nav-cta">
              <NavLink href="/inquiry" className="button button-small">
                Request a quote
              </NavLink>
            </li>
          </ul>
        </nav>
        <MobileMenu items={NAV} />
      </div>
    </header>
  );
}
