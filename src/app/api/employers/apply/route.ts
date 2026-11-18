import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { hashPassword, rateLimit, clientKey } from "@/lib/auth";
import { employerOnboardingSchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";
import { autoChecks } from "@/lib/verification";
import { sendTemplatedEmail, sendEmail } from "@/lib/email";
import { notify } from "@/lib/notifications";

// Employer onboarding application (v1, free, no document uploads).
// Creates User (EMPLOYER, unverified) + Company (PENDING) +
// CompanyVerification (PENDING) in one transaction. No session is created —
// the employer verifies their email first, then an admin reviews.
// Email failures never fail the application: the admin queue shows whether
// email is configured, and the employer is contacted manually if needed.

const FREE_MAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "protonmail.com",
  "proton.me",
  "icloud.com",
  "me.com",
  "mail.com",
  "gmx.com",
  "zoho.com",
]);

function normaliseWebsite(raw: string): string {
  return raw.trim().replace(/\/+$/, "");
}

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field; humans never see it.
  // Accept silently and create nothing — never tell a bot it was caught.
  if (typeof (data as { website2?: unknown })?.website2 === "string" && (data as { website2: string }).website2.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  // Soft rate limit (in-memory, per process — see lib/rate-limit.ts).
  if (!rateLimit(clientKey("employer-apply", req), 3, 3_600_000)) {
    return NextResponse.json(
      { error: "Too many applications from this address. Please try again in an hour." },
      { status: 429 }
    );
  }

  const parsed = employerOnboardingSchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message || "Please check the form and try again." },
      { status: 400 }
    );
  }
  const v = parsed.data;
  const website = normaliseWebsite(v.website);

  // One application per email per 24 hours, and no duplicate accounts.
  const existingUser = await db.user.findUnique({ where: { email: v.email } });
  if (existingUser) {
    const recentCompany = await db.company.findFirst({
      where: { ownerId: existingUser.id },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });
    if (recentCompany && Date.now() - recentCompany.createdAt.getTime() < 24 * 3600 * 1000) {
      return NextResponse.json(
        { error: "An application from this email was already submitted in the last 24 hours." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "An account with this email already exists. Try logging in, or reset your password." },
      { status: 409 }
    );
  }
  if (v.phone) {
    const phoneTaken = await db.user.findUnique({ where: { phone: v.phone } });
    if (phoneTaken) {
      return NextResponse.json(
        { error: "This phone number is already registered to another account." },
        { status: 409 }
      );
    }
  }

  // Duplicate company: same website already applied.
  const websiteTaken = await db.company.findFirst({ where: { website }, select: { id: true } });
  if (websiteTaken) {
    return NextResponse.json(
      { error: "This company website has already been submitted." },
      { status: 409 }
    );
  }

  // Duplicate registration number: businessInfo is Json, so compare the
  // recent verifications in code (the table is tiny in v1).
  const regNo = v.registrationNo.trim().toLowerCase();
  const recent = await db.companyVerification.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
    select: { businessInfo: true },
  });
  for (const r of recent) {
    const info = r.businessInfo as Record<string, unknown> | null;
    if (typeof info?.registrationNo === "string" && info.registrationNo.trim().toLowerCase() === regNo) {
      return NextResponse.json(
        { error: "This business registration number has already been submitted." },
        { status: 409 }
      );
    }
  }

  // Unique slug from the company name (-2, -3 on collision).
  let slug = slugify(v.companyName) || "company";
  let candidate = slug;
  let n = 2;
  while (await db.company.findUnique({ where: { slug: candidate }, select: { id: true } })) {
    candidate = `${slug}-${n}`;
    n += 1;
  }
  slug = candidate;

  // Soft email-domain check: applicant email domain vs company website
  // domain. A mismatch on a non-free-mail domain is flagged for manual
  // review only — small businesses legitimately use Gmail, so it never
  // blocks an application on its own.
  let siteHost = "";
  try {
    siteHost = new URL(website).hostname.replace(/^www\./, "");
  } catch {
    siteHost = "";
  }
  const emailDomain = v.email.split("@")[1]?.toLowerCase() ?? "";
  const domainMismatch =
    !!siteHost && !!emailDomain && emailDomain !== siteHost && !FREE_MAIL_DOMAINS.has(emailDomain);

  const passwordHash = await hashPassword(v.password);
  const verifyToken = randomBytes(32).toString("hex");
  const verifyExpiry = new Date(Date.now() + 24 * 3600 * 1000);

  const profileLike = {
    logoUrl: v.logoUrl || null,
    industry: v.industry || null,
    description: v.description || null,
    locationId: null,
    website,
  };
  const checks = {
    auto: autoChecks(profileLike, false),
    domainMismatch,
  };

  const businessInfo = {
    registrationNo: v.registrationNo.trim(),
    contactPerson: v.contactName.trim(),
    contactTitle: v.contactTitle || "",
    address: v.address.trim(),
    city: v.city || "",
    country: v.country || "",
    contactEmail: v.email,
    contactPhone: v.phone || "",
  };

  const created = await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: v.email,
        phone: v.phone || null,
        passwordHash,
        name: v.contactName.trim(),
        role: "EMPLOYER",
        emailVerified: false,
        emailVerifyToken: verifyToken,
        emailVerifyExpiry: verifyExpiry,
        marketingOptIn: v.marketingOptIn ?? false,
      },
      select: { id: true, email: true },
    });
    const company = await tx.company.create({
      data: {
        ownerId: user.id,
        name: v.companyName.trim(),
        slug,
        logoUrl: v.logoUrl || null,
        industry: v.industry || null,
        description: v.description || null,
        website,
        size: v.size || null,
        verificationStatus: "PENDING",
      },
      select: { id: true, slug: true, name: true },
    });
    const verification = await tx.companyVerification.create({
      data: {
        companyId: company.id,
        businessInfo,
        status: "PENDING",
        checks: checks as object,
      },
      select: { id: true },
    });
    return { user, company, verification };
  });

  // Verification email to the applicant + alert to the admin. Either may
  // fail (e.g. email not configured); the application itself still stands
  // and the admin queue shows the email state.
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";
  let emailSent = false;
  try {
    await sendTemplatedEmail(v.email, "email_verification", {
      name: v.contactName.trim(),
      verify_url: `${baseUrl}/api/auth/verify-email?token=${verifyToken}`,
    });
    emailSent = true;
  } catch (e) {
    console.error("[employer-apply] verify email failed:", e);
  }
  try {
    await sendEmail({
      to: "support@growentix.cloud",
      subject: `New employer application: ${created.company.name}`,
      html: `<p>A new employer application was submitted for <strong>${created.company.name}</strong> (${website}).</p><p>Review it at ${baseUrl}/admin/verifications/${created.verification.id}</p>`,
    });
  } catch (e) {
    console.error("[employer-apply] admin alert email failed:", e);
  }
  try {
    const admin = await db.user.findFirst({ where: { isAdmin: true }, select: { id: true } });
    if (admin) {
      await notify(
        admin.id,
        "EMPLOYER_VERIFICATION",
        `New employer application: ${created.company.name}`,
        `${v.contactName.trim()} applied for ${created.company.name}. Review it in the verification queue.`,
        `/admin/verifications/${created.verification.id}`
      );
    }
  } catch (e) {
    console.error("[employer-apply] admin notify failed:", e);
  }

  return NextResponse.json({ ok: true, emailSent }, { status: 201 });
}
