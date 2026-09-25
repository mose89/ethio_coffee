import type { CollectionConfig } from "payload";
import { anyone, authenticated, formatSlug } from "../access";

/** Team members. Also used as article authors (real people only). */
export const Authors: CollectionConfig = {
  slug: "authors",
  labels: { singular: "Team member", plural: "Team" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "showOnAbout"],
    description: "Real people only. Tick “Show on About page” to feature someone in the founders section. Team members can also be article authors.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  defaultSort: "sortOrder",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" }, hooks: { beforeValidate: [formatSlug("name")] } },
    { name: "role", type: "text", admin: { description: "e.g. Co-founder & Commercial Leader" } },
    { name: "bio", type: "textarea" },
    {
      name: "highlights",
      type: "array",
      maxRows: 4,
      admin: { description: "Short facts shown as bullet points, e.g. “10+ years in international trade”." },
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "photo", type: "upload", relationTo: "media", admin: { description: "A real photo of this person. Leave empty to show their initials." } },
    { name: "linkedinUrl", label: "LinkedIn URL", type: "text" },
    { name: "showOnAbout", label: "Show on About page", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    { name: "sortOrder", label: "Order", type: "number", defaultValue: 10, admin: { position: "sidebar", description: "Lower numbers appear first." } },
  ],
};
