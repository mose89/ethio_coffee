import { createReadStream, promises as fs } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import config from "@payload-config";
import { NextResponse, type NextRequest } from "next/server";
import { getPayload } from "payload";
import { verifyDownloadToken } from "@/lib/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Streams a download file for a valid, unexpired signed token. */
export async function GET(req: NextRequest) {
  const id = verifyDownloadToken(req.nextUrl.searchParams.get("token") ?? "");
  if (!id) return new NextResponse("This download link has expired or is invalid. Please request the download again.", { status: 403 });

  const payload = await getPayload({ config });
  const doc = (await payload.findByID({ collection: "downloads", id, depth: 0, overrideAccess: true }).catch(() => null)) as
    | { filename?: string | null; mimeType?: string | null; published?: boolean | null }
    | null;
  if (!doc?.filename || !doc.published) return new NextResponse("This download is no longer available.", { status: 404 });

  const dir = process.env.DOWNLOADS_DIR || path.resolve(process.cwd(), "downloads");
  const file = path.join(dir, path.basename(doc.filename));
  const stat = await fs.stat(file).catch(() => null);
  if (!stat) return new NextResponse("File not found.", { status: 404 });

  const stream = Readable.toWeb(createReadStream(file)) as ReadableStream;
  return new NextResponse(stream, {
    headers: {
      "Content-Type": doc.mimeType || "application/octet-stream",
      "Content-Length": String(stat.size),
      "Content-Disposition": `attachment; filename="${path.basename(doc.filename).replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
