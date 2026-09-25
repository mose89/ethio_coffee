/** Validation for download and newsletter sign-ups. Pure; unit tested. */

export const BUYER_TYPES = {
  importer: "Importer / trader",
  roaster: "Roaster",
  distributor: "Distributor / wholesaler",
  retailer: "Retailer",
  hospitality: "Hospitality",
  other: "Other",
} as const;
export type BuyerType = keyof typeof BUYER_TYPES;

export const MARKETING_CONSENT_TEXT =
  "Send me occasional Ethiopian crop updates and current coffee offers by email. I can unsubscribe at any time.";

export type Lead = {
  kind: "download" | "newsletter";
  download: string;
  email: string;
  name: string;
  company: string;
  buyerType: BuyerType | "";
  marketingConsent: boolean;
  sourcePage: string;
};

type FormLike = { get(name: string): unknown };
const str = (f: FormLike, k: string) => {
  const v = f.get(k);
  return typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim() : "";
};
const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;

export function validateLead(form: FormLike): { ok: true; lead: Lead } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const kind = str(form, "kind") === "newsletter" ? "newsletter" : "download";
  const download = str(form, "download").slice(0, 120);
  const email = str(form, "email").toLowerCase();
  const name = str(form, "name").slice(0, 120);
  const company = str(form, "company").slice(0, 160);
  const buyerType = str(form, "buyer_type");

  if (kind === "download" && !/^[a-z0-9-]{1,120}$/.test(download)) errors.download = "Choose a download.";
  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address, like name@company.com.";
  if (kind === "download") {
    if (!name) errors.name = "Enter your name.";
    if (!company) errors.company = "Enter your company name.";
    if (!Object.hasOwn(BUYER_TYPES, buyerType)) errors.buyer_type = "Choose what best describes your business.";
  } else if (buyerType && !Object.hasOwn(BUYER_TYPES, buyerType)) {
    errors.buyer_type = "Choose what best describes your business.";
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  const sourcePage = str(form, "source_page").slice(0, 200);
  return {
    ok: true,
    lead: {
      kind,
      download: kind === "download" ? download : "",
      email,
      name,
      company,
      buyerType: (Object.hasOwn(BUYER_TYPES, buyerType) ? buyerType : "") as BuyerType | "",
      marketingConsent: kind === "newsletter" ? true : str(form, "marketing_consent") === "yes",
      sourcePage: sourcePage.startsWith("/") ? sourcePage : "",
    },
  };
}
