import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { looksLikeSpam, validateInquiry, type FieldErrors } from "@/lib/inquiry";
import { deliverInquiry } from "@/lib/delivery";
import { site } from "@/lib/site";
import { clientIp, rateLimited, turnstileOk } from "@/lib/abuse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;

const FAILURE_MESSAGE = site.contactEmail
  ? `We couldn't receive your inquiry because of a problem on our side. Please try again in a few minutes, or email us at ${site.contactEmail}.`
  : "We couldn't receive your inquiry because of a problem on our side. Please try again in a few minutes.";

function respond(req: NextRequest, status: number, body: { ok: boolean; message?: string; errors?: FieldErrors; reference?: string }) {
  const wantsJson = (req.headers.get("accept") || "").includes("application/json");
  const noStore = { "Cache-Control": "no-store" };
  if (wantsJson) return NextResponse.json(body, { status, headers: noStore });

  // Fallback for browsers without JavaScript: redirect on success, simple page on error.
  if (body.ok) return NextResponse.redirect(new URL("/inquiry/thanks", req.url), { status: 303, headers: noStore });
  const items = body.errors ? Object.values(body.errors) : [body.message ?? "Something went wrong."];
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Please check your inquiry</title></head>
<body style="font-family:system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;line-height:1.6;color:#1F1A17;background:#FAF7F2">
<h1>Your inquiry was not sent</h1><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
<p><a href="/inquiry">Go back to the inquiry form</a></p></body></html>`;
  return new NextResponse(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", ...noStore } });
}

export async function POST(req: NextRequest) {
  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return respond(req, 413, { ok: false, message: "Your inquiry is too long. Please shorten the message." });

  const type = req.headers.get("content-type") || "";
  if (!type.includes("application/x-www-form-urlencoded") && !type.includes("multipart/form-data")) {
    return respond(req, 415, { ok: false, message: "Unsupported submission format." });
  }

  const ip = clientIp(req.headers);
  if (rateLimited(`inquiry:${ip}`)) {
    return respond(req, 429, { ok: false, message: "Too many inquiries from your connection. Please wait a few minutes and try again." });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return respond(req, 400, { ok: false, message: "We couldn't read the form. Please try again." });
  }

  // Quietly accept obvious bot submissions without storing them.
  if (looksLikeSpam(form)) return respond(req, 200, { ok: true, reference: "received" });

  if (!(await turnstileOk(String(form.get("cf-turnstile-response") ?? ""), ip))) {
    return respond(req, 400, { ok: false, message: "We couldn't verify that you're not an automated program. Please try again." });
  }

  const result = validateInquiry(form);
  if (!result.ok) return respond(req, 422, { ok: false, message: "Please correct the highlighted fields.", errors: result.errors });

  const id = randomUUID();
  const reference = id.slice(0, 8).toUpperCase();
  const outcome = await deliverInquiry({ ...result.inquiry, id, reference, receivedAt: new Date().toISOString() });

  if (outcome.delivered.length === 0) return respond(req, 503, { ok: false, message: FAILURE_MESSAGE });
  return respond(req, 200, { ok: true, reference });
}

export function GET() {
  return new NextResponse("Method not allowed", { status: 405, headers: { Allow: "POST" } });
}
