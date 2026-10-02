import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

export default async function AdminIndex() {
  await requireAdmin();
  redirect("/admin/home");
}
