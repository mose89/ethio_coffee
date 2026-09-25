import type { Field, GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";

const text = (name: string, label: string, description?: string, textarea = false): Field =>
  ({
    name,
    label,
    type: textarea ? "textarea" : "text",
    admin: { description: description ?? "Leave empty to use the built-in wording." },
  }) as Field;

const image = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  admin: { description: description ?? "Leave empty to show the built-in design without a photo." },
});

/**
 * Editable headline copy and images for the main pages. Every field is optional:
 * empty fields fall back to the wording built into the site.
 */
export const PageContent: GlobalConfig = {
  slug: "page-content",
  label: "Page content",
  admin: { group: "Content", description: "Headlines, introductions and photos for the main pages. Empty fields use the built-in wording." },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "home",
          label: "Home",
          fields: [
            text("heroTitle", "Hero headline"),
            text("heroIntro", "Hero introduction", undefined, true),
            image("heroImage", "Hero photo"),
            text("introTitle", "About introduction: heading"),
            text("introText", "About introduction: text", undefined, true),
            image("introImage", "About introduction: photo"),
          ],
        },
        {
          name: "green",
          label: "Green coffee",
          fields: [text("heroTitle", "Headline"), text("heroIntro", "Introduction", undefined, true), image("heroImage", "Hero photo")],
        },
        {
          name: "roasted",
          label: "Roasted coffee",
          fields: [
            text("heroTitle", "Headline"),
            text("heroIntro", "Introduction", undefined, true),
            image("heroImage", "Hero photo"),
            image("detailImage", "Supporting photo"),
          ],
        },
        {
          name: "about",
          label: "About us",
          fields: [
            text("heroTitle", "Headline"),
            text("heroIntro", "Introduction", undefined, true),
            image("heroImage", "Hero photo"),
            {
              name: "story",
              label: "Our story (optional)",
              type: "richText",
              admin: { description: "A short founder or company story. Shown on the About page only when filled in. Use confirmed facts only." },
            },
            image("founderPortrait", "Founder portrait", "Only a real photo of the founder."),
          ],
        },
        {
          name: "process",
          label: "Sourcing process",
          fields: [image("samplesImage", "Samples and quality photo"), image("shippingImage", "Shipping photo")],
        },
      ],
    },
  ],
};
