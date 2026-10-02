-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "verificationExpiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CompanyVerification" ADD COLUMN     "checks" JSONB,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "reviewedAt" TIMESTAMP(3);
