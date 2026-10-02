import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

/**
 * Per-user state for a job (application status + saved flag).
 * Fetched client-side so the public job page itself can stay cached (ISR).
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ userRole: null, application: null, saved: false });

  let application = null;
  let saved = false;
  if (user.role === "STUDENT") {
    const profile = await db.studentProfile.findUnique({ where: { userId: user.id }, select: { id: true } });
    if (profile) {
      const [app, sv] = await Promise.all([
        db.application.findUnique({
          where: { jobId_studentId: { jobId: id, studentId: profile.id } },
          select: { status: true },
        }),
        db.savedJob.findUnique({
          where: { studentId_jobId: { studentId: profile.id, jobId: id } },
          select: { jobId: true },
        }),
      ]);
      application = app;
      saved = !!sv;
    }
  }
  return NextResponse.json({ userRole: user.role, application, saved });
}
