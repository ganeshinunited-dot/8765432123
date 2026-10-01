import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { z } from "zod";

const pageSchema = z.object({
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens."),
  title: z.string().min(2).max(120),
  content: z.string().min(10, "Content is too short."),
});

export async function POST(req: Request) {
  const admin = await getSessionUser();
  if (!admin || admin.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = pageSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const page = await db.cmsPage.upsert({
    where: { slug: parsed.data.slug },
    update: { title: parsed.data.title, content: parsed.data.content },
    create: parsed.data,
  });
  await logAdminAction(admin.id, "CMS_UPDATED", "CmsPage", page.id, parsed.data.slug);
  return NextResponse.json({ ok: true, slug: page.slug });
}
