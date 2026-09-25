import type { Access, FieldHook } from "payload";

/** Logged-in CMS users only. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** Public can read published documents only; CMS users can read everything, including drafts. */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};

export const anyone: Access = () => true;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}

/** Fills the slug from another field when empty, and normalises whatever the editor typed. */
export const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data }) => {
    const source = typeof value === "string" && value.trim() ? value : (data?.[fallbackField] as string | undefined);
    return source ? slugify(source) : value;
  };
