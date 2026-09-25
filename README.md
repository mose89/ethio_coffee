# Ethiopian coffee sourcing website

A marketing website for a business that helps international trade buyers source Ethiopian green and roasted coffee through a network of Ethiopian exporters. The site has a working inquiry form.

- **Stack:** Next.js (App Router) + React + TypeScript and plain CSS. There is no database, CMS or UI framework.
- **Pages:** home, green coffee, roasted coffee, how it works (including about), inquiry form, thanks, privacy notice, 404, `robots.txt`, `sitemap.xml`.
- **Inquiry handling:** `app/api/inquiry/route.ts`.
  - Server-side validation, honeypot and timing spam checks, a per-instance rate limit and optional Cloudflare Turnstile.
  - Delivery to email (Resend), a webhook and/or a local file.
  - The buyer sees success only if at least one destination confirmed receipt.
  - It works without JavaScript (303 redirect to `/inquiry/thanks/`).
- **Strategy background:** [`docs/website-plan.md`](docs/website-plan.md).

## Local development

```bash
npm install
cp .env.example .env.local   # keep INQUIRY_FILE_STORE for local testing; remove SITE_ENV
npm run dev                  # http://localhost:3000
npm test                     # validation unit tests
npm run lint                 # TypeScript type-check
npm run build                # production build
```

## Configure the business identity

Edit `site.config.json`. Empty values are omitted from the site, never invented.

| Key | Required for production | Notes |
|---|---|---|
| `brand_name` | yes | Public business name |
| `site_url` | yes | `https://…`, no trailing slash; used for canonical URLs, sitemap and structured data |
| `operator_name` | yes | Person or legal entity responsible for the site (shown in footer and privacy notice) |
| `contact_email` | yes | Shown publicly; used as the fallback when the form fails |
| `operator_country`, `whatsapp_number`, `phone_number`, `linkedin_url`, `founder_name`, `founder_bio` | no | Shown only when filled |
| `response_time` | no | Default "one business day"; leave empty to remove the promise |
| `turnstile_site_key` | no | Public key; also set `TURNSTILE_SECRET_KEY` |
| `email_notifications` | no | Set `true` when Resend is configured, so the privacy notice names it |

Builds with `SITE_ENV=production` fail if a required value is missing. Without that variable, the site builds as a **preview**: a banner is shown, and indexing is blocked through meta robots, `X-Robots-Tag` and `robots.txt`.

## Deploy (recommended: Netlify)

Netlify's free plan permits commercial sites. Vercel's Hobby plan does not; Vercel works with its Pro plan.

1. In Netlify, choose **Add new site → Import from Git** and select this repository and branch. `netlify.toml` already sets the build command and sets `SITE_ENV=production` for the production context.
2. Under **Site configuration → Environment variables**, add:
   - `RESEND_API_KEY`
   - `INQUIRY_TO` (your inbox)
   - optionally `INQUIRY_FROM`, `INQUIRY_WEBHOOK_URL`, `INQUIRY_WEBHOOK_SECRET`, `TURNSTILE_SECRET_KEY`

   Do **not** set `INQUIRY_FILE_STORE` on Netlify, because serverless functions have no durable disk.
3. Fill `site.config.json`, commit and push. The production deploy then builds.
4. Add the custom domain under **Domain management**. HTTPS is provisioned automatically.
5. Submit one test inquiry on the live site and confirm the email arrives.
6. Add the domain to Google Search Console and submit `/sitemap.xml`.

## Inquiry destinations

At least one must be configured, or the form returns an error (it never shows false success).

| Variables | Destination |
|---|---|
| `RESEND_API_KEY` + `INQUIRY_TO` | Email notification with `reply_to` set to the buyer. Without a verified sending domain, Resend sends only from `onboarding@resend.dev` to your own Resend account address. |
| `INQUIRY_WEBHOOK_URL` (+ `INQUIRY_WEBHOOK_SECRET`) | JSON POST, for example to a spreadsheet or automation service. A good second copy. |
| `INQUIRY_FILE_STORE` | JSON Lines file with permissions `0600`. Only for a self-hosted Node server or local testing. |
