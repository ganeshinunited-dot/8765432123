import { notFound } from "next/navigation";
import { requirePaidInstructor } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/Shell";
import { INSTRUCTOR_NAV } from "@/components/instructor/nav";
import { CourseForm } from "@/components/instructor/CourseForm";
import { VideoManager } from "@/components/instructor/VideoManager";

export const dynamic = "force-dynamic";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { profile } = await requirePaidInstructor();
  const course = await db.course.findFirst({
    where: { id, instructorId: profile.id },
    include: { videos: { orderBy: { position: "asc" } } },
  });
  if (!course) notFound();

  return (
    <DashboardShell title="Edit course" nav={INSTRUCTOR_NAV} active="/instructor/courses">
      <div className="mx-auto max-w-2xl space-y-6">
        <CourseForm
          isNew={false}
          initial={{
            id: course.id,
            title: course.title,
            description: course.description,
            price: course.price,
            category: course.category || "",
            thumbnailUrl: course.thumbnailUrl || "",
            status: course.status,
          }}
        />
        <div>
          <h2 className="mb-3 text-lg font-bold text-slate-900">Videos</h2>
          <VideoManager
            courseId={course.id}
            videos={course.videos.map((v) => ({ id: v.id, title: v.title, durationSec: v.durationSec, views: v.views }))}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
