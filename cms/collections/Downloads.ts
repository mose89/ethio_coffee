import path from "node:path";
import type { CollectionConfig } from "payload";
import { authenticated, formatSlug } from "../access";

/**
 * Buyer tools offered in exchange for an email address. Files are NOT publicly
 * readable: visitors receive a signed, time-limited link after the short form.
 */
export const Downloads: CollectionConfig = {
  slug: "downloads",
  labels: { singular: "Download", plural: "Downloads" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "published", "updatedAt"],
    description: "Guides, checklists and templates visitors can download after leaving their email. Tick “Published” to show one on the site.",
  },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    staticDir: process.env.DOWNLOADS_DIR || path.resolve(process.cwd(), "downloads"),
    mimeTypes: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" }, hooks: { beforeValidate: [formatSlug("title")] } },
    { name: "description", type: "textarea", required: true, maxLength: 280 },
    { name: "format", type: "text", admin: { description: "Shown to visitors, e.g. “PDF, 3 pages” or “Excel template”." } },
    {
      name: "audience",
      type: "select",
      defaultValue: "all",
      options: [
        { label: "All buyers", value: "all" },
        { label: "Green coffee buyers", value: "green" },
        { label: "Roasted coffee buyers", value: "roasted" },
      ],
    },
    { name: "published", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    { name: "sortOrder", label: "Order", type: "number", defaultValue: 10, admin: { position: "sidebar" } },
  ],
};
