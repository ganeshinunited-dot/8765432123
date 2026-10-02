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
    include: { verifications: { orderBy: { createdAt: "desc" }, take: 5 } },
  });
  const locations = await db.location.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });
  const owner = await db.user.findUnique({ where: { id: user.id }, select: { emailVerified: true } });
  const latest = company?.verifications[0] || null;
  const verification = {
    companyId: company?.id,
    verificationStatus: company?.verificationStatus || "PENDING",
    verifiedAt: company?.verifiedAt ? company.verifiedAt.toISOString() : null,
    verificationExpiresAt: company?.verificationExpiresAt ? company.verificationExpiresAt.toISOString() : null,
    ownerEmailVerified: !!owner?.emailVerified,
    profile: { logoUrl: company?.logoUrl, industry: company?.industry, description: company?.description, locationId: company?.locationId, website: company?.website },
    latest: latest ? {
      id: latest.id,
      status: latest.status,
      notes: latest.notes,
      createdAt: latest.createdAt.toISOString(),
      businessInfo: (latest.businessInfo as Record<string, string>) || {},
      documentIds: latest.documentIds || [],
    } : null,
    pastCount: company?.verifications.length || 0,
  };
  return (
    <DashboardShell title="Company profile" nav={EMPLOYER_NAV} active="/employer/company">
      <CompanyProfileForm initial={company ? { ...company, verificationStatus: company.verificationStatus } : null} locations={locations} verification={verification} />
    </DashboardShell>
  );
}
