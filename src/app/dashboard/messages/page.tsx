import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Suspense } from "react";
import MessagesClient from "@/components/messaging/MessagesClient";
import { STUDENT_NAV } from "@/components/dashboard/student-nav";

export const dynamic = "force-dynamic";

export default async function StudentMessages() {
  await requireUser(["STUDENT"]);
  return (
    <DashboardShell title="Messages" nav={STUDENT_NAV} active="/dashboard/messages">
      <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading messages…</div>}><MessagesClient /></Suspense>
    </DashboardShell>
  );
}
