import Link from "next/link";
import { requirePaidInstructor } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/Shell";
import { INSTRUCTOR_NAV } from "@/components/instructor/nav";
import { Card, Badge } from "@/components/ui/primitives";
import { curateReviewSummary } from "@/lib/course-reviews";

export const dynamic = "force-dynamic";

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`h-4 w-4 ${i <= Math.round(n) ? "text-amber-400" : "text-slate-200"}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

const TIER_STYLE: Record<string, string> = {
  BRONZE: "bg-amber-100 text-amber-800",
  SILVER: "bg-slate-200 text-slate-700",
  GOLD: "bg-yellow-100 text-yellow-800",
};

export default async function InstructorHome() {
  const { user, profile } = await requirePaidInstructor();

  const courses = await db.course.findMany({
    where: { instructorId: profile.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, slug: true, status: true, views: true, sales: true, price: true },
  });

  const reviewAgg = await db.courseReview.aggregate({
    where: { course: { instructorId: profile.id } },
    _count: true,
    _avg: { rating: true },
  });
  const positive = await db.courseReview.count({
    where: { course: { instructorId: profile.id }, sentiment: "POSITIVE" },
  });
  const negative = await db.courseReview.count({
    where: { course: { instructorId: profile.id }, sentiment: "NEGATIVE" },
  });
  const samples = (
    await db.courseReview.findMany({
      where: { course: { instructorId: profile.id }, text: { not: null } },
      take: 8,
      orderBy: { createdAt: "desc" },
      select: { text: true },
    })
  ).map((r) => r.text || "");

  const total = reviewAgg._count;
  const avg = reviewAgg._avg.rating || 0;
  const summary = await curateReviewSummary({ avgRating: avg, total, positive, negative, samples });

  const recent = await db.courseReview.findMany({
    where: { course: { instructorId: profile.id } },
    take: 10,
    orderBy: { createdAt: "desc" },
    select: { rating: true, text: true, createdAt: true, course: { select: { title: true } } },
  });

  return (
    <DashboardShell title={`Welcome, ${user.name.split(" ")[0]}`} nav={INSTRUCTOR_NAV} active="/instructor/home">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
            Total views
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{profile.totalViews.toLocaleString()}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Total sales</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{profile.totalSales.toLocaleString()}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Seller tier</p>
          <p className="mt-1">
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${TIER_STYLE[profile.tier]}`}>{profile.tier}</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">{profile.tier === "BRONZE" ? `${Math.max(0, 10 - total)} more reviews to Silver` : profile.tier === "SILVER" ? `${Math.max(0, 50 - total)} more reviews to Gold` : "Top tier — nice!"}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Average rating</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">{total ? avg.toFixed(1) : "—"}</span>
            {total > 0 && <Stars n={avg} />}
          </div>
          <p className="mt-1 text-xs text-slate-500">{total} reviews · {positive} positive</p>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <h2 className="font-bold text-slate-900">What learners think <span className="ml-1 rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-700">AI CURATED</span></h2>
        <p className="mt-2 text-sm text-slate-600">{summary}</p>
        {profile.isVerified && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
            Verified seller
          </p>
        )}
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">My courses</h2>
            <Link href="/instructor/courses/new" className="text-sm font-semibold text-emerald-700 hover:underline">+ New course</Link>
          </div>
          {courses.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No courses yet. Create your first one to start selling.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {courses.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2 py-2.5">
                  <div className="min-w-0">
                    <Link href={`/instructor/courses/${c.id}`} className="truncate text-sm font-semibold text-slate-900 hover:text-emerald-700">{c.title}</Link>
                    <p className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>{c.views}</span>
                      <span>{c.sales} sales</span>
                      <Badge tone={c.status === "PUBLISHED" ? "green" : "slate"}>{c.status}</Badge>
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-slate-900">{c.price === 0 ? "Free" : `Rs. ${c.price.toLocaleString()}`}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-bold text-slate-900">Recent reviews</h2>
          <p className="text-xs text-slate-400">Reviewer identities are private — only stars are shown.</p>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No reviews yet.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {recent.map((r, i) => (
                <li key={i} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <Stars n={r.rating} />
                    <span className="text-xs text-slate-400">{r.course.title}</span>
                  </div>
                  {r.text && <p className="mt-1.5 text-sm text-slate-600">{r.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}
