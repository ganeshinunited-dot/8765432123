import { requirePaidInstructor } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { INSTRUCTOR_NAV } from "@/components/instructor/nav";
import { CourseForm } from "@/components/instructor/CourseForm";

export const dynamic = "force-dynamic";

export default async function NewCoursePage() {
  await requirePaidInstructor();
  return (
    <DashboardShell title="New course" nav={INSTRUCTOR_NAV} active="/instructor/courses">
      <div className="mx-auto max-w-2xl">
        <CourseForm
          isNew
          initial={{ title: "", description: "", price: 0, category: "", thumbnailUrl: "", status: "DRAFT" }}
        />
        <p className="mt-3 text-xs text-slate-500">Upload as many videos as you want — no limits on your plan.</p>
      </div>
    </DashboardShell>
  );
}
