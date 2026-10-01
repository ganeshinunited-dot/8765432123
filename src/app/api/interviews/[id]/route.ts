import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { notify } from "@/lib/notifications";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const interview = await db.interview.findFirst({
    where: { id },
    include: {
      application: {
        include: {
          job: { include: { company: true } },
          student: { include: { user: { select: { id: true, name: true } } } },
        },
      },
    },
  });
  if (!interview) return NextResponse.json({ error: "Interview not found." }, { status: 404 });

  const isStudent = interview.application.student.user.id === user.id;
  const isEmployer = interview.application.job.company.ownerId === user.id;
  if (!isStudent && !isEmployer) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  if (isStudent && interview.status === "PROPOSED" && (action === "accept" || action === "decline")) {
    const to = action === "accept" ? "ACCEPTED" : "DECLINED";
    const candidateName = interview.application.student.user.name || "The candidate";
    await db.interview.update({ where: { id }, data: { status: to as never } });
    await notify(
      interview.application.job.company.ownerId,
      "SYSTEM",
      "Interview response",
      `${candidateName} ${action === "accept" ? "accepted" : "declined"} the interview for "${interview.application.job.title}".`,
      "/employer/applicants"
    );
    return NextResponse.json({ ok: true, status: to });
  }

  if (isStudent && interview.status === "PROPOSED" && action === "reschedule") {
    const candidateName = interview.application.student.user.name || "The candidate";
    await db.interview.update({ where: { id }, data: { status: "RESCHEDULE_REQUESTED" as never } });
    await notify(
      interview.application.job.company.ownerId,
      "SYSTEM",
      "Reschedule requested",
      `${candidateName} asked to reschedule the interview for "${interview.application.job.title}".`,
      "/employer/applicants"
    );
    return NextResponse.json({ ok: true, status: "RESCHEDULE_REQUESTED" });
  }

  if (isEmployer && ["PROPOSED", "RESCHEDULE_REQUESTED"].includes(interview.status) && action === "cancel") {
    await db.interview.update({ where: { id }, data: { status: "CANCELLED" as never } });
    return NextResponse.json({ ok: true, status: "CANCELLED" });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
