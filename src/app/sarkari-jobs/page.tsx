import type { Metadata } from "next";
import SarkariBrowser from "@/components/sarkari/SarkariBrowser";
import { SARKARI_JOBS } from "@/data/sarkariJobs";

export const metadata: Metadata = {
  title: "Sarkari Jobs in Nepal | Government Vacancy Notices | Growentix",
  description:
    "Current government vacancy notices in Nepal — PSC, security forces, public banks, hospitals, local levels. Informational listings with official notice links.",
};

export default function SarkariJobsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="gx-eyebrow">Government notices</p>
      <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Sarkari Jobs</h1>
      <p className="gx-sub">
        Nepal ka current sarkari vacancy suchana — {SARKARI_JOBS.length} ota. Talent le pani hern milne, apply official notice bata.
      </p>
      <div className="mt-8">
        <SarkariBrowser />
      </div>
    </main>
  );
}
