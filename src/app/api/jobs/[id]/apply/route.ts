import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey } from "@/lib/auth";
import { applicationSchema } from "@/lib/validation";
import { notify } from "@/lib/notifications";
import { sendTemplatedEmail } from "@/lib/email";
import { track } from "@/lib/analytics";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: jobId } = await params;
  if (!rateLimit(clientKey("apply", req), 20, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in to apply." }, { status: 401 });
  if (user.role !== "STUDENT") return NextResponse.json({ error: "Only student accounts can apply." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const profile = await db.studentProfile.findUnique({ where: { userId: user.id }, include: { user: true } });
  if (!profile) return NextResponse.json({ error: "Profile not found." }, { status: 404 });

  const job = await db.job.findUnique({
    where: { id: jobId },
    include: { company: { include: { owner: true } } },
  });
  if (!job || job.status !== "ACTIVE") return NextResponse.json({ error: "This job is no longer accepting applications." }, { status: 404 });
  if (job.deadline && job.deadline < new Date()) return NextResponse.json({ error: "The application deadline has passed." }, { status: 400 });

  const existing = await db.application.findUnique({ where: { jobId_studentId: { jobId, studentId: profile.id } } });
  if (existing) return NextResponse.json({ error: "You have already applied for this job." }, { status: 409 });

  const application = await db.application.create({
    data: {
      jobId,
      studentId: profile.id,
      coverMessage: parsed.data.coverMessage || null,
      answers: parsed.data.answers ?? undefined,
      availabilityNote: parsed.data.availabilityNote || null,
      history: { create: { toStatus: "APPLIED" } },
    },
  });

  await db.analyticsEvent.create({ data: { userId: user.id, event: "application_submitted", props: { jobId } } });

  // Notify employer (company owner)
  await notify(
    job.company.ownerId,
    "NEW_APPLICATION",
    `New application for ${job.title}`,
    `${profile.user.name} applied for ${job.title}.`,
    `/employer/applicants?job=${job.id}`
  );
  sendTemplatedEmail(profile.user.email, "application_submitted", {
    student_name: profile.user.name,
    job_title: job.title,
    company_name: job.company.name,
  }).catch(() => {});

  track(user.id, "application_submitted", { jobId: application.jobId, applicationId: application.id });
  return NextResponse.json({ ok: true, applicationId: application.id });
}
