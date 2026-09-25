# Ethiopian coffee sourcing website

A marketing website for a business that helps international trade buyers source Ethiopian green and roasted coffee, with a built-in CMS for articles, page copy and photos, and a working inquiry form.

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript, with plain CSS. **Payload CMS 3** runs inside the same app at `/admin`, stores data in SQLite (libSQL) and uploads images to disk.
- **Public pages:** home, green coffee, roasted coffee, about, how it works, resources (index, category pages, articles), inquiry, privacy, photo credits, `sitemap.xml`, `robots.txt`.
- **CMS:** articles with drafts, autosave, preview, publish/unpublish and version history; categories; authors; images with licence records; editable page headlines and photos; automatic redirects when a published article's slug changes; inquiries inbox.
- **Guides:**
  - [`docs/cms-guide.md`](docs/cms-guide.md): for editors.
  - [`docs/content-ideas.md`](docs/content-ideas.md): article pipeline.
  - [`docs/website-plan.md`](docs/website-plan.md): strategy background.

## Local development

```bash
npm install
echo "PAYLOAD_SECRET=$(openssl rand -hex 32)" > .env.local
npx payload migrate                       # create the local database (data/cms.db)
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long passphrase' npm run create-admin
npm run seed                              # starter categories + 3 draft articles
npm run dev                               # http://localhost:3000 and /admin
npm test                                  # form validation tests
npm run lint                              # TypeScript type-check
```

**Schema changes** (fields or collections) need a migration: `npm run migrate:create <name>`, commit the file in `cms/migrations/`, then deploy. Migrations run automatically on `npm start`.

## Business identity

`site.config.json` holds the public identity. Empty values are omitted from the site, never invented.

- **Required for production:** `brand_name`, `site_url`, `operator_name`, `contact_email`. A build with `SITE_ENV=production` fails without them.
- **Without `SITE_ENV=production`:** the site is a noindex **preview** with a banner.

## Hosting (recommended: Railway, one service with one volume)

The CMS needs a long-running Node server and a persistent disk for the database and uploaded images, so a serverless host alone is not suitable. Recommended setup:

1. **Create the service.** In Railway, create a project from this GitHub repository. Railway detects Node and runs `npm run build`, then `npm start` (which applies migrations, then starts Next.js).
2. **Add a volume** mounted at `/data`.
3. **Set the variables** (see `.env.example`):
   - `SITE_ENV=production`
   - `PAYLOAD_SECRET` (random, 32+ characters)
   - `DATABASE_URL=file:/data/cms.db`
   - `MEDIA_DIR=/data/media`
   - optionally `RESEND_API_KEY`, `INQUIRY_TO`, `INQUIRY_FROM`, `CMS_EMAIL_FROM`
4. **Deploy.** Before sharing the URL, open the Railway shell and run:
   - `ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run create-admin`, so nobody else can claim the first-user screen;
   - `npm run seed` for the starter drafts;
   - `npm run images:import` for the photos, once unsplash.com is reachable.
5. **Add your custom domain.** HTTPS is automatic. Set `site_url` in `site.config.json` to match, and deploy.
6. **Check the live site.** Send a test inquiry and check it appears under **Inquiries** in the CMS (and in your inbox if Resend is set). Then submit `/sitemap.xml` in Google Search Console.

**Cost:** Railway's Hobby plan is $5/month including $5 of usage. Volume storage is $0.15/GB-month (check [railway.com/pricing](https://railway.com/pricing)). Resend has a free tier for low volumes.

**Other hosts:** Render, Fly.io or a small VPS work the same way: one Node process, one persistent disk. Run only **one instance**, because SQLite on a local disk isn't shared between instances.

## Inquiry handling

`app/api/inquiry/route.ts` handles the inquiry form:

- server-side validation;
- a honeypot and timing check;
- a best-effort rate limit;
- optional Cloudflare Turnstile.

Delivery goes to every configured destination, and the buyer sees success only if at least one confirms:

| Destination | Setting |
|---|---|
| **CMS "Inquiries" collection** | Default. Readable only by logged-in CMS users; disable with `INQUIRY_STORE_CMS=false`. |
| Email via Resend | `RESEND_API_KEY` + `INQUIRY_TO` |
| JSON webhook | `INQUIRY_WEBHOOK_URL` (+ `INQUIRY_WEBHOOK_SECRET`) |
| JSON Lines file | `INQUIRY_FILE_STORE` |

## Photography

Real photos are managed in the CMS.

- `content/photo-manifest.json` lists licensed Unsplash candidates for each page slot, with source URLs.
- `npm run images:import` downloads them, stores the credit, source and licence, marks them as illustrative, and fills empty slots.
- Review every imported photo in the CMS.
- Until a slot has a photo, the site shows a decorative illustration, never a fake documentary image.
- Credits are listed automatically at `/photo-credits`.

## Backups

`npm run backup` writes `backups/<timestamp>/` containing:
- `content.json`;
- each article as HTML;
- a database copy;
- all uploaded images.

Download it regularly.
