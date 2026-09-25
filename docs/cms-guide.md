# Editing the website: a short guide

The website has a built-in content management system (Payload CMS). You don't need a developer to publish articles or change page wording and photos: changes go live as soon as you publish or save them, with no rebuild or deployment.

## Logging in

- Go to **`https://<your-domain>/admin`** and log in with your email and password.
- Your first account is created on the server with `npm run create-admin` (see README). After that, you can add colleagues under **Settings → Users**.
- **Forgot your password?** Use "Forgot password" on the login screen. This needs email to be set up (`RESEND_API_KEY` and `CMS_EMAIL_FROM`). Otherwise, run `npm run create-admin` again with the same email and a new password.

## Writing an article

1. Go to **Content → Articles → Create new**. The article starts as a **draft** and saves automatically every couple of seconds. Nothing is public until you publish.
2. Fill in:
   - **Title**. The **slug** (the web address) is filled in from the title automatically. You can edit it in the right-hand column.
   - **Excerpt**: one or two sentences. It appears on the Resources page and is the default search-engine description.
   - **Featured image** (optional): click **Create new** to upload, or **Choose from existing**. Always fill in the **alternative text**.
   - **Content**: see "Formatting" below.
3. On the **Details** tab, choose **Categories**. Optionally set an **Author** (real people only; leave it empty to publish as the business), up to three **Related articles** (otherwise they're chosen by category), and the **Call to action** shown at the end of the article (green, roasted or general inquiry).

### Formatting the content

Type **`/`** at the start of a line to open the block menu: headings, lists, quote, table, image (**Upload**) and more. Shortcuts also work: `## ` for a heading, `- ` for a bulleted list, `1. ` for a numbered list.

- **Headings:** use Heading 2 for main sections. Three or more Heading 2s produce an automatic "In this guide" contents list.
- **Links:** select text and press the link button (or Ctrl/Cmd + K). Choose **Internal link** to point at another article; its address stays correct even if that article's slug changes. For other pages on the site, use a custom link such as `/green-coffee`, `/roasted-coffee` or `/inquiry?product=green`.
- **Images inside the article:** type `/upload`, press Enter, then upload or choose an image.
- **Tables:** type `/table`. The first row is shown as the header row.

### Search engine and social sharing (optional)

The **SEO** section below the content is optional. If you leave it empty, the site automatically uses the title, the excerpt and the featured image. The red "Missing" labels only mean you haven't overridden the defaults. Use **Auto-generate** to copy the defaults in if you want to fine-tune them.

## Preview, publish, unpublish

- **Preview:** click the **preview icon** (a square with an arrow) next to "Publish changes". The article opens in a new tab with a yellow **Preview** bar. Only logged-in CMS users can see drafts; click **Exit preview** when you're done.
- **Publish:** click **Publish changes**. The article appears straight away at `/resources/<slug>`, on the Resources page, on its category page and in the sitemap. The publication date is set automatically the first time; you can change it in the right-hand column.
- **Edit a published article:** make your changes. They save as a draft until you click **Publish changes** again, so the public keeps seeing the old version until then. Set **Last substantive update** only for meaningful revisions; readers then see an "Updated" date.
- **Change the web address of a published article:** edit the slug and publish. The old address automatically redirects to the new one. You can see redirects under **Settings → Redirects**.
- **Unpublish:** click the **⋮** menu next to "Publish changes" → **Unpublish**. The article disappears from the site immediately; it stays in the CMS as a draft.
- **Delete:** **⋮ → Delete**. Unpublishing is usually the safer choice.
- **Versions:** the **Versions** tab lets you compare and restore earlier versions.

## Editing pages and photos

Go to **Content → Page content**. The tabs (Home, Green coffee, Roasted coffee, About us, Sourcing process) hold the main headlines, introductions and photos. **Empty fields use the built-in wording**, so you only fill in what you want to change. On the About us tab, **Our story** replaces the built-in story when filled in; leave it empty to keep the current one. Founder profiles and photos are under **Team**.

Other wording (FAQs, process steps, legal text) is in the code; ask a developer to change it.

## Team (founders)

**Content → Team** holds the people shown on the About page and home page, and the authors of articles.

- **Role**, **Bio** and up to four short **Highlights** (for example "Speaks 7+ languages") are shown on the About page.
- **Photo**: a real portrait of that person. Without one, their initials are shown.
- **Show on About page** and **Sort order** control who appears and in which order.
- Every article needs an author from this list. The three starter drafts are attributed to Mose Gebreselassie: read them and edit anything you wouldn't say yourself before publishing.

## Buyer tools (downloads)

**Content → Downloads** holds the free files offered in exchange for contact details (PDF, Excel or Word).

- Give each a clear **Title** and a one or two sentence **Description** of what the buyer gets.
- Tick **Published** to offer it on the site. Unticked files are hidden and their links stop working.
- To replace a file, open it and upload the new version. Existing links from the last 7 days then deliver the new file.
- The files are private: they are only reachable through the form.

## Leads & subscribers

**Leads & subscribers** lists everyone who downloaded a buyer tool or signed up for updates, with their business type and the page they came from.

- **Follow up personally** on promising downloads (an importer or roaster downloading the checklist is often planning a purchase).
- **Only send marketing email to people with **Marketing consent** ticked.** The wording they agreed to is saved with each record.
- To send updates, run `npm run backup` on the server and import `subscribers.csv` into your email tool (for example Brevo or Mailchimp). Remove anyone who asks to unsubscribe, in both places.

## Photos: the rules

- Upload photos under **Content → Images**, or from any image field.
- For every image, record **Source and licence**: the credit, a source URL and the licence.
- Tick **"Stock or illustrative image"** for general photos (your records only; it isn't shown on the site). Never caption a general photo as if it showed your own team, partners or facilities. All photos with a credit or licence are listed on **/photo-credits**.
- Photos are resized and converted automatically. Upload the largest good-quality version you have (a JPEG or WebP around 2,000–2,500 px wide is ideal). Use the **focal point** tool so important details stay visible when images are cropped.

## Inquiries

Inquiries from the website form appear under **Inquiries**. **Request** shows whether the buyer wants a quotation, samples, both, or a first conversation. Reply from your own email; use **Status** (New, Replied, Closed) and **Notes** to keep track.

## Backing up and exporting

- On the server, `npm run backup` writes a folder in `backups/` with:
  - `content.json`: everything, including drafts, images metadata, page content, inquiries and leads;
  - `subscribers.csv`: people who agreed to receive updates;
  - each article as a standalone **HTML** file;
  - a copy of the database;
  - all uploaded images and download files.

  Download that folder regularly and keep it somewhere safe.
- Individual items can also be read through the CMS API while logged in (for example `/api/posts?limit=100`).
- Hosting providers also offer volume snapshots. Enable them if available.
