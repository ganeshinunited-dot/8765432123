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
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Sarkari Jobs</h1>
      <p className="mt-1 text-sm text-slate-600 sm:text-base">
        Nepal ka current sarkari vacancy suchana — {SARKARI_JOBS.length} ota. Talent le pani hern milne, apply official notice bata.
      </p>
      <div className="mt-6">
        <SarkariBrowser />
      </div>
    </main>
  );
}
