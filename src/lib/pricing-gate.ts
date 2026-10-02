import { db } from "@/lib/db";
import { isBadgeValid } from "@/lib/verification";

/**
 * Pricing visibility gate: plan prices are shown ONLY to employers whose
 * company holds a currently-valid verified badge (and to staff admins).
 */
export async function getVerifiedCompany(userId: string) {
  const company = await db.company.findFirst({
    where: { ownerId: userId },
    select: { id: true, name: true, verificationStatus: true, verifiedAt: true, verificationExpiresAt: true },
  });
  if (!company || company.verificationStatus !== "VERIFIED" || !isBadgeValid(company)) return null;
  return company;
}
