import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";
import UserActions from "./UserActions";

export const dynamic = "force-dynamic";

export default async function AdminUsers({ searchParams }: { searchParams: Promise<{ role?: string; q?: string }> }) {
  await requireAdmin();
  const { role, q } = await searchParams;

  const users = await db.user.findMany({
    where: {
      ...(role ? { role: role as never } : {}),
      ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
  });

  return (
    <DashboardShell title="Users" nav={ADMIN_NAV} active="/admin/users">
      <form className="mb-4 flex flex-wrap gap-2" method="get">
        <input name="q" defaultValue={q || ""} placeholder="Search name or email…" className="h-11 min-w-52 flex-1 rounded-lg border border-slate-300 px-3.5 text-sm" />
        <select name="role" defaultValue={role || ""} className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm">
          <option value="">All roles</option>
          <option value="STUDENT">Students</option>
          <option value="EMPLOYER">Employers</option>
          <option value="ADMIN">Admins</option>
        </select>
        <button type="submit" className="h-11 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white">Search</button>
      </form>

      {users.length === 0 ? (
        <EmptyState title="No users found." />
      ) : (
        <Card className="divide-y divide-slate-100">
          {users.map((u) => (
            <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{u.name}</p>
                <p className="text-xs text-slate-500">{u.email} · joined {u.createdAt.toLocaleDateString("en-GB")}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="blue">{u.role}</Badge>
                <Badge tone={u.status === "ACTIVE" ? "green" : "rose"}>{u.status}</Badge>
                <UserActions id={u.id} name={u.name} status={u.status} />
              </div>
            </div>
          ))}
        </Card>
      )}
    </DashboardShell>
  );
}
