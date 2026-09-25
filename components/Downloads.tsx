import type { Download } from "@/payload-types";
import { DownloadForm } from "./LeadForms";

type D = Pick<Download, "id" | "slug" | "title" | "description" | "format">;

export function DownloadList({ downloads, headingLevel = 3 }: { downloads: D[]; headingLevel?: 2 | 3 }) {
  if (!downloads.length) return null;
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="download-list">
      {downloads.map((d) => (
        <article key={d.id} className="download-card">
          <div className="download-head">
            <span className="download-badge" aria-hidden="true">
              {(d.format ?? "").toLowerCase().includes("excel") ? "XLSX" : "PDF"}
            </span>
            <div>
              <H className="download-title">{d.title}</H>
              <p className="download-desc">{d.description}</p>
              {d.format && <p className="download-format">Free · {d.format}</p>}
            </div>
          </div>
          <details className="download-details">
            <summary className="button button-outline">Get it free</summary>
            <DownloadForm slug={d.slug} title={d.title} />
          </details>
        </article>
      ))}
    </div>
  );
}
