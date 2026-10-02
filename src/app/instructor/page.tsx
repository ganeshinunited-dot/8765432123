import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function InstructorIndex() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/instructor/home");
  if (user.role !== "INSTRUCTOR") redirect("/unauthorized");
  const profile = await db.instructorProfile.findUnique({ where: { userId: user.id } });
  redirect(profile?.isPaid ? "/instructor/home" : "/instructor/billing");
}
