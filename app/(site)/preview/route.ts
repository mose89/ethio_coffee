import { draftMode, headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/cms";

/**
 * Opened from the CMS "Preview" button. Only a logged-in CMS user can enable
 * preview; the article page re-checks the login before showing a draft.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return new NextResponse("Invalid preview link.", { status: 400 });

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) return new NextResponse("Log in to the CMS to preview drafts.", { status: 401 });

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(`/resources/${slug}`, req.url), { status: 307, headers: { "Cache-Control": "no-store" } });
}
