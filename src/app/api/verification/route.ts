import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey, canActAsEmployer } from "@/lib/auth";
import { notify } from "@/lib/notifications";
import { autoChecks, REQUIRED_DOCS_MIN } from "@/lib/verification";

const verificationSchema = z.object({
  registrationNo: z.string().trim().min(4, "Business registration number is required.").max(100),
  contactPerson: z.string().trim().min(2, "Contact person is required.").max(120),
  address: z.string().trim().min(3, "Business address is required.").max(300),
  phone: z.string().trim().min(7, "Valid phone is required.").max(20),
  documentIds: z.array(z.string()).min(REQUIRED_DOCS_MIN, "At least one supporting document is required.").max(5),
});

export async function POST(req: Request) {
  if (!rateLimit(clientKey("verify", req), 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const user = await getSessionUser();
  if (!user || !canActAsEmployer(user.role)) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = verificationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const company = await db.company.findFirst({ where: { ownerId: user.id } });
  if (!company) return NextResponse.json({ error: "Create your company profile first." }, { status: 400 });

  // No double submissions while one is in review
  const latest = await db.companyVerification.findFirst({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, status: true },
  });
  if (latest?.status === "PENDING") {
    return NextResponse.json({ error: "You already have an application under review." }, { status: 400 });
  }

  // Company profile must be complete before verification is meaningful
  const owner = await db.user.findUnique({ where: { id: user.id }, select: { emailVerified: true } });
  const checks = autoChecks(company, !!owner?.emailVerified);
  const profileReady = checks.find((c) => c.key === "profile-complete")?.passed;
  if (!profileReady) {
    return NextResponse.json({ error: "Complete your company profile (logo, industry, description, location) before applying." }, { status: 400 });
  }

  // Documents must belong to this user and be marked as verification documents
  for (const docId of parsed.data.documentIds) {
    const f = await db.uploadedFile.findFirst({ where: { id: docId, ownerId: user.id, purpose: "DOCUMENT" } });
    if (!f) return NextResponse.json({ error: "Invalid verification document." }, { status: 400 });
  }

  // Fraud signal: same registration number used by a different company
  const regNo = parsed.data.registrationNo.trim();
  const duplicate = await db.companyVerification.findFirst({
    where: {
      companyId: { not: company.id },
      businessInfo: { path: ["registrationNo"], equals: regNo },
    },
    select: { id: true, company: { select: { id: true, name: true, verificationStatus: true } } },
    orderBy: { createdAt: "desc" },
  });

  await db.companyVerification.create({
    data: {
      companyId: company.id,
      businessInfo: {
        registrationNo: regNo,
        contactPerson: parsed.data.contactPerson.trim(),
        address: parsed.data.address.trim(),
        phone: parsed.data.phone.trim(),
      },
      documentIds: parsed.data.documentIds,
      status: "PENDING",
      checks: {
        auto: checks.map((c) => ({ key: c.key, label: c.label, passed: c.passed, detail: c.detail ?? null })),
        fraud: duplicate
          ? [{ type: "PAN_DUPLICATE", message: `Registration no. already used by "${duplicate.company.name}" (${duplicate.company.id}).`, companyId: duplicate.company.id }]
          : [],
      } as never,
    },
  });
  await db.company.update({ where: { id: company.id }, data: { verificationStatus: "PENDING" } });

  const admins = await db.user.findMany({ where: { role: "ADMIN", status: "ACTIVE" }, select: { id: true } });
  await Promise.all(
    admins.map((a) => notify(a.id, "EMPLOYER_VERIFICATION", "New verification request", `${company.name} requested verification.${duplicate ? " ⚠ PAN already used by another company." : ""}`, "/admin/verifications"))
  );

  return NextResponse.json({ ok: true });
}
