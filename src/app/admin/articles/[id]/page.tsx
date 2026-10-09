import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_NAV } from "../../home/page";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const a = await db.article.findUnique({ where: { id } });
  if (!a) notFound();
  return (
    <AdminShell title="Edit article" nav={ADMIN_NAV} active="/admin/articles">
      <ArticleForm
        initial={{
          id: a.id,
          category: a.category,
          country: a.country ?? "",
          titleEn: a.titleEn,
          titleNe: a.titleNe,
          excerptEn: a.excerptEn,
          excerptNe: a.excerptNe,
          bodyEn: a.bodyEn,
          bodyNe: a.bodyNe,
          sources: a.sources.join("\n"),
        }}
      />
    </AdminShell>
  );
}
