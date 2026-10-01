import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { STUDENT_NAV } from "@/components/dashboard/student-nav";
import { ProfileForm } from "@/components/student/ProfileForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireUser(["STUDENT"]);
  const [profile, locations] = await Promise.all([
    db.studentProfile.findUnique({
      where: { userId: user.id },
      include: { skills: { include: { skill: true } } },
    }),
    db.location.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!profile) return <p className="p-8">Profile not found.</p>;

  return (
    <DashboardShell title="My profile" nav={STUDENT_NAV} active="/profile">
      <ProfileForm initial={JSON.parse(JSON.stringify(profile))} locations={locations} />
    </DashboardShell>
  );
}
