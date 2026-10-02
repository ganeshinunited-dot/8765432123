import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getViewMode } from "@/lib/view-mode";
export const dynamic = "force-dynamic";

export default async function DashboardIndex() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/dashboard");
  if (user.isAdmin) {
    const view = await getViewMode(true);
    redirect(view === "employer" ? "/employer/home" : "/admin/home");
  }
  if (user.role === "EMPLOYER") redirect("/employer/home");
  if (user.role === "INSTRUCTOR") redirect("/instructor/home");
  redirect("/dashboard/home");
}
