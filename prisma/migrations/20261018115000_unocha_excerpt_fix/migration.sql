-- Follow-up to 20261018113200: the same 23:59 string also lives in excerptEn
-- (it feeds the meta/OG description and the excerpt shown under the title).
UPDATE "Article"
SET "excerptEn" = replace("excerptEn",
  'Apply before 25 October 2026, 23:59 — the posting states no timezone.',
  'Apply before 25 October 2026 — currently 6:14 PM, no timezone; the stated time has shifted, so apply early in the day.'),
"updatedAt" = NOW()
WHERE "slug" = 'unocha-humanitarian-affairs-officer-rasuwa-20261018'
  AND "excerptEn" LIKE '%23:59%';
