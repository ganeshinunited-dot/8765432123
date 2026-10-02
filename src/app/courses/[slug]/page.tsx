import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { trackEvent } from "@/lib/klaviyo";
import { StaticPage } from "@/components/layout/StaticPage";
import { Card, Badge } from "@/components/ui/primitives";
import { CourseActions } from "@/components/courses/CourseActions";
import { CoursePlayer } from "@/components/courses/CoursePlayer";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const courses = await db.course.findMany({ where: { status: "PUBLISHED" }, select: { slug: true }, take: 100 }).catch(() => []);
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await db.course.findUnique({ where: { slug }, select: { title: true, description: true } }).catch(() => null);
  return { title: c?.title || "Course", description: c?.description.slice(0, 150) || "Course on Growentix" };
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`h-4 w-4 ${i <= Math.round(n) ? "text-amber-400" : "text-slate-200"}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Watching a course requires an account — visitors are sent to login first.
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/courses/${slug}`)}`);

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      instructor: { select: { tier: true, isVerified: true, user: { select: { name: true } } } },
      videos: { orderBy: { position: "asc" }, select: { id: true, title: true, durationSec: true, youtubeId: true } },
      reviews: { orderBy: { createdAt: "desc" }, take: 20, select: { rating: true, text: true, createdAt: true } },
    },
  }).catch(() => null);
  if (!course || course.status !== "PUBLISHED") notFound();

  // Klaviyo "Viewed Product" (standard e-commerce name so product flows trigger).
  // Page is login-gated, so the viewer always has an email here.
  void trackEvent({
    email: user.email,
    metric: "Viewed Product",
    properties: { ProductName: course.title, slug, price: course.price, category: course.category },
  });

  // Count the view (fire and forget)
  db.course.update({ where: { id: course.id }, data: { views: { increment: 1 } } }).catch(() => {});
  db.instructorProfile.update({ where: { id: course.instructorId }, data: { totalViews: { increment: 1 } } }).catch(() => {});

  const avg = course.reviews.length ? course.reviews.reduce((a, r) => a + r.rating, 0) / course.reviews.length : 0;
  const purchased = user.role === "STUDENT"
    ? await db.coursePurchase.findFirst({ where: { courseId: course.id, studentId: user.id, status: "COMPLETED" } }).catch(() => null)
    : null;
  const alreadyReviewed = user.role === "STUDENT"
    ? await db.courseReview.findFirst({ where: { courseId: course.id, studentId: user.id }, select: { id: true } }).catch(() => null)
    : null;

  return (
    <StaticPage title={course.title} subtitle={`by ${course.instructor.user.name}`}>
      <div className="flex flex-wrap items-center gap-2">
        {course.featured && <Badge tone="green">Featured</Badge>}
        {course.category && <Badge tone="blue">{course.category}</Badge>}
        <Badge tone="slate">{course.instructor.tier} seller</Badge>
        {course.instructor.isVerified && <Badge tone="green">✓ Verified seller</Badge>}
        <span className="inline-flex items-center gap-1 text-sm text-slate-500">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
          {course.views} views
        </span>
        {course.reviews.length > 0 && <span className="inline-flex items-center gap-1 text-sm"><Stars n={avg} /><span className="text-slate-500">({course.reviews.length})</span></span>}
      </div>

      <Card className="mt-4 p-6">
        <p className="whitespace-pre-wrap text-slate-700">{course.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="text-2xl font-bold text-slate-900">{course.price === 0 ? "Free" : `NPR ${course.price.toLocaleString()}`}</p>
          <CourseActions
            courseId={course.id}
            price={course.price}
            isStudent={user.role === "STUDENT"}
            purchased={!!purchased}
            canReview={!!purchased && !alreadyReviewed}
            signedIn={!!user}
          />
        </div>
      </Card>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Lessons ({course.videos.length})</h2>
      <div className="mt-3">
        <CoursePlayer videos={course.videos} />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Student reviews</h2>
      {course.reviews.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">No reviews yet.</p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {course.reviews.map((r, i) => (
            <Card key={i} className="p-4">
              <Stars n={r.rating} />
              {r.text && <p className="mt-1.5 text-sm text-slate-600">{r.text}</p>}
            </Card>
          ))}
        </div>
      )}

      <p className="mt-8 text-center">
        <Link href="/courses" className="text-sm font-semibold text-emerald-700 hover:underline">← All courses</Link>
      </p>
    </StaticPage>
  );
}
