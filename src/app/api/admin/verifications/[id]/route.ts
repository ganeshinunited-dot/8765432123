import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { verificationExpiresAt, autoChecks, MANUAL_CHECKS } from "@/lib/verification";
import { sendTemplatedEmail } from "@/lib/email";
import { notify } from "@/lib/notifications";

// Admin review of an employer verification request.
// API routes cannot redirect (requireAdmin redirects), so auth is checked
// here and failures are returned as JSON.

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: RouteParams) {
  const admin = await getSessionUser();
  if (!admin) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  if (!admin.isAdmin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const { id } = await params;
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const body = data as {
    action?: string;
    notes?: string;
    checks?: Record<string, boolean>;
    confirmContact?: boolean;
  };
  const action = body.action ?? "";
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 2000) : "";
  const checks = (body.checks ?? {}) as Record<string, boolean>;
  const confirmContact = body.confirmContact === true;

  if (!["approve", "needs_info", "reject", "confirm_contact"].includes(action)) {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }

  const verification = await db.companyVerification.findUnique({
    where: { id },
    include: { company: { include: { owner: true } } },
  });
  if (!verification) {
    return NextResponse.json({ error: "Verification request not found." }, { status: 404 });
  }
  const company = verification.company;
  const owner = company.owner;

  // --- standalone: confirm contact manually (email never went through) ---
  if (action === "confirm_contact") {
    if (owner.emailVerified) {
      return NextResponse.json({ error: "Email is already verified." }, { status: 400 });
    }
    await db.user.update({ where: { id: owner.id }, data: { emailVerified: true } });
    await logAdminAction(admin.id, "EMPLOYER_CONTACT_CONFIRMED", "Company", company.id, "Contact confirmed manually by admin.");
    return NextResponse.json({ ok: true });
  }

  if (verification.status === "VERIFIED" || verification.status === "REJECTED") {
    return NextResponse.json({ error: "This application was already decided." }, { status: 409 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";
  const profileUrl = `${baseUrl}/companies/${company.slug}`;

  async function tellOwner(statusText: string, emailNotes: string) {
    try {
      await notify(
        owner.id,
        "EMPLOYER_VERIFICATION",
        `Verification update: ${company.name}`,
        `Your company verification status is now: ${statusText}.`,
        statusText === "verified" ? `/companies/${company.slug}` : "/for-employers"
      );
    } catch (e) {
      console.error("[admin-verification] notify failed:", e);
    }
    try {
      await sendTemplatedEmail(owner.email, "employer_verification", {
        name: owner.name,
        company_name: company.name,
        status: statusText,
        notes: emailNotes,
      });
    } catch (e) {
      console.error("[admin-verification] decision email failed:", e);
    }
  }

  if (action === "approve") {
    const allChecked = MANUAL_CHECKS.every((c) => checks[c.key] === true);
    if (!allChecked) {
      return NextResponse.json(
        { error: "Approval requires all four manual checks to be ticked." },
        { status: 400 }
      );
    }
    if (!owner.emailVerified && !confirmContact) {
      return NextResponse.json(
        { error: "The owner must verify their email first, or confirm contact manually." },
        { status: 400 }
      );
    }
    const expiresAt = verificationExpiresAt();
    const finalChecks = {
      manual: checks,
      auto: autoChecks(
        {
          logoUrl: company.logoUrl,
          industry: company.industry,
          description: company.description,
          locationId: company.locationId,
          website: company.website,
        },
        true
      ),
    };
    await db.$transaction(async (tx) => {
      await tx.companyVerification.update({
        where: { id },
        data: {
          status: "VERIFIED",
          reviewerId: admin.id,
          reviewedAt: new Date(),
          expiresAt,
          checks: finalChecks as object,
          notes: notes || null,
        },
      });
      await tx.company.update({
        where: { id: company.id },
        data: {
          verificationStatus: "VERIFIED",
          verifiedAt: new Date(),
          verificationExpiresAt: expiresAt,
        },
      });
      if (confirmContact && !owner.emailVerified) {
        await tx.user.update({ where: { id: owner.id }, data: { emailVerified: true } });
      }
    });
    await logAdminAction(
      admin.id,
      "EMPLOYER_VERIFIED",
      "Company",
      company.id,
      confirmContact ? "Approved. Contact confirmed manually by admin." : "Approved."
    );
    await tellOwner("verified", notes ? `Notes from our team: ${notes}` : `Your public profile is live: ${profileUrl}`);
    return NextResponse.json({ ok: true, status: "VERIFIED" });
  }

  if (action === "needs_info") {
    if (!notes) {
      return NextResponse.json(
        { error: "Write what is missing in the notes first." },
        { status: 400 }
      );
    }
    await db.$transaction(async (tx) => {
      await tx.companyVerification.update({
        where: { id },
        data: { status: "NEEDS_INFO", reviewerId: admin.id, reviewedAt: new Date(), notes, checks: { manual: checks } as object },
      });
      await tx.company.update({ where: { id: company.id }, data: { verificationStatus: "NEEDS_INFO" } });
    });
    await logAdminAction(admin.id, "EMPLOYER_NEEDS_INFO", "Company", company.id, notes);
    await tellOwner("needs more information", `What we need from you: ${notes}`);
    return NextResponse.json({ ok: true, status: "NEEDS_INFO" });
  }

  // reject
  if (!notes) {
    return NextResponse.json(
      { error: "A reason is required for rejection — it is shown to the employer." },
      { status: 400 }
    );
  }
  await db.$transaction(async (tx) => {
    await tx.companyVerification.update({
      where: { id },
      data: { status: "REJECTED", reviewerId: admin.id, reviewedAt: new Date(), notes, checks: { manual: checks } as object },
    });
    await tx.company.update({ where: { id: company.id }, data: { verificationStatus: "REJECTED" } });
  });
  await logAdminAction(admin.id, "EMPLOYER_REJECTED", "Company", company.id, notes);
  await tellOwner("rejected", `Reason: ${notes}`);
  return NextResponse.json({ ok: true, status: "REJECTED" });
}
