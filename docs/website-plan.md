# Ethiopian Coffee Sourcing Agency — Website Blueprint

*Planning document for a developer or AI coding assistant. Prepared 25 September 2026. No code yet.*

**How to read this document.** Every claim uses one of these labels:

| Label | Meaning |
|---|---|
| **[FACT]** | Verified from a cited external source (listed in Appendix A). |
| **[REC]** | Our recommendation. |
| **[ASSUME]** | A working assumption. It must be confirmed before launch copy states it as fact. |
| **[MISSING]** | Information we need from the founder or the exporters. |

Placeholders in draft copy use `{{double_braces}}`. Nothing in `{{…}}` may go live unreplaced.

**Research limitation.** Competitor sites were reviewed through search results and their published descriptions. Full page audits were not possible from this environment. No keyword-volume or difficulty data was available. None is invented here. Before launch, pull real figures from Google Search Console (after launch) and a keyword tool of your choice.

---

## Revision 2, 25 September 2026: CMS, Resources and imagery

This revision supersedes the "no CMS / no articles" parts of the launch scope above.

- **Added:** Payload CMS 3 inside the Next.js app (`/admin`), a Resources section, a dedicated About page, imagery slots and a licensed-photo import.
- **Where to look:** `README.md` (hosting and operations) and `docs/cms-guide.md` (editing).
- **Starter articles:** three researched articles are loaded as **drafts**, to be reviewed before publishing.
- **Further ideas:** `docs/content-ideas.md`.

---

## Revision, 25 September 2026: launch-day corrections

**This section supersedes any conflicting text below.** The rest of the document stays as background for post-launch work.

**Launch scope (replaces the 27-day backlog in Section 12 and the stack in Section 11):**
- A same-day release built with Next.js (React, TypeScript, plain CSS). There is no database, CMS or Wagtail.
- Pages: home, green coffee, roasted coffee, how it works (including about), inquiry form, privacy notice.
- One inquiry route handler with server-side validation, spam and abuse controls, and delivery to email (Resend) and/or a webhook.
- The buyer sees success only when delivery is confirmed.
- There is no catalogue, CRM, analytics or article content. Deployment and configuration steps are in `README.md`.
- Lot pages, origin pages, articles and the other Section 12 items move to the post-launch backlog, to be justified by data.

**Corrections:**
1. **Acquisition.** Organic inbound (search, AI-assisted research, referrals, industry mentions) remains the **intended primary acquisition strategy**. Its viability is a working assumption to test with Search Console and inquiry-source data. Outreach and referrals may support early acquisition but do not replace it. Section 1's "change the channel mix" recommendation is withdrawn.
2. **Competitive evidence is preliminary.** The review in Section 4 relied on search snippets and sites' own descriptions, not full page audits. Competitor capabilities quoted there (minimums, stock locations, scores, services) are the competitors' own unverified claims. They cannot establish how much relevant traffic or business we can win.
3. **Bypass risk.** Buyers and exporters can transact directly after an introduction. Two things together reduce that risk, and neither eliminates it:
   - **Contractual protection:** introduced-buyer registration, a defined protection period, and commission on repeat orders, agreed in writing with each exporter.
   - **Ongoing service value:** requirement matching across several exporters, clear information, sample and quotation coordination, and follow-through. This keeps buyers choosing to work through us.
4. **Regulatory and commercial claims.** None of these go into public copy unless verified against current authoritative sources:
   - **EUDR dates depend on operator category.** As reported by the European Commission (Access2Markets, retrieved via search), application is 30 Dec 2026 for large and medium operators and traders, and 30 Jun 2027 for micro and small operators. Recheck against the Official Journal before relying on it. Plot geolocation data is only one element of an operator's due-diligence obligations; it does **not** equal compliance.
   - **Export licensing vs. our agency model.** Licensing rules govern who may export coffee from Ethiopia. Our proposed arrangement, where the exporter acts as seller, invoices and ships, is a commercial choice and is not required by those rules. The site says only that we don't hold an export licence and that each quotation states the seller.
   - **Pricing.** Quotation-only pricing is a **commercial choice**, because prices vary by lot, volume, terms and season. The reported ECTA minimum export price (secondary sources) constrains contract prices; it does not by itself prohibit publishing prices. No specific legal requirement has been verified.
   - Regulatory articles are deferred and must not delay launch.

---

## 1. Executive recommendation

**Build a lean, green-coffee-led website (about 8 pages).** It should present you honestly as an independent sourcing agency that connects business buyers with ECTA-licensed Ethiopian exporters, and it should convert visitors into one unified, well-qualified inquiry.

**Treat roasted coffee as one limited inquiry page** until an exporter confirms formats, minimum orders, shelf life and export destinations in writing.

**Build it on Django + Wagtail**, rendered on the server. Use a single inquiry model that doubles as your CRM. Do not build accounts, checkout or a live inventory feed.

**An honest assessment of your hypothesis.** "A professional website with clear commercial information could win business" is partly right. On its own, it is not enough.

**Why the website is necessary:**
- Every buyer you meet through a referral, an event or outreach will check you online. Without a credible site, you lose those deals.
- Clear, specific commercial information is rare among small Ethiopian exporter sites. That is a real gap.

