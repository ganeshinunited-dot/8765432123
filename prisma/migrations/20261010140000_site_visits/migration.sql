-- First-party site visitor analytics (no raw IPs stored — visitors are
-- counted by a daily salted hash, one row per visitor per path per day)
CREATE TABLE "SiteVisit" (
  "id" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "day" TIMESTAMP(3) NOT NULL,
  "visitorHash" TEXT NOT NULL,
  "country" TEXT,
  "referrer" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SiteVisit_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SiteVisit_day_visitorHash_path_key" ON "SiteVisit"("day", "visitorHash", "path");
CREATE INDEX "SiteVisit_day_idx" ON "SiteVisit"("day");
CREATE INDEX "SiteVisit_path_day_idx" ON "SiteVisit"("path", "day");
