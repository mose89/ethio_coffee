import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";
import { PRODUCTS, describeQuantity, type Inquiry } from "./inquiry";

/**
 * Delivers an inquiry to every configured destination. The submission counts
 * as received only if at least one destination confirms it.
 *
 *   (default)                     stored in the CMS database (Inquiries), unless INQUIRY_STORE_CMS=false
 *   RESEND_API_KEY + INQUIRY_TO   email notification via Resend (recommended)
 *   INQUIRY_WEBHOOK_URL           JSON POST, e.g. to a spreadsheet or automation tool
 *   INQUIRY_FILE_STORE            append to a JSON Lines file (self-hosted or local only)
 */

export type StoredInquiry = Inquiry & { id: string; receivedAt: string; reference: string };

export type DeliveryResult = { delivered: string[]; failed: string[]; configured: number };

type Sink = { name: string; send: (i: StoredInquiry) => Promise<void> };

function configuredSinks(env: NodeJS.ProcessEnv): Sink[] {
  const sinks: Sink[] = [];
  if (env.INQUIRY_STORE_CMS !== "false") sinks.push({ name: "cms", send: storeInCms });
  if (env.RESEND_API_KEY && env.INQUIRY_TO) sinks.push({ name: "email", send: (i) => sendEmail(i, env) });
  if (env.INQUIRY_WEBHOOK_URL) sinks.push({ name: "webhook", send: (i) => sendWebhook(i, env) });
  if (env.INQUIRY_FILE_STORE) sinks.push({ name: "file", send: (i) => appendToFile(i, env.INQUIRY_FILE_STORE!) });
  return sinks;
}

export async function deliverInquiry(inquiry: StoredInquiry, env: NodeJS.ProcessEnv = process.env): Promise<DeliveryResult> {
  const sinks = configuredSinks(env);
  const results = await Promise.allSettled(sinks.map((s) => s.send(inquiry)));
  const delivered: string[] = [];
  const failed: string[] = [];
  results.forEach((r, idx) => {
    if (r.status === "fulfilled") delivered.push(sinks[idx].name);
    else {
      failed.push(sinks[idx].name);
      // Log the failure without the buyer's personal details.
      console.error(`inquiry ${inquiry.reference}: ${sinks[idx].name} delivery failed:`, (r.reason as Error)?.message);
    }
  });
  if (!sinks.length) console.error(`inquiry ${inquiry.reference}: no delivery destination is configured`);
  return { delivered, failed, configured: sinks.length };
}

function summary(i: StoredInquiry): string {
  return [
    `Reference: ${i.reference}`,
    `Received: ${i.receivedAt}`,
    `Product: ${PRODUCTS[i.product]}`,
    `Name: ${i.name}`,
    `Email: ${i.email}`,
    `Company: ${i.company}`,
    `Destination country: ${i.country}`,
    `Approximate quantity: ${describeQuantity(i.quantity)}`,
    `Sent from page: ${i.sourcePage || "unknown"}`,
    "",
    "Requirements / message:",
    i.message || "(none)",
  ].join("\n");
}

async function sendEmail(i: StoredInquiry, env: NodeJS.ProcessEnv) {
  const to = env.INQUIRY_TO!.split(",").map((s) => s.trim()).filter(Boolean);
  const subject = `New ${PRODUCTS[i.product].toLowerCase()} inquiry: ${i.company} (${i.country}) [${i.reference}]`.replace(/[\r\n]+/g, " ");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.INQUIRY_FROM || "Website inquiries <onboarding@resend.dev>",
      to,
      reply_to: i.email,
      subject,
      text: summary(i),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

async function sendWebhook(i: StoredInquiry, env: NodeJS.ProcessEnv) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (env.INQUIRY_WEBHOOK_SECRET) headers.Authorization = `Bearer ${env.INQUIRY_WEBHOOK_SECRET}`;
  const res = await fetch(env.INQUIRY_WEBHOOK_URL!, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...i, quantityText: describeQuantity(i.quantity), productText: PRODUCTS[i.product] }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function appendToFile(i: StoredInquiry, file: string) {
  const target = path.resolve(file);
  await mkdir(path.dirname(target), { recursive: true, mode: 0o700 });
  await appendFile(target, JSON.stringify(i) + "\n", { encoding: "utf8", mode: 0o600 });
}

async function storeInCms(i: StoredInquiry) {
  const payload = await getPayload({ config });
  await payload.create({
    collection: "inquiries",
    overrideAccess: true,
    data: {
      reference: i.reference,
      product: i.product,
      name: i.name,
      email: i.email,
      company: i.company,
      country: i.country,
      quantity: describeQuantity(i.quantity),
      message: i.message,
      sourcePage: i.sourcePage,
    },
  });
}
