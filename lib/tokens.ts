import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/** Short-lived signed tokens for download links (HMAC-SHA256 with the CMS secret). */
const secret = () => process.env.PAYLOAD_SECRET || "local-development-only-secret-change-me";
const b64 = (s: string | Buffer) => Buffer.from(s).toString("base64url");

export function signDownloadToken(downloadId: number | string, ttlSeconds = 60 * 60 * 24 * 7): string {
  const payload = b64(JSON.stringify({ d: String(downloadId), e: Math.floor(Date.now() / 1000) + ttlSeconds }));
  const sig = b64(createHmac("sha256", secret()).update(payload).digest());
  return `${payload}.${sig}`;
}

export function verifyDownloadToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(b64(createHmac("sha256", secret()).update(payload).digest()));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { d, e } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { d: string; e: number };
    return e > Date.now() / 1000 ? d : null;
  } catch {
    return null;
  }
}
