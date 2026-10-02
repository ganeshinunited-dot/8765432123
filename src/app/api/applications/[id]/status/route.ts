import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { notify } from "@/lib/notifications";

// Employer transitions: APPLIED -> VIEWED -> SHORTLISTED -> INTERVIEW -> SELECTED
// or -> REJECTED from any active state. WITHDRAWN is student-only.
const ALLOWED: Record<string, string[]> = {
  APPLIED: ["VIEWED", "SHORTLISTED", "REJECTED"],
  VIEWED: ["SHORTLISTED", "REJECTED"],
  SHORTLISTED: ["INTERVIEW", "REJECTED"],
  INTERVIEW: ["SELECTED", "REJECTED"],
  SELECTED: [],
  REJECTED: [],
  WITHDRAWN: [],
};

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const app = await db.application.findFirst({
    where: { id, job: { company: { ownerId: user.id } } },
    include: { job: { select: { title: true } }, student: { include: { user: true } } },
  });
  if (!app) return NextResponse.json({ error: "Application not found." }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const to = String(body.status || "");
  if (!ALLOWED[app.status]?.includes(to)) {
    return NextResponse.json({ error: `Cannot move from ${app.status} to ${to}.` }, { status: 400 });
  }

  await db.$transaction([
    db.application.update({ where: { id }, data: { status: to as never } }),
    db.applicationStatusHistory.create({ data: { applicationId: id, fromStatus: app.status, toStatus: to as never, changedById: user.id } }),
  ]);

  const messages: Record<string, [string, string]> = {
    VIEWED: ["APPLICATION_VIEWED", `Your application for "${app.job.title}" was viewed by the employer.`],
    SHORTLISTED: ["SHORTLISTED", `Good news — you were shortlisted for "${app.job.title}".`],
    INTERVIEW: ["INTERVIEW_INVITATION", `You've been invited to interview for "${app.job.title}". Check your messages.`],
    SELECTED: ["SHORTLISTED", `Congratulations! You were selected for "${app.job.title}".`],
    REJECTED: ["REJECTED", `Update on "${app.job.title}": the employer moved on with other candidates.`],
  };
  const [type, notifBody] = messages[to] || ["SYSTEM", "Your application status changed."];
  await notify(app.student.user.id, type as never, "Application update", notifBody, "/dashboard/applications");

  return NextResponse.json({ ok: true, status: to });
}
