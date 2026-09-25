import type { CollectionConfig } from "payload";
import { anyone, authenticated, formatSlug } from "../access";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { group: "Content", useAsTitle: "title", defaultColumns: ["title", "slug"] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true, admin: { position: "sidebar" }, hooks: { beforeValidate: [formatSlug("title")] } },
    { name: "description", type: "textarea", admin: { description: "One or two sentences shown on the category page." } },
  ],
};
