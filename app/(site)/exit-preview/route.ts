import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const target = /^[a-z0-9-]{1,120}$/.test(slug) ? `/resources/${slug}` : "/resources";
  return NextResponse.redirect(new URL(target, req.url), { status: 307, headers: { "Cache-Control": "no-store" } });
}
