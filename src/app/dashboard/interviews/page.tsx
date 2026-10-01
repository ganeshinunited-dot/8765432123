import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { STUDENT_NAV } from "@/components/dashboard/student-nav";
import InterviewActions from "./InterviewActions";

export const dynamic = "force-dynamic";

const TONE: Record<string, "green" | "amber" | "blue" | "slate" | "rose"> = {
  PROPOSED: "amber", ACCEPTED: "green", DECLINED: "slate", RESCHEDULE_REQUESTED: "blue", COMPLETED: "green", CANCELLED: "rose",
};

function fmt(dt: Date) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(dt);
}

export default async function InterviewsPage() {
  const user = await requireUser(["STUDENT"]);
  const profile = await db.studentProfile.findUnique({ where: { userId: user.id } });
  const interviews = profile
    ? await db.interview.findMany({
        where: { application: { studentId: profile.id } },
        orderBy: { dateTime: "asc" },
        include: { application: { include: { job: { include: { company: { select: { name: true } } } } } } },
      })
    : [];

  return (
    <DashboardShell title="Interviews" nav={STUDENT_NAV} active="/dashboard/interviews">
      {interviews.length === 0 ? (
        <EmptyState title="No interviews yet." description="When an employer invites you, it will appear here." />
      ) : (
        <div className="space-y-3">
          {interviews.map((iv) => (
            <Card key={iv.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{iv.application.job.title}</p>
                  <p className="text-sm text-slate-500">{iv.application.job.company.name}</p>
                  <p className="mt-2 text-sm text-slate-700">📅 {fmt(iv.dateTime)}</p>
                  {iv.location && <p className="text-sm text-slate-600">📍 {iv.location}</p>}
                  {iv.meetingLink && <p className="text-sm"><a href={iv.meetingLink} target="_blank" rel="noopener" className="font-medium text-emerald-700 hover:underline">Join online meeting</a></p>}
                  {iv.notes && <p className="mt-1 text-sm text-slate-600">Note: {iv.notes}</p>}
                </div>
                <Badge tone={TONE[iv.status] || "slate"}>{iv.status.replace(/_/g, " ")}</Badge>
              </div>
              {iv.status === "PROPOSED" && (
                <div className="mt-4">
                  <InterviewActions id={iv.id} />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
