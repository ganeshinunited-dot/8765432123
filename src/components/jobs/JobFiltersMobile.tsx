"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/overlays";
import { JobFilters } from "./JobFilters";

export function JobFiltersMobile({
  categories,
  initial,
}: {
  categories: { id: string; name: string; slug: string }[];
  initial: { [key: string]: string | undefined };
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700"
        aria-haspopup="dialog"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M7 12h10m-7 6h4" /></svg>
        Filters
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filter jobs">
        <JobFilters categories={categories} initial={initial} />
      </Drawer>
    </>
  );
}
