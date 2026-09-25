/**
 * Inquiry validation. Pure functions with no imports so they can be unit
 * tested directly with `node --test`.
 */

export const PRODUCTS = {
  green: "Green coffee",
  roasted: "Roasted coffee",
  unsure: "Not sure yet",
} as const;

export const REQUEST_TYPES = {
  quote: "Quotation",
  samples: "Samples",
  both: "Samples and quotation",
  advice: "Advice / first conversation",
} as const;

export const UNITS = {
  kg: "kg",
  bags60: "60 kg bags",
  tonnes: "metric tonnes",
  containers: "shipping containers",
} as const;

export type Product = keyof typeof PRODUCTS;
export type Unit = keyof typeof UNITS;
export type RequestType = keyof typeof REQUEST_TYPES;

export type Inquiry = {
  product: Product;
  requestType: RequestType;
  name: string;
  email: string;
  company: string;
  country: string;
  quantity: { amount: number; unit: Unit } | "unsure";
  message: string;
  sourcePage: string;
};

export type FieldErrors = Partial<Record<"product" | "name" | "email" | "company" | "country" | "quantity" | "message", string>>;

const LIMITS = { name: 120, email: 254, company: 160, country: 80, message: 4000 };
const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;

type FormLike = { get(name: string): unknown };

function text(form: FormLike, key: string): string {
  const v = form.get(key);
  // Collapse control characters (except newlines in the message) and trim.
  return typeof v === "string" ? v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, " ").trim() : "";
}

function oneLine(s: string): string {
  return s.replace(/\s+/g, " ");
}

export function validateInquiry(form: FormLike): { ok: true; inquiry: Inquiry } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const product = text(form, "product");
  if (!Object.hasOwn(PRODUCTS, product)) errors.product = "Choose green coffee, roasted coffee or not sure yet.";

  const requestRaw = text(form, "request_type") || "quote";
  if (!Object.hasOwn(REQUEST_TYPES, requestRaw)) errors.product = "Choose what you would like from us.";

  const name = oneLine(text(form, "name"));
  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  const email = oneLine(text(form, "email")).toLowerCase();
  if (!email) errors.email = "Enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address, like name@company.com.";

  const company = oneLine(text(form, "company"));
  if (!company) errors.company = "Enter your company name.";
  else if (company.length > LIMITS.company) errors.company = `Keep the company name under ${LIMITS.company} characters.`;

  const country = oneLine(text(form, "country"));
  if (!country) errors.country = "Enter the country the coffee would be shipped to.";
  else if (country.length > LIMITS.country) errors.country = `Keep the country under ${LIMITS.country} characters.`;

  let quantity: Inquiry["quantity"] = "unsure";
  const unsure = text(form, "quantity_unsure") === "yes";
  if (!unsure) {
    const rawAmount = text(form, "quantity_amount").replace(/\s/g, "").replace(",", ".");
    const unit = text(form, "quantity_unit");
    const amount = Number(rawAmount);
    if (!rawAmount || !Number.isFinite(amount) || amount <= 0 || amount > 10_000_000) {
      errors.quantity = "Enter an approximate quantity, or tick “I’m not sure yet”.";
    } else if (!Object.hasOwn(UNITS, unit)) {
      errors.quantity = "Choose a unit for the quantity.";
    } else {
      quantity = { amount, unit: unit as Unit };
    }
  }

  const message = text(form, "message");
  if (message.length > LIMITS.message) errors.message = `Keep your message under ${LIMITS.message} characters.`;

  const sourcePage = oneLine(text(form, "source_page")).slice(0, 200);

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    inquiry: {
      product: product as Product,
      requestType: requestRaw as RequestType,
      name,
      email,
      company,
      country,
      quantity,
      message,
      sourcePage: sourcePage.startsWith("/") ? sourcePage : "",
    },
  };
}

export function describeQuantity(q: Inquiry["quantity"]): string {
  return q === "unsure" ? "Not sure yet" : `${q.amount} ${UNITS[q.unit]}`;
}

/** Spam heuristics that never reject a real person who has JavaScript disabled. */
export function looksLikeSpam(form: FormLike, now: number = Date.now()): boolean {
  if (text(form, "company_website")) return true; // honeypot, hidden from people
  const started = Number(text(form, "form_started"));
  if (started && now - started < 2000) return true; // submitted faster than a person can type
  return false;
}
