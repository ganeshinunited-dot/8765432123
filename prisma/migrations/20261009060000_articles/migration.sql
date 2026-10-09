-- Add Article model for the daily bilingual job-news blog
CREATE TABLE "Article" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "country" TEXT,
  "titleEn" TEXT NOT NULL,
  "titleNe" TEXT NOT NULL,
  "excerptEn" TEXT NOT NULL,
  "excerptNe" TEXT NOT NULL,
  "bodyEn" TEXT NOT NULL,
  "bodyNe" TEXT NOT NULL,
  "sources" TEXT[],
  "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
CREATE INDEX "Article_publishedAt_idx" ON "Article"("publishedAt");
CREATE INDEX "Article_category_idx" ON "Article"("category");
