// Renders the buyer's checklist HTML to PDF (needs Playwright + Chromium; run manually when the content changes):
//   node content/downloads/src/build-pdf.cjs
const fs = require("fs");
const path = require("path");
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }

const root = path.resolve(__dirname, "../../..");
const cfg = JSON.parse(fs.readFileSync(path.join(root, "site.config.json"), "utf8"));
const src = path.join(__dirname, "buyers-checklist.html");
const html = fs.readFileSync(src, "utf8").replace("{{EMAIL}}", cfg.contact_email || "").replace("{{WHATSAPP}}", cfg.whatsapp_number || "");
const tmp = path.join(__dirname, "_render.html");
fs.writeFileSync(tmp, html);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + tmp, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(root, "content/downloads/ethiopian-coffee-buyers-checklist.pdf"),
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: '<div style="font-size:7pt;color:#8a8076;width:100%;padding:0 16mm;display:flex;justify-content:space-between"><span>Ethiopian Coffee Sourcing · Buyer’s Checklist</span><span class="pageNumber"></span></div>',
    margin: { top: "16mm", bottom: "18mm", left: "16mm", right: "16mm" },
  });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log("PDF written");
})();
