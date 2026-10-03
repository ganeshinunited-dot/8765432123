import Link from "next/link";
import { requirePaidInstructor } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/Shell";
import { INSTRUCTOR_NAV } from "@/components/instructor/nav";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

export default async function InstructorCourses() {
  const { profile } = await requirePaidInstructor();
  const courses = await db.course.findMany({
    where: { instructorId: profile.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { videos: true, reviews: true } } },
  });

  return (
    <DashboardShell title="My courses" nav={INSTRUCTOR_NAV} active="/instructor/courses">
      <Link href="/instructor/courses/new" className="mb-4 inline-flex h-11 items-center rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white">
        + New course
      </Link>
      {courses.length === 0 ? (
        <EmptyState title="No courses yet." description="Create your first course to start selling." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <Link key={c.id} href={`/instructor/courses/${c.id}`} className="block">
              <Card className="p-5 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="truncate font-bold text-slate-900">{c.title}</h2>
                  <Badge tone={c.status === "PUBLISHED" ? "green" : "slate"}>{c.status}</Badge>
                </div>
                <p className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    {c.views} views
                  </span>
                  <span>{c.sales} sales</span>
                  <span>{c._count.videos} videos</span>
                  <span>{c._count.reviews} reviews</span>
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">{c.price === 0 ? "Free" : `NPR ${c.price.toLocaleString()}`}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
