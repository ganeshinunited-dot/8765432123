import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import JobWizard from "@/components/employer/JobWizard";
import { EMPLOYER_NAV } from "../../../home/page";

export const dynamic = "force-dynamic";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(["EMPLOYER"]);
  const job = await db.job.findFirst({
    where: { id, company: { ownerId: user.id } },
    include: { skills: { include: { skill: true } } },
  });
  if (!job || !["DRAFT", "REJECTED", "PAUSED"].includes(job.status)) notFound();

  const [categories, locations] = await Promise.all([
    db.jobCategory.findMany({ where: { active: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    db.location.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <DashboardShell title="Edit job" nav={EMPLOYER_NAV} active="/employer/jobs">
      <JobWizard
        taxonomy={{ categories, locations }}
        initial={{
          id: job.id,
          title: job.title, categoryId: job.categoryId || "", jobType: job.jobType,
          workArrangement: job.workArrangement, locationId: job.locationId || "",
          description: job.description, responsibilities: job.responsibilities || "",
          requirements: job.requirements || "", benefits: job.benefits || "",
          schedules: job.schedules, salaryType: job.salaryType,
          salaryMin: job.salaryMin ?? "", salaryMax: job.salaryMax ?? "",
          openings: job.openings,
          deadline: job.deadline ? job.deadline.toISOString().slice(0, 10) : "",
          skills: job.skills.map((s) => s.skill.name).join(", "),
        }}
      />
    </DashboardShell>
  );
}
