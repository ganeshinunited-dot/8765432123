import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { interviewProposeSchema } from "@/lib/validation";
import { notify } from "@/lib/notifications";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const applicationId = String(body.applicationId || "");
  if (!applicationId) return NextResponse.json({ error: "Application is required." }, { status: 400 });
  const parsed = interviewProposeSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const app = await db.application.findFirst({
    where: { id: applicationId, job: { company: { ownerId: user.id } } },
    include: { job: { select: { title: true } }, student: { include: { user: { select: { id: true } } } } },
  });
  if (!app) return NextResponse.json({ error: "Application not found." }, { status: 404 });

  const dateTime = new Date(parsed.data.dateTime);
  if (dateTime.getTime() < Date.now()) {
    return NextResponse.json({ error: "Interview must be scheduled in the future." }, { status: 400 });
  }

  const interview = await db.interview.create({
    data: {
      applicationId: app.id,
      proposedById: user.id,
      dateTime,
      location: parsed.data.location || null,
      meetingLink: parsed.data.meetingLink || null,
      notes: parsed.data.notes || null,
    },
  });

  // Move application to INTERVIEW stage if not already past it
  if (["APPLIED", "VIEWED", "SHORTLISTED"].includes(app.status)) {
    await db.$transaction([
      db.application.update({ where: { id: app.id }, data: { status: "INTERVIEW" } }),
      db.applicationStatusHistory.create({ data: { applicationId: app.id, fromStatus: app.status, toStatus: "INTERVIEW", changedById: user.id } }),
    ]);
  }

  await notify(
    app.student.user.id, "INTERVIEW_INVITATION", "Interview invitation",
    `You have an interview for "${app.job.title}". Review and respond in your dashboard.`,
    "/dashboard/interviews"
  );

  return NextResponse.json({ ok: true, interviewId: interview.id });
}
