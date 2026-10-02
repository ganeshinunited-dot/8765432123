import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, canActAsEmployer } from "@/lib/auth";
import { companyProfileSchema } from "@/lib/validation";
import { uniqueSlug } from "@/lib/format";

export async function GET() {
  const user = await getSessionUser();
  if (!user || !canActAsEmployer(user.role)) return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  const company = await db.company.findFirst({ where: { ownerId: user.id }, include: { location: true } });
  return NextResponse.json({ company });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user || !canActAsEmployer(user.role)) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = companyProfileSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const data = parsed.data;

  let company = await db.company.findFirst({ where: { ownerId: user.id } });
  const logoUrl = data.logoUrl || null;
  if (!company) {
    company = await db.company.create({
      data: {
        ownerId: user.id,
        name: data.name,
        slug: uniqueSlug(data.name),
        industry: data.industry || null,
        description: data.description || null,
        locationId: data.locationId || null,
        website: data.website || null,
        size: data.size || null,
        logoUrl,
      },
    });
  } else {
    company = await db.company.update({
      where: { id: company.id },
      data: {
        name: data.name,
        industry: data.industry || null,
        description: data.description || null,
        locationId: data.locationId || null,
        website: data.website || null,
        size: data.size || null,
        ...(logoUrl ? { logoUrl } : {}),
      },
    });
  }
  return NextResponse.json({ ok: true, company });
}
