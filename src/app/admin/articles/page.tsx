import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_NAV } from "../home/page";
import { articleCategoryLabel } from "@/lib/articles";
import { ArticleDeleteButton } from "@/components/admin/ArticleDeleteButton";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 100,
    select: { id: true, slug: true, category: true, titleEn: true, publishedAt: true },
  });

  return (
    <AdminShell title="Articles" nav={ADMIN_NAV} active="/admin/articles">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {articles.length} published — the daily cron adds more every morning.
        </p>
        <Link
          href="/admin/articles/new"
          className="gx-btn gx-btn-primary rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
        >
          + New article
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{a.titleEn}</td>
                <td className="px-4 py-3 text-slate-600">{articleCategoryLabel(a.category)}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(a.publishedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={`/articles/${a.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                  >
                    View
                  </a>
                  <Link
                    href={`/admin/articles/${a.id}`}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </Link>
                  <ArticleDeleteButton id={a.id} title={a.titleEn} />
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  No articles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
