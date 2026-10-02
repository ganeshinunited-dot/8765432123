import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const revalidate = 300;

export async function generateStaticParams() {
  const pages = await db.cmsPage.findMany({ select: { slug: true } });
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await db.cmsPage.findUnique({ where: { slug } });
  return { title: page ? `${page.title} | Growentix` : "Page not found" };
}

export default async function CmsPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await db.cmsPage.findUnique({ where: { slug } });
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{page.title}</h1>
      <div className="prose prose-slate mt-6 max-w-none whitespace-pre-line text-slate-700">
        {page.content}
      </div>
    </div>
  );
}
