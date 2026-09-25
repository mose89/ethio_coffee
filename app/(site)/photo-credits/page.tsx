import { getPayloadClient } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import type { Media } from "@/payload-types";

export const metadata = pageMetadata({
  path: "/photo-credits",
  title: "Photo credits",
  description: "Sources and licences for the photographs used on this website.",
});

const LICENSES: Record<string, string> = {
  unsplash: "Unsplash License",
  cc: "Creative Commons",
  own: "Own photo",
  permission: "Used with permission",
  other: "Other licence",
};

export default async function PhotoCreditsPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "media", limit: 500, sort: "-createdAt", depth: 0 });
  const media = docs as Media[];
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="container narrow prose legal">
        <p className="eyebrow">Legal</p>
        <h1 id="page-title">Photo credits</h1>
        <p>
          Photos marked <strong>illustrative</strong> are stock photography used to illustrate topics. They do not show our suppliers,
          exporter partners, farms, facilities or team.
        </p>
        {media.length === 0 ? (
          <p>No photographs are currently in use.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Licence</th>
                </tr>
              </thead>
              <tbody>
                {media.map((m) => (
                  <tr key={m.id}>
                    <td>
                      {m.alt}
                      {m.illustrative ? " (illustrative)" : ""}
                    </td>
                    <td>
                      {m.sourceUrl ? (
                        <a href={m.sourceUrl} rel="noopener">
                          {m.credit || "Source"}
                        </a>
                      ) : (
                        m.credit || "—"
                      )}
                    </td>
                    <td>
                      {LICENSES[m.license ?? ""] ?? "—"}
                      {m.licenseNotes ? `: ${m.licenseNotes}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
