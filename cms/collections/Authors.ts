import type { CollectionConfig } from "payload";
import { anyone, authenticated, formatSlug } from "../access";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    group: "Content",
    useAsTitle: "name",
    description: "Real people only. Articles without an author are attributed to the business.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" }, hooks: { beforeValidate: [formatSlug("name")] } },
    { name: "role", type: "text", admin: { description: "e.g. Founder" } },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "linkedinUrl", label: "LinkedIn URL", type: "text" },
  ],
};
