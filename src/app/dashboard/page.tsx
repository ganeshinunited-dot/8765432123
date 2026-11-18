import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

/**
 * /dashboard is only a router. The home pages it used to point at
 * (/dashboard/home, /employer/home, /admin/home) are all notFound stubs,
 * so landing here used to 404 for every signed-in user. Route by role
 * instead, mirroring the login API's redirect logic
 * (src/app/api/auth/login/route.ts):
 * admin -> /admin/verifications, employer -> /for-employers, anyone else -> /.
 * Unauthenticated visitors go to /login, same as requireUser().
 */
export default async function Page() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/dashboard");
  if (user.isAdmin) redirect("/admin/verifications");
  if (user.role === "EMPLOYER") redirect("/for-employers");
  redirect("/");
}
