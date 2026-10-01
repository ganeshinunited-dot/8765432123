import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/Shell";
import { CompanyProfileForm } from "@/components/employer/CompanyProfileForm";
import { EMPLOYER_NAV } from "../home/page";

export const dynamic = "force-dynamic";

export default async function CompanyPage() {
  const user = await requireUser(["EMPLOYER"]);
  const company = await db.company.findFirst({
    where: { ownerId: user.id },
    include: { verifications: { orderBy: { createdAt: "desc" }, take: 1 } },
  });
  const locations = await db.location.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });
  return (
    <DashboardShell title="Company profile" nav={EMPLOYER_NAV} active="/employer/company">
      <CompanyProfileForm initial={company ? { ...company, verificationStatus: company.verificationStatus } : null} locations={locations} />
    </DashboardShell>
  );
}
