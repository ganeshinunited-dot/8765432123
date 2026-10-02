import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import JobWizard from "@/components/employer/JobWizard";
import { EMPLOYER_NAV } from "../../home/page";

export const dynamic = "force-dynamic";

export default async function NewJobPage() {
  await requireUser(["EMPLOYER"]);
  const [categories, locations] = await Promise.all([
    db.jobCategory.findMany({ where: { active: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    db.location.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  return (
    <DashboardShell title="Post a job" nav={EMPLOYER_NAV} active="/employer/jobs">
      <JobWizard taxonomy={{ categories, locations }} />
    </DashboardShell>
  );
}
