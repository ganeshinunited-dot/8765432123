import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getViewMode } from "@/lib/view-mode";
export const dynamic = "force-dynamic";

export default async function EmployerIndex() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/employer");
  if (user.role === "STUDENT") redirect("/dashboard/home");
  if (user.role !== "EMPLOYER") {
    const view = await getViewMode(user.isAdmin);
    redirect(view === "admin" ? "/admin/home" : "/employer/home");
  }
  redirect("/employer/home");
}
