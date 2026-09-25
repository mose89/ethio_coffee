import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

/**
 * Inquiries submitted through the website form. Created only by the server-side
 * form handler (never through the public API) and readable only by CMS users.
 */
export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  admin: {
    group: "Inquiries",
    useAsTitle: "company",
    defaultColumns: ["reference", "product", "requestType", "company", "country", "status", "createdAt"],
    description: "Inquiries sent through the website. Reply from your email; use Status to keep track.",
  },
  access: {
    create: () => false,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "reference", type: "text", index: true, admin: { readOnly: true } },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Replied", value: "replied" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "product", type: "select", options: ["green", "roasted", "unsure"], admin: { readOnly: true } },
    {
      name: "requestType",
      label: "Request",
      type: "select",
      options: [
        { label: "Quotation", value: "quote" },
        { label: "Samples", value: "samples" },
        { label: "Samples and quotation", value: "both" },
        { label: "Advice / first conversation", value: "advice" },
      ],
      admin: { readOnly: true },
    },
    { name: "name", type: "text", admin: { readOnly: true } },
    { name: "email", type: "email", admin: { readOnly: true } },
    { name: "company", type: "text", admin: { readOnly: true } },
    { name: "country", type: "text", admin: { readOnly: true } },
    { name: "quantity", type: "text", admin: { readOnly: true } },
    { name: "message", type: "textarea", admin: { readOnly: true } },
    { name: "sourcePage", type: "text", admin: { readOnly: true } },
    { name: "notes", type: "textarea", admin: { description: "Private notes." } },
  ],
};
