import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { VIEW_COOKIE, type ViewMode } from "@/lib/view-mode";

/** Switch the admin's current view between the admin console and the employer workspace. */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const view = String(body.view || "") as ViewMode;
  if (view !== "admin" && view !== "employer") return NextResponse.json({ error: "Invalid view." }, { status: 400 });
  const res = NextResponse.json({ ok: true, view });
  res.cookies.set(VIEW_COOKIE, view, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 365 * 86_400 });
  return res;
}
