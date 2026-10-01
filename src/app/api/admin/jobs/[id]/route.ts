import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { notify } from "@/lib/notifications";

async function isAdmin() {
  const user = await getSessionUser();
  return user && user.role === "ADMIN" ? user : null;
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const job = await db.job.findUnique({ where: { id }, include: { company: true } });
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  if (action === "approve" && job.status === "PENDING_REVIEW") {
    await db.job.update({
      where: { id },
      data: { status: "ACTIVE", publishedAt: new Date(), expiresAt: new Date(Date.now() + 30 * 86400000), moderationNotes: null },
    });
    await logAdminAction(admin.id, "JOB_APPROVED", "Job", id);
    await notify(job.company.ownerId, "JOB_APPROVED", "Job approved", `"${job.title}" is now live.`, `/jobs/${job.slug}`);
    return NextResponse.json({ ok: true });
  }

  if (action === "reject") {
    const reason = String(body.reason || "").trim();
    if (!reason) return NextResponse.json({ error: "Please give a reason." }, { status: 400 });
    await db.job.update({ where: { id }, data: { status: "REJECTED", moderationNotes: reason } });
    await logAdminAction(admin.id, "JOB_REJECTED", "Job", id, reason);
    await notify(job.company.ownerId, "JOB_REJECTED", "Job needs changes", `"${job.title}" was not approved: ${reason}`, "/employer/jobs");
    return NextResponse.json({ ok: true });
  }

  if (action === "feature" || action === "unfeature") {
    await db.job.update({ where: { id }, data: { featured: action === "feature" } });
    await logAdminAction(admin.id, action === "feature" ? "JOB_FEATURED" : "JOB_UNFEATURED", "Job", id);
    return NextResponse.json({ ok: true });
  }

  if (action === "remove" && ["ACTIVE", "PENDING_REVIEW"].includes(job.status)) {
    await db.job.update({ where: { id }, data: { status: "EXPIRED" } });
    await logAdminAction(admin.id, "JOB_REMOVED", "Job", id, String(body.reason || ""));
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
