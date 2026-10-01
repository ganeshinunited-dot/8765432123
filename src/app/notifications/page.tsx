import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import NotificationsClient from "@/components/notifications/NotificationsClient";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/notifications");
  const homeHref = user.role === "EMPLOYER" ? "/employer/home" : user.role === "ADMIN" ? "/admin" : "/dashboard/home";
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <h1 className="mb-5 text-xl font-bold text-slate-900 sm:text-2xl">Notifications</h1>
      <NotificationsClient homeHref={homeHref} />
    </div>
  );
}
