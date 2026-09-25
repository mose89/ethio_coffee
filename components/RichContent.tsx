import Image from "next/image";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import type { Media } from "@/payload-types";

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

type NodeLike = { type?: string; text?: string; children?: NodeLike[] };
export function nodeText(node: NodeLike): string {
  if (typeof node.text === "string") return node.text;
  return (node.children ?? []).map(nodeText).join("");
}

const internalDocToHref = ({ linkNode }: { linkNode: { fields: { doc?: { relationTo?: string; value?: unknown } | null } } }) => {
  const doc = linkNode.fields.doc;
  const value = doc?.value as { slug?: string } | undefined;
  if (doc?.relationTo === "posts" && value?.slug) return `/resources/${value.slug}`;
  return "/";
};

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref: internalDocToHref as never }),
  heading: ({ node, nodesToJSX }) => {
    const Tag = (["h2", "h3", "h4"].includes(node.tag) ? node.tag : "h2") as "h2" | "h3" | "h4";
    const id = Tag === "h2" ? headingId(nodeText(node as NodeLike)) : undefined;
    return <Tag id={id}>{nodesToJSX({ nodes: node.children })}</Tag>;
  },
  table: (args) => {
    const Default = defaultConverters.table;
    const inner = typeof Default === "function" ? Default(args) : null;
    return <div className="table-wrap">{inner}</div>;
  },
  upload: ({ node }) => {
    const doc = node.value as Media | number | string;
    if (!doc || typeof doc !== "object" || !doc.url || !doc.mimeType?.startsWith("image")) return null;
    const alt = (node.fields as { alt?: string } | undefined)?.alt || doc.alt || "";
    const w = doc.width ?? 1600;
    const h = doc.height ?? 1000;
    const credit = doc.illustrative ? ["Illustrative photo", doc.credit].filter(Boolean).join(" · ") : doc.credit;
    return (
      <figure className="article-figure">
        <Image src={doc.url.split("?")[0]} alt={alt} width={w} height={h} sizes="(min-width: 800px) 720px, 100vw" />
        {(doc.caption || credit) && (
          <figcaption>
            {doc.caption}
            {doc.caption && credit ? " · " : ""}
            {credit && <span className="figure-credit">{credit}</span>}
          </figcaption>
        )}
      </figure>
    );
  },
});

export function RichContent({ data, className }: { data: SerializedEditorState; className?: string }) {
  return <RichText data={data} converters={converters} className={className ?? "rich-text"} disableContainer={false} />;
}

/** Top-level h2 headings, for an on-page contents list. */
export function extractHeadings(data: SerializedEditorState): { id: string; text: string }[] {
  const root = data?.root as unknown as NodeLike | undefined;
  return (root?.children ?? [])
    .filter((n) => n.type === "heading" && (n as { tag?: string }).tag === "h2")
    .map((n) => {
      const text = nodeText(n);
      return { id: headingId(text), text };
    });
}
