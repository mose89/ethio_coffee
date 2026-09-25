"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="mobile-menu">
      <Link className="button button-small mobile-cta" href="/inquiry">
        Quote
      </Link>
      <button
        ref={buttonRef}
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="menu-icon" aria-hidden="true" />
        {open ? "Close" : "Menu"}
      </button>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Main" hidden={!open}>
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname?.startsWith(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/how-it-works">How it works</Link>
          </li>
          <li>
            <Link className="button button-green" href="/inquiry">
              Request a quote
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
