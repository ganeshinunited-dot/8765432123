-- Add videos column to Article for related YouTube course embeds.
-- Filled by /api/cron/article-videos: only videos verified live via the
-- YouTube oEmbed endpoint are stored; unverified candidates are dropped.
ALTER TABLE "Article" ADD COLUMN "videos" JSONB NOT NULL DEFAULT '[]';
