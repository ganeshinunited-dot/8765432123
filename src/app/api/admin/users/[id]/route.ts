import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await getSessionUser();
  if (!admin || admin.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  if (id === admin.id) return NextResponse.json({ error: "You cannot change your own account." }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  if (action === "suspend") {
    await db.$transaction([
      db.user.update({ where: { id }, data: { status: "SUSPENDED" } }),
      db.session.deleteMany({ where: { userId: id } }),
    ]);
    await logAdminAction(admin.id, "USER_SUSPENDED", "User", id, String(body.reason || ""));
    return NextResponse.json({ ok: true });
  }
  if (action === "reactivate") {
    await db.user.update({ where: { id }, data: { status: "ACTIVE" } });
    await logAdminAction(admin.id, "USER_REACTIVATED", "User", id);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
