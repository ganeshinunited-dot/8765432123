import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { VALID_CATEGORIES } from "@/lib/articleWriter";

async function isAdmin() {
  const user = await getSessionUser();
  return user && user.isAdmin ? user : null;
}

function clean(data: Record<string, unknown>) {
  const str = (v: unknown) => String(v ?? "").trim();
  const category = str(data.category);
  return {
    category: VALID_CATEGORIES.has(category) ? category : "global",
    country: str(data.country) || null,
    titleEn: str(data.titleEn).slice(0, 200),
    titleNe: str(data.titleNe).slice(0, 200),
    excerptEn: str(data.excerptEn).slice(0, 500),
    excerptNe: str(data.excerptNe).slice(0, 500),
    bodyEn: str(data.bodyEn),
    bodyNe: str(data.bodyNe),
    sources: Array.isArray(data.sources)
      ? (data.sources as unknown[]).map((s) => String(s).trim()).filter(Boolean).slice(0, 10)
      : [],
  };
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const data = clean(body);
  if (!data.titleEn || !data.bodyEn) {
    return NextResponse.json({ error: "English title and body are required." }, { status: 400 });
  }
  const article = await db.article.update({
    where: { id },
    data: {
      category: data.category,
      country: data.country,
      titleEn: data.titleEn,
      titleNe: data.titleNe || data.titleEn,
      excerptEn: data.excerptEn,
      excerptNe: data.excerptNe || data.excerptEn,
      bodyEn: data.bodyEn,
      bodyNe: data.bodyNe || data.bodyEn,
      sources: data.sources,
    },
  });
  await logAdminAction(admin.id, "ARTICLE_UPDATED", "Article", id, data.titleEn);
  return NextResponse.json({ ok: true, slug: article.slug });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const { id } = await params;
  const article = await db.article.findUnique({ where: { id }, select: { titleEn: true } });
  await db.article.delete({ where: { id } });
  await logAdminAction(admin.id, "ARTICLE_DELETED", "Article", id, article?.titleEn ?? "");
  return NextResponse.json({ ok: true });
}
