import Link from "next/link";
import { db } from "@/lib/db";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Companies Hiring Students in Nepal | Growentix",
  description: "Browse verified companies hiring students across Nepal.",
};

export default async function CompaniesPage() {
  const companies = await db.company.findMany({
    orderBy: [{ verificationStatus: "asc" }, { name: "asc" }],
    take: 48,
    include: {
      location: { select: { name: true } },
      _count: { select: { jobs: { where: { status: "ACTIVE" } } } },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Companies hiring students</h1>
      <p className="mt-2 text-slate-600">Verified employers across Nepal looking for student talent.</p>

      {companies.length === 0 ? (
        <div className="mt-8"><EmptyState title="No companies listed yet." /></div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <Link key={c.id} href={`/companies/${c.slug}`} className="block">
              <Card className="h-full p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-slate-900">{c.name}</h2>
                  {c.verificationStatus === "VERIFIED" && <Badge tone="green">Verified</Badge>}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {[c.industry, c.location?.name].filter(Boolean).join(" · ") || "Nepal"}
                </p>
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  {c._count.jobs} open job{c._count.jobs === 1 ? "" : "s"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