**Why organic inbound alone may be slow to produce results (preliminary; see Revision):**
- **The search results are crowded with the actual sellers.** Ethiopian exporters already publish buyer guides aimed at importers and roasters. One exporter, for example, publishes guides on the export process, ECX, traceability, choosing an exporter, minimum prices, and private vs. cooperative exporters ([ethiocoffee.co insights](https://www.ethiocoffee.co/insights/ethiopian-coffee-export-process-buyers-guide)). Specialist importers such as Trabocca, Royal Coffee and Cafe Imports have offices in Addis Ababa and warehoused stock in buyer markets **[FACT]** (Trabocca, Royal Coffee, Cafe Imports; Appendix A).
- **A new agency with no lots, no licence and no track record will rank slowly** for generic "Ethiopian green coffee supplier" terms.
- **Agents face disintermediation.** Once introduced, a buyer can go straight to the exporter. Contractual protection and ongoing service value together reduce this risk (see Revision, correction 3).

**[Withdrawn, see Revision correction 1] Change the channel mix, not the budget.** Keep "no paid advertising." But make founder-led, personalised outreach to a short list of well-fitting buyers the primary early channel, together with referrals. The website does three jobs:
1. Converts that outreach.
2. Earns search visibility over time for specific, evidence-backed pages.
3. Gives AI assistants accurate facts to describe you with.

Measure all channels in one CRM (Section 14) so the data can prove or disprove the website hypothesis within 90 days.

**On the green-first hierarchy [REC: keep it]:**
- Ethiopia's exports are overwhelmingly green. Roasted exports were about 27,000 bags in 2023/24, reported as under 5% of exports **[FACT]** (Daily Coffee News summarising USDA FAS; Appendix A).
- Buyers of roasted coffee (cafés, retailers) usually need local stock, fast replenishment and destination-market food labelling. Direct shipment from Ethiopia struggles to provide these, and you cannot yet confirm any of them.
- Green buyers are used to buying from origin through contracts, pre-shipment samples and FOB/CIF terms. That is exactly what your exporter network provides.

**The core promise we can defend:**
> *One accountable contact for sourcing Ethiopian coffee: we understand your specification, shortlist suitable licensed exporters and lots, coordinate samples and offers, and follow the order through shipment.*

We avoid "anything available in Ethiopia." A promise that broad reads as unsubstantiated. We replace it with a specific process and honest scope.

---

## 2. Assumptions and unresolved decisions

You told us you want to connect any company, of any size, with the Ethiopian coffee it needs through your network. You can supply photos. The site does not need perfect content at launch. Everything else below is an assumption.

### Working assumptions

| # | Assumption | Consequence for the site | Must be verified by |
|---|---|---|---|
| A1 | **[ASSUME]** Partner exporters are ECTA-licensed and act as seller of record (they sign the contract, invoice and ship). | "Who does what" copy names the exporter as seller. | Founder, using exporter licence copies |
| A2 | **[REPORTED, secondary sources]** Coffee export from Ethiopia requires an ECTA export licence. Export contracts are registered and subject to a weekly minimum export price. | We never imply we export. Quotation-only pricing is our commercial choice, not a legal requirement. | Background (Addis Fortune, The Reporter, Trabocca; Appendix A) |
| A3 | **[ASSUME]** You are paid a commission by the exporter. Buyers pay the exporter. | Disclose this plainly on the How-it-works page. | Founder + exporter agreement |
| A4 | **[ASSUME]** Green minimums are driven by the exporter, typically full-container (FCL) loads, with some part-container options. | We state "minimums vary by exporter and shipment; tell us your volume." No small-bag promise. | Exporters |
| A5 | **[ASSUME]** No stock is held outside Ethiopia. | We never market "spot", "in stock in [country]" or small-parcel delivery. | Exporters |
| A6 | **[ASSUME]** Pre-shipment and offer samples are available from exporters. Cost and courier are unknown. | Sample-request CTA with "sample terms confirmed on request." | Exporters |
| A7 | **[ASSUME]** At least one exporter can supply roasted coffee, but formats are unconfirmed. | Roasted = one inquiry page. No private-label claims. | Exporters |
| A8 | **[ASSUME]** The founder can respond within one business day. | That is the published response promise. You said you're available 24/7, but promise less than you can deliver. | Founder |
| A9 | **[ASSUME]** Launch is English only. | Translations deferred (Section 10). | — |
| A10 | **[ASSUME]** No certifications (Organic, Fairtrade, RA) are claimed at launch. | Certifications appear only per lot, with evidence. | Exporters |
| A11 | **[ASSUME]** "Specialty" is not claimed at the company level. | Use "specialty" only on lots with a documented cup score of 80+ from a named evaluator. | Exporters |

### Unresolved decisions (owner: founder)

1. **Legal entity and country of registration.** This affects the legal notice, privacy law, invoicing and Organization structured data.
2. **Business name and domain** (Section 5).
3. **Commission model and non-circumvention terms** with each exporter.
4. **Who pays for samples and couriers.**
5. **Whether the founder personally cups or inspects anything.** If yes, that is a key differentiator. If no, we say quality assessment is done by the exporter's graders.
6. **Geographic priority.** See Section 3; our recommendation stands unless you have a network somewhere specific.

---

## 3. Target buyers and positioning

### 3.1 Segment assessment — green coffee

Scores: 1 = poor, 5 = strong. Scores are **[REC]** judgements based on A1–A6.

| Segment | Typical order profile | Delivery needs | Repeat demand | Procurement complexity | Our ability to serve | Fit |
|---|---|---|---|---|---|---|
| **Importers / green traders** (EU, US, Asia, Middle East) | Multiple containers/season | FOB/CIF, contract-based | High | They are experts and already have exporter networks | Moderate: only if we bring new exporters, lots or responsiveness | **3** (secondary) |
| **Roasters already buying direct from origin** (mid-size to large, ≥1 FCL/yr or joining shared containers) | 1+ FCL, or part-container through the exporter's consolidation | FOB/CIF; they arrange import | High, crop-cycle based | They know the process but lack Ethiopian contacts/time | **Strong**: one contact, shortlists, samples, follow-through | **5 (primary)** |
| **New-to-Ethiopia importers/distributors in less-served markets** (e.g., Middle East, Asia, Eastern Europe, Africa) | 1+ FCL | CIF often preferred | Medium-high | High: unfamiliar with ECTA rules, grades, samples | **Strong**: guidance is the value | **4 (primary)** |
| **Small roasters needing local stock** (a few bags, delivered domestically) | 1–10 bags | Domestic delivery, local warehouse | Frequent, small | Low for them, high for us | **Weak**: we have no local stock (A5) | **1**: politely redirect |

**[REC] Primary launch segments:**
1. Roasters and roasting groups that already buy (or want to buy) directly from origin at container scale.
2. Importers/distributors new to Ethiopian coffee.

Serve established importers opportunistically. For small roasters, publish a polite "not a fit yet" message rather than accepting orders you can't fulfil.

**[REC] Geographic focus.** Start English-language, market-neutral, with outreach prioritised by where Ethiopian coffee already sells:
- Germany, Saudi Arabia and the United States were reported as the top three destinations in 2024/25.
- Japan and South Korea are also major buyers **[FACT]** (Xinhua/ECTA via search summary; Appendix A).

Which market to prioritise first depends on your network. If you have none, start with **the EU/UK plus one Gulf market**:
- The EU brings EUDR, which applies from **30 December 2026** for large/medium operators and **30 June 2027** for micro/small **[FACT]** (European Commission Access2Markets). EU buyers must collect geolocation and due-diligence data, and helping them get it from exporters is a concrete, time-bound service (subject to confirmation that exporters can supply it; see Section 8).
- The Gulf is a large, established Ethiopian-coffee market.

Treat this as a hypothesis to test through outreach, not a fixed choice.

### 3.2 Segment assessment — roasted coffee

| Segment | Fit | Reason |
|---|---|---|
| **Distributors/importers of an existing Ethiopian roasted brand** | **3** | Plausible if an exporter already exports a brand. Needs importer-of-record capability, food registration and labelling in the destination (e.g., US FDA facility registration and Prior Notice **[FACT]**, FDA; Appendix A). |
| **Bulk roasted buyers** (e.g., food-service distributors, diaspora retailers) | **2** | Shelf life and transit time are critical; everything is unconfirmed. |
| **Own-brand (private label)** | **Not offered** | Not confirmed. Do not market it. The inquiry form may ask "interested in own-brand?" purely to measure demand. |
| **Individual cafés/hotels abroad** | **1** | Order sizes are too small for international shipment from origin; they need a local distributor. Redirect. |

### 3.3 Problems we solve (and how we'll prove it)

| Buyer problem | Our answer | Substantiation available at launch |
|---|---|---|
| "I can't judge which Ethiopian exporters are reliable." | We work with a defined set of licensed exporters and can explain each one's strengths. | Named exporter partners (with written permission), licence numbers verified, founder's own visit notes and photos. |
| "Emails to origin go unanswered; time zones and language slow everything." | One English-speaking contact who replies within one business day and chases the exporter. | Published response commitment; measured response time in the CRM. |
| "I need several offers to compare, not one exporter's list." | A shortlist from multiple exporters against your spec. | Sample shortlist format (a template with a real example once available). |
| "Samples arrive late or don't match the shipment." | We coordinate offer and pre-shipment samples (PSS) and record the lot IDs. | A documented sample protocol on the site. |
| "EU rules (EUDR) require data from origin." | We request geolocation/due-diligence data from exporters up front. | Only once exporters confirm they provide it; otherwise stay silent. |

### 3.4 Why use us instead of going direct or using an importer?

Be candid on the site. That candour is itself a credibility signal.

- **Versus approaching exporters directly:** you get one contact across several exporters, specification matching, sample coordination and follow-through. Our fee is paid by `{{exporter / buyer — placeholder}}`, so `{{there is no added cost to you / our fee is shown in the quotation}}`.
- **Versus buying from an importer with local stock:** importers offer credit, local stock and small quantities. We don't. **Choose us when you buy at container scale, want direct contracts with Ethiopian exporters, or want lots that aren't on importer lists.** If you need a few bags delivered next week, an importer is the better choice. Saying so honestly filters out poor-fit leads.

### 3.5 How to describe our role accurately

**[REC]** Standard wording to reuse everywhere:
> "`{{Company}}` is an independent coffee sourcing agency. We connect business buyers with licensed Ethiopian coffee exporters, coordinate samples and offers, and follow each order through to shipment. The exporter is the seller: they sign the sales contract, invoice and ship. We are paid `{{by commission from the exporter}}`."

Never use: "our farms", "our washing station", "our warehouse", "we export", "direct from farmers", "direct trade" (unless a specific lot has documented direct producer relationships), "guaranteed quality", "fully sustainable", "lowest prices".

### 3.6 "Specialty" — is it supported?

**Not yet, at company level.** "Specialty" customarily refers to coffee scoring 80+ under the SCA cupping protocol. You have no lot-level cup scores yet. **[REC]** Use "specialty" only on individual lot pages that show the score, the evaluator (e.g., the exporter's Q grader), the date and a report. Company-level copy says "specialty and commercial grades, specified per lot."

### 3.7 Promises that need exporter confirmation (do not publish until confirmed)

- Minimum order per exporter/shipment type.
- Sample sizes, cost, courier and dispatch time.
- Shipping terms offered (FOB Djibouti, CIF, FCA) and indicative lead times.
- Certifications per lot.
- EUDR data availability.
- All roasted-coffee formats, shelf life, pack sizes and destinations.
- Pre-shipment sample approval before loading.
- Claims handling (what happens if an arrival doesn't match the PSS).

### 3.8 Does offering both categories help?

It helps slightly, because roasted coffee broadens relevance for distributors. It also adds complexity: separate specifications, forms, regulations and buyer expectations. **[REC] Keep roasted coffee at arm's length:**
- One page.
- One conditional branch in the form.
- A secondary position in navigation.
- A small homepage mention.

Promote it fully only when Section 15's readiness criteria are met.

**Homepage and navigation prominence:**
- **Primary nav:** Green coffee · Roasted coffee · How it works · Quality & traceability · About · **Request samples or a quote** (button).
- **Homepage:** two path cards, with green larger and first, and roasted smaller with "export inquiries" wording.

---

## 4. Competitor and search findings

### 4.1 Competitor set reviewed (preliminary: based on search snippets and sites' own descriptions; capabilities unverified)

| Type | Example | Positioning (from their own descriptions) | Operational advantage we lack |
|---|---|---|---|
| Ethiopian exporter with a large content hub | [Ethio Coffee Import & Export PLC](https://www.ethiocoffee.co/) | Family exporter, "30+ years", ships to importers/roasters in 40+ countries; lot documentation, cupping reports, GPS data; extensive buyer guides | Export licence, own sourcing, a mature content library. **The name clashes with our repo name. Do not use "Ethio Coffee" as a brand.** |
| Ethiopian exporters (specialty-positioned) | [Greenbean-coffee](https://greenbean-coffee.com/), [Dilbi](https://dilbicoffee.com/), [Speciality Arabica](https://arabica-coffee-ethiopia.com/), [AMG Coffee Export](https://amgcoffeeexport.com/), [Lucy Ethiopian Coffee](https://www.lucyethiopiancoffee.com/) | Claims such as "SCA-scored 84–92", GPS-mapped lots, PSS protocols, both specialty and bulk | They are the sellers of record. Several also describe roasted/wholesale options. |
| Exporter-cum-agent sites | [Afro Sourcing](https://afrosourcing.com/) | Multi-commodity exporter | Licence; but multi-commodity dilutes focus. **Our coffee-only focus is a differentiator.** |
| Ethiopia-specialist importers | [Trabocca](https://www.trabocca.com/) | Offices in Amsterdam, Addis Ababa, Minneapolis; online ordering from one 60 kg bag; 200 g samples; Q-grader cupping team | Local stock, small minimums, an ordering portal, cupping labs. **Do not compete on small orders.** |
| Large specialty importers | [Royal Coffee](https://royalcoffee.com/crown-jewels/), [Cafe Imports](https://www.cafeimports.com/north-america/offerings?origin=Ethiopia) | Lot pages with status (Spot / Afloat / At origin), 22 lb micro-lots, warehouses in several countries, Addis offices | Destination warehousing, lot-level data at scale, credit |
| Diaspora-led US importers | [Keffa Coffee](https://keffacoffee.com/), [Alpha Green Coffee Importer](https://alphagreencoffeeimporter.com/), [Highland Heritage / coffee-ethiopian.com](https://coffee-ethiopian.com/) | Ethiopian-focused, US warehouse, "roaster partner" framing | US stock and domestic delivery |

### 4.2 Comparison and gaps we can realistically fill

- **Direct export vs. destination stock are different offers.** Royal/Cafe Imports/Trabocca/Keffa sell stock already in the buyer's country. Exporters sell FOB/CIF from origin. We sit on the **direct-from-origin** side and must label all offers accordingly: "Ships from Ethiopia; not warehoused locally."
- **Common weaknesses among smaller exporter sites (from their descriptions and snippets):**
  - Broad unverifiable claims ("premium", "best", "fully traceable").
  - Multi-commodity dilution.
  - Few dated offers.
  - Little clarity about who invoices, how samples work, or what minimums are.
- **Gaps we can fill without operations we don't have:**
  1. **Commercial clarity:** who contracts and invoices, sample steps, minimums, incoterms, spelled out on one page.
  2. **Dated, evidence-linked lot pages** with "availability confirmed on {date}" and automatic expiry.
  3. **Multi-exporter shortlists** rather than a single exporter's catalogue.
  4. **Buyer-side guidance on EUDR readiness for Ethiopian coffee**, once exporters' data capability is confirmed.
  5. **Honest fit guidance** (who we're not right for).
- **Where we cannot compete:** small-bag domestic delivery, credit terms, a large cupping lab, content volume against ethiocoffee.co.

We make no inference about any competitor's traffic or commercial success.

### 4.3 Search-intent groups

Keyword volume and difficulty data were **not available** to this research. Validate them with a keyword tool before finalising titles, and with Search Console data after launch.

| Group | Example queries (illustrative, not measured) | B2B value | Target page |
|---|---|---|---|
| **G1 Green supplier/wholesale** | "Ethiopian green coffee supplier", "buy green coffee from Ethiopia", "Ethiopian green coffee wholesale", "Ethiopian coffee sourcing agent" | High | `/green-coffee/`, `/` |
| **G2 Origin + process (only what we can supply)** | "Guji natural green coffee", "Sidama washed grade 1 green", "Yirgacheffe washed green coffee lot" | High when a lot exists | Lot pages; later origin pages |
| **G3 Lots & samples** | "Ethiopian green coffee samples", "Ethiopia new crop offer 2026/27", "pre-shipment sample Ethiopia" | High | `/green-coffee/` offers section, `/how-it-works/` |
| **G4 Procurement questions** | "how to import coffee from Ethiopia", "Ethiopian coffee grades explained", "FOB Djibouti coffee", "EUDR Ethiopian coffee", "Ethiopian coffee harvest calendar" | Medium (research stage) | `/how-it-works/`, `/quality-traceability/`, later `/insights/` |
| **R1 Roasted distribution** | "Ethiopian roasted coffee wholesale", "roasted coffee exporter Ethiopia", "Ethiopian coffee brand distributor" | Medium | `/roasted-coffee/` |
| **R2 Private label** | "private label Ethiopian coffee" | **Not targeted**: capability unconfirmed | None |
| **Consumer (exclude)** | "best Ethiopian coffee beans", "Yirgacheffe coffee taste", "Ethiopian coffee ceremony", "buy Ethiopian coffee online" | Low / wrong audience | Don't target; don't build consumer content |

---

## 5. Brand and design direction

### 5.1 Naming

**Criteria:**
- Easy to spell and say in English.
- Doesn't claim farm or estate ownership, "direct trade" or exporting.
- Coffee-specific but not generic.
- Respectful use of Ethiopian language.
- Not already used by an Ethiopian coffee business.
- A `.com` or a credible country TLD is available.
- Works as an email domain.

**Shortlist.** None has been checked for domain or trademark availability. Check each against WIPO Global Brand Database, EUIPO/USPTO, the ECTA exporter list and a web search before choosing.

| Name | Rationale | Risk |
|---|---|---|
| **Buna Bridge** | *Buna/bunna* is "coffee" in Amharic/Afaan Oromo; "bridge" describes the connecting role | "Buna" is widely used, so it may be hard to register |
| **Highland Lot Partners** | Neutral, B2B, lot-focused | Less clearly Ethiopian |
| **Rift Origin Coffee Sourcing** | Refers to the Rift Valley landscape, where much southern Ethiopian coffee grows | Rift Valley is not exclusively Ethiopian |
| **Jebena & Co. Sourcing** | *Jebena* is the Ethiopian coffee pot, a warm cultural reference | Common in café names, so it can read as consumer |
| **Addis Lot Desk** | Signals an origin-based trading desk | Implies an Addis office; use only if true |

**[REC]** Prefer a name with "Sourcing" in the full legal or trading name, so the role is clear in search results and AI answers.

### 5.2 Palette

Warm neutrals with two category cues. Both cues pass WCAG AA with white text.

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1F1A17` | Body text, headings |
| `--ink-muted` | `#5E554C` | Secondary text (≈7:1 on paper) |
| `--paper` | `#FAF7F2` | Page background |
| `--stone` | `#EFE8DD` | Section bands, table headers |
| `--line` | `#D6CCBD` | Borders, dividers |
| `--green-cue` | `#2F5D50` | **Green-coffee** accent, primary buttons (≈7:1 with white) |
| `--green-tint` | `#E4EDE8` | Green path backgrounds and badges |
| `--roast-cue` | `#7A3E24` | **Roasted-coffee** accent, buttons on roasted pages (≈8:1 with white) |
| `--roast-tint` | `#F2E6DE` | Roasted path backgrounds and badges |
| `--signal` | `#B7791F` | "Availability expires soon" badge only (use with dark text) |
| `--error` | `#A1262B` | Form errors |

Avoid literal flag tricolours and the "tribal pattern" clichés.

### 5.3 Typography

**Headings: Fraunces** (variable serif). Use the optical size axis with "soft/wonk" set to 0 for a refined, contemporary warmth. **Body and UI: Source Sans 3**, which has tabular figures for specification tables.

Both are open-licensed. Self-host WOFF2 files, subset them to Latin plus the characters needed for Ethiopian place names in Latin script, and use `font-display: swap`. Don't use a third-party font CDN (it's worse for privacy and performance).

**Scale (rem, based on 16 px):**

| Element | Size | Line height |
|---|---|---|
| H1 | 2.5 (desktop) / 2.0 (mobile) | 1.15 |
| H2 | 1.75 | 1.25 |
| H3 | 1.25 | 1.3 |
| Body | 1.0625 | 1.6 |
| Small | 0.875 | 1.5 |

Keep lines to 65–75 characters.

### 5.4 Layout, spacing, hierarchy

- 12-column grid, 1200 px max content width, 8 px spacing scale (8/16/24/32/48/64/96).
- One idea per section. Generous white space. Section bands alternate `--paper` and `--stone`.
- **Hierarchy per page:** H1 → one-sentence value → primary CTA → evidence → detail.
- **Category cue system:**
  - Green pages use a 4 px top border, badges and buttons in `--green-cue`, plus a small "Green coffee" eyebrow label.
  - Roasted pages use `--roast-cue` in the same pattern.
  - Shared pages (home, how it works, about) use ink and neutral colours, with both cues only in the path cards.

### 5.5 Photography direction

- **Real photos only for claims about suppliers, facilities, people and products.** Every such image carries a caption: *"{{Exporter name}} washing station, {{place}}, {{month year}}. Photo: {{credit}}. Used with permission."*
- **Priority shots** from your photo access:
  - Raised drying beds.
  - Sorting tables.
  - Cupping sessions with sample cups and score sheets.
  - Green beans close-up on a neutral surface, with the lot tag visible.
  - Jute/GrainPro bags with export markings.
  - Container loading.
  - Roasted coffee in its actual packaging.
  - The founder, with a real portrait.
- Natural light, true colour, no heavy filters. Photograph people with consent and respect: working adults at their work, not poverty imagery, not staged "smiling farmer" stock.
- If you use stock or illustration anywhere, label it as illustrative and never place it next to a lot or exporter claim. Prefer no image to a misleading one.
- Store the photo source, permission and date in the CMS (Section 11).

### 5.6 Components

**Lot card (green):**
- Eyebrow: "Green · {{Region}}".
- Title: `{{Locality}} {{Process}} Grade {{n}}`.
- Three facts: crop year, process, bags available.
- Availability line: "Confirmed {{date}}", or an "Expired, ask for current offers" badge.
- Button: "Request sample".

**Roasted card:** eyebrow "Roasted · {{Brand/Unbranded}}", formats, pack sizes, MOQ or "MOQ on request", button "Ask about this coffee".

**Specification table:**
- Two columns (field / value) on mobile, which are more readable than wide tables.
- Tabular figures.
- Missing values show "Not yet provided", never blank or guessed.
- A source/evidence column where relevant (e.g., "Cup score 86.25 — {{evaluator}}, {{date}}, report PDF").

**Buttons:**
- Primary: solid, category-coloured.
- Secondary: outline.
- Tertiary: text link.
- Minimum 44×44 px tap target. Visible `:focus-visible` ring (2 px `--ink` + 2 px offset).

**Forms:**
- Labels above fields, no placeholder-only labels.
- Required fields marked "(required)".
- Inline errors with text and icon, not colour alone.
- Grouped fieldsets for each conditional branch.

**Navigation:**
- Desktop: a single sticky bar with logo, five links and the CTA button.
- Mobile: logo + "Menu" button with a full-screen menu, plus a persistent bottom-right "Request samples/quote" pill that hides while the form is in view.

### 5.7 Mobile behaviour

- Path cards stack with green first.
- Spec tables become definition lists.
- Tap-to-email and tap-to-WhatsApp links.
- The form is a single column, and conditional branches reveal inline without multi-page steps.

### 5.8 Accessibility and performance requirements

- WCAG 2.2 AA:
  - Semantic landmarks, one H1 per page, logical heading order.
  - Alt text on all content images; decorative images `alt=""`.
  - Keyboard-operable menu and form.
  - `prefers-reduced-motion` respected; no autoplay video.
  - Contrast ≥ 4.5:1 for text.
- **Core Web Vitals "good" at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 [FACT]** (Search Console Help / web.dev).
- **Budgets:**
  - ≤ 150 KB compressed CSS+JS on first load; no JS framework.
  - Hero image ≤ 120 KB AVIF/WebP with explicit width/height.
  - Two font files preloaded at most.
- Motion is limited to 150–200 ms colour/opacity transitions. No parallax, carousels or scroll-jacking.

### 5.9 Homepage first screen

**Desktop:**
- **Left 6 columns:**
  - Eyebrow: "Ethiopian coffee sourcing agency".
  - H1.
  - A one-sentence role statement.
  - Two buttons: [Green coffee → primary green] [Roasted coffee export inquiries → secondary outline].
  - A trust line underneath: "Working with {{n}} licensed Ethiopian exporters · Replies within one business day · Based in {{city, country}}".
- **Right 6 columns:** one real photograph (e.g., a cupping table or drying beds from a named exporter) with its caption.

**Mobile:**
- Eyebrow, H1 (2 lines max), role sentence.
- Two full-width buttons, green first.
- Trust line.
- The photo appears below the fold, so the text-first first screen keeps LCP fast.

**How visitors choose a path:** the first screen asks the only question that matters, "green or roasted?", through the two buttons. Sections 2–3 repeat the choice as large path cards with "Who this is for" lines, so buyers self-select before reading detail.

---

## 6. Sitemap and page specifications

### 6.1 Prioritised sitemap

**Launch (8 indexable pages plus legal):**

```
/                                 Home
/green-coffee/                    Green coffee: overview + current offers + sourcing profiles
/green-coffee/<lot-slug>/         Individual lot pages (only when real, dated offers exist)
/roasted-coffee/                  Roasted coffee export inquiries (single page)
/how-it-works/                    Process, roles, samples, quotes, payment, FAQs
/quality-traceability/            Grades, cupping, documentation, traceability, EUDR
/about/                           Founder, company facts, exporter partners
/contact/                         Unified inquiry form + direct contact details
/contact/thanks/                  Confirmation (noindex)
/privacy/                         Privacy notice
/terms/                           Website terms (+ /legal-notice/ if EU/DE-style imprint required)
```

**Shortly after launch (weeks 4–12):** `/insights/` with 3–5 evidence-based guides; `/green-coffee/archive/`, or keep expired lots at their own URLs (see 8.5).

**Deferred until demand or evidence justifies it:**
- Origin pages (`/origins/guji/` etc.), once each has 2+ real lots and exporter-supplied content.
- `/roasted-coffee/private-label/`, only if confirmed.
- Translations.
- Downloadable offer lists.
- Buyer resources hub.

**Deliberately combined:**
- Samples and quotes → one form (6.9).
- FAQs → inside How it works.
- Contact → with the form.
- Available lots → inside the Green overview until there are 8 or more.

### 6.2 Page specifications

For each page: audience/intent · URL · objective · H1 & core message · sections in order · required inputs · CTAs · internal links · success metric.

#### Home — `/`

- **Audience/intent:**
  - Buyers who searched a brand or agency term, or arrived from outreach, a referral or an AI answer.
  - Intent: "Who are you, can you supply what I need, and how do I start?"
- **Objective:** route to the right path in under 10 seconds; establish role and credibility.
- **H1:** "Ethiopian coffee, sourced through licensed exporters, with one accountable contact."
- **Sections:** see Section 7 (wireframe).
- **Required:** 1 real hero photo; exporter count and permission to name them; founder photo; response commitment.
- **CTAs:**
  - Primary: "Explore green coffee" / "Request samples or a quote".
  - Secondary: "Roasted coffee export inquiries".
- **Links:** all launch pages.
- **Metric:** % of sessions reaching a path page or the form; homepage → form start rate.

#### Green coffee — `/green-coffee/`

- **Audience/intent:**
  - Roasters buying at origin, importers and new-market distributors.
  - Intents G1, G3.
- **Objective:** show sourcing capability plus current offers; generate sample or quote requests.
- **H1:** "Ethiopian green coffee for roasters and importers."
- **Sections:**
  1. Intro. Who it's for, and who it isn't for (small local-stock buyers).
  2. "What we can source." Sourcing profiles: a grid by region × process, with an honest capability statement for each ("typically available", "seasonal, ask", "rare").
  3. "Current offers." Lot cards with a confirmation date. If there are none: "Current-crop offers are shared on request. Tell us your spec."
  4. "How buying works" in 5 steps, linking to How it works.
  5. "Minimums, samples and shipping." Plain facts or placeholders.
  6. "Quality and documentation." Short, linking to Quality & traceability.
  7. 4–5 FAQs specific to green.
  8. CTA band.
- **Required:**
  - Sourcing profiles confirmed by exporters.
  - Real lots if available.
  - MOQ/sample/incoterm facts.
  - Photos of green beans and bags.
- **CTAs:**
  - Primary: "Request green coffee samples" → `/contact/?path=green&request=samples`.
  - Secondary: "Ask for a quotation" → `/contact/?path=green&request=quote`.
- **Links:** lot pages, How it works, Quality, Contact.
- **Metric:** form starts per session with `path=green`; qualified green inquiries.

#### Green lot page — `/green-coffee/<region>-<locality>-<process>-<crop-year>/`

(e.g., `/green-coffee/guji-hambela-natural-2026-27/`)

- **Audience/intent:** G2/G3; a buyer evaluating a specific lot.
- **Objective:** a sample request for this lot.
- **H1:** "{{Locality}}, {{Region}} — {{Process}} Grade {{n}} ({{crop year}})."
- **Sections:**
  1. Summary facts + availability status (confirmed {{date}}; expires {{date}}).
  2. Specification table (Section 8).
  3. Cup profile with evaluator, date and a report link.
  4. Traceability: washing station/cooperative/producer, with a map reference if permitted.
  5. Photos, captioned.
  6. Commercial: minimum, packaging, incoterms, indicative shipment window, "price on request".
  7. "Similar options" (2–3 cards).
- **CTAs:** Primary "Request a sample of this lot" (form prefilled with the lot ID); secondary "Ask a question".
- **Metric:** sample requests per lot view.

#### Roasted coffee — `/roasted-coffee/`

- **Audience/intent:**
  - Distributors, importers and diaspora/specialty retailers.
  - Intent R1.
- **Objective:** capture qualified roasted-export inquiries without over-promising.
- **H1:** "Roasted Ethiopian coffee for distributors and importers."
- **Core message:** "Roasted in Ethiopia by licensed exporters and shipped to business buyers who can import food products. Formats vary by exporter; we'll confirm what's available for your market."
- **Sections:**
  1. Intro + who it's for.
  2. "What's currently possible", with only confirmed options. Otherwise the placeholder: "Existing Ethiopian brands and unbranded bulk packs, subject to exporter confirmation."
  3. "Before you inquire": freshness and transit, food-import registration and labelling in your market, minimums.
  4. A 4-step process.
  5. FAQs (freshness, packaging, branding, samples).
  6. CTA.
- **Required:** exporter-confirmed formats, pack sizes, roast-to-dispatch timing, shelf life; photos of real packaging.
- **CTAs:** Primary "Send a roasted coffee inquiry" → `/contact/?path=roasted`; secondary "Looking for green coffee instead?"
- **Metric:** roasted inquiries; share qualified.

#### How it works — `/how-it-works/`

- **Audience/intent:** evaluators, intent G4 ("how to import coffee from Ethiopia"); buyers checking legitimacy.
- **Objective:** remove uncertainty about roles, money flow and risk.
- **H1:** "How sourcing Ethiopian coffee with us works."
- **Sections:**
  1. Our role in one paragraph (3.5 wording).
  2. Who does what: a roles table (buyer / us / exporter / freight forwarder).
  3. Step-by-step: inquiry → qualification call → shortlist → samples → quotation → contract (with the exporter) → PSS approval → shipment & documents → arrival follow-up.
  4. Samples (types, cost, timing: placeholders).
  5. Quotations & pricing ("Prices are quoted per lot and shipment; we confirm current prices for your requirement"). Regulatory statements are omitted unless verified.
  6. Payment `{{placeholder}}`.
  7. If something goes wrong.
  8. Who we're not a fit for.
  9. FAQs.
- **CTAs:** Primary "Start an inquiry"; secondary "Read about quality & traceability".
- **Metric:** assisted conversions (visits before form submission).

#### Quality & traceability — `/quality-traceability/`

- **Audience/intent:** G4 ("Ethiopian coffee grades", "traceable Ethiopian coffee", "EUDR Ethiopia coffee").
- **Objective:** show competence and evidence practices; earn links and citations.
- **H1:** "Quality and traceability: what we check and what we can document."
- **Sections:**
  1. How Ethiopian coffee is graded (ECTA grades, specialty vs. commercial), in plain language, reviewed by an exporter.
  2. Who evaluates quality (exporter graders / Q graders; founder involvement, if any).
  3. Samples: offer, pre-shipment and arrival.
  4. Traceability levels (ECX/regional vs. washing-station vs. producer lots) and what we can document for each.
  5. Certifications: "only stated per lot with certificate evidence."
  6. EUDR: dates and what we request from exporters.
  7. Document list per shipment (placeholders).
- **Must say:** "Last reviewed {{date}} by {{name}}."
- **Metric:** organic entrances; assisted inquiries.

#### About — `/about/`

- **Audience/intent:** trust checking; brand searches; AI entity understanding.
- **Objective:** make the business identifiable and accountable.
- **H1:** "About {{Company}}."
- **Sections:**
  1. Who we are (founder name, photo, background, why Ethiopia).
  2. Company facts block: legal name, registration number, country, address, founded year, email, phone/WhatsApp, languages.
  3. Our exporter partners (names, licence status, what each is strong in; with permission).
  4. What we don't do (no farms, warehouses or exporting).
  5. How we're paid.
  6. Contact.
- **Metric:** visits → contact.

#### Contact / inquiry — `/contact/`

- **Objective:** capture a complete, routable inquiry.
- **H1:** "Request samples, a quotation, or a sourcing conversation."
- **Sections:**
  1. One form (Section 9).
  2. Sidebar: email, phone/WhatsApp, hours and time zone, response commitment, "What happens next" in 3 steps.
- **Metric:** form completion rate; spam rate < 5% of submissions.

#### Thanks — `/contact/thanks/` (noindex)

Confirms receipt, restates the next step and time frame, offers the How it works link, and fires a conversion event.

#### Legal

- `/privacy/`: controller identity, data collected, purposes, lawful basis, processors (email, hosting, analytics), retention, rights, contact.
- `/terms/`: website terms, with no sales terms, since the exporter's contract governs sales.
- Legal notice or imprint where the entity's jurisdiction requires it.

---

## 7. Homepage wireframe and draft copy

```
[Nav] Logo | Green coffee | Roasted coffee | How it works | Quality & traceability | About | [Request samples or a quote]

1. HERO
   Eyebrow: Ethiopian coffee sourcing agency
   H1: Ethiopian coffee, sourced through licensed exporters, with one accountable contact.
   Sub: We help roasters, importers and distributors find suitable Ethiopian green and roasted coffee,
        coordinate samples and offers from {{n}} licensed exporters, and follow each order to shipment.
   [Explore green coffee]  [Roasted coffee export inquiries]
   Trust line: Licensed exporter partners · Replies within one business day · Based in {{city, country}}
   Photo: {{real photo}}  Caption: {{exporter, place, date, credit}}

2. CHOOSE YOUR PATH (two cards, green larger)
   GREEN COFFEE — For roasters and importers buying at origin
     Washed and natural lots from {{regions confirmed}}. Container and {{part-container?}} shipments from Ethiopia.
     [See green coffee]
   ROASTED COFFEE — For distributors and importers
     Roasted in Ethiopia by licensed exporters. Formats and minimums confirmed per inquiry.
     [Ask about roasted coffee]

3. WHAT WE DO — AND WHAT WE DON'T
   We: understand your specification · shortlist exporters and lots · coordinate samples · compare offers · follow up
       documents and shipment.
   We don't: own farms or warehouses, export in our own name, or hold stock outside Ethiopia.
   The exporter signs the contract, invoices and ships. We are paid {{by commission from the exporter}}.
   [How it works]

4. HOW IT WORKS (5 steps, horizontal on desktop, vertical on mobile)
   1 Tell us what you need → 2 We shortlist → 3 You cup samples → 4 You receive a quotation from the exporter
   → 5 We follow the order to arrival

5. CURRENT GREEN OFFERS (3 lot cards, or the "offers shared on request" panel)
   [All green coffee]

6. QUALITY & EVIDENCE
   Every lot we present shows who evaluated it, when, and what documents exist. Where information is missing, we say so.
   [Quality & traceability]

7. WHO IS BEHIND {{COMPANY}}
   Founder photo + 3 sentences + exporter partner names/logos (with permission)
   [About us]

8. IS THIS RIGHT FOR YOU?
   Good fit: container-scale buyers, roasters buying at origin, importers new to Ethiopia.
   Not a fit (yet): a few bags delivered locally next week. A local green importer will serve you better.

9. CTA BAND
   Tell us what you're looking for. We reply within one business day.
   [Request samples or a quote]   or email {{email}} · WhatsApp {{number}}

[Footer] Company facts (legal name, reg. no., address) · Links · Privacy · Terms · "Last updated {{date}}"
```

### 7.1 Tone guide and messaging hierarchy

- **Messaging hierarchy:**
  1. **Role:** what we are.
  2. **Fit:** who it's for.
  3. **Process:** how it works.
  4. **Evidence:** what we can prove.
  5. **Action:** what to do next.
- **Tone:**
  - Plain, specific, calm. Short sentences.
  - Numbers with sources. Every adjective must be backed by a fact.
  - Say "we don't know yet" when true.
  - British or US English, used consistently. Pick one; we recommend US spelling if the US is a target.
- **Banned words, unless evidenced per item:** specialty (company-level), premium, finest, best, guaranteed, sustainable, ethical, direct from farmers, direct trade, lowest price, fully traceable, exclusive.

### 7.2 Green coffee page intro (draft)

> **Ethiopian green coffee for roasters and importers.**
> We source washed and natural Ethiopian coffees from {{regions}} through {{n}} ECTA-licensed exporters. Tell us your profile, volume and destination; we'll come back with a shortlist of suitable lots, arrange samples, and put you in contact with the exporter for a formal offer. Coffee ships from Ethiopia on {{FOB Djibouti / CIF}} terms. We don't hold stock in destination markets, so we're best suited to buyers purchasing {{by the container / from {{n}} bags}}.

### 7.3 Roasted coffee page intro (draft)

> **Roasted Ethiopian coffee for distributors and importers.**
> Some of our exporter partners roast in Ethiopia and export {{their own brand / unbranded bulk packs — placeholder}}. Because roasted coffee is time-sensitive and subject to food-import rules in your market, we start every roasted inquiry by confirming format, freshness window, labelling and minimum order with the exporter. If this matches what you need, tell us about your market and volumes.

### 7.4 How-it-works copy (draft)

> 1. **Tell us what you need.** Coffee type, volume, destination and timing. Five minutes on our form.
> 2. **We qualify and shortlist.** We may ask a few follow-up questions, then match your needs with suitable exporters and lots. We aim to reply within one business day. Shortlists usually take {{n}} days.
> 3. **Samples.** The exporter sends {{offer samples, size}} {{free / at cost of X — placeholder}}. Before shipment, you approve a pre-shipment sample from the actual lot {{if exporter confirms}}.
> 4. **Quotation and contract.** The exporter issues the quotation and sales contract, registered with Ethiopia's Coffee and Tea Authority as required. Payment terms are {{placeholder, e.g., CAD / L/C / advance}}.
> 5. **Shipment and follow-up.** We follow documents and shipment updates with the exporter and check in after arrival. If there's a problem, we {{placeholder: escalation process}}.

### 7.5 Reusable product-page outlines

- **Green lot:** status bar → summary (3 facts) → spec table → cup profile + evidence → traceability → photos → commercial terms → sample CTA → similar lots.
- **Green sourcing profile** (not a lot): "{{Region}} {{process}}: what's typically available" → typical characteristics (exporter-sourced, marked as typical) → seasonality → current lots (if any) → CTA "Ask about this profile".
- **Roasted offering:** brand/unbranded label → origin composition → roast levels → formats and pack sizes → minimums per format → freshness (roast-to-dispatch, shelf life per supplier) → documentation → CTA.

### 7.6 Form microcopy

- Intro: "Five minutes. The more you tell us, the more useful our first reply."
- Path: "What are you looking for? Green coffee (unroasted) / Roasted coffee / Not sure yet."
- Volume help: "Rough is fine. A full container holds around 300+ 60 kg bags. Choose 'Not sure' if you're exploring."
- Destination: "Country and port (if known). We confirm whether our exporters ship there."
- Privacy: "We use these details only to respond to your inquiry and, with your agreement, to share them with the exporter(s) relevant to your request. See our Privacy notice."
- Sharing consent (checkbox, required for referral): "I agree that {{Company}} may share my inquiry with relevant licensed Ethiopian exporters."
- Submit button: "Send inquiry".
- Error: "Please add your company email so we can reply." (Don't block free-mail addresses; just flag them in the CRM.)

### 7.7 Thanks page and acknowledgment email

**Thanks page:** "Thank you — we've received your inquiry (ref {{ID}}). {{Founder name}} will reply by {{next business day}}. Meanwhile: How it works →"

**Acknowledgment email** (sent immediately, plain text + simple HTML):

> Subject: We've received your {{green / roasted}} coffee inquiry (ref {{ID}})
> Hi {{first name}},
> Thanks for contacting {{Company}}. Here's what you asked for: {{summary of fields}}.
> Next: I'll review it and reply by {{date}}, usually with a few questions or a first shortlist.
> If anything is urgent, reply to this email or message me on WhatsApp at {{number}}.
> {{Founder name}}, {{Company}} — {{legal name, address}}

### 7.8 Initial FAQs (placeholders marked)

1. **Who are you and what is your role?** Independent sourcing agency; we connect buyers with licensed exporters and coordinate the process. We don't export in our own name.
2. **Who do I sign the contract with and pay?** The exporter `{{confirm}}`.
3. **How are you paid? Does it increase my price?** `{{Commission from exporter; price is the exporter's quotation}}`.
4. **What is the minimum order?** `{{Per exporter: typically X}}`. Tell us your volume and we'll confirm.
5. **Can I get samples? Do they cost anything?** `{{placeholder}}`. Samples come from the offered lot. Before shipment you can approve a pre-shipment sample `{{if confirmed}}`.
6. **How do samples relate to what I receive?** The lot ID on the sample, the PSS and the contract should match. We record them.
7. **Do you have stock in my country?** No. All coffee ships from Ethiopia.
8. **What shipping terms do you offer?** `{{FOB Djibouti / CIF port}}`, depending on the exporter.
9. **How long from contract to shipment?** `{{placeholder}}`, and it depends on season and lot.
10. **Is your coffee specialty? Certified?** Stated per lot with evidence. We don't make blanket claims.
11. **Can you help with EUDR data for EU imports?** `{{Only if exporters confirm}}`.
12. **What if the coffee doesn't match the approved sample?** `{{Claims process: placeholder}}`.
13. **(Roasted) How fresh will it be on arrival?** Roast-to-dispatch `{{x days}}`; transit `{{y}}`; supplier-stated shelf life `{{z}}`.
14. **(Roasted) Can you pack under my brand?** Not currently offered. Tell us if you're interested.

### 7.9 Building credibility without testimonials

1. **Identity:** real name, face, registered entity, address, phone; LinkedIn profile consistent with the site.
2. **Named, verifiable partners:** exporters' names and licence status, with permission. Ask each to add a line linking to you as their agent on their own site.
3. **Process transparency:** roles, money flow, sample protocol, "who we're not for".
4. **Evidence per lot:** cupping reports, dated confirmation, photo credits.
5. **Early case notes:** once a deal completes, publish an anonymised or permissioned "sourcing note" with what was requested, what was shortlisted, the timeline and the outcome. Only publish what actually happened.
6. **Responsiveness as proof:** meet the one-business-day promise and log it.
7. **Memberships and events,** only where real (e.g., AFCA, trade-show attendance).
8. **Visible "last updated" dates.**

---

## 8. Product data and exporter checklist

### 8.1 Green coffee data model

**E** = essential for publishing a lot · **O** = optional · **Pub** = public · **Q** = shared during qualification only.

| Field | E/O | Pub/Q | Notes |
|---|---|---|---|
| Internal lot ID + exporter lot ID | E | Pub (internal ID) / Q (exporter ID) | Keeps sample ↔ contract matching |
| Exporter | E | Q at launch, Pub with permission | Protects the introduction |
| Region / zone / woreda-locality | E (region), O (finer) | Pub | Use exporter's naming |
| Washing station / cooperative / producer | O | Pub if permitted | Traceability level field states what's known |
| Traceability level | E | Pub | enum: regional/ECX-grade · washing station · producer/farm |
| Harvest / crop year | E | Pub | e.g., 2026/27 |
| Variety | O | Pub | Often "Ethiopian landrace varieties / JARC selections". Never invent. |
| Process | E | Pub | enum + free text |
| Grade | E | Pub | ECTA grade (e.g., Grade 1–5) |
| Screen size, moisture %, water activity, defects | O | Pub | From exporter reports, with date |
| Cup score + evaluator + date + protocol + report file | O (E for "specialty") | Pub | No score without evaluator and date |
| Tasting notes | O | Pub | Attributed: "Exporter's cupping notes" |
| Available quantity (bags × kg) | E | Pub | With "confirmed on" |
| Minimum order | E | Pub (or "on request") | |
| Packaging | E | Pub | Jute / jute + GrainPro / vacuum |
| Sample availability, size, cost | E | Pub | Placeholder-safe |
| Certifications + certificate ID + holder + scope + expiry + file | O | Pub | Show only with evidence |
| EUDR data availability | O | Pub (yes/no/ask) / Q (actual geodata) | |
| Incoterms offered, port | E | Pub | |
| Indicative shipment window | E | Pub | "Indicative; confirmed in contract" |
| Price | — | Q only | Quotation only (8.4) |
| Availability confirmed on / expires on | E | Pub | Auto-expire (8.5) |
| Status | E | Pub | enum: available · reserved · sold · expired · archived |
| Photos (with source, permission, date) | O | Pub | |

### 8.2 Roasted coffee data model

| Field | E/O | Pub/Q |
|---|---|---|
| Product/brand name, offering type (existing brand · unbranded bulk · own-brand) | E | Pub (own-brand hidden unless confirmed) |
| Exporter/roaster | E | Q, or Pub with permission |
| Origin composition; single origin vs. blend (%) | E | Pub |
| Roast level(s) and profile description; consistency practice (e.g., batch QC) | E / O | Pub |
| Whole bean / ground (grind sizes) | E | Pub |
| Pack sizes, materials, valve, nitrogen flush | E | Pub |
| Minimum order per format | E | Pub or "on request" |
| Packaging customisation & setup (only if supported) | O | Q |
| Production lead time; roast-to-dispatch days | E | Pub |
| Shelf life & storage guidance **as stated by supplier** | E | Pub, attributed |
| Batch/lot coding and traceability | E | Pub |
| Labelling languages / destination compliance | E | Q (verified per market) |
| Samples: size, cost | E | Pub |
| Certifications/documentation (food safety certs, e.g., ISO 22000/FSSC 22000 if held) | O | Pub with evidence |
| Shipping: mode (sea/air), incoterms, transit estimate | E | Pub (indicative) |
| Export destinations served previously | O | Q |
| Price | — | Q only |
| Confirmed on / expires on / status | E | Pub |

### 8.3 Actual products vs. representative capability

**[REC] Use a combination.**
- **Sourcing profiles** (evergreen): region × process options that exporters confirm they can typically source, labelled "typical availability, confirmed per season."
- **Current offers** (dated): specific lots with evidence, shown only when an exporter gives a dated offer.

The site stays useful between crops, and it never implies live inventory.

### 8.4 Pricing

**[REC] Quotation-only, publicly explained. This is a commercial choice (see Revision, correction 4).** Reasons:
- Prices move with the market.
- A reported weekly minimum export price constrains contract prices. It does not by itself prohibit publishing prices.
- Prices depend on incoterm, volume and exporter.

Explain what a quotation includes: price basis (e.g., US¢/lb FOB Djibouti), validity period, payment terms, shipment window. Don't publish indicative prices until you have a reliable weekly update process.

### 8.5 Missing data, outdated availability, discontinued products

- **Missing field:** display "Not yet provided." Never leave it blank or estimate.
- **Availability:**
  - Every lot has `confirmed_on` and `expires_on` (default: confirmed + 14 days; configurable).
  - A daily job flips expired lots to `expired`: the badge "Availability expired — ask for current offers" appears, and the sample CTA becomes "Ask for similar lots".
  - A dashboard lists lots expiring within 3 days so you can re-confirm with the exporter.
- **Sold/archived lots:**
  - Keep the URL live (HTTP 200) with the "Sold / no longer available" status and links to similar lots and the Green page. That preserves useful history and links.
  - Remove the lot from listings and the XML sitemap after 90 days.
  - Return 410 only for lots that were never real or are unsafe to show.
  - Don't redirect every sold lot to the homepage.
- **Structured data:** don't use Product/Offer markup with price at launch (8.4). If you later add it, the availability must match the visible status. Google flags mismatches such as InStock markup on a sold-out page **[FACT]** (Google Search Central; Appendix A).

### 8.6 Exporter information-request checklist

Send this per exporter. A short version is in Section 15.

**Company and compliance**
- [ ] Legal name, ECTA export licence number and expiry, year established.
- [ ] Permission to name them on our site and to use their logo and photos (written).
- [ ] Destination countries shipped to in the last 2 years; typical buyers (importers/roasters).
- [ ] Documents normally provided: phytosanitary cert, certificate of origin, ICO certificate, weight/quality certs, packing list, B/L.
- [ ] EUDR: can they provide plot geolocation and due-diligence information? For which lots?
- [ ] Certifications held (organic, Fairtrade, RA, food-safety) with certificate copies and scope.

**Green coffee**
- [ ] Regions/processes/grades they can typically supply; seasonality by month.
- [ ] Current or next-crop offer list with lot IDs, quantities, grades, cup scores (who/when), photos.
- [ ] Minimum order: FCL only? Part-container? Consolidation with other buyers?
- [ ] Packaging options.
- [ ] Incoterms offered (FOB Djibouti, CIF), typical contract-to-shipment time.
- [ ] Samples: offer-sample size, cost, courier, dispatch time; PSS policy; arrival-sample practice.
- [ ] Payment terms they accept (CAD, L/C, advance %).
- [ ] Claims process for quality/weight discrepancies.
- [ ] How often they can update availability (weekly?) and in what format.

**Roasted coffee**
- [ ] Do they export roasted coffee today? Brands, destinations, volumes.
- [ ] Offerings: existing brand / unbranded bulk / buyer's brand (yes/no, conditions).
- [ ] Roast levels, whole bean/ground, pack sizes, materials, valves, nitrogen flushing.
- [ ] MOQ per format; production lead time; roast-to-dispatch days.
- [ ] Shelf life statement and basis; storage guidance.
- [ ] Batch coding; food-safety certification; experience with destination registration and labelling (e.g., US FDA facility registration).
- [ ] Samples: availability and cost.
- [ ] Photos of actual products and packaging.

**Commercial relationship**
- [ ] Commission rate/basis, when it's earned and paid, and on which orders (first and repeat).
- [ ] Introduced-buyer registration: how we register a lead with them, and the protection period.
- [ ] Who owns follow-up with the buyer after introduction.
- [ ] Response-time expectations for quotes and samples.

---

## 9. Inquiry and operational workflows

### 9.1 Journeys

**Green:**
1. First visit (search / outreach link / referral).
2. `/green-coffee/` or a lot page.
3. Form (`path=green`, request = samples | quote | both | advice).
4. Auto-acknowledgment.
5. Qualification reply or call within 1 business day, confirming volume, spec, destination, timing, incoterm and sample terms.
6. Register the buyer with the exporter(s), with consent.
7. Shortlist, then offer samples dispatched (log lot IDs and tracking).
8. Buyer feedback, then exporter quotation.
9. Contract (exporter–buyer), then PSS approval, shipment and documents.
10. Arrival check-in.
11. Repeat: pre-crop planning outreach 8–10 weeks before new-crop offers `{{timing to confirm with exporters}}`.

**Roasted:**
1. Visit `/roasted-coffee/`.
2. Form (`path=roasted`).
3. Acknowledgment.
4. Qualification: import capability, market rules, format, MOQ, frequency.
5. Exporter confirms feasibility.
6. Samples (roasted, with roast date).
7. Quote.
8. Label and compliance check (buyer's responsibility, verified).
9. Order, production and dispatch.
10. Arrival and freshness check.
11. Reorder cadence.

### 9.2 CTAs

- **Primary everywhere:** "Request samples or a quote".
- **Path-specific:** "Request green coffee samples" / "Send a roasted coffee inquiry".
- **Secondary:** "Ask a question" (the same form with `request=advice`), email and WhatsApp links.

### 9.3 One form or two?

**[REC] One form with conditional branches.** Samples and quotes require nearly the same information, and many buyers want both. The `request` field distinguishes them for routing. One form means one validation path, one spam filter and one CRM model.

### 9.4 Fields

**Step 1: always shown (minimum useful set):**

| Field | Required |
|---|---|
| Full name | Yes |
| Company | Yes |
| Business email | Yes |
| Country (select) | Yes |
| Company website | No, but strongly encouraged |
| Buyer type: Importer/trader · Roaster · Distributor/wholesaler · Retailer · Café/hospitality · Other | Yes |
| Looking for: Green · Roasted · Not sure | Yes |
| Request: Samples · Quotation · Both · Advice/first conversation | Yes |

**Green branch:**

| Field | Options | Required |
|---|---|---|
| Quantity per shipment | < 10 bags · 10–50 · 50–150 · 150–320 (≈ 1 FCL) · > 1 FCL · Not sure | Yes |
| Coffee preferences | Region: any + multi-select · Process: washed/natural/other/any · Quality tier: specialty (80+) / commercial / not sure | No |
| Destination port/country | | Yes, if different from Country |
| Timing | Within 3 months · 3–6 months · Planning next crop · Exploring | Yes |
| Incoterm preference | FOB · CIF · Not sure | No |
| Requirements | Certifications, EUDR data, packaging | No |
| Specific lot ID | Hidden; prefilled from lot page | — |

**Roasted branch:**

| Field | Options | Required |
|---|---|---|
| Interest | Existing Ethiopian brand · Unbranded bulk · Own-brand (demand signal only; label "not currently offered — tell us if interested") | Yes |
| Format | Whole bean · Ground · Either | No |
| Pack size | Retail (≤ 1 kg) · Food service (1–5 kg) · Other | No |
| Quantity per order (kg) | Bands | Yes |
| Frequency | One-off · Monthly · Quarterly | Yes |
| Destination country | | Yes |
| Do you already import food products into this country? | Yes/No | Yes |

**Always last:**
- Message (optional).
- How did you hear about us? Search engine · AI assistant (ChatGPT, Claude, Gemini, Perplexity…) · Referral · LinkedIn · Event · Our outreach · Other.
- WhatsApp/phone (optional).
- Sharing consent checkbox.

**Progressive qualification:** anything not above (annual volume, payment preference, cup protocol, label requirements) is asked in the first reply or call, not on the form.

### 9.5 Spam protection

1. Honeypot field.
2. Minimum time-to-submit (e.g., < 3 s = reject silently).
3. Cloudflare Turnstile (privacy-friendlier than reCAPTCHA; free tier).
4. Server-side rate limit per IP.
5. Don't block free-mail domains, but tag them.

### 9.6 Contact placement

- **Email:** header on mobile menu, footer, contact sidebar, acknowledgment email.
- **WhatsApp:** contact sidebar + footer as `https://wa.me/{{number}}`. WhatsApp is common in the Ethiopian and many buyer-market trades, but it is secondary to the form, because the form captures structured data.
- **Phone:** footer and contact page, with hours and time zone.

### 9.7 CRM (built into Django admin)

**Stages:**
`New → Contacted → Qualified | Not a fit (reason) → Registered with exporter → Samples sent → Samples feedback → Quote issued → Negotiating → Contract signed → Shipped → Delivered → Repeat opportunity | Lost (reason)`

**Fields:**
- Inquiry ID, path, request type, source/UTM, landing page, "heard about us".
- Exporter(s) assigned; **introduction date and confirmation from the exporter** (commission evidence).
- Sample records (lot IDs, dispatch/receipt dates, feedback).
- Quote reference, value, currency, volume.
- Contract reference, shipment date, order value.
- Commission expected/received.
- Next action + due date.

**Routing:** a single owner (founder). Email notification per submission with a link to the admin record. A daily digest of overdue next actions.

**Response commitment:**
- First human reply ≤ 1 business day.
- Shortlist ≤ `{{5}}` business days after qualification, subject to exporter replies.

### 9.8 Definition of a qualified inquiry

**Green:** all of the following:
- A business buyer with an identifiable company.
- Destination served (or servable) by a partner exporter.
- Quantity ≥ the relevant exporter minimum, or willing to join a consolidation if offered.
- Purchase timing within 6 months or next crop.
- Responds to the qualification reply.
- Accepts the sample terms.

**Roasted:** all of the following:
- A business that can import food products into the destination (or uses an importer of record).
- Volume ≥ the exporter MOQ for the format.
- Format the exporter confirms it can supply.
- Destination labelling/registration achievable.
- Accepts the transit/freshness window.

### 9.9 Arrangements required with exporters

| Arrangement | Needed for | Owner |
|---|---|---|
| Availability updates (weekly, dated) | Lot pages, expiry | Exporter → founder |
| Quote turnaround (e.g., ≤ 2 business days) | Response promise | Exporter |
| Sample dispatch (who, cost, courier, tracking) | Sample stage | Exporter/founder |
| Quality verification (grader, report format) | Evidence on lot pages | Exporter |
| Introduced-buyer registration & protection period | Commission | Both, in writing |
| Commission basis, timing, repeat orders | Revenue | Both, in writing |
| Follow-up ownership after introduction | Buyer experience | Both, in writing |
| Claims handling | Trust copy | Exporter |

---

## 10. SEO and AI-discovery strategy

### 10.1 Keyword-to-page mapping (one primary intent per page)

| Page | Primary intent | Secondary intents | Must not target |
|---|---|---|---|
| `/` | Ethiopian coffee sourcing agency (brand + role) | "source coffee from Ethiopia" | Specific lots, how-to |
| `/green-coffee/` | Ethiopian green coffee supplier / wholesale / for roasters | green coffee samples Ethiopia | Roasted terms |
| Lot pages | {{region}} {{process}} grade {{n}} green coffee {{crop}} | — | Generic supplier terms |
| `/roasted-coffee/` | Ethiopian roasted coffee wholesale/export | Ethiopian coffee brand distributor | Private label |
| `/how-it-works/` | how to import / buy coffee from Ethiopia | samples, contracts, payment | Supplier terms |
| `/quality-traceability/` | Ethiopian coffee grades, traceability, EUDR Ethiopia coffee | cupping, documents | Supplier terms |
| `/about/` | Brand name | — | — |

**Cannibalisation rule:** before adding any page, check the table. If the primary intent is already owned, improve the existing page instead.

### 10.2 Architecture and internal linking

- Keep the structure flat (≤ 3 clicks to any lot).
- Breadcrumbs on lot pages (Home › Green coffee › Lot).
- Every lot links to Green, Quality, How it works and Contact. Green links to all live lots.
- Contextual links use descriptive anchors ("how pre-shipment samples work"), not "click here".

### 10.3 Titles, descriptions, headings (templates)

| Page | Title | Meta description |
|---|---|---|
| Home | `{{Company}} — Ethiopian Coffee Sourcing Agency` | "We connect roasters, importers and distributors with licensed Ethiopian exporters for green and roasted coffee — samples, offers and shipment follow-up." |
| Green | `Ethiopian Green Coffee for Roasters & Importers \| {{Company}}` | |
| Lot | `{{Locality}} {{Process}} G{{n}} {{Crop}} — Ethiopian Green Coffee \| {{Company}}` | |
| Roasted | `Roasted Ethiopian Coffee for Distributors \| {{Company}}` | |

One H1 per page, matching the title's intent. H2s mirror the sections.

### 10.4 Technical SEO

- **Crawlable content:**
  - All content is server-rendered HTML; no content injected only by JS.
  - Real `<a href>` links. Lots are listed in HTML, not loaded by filters.
- **Canonicals:**
  - Self-referencing canonical on every page.
  - Query-string variants (`?path=`, UTM) canonicalise to the clean URL.
  - `/contact/?…` canonical → `/contact/`.
- **Redirects:**
  - 301 from http→https and from non-preferred host (www vs. apex).
  - Trailing-slash consistency.
  - Wagtail redirects module for later changes.
- **XML sitemap:** Wagtail sitemap framework. Include only indexable 200 pages, with `lastmod` from real content changes. Exclude thanks and legal pages if desired.
- **robots.txt:** allow all. Disallow `/admin/`, `/contact/thanks/`. Point to the sitemap.
- **Staging:** HTTP basic auth + `X-Robots-Tag: noindex` header. Never rely on robots.txt alone for staging.
- **Noindex:** the thanks page, internal search (none at launch), filtered listings.
- **Images:**
  - AVIF/WebP with JPEG fallback via Wagtail renditions, `srcset`/`sizes`, width/height attributes.
  - Descriptive filenames; alt text written for meaning.
  - Lazy-load everything below the fold, but never the LCP image.
- **Documents (cupping reports, spec sheets):**
  - PDF only as a supplement. The key facts always appear in HTML on the page.
  - PDFs get a descriptive filename and title metadata, and are linked from the page.
- **Mobile/CWV:** see 5.8. Measure with PageSpeed Insights before launch and the Search Console CWV report after.

### 10.5 Structured data (JSON-LD, matching visible content only)

- **Organization**, sitewide on the home and about pages: `name`, `legalName`, `url`, `logo`, `email`, `telephone`, `address`, `foundingDate`, `sameAs` (LinkedIn, and other real profiles only), `description` using the 3.5 role wording.
- **WebSite** (name + URL).
- **BreadcrumbList** on lot pages.
- **FAQPage:** Google restricts FAQ rich results to authoritative government/health sites. Adding the markup is harmless but won't produce rich results. **[REC]** Omit it at launch; plain visible Q&A is what matters.
- **Product/Offer:** not at launch (no public price, B2B, quotation-only). Revisit only if public, maintained prices exist. Never mark up availability that doesn't match the visible page.
- **Don't use:** Review or AggregateRating (no reviews), LocalBusiness (unless you have a customer-facing premises), or "Brand" claims for coffee you don't own.

### 10.6 Changing availability

Covered in 8.5. Also: update `lastmod` only on real changes; show a visible "Availability confirmed {{date}}" line; never show "in stock".

### 10.7 Search Console and Bing

- Verify the domain property (DNS) in Google Search Console at launch and submit the sitemap.
- Also verify in **Bing Webmaster Tools**, since Bing's index powers Microsoft Copilot search results, and submit the sitemap there.
- Monitor coverage, CWV and queries weekly for the first 90 days.

### 10.8 International targeting and translations

- **At launch:** one English site, with no hreflang and no country redirects. Mention served destinations in copy.
- **Justify a translation when all of the following are true:**
  1. ≥ 3 qualified inquiries (or strong outreach traction) from one language market.
  2. Someone fluent can review content and answer replies in that language.
  3. You can maintain it.
- Likely candidates: German, Arabic, Japanese/Korean, depending on traction.
- Implement as subdirectories (`/de/`) with hreflang. Never publish unreviewed machine translation.

### 10.9 Content programme (90 days, 4–6 pieces maximum)

Each piece must contain something competitors' generic guides lack: exporter-sourced specifics, dated observations, real photos or data from your own sample runs.

1. **"Ethiopian green coffee grades, explained by an exporter"**: an interview with a partner's grader, with real grading sheet photos. Supports `/quality-traceability/`.
2. **"Ethiopian harvest and shipment calendar, {{crop year}}"**: month-by-month from partner exporters, dated and updated annually.
3. **"Buying Ethiopian coffee under EUDR (from 30 Dec 2026)"**: what to request from exporters and what partners can supply. Only after confirmation.
4. **"How pre-shipment samples work when buying from Ethiopia"**: your actual protocol with a real timeline.
5. **"FOB Djibouti vs CIF: what's in an Ethiopian coffee quotation"**: with an anonymised sample quote structure.
6. **(Roasted, only if confirmed) "Importing roasted coffee from Ethiopia: freshness, packaging and labelling"**: supplier facts only, with a "check with your regulator" note.

**Rules:**
- Named author and reviewer; "Last reviewed" date.
- No AI-generated bulk articles.
- Stop adding content if Search Console shows no impressions for B2B queries after 90 days, and reassess instead.

### 10.10 Earning mentions and links (legitimate)

- **Exporter partners:** ask each to list you as their international sourcing/sales agent, with a link. This is the most relevant link you can get.
- **Industry associations:** AFCA (African Fine Coffees Association) membership or event participation; SCA membership if budget allows; the Ethiopian Chamber of Commerce; bilateral chambers in target markets (e.g., German–Ethiopian business networks). Get listed only where membership is real.
- **Trade events:** exhibiting or attending (World of Coffee, SCA Expo, AFCA conference) gives legitimate listings and relationships.
- **Useful resources:** the harvest calendar and grades guide are link-worthy for coffee educators and trade press. Pitch them to coffee trade publications with original information, not with a press release about launching.
- **Profiles:** LinkedIn company page, consistent business directories in your registration country.
- **Never:** buy links, use PBNs or mass directory submissions, or swap links with irrelevant sites.

### 10.11 AI-assisted search and LLM visibility

**Established practices (do these):**
1. **Clear entity identity:**
   - The same legal name, trading name, description, address, email and phone on the site, LinkedIn and directories.
   - An About page with a facts block.
   - Organization JSON-LD with `sameAs`.
2. **Accessible HTML:** the facts are in server-rendered text, not only in images or PDFs.
3. **Specific, attributable facts:** "We work with {{n}} ECTA-licensed exporters: {{names}}", "Ships FOB Djibouti", "Minimum {{x}}", each with dates. AI answers tend to reuse precise, well-sourced statements. Vague adjectives give them nothing to cite.
4. **Q&A sections** written for buyers' real questions (7.8), in visible text.
5. **Attribution and update dates:** author, reviewer and "last updated" on guides and lot pages; the date changes only on meaningful updates.
6. **Third-party corroboration:** exporter partner pages, association listings, trade press. These matter more than anything on your own site.
7. **Crawler access (robots.txt).** These are separate decisions:
   - **Search/retrieval bots:** allow them. They are how assistants find and cite you. `OAI-SearchBot` and `ChatGPT-User` (OpenAI), `Claude-SearchBot` and `Claude-User` (Anthropic), `PerplexityBot`, plus `Googlebot` and `Bingbot`. OpenAI's and Anthropic's documentation both state that each bot is controlled independently: blocking the training bot does not block the search bot, and vice versa **[FACT]** (OpenAI crawler docs, Anthropic help centre).
   - **Training bots:** `GPTBot`, `ClaudeBot`, `Google-Extended` (Gemini training/grounding control, which does not affect Google Search), `CCBot`. This is a business choice. **[REC] Allow them.** Your content is marketing, and being known to models helps an unknown brand. Block them only if you publish proprietary data (e.g., exporter price lists), which shouldn't be public anyway.
8. **Google specifically:** Google states that AI Overviews/AI Mode rely on normal Search systems. There are no special requirements, and no llms.txt, special schema or "AI files" are needed **[FACT]** (Google Search Central AI optimisation guide, May 2026).

**Experimental or low-value (optional, low effort, no expectations):**
- **llms.txt.** Google says Search ignores it; it "won't harm (nor help)" Google visibility **[FACT]**. Some other tools may read it. **[REC]** Skip it at launch. If you add one later, keep it a short index of your key pages that mirrors visible content, and spend under an hour on it.
- **IndexNow** (supported by Bing and some others): cheap to add for faster discovery of lot changes. Optional.
- Anything promising "guaranteed AI citations", hidden AI-only text or prompt-injection text: **never.**

**Measurement (with limitations):**
- Referral sessions from `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com` in analytics. Many AI visits arrive with no referrer, so this undercounts.
- The "How did you hear about us? → AI assistant" form answer, which is the most useful signal.
- A monthly manual check: ask 5 fixed buyer-style questions in 3–4 assistants and log whether and how you're described (accuracy, not ranking). This is qualitative, varies by user and session, and is not a KPI.
- Google Search Console includes AI Overview/AI Mode impressions within its overall Search performance data. You can't isolate them cleanly.

---

## 11. Technical architecture (superseded for launch: Next.js; see Revision and README)

### 11.1 Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Django + Wagtail**, server-rendered | Your skills; structured page models for lots; built-in image renditions, sitemaps, redirects, forms-to-DB; admin doubles as CRM | Needs a server and a DB; some ops work | **Selected** |
| Static site (Astro/Hugo) + form SaaS | Cheapest and fastest; minimal ops | Lot expiry, inquiry CRM and structured data need extra services; non-Python | Viable fallback |
| Hosted builder (Webflow/Squarespace) | Fast to design | Weak for structured lot data, expiry logic and a CRM; recurring cost; lock-in | Not recommended |

### 11.2 Selected stack

- **Rendering:**
  - Django templates, server-rendered. Minimal vanilla JS only for conditional form branches and the mobile menu (progressive enhancement; the form works without JS by showing all branches).
  - CSS hand-written, or Tailwind with purge, under budget.
- **CMS:**
  - Wagtail (current LTS).
  - Page types: `HomePage`, `StandardPage` (StreamField: text, facts table, FAQ, CTA band, image+caption), `GreenIndexPage`, `GreenLotPage`, `RoastedPage`, `ContactPage`.
  - Snippets: `Exporter`, `Certification`, `EvidenceDocument`, `Photo` (with source/permission/date fields).
- **Shared product info:**
  - An abstract `CoffeeOffering` (exporter, status, confirmed_on, expires_on, evidence docs, photos).
  - `GreenLotPage` and (later) `RoastedOfferingPage` extend it with category-specific fields.
  - Enums for process, grade, traceability level, status.
- **Scheduled job:** a daily management command (via the host's cron) expires lots, then emails an "expiring soon" digest and an "overdue CRM actions" digest.
- **Forms:**
  - A Django form + `Inquiry` model (not Wagtail's form builder, so conditional validation stays in code).
  - Turnstile + honeypot + timing check.
- **Transactional email:**
  - Postmark or Amazon SES (or Brevo) via `django-anymail`.
  - SPF, DKIM, DMARC on the domain.
  - Acknowledgment to the buyer; notification to the founder.
- **CRM:**
  - Django admin on the `Inquiry` model, with stages, `SampleRecord`, `Quote`, `Order` and `Commission` inline models, list filters by path/stage/source, and CSV export.
  - No external CRM at launch. Revisit HubSpot/Pipedrive only above ~30 active opportunities.
- **Hosting:**
  - A managed PaaS (Render, Fly.io or Railway) or a small VPS (e.g., Hetzner) with Docker.
  - Managed Postgres.
  - Object storage (S3-compatible, e.g., Cloudflare R2 / Backblaze B2) for media.
  - Cloudflare in front for DNS, TLS, CDN caching of static/media and Turnstile.
  - **Recurring cost:** hosting + DB + storage + email typically lands in the low tens of USD/month at this scale. Confirm current prices on the providers' sites. Plus domain and email hosting (Google Workspace or Microsoft 365 per user).
- **Image delivery:** Wagtail renditions (AVIF/WebP), responsive `srcset`, far-future cache headers via CDN.
- **Security:**
  - `DEBUG=False`, secrets in env vars, HSTS, secure cookies, CSRF.
  - CSP (self + Turnstile).
  - Admin behind a non-default path + 2FA (`django-otp` or `wagtail-2fa`).
  - `pip-audit`/Dependabot, and updates monthly.
- **Backups:** daily automated Postgres dumps to separate object storage (30-day retention) plus media bucket versioning. **Test a restore before launch.**
- **Monitoring:** Sentry (free tier) for errors, an uptime monitor (e.g., UptimeRobot / Better Stack free), Search Console alerts.
- **Analytics:**
  - Privacy-friendly: Plausible (hosted) or self-hosted Umami. Cookieless, so no consent banner is typically needed for the analytics itself; confirm under your jurisdiction.
  - GA4 is optional. It requires a consent banner in the EU/UK.
- **Environments:**
  - `local` → `staging` (basic auth + noindex header) → `production`.
  - Deploy from the `main` branch via CI (GitHub Actions: lint, tests, `manage.py check --deploy`, migrations).
- **Content maintenance:**
  - Weekly: re-confirm lots.
  - Monthly: dependency updates, backup restore spot-check, review of Search Console.
  - Quarterly: review copy placeholders and FAQs against real questions.

**Excluded:** buyer accounts, checkout, payments, marketplace features, live price feeds, client portals.

---

## 12. Prioritised implementation backlog (superseded for launch; items below form the post-launch backlog)

Effort is in founder-days with AI assistance (≈ 6 productive hours each). Rough estimates.

### Required before launch

| # | Item | Depends on | Effort | Acceptance criteria |
|---|---|---|---|---|
| B1 | Choose name; register domain; set up professional email with SPF/DKIM/DMARC | Name checks | 1 | mail-tester score ≥ 9/10; DMARC record present |
| B2 | Send exporter checklist (8.6); get written permission for names/photos | — | 1 (+ waiting) | ≥ 1 exporter has returned the core fields and a signed permission |
| B3 | Written agreement covering commission + introduced-buyer registration | B2 | Business task | Signed document on file |
| B4 | Django + Wagtail project scaffold, settings split, Docker, CI | — | 2 | CI green; `check --deploy` passes on prod settings |
| B5 | Design tokens, typography, base templates, nav, footer, components | B4 | 3 | Palette/typography match Section 5; axe-core zero serious issues on the template page |
| B6 | Page models + StreamField blocks; Exporter/Photo/Evidence snippets | B4 | 3 | Editor can create each page type without code changes |
| B7 | `GreenLotPage` with fields (8.1), status, confirmed/expires, daily expiry command | B6 | 2 | A lot with `expires_on` in the past shows the "expired" badge after the command runs; covered by tests |
| B8 | `Inquiry` model + conditional form + spam protection + ack/notification emails + thanks page | B4, B1 | 3 | Both branches validate server-side; no-JS submission works; ack email arrives within 1 min; honeypot submission rejected |
| B9 | Admin CRM: stages, inlines, filters, CSV export, overdue digest | B8 | 2 | Founder can move an inquiry through all stages; the digest lists overdue items |
| B10 | Write launch copy (Sections 7, 6.2) with placeholders resolved or deliberately hidden | B2, B3 | 4 | No `{{` in the rendered production HTML (automated test) |
| B11 | Photos: select, caption with source/permission/date, optimise | B2 | 1 | Every content photo has a caption and a permission record |
| B12 | SEO basics: titles/meta, canonicals, sitemap, robots, redirects, Organization/WebSite/Breadcrumb JSON-LD | B6 | 1 | Rich Results Test valid; sitemap lists only 200 indexable URLs; staging returns noindex header |
| B13 | Analytics (Plausible/Umami) + events (Section 14) | B8 | 0.5 | Events visible in the dashboard from a staging test |
| B14 | Privacy notice, terms, legal notice (if required) | B1, entity | 1 (+ review) | Pages live; form links to the privacy notice |
| B15 | Hosting, DB, media storage, CDN, backups, Sentry, uptime | B4 | 1.5 | Restore test successful; uptime alert fires on a forced outage |
| B16 | Search Console + Bing Webmaster verification, sitemap submitted | Launch | 0.25 | Sitemap status "Success" |
| B17 | Prelaunch QA (Section 13) | All | 1 | Checklist 100% passed |

**Total ≈ 27 founder-days of build and content**, excluding waiting on exporters.

### Useful shortly after launch (weeks 2–12)

| # | Item | Effort | Acceptance |
|---|---|---|---|
| S1 | First 3–5 real lot pages | 0.5 per lot | Each has evidence + a confirmed date |
| S2 | `/insights/` + 2–3 guides (10.9) | 1.5 each | Reviewed by an exporter; author/date shown |
| S3 | Exporter partner backlinks and association listings | 1 | ≥ 2 live relevant mentions |
| S4 | Outreach tracking (UTM links per campaign) | 0.5 | Outreach inquiries attributable in the CRM |
| S5 | Monthly AI-mention check log | 0.25/month | Log exists with 5 fixed prompts |
| S6 | Roasted offering pages (if Section 15 criteria are met) | 2 | Only confirmed formats shown |

### Deferred until demand justifies it

- Origin pages.
- Translations.
- Private-label page.
- Downloadable offer lists.
- External CRM.
- IndexNow / llms.txt.
- Product structured data with prices.
- Buyer resources hub.

Trigger for each: evidence from the CRM or Search Console (e.g., ≥ 3 qualified inquiries asking for it, or ≥ N impressions on related queries).

---

## 13. Prelaunch acceptance checklist

**Content and claims**
- [ ] No unresolved `{{placeholders}}` (automated test).
- [ ] No banned claims (7.1) anywhere. A grep test for the list passes.
- [ ] The role statement (3.5) appears on Home, How it works and About.
- [ ] Every exporter name/logo/photo has written permission on file.
- [ ] Every lot has evidence, `confirmed_on` and `expires_on`; no "in stock" wording.
- [ ] Roasted page shows only confirmed formats.
- [ ] Company facts (legal name, registration, address) are correct and consistent with LinkedIn.

**Forms and operations**
- [ ] Green and roasted test submissions reach the CRM with the correct path, source and landing page.
- [ ] Acknowledgment email received (not in spam) at Gmail and Outlook test accounts.
- [ ] Spam tests: honeypot, fast submit and missing Turnstile all rejected.
- [ ] The founder has done a test response within one business day.
- [ ] Exporter registration procedure documented (who to email, format).

**Technical**
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100 on Home, Green and Contact.
- [ ] axe: zero serious/critical issues; keyboard-only walkthrough of nav and form passes.
- [ ] HTTPS, HSTS, security headers (securityheaders.com grade A or better); admin 2FA active.
- [ ] Canonicals self-referencing; `?path=` URLs canonicalise; www/apex redirect works.
- [ ] robots.txt correct; sitemap valid; staging is noindex and password-protected.
- [ ] JSON-LD validates and matches visible content.
- [ ] Backup restore tested; Sentry receiving events; uptime monitor active.
- [ ] Analytics events firing; no personal data sent to analytics.
- [ ] 404 page is helpful (links to Green, Roasted, Contact).

---

## 14. First 90 days of measurement and improvement

### 14.1 Funnel (tracked separately for green and roasted)

`Relevant visitor → inquiry → qualified inquiry → samples sent → quote issued → order → repeat order`

The first two stages come from analytics. The rest come from CRM stages.

### 14.2 Event set (small)

| Event | Properties |
|---|---|
| `path_select` | `path` (green/roasted), `location` (hero/card/nav) |
| `cta_click` | `cta` (samples/quote/contact), `path`, `page` |
| `form_start` | `path` |
| `form_submit` | `path`, `request_type`, `buyer_type` (no personal data) |
| `contact_click` | `channel` (email/whatsapp/phone) |
| `doc_download` | `doc_type` (when documents exist) |

### 14.3 Monthly dashboard (one page: analytics + CRM export)

| Metric | Green | Roasted |
|---|---|---|
| Sessions on path pages, by source (organic, referral, AI referrers, direct, outreach UTM) | | |
| Form submissions | | |
| Qualified inquiries (and % qualified) | | |
| Samples sent | | |
| Quotes issued | | |
| Orders (count, volume, value) | | |
| Commission expected / received | | |
| Median first-response time | | |
| Top "not a fit" and "lost" reasons | | |

**Connecting to revenue:**
- Each order in the CRM links back to its original inquiry, including source, landing page and "heard about us". The commission record links to the order.
- Revenue attribution is by first-touch source recorded on the inquiry.
- Also record whether outreach or referral preceded it.

### 14.4 Diagnosis guide

| Symptom | Likely problem | Response |
|---|---|---|
| Few relevant sessions; Search Console shows few B2B impressions | **Insufficient relevant traffic** | Rely on outreach/referrals; strengthen the 2–3 key pages and partner links; don't mass-publish |
| Traffic present, low form starts/submits | **Poor inquiry conversion** | Test the hero clarity, CTA wording and form length; watch session paths |
| Many submissions, low % qualified | **Unsuitable leads** | Sharpen the "who we're not for" copy; adjust volume options; add a fit note on Green |
| Qualified leads but samples not sent or late | **Sample failure** | Fix the exporter sample process; set an SLA in the agreement |
| Samples sent, buyers decline | **Quality/spec mismatch or uncompetitive offer** | Log feedback reasons; change the exporter/lot mix |
| Quotes issued, no orders | **Uncompetitive offers or terms** | Compare price basis/terms with buyer expectations; payment terms often decide |
| Orders fail at shipment/documents | **Fulfilment limitations** | Escalate with the exporter; pause promotion of the affected category |

No conversion benchmarks are assumed. Build your own baseline in months 1–3.

### 14.5 90-day plan

- **Weeks 0–2 (launch):**
  - Go live.
  - Search Console/Bing set up.
  - Outreach to 20–40 well-fitting buyers with UTM links.
  - Ask 2 exporters to link to you.
- **Weeks 3–6:**
  - First real lots published.
  - Guide #1 (grades) and #2 (harvest calendar).
  - Review form data: which fields confuse buyers, what "not a fit" reasons appear.
- **Weeks 7–10:**
  - Guide #3 (EUDR, if confirmed).
  - Adjust copy for the top objections heard in calls.
  - Association and event listings.
- **Weeks 11–13 (review):**
  - Compare green and roasted funnels.
  - Decide:
    1. Promote roasted, keep it limited, or remove it.
    2. Whether organic search contributes qualified inquiries (vs. outreach/referral).
    3. The next content or origin pages, only where data supports them.

---

## 15. Closing recommendations

### Smallest credible launch scope

- 8 pages: Home, Green coffee, Roasted coffee (limited), How it works, Quality & traceability, About, Contact (+ thanks), Privacy/Terms.
- One conditional inquiry form feeding a Django-admin CRM, with ack emails.
- At least one named, permissioned exporter partner, real photos with captions, and the founder's identity.
- Lot pages only when an exporter supplies a dated offer with evidence. Otherwise sourcing profiles plus "offers on request".

### Are both categories ready for full promotion?

**No.**
- **Green** can launch as the primary path with placeholders resolved for minimums, samples and incoterms from at least one exporter.
- **Roasted** should launch as a **limited inquiry page** (no product cards, no private-label mention) until an exporter confirms in writing:
  1. Formats.
  2. Pack sizes.
  3. MOQ per format.
  4. Roast-to-dispatch and shelf life.
  5. Destinations previously served, with food-import compliance.

  Use the form's "own-brand interest" answers to measure private-label demand before pursuing it.

### Five commercial assumptions to validate first

1. **Buyers will use an agent rather than going direct**, and exporters will honour commission on introduced buyers, including repeat orders.
2. **Partner exporters can supply offers, samples and documents fast and reliably enough** for us to promise one-business-day replies and a shortlist within `{{5}}` days.
3. **Their minimums and incoterms match the target buyers** (container-scale roasters, new-market importers). If they're FCL-only, small-roaster demand is irrelevant.
4. **Exporter prices are competitive** against importers' landed/spot offers once freight, finance and risk are included.
5. **Roasted coffee from Ethiopia is commercially viable** for distributors in target markets once transit, shelf life and labelling are considered.

### Exact information to request from exporters next

Copy, adapt and send:

> Hello {{name}},
> I'm preparing our buyer-facing website and want every statement about your company and coffee to be accurate and approved by you. Could you please send:
> 1. Your legal company name, ECTA export licence number/expiry, and written permission to name you (and use your logo/photos) on our site.
> 2. The regions, processes and grades you can typically supply, and your harvest/shipment calendar.
> 3. Any current or next-crop offers: lot ID, region/washing station, process, grade, quantity, cup score (who scored it and when), photos.
> 4. Minimum order (FCL only, or part-container/consolidation?), packaging options, and the incoterms you offer (FOB Djibouti, CIF).
> 5. Your sample policy: sample size, cost, courier, dispatch time, and whether buyers can approve a pre-shipment sample.
> 6. Payment terms you accept and your process if a shipment doesn't match the approved sample.
> 7. Countries you have shipped to in the last two years, and the export documents you routinely provide; whether you can provide EUDR geolocation data.
> 8. Certifications held (with certificate copies).
> 9. Roasted coffee: whether you export it today, under which brand(s), formats and pack sizes, minimum per format, roast-to-dispatch time, stated shelf life, destinations served, and whether you can pack unbranded or under a buyer's brand.
> 10. How we register a buyer introduction with you, the commission basis and protection period, and how often you can update availability.
> Thank you. {{Founder}}

---

## Appendix A — Sources

Sources were retrieved on 25 September 2026. Where a primary source could not be opened from the research environment, the fact was taken from the search listing of that source and should be re-checked.

**Regulation and market**
- European Commission, Access2Markets — [Delay until December 2026 and other developments in the implementation of the EUDR](https://trade.ec.europa.eu/access-to-markets/en/news/delay-until-december-2026-and-other-developments-implementation-eudr-regulation) (primary); see also [European Coffee Federation — EUDR](https://www.ecf-coffee.org/european-union-deforestation-regulation-eudr/)
- Addis Fortune — [Authority Sets Minimum Coffee Export Price](https://addisfortune.news/authority-sets-minimum-coffee-export-price/); [Coffee Authority Doubles Down on Vertical Integration](https://addisfortune.news/coffee-authority-doubles-down-on-vertical-integration)
- Trabocca — [Ethiopian minimum coffee prices explained](https://www.trabocca.com/coffee-knowledge/coffee-supply-chains/new-minimum-coffee-prices-delay-ethiopian-new-crop/)
- The Reporter Ethiopia — [Authority Raises Minimum Capital Requirements For Coffee Exporters](https://www.thereporterethiopia.com/47018/)
- Daily Coffee News — [Ethiopia Coffee Report: Production, Consumption and Exports All Up (2025)](https://dailycoffeenews.com/2025/06/09/ethiopia-coffee-report-production-consumption-and-exports-all-up/), summarising USDA FAS GAIN [Coffee Annual ET2025-0014](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Coffee+Annual_Addis+Ababa_Ethiopia_ET2025-0014) (primary; not directly accessible from the research environment)
- Xinhua — [Ethiopia earns nearly 1.87 bln USD from coffee export in 10 months](https://english.news.cn/africa/20250515/0a3e62f4d6c94ebf8d9cf61295ada120/c.html) (destinations)
- UNCTAD — [Roasted coffee export value chain in Ethiopia](https://unctad.org/system/files/information-document/THAN_ETH_Shiferaw_Mitiku_UNCTAD_110321.pdf)
- US FDA — [Importing Food Products into the United States](https://www.fda.gov/food/food-imports-exports/importing-food-products-united-states)

**Competitors**
- Ethio Coffee — [insights](https://www.ethiocoffee.co/insights/ethiopian-coffee-export-process-buyers-guide), [green coffee](https://www.ethiocoffee.co/ethiopian-green-coffee-beans)
- [Greenbean-coffee](https://greenbean-coffee.com/)
- [Dilbi Coffee](https://dilbicoffee.com/)
- [Speciality Arabica](https://arabica-coffee-ethiopia.com/)
- [AMG Coffee Export](https://amgcoffeeexport.com/)
- [Lucy Ethiopian Coffee](https://www.lucyethiopiancoffee.com/)
- [Afro Sourcing](https://afrosourcing.com/)
- Trabocca — [home](https://www.trabocca.com/), [Roaster](https://www.trabocca.com/work-with-us/roaster/), [MyTrabocca 1-bag minimum (Daily Coffee News)](https://dailycoffeenews.com/2018/06/27/green-importer-trabocca-moves-to-1-bag-minimum-with-mytrabocca-ordering-portal/)
- Royal Coffee — [Crown Jewels](https://royalcoffee.com/crown-jewels/), [About](https://royalcoffee.com/about-us/)
- Cafe Imports — [Offerings: Ethiopia](https://www.cafeimports.com/north-america/offerings?origin=Ethiopia), [Ethiopia sourcing office](https://www.cafeimports.com/australia/blog/2018/12/05/introducing-cafe-imports-ethiopia-sourcing-office-addis-ababa/)
- [Keffa Coffee](https://keffacoffee.com/)
- [Alpha Green Coffee Importer](https://alphagreencoffeeimporter.com/)
- [coffee-ethiopian.com](https://coffee-ethiopian.com/)

**Search, performance and AI crawlers (primary documentation)**
- Google Search Central — [Guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [announcement blog, May 2026](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing); [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search Central — [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product); [Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- Google — [Core Web Vitals report (Search Console Help)](https://support.google.com/webmasters/answer/9205520?hl=en); [web.dev Web Vitals](https://web.dev/articles/vitals)
- OpenAI — [Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)
- Anthropic — [Does Anthropic crawl data from the web, and how can site owners block the crawler?](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- Coverage of Google's llms.txt clarification — [Search Engine Journal](https://www.searchenginejournal.com/googles-says-its-fine-to-use-llms-txt-for-ai-seo/579608/)

## Appendix B — Items not verified (check before relying on them)

- Domain and trademark availability of every shortlisted name.
- Keyword volumes and difficulty for all query examples.
- Current hosting, email and analytics pricing.
- Whether FAQ rich-result restrictions remain as described. This doesn't affect the recommendation, since visible Q&A is used regardless.
- Destination-market rules for roasted coffee: labelling, food-contact packaging, facility registration. These need professional verification per market.
- Privacy-law obligations for your entity's jurisdiction, including whether cookieless analytics needs consent there.
