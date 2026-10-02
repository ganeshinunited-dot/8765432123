import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { StaticPage } from "@/components/layout/StaticPage";
import { Card, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Courses", description: "Learn skills from verified instructors on Growentix." };
export const dynamic = "force-dynamic";

export default async function CoursesIndex() {
  const courses = await db.course
    .findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { sales: "desc" }],
      take: 60,
      select: {
        title: true, slug: true, price: true, category: true, sales: true, views: true, featured: true,
        instructor: { select: { tier: true, isVerified: true, user: { select: { name: true } } } },
      },
    })
    .catch(() => []);

  return (
    <StaticPage title="Courses" subtitle="Learn practical skills from instructors on Growentix.">
      {courses.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-semibold text-slate-900">No courses yet</p>
          <p className="mt-1 text-sm text-slate-500">Instructors are preparing their first courses. Check back soon.</p>
          <Link href="/course" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">Teach on Growentix →</Link>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="block">
              <Card className="flex h-full flex-col p-5 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-2">
                  {c.featured && <Badge tone="green">Featured</Badge>}
                  {c.category && <Badge tone="blue">{c.category}</Badge>}
                  {c.instructor.isVerified && <Badge tone="slate">✓ Verified seller</Badge>}
                </div>
                <h2 className="mt-2 font-bold text-slate-900">{c.title}</h2>
                <p className="mt-1 text-sm text-slate-500">by {c.instructor.user.name} · {c.instructor.tier} seller</p>
                <p className="mt-3 flex items-center gap-3 text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{c.price === 0 ? "Free" : `NPR ${c.price.toLocaleString()}`}</span>
                  <span className="inline-flex items-center gap-1"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>{c.views}</span>
                  <span>{c.sales} students</span>
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </StaticPage>
  );
}
