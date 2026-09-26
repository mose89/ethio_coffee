import Link from "next/link";
import type { Media } from "@/payload-types";
import { Photo } from "./Photo";

/** Full-width photograph from origin with a quote. Without a photo it falls back to a dark band. */
export function OriginBand({
  media,
  quote,
  cite,
  links,
}: {
  media: Media | null;
  quote: string;
  cite: string;
  links?: { href: string; label: string }[];
}) {
  return (
    <section className={`origin-band${media ? "" : " origin-band-plain"}`} aria-label="From origin">
      {media && <Photo media={media} sizes="100vw" className="origin-band-photo" showCredit={false} />}
      <div className="container origin-band-inner">
        <figure className="origin-quote">
          <blockquote>
            <p>{quote}</p>
          </blockquote>
          <figcaption>{cite}</figcaption>
        </figure>
        {links && links.length > 0 && (
          <div className="origin-links">
            {links.map((l) => (
              <Link key={l.href} className="text-link text-link-light" href={l.href}>
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      {media?.credit && <span className="photo-credit origin-band-credit">Photo: {media.credit}</span>}
    </section>
  );
}
