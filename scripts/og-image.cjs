/**
 * Renders app/opengraph-image.png (1200×630), the image shown when the site is shared.
 * Edit the eyebrow/headline below, then run: node scripts/og-image.cjs
 * Needs Playwright with Chromium (preinstalled in the dev container).
 */
const fs = require("fs");
const path = require("path");
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }

const EYEBROW = "Green and roasted coffee from Ethiopia";
const HEADLINE = "Ethiopian coffee for roasters, importers and distributors.";

const root = path.resolve(__dirname, "..");
const b64 = (p) => fs.readFileSync(path.join(root, p)).toString("base64");
const html = `<html><head><style>
@font-face{font-family:F;src:url(data:font/woff2;base64,${b64("app/(site)/fonts/fraunces-latin-wght.woff2")})}
@font-face{font-family:S;src:url(data:font/woff2;base64,${b64("app/(site)/fonts/source-sans-3-latin-wght.woff2")})}
body{margin:0}
.c{width:1200px;height:630px;box-sizing:border-box;padding:80px 90px;background:#FAF7F2 url(data:image/svg+xml;base64,${b64("public/contours.svg")}) no-repeat right -160px top -80px/1100px;position:relative;font-family:S;color:#1F1A17;display:flex;flex-direction:column;justify-content:space-between}
.k{font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:22px;color:#5E554C}
h1{font-family:F;font-weight:600;font-size:76px;line-height:1.08;margin:18px 0 0;max-width:900px;letter-spacing:-.01em}
.t{display:flex;gap:16px}.p{font-weight:700;font-size:26px;padding:12px 24px;border-radius:999px}
.g{background:#2F5D50;color:#fff}.r{background:#7A3E24;color:#fff}
.bar{position:absolute;left:0;right:0;bottom:0;height:14px;background:linear-gradient(90deg,#2F5D50 50%,#7A3E24 50%)}
</style></head><body><div class="c"><div><div class="k">${EYEBROW}</div><h1>${HEADLINE}</h1></div>
<div class="t"><span class="p g">Green coffee</span><span class="p r">Roasted coffee</span></div><div class="bar"></div></div></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, "app/opengraph-image.png") });
  await browser.close();
  console.log("written app/opengraph-image.png");
})();
