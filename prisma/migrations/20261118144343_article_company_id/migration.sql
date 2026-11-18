-- Link news articles to a verified employer so a company profile can list
-- its real vacancies. Nullable: every existing article stays unlinked.

-- AlterTable
ALTER TABLE "Article" ADD COLUMN "companyId" TEXT;

-- CreateIndex
CREATE INDEX "Article_companyId_idx" ON "Article"("companyId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
