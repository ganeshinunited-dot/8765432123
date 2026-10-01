import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const report = await db.report.findUnique({ where: { id } });
  if (!report) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  if (action === "resolve" || action === "dismiss") {
    const status = action === "resolve" ? "RESOLVED" : "DISMISSED";
    await db.report.update({ where: { id }, data: { status: status as never, resolvedAt: new Date(), assignedTo: user.id } });
    await logAdminAction(user.id, `REPORT_${status}`, "Report", id, String(body.notes || ""));
    return NextResponse.json({ ok: true });
  }

  // Escalate: take down the reported job / suspend the user
  if (action === "takedown" && report.targetType === "JOB") {
    await db.$transaction([
      db.job.update({ where: { id: report.targetId }, data: { status: "EXPIRED" } }),
      db.report.update({ where: { id }, data: { status: "RESOLVED" as never, resolvedAt: new Date(), assignedTo: user.id } }),
    ]);
    await logAdminAction(user.id, "JOB_REMOVED", "Job", report.targetId, `From report ${id}`);
    return NextResponse.json({ ok: true });
  }

  if (action === "suspend_user" && report.targetType === "USER") {
    await db.$transaction([
      db.user.update({ where: { id: report.targetId }, data: { status: "SUSPENDED" } }),
      db.session.deleteMany({ where: { userId: report.targetId } }),
      db.report.update({ where: { id }, data: { status: "RESOLVED" as never, resolvedAt: new Date(), assignedTo: user.id } }),
    ]);
    await logAdminAction(user.id, "USER_SUSPENDED", "User", report.targetId, `From report ${id}`);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
