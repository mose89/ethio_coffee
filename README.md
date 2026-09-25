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

Requires Node.js 20.9 or newer.

```bash
npm install
npm run setup    # creates the database, asks for an editor login, adds starter drafts and photos
npm run dev      # website: http://localhost:3000 · editor: http://localhost:3000/admin
```

Other commands: `npm test` (form validation tests), `npm run lint` (TypeScript type-check), `npm run build` (production build).

**Schema changes** (fields or collections) need a migration: `npm run migrate:create <name>`, commit the file in `cms/migrations/`, then deploy. Migrations run automatically on `npm start`.

## Business identity

`site.config.json` holds the public identity. Empty values are omitted from the site, never invented.

- **Required for production:** `brand_name`, `site_url`, `operator_name`, `contact_email`. A build with `SITE_ENV=production` fails without them.
- **Without `SITE_ENV=production`:** the site is a noindex **preview** with a banner.
- **`contact_email` is a placeholder** (`hello@ethiopiancoffeesourcing.com`). Replace it with a real, monitored address on your own domain before launch.
- **`whatsapp_number`** and **`whatsapp_message`** power the WhatsApp buttons (floating button on desktop, bottom bar on mobile, About and inquiry pages). Leave the number empty to hide them.
- **`analytics_domain`**: set to your domain (for example `ethiopiancoffeesourcing.com`) after creating a site in [Plausible](https://plausible.io). The script and CSP entry are added only when it is set. Tracked events: `Inquiry`, `Lead`, `Download`, `WhatsApp click`, `CTA click`. Add them as custom-event goals in Plausible.
- **Founders** are edited in the CMS under **Team** (name, role, bio, highlights, photo, LinkedIn). Starter content is in `content/team.json` and loaded by `npm run seed`.

## Hosting (recommended: Railway, one service with one volume)

The CMS needs a long-running Node server and a persistent disk for the database and uploaded images, so a serverless host alone is not suitable. Recommended setup:

1. **Create the service.** In Railway, create a project from this GitHub repository. Railway detects Node and runs `npm run build`, then `npm start` (which applies migrations, then starts Next.js).
2. **Add a volume** mounted at `/data`.
3. **Set the variables** (see `.env.example`):
   - `SITE_ENV=production`
   - `PAYLOAD_SECRET` (random, 32+ characters)
   - `DATABASE_URL=file:/data/cms.db`
   - `MEDIA_DIR=/data/media`
   - `DOWNLOADS_DIR=/data/downloads`
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

## Lead capture: buyer tools and updates

- **Buyer tools** (`/resources`, home page, end of each article): a visitor gives name, email, company and business type, and gets the file immediately through a signed link that expires after 7 days (`/api/lead/download`). The files themselves are never publicly reachable. If Resend is configured, the link is also emailed.
- **Updates sign-up** (newsletter band): email only; consent is stored with the exact wording shown.
- Both are stored in the CMS under **Leads & subscribers**, and share the inquiry form's spam protection.
- **Sending updates:** there is no automatic newsletter. `npm run backup` writes `subscribers.csv` containing only people who agreed to receive email; import that into your email tool. Never email people who only downloaded a file without ticking the box.
- **The two starter files** live in `content/downloads/` and are uploaded by `npm run seed`. To change them, edit the sources in `content/downloads/src/` and rebuild:
  - PDF checklist: `node content/downloads/src/build-pdf.cjs` (uses Playwright/Chromium);
  - Excel template: `python3 content/downloads/src/build-xlsx.py` (needs `openpyxl`);
  - then upload the new file over the old one in the CMS under **Downloads**.
- **Sample requests:** the inquiry form asks whether the buyer wants a quotation, samples, both or advice. Links with `?request=samples` preselect it.

## Photography

Real photos are managed in the CMS. `npm run images:import` loads two sources, recording each photo's source and licence, marking it as illustrative, and filling only empty photo slots and empty article featured images:

1. **`content/site-photos.json`** lists the five owner-supplied photos in `content/photos/`, with their alt text, focal points and placements:
   - home hero: coffee ceremony;
   - home "About us" introduction: beans and traditional cup;
   - About page hero: roasting pan;
   - roasted coffee page hero: kraft bag;
   - roasted coffee page "Who this is for": café.
2. **`content/photo-manifest.json`** lists licensed Unsplash candidates. These are skipped if unsplash.com isn't reachable.

Until a slot has a photo, the site shows a decorative illustration, never a fake documentary image. Credits are listed automatically at `/photo-credits`.

## Backups

`npm run backup` writes `backups/<timestamp>/` containing:
- `content.json`;
- each article as HTML;
- a database copy;
- all uploaded images and download files;
- `subscribers.csv` (people who agreed to receive updates).

Download it regularly.
