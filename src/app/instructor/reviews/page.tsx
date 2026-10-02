import { requirePaidInstructor } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/Shell";
import { INSTRUCTOR_NAV } from "@/components/instructor/nav";
import { Card, EmptyState } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`h-4 w-4 ${i <= n ? "text-amber-400" : "text-slate-200"}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

const SENTIMENT_LABEL: Record<string, string> = {
  POSITIVE: "Positive",
  NEUTRAL: "Neutral",
  NEGATIVE: "Needs attention",
};

export default async function InstructorReviews() {
  const { profile } = await requirePaidInstructor();
  const reviews = await db.courseReview.findMany({
    where: { course: { instructorId: profile.id } },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: { rating: true, text: true, sentiment: true, createdAt: true, course: { select: { title: true } } },
  });

  return (
    <DashboardShell title="Reviews" nav={INSTRUCTOR_NAV} active="/instructor/reviews">
      <p className="mb-4 text-sm text-slate-500">
        Our AI reads every review and curates a fair summary for your course pages. Reviewer identities are always private.
      </p>
      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet." description="Reviews appear here once students complete your courses." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <Stars n={r.rating} />
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${r.sentiment === "POSITIVE" ? "bg-emerald-100 text-emerald-700" : r.sentiment === "NEGATIVE" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"}`}>
                  {SENTIMENT_LABEL[r.sentiment]}
                </span>
              </div>
              {r.text && <p className="mt-2 text-sm text-slate-600">{r.text}</p>}
              <p className="mt-2 text-xs text-slate-400">{r.course.title} · {r.createdAt.toLocaleDateString("en-GB")}</p>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
