import { NextResponse } from "next/server";
import { requireInstructor } from "@/lib/auth";
import { db } from "@/lib/db";
import { trackEvent } from "@/lib/klaviyo";

/** Demo payment completion: marks the instructor's yearly plan as paid. */
export async function POST() {
  const user = await requireInstructor();
  const profile = await db.instructorProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return NextResponse.json({ error: "Instructor profile not found." }, { status: 404 });
  if (profile.isPaid) return NextResponse.json({ ok: true, already: true });
  await db.instructorProfile.update({
    where: { id: profile.id },
    data: { isPaid: true, paidAt: new Date(), planName: "Creator Yearly" },
  });
  void trackEvent({
    email: user.email,
    metric: "Placed Order",
    value: 20000,
    uniqueId: `instructor-plan-${user.id}`,
    properties: {
      OrderId: `instructor-${profile.id}`,
      Items: [{ ProductName: "Creator Yearly plan", price: 20000 }],
    },
  });
  return NextResponse.json({ ok: true });
}
