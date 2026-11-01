-- RRB Station Master CEN 08/2026 corrigendum: total corrected 1,215 -> 1,265
-- Corrigendum No. 1 dated 27 October 2026. User lifted the 28 Oct hold on 1 Nov 2026
-- on the strength of the full corrigendum text (mirror copy; RRB domain itself had
-- not opened). English columns only; Nepali columns untouched (hidden, restorable).
UPDATE "Article"
SET "titleEn" = REPLACE("titleEn", '1,215', '1,265'),
    "excerptEn" = 'The Railway Recruitment Boards have released the detailed CEN 08/2026 for 1,265 Station Master posts, with online applications opening on 27 October 2026 and closing at 11:59 pm on 25 November 2026. Corrigendum No. 1 (27 October 2026) corrects the official total to 1,265, matching the Annexure-B category rows.',
    "sources" = ARRAY['https://rrb.indianrailways.gov.in/-/image/1793016771817CEN_08_2026_StationMaster.pdf/examsDocuments', 'https://www.careerpower.in/rrb-station-master.html', 'https://www.zerooperiod.in/2026/10/rrb-station-master-recruitment-2026-cen-08-2026-notification.html', 'https://www.practicemock.com/blog/railway-station-master-notification/amp/', 'https://files.govtjobsalert.in/2026/10/rrb-station-master-cen-08-2026-corrigendum-no-1-out-corrigendum-4.pdf'],
    "updatedAt" = NOW()
WHERE "slug" = 'rrb-station-master-cen-08-2026-20261026';

UPDATE "Article"
SET "bodyEn" = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE("bodyEn",
        '<h2>A vacancy-count discrepancy candidates must check</h2>',
        '<h2>Corrigendum corrects the vacancy total to 1,265</h2>'),
      '<p>The detailed notification states the total as 1,215 vacancies across all RRBs, confirmed from the <a href="https://rrb.indianrailways.gov.in/-/image/1793016771817CEN_08_2026_StationMaster.pdf/examsDocuments">official PDF</a>. Some summaries of the notice note that the Annexure-B category rows — Unreserved 542, Scheduled Caste 176, Scheduled Tribe 104, Other Backward Classes (Non-Creamy Layer) 296 and Economically Weaker Sections 147 — add up to 1,265, which does not match the notification''s own total. Follow the official total of 1,215 unless a corrigendum appears.</p>',
      '<p>Corrigendum No. 1, dated 27 October 2026, corrects the vacancy total for CEN 08/2026: the total may be read as 1,265 instead of 1,215, which was inadvertently mentioned in the detailed notification. The Annexure-B category rows — Unreserved 542, Scheduled Caste 176, Scheduled Tribe 104, Other Backward Classes (Non-Creamy Layer) 296 and Economically Weaker Sections 147 — add up to 1,265, matching the corrected total. All other terms of the notice remain unchanged.</p>'),
    '<tr><th>Vacancies</th><td>1,215 (official total; category rows noted below)</td></tr>',
    '<tr><th>Vacancies</th><td>1,265 (corrected total per Corrigendum No. 1, 27 October 2026)</td></tr>'),
  'The notification was confirmed from the official RRB website, and its total of 1,215 posts is the figure used above.',
  'The notification was confirmed from the official RRB website, and its corrected total of 1,265 posts is the figure used above.')
WHERE "slug" = 'rrb-station-master-cen-08-2026-20261026';

UPDATE "Article"
SET "bodyEn" = REPLACE("bodyEn", 'for 1,215 Station Master posts', 'for 1,265 Station Master posts')
WHERE "slug" = 'rrb-station-master-cen-08-2026-20261026';
