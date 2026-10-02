import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { trackEvent } from "@/lib/klaviyo";

/**
 * Server-side view tracking for Klaviyo.
 * The browser never touches Klaviyo: a page pings this route once, and this
 * single server-side point fires the event. Logged-in viewers only.
 *
 * Body: { kind: "job" | "course", slug: string }
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const kind = String(body.kind || "");
  const slug = String(body.slug || "").slice(0, 200);
  if ((kind !== "job" && kind !== "course") || !slug) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: true, skipped: true });

  try {
    if (kind === "job") {
      const job = await db.job.findUnique({
        where: { slug },
        select: { title: true, company: { select: { name: true } } },
      });
      if (!job) return NextResponse.json({ ok: true, skipped: true });
      void trackEvent({
        email: user.email,
        metric: "Viewed Job",
        properties: { JobTitle: job.title, slug, company: job.company.name },
      });
    } else {
      const course = await db.course.findUnique({
        where: { slug },
        select: { title: true, price: true, category: true },
      });
      if (!course) return NextResponse.json({ ok: true, skipped: true });
      void trackEvent({
        email: user.email,
        metric: "Viewed Product",
        properties: { ProductName: course.title, slug, price: course.price, category: course.category },
      });
    }
  } catch {
    // never break the page view
  }
  return NextResponse.json({ ok: true });
}
