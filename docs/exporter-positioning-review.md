# Exporter positioning: review before publication

**Status: licence confirmed by the owner (26 September 2026). Publication not yet switched on.**

The website presents the company as a **licensed Ethiopian coffee exporter** that sells green and roasted coffee directly to international business buyers. On 26 September 2026 the owner confirmed the licence and asked for it to be stated on the site.

- **Baseline** (last agency-model version): commit `868b40f`.
- **Publication switch:** `exporter_positioning_approved` in `site.config.json` is still `false`, so a production build (`SITE_ENV=production`) stops with an error. Set it to `true` when you approve publication. Preview builds work normally.
- **No licence number** is shown. Add one only if you want to.

## 1. Facts confirmed by the owner

- **Licence:** the company is a licensed Ethiopian coffee exporter. Ethiopian coffee exports require a licence (certificate of competence) from the Ethiopian Coffee and Tea Authority (ECTA).
- **Shipping terms:** FOB Djibouti (sea) and FCA Addis Ababa Bole International Airport (air). Freight can be arranged by us on request.
  - "FOB" applies to sea freight only, so the airport term is written as **FCA**, the correct Incoterm for handing goods to an air carrier.
- **Grades:** we can offer every Ethiopian export grade, washed or natural.
- **Sourcing and processing:** we buy coffee directly from farmers, and can process the green coffee ourselves.
- **Origin trips:** offered.
- **Team:**
  - **Mose Gebreselassie** (Co-founder & Commercial Leader): Norwegian, Ethiopian origin; 10+ years in commercial roles in trade and logistics, quality control and sales; has lived in 11+ countries; speaks 7+ languages.
  - **Natnael Samson** (Co-founder & Operations Leader): Norwegian, Ethiopian origin; has lived in Ethiopia for the past ten years and built an extensive network there.
  - **Seife Tuuloskorpi** (partner): born in Ethiopia in 1967, raised in Sweden; founded Seife's in 2018; more than SEK 100 million in revenue.
- **Seife's:** its operations are being taken over and merged into the company.
- **From the Seife's brochure (2018):**
  - The three supply types: washing station lots (up to 1,000 smallholder farms), single farm, and a medium-size estate with its own washing station.
  - Origin trips and samples.
  - Seife's quote about coming back to the same quality, over and over again, in greater quantity.
  - The two photos, now used on the home page, the coffees page and the origin trips page.
- **Regions** Seife's sources from (per seifes.com, via search): Guji, Yirgacheffe, Sidama, Limu, Jimma and Gedeb.

## 2. General coffee information (researched, written conservatively)

The coffees page explains:

- **Grading:** ECTA grades every export lot on physical quality (40%) and cup quality (60%). Export grades run from 1 to 5, and specialty lots may carry a Q1 or Q2 designation.
- **Regions, processes and varieties:** typical regional profiles, washed and natural processing, and heirloom varieties (landraces and JARC selections).
- **Harvest timing:** roughly October to January.

Exact defect counts per grade differ between sources, so the page does not publish them.

## 3. Still to confirm

1. **Licence holder.** Is the licence held by our own company, or by Seife's company, which is being merged in? The site says "we are a licensed exporter". Make sure that is true for the entity that will sign contracts.
2. **Legal entity name and country**, for the contract, invoices, the privacy notice and `operator_name` in `site.config.json`.
3. **Payment terms and currency**, for example advance payment, letter of credit, or cash against documents.
4. **Samples:** free or charged, sizes, and who pays the courier.
5. **Roasted coffee:** who roasts and packs it, formats, shelf life and minimums.
6. **Certifications and EUDR information.** None are claimed.
7. **Estate:** whether the estate with its own washing station is owned by us or Seife's, or is a partner. The site describes it only as "a medium-size estate with its own washing station".
8. **Seife's Coffee Lab.** Search results mention a Q-venue coffee lab in Ethiopia. If it is part of the business being merged in, it would be strong credibility for the coffees page.
9. **Photo permission.** Written confirmation from Seife that his brochure photos may be used, and a portrait of Seife and Natnael.
10. **Contact email:** replace the placeholder `hello@ethiopiancoffeesourcing.com`.

## Before publication

- [ ] Items 1 and 2 above confirmed.
- [ ] Real contact email set.
- [ ] Draft articles reviewed by their author.
- [ ] `exporter_positioning_approved` set to `true`.
