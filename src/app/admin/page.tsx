import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
export const revalidate = 300;

export default async function AdminIndex() {
  await requireAdmin();
  redirect("/admin/home");
}
