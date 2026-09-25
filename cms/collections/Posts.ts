import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { authenticated, formatSlug, publishedOrAuthenticated } from "../access";

export const ARTICLE_BASE = "/resources";

/** Sets the publication date the first time a post is published (editors can override it). */
const setPublishedAt: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (data._status === "published" && !data.publishedAt && !originalDoc?.publishedAt) {
    data.publishedAt = new Date().toISOString();
  }
  return data;
};

/**
 * When a published post's slug changes, keep the old URL working by creating a
 * permanent redirect that points at the post itself (so later slug changes
 * resolve automatically).
 */
const redirectOldSlug: CollectionAfterChangeHook = async ({ doc, req, context }) => {
  if (context?.skipRedirects || doc._status !== "published" || !doc.slug) return doc;
  // Every slug this article was previously *published* under (autosaved drafts don't count).
  const versions = await req.payload.findVersions({
    collection: "posts",
    where: { and: [{ parent: { equals: doc.id } }, { "version._status": { equals: "published" } }] },
    sort: "-updatedAt",
    limit: 100,
    depth: 0,
    req,
  });
  const oldSlugs = new Set(
    versions.docs.map((v) => (v.version as { slug?: string }).slug).filter((s): s is string => Boolean(s) && s !== doc.slug),
  );
  for (const oldSlug of oldSlugs) {
    const from = `${ARTICLE_BASE}/${oldSlug}`;
    const existing = await req.payload.find({ collection: "redirects", where: { from: { equals: from } }, limit: 1, depth: 0, req });
    const data = { from, to: { type: "reference" as const, reference: { relationTo: "posts" as const, value: doc.id } } };
    if (existing.docs[0]) await req.payload.update({ collection: "redirects", id: existing.docs[0].id, data, req });
    else await req.payload.create({ collection: "redirects", data, req });
  }
  // If the article moved back to an earlier address, drop the now-pointless redirect.
  await req.payload.delete({ collection: "redirects", where: { from: { equals: `${ARTICLE_BASE}/${doc.slug}` } }, req });
  return doc;
};

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "_status", "publishedAt", "updatedAt"],
    description: "Resources articles. Save as draft while writing, use Preview to check, then Publish.",
    preview: (doc) => (doc?.slug ? `/preview?slug=${encodeURIComponent(String(doc.slug))}` : null),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 50,
  },
  defaultPopulate: { title: true, slug: true, excerpt: true, featuredImage: true, publishedAt: true, categories: true, _status: true },
  hooks: {
    beforeChange: [setPublishedAt],
    afterChange: [redirectOldSlug],
  },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 140 },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              maxLength: 320,
              admin: { description: "One or two sentences. Shown on the Resources page and used as the default search description." },
            },
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media",
              admin: { description: "Shown at the top of the article, on cards and (by default) when shared on social media." },
            },
            { name: "content", type: "richText", required: true },
          ],
        },
        {
          label: "Details",
          fields: [
            { name: "categories", type: "relationship", relationTo: "categories", hasMany: true },
            {
              name: "author",
              type: "relationship",
              relationTo: "authors",
              admin: { description: "Optional. Leave empty to attribute the article to the business." },
            },
            {
              name: "relatedPosts",
              type: "relationship",
              relationTo: "posts",
              hasMany: true,
              maxRows: 3,
              filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
              admin: { description: "Optional. If empty, articles from the same category are suggested automatically." },
            },
            {
              name: "cta",
              label: "Call to action",
              type: "select",
              defaultValue: "general",
              options: [
                { label: "General inquiry", value: "general" },
                { label: "Green coffee inquiry", value: "green" },
                { label: "Roasted coffee inquiry", value: "roasted" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "The article’s web address. Filled from the title automatically. Changing it on a published article keeps the old address working through a redirect.",
      },
      hooks: { beforeValidate: [formatSlug("title")] },
    },
    {
      name: "publishedAt",
      label: "Publication date",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" }, description: "Set automatically on first publish." },
    },
    {
      name: "contentUpdatedAt",
      label: "Last substantive update",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
        description: "Set only when you meaningfully revise the article (not for typo fixes). Shown to readers as “Updated”.",
      },
    },
  ],
};
