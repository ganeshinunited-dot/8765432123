-- Add per-article verification fields (Master Plan Phase 2): the date the
-- nine verification checks were completed, and an optional named author.
ALTER TABLE "Article" ADD COLUMN "verifiedAt" TIMESTAMP(3);
ALTER TABLE "Article" ADD COLUMN "authorName" TEXT;

-- Backfill: verification happened at publish time for existing job-category
-- articles, so verifiedAt = publishedAt is the honest approximation.
-- News / pop-music / tech-ai / legacy taylor-swift articles are NOT
-- backfilled (they carry no badge).
UPDATE "Article" SET "verifiedAt" = "publishedAt"
WHERE "verifiedAt" IS NULL
  AND "category" NOT IN ('pop-music', 'tech-ai', 'news', 'taylor-swift');
