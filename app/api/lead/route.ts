import config from "@payload-config";
import { NextResponse, type NextRequest } from "next/server";
import { getPayload } from "payload";
import { clientIp, rateLimited, turnstileOk } from "@/lib/abuse";
import { looksLikeSpam } from "@/lib/inquiry";
import { MARKETING_CONSENT_TEXT, validateLead } from "@/lib/lead";
import { site } from "@/lib/site";
import { signDownloadToken } from "@/lib/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function emailLink(to: string, title: string, url: string) {
  if (!process.env.RESEND_API_KEY || !process.env.INQUIRY_FROM) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM,
      to: [to],
      subject: `Your download: ${title}`,
      text: `Thanks for your interest. Here is your download (link valid for 7 days):\n${url}\n\nIf you'd like help sourcing Ethiopian coffee, just reply to this email${site.whatsappNumber ? ` or message us on WhatsApp: ${site.whatsappNumber}` : ""}.\n\n${site.brand}`,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => undefined);
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get("content-length") || 0) > 10_000) return json(413, { ok: false, message: "Request too large." });
  const ip = clientIp(req.headers);
  if (rateLimited(`lead:${ip}`, 8)) return json(429, { ok: false, message: "Too many requests. Please try again in a few minutes." });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json(400, { ok: false, message: "We couldn't read the form. Please try again." });
  }
  if (looksLikeSpam(form)) return json(200, { ok: true });
  if (!(await turnstileOk(String(form.get("cf-turnstile-response") ?? ""), ip))) {
    return json(400, { ok: false, message: "We couldn't verify that you're not an automated program. Please try again." });
  }

  const result = validateLead(form);
  if (!result.ok) return json(422, { ok: false, message: "Please check the highlighted fields.", errors: result.errors });
  const lead = result.lead;

  try {
    const payload = await getPayload({ config });
    let download: { id: number | string; title: string } | undefined;
    if (lead.kind === "download") {
      const found = await payload.find({
        collection: "downloads",
        where: { and: [{ slug: { equals: lead.download } }, { published: { equals: true } }] },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      });
      download = found.docs[0] as { id: number | string; title: string } | undefined;
      if (!download) return json(404, { ok: false, message: "That download is no longer available." });
    }

    await payload.create({
      collection: "leads",
      overrideAccess: true,
      data: {
        email: lead.email,
        name: lead.name,
        company: lead.company,
        buyerType: lead.buyerType || undefined,
        source: lead.kind === "newsletter" ? "newsletter" : `download:${lead.download}`,
        marketingConsent: lead.marketingConsent,
        consentText: lead.marketingConsent ? MARKETING_CONSENT_TEXT : "",
        sourcePage: lead.sourcePage,
      },
    });

    if (!download) return json(200, { ok: true });
    const url = `/api/lead/download?token=${signDownloadToken(download.id)}`;
    const absolute = new URL(url, site.siteUrl || req.url).toString();
    await emailLink(lead.email, download.title, absolute);
    return json(200, { ok: true, downloadUrl: url });
  } catch (err) {
    console.error("lead capture failed:", (err as Error).message);
    return json(503, {
      ok: false,
      message: `Something went wrong on our side. Please try again${site.contactEmail ? ` or email ${site.contactEmail}` : ""}.`,
    });
  }
}

export function GET() {
  return new NextResponse("Method not allowed", { status: 405, headers: { Allow: "POST" } });
}
