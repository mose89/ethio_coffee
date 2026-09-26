# Exporter positioning: review before publication

**Status: preview only. Not approved for publication.**

The website copy now presents the company as the **seller and exporter** of Ethiopian green and roasted coffee, instead of a sourcing agent that introduces buyers to other exporters. The Ethiopian export licence is **expected but not yet issued**, so this wording must not go live yet.

- **Baseline** (last agency-model version): commit `868b40f`. It is kept in git history and can still be deployed if needed.
- **Publication gate:** `exporter_positioning_approved` in `site.config.json` is `false`. While it is false, a production build (`SITE_ENV=production`) stops with an error. Preview builds (noindex, with a "Preview version" banner) work normally.
- **Go live:** set it to `true` only when every item under [Before publication](#before-publication) is done.

The site never states that a licence is held, never uses the words "licensed exporter", and shows no licence number.

## 1. Facts already confirmed in the project

Used as-is:

- Founders **Mose Gebreselassie** (Co-founder & Commercial Leader) and **Natnael Samson** (Co-founder & Operations Leader). Both are Norwegian with Ethiopian origins.
- **Mose:** 10+ years in commercial roles in trade and logistics, quality control and sales; has lived in 11+ countries; speaks 7+ languages.
- **Natnael:** has lived in Ethiopia for the past ten years and built an extensive network there.
- **Founding story:** finding a reliable, compliant Ethiopian exporter was hard, and the founders built a trusted network.
- **Contact:** WhatsApp +47 973 44 353. The email address `hello@ethiopiancoffeesourcing.com` is a **placeholder**.
- **Scope:** coffee ships from Ethiopia, and nothing is held in stock outside Ethiopia.

## 2. Intended business-model wording (licence-gated)

Everything below is written in the present tense as the intended position. It may go live **only after the licence is issued and operations are confirmed**.

| Where | Wording | Why it is gated |
|---|---|---|
| Home: hero | "We supply Ethiopian green coffee to importers and roasters… One company, accountable from first sample to shipment." | Presents us as the supplier |
| Home: About intro | "Now we supply Ethiopian coffee ourselves…"; "You buy from us… prepare and ship your order from Ethiopia." | Seller and exporter role |
| Home: Who we work with | "from one accountable supplier" | Seller role |
| Green coffee: hero, steps, FAQ | "quote you directly", "Once you order, we prepare it and ship it from Ethiopia", "our written quotation", "Terms are confirmed in our quotation", "Who we supply" | Seller and exporter role |
| Roasted coffee: FAQ | "Roasted Ethiopian coffee, packed and shipped from Ethiopia"; "we confirm what we can supply"; "Who we supply" | Seller role (roasting partner not named) |
| About: hero, story, help list | "The Ethiopian coffee supplier we were looking for"; "Now we supply Ethiopian coffee ourselves"; "One accountable company… we prepare it for shipment" | Seller and exporter role |
| About: note under "What makes us different" | "your quotation, contract and invoice come from us, and we remain accountable for the agreed sale through to shipment" | Contracting and invoicing as seller |
| About / How it works: "Who does what" | "Quote in writing and sell the coffee to you"; "Prepare your order and ship it from Ethiopia"; roles table row "Us" | Seller and exporter role |
| How it works: FAQ | "Will I buy from you, or from another exporter?", answered "From us… Your quotation, contract and invoice come from us."; "Who will I contract with and pay?", answered "With us." | Seller, contracting party, invoicing |
| How it works: steps | "Order preparation and shipment: We prepare your order for export" | Export operations |
| Team: Natnael's bio (CMS and `content/team.json`) | "preparing orders for shipment" | Export operations |
| Privacy notice | Data shared with couriers, freight forwarders and shipping providers; "to perform a contract with you" | Describes processing under the seller model |
| Footer, site description, JSON-LD `Organization.description`, OG image | "Supplier of Ethiopian green and roasted coffee…", "prepared and shipped from Ethiopia" | Seller and exporter role |
| Article drafts: "How we can help" (all three) | "We supply Ethiopian green and roasted coffee to business buyers…" | Seller role |
| Buyer's checklist PDF: closing box | "supplies Ethiopian green and roasted coffee to business buyers… one accountable company from first sample to shipment" | Seller role. **Note:** the PDF is already downloadable in preview. |

## 3. Commercial details still awaiting confirmation

The copy is qualified or silent on each of these. Please decide them, then the copy can be made more specific.

1. **Licence:** issue date. Decide whether to mention the licence on the site at all; recommended only as supporting credibility, such as a line on About or in an FAQ, and only after issue.
2. **Legal entity:** name and country of the company that signs contracts and invoices. The site says "us" or "our company" and never names an entity. `operator_name` in `site.config.json` is still empty, and the privacy notice needs it.
3. **Where the coffee comes from:** for example ECX, direct from washing stations or producers, or other suppliers. This decides what can be said about traceability, and whether "direct from farmers" could ever be claimed. The site currently makes no such claim.
4. **Roasted coffee:** who roasts and packs it, roast profiles, pack formats, shelf life, minimum quantities and export destinations. The site keeps all of these as "confirmed per inquiry". Private label is not offered on the site; the page only says branding requests will be answered honestly.
5. **Shipping terms:** which Incoterms we will offer (for example FOB Djibouti, CFR or CIF). The site says terms are "set out in the quotation".
6. **Payment terms:** for example advance payment, letter of credit or cash against documents, plus the currency. The site says "agreed for each order and set out in the quotation".
7. **Samples:** whether they are free or charged, sizes, courier, who pays freight, and lead time. The site says availability, size and any cost are "confirmed before anything is sent", and never offers free samples.
8. **Minimum order quantities.** The site says there is no single minimum.
9. **Quality evidence:** what we will provide per lot (grading certificate, cupping results, moisture reading, and who does the cupping). The site says "lot details and quality information".
10. **Certifications:** none are claimed. Each coffee's certificate, and whether our company needs its own certification to sell certified coffee (chain of custody), must be confirmed before any certified offer.
11. **EUDR:** what due-diligence information we will provide to EU buyers. The site makes no compliance claim.
12. **Export documents:** the standard set per shipment, which the site only refers to as "the documents that come with your shipment".
13. **Logistics providers** used for samples and shipments, for the privacy notice.
14. **Team:** Natnael's photo, and LinkedIn links if wanted.

## Before publication

- [ ] Ethiopian export licence issued, and operations confirmed (sourcing, warehousing or preparation arrangements, export documentation).
- [ ] Legal entity name and country set in `operator_name` / `operator_country`.
- [ ] Real contact email set (replacing the placeholder).
- [ ] Items 3, 5, 6 and 7 above decided, so quotations match the site.
- [ ] Section 2 wording re-read and approved by the owner.
- [ ] `exporter_positioning_approved` set to `true` in `site.config.json`.
- [ ] Draft articles reviewed by their author before publishing.

## What was intentionally not changed

- **Design and structure:** layout, images, URLs, navigation, forms and form destinations, CMS and blog publishing.
- **Brand name:** "Ethiopian Coffee Sourcing" is unchanged.
- **Founders' story:** kept in the past tense, because it is true: they searched for a reliable exporter and built a network.
- **General buyer education in the articles and the checklist:** for example "questions to put to any Ethiopian exporter or agent", and the agent question in the checklist. This describes the market, not our company.
- **Localisation:** the site is English-only, with no other locales and no right-to-left layouts, so there are no translations to update.
- **`docs/website-plan.md`:** the original agency-model strategy. It is marked as superseded, not rewritten.
