import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { notify } from "@/lib/notifications";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const verification = await db.companyVerification.findUnique({ where: { id }, include: { company: true } });
  if (!verification) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (verification.status !== "PENDING") return NextResponse.json({ error: "Already reviewed." }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");
  if (action !== "approve" && action !== "reject") return NextResponse.json({ error: "Invalid action." }, { status: 400 });

  const notes = String(body.notes || "").trim();
  if (action === "reject" && !notes) return NextResponse.json({ error: "Please give a reason." }, { status: 400 });

  const status = action === "approve" ? "VERIFIED" : "REJECTED";
  await db.$transaction([
    db.companyVerification.update({ where: { id }, data: { status: status as never, reviewerId: user.id, notes: notes || null } }),
    db.company.update({
      where: { id: verification.companyId },
      data: { verificationStatus: status as never, verifiedAt: action === "approve" ? new Date() : null },
    }),
  ]);

  await logAdminAction(user.id, action === "approve" ? "VERIFICATION_APPROVED" : "VERIFICATION_REJECTED", "Company", verification.companyId, notes);
  await notify(
    verification.company.ownerId,
    "EMPLOYER_VERIFICATION",
    action === "approve" ? "Company verified" : "Verification needs attention",
    action === "approve"
      ? `${verification.company.name} is now verified. Your jobs show a trust badge.`
      : `${verification.company.name} verification was not approved: ${notes}`,
    "/employer/company"
  );

  return NextResponse.json({ ok: true });
}
