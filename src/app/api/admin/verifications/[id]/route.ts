import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { notify } from "@/lib/notifications";
import { verificationExpiresAt } from "@/lib/verification";

const ACTIONS = ["approve", "reject", "needs-info"] as const;

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const verification = await db.companyVerification.findUnique({ where: { id }, include: { company: true } });
  if (!verification) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (verification.status !== "PENDING") return NextResponse.json({ error: "Already reviewed." }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");
  if (!ACTIONS.includes(action as (typeof ACTIONS)[number])) return NextResponse.json({ error: "Invalid action." }, { status: 400 });

  const notes = String(body.notes || "").trim();
  if ((action === "reject" || action === "needs-info") && !notes) {
    return NextResponse.json({ error: "Please explain what is needed." }, { status: 400 });
  }
  const manualChecks = Array.isArray(body.manualChecks) ? body.manualChecks.filter((c: unknown) => typeof c === "string") : [];

  const expires = verificationExpiresAt();
  const newStatus = action === "approve" ? "VERIFIED" : action === "needs-info" ? "NEEDS_INFO" : "REJECTED";

  const existingChecks = (verification.checks as Record<string, unknown> | null) || {};
  // A rejected/needs-info renewal should not strip an existing valid badge.
  const wasValidBadge =
    verification.company.verificationStatus === "VERIFIED" &&
    (!verification.company.verificationExpiresAt || new Date(verification.company.verificationExpiresAt).getTime() > Date.now());
  const companyStatus = action === "approve" ? "VERIFIED" : wasValidBadge ? "VERIFIED" : newStatus;
  await db.$transaction([
    db.companyVerification.update({
      where: { id },
      data: {
        status: newStatus as never,
        reviewerId: user.id,
        reviewedAt: new Date(),
        notes: notes || null,
        expiresAt: action === "approve" ? expires : null,
        checks: { ...existingChecks, manual: manualChecks, reviewedBy: user.id, decidedAt: new Date().toISOString() },
      },
    }),
    db.company.update({
      where: { id: verification.companyId },
      data: {
        verificationStatus: companyStatus as never,
        verifiedAt: action === "approve" ? new Date() : verification.company.verifiedAt,
        verificationExpiresAt: action === "approve" ? expires : verification.company.verificationExpiresAt,
      },
    }),
  ]);

  const auditLabel = action === "approve" ? "VERIFICATION_APPROVED" : action === "needs-info" ? "VERIFICATION_NEEDS_INFO" : "VERIFICATION_REJECTED";
  await logAdminAction(user.id, auditLabel, "Company", verification.companyId, notes);
  await notify(
    verification.company.ownerId,
    "EMPLOYER_VERIFICATION",
    action === "approve" ? "Company verified" : action === "needs-info" ? "Verification: more info needed" : "Verification needs attention",
    action === "approve"
      ? `${verification.company.name} is now verified. Your jobs show a trust badge (valid 12 months).`
      : `${verification.company.name}: ${notes}`,
    "/employer/company"
  );

  return NextResponse.json({ ok: true });
}
