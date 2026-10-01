import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { notify } from "@/lib/notifications";

const ALLOWED_FROM = ["APPLIED", "VIEWED", "SHORTLISTED"];

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "STUDENT") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const profile = await db.studentProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found." }, { status: 404 });

  const application = await db.application.findFirst({
    where: { id, studentId: profile.id },
    include: { job: { include: { company: true } } },
  });
  if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });
  if (!ALLOWED_FROM.includes(application.status)) {
    return NextResponse.json({ error: "This application can no longer be withdrawn." }, { status: 400 });
  }

  await db.$transaction([
    db.application.update({ where: { id }, data: { status: "WITHDRAWN" } }),
    db.applicationStatusHistory.create({ data: { applicationId: id, fromStatus: application.status, toStatus: "WITHDRAWN", changedById: user.id } }),
  ]);

  await notify(
    application.job.company.ownerId,
    "SYSTEM",
    "Application withdrawn",
    `${user.name} withdrew their application for ${application.job.title}.`,
    `/employer/applicants?job=${application.jobId}`
  );

  return NextResponse.json({ ok: true });
}
