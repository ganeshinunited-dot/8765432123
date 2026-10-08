import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { StaticPage } from "@/components/layout/StaticPage";
import { Card } from "@/components/ui/primitives";
import { CourseCarousel } from "@/components/courses/CourseCarousel";
import { CourseCard, type CarouselCourse } from "@/components/courses/CourseCard";

export const metadata: Metadata = { title: "Courses", description: "Free and paid courses for Nepali students on Growentix." };
export const dynamic = "force-dynamic";

export default async function CoursesIndex() {
  const courses = await db.course
    .findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ price: "asc" }, { sales: "desc" }],
      take: 60,
      select: {
        title: true, slug: true, price: true, category: true, sales: true, views: true, thumbnailUrl: true,
        instructor: { select: { isVerified: true, user: { select: { name: true } } } },
      },
    })
    .catch(() => []);

  const items: CarouselCourse[] = courses.map((c) => ({
    slug: c.slug,
    title: c.title,
    price: c.price,
    category: c.category,
    views: c.views,
    sales: c.sales,
    thumbnailUrl: c.thumbnailUrl,
    instructorName: c.instructor.user.name,
    isVerified: c.instructor.isVerified,
  }));
  const free = items.filter((c) => c.price === 0);
  const paid = items.filter((c) => c.price > 0);

  return (
    <StaticPage title="Courses" subtitle="Free YouTube courses and paid instructor courses — start learning today.">
      {items.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-semibold text-slate-900">No courses yet</p>
          <p className="mt-1 text-sm text-slate-500">Instructors are preparing their first courses. Check back soon.</p>
          <Link href="/course" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">Teach on Growentix →</Link>
        </Card>
      ) : (
        <div className="space-y-10">
          {free.length > 0 && (
            <section>
              <div className="mb-4">
                <p className="gx-eyebrow">Free</p>
                <h2 className="gx-h2">Free courses</h2>
                <p className="gx-sub">Watch instantly — no payment needed.</p>
              </div>
              <CourseCarousel label="Free courses">
                {free.map((c) => (
                  <CourseCard key={c.slug} c={c} />
                ))}
              </CourseCarousel>
            </section>
          )}

          {paid.length > 0 && (
            <section>
              <div className="mb-4">
                <p className="gx-eyebrow">Paid</p>
                <h2 className="gx-h2">Paid courses</h2>
                <p className="gx-sub">From verified instructors on Growentix.</p>
              </div>
              <CourseCarousel label="Paid courses">
                {paid.map((c) => (
                  <CourseCard key={c.slug} c={c} />
                ))}
              </CourseCarousel>
            </section>
          )}
        </div>
      )}
    </StaticPage>
  );
}
