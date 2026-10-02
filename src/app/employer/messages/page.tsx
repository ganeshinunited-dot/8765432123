import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Suspense } from "react";
import MessagesClient from "@/components/messaging/MessagesClient";
import { EMPLOYER_NAV } from "../home/page";

export const dynamic = "force-dynamic";

export default async function EmployerMessages() {
  await requireUser(["EMPLOYER"]);
  return (
    <DashboardShell title="Messages" nav={EMPLOYER_NAV} active="/employer/messages">
      <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading messages…</div>}><MessagesClient /></Suspense>
    </DashboardShell>
  );
}
