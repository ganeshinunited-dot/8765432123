import Link from "next/link";
import { Input, Select } from "@/components/ui/fields";
import { JOB_TYPE_LABELS, SCHEDULE_LABELS, ARRANGEMENT_LABELS } from "@/lib/format";

interface Props {
  categories: { id: string; name: string; slug: string }[];
  initial: { [key: string]: string | undefined };
}

export function JobFilters({ categories, initial }: Props) {
  return (
    <form action="/jobs" method="get" className="space-y-5">
      <Input name="q" label="Keywords" placeholder="Job title, company, skill…" defaultValue={initial.q || ""} />
      <Input name="location" label="Location" placeholder="e.g. Kathmandu" defaultValue={initial.location || ""} />
      <Select
        name="type" label="Job type" defaultValue={initial.type || ""}
        options={[{ value: "", label: "All types" }, ...Object.entries(JOB_TYPE_LABELS).map(([value, label]) => ({ value, label }))]}
      />
      <Select
        name="arrangement" label="Work arrangement" defaultValue={initial.arrangement || ""}
        options={[{ value: "", label: "Any" }, ...Object.entries(ARRANGEMENT_LABELS).map(([value, label]) => ({ value, label }))]}
      />
      <Select
        name="schedule" label="Schedule" defaultValue={initial.schedule || ""}
        options={[{ value: "", label: "Any schedule" }, ...Object.entries(SCHEDULE_LABELS).map(([value, label]) => ({ value, label }))]}
      />
      <Select
        name="category" label="Category" defaultValue={initial.category || ""}
        options={[{ value: "", label: "All categories" }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]}
      />
      <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
        <input type="checkbox" name="verified" value="1" defaultChecked={initial.verified === "1"} className="h-5 w-5 rounded accent-emerald-700" />
        Verified employers only
      </label>
      <div className="flex gap-2">
        <button type="submit" className="h-11 flex-1 rounded-lg bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800">
          Apply filters
        </button>
        <Link href="/jobs" className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Clear
        </Link>
      </div>
    </form>
  );
}
