import { NextResponse } from "next/server";
import { requireInstructor } from "@/lib/auth";
import { db } from "@/lib/db";

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
  return NextResponse.json({ ok: true });
}
