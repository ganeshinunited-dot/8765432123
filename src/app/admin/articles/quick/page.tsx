import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_NAV } from "../../home/page";
import { QuickPostForm } from "@/components/admin/QuickPostForm";

export const dynamic = "force-dynamic";

export default async function QuickPostPage() {
  await requireAdmin();
  return (
    <AdminShell title="Quick Post" nav={ADMIN_NAV} active="/admin/articles">
      <QuickPostForm />
    </AdminShell>
  );
}
