export function formatDate(iso?: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function isoDate(iso?: string | null): string {
  return iso ? new Date(iso).toISOString().slice(0, 10) : "";
}
