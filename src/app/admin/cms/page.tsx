import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";
import CmsEditor from "./CmsEditor";

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
          <a href="/admin/cms?slug=new" className={`block px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-slate-50 ${slug === "new" ? "bg-emerald-50" : ""}`}>
            + New page
          </a>
        </Card>
        <CmsEditor page={current ? { slug: current.slug, title: current.title, content: current.content } : null} isNew={slug === "new"} />
      </div>
    </AdminShell>
  );
}
