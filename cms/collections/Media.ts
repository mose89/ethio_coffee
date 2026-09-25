import path from "node:path";
import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Images" },
  admin: {
    group: "Content",
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "credit", "illustrative"],
    description: "Upload photos here or from any image field. Always record where an image came from and its licence.",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), "media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    focalPoint: true,
    crop: true,
    formatOptions: { format: "webp", options: { quality: 82 } },
    resizeOptions: { width: 2400, height: 2400, fit: "inside", withoutEnlargement: true },
    imageSizes: [
      { name: "thumbnail", width: 480, formatOptions: { format: "webp", options: { quality: 78 } } },
      { name: "card", width: 960, formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "og", width: 1200, height: 630, position: "centre", formatOptions: { format: "jpeg", options: { quality: 82 } } },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      label: "Alternative text",
      type: "text",
      required: true,
      admin: { description: "Describe what the image shows for people who can't see it, e.g. “Green coffee beans in a jute sack”." },
    },
    { name: "caption", type: "text", admin: { description: "Optional caption shown under the image in articles." } },
    {
      name: "illustrative",
      label: "Stock or illustrative image",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "For your records: tick for stock or general photos, untick for photos of your own team, partners (with permission) or products. Never caption a general photo as your own operations.",
      },
    },
    {
      type: "collapsible",
      label: "Source and licence",
      fields: [
        { name: "credit", type: "text", admin: { description: "Photographer or owner, e.g. “Jane Doe / Unsplash”." } },
        { name: "sourceUrl", label: "Source URL", type: "text" },
        {
          name: "license",
          type: "select",
          defaultValue: "unsplash",
          options: [
            { label: "Unsplash License", value: "unsplash" },
            { label: "Creative Commons (see notes)", value: "cc" },
            { label: "Own photo", value: "own" },
            { label: "Supplied with written permission", value: "permission" },
            { label: "Other licence (see notes)", value: "other" },
          ],
        },
        { name: "licenseNotes", type: "textarea", admin: { description: "Attribution wording or permission details required by the licence." } },
      ],
    },
  ],
};
