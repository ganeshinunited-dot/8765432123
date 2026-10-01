import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey } from "@/lib/auth";
import { reportSchema } from "@/lib/validation";
import { notify } from "@/lib/notifications";

export async function POST(req: Request) {
  if (!rateLimit(clientKey("report", req), 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in to submit a report." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  // Verify target exists (basic)
  const { targetType, targetId } = parsed.data;
  let targetExists = false;
  if (targetType === "JOB") targetExists = !!(await db.job.findUnique({ where: { id: targetId }, select: { id: true } }));
  else if (targetType === "COMPANY") targetExists = !!(await db.company.findUnique({ where: { id: targetId }, select: { id: true } }));
  else if (targetType === "USER") targetExists = !!(await db.user.findUnique({ where: { id: targetId }, select: { id: true } }));
  else if (targetType === "MESSAGE") targetExists = !!(await db.message.findUnique({ where: { id: targetId }, select: { id: true } }));
  if (!targetExists) return NextResponse.json({ error: "Reported item not found." }, { status: 404 });

  const report = await db.report.create({
    data: {
      reporterId: user.id,
      targetType: parsed.data.targetType,
      targetId: parsed.data.targetId,
      reason: parsed.data.reason,
      details: parsed.data.details || null,
    },
  });

  // Notify all admins
  const admins = await db.user.findMany({ where: { role: "ADMIN", status: "ACTIVE" }, select: { id: true } });
  await Promise.all(
    admins.map((a) => notify(a.id, "SYSTEM", "New report submitted", `${parsed.data.reason} reported on ${parsed.data.targetType.toLowerCase()}.`, "/admin/reports"))
  );

  return NextResponse.json({ ok: true, reportId: report.id });
}
