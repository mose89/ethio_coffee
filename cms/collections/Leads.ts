import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

/**
 * People who downloaded a buyer tool or subscribed to updates. Created only by
 * the server-side handler, readable only by CMS users. Export with the list
 * view’s export or `npm run backup`.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Lead", plural: "Leads & subscribers" },
  admin: {
    group: "Inquiries",
    useAsTitle: "email",
    defaultColumns: ["email", "company", "buyerType", "source", "marketingConsent", "createdAt"],
    description: "Downloads and newsletter sign-ups. Only email people about updates if “Marketing consent” is ticked.",
  },
  access: { create: () => false, read: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "email", type: "email", required: true, index: true, admin: { readOnly: true } },
    { name: "name", type: "text", admin: { readOnly: true } },
    { name: "company", type: "text", admin: { readOnly: true } },
    {
      name: "buyerType",
      type: "select",
      options: [
        { label: "Importer / trader", value: "importer" },
        { label: "Roaster", value: "roaster" },
        { label: "Distributor / wholesaler", value: "distributor" },
        { label: "Retailer", value: "retailer" },
        { label: "Hospitality", value: "hospitality" },
        { label: "Other", value: "other" },
      ],
      admin: { readOnly: true },
    },
    { name: "source", type: "text", admin: { readOnly: true, description: "Which download or form this came from." } },
    { name: "marketingConsent", label: "Marketing consent", type: "checkbox", defaultValue: false, admin: { readOnly: true } },
    { name: "consentText", type: "textarea", admin: { readOnly: true, description: "The exact wording the person agreed to." } },
    { name: "sourcePage", type: "text", admin: { readOnly: true } },
    { name: "notes", type: "textarea" },
  ],
};
