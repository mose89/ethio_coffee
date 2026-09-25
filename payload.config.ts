import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { resendAdapter } from "@payloadcms/email-resend";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { EXPERIMENTAL_TableFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type Field } from "payload";
import sharp from "sharp";
import { Authors } from "./cms/collections/Authors";
import { Categories } from "./cms/collections/Categories";
import { Inquiries } from "./cms/collections/Inquiries";
import { Media } from "./cms/collections/Media";
import { Posts } from "./cms/collections/Posts";
import { Users } from "./cms/collections/Users";
import { PageContent } from "./cms/globals/PageContent";
import { site } from "./lib/site";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const secret = process.env.PAYLOAD_SECRET;
if (!secret && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
  throw new Error("PAYLOAD_SECRET must be set in production.");
}

export default buildConfig({
  secret: secret || "local-development-only-secret-change-me",
  serverURL: site.siteUrl || undefined,
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ` | ${site.brand} CMS` },
    importMap: { baseDir: dirname },
  },
  collections: [Posts, Categories, Authors, Media, Inquiries, Users],
  globals: [PageContent],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()],
  }),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || `file:${path.resolve(dirname, "data/cms.db")}`,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    migrationDir: path.resolve(dirname, "cms/migrations"),
    // Schema changes go through migrations only (npm run migrate:create), never implicit pushes.
    push: false,
  }),
  sharp,
  // Used for CMS password-reset emails. Without it, emails are only written to the server log.
  ...(process.env.RESEND_API_KEY && process.env.CMS_EMAIL_FROM
    ? {
        email: resendAdapter({
          apiKey: process.env.RESEND_API_KEY,
          defaultFromAddress: process.env.CMS_EMAIL_FROM,
          defaultFromName: `${site.brand} CMS`,
        }),
      }
    : {}),
  graphQL: { disable: true },
  telemetry: false,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    redirectsPlugin({
      collections: ["posts"],
      overrides: { admin: { group: "Settings" } },
    }),
    seoPlugin({
      collections: ["posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => (doc?.title ? String(doc.title) : ""),
      generateDescription: ({ doc }) => (doc?.excerpt ? String(doc.excerpt).slice(0, 160) : ""),
      generateImage: ({ doc }) => doc?.featuredImage?.id ?? doc?.featuredImage ?? "",
      generateURL: ({ doc }) => `${site.siteUrl}/resources/${doc?.slug ?? ""}`,
      fields: ({ defaultFields }) =>
        defaultFields.map((f): Field =>
          "name" in f && f.name === "title"
            ? ({ ...f, admin: { ...f.admin, description: "Optional. Defaults to the article title." } } as Field)
            : "name" in f && f.name === "description"
              ? ({ ...f, admin: { ...f.admin, description: "Optional. Defaults to the excerpt." } } as Field)
              : "name" in f && f.name === "image"
                ? ({ ...f, admin: { ...f.admin, description: "Optional. Defaults to the featured image." } } as Field)
                : f,
        ),
    }),
  ],
});
