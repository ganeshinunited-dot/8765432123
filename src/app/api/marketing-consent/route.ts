import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { setEmailConsent, trackEvent } from "@/lib/klaviyo";

/** Current user's email-marketing consent state. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  const row = await db.user.findUnique({ where: { id: user.id }, select: { marketingOptIn: true } });
  return NextResponse.json({ marketingOptIn: !!row?.marketingOptIn });
}

/**
 * Toggle email-marketing consent. Updates our DB (source of truth), then
 * subscribes/unsubscribes the Klaviyo marketing list. Never markets to
 * non-consented users.
 */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const consented = body.consented === true;

  await db.user.update({ where: { id: user.id }, data: { marketingOptIn: consented } });

  // Fire-and-forget: Klaviyo failures must never break the toggle UX.
  void setEmailConsent({ email: user.email, consented });
  void trackEvent({
    email: user.email,
    metric: consented ? "Subscribed to Email Marketing" : "Unsubscribed from Email Marketing",
    properties: { source: "settings_toggle" },
  });

  return NextResponse.json({ ok: true, marketingOptIn: consented });
}
