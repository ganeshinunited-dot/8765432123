import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (!user.isAdmin) redirect("/unauthorized");
  return user;
}

export async function logAdminAction(
  adminId: string,
  action: string,
  targetType?: string,
  targetId?: string,
  reason?: string
) {
  const { db } = await import("@/lib/db");
  await db.adminAction.create({ data: { adminId, action, targetType, targetId, reason } });
}
