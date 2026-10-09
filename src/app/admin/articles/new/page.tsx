import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_NAV } from "../../home/page";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <AdminShell title="New article" nav={ADMIN_NAV} active="/admin/articles">
      <ArticleForm />
    </AdminShell>
  );
}
