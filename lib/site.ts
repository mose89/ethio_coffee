import config from "../site.config.json";

/**
 * Public business identity. Values come from site.config.json; empty strings
 * mean "not confirmed" and the related UI is omitted rather than invented.
 * Server-only: read at build time for static pages.
 */

export const REQUIRED_FOR_PRODUCTION = ["brand_name", "site_url", "operator_name", "contact_email"] as const;

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const isProduction = process.env.SITE_ENV === "production";
const siteUrl = clean(config.site_url).replace(/\/+$/, "");

export const missingForProduction = REQUIRED_FOR_PRODUCTION.filter((k) => !clean(config[k]));

/**
 * The copy presents the company as a licensed seller and exporter. Production builds need the
 * owner's approval to publish it (docs/exporter-positioning-review.md).
 */
export const exporterPositioningApproved = (config as { exporter_positioning_approved?: boolean }).exporter_positioning_approved === true;

const whatsappDigits = clean(config.whatsapp_number).replace(/\D/g, "");
const whatsappText = clean((config as { whatsapp_message?: string }).whatsapp_message);
const phone = clean(config.phone_number);

export const site = {
  production: isProduction,
  /** Only a configured production build may be indexed by search engines. */
  indexable: isProduction && siteUrl.startsWith("https://"),
  brandName: clean(config.brand_name),
  /** Neutral descriptive label used only in preview builds. */
  brand: clean(config.brand_name) || "Ethiopian Coffee Sourcing",
  siteUrl,
  operatorName: clean(config.operator_name),
  operatorCountry: clean(config.operator_country),
  contactEmail: clean(config.contact_email),
  whatsappNumber: clean(config.whatsapp_number),
  whatsappHref: whatsappDigits ? `https://wa.me/${whatsappDigits}${whatsappText ? `?text=${encodeURIComponent(whatsappText)}` : ""}` : "",
  phoneNumber: phone,
  phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "",
  linkedinUrl: clean(config.linkedin_url),
  responseTime: clean(config.response_time),
  turnstileSiteKey: clean(config.turnstile_site_key),
  /** Plausible Analytics domain (cookieless). Empty = no analytics loaded. */
  analyticsDomain: clean((config as { analytics_domain?: string }).analytics_domain),
  emailNotifications: Boolean(config.email_notifications),
};

export const ORG_DESCRIPTION =
  "Licensed Ethiopian coffee exporter supplying green and roasted coffee to importers, roasters, distributors and hospitality businesses, direct from farmers and washing stations, with origin trips to Ethiopia's coffee farms.";
