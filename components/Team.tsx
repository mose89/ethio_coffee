import Image from "next/image";
import type { Author, Media } from "@/payload-types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ person, size }: { person: Author; size: "sm" | "lg" }) {
  const photo = person.photo && typeof person.photo === "object" ? (person.photo as Media) : null;
  return (
    <div className={`avatar avatar-${size}`}>
      {photo?.url ? (
        <Image
          src={photo.url.split("?")[0]}
          alt={photo.alt || person.name}
          fill
          sizes={size === "lg" ? "(min-width: 800px) 280px, 60vw" : "56px"}
          style={{ objectFit: "cover", objectPosition: `${photo.focalX ?? 50}% ${photo.focalY ?? 35}%` }}
        />
      ) : (
        <span aria-hidden="true">{initials(person.name)}</span>
      )}
    </div>
  );
}

export function TeamGrid({ team }: { team: Author[] }) {
  if (!team.length) return null;
  return (
    <div className="team-grid">
      {team.map((p) => (
        <article key={p.id} className="team-card">
          <Avatar person={p} size="lg" />
          <div className="team-body">
            <h3>{p.name}</h3>
            {p.role && <p className="team-role">{p.role}</p>}
            {p.bio && <p>{p.bio}</p>}
            {p.highlights && p.highlights.length > 0 && (
              <ul className="check-list team-highlights">
                {p.highlights.map((h) => (
                  <li key={h.id ?? h.text}>{h.text}</li>
                ))}
              </ul>
            )}
            {p.linkedinUrl && (
              <a className="text-link" href={p.linkedinUrl} rel="noopener">
                LinkedIn <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/** Compact founders line for the homepage. */
export function TeamStrip({ team }: { team: Author[] }) {
  if (!team.length) return null;
  return (
    <ul className="team-strip">
      {team.map((p) => (
        <li key={p.id}>
          <Avatar person={p} size="sm" />
          <span>
            <strong>{p.name}</strong>
            {p.role && <span className="team-strip-role">{p.role}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
