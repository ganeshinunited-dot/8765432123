import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_NAV } from "../home/page";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function utcDay(offset: number): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - offset));
}

function fmtDay(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(d);
}

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  const today = utcDay(0);
  const day7 = utcDay(6);
  const day30 = utcDay(29);

  const [todayViews, todayUniques, w7Views, w7Uniques, m30Views, m30Uniques, daily, topPages, topReferrers] =
    await Promise.all([
      db.siteVisit.count({ where: { day: today } }),
      db.siteVisit.groupBy({ by: ["visitorHash"], where: { day: today } }).then((r) => r.length),
      db.siteVisit.count({ where: { day: { gte: day7 } } }),
      db.siteVisit.groupBy({ by: ["visitorHash"], where: { day: { gte: day7 } } }).then((r) => r.length),
      db.siteVisit.count({ where: { day: { gte: day30 } } }),
      db.siteVisit.groupBy({ by: ["visitorHash"], where: { day: { gte: day30 } } }).then((r) => r.length),
      db.siteVisit.groupBy({
        by: ["day"],
        where: { day: { gte: day30 } },
        _count: { _all: true },
        orderBy: { day: "asc" },
      }),
      db.siteVisit.groupBy({
        by: ["path"],
        where: { day: { gte: day30 } },
        _count: { _all: true },
        orderBy: { _count: { path: "desc" } },
        take: 15,
      }),
      db.siteVisit.groupBy({
        by: ["referrer"],
        where: { day: { gte: day30 }, referrer: { not: null } },
        _count: { _all: true },
        orderBy: { _count: { referrer: "desc" } },
        take: 10,
      }),
    ]);

  const byDay = new Map(daily.map((d) => [d.day.toISOString(), d._count._all]));
  const days: { label: string; views: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = utcDay(i);
    days.push({ label: fmtDay(d), views: byDay.get(d.toISOString()) || 0 });
  }
  const maxViews = Math.max(1, ...days.map((d) => d.views));

  const stats = [
    { label: "Views today", value: todayViews, sub: `${todayUniques} unique` },
    { label: "Views · last 7 days", value: w7Views, sub: `${w7Uniques} unique` },
    { label: "Views · last 30 days", value: m30Views, sub: `${m30Uniques} unique` },
  ];

  return (
    <AdminShell title="Analytics" nav={ADMIN_NAV} active="/admin/analytics">
      <p className="mb-6 text-sm text-slate-600">
        First-party visitor stats — free forever, no third party, no cookies. Bots excluded;
        visitors counted once per page per day (privacy-friendly hash, no IPs stored).
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-3xl font-extrabold text-white">{s.value.toLocaleString("en-GB")}</p>
            <p className="mt-1 text-sm font-medium text-slate-300">{s.label}</p>
            <p className="text-xs text-slate-500">{s.sub} visitors</p>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Daily views · last 30 days
        </h2>
        <div className="flex h-40 items-end gap-1">
          {days.map((d, i) => (
            <div key={i} className="group relative flex-1" title={`${d.label}: ${d.views} views`}>
              <div
                className="w-full rounded-t bg-emerald-600 transition group-hover:bg-emerald-500"
                style={{ height: `${Math.max(3, (d.views / maxViews) * 100)}%` }}
              />
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-slate-950 px-2 py-1 text-[11px] text-white group-hover:block">
                {d.label} · {d.views}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Top pages · 30 days
          </h2>
          {topPages.length === 0 ? (
            <p className="text-sm text-slate-500">No visits recorded yet.</p>
          ) : (
            <ul className="space-y-2">
              {topPages.map((p) => (
                <li key={p.path} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-mono text-xs text-slate-300">{p.path}</span>
                  <span className="shrink-0 font-bold text-white">{p._count._all.toLocaleString("en-GB")}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Top referrers · 30 days
          </h2>
          {topReferrers.length === 0 ? (
            <p className="text-sm text-slate-500">No external referrers recorded yet.</p>
          ) : (
            <ul className="space-y-2">
              {topReferrers.map((r) => (
                <li key={r.referrer} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-slate-300">{r.referrer}</span>
                  <span className="shrink-0 font-bold text-white">{r._count._all.toLocaleString("en-GB")}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
