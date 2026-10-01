import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: jobId } = await params;
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in to save jobs." }, { status: 401 });
  if (user.role !== "STUDENT") return NextResponse.json({ error: "Only students can save jobs." }, { status: 403 });

  const profile = await db.studentProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found." }, { status: 404 });

  const job = await db.job.findUnique({ where: { id: jobId }, select: { id: true, status: true } });
  if (!job || job.status !== "ACTIVE") return NextResponse.json({ error: "Job not available." }, { status: 404 });

  const existing = await db.savedJob.findUnique({ where: { studentId_jobId: { studentId: profile.id, jobId } } });
  if (existing) {
    await db.savedJob.delete({ where: { studentId_jobId: { studentId: profile.id, jobId } } });
    return NextResponse.json({ ok: true, saved: false });
  }
  await db.savedJob.create({ data: { studentId: profile.id, jobId } });
  await db.analyticsEvent.create({ data: { userId: user.id, event: "job_saved", props: { jobId } } });
  return NextResponse.json({ ok: true, saved: true });
}
