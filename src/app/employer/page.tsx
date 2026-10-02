import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
export const revalidate = 300;

export default async function EmployerIndex() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/employer");
  if (user.role === "STUDENT") redirect("/dashboard/home");
  if (user.role === "ADMIN") redirect("/admin");
  redirect("/employer/home");
}
