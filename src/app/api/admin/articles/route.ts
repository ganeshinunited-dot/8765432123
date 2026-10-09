import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { articleSlug } from "@/lib/articles";
import { VALID_CATEGORIES } from "@/lib/articleWriter";

async function isAdmin() {
  const user = await getSessionUser();
  return user && user.isAdmin ? user : null;
}

function clean(data: Record<string, unknown>) {
  const str = (v: unknown) => String(v ?? "").trim();
  const category = str(data.category);
  return {
    slug: str(data.slug),
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

export async function GET() {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 100,
    select: { id: true, slug: true, category: true, titleEn: true, publishedAt: true },
  });
  return NextResponse.json({ articles });
}

export async function POST(req: Request) {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const data = clean(body);
  if (!data.titleEn || !data.bodyEn) {
    return NextResponse.json({ error: "English title and body are required." }, { status: 400 });
  }
  let slug = data.slug || articleSlug(data.titleEn) || "job-news";
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  if (!data.slug) slug = `${slug}-${dateStr}`;
  let n = 2;
  let finalSlug = slug;
  while (await db.article.findUnique({ where: { slug: finalSlug }, select: { id: true } })) {
    finalSlug = `${slug}-${n++}`;
  }
  const article = await db.article.create({
    data: {
      slug: finalSlug,
      category: data.category,
      country: data.country,
      titleEn: data.titleEn,
      titleNe: data.titleNe || data.titleEn,
      excerptEn: data.excerptEn,
      excerptNe: data.excerptNe || data.excerptEn,
      bodyEn: data.bodyEn,
      bodyNe: data.bodyNe || data.bodyEn,
      sources: data.sources,
      publishedAt: new Date(),
    },
  });
  await logAdminAction(admin.id, "ARTICLE_PUBLISHED", "Article", article.id, data.titleEn);
  return NextResponse.json({ ok: true, slug: article.slug });
}
