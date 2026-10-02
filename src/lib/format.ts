export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function uniqueSlug(base: string): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${slugify(base) || "item"}-${rand}`;
}

export function timeAgo(date: Date | string): string {
  const d = new Date(date).getTime();
  const diff = Date.now() - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function formatSalary(min?: number | null, max?: number | null, type?: string | null, currency = "Rs."): string {
  if (!min && !max) return "Salary not disclosed";
  const range = min && max ? `${min.toLocaleString()}–${max.toLocaleString()}` : `${(min ?? max)!.toLocaleString()}+`;
  const suffix =
    type === "HOURLY" ? "/hour" : type === "DAILY" ? "/day" : type === "WEEKLY" ? "/week" : type === "MONTHLY" ? "/month" : "";
  return `${currency} ${range}${suffix}`;
}

export const JOB_TYPE_LABELS: Record<string, string> = {
  PART_TIME: "Part-time",
  FULL_TIME: "Full-time",
  INTERNSHIP: "Internship",
  TEMPORARY: "Temporary",
  CONTRACT: "Contract",
};

export const SCHEDULE_LABELS: Record<string, string> = {
  MORNING: "Morning",
  AFTERNOON: "Afternoon",
  EVENING: "Evening",
  WEEKEND: "Weekend",
};

export const ARRANGEMENT_LABELS: Record<string, string> = {
  ON_SITE: "On-site",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

export const APP_STATUS_LABELS: Record<string, string> = {
  APPLIED: "Applied",
  VIEWED: "Viewed",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview",
  SELECTED: "Selected",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

export const APP_STATUS_COLORS: Record<string, string> = {
  APPLIED: "bg-sky-100 text-sky-800",
  VIEWED: "bg-slate-100 text-slate-700",
  SHORTLISTED: "bg-amber-100 text-amber-800",
  INTERVIEW: "bg-violet-100 text-violet-800",
  SELECTED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-rose-100 text-rose-700",
  WITHDRAWN: "bg-neutral-100 text-neutral-600",
};
