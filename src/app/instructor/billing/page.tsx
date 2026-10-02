import { redirect } from "next/navigation";
import { requireInstructor } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/Shell";
import { INSTRUCTOR_NAV } from "@/components/instructor/nav";
import { InstructorBilling } from "@/components/instructor/InstructorBilling";

export const dynamic = "force-dynamic";

export default async function InstructorBillingPage() {
  const user = await requireInstructor();
  if (user.role !== "INSTRUCTOR") redirect("/unauthorized");
  let profile = await db.instructorProfile.findUnique({ where: { userId: user.id } });
  if (!profile) {
    const { randomVerifyThreshold } = await import("@/lib/course-reviews");
    profile = await db.instructorProfile.create({ data: { userId: user.id, autoVerifyAt: randomVerifyThreshold() } });
  }
  if (profile.isPaid) redirect("/instructor/home");
  const full = await db.user.findUnique({ where: { id: user.id }, select: { phone: true } });

  return (
    <DashboardShell title="Billing" nav={INSTRUCTOR_NAV} active="/instructor/billing">
      <InstructorBilling name={user.name} email={user.email} phone={full?.phone || ""} />
    </DashboardShell>
  );
}
