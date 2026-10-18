-- Correction 2026-10-18: official UNDP Careers posting (Job ID 37495, UNOCHA
-- Humanitarian Affairs Officer, Rasuwa) re-read ~11:28 NPT shows
-- "Apply Before: 10/25/2026, 06:14 PM" with no timezone stated. The stated
-- time shifted during the day across checks (23:59 in one check, 01:14 PM in
-- verbatim reproductions), so the article now carries the current official
-- reading plus an explicit "apply early in the day" caution.
UPDATE "Article"
SET "bodyEn" = replace(replace(replace(replace("bodyEn",
  'Apply before 25 October 2026, 23:59 — the posting states no timezone.',
  'Apply before 25 October 2026. The official posting currently states 6:14 PM with no timezone — and that stated time shifted during the day — so apply as early in the day as possible.'),
  'reads "Apply Before 25/10/2026, 23:59", with no timezone stated.',
  'currently reads "Apply Before 10/25/2026, 6:14 PM", with no timezone stated. That time shifted during the day, so treat the exact hour as unstable.'),
  '<td>25 October 2026, 23:59 (no timezone stated)</td>',
  '<td>25 October 2026 — currently 6:14 PM, no timezone; the stated time has shifted, so apply early in the day</td>'),
  'Because the posting leaves the timezone of the 23:59 cutoff unstated, do not cut it fine: submit well before the evening of 25 October',
  'Because the posting leaves the timezone of its cutoff unstated — and the stated time shifted during the day — do not cut it fine: submit well before midday on 25 October'),
"bodyNe" = replace("bodyNe",
  'मा "Apply Before 25/10/2026, 23:59" लेखिएको छ, समय क्षेत्र उल्लेख छैन।',
  'मा "Apply Before 10/25/2026, 6:14 PM" लेखिएको छ, समय क्षेत्र उल्लेख छैन। उक्त समय दिनभित्र परिवर्तन भएकाले, २५ अक्टोबरको दिनको सुरुमै आवेदन दिनुहोस्।'),
"updatedAt" = NOW()
WHERE "slug" = 'unocha-humanitarian-affairs-officer-rasuwa-20261018';
