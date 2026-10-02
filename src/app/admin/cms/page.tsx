import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";

export const dynamic = "force-dynamic";

export default async function AdminCms({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  await requireAdmin();
  const { slug } = await searchParams;
  const pages = await db.cmsPage.findMany({ orderBy: { slug: "asc" }, select: { slug: true, title: true, updatedAt: true } });
  const current = slug ? await db.cmsPage.findUnique({ where: { slug } }) : null;

  return (
    <AdminShell title="Content pages" nav={ADMIN_NAV} active="/admin/cms">
      <div className="grid gap-4 md:grid-cols-[260px_1fr]">
        <Card className="divide-y divide-slate-100 self-start">
          {pages.map((p) => (
            <a key={p.slug} href={`/admin/cms?slug=${p.slug}`}
              className={`block px-4 py-3 hover:bg-slate-50 ${slug === p.slug ? "bg-emerald-50" : ""}`}>
              <p className="text-sm font-semibold text-slate-900">{p.title}</p>
              <p className="font-mono text-xs text-slate-400">/p/{p.slug}</p>
            </a>
          ))}

        </Card>
        <Card className="p-5">
          {current ? (
            <>
              <h2 className="text-lg font-bold text-slate-900">{current.title}</h2>
              <p className="mb-3 font-mono text-xs text-slate-400">/p/{current.slug} · updated {current.updatedAt.toLocaleDateString("en-GB")}</p>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-slate-700">{current.content}</div>
            </>
          ) : (
            <p className="text-sm text-slate-500">Select a page to preview it. Content editing is disabled — admins have read-only access.</p>
          )}
        </Card>
      </div>
    </AdminShell>
  );
}
