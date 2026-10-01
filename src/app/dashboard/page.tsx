import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export default async function DashboardIndex() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/dashboard");
  if (user.role === "EMPLOYER") redirect("/employer");
  if (user.role === "ADMIN") redirect("/admin");
  redirect("/dashboard/home");
}
