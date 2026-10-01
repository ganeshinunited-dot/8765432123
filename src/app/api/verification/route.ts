import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey } from "@/lib/auth";
import { notify } from "@/lib/notifications";

const verificationSchema = z.object({
  registrationNo: z.string().max(100).optional().or(z.literal("")),
  contactPerson: z.string().trim().min(2, "Contact person is required.").max(120),
  address: z.string().trim().min(3, "Business address is required.").max(300),
  phone: z.string().trim().min(7, "Valid phone is required.").max(20),
  documentIds: z.array(z.string()).max(5).default([]),
});

export async function POST(req: Request) {
  if (!rateLimit(clientKey("verify", req), 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = verificationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const company = await db.company.findFirst({ where: { ownerId: user.id } });
  if (!company) return NextResponse.json({ error: "Create your company profile first." }, { status: 400 });

  // Validate document ownership
  for (const docId of parsed.data.documentIds) {
    const f = await db.uploadedFile.findFirst({ where: { id: docId, ownerId: user.id, purpose: "DOCUMENT" } });
    if (!f) return NextResponse.json({ error: "Invalid verification document." }, { status: 400 });
  }

  await db.companyVerification.create({
    data: {
      companyId: company.id,
      businessInfo: {
        registrationNo: parsed.data.registrationNo,
        contactPerson: parsed.data.contactPerson,
        address: parsed.data.address,
        phone: parsed.data.phone,
      },
      documentIds: parsed.data.documentIds,
      status: "PENDING",
    },
  });
  await db.company.update({ where: { id: company.id }, data: { verificationStatus: "PENDING" } });

  const admins = await db.user.findMany({ where: { role: "ADMIN", status: "ACTIVE" }, select: { id: true } });
  await Promise.all(
    admins.map((a) => notify(a.id, "EMPLOYER_VERIFICATION", "New verification request", `${company.name} requested verification.`, "/admin/verification"))
  );

  return NextResponse.json({ ok: true });
}
