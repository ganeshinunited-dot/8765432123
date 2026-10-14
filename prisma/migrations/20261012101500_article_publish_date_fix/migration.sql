-- Correct publishedAt for cron-written daily articles.
-- The daily-articles cron stamped publishedAt with the source story's original
-- news date instead of the moment Growentix published the article, so fresh
-- batches sank to old positions in the /articles listing (ordered by
-- publishedAt desc) and showed misleading "Published" dates + JSON-LD
-- datePublished. This backfills publishedAt = createdAt (the true publish
-- moment) for batch articles only: slugs ending in -YYYYMMDD written by the
-- cron, where the two timestamps differ by more than a day. Idempotent.
UPDATE "Article"
SET "publishedAt" = "createdAt"
WHERE "slug" SIMILAR TO '%-2026[0-9][0-9][0-9][0-9]'
  AND ABS(EXTRACT(EPOCH FROM ("publishedAt" - "createdAt"))) > 86400;
