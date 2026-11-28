-- Daily batch 2026-11-28: 40 NEW articles in ONE migration (Jobs 15 + News 15 + Pop Music 5 + Tech 5; user-ordered publish 28 Nov 2026 ~11:13 NPT).
-- GRAMMARLY + HUMANIZER VERIFIED: every article passed Grammarly Pro (grammar + plagiarism 0-1%) and the Humanizer pass; final AI Detector scan on the EXACT publish text: Jobs 30%/22%/36%, News 13%/11%/15%, Pop 9%, Tech 44%. No chunk read 0% — reported honestly, publish approved by the user. Facts intact: fact-changing rewrites were rejected at both the agent and the applier stage.
-- FRESHNESS (checked 28 Nov morning): Poundland — no published reply from Mark Newton-Jones to the noon 27 Nov Commons deadline; MPs asked Gordon Brothers to give evidence at a PUBLIC hearing; remaining bidders have until Sunday 29 Nov to reconfirm interest. The "Gordon Brothers withdrew from the store-liquidation contract" claim could NOT be verified in the cited source and was LEFT OUT of the article. SAP job-cuts + Air India figures are reported/not confirmed throughout. Taplejung earthquake: still no damage/casualty reports as of 28 Nov. Saudi retaliation follow-up (Dawn 28 Nov: Taiz strike, Houthi claims) is NOT in this batch — held for the 29 Nov batch or a live-article update on the user's word.
-- VERIFIED_DATE: verifiedAt = '2026-11-28' on ALL 15 new job rows; NULL for News/Pop/Tech rows; authorName NULL on all rows.
-- NEPALI FIELDS: this batch produced no Nepali translations; titleNe/excerptNe/bodyNe carry the English text (article page renders En fields only — verified in page.tsx).
-- SQL SAFETY: bodies dollar-quoted; titles/excerpts SQL-escaped by doubling single quotes (a few contain apostrophes); no dollar-quote markers or backslashes in any body; sources are bare URLs extracted from "Name — URL" entries where needed.

-- ai-hiring-freeze-jobs-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'ai-hiring-freeze-jobs-20261128', 'usa', 'USA',
'AI Hiring Freeze: Two-Thirds of Firms Hire Less',
'AI Hiring Freeze: Two-Thirds of Firms Hire Less',
'AI hiring freeze: people at two-thirds of 58 US firms told Anthropic they hire less because of AI, while only two saw a role wiped out.',
'AI hiring freeze: people at two-thirds of 58 US firms told Anthropic they hire less because of AI, while only two saw a role wiped out.',
$$<p>Artificial intelligence is not yet causing mass layoffs, but it is quietly freezing hiring. An AI hiring freeze is the clearest employment finding in Anthropic's "Working with AI" report, published 23 November 2026: people at two-thirds of the 58 US companies interviewed said they now hire less because of AI, while only two had seen AI fully eliminate a position.</p>
<table><tbody><tr><td>Organisation</td><td>Anthropic Economics team (authors Nathan Wilmers, Maxim Massenkoff and Peter McCrory)</td></tr><tr><td>Post</td><td>66 interviews across 58 US enterprise customers; two-thirds reported reduced hiring; 10 hired more; 9 cut contractors; 2 saw a role eliminated</td></tr><tr><td>Notification</td><td>Report published 23 November 2026</td></tr></tbody></table>
<h2>What the AI hiring freeze looks like</h2><p>The report rests on 66 face-to-face interviews, 25 to 40 minutes each, with executives, managers, and individual contributors at 58 of Anthropic's enterprise customers, from AI-native startups to century-old manufacturers, and from law firms and hedge funds to a trucking company and a publisher. The most common pattern was slower hiring, and most of it came from roles that were never opened: as one interviewee put it, "We may not be firing, but we're not hiring." About a third of the hiring declines came from deliberately shrinking functions through attrition, without backfilling the roles. Ten companies reported hiring more because of AI, mostly for implementation and IT support. The six startups that gave an estimate said that without AI they would need, on average, four times as many employees. Readers tracking this shift can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our guide to <a href="https://growentix.cloud/articles/software-engineer-jobs-in-usa-for-foreigners-h-1b-pay-and-hiring-guide-20261029">software engineer jobs in the USA for foreigners</a>.</p>
<h2>Who is affected</h2><p>Nine companies cut contracted workers rather than employees: software developers, customer service, legal counsel and back office workers (many of whom were already offshore). The authors see this as a potential red flag for the international business services industry, because the work which has already been moved out of the building is work that is built on self contained tasks which are easy to hand off and easy to replace. Five of the companies said they had been actively pushing out employees who were not going to embrace the AI tools. Only two of the companies reported that AI automation had completely eliminated a role and cost someone their job. The caveat of course is that all 58 of the companies are Anthropic customers and they have been selected to be representative across industry, size and level of AI adoption. They are not a random or systematic sample.</p>
<h2>What it pays</h2><p>No pay figures are provided in the report, so no figures are included here. The report is about headcount rather than wages and the value figures it cites are the companies' own qualitative assessments rather than test results. What it does show is where hiring is still going on: in the implementation roles and IT support where ten companies have added people as a result of AI.</p>
<h2>What jobseekers should do?</h2><p>The take away is that you should be aiming at the roles that AI creates rather than the ones that it just quietly erodes: implementation, IT support and the re-design of work around the AI tools. The report shows that the best outcomes are achieved when you re-design the role rather than just slap a vendor's workflow on to the experts. For the applicant that means showing hands-on AI in the application as five of the companies in the study actually got rid of people who wouldn't adopt the tools. The contractors in the offshore, task based work will be under the most pressure in the short term so the better position to be in is to have the hard to hand off skills.</p>
<h2>What the report does not say</h2><p>The report makes no claim to have answered the question of what comes next and explicitly states that none of it guarantees protection against AI-induced job loss. There are no figures on total jobs lost or gained, no wage data and no 2027 hiring forecast. The sample is 58 self-selected Anthropic customers who were interviewed anonymously so the figures are counts of stories, not statistics and cannot be read as a national workforce census.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Genuine employers never charge for an application, an assessment or a job offer, and any listing that asks for payment is a scam.</p>
<p>Sources: <a href="https://www.anthropic.com/research/working-with-ai">Anthropic</a> ("Working with AI", published 23 November 2026: the interviews, the hiring findings and the sample limits); <a href="https://explainx.ai/blog/anthropic-working-with-ai-enterprise-adoption-study-november-2026">ExplainX</a> (summary of the report: hiring cuts, contractor cuts and the ten companies that hired more); <a href="https://www.beri.net/article/anthropic-working-with-ai-study-58-companies-hiring-freeze-offshore-contractor-cuts-few-layoffs-2027-headcount-plan">The Daily Brief</a> (summary of the report: headcount counts and the offshore contractor warning).</p>
<h2>Frequently asked questions</h2>
<h3>How many of the companies in the Anthropic study are hiring less as a result of AI?</h3>
<p>People at two thirds of the 58 companies said they hire less as a result of AI.</p>
<h3>Did AI cause the mass layoffs in the study?</h3>
<p>No, only two of the 58 companies had seen AI automation fully eliminate a position.</p>
<h3>Which jobs did AI take out first in the study?</h3>
<p>Contracted work: nine companies have cut contractors (mostly offshore) in software, customer service, legal and back office.</p>
<h3>Is the Anthropic study a national jobs census?</h3>
<p>No, it's 66 interviews with 58 Anthropic customers. They were selected for their range rather than being a random selection.</p>
$$,
$$<p>Artificial intelligence is not yet causing mass layoffs, but it is quietly freezing hiring. An AI hiring freeze is the clearest employment finding in Anthropic's "Working with AI" report, published 23 November 2026: people at two-thirds of the 58 US companies interviewed said they now hire less because of AI, while only two had seen AI fully eliminate a position.</p>
<table><tbody><tr><td>Organisation</td><td>Anthropic Economics team (authors Nathan Wilmers, Maxim Massenkoff and Peter McCrory)</td></tr><tr><td>Post</td><td>66 interviews across 58 US enterprise customers; two-thirds reported reduced hiring; 10 hired more; 9 cut contractors; 2 saw a role eliminated</td></tr><tr><td>Notification</td><td>Report published 23 November 2026</td></tr></tbody></table>
<h2>What the AI hiring freeze looks like</h2><p>The report rests on 66 face-to-face interviews, 25 to 40 minutes each, with executives, managers, and individual contributors at 58 of Anthropic's enterprise customers, from AI-native startups to century-old manufacturers, and from law firms and hedge funds to a trucking company and a publisher. The most common pattern was slower hiring, and most of it came from roles that were never opened: as one interviewee put it, "We may not be firing, but we're not hiring." About a third of the hiring declines came from deliberately shrinking functions through attrition, without backfilling the roles. Ten companies reported hiring more because of AI, mostly for implementation and IT support. The six startups that gave an estimate said that without AI they would need, on average, four times as many employees. Readers tracking this shift can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our guide to <a href="https://growentix.cloud/articles/software-engineer-jobs-in-usa-for-foreigners-h-1b-pay-and-hiring-guide-20261029">software engineer jobs in the USA for foreigners</a>.</p>
<h2>Who is affected</h2><p>Nine companies cut contracted workers rather than employees: software developers, customer service, legal counsel and back office workers (many of whom were already offshore). The authors see this as a potential red flag for the international business services industry, because the work which has already been moved out of the building is work that is built on self contained tasks which are easy to hand off and easy to replace. Five of the companies said they had been actively pushing out employees who were not going to embrace the AI tools. Only two of the companies reported that AI automation had completely eliminated a role and cost someone their job. The caveat of course is that all 58 of the companies are Anthropic customers and they have been selected to be representative across industry, size and level of AI adoption. They are not a random or systematic sample.</p>
<h2>What it pays</h2><p>No pay figures are provided in the report, so no figures are included here. The report is about headcount rather than wages and the value figures it cites are the companies' own qualitative assessments rather than test results. What it does show is where hiring is still going on: in the implementation roles and IT support where ten companies have added people as a result of AI.</p>
<h2>What jobseekers should do?</h2><p>The take away is that you should be aiming at the roles that AI creates rather than the ones that it just quietly erodes: implementation, IT support and the re-design of work around the AI tools. The report shows that the best outcomes are achieved when you re-design the role rather than just slap a vendor's workflow on to the experts. For the applicant that means showing hands-on AI in the application as five of the companies in the study actually got rid of people who wouldn't adopt the tools. The contractors in the offshore, task based work will be under the most pressure in the short term so the better position to be in is to have the hard to hand off skills.</p>
<h2>What the report does not say</h2><p>The report makes no claim to have answered the question of what comes next and explicitly states that none of it guarantees protection against AI-induced job loss. There are no figures on total jobs lost or gained, no wage data and no 2027 hiring forecast. The sample is 58 self-selected Anthropic customers who were interviewed anonymously so the figures are counts of stories, not statistics and cannot be read as a national workforce census.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Genuine employers never charge for an application, an assessment or a job offer, and any listing that asks for payment is a scam.</p>
<p>Sources: <a href="https://www.anthropic.com/research/working-with-ai">Anthropic</a> ("Working with AI", published 23 November 2026: the interviews, the hiring findings and the sample limits); <a href="https://explainx.ai/blog/anthropic-working-with-ai-enterprise-adoption-study-november-2026">ExplainX</a> (summary of the report: hiring cuts, contractor cuts and the ten companies that hired more); <a href="https://www.beri.net/article/anthropic-working-with-ai-study-58-companies-hiring-freeze-offshore-contractor-cuts-few-layoffs-2027-headcount-plan">The Daily Brief</a> (summary of the report: headcount counts and the offshore contractor warning).</p>
<h2>Frequently asked questions</h2>
<h3>How many of the companies in the Anthropic study are hiring less as a result of AI?</h3>
<p>People at two thirds of the 58 companies said they hire less as a result of AI.</p>
<h3>Did AI cause the mass layoffs in the study?</h3>
<p>No, only two of the 58 companies had seen AI automation fully eliminate a position.</p>
<h3>Which jobs did AI take out first in the study?</h3>
<p>Contracted work: nine companies have cut contractors (mostly offshore) in software, customer service, legal and back office.</p>
<h3>Is the Anthropic study a national jobs census?</h3>
<p>No, it's 66 interviews with 58 Anthropic customers. They were selected for their range rather than being a random selection.</p>
$$,
ARRAY['https://www.anthropic.com/research/working-with-ai', 'https://explainx.ai/blog/anthropic-working-with-ai-enterprise-adoption-study-november-2026', 'https://www.beri.net/article/anthropic-working-with-ai-study-58-companies-hiring-freeze-offshore-contractor-cuts-few-layoffs-2027-headcount-plan'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- air-india-jobs-20261128 (india; India; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'air-india-jobs-20261128', 'india', 'India',
'Air India Jobs: 10,000 Roles Under Review',
'Air India Jobs: 10,000 Roles Under Review',
'Air India jobs face review as the airline assesses a surplus of 8,000 to 10,000 staff among about 30,000 employees, with no cuts confirmed yet.',
'Air India jobs face review as the airline assesses a surplus of 8,000 to 10,000 staff among about 30,000 employees, with no cuts confirmed yet.',
$$<p>Air India is in the process of reviewing its workforce of some 30,000 as part of the restructuring under new CEO Tewolde Gebremariam. There are reports of a potential surplus of 8,000 to 10,000 people. Air India jobs are therefore uncertain, but no job cuts have been confirmed and redeployment is one of the options being considered.</p>
<table><tbody><tr><td>Organisation</td><td>Air India group (Air India and Air India Express)</td></tr><tr><td>Post</td><td>Potential surplus of 8,000 to 10,000 roles among about 30,000 employees; two new senior posts created: Group Strategy Officer and Chief of the Training Academy</td></tr><tr><td>Notification</td><td>Restructuring outlined at an employee town hall on 25 November 2026</td></tr></tbody></table>
<h2>What Air India jobs are under review</h2><p>The review follows multiple integrations and a significant expansion of the workforce. It is part of the wider 'One Air India' plan to bring Air India and Air India Express under one management. The functions that are being looked at for integration are HR, Finance, Network Planning, Commercial, Marketing and Engineering. The group is targeting Rs 6,000 crore in savings and aims to cut non-fuel costs by 20%, after a combined net loss of Rs 22,238 crore in FY26, more than double the Rs 10,859 crore lost in FY25.. The CEO who took over on 1st October 2026 has been given a free hand by Tata Sons to rebuild his team, including through the use of external appointments. For those following airline hiring, there's a roundup of <a href="https://growentix.cloud/articles/emirates-cabin-crew-hiring-dubai-20261017">Emirates cabin crew hiring in Dubai</a> and browse <a href="https://growentix.cloud/asia">Asia jobs</a>.</p>
<h2>Who is affected</h2><p>The reported surplus is in the region of a quarter to a third of the workforce, though the reports don't specify which functions or grades will be impacted and make no mention of any individual losing their job. It's described as a workforce assessment, not a redundancy list and redeployment is one of the options being looked at in conjunction with any reduction. Senior management as the Management Committee is being rebranded as the Management Team, two new senior roles have been created and it is reported that one of the senior executives is likely to be stepping away. On the other hand a new Air India Express CEO will be joining on 1 December 2026.</p>
<h2>What it pays</h2><p>No pay or severance figures have been reported as part of the review (so none are included here). The restructuring is being presented as a cost exercise rather than a pay review and there has been no publication of any redundancy terms. Anyone who is affected should of course just go by what the airline says in its own communications and not rely on any claims that are being made on social media about pay.</p>
<h2>What staff and applicants should do</h2><p>Staff should be on the lookout for the airline's own announcements following the 25th November town hall and should not take the reported figure of 8,000 to 10,000 as a definitive cut (the reports themselves make no such claim as to surplus staff being asked to leave). Jobseekers who are interested in Air India should only apply via the official Air India careers website. They should check the live vacancy list prior to applying as the restructuring may change which roles are available.</p>
<h2>What the reports do not say</h2><p>The reports do not say how the surplus would be addressed, which roles would go, when any decision would be taken, or what redeployment or severance terms would apply. The airline has not confirmed the surplus figure on the record, and the figures come from sources cited by CNBC-TV18 rather than from an Air India statement. The reports also do not say whether hiring is frozen: the review concerns existing staff, and no hiring freeze has been announced.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Air India recruitment is free and no agent or intermediary can sell you a job with the airline. If anyone is asking for money for a vacancy is running a scam.</p>
<p>Sources: <a href="https://www.businesstoday.in/amp/latest/corporate/story/air-india-plans-restructuring-examining-workforce-surplus-of-8000-10000-employees-report-569436-2026-11-25">Business Today</a> (restructuring and surplus figures via CNBC-TV18 reporting, 25 November 2026); <a href="https://www.ndtv.com/india-news/air-india-ai-express-to-operate-as-one-group-two-brands-heres-what-that-means-12377449">NDTV</a> (One Air India integration, cost saving target and the town hall); <a href="https://hrforwardasia.com/air-india-weighs-potential-surplus-of-up-to-10000-staff-in-restructuring/">HR Forward Asia</a> (the town hall outcome, the new senior posts and the unconfirmed status of any cuts).</p>
<h2>Frequently asked questions</h2>
<h3>Is Air India cutting 10,000 jobs?</h3>
<p>Not confirmed. There's a report of 8,000 to 10,000 staff being assessed and no suggestion at all that any of the surplus staff will be asked to leave.</p>
<h3>What is the One Air India plan?</h3>
<p>It has Air India and Air India Express operating under a common management structure with shared functions.</p>
<h3>When was the restructuring made known to the staff?</h3>
<p>At an employee town hall on 25 November 2026, chaired by CEO Tewolde Gebremariam.</p>
<h3>Is Air India still recruiting?</h3>
<p>No hiring freeze has been announced. Check the airline's official careers channels for current vacancies.</p>
$$,
$$<p>Air India is in the process of reviewing its workforce of some 30,000 as part of the restructuring under new CEO Tewolde Gebremariam. There are reports of a potential surplus of 8,000 to 10,000 people. Air India jobs are therefore uncertain, but no job cuts have been confirmed and redeployment is one of the options being considered.</p>
<table><tbody><tr><td>Organisation</td><td>Air India group (Air India and Air India Express)</td></tr><tr><td>Post</td><td>Potential surplus of 8,000 to 10,000 roles among about 30,000 employees; two new senior posts created: Group Strategy Officer and Chief of the Training Academy</td></tr><tr><td>Notification</td><td>Restructuring outlined at an employee town hall on 25 November 2026</td></tr></tbody></table>
<h2>What Air India jobs are under review</h2><p>The review follows multiple integrations and a significant expansion of the workforce. It is part of the wider 'One Air India' plan to bring Air India and Air India Express under one management. The functions that are being looked at for integration are HR, Finance, Network Planning, Commercial, Marketing and Engineering. The group is targeting Rs 6,000 crore in savings and aims to cut non-fuel costs by 20%, after a combined net loss of Rs 22,238 crore in FY26, more than double the Rs 10,859 crore lost in FY25.. The CEO who took over on 1st October 2026 has been given a free hand by Tata Sons to rebuild his team, including through the use of external appointments. For those following airline hiring, there's a roundup of <a href="https://growentix.cloud/articles/emirates-cabin-crew-hiring-dubai-20261017">Emirates cabin crew hiring in Dubai</a> and browse <a href="https://growentix.cloud/asia">Asia jobs</a>.</p>
<h2>Who is affected</h2><p>The reported surplus is in the region of a quarter to a third of the workforce, though the reports don't specify which functions or grades will be impacted and make no mention of any individual losing their job. It's described as a workforce assessment, not a redundancy list and redeployment is one of the options being looked at in conjunction with any reduction. Senior management as the Management Committee is being rebranded as the Management Team, two new senior roles have been created and it is reported that one of the senior executives is likely to be stepping away. On the other hand a new Air India Express CEO will be joining on 1 December 2026.</p>
<h2>What it pays</h2><p>No pay or severance figures have been reported as part of the review (so none are included here). The restructuring is being presented as a cost exercise rather than a pay review and there has been no publication of any redundancy terms. Anyone who is affected should of course just go by what the airline says in its own communications and not rely on any claims that are being made on social media about pay.</p>
<h2>What staff and applicants should do</h2><p>Staff should be on the lookout for the airline's own announcements following the 25th November town hall and should not take the reported figure of 8,000 to 10,000 as a definitive cut (the reports themselves make no such claim as to surplus staff being asked to leave). Jobseekers who are interested in Air India should only apply via the official Air India careers website. They should check the live vacancy list prior to applying as the restructuring may change which roles are available.</p>
<h2>What the reports do not say</h2><p>The reports do not say how the surplus would be addressed, which roles would go, when any decision would be taken, or what redeployment or severance terms would apply. The airline has not confirmed the surplus figure on the record, and the figures come from sources cited by CNBC-TV18 rather than from an Air India statement. The reports also do not say whether hiring is frozen: the review concerns existing staff, and no hiring freeze has been announced.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Air India recruitment is free and no agent or intermediary can sell you a job with the airline. If anyone is asking for money for a vacancy is running a scam.</p>
<p>Sources: <a href="https://www.businesstoday.in/amp/latest/corporate/story/air-india-plans-restructuring-examining-workforce-surplus-of-8000-10000-employees-report-569436-2026-11-25">Business Today</a> (restructuring and surplus figures via CNBC-TV18 reporting, 25 November 2026); <a href="https://www.ndtv.com/india-news/air-india-ai-express-to-operate-as-one-group-two-brands-heres-what-that-means-12377449">NDTV</a> (One Air India integration, cost saving target and the town hall); <a href="https://hrforwardasia.com/air-india-weighs-potential-surplus-of-up-to-10000-staff-in-restructuring/">HR Forward Asia</a> (the town hall outcome, the new senior posts and the unconfirmed status of any cuts).</p>
<h2>Frequently asked questions</h2>
<h3>Is Air India cutting 10,000 jobs?</h3>
<p>Not confirmed. There's a report of 8,000 to 10,000 staff being assessed and no suggestion at all that any of the surplus staff will be asked to leave.</p>
<h3>What is the One Air India plan?</h3>
<p>It has Air India and Air India Express operating under a common management structure with shared functions.</p>
<h3>When was the restructuring made known to the staff?</h3>
<p>At an employee town hall on 25 November 2026, chaired by CEO Tewolde Gebremariam.</p>
<h3>Is Air India still recruiting?</h3>
<p>No hiring freeze has been announced. Check the airline's official careers channels for current vacancies.</p>
$$,
ARRAY['https://www.businesstoday.in/amp/latest/corporate/story/air-india-plans-restructuring-examining-workforce-surplus-of-8000-10000-employees-report-569436-2026-11-25', 'https://www.ndtv.com/india-news/air-india-ai-express-to-operate-as-one-group-two-brands-heres-what-that-means-12377449', 'https://hrforwardasia.com/air-india-weighs-potential-surplus-of-up-to-10000-staff-in-restructuring/'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- job-usa-korea-20261128 (asia; South Korea; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'job-usa-korea-20261128', 'asia', 'South Korea',
'Job USA Korea: Civilian Roles at US Forces Korea',
'Job USA Korea: Civilian Roles at US Forces Korea',
'Job USA Korea openings include US Forces Korea civilian roles at Camp Humphreys, with direct-hire posts for US citizens in health and logistics.',
'Job USA Korea openings include US Forces Korea civilian roles at Camp Humphreys, with direct-hire posts for US citizens in health and logistics.',
$$<p>USFK hires American civilians for programme, health, logistics and range management positions (mainly around Camp Humphreys). The job USA Korea openings in this round up are all federal civilian posts and a number of them are direct hire posts which means the hiring agency can select a suitable candidate without going through the normal competitive process.</p>
<table><tbody><tr><td>Organisation</td><td>United States Forces Korea; US Army Medical Department Activity Korea; Defense Health Agency</td></tr><tr><td>Post</td><td>Program Manager, Supervisory Range Management Specialist, Health System Specialist, Medical Support Assistant, Social Worker (Clinical), Industrial Hygiene Technician, Logistics Management Specialist</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>US citizenship is required; Secret clearance for some posts; master's in social work plus an unrestricted clinical licence for the Social Worker role</td></tr><tr><td>Selection</td><td>Application and assessment; several posts use Direct Hire Authority</td></tr></tbody></table>
<h2>What job USA Korea roles involve</h2><p>The Program Manager directs a multi-billion dollar portfolio of construction, realignment and modernisation programmes for the US Forces Korea Command Engineer Division. The Supervisory Range Management Specialist is responsible for range operations and training land management across Areas I to IV for the Training Support Activity Korea. Health-wise we have the Health System Specialist who is in charge of programme management and admin support at MEDDAC Korea, the Medical Support Assistant who handles the customer service and computer based records at the Camp Humphreys clinic and the Clinical Social Worker who is based at the Brian D. Allgood Army Community Hospital at Camp Humphreys. The Industrial Hygiene Technician is at the Camp Carroll health clinic and the Logistics Management Specialist is the operations officer in USFK J4. For those wanting to look more widely can browse <a href="https://growentix.cloud/asia">Asia </a> and a regular roundup of <a href="https://growentix.cloud/articles/jobs-in-us-embassy-20261125">jobs at the US Embassy</a>.</p>
<h2>Who can apply</h2><p>US citizenship is required and proof must be provided. Most of the announcements are restricted to certain employment authority categories (current Dod civilian employees, disabled veterans and other eligible groups) so be sure to check the "who may apply" section on each USAJOBS announcement. The Health System Specialist, Medical Support Assistant, Social Worker and Industrial Hygiene Technician positions are open to US citizens under Direct Hire Authority. US citizens living overseas under ordinarily resident status are not eligible for appointment under the Status of Forces Agreement. Some of the positions require a Secret clearance, a pre-employment physical and an official passport.</p>
<h2>What it pays</h2><p>There are no salary figures in the announcement text that we checked for these posts so no figure is given. Federal overseas posts will normally have locality and allowance arrangements, but those aren't mentioned in the announcements that we've checked. The Medical Support Assistant announcement does state that relocation, recruitment and retention incentives may be authorised. Permanent change of station and Living Quarters Allowance are not authorised and there are no salary negotiations and student loan repayment incentives for that post.</p>
<h2>How to apply</h2><p>Apply online through USAJOBS, where each announcement is listed under its job number. Because several posts use Direct Hire Authority, qualified candidates can be appointed more quickly than under the usual competitive process. South Korea has strict rules on importing prescription and over-the-counter medicines, so check the US Embassy guidance before departing. Some posts require travel 10% to 25% of the time, and the Logistics Management Specialist post is designated emergency-essential.</p>
<h2>What the notice does not say</h2><p>The announcement text itself provides no salary figures and no closing dates. You have to go to the individual USAJOBS announcement to find out the current closing date and the pay grade. There's no indication of how many posts are available and no mention of interview dates. There's no mention at all of whether dependants can be accommodated and the Medical Support Assistant announcement is very specific in that it states that the Living Quarters Allowance is not available.</p>
<p><strong>Never pay anyone to apply for this job.</strong> USAJOBS applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://www.usajobs.gov:443/job/884472800">USAJOBS</a> (Program Manager, US Forces Korea: duties, citizenship and clearance requirements); <a href="https://www.usajobs.gov:443/job/891724800">USAJOBS</a> (Social Worker (Clinical), Camp Humphreys: qualifications, licence requirement and Direct Hire status); <a href="https://www.usajobs.gov/job/891161600">USAJOBS</a> (Supervisory Range Management Specialist, Training Support Activity Korea: duties and experience requirements).</p>
<h2>Frequently asked questions</h2>
<h3>Can you apply for the US Forces Korea civilian jobs?</h3>
<p>No US citizenship is required and the majority of the announcements are limited to specific eligibility categories (e.g. current Dod civilian employees, veterans).</p>
<h3>What is a Direct Hire Authority post?</h3>
<p>It's a post which the agency could fill by simply appointing a suitable candidate. No need for the normal competitive process.</p>
<h3>Where are the USFK civilian jobs based?</h3>
<p>Mostly at Camp Humphreys, with others at Camp Carroll and throughout the US Forces Korea areas in South Korea.</p>
<h3>Is a housing allowance paid on these posts?</h3>
<p>Not for the Medical Support Assistant post, where the announcement states that Living Quarters Allowance is not authorised.</p>
$$,
$$<p>USFK hires American civilians for programme, health, logistics and range management positions (mainly around Camp Humphreys). The job USA Korea openings in this round up are all federal civilian posts and a number of them are direct hire posts which means the hiring agency can select a suitable candidate without going through the normal competitive process.</p>
<table><tbody><tr><td>Organisation</td><td>United States Forces Korea; US Army Medical Department Activity Korea; Defense Health Agency</td></tr><tr><td>Post</td><td>Program Manager, Supervisory Range Management Specialist, Health System Specialist, Medical Support Assistant, Social Worker (Clinical), Industrial Hygiene Technician, Logistics Management Specialist</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>US citizenship is required; Secret clearance for some posts; master's in social work plus an unrestricted clinical licence for the Social Worker role</td></tr><tr><td>Selection</td><td>Application and assessment; several posts use Direct Hire Authority</td></tr></tbody></table>
<h2>What job USA Korea roles involve</h2><p>The Program Manager directs a multi-billion dollar portfolio of construction, realignment and modernisation programmes for the US Forces Korea Command Engineer Division. The Supervisory Range Management Specialist is responsible for range operations and training land management across Areas I to IV for the Training Support Activity Korea. Health-wise we have the Health System Specialist who is in charge of programme management and admin support at MEDDAC Korea, the Medical Support Assistant who handles the customer service and computer based records at the Camp Humphreys clinic and the Clinical Social Worker who is based at the Brian D. Allgood Army Community Hospital at Camp Humphreys. The Industrial Hygiene Technician is at the Camp Carroll health clinic and the Logistics Management Specialist is the operations officer in USFK J4. For those wanting to look more widely can browse <a href="https://growentix.cloud/asia">Asia </a> and a regular roundup of <a href="https://growentix.cloud/articles/jobs-in-us-embassy-20261125">jobs at the US Embassy</a>.</p>
<h2>Who can apply</h2><p>US citizenship is required and proof must be provided. Most of the announcements are restricted to certain employment authority categories (current Dod civilian employees, disabled veterans and other eligible groups) so be sure to check the "who may apply" section on each USAJOBS announcement. The Health System Specialist, Medical Support Assistant, Social Worker and Industrial Hygiene Technician positions are open to US citizens under Direct Hire Authority. US citizens living overseas under ordinarily resident status are not eligible for appointment under the Status of Forces Agreement. Some of the positions require a Secret clearance, a pre-employment physical and an official passport.</p>
<h2>What it pays</h2><p>There are no salary figures in the announcement text that we checked for these posts so no figure is given. Federal overseas posts will normally have locality and allowance arrangements, but those aren't mentioned in the announcements that we've checked. The Medical Support Assistant announcement does state that relocation, recruitment and retention incentives may be authorised. Permanent change of station and Living Quarters Allowance are not authorised and there are no salary negotiations and student loan repayment incentives for that post.</p>
<h2>How to apply</h2><p>Apply online through USAJOBS, where each announcement is listed under its job number. Because several posts use Direct Hire Authority, qualified candidates can be appointed more quickly than under the usual competitive process. South Korea has strict rules on importing prescription and over-the-counter medicines, so check the US Embassy guidance before departing. Some posts require travel 10% to 25% of the time, and the Logistics Management Specialist post is designated emergency-essential.</p>
<h2>What the notice does not say</h2><p>The announcement text itself provides no salary figures and no closing dates. You have to go to the individual USAJOBS announcement to find out the current closing date and the pay grade. There's no indication of how many posts are available and no mention of interview dates. There's no mention at all of whether dependants can be accommodated and the Medical Support Assistant announcement is very specific in that it states that the Living Quarters Allowance is not available.</p>
<p><strong>Never pay anyone to apply for this job.</strong> USAJOBS applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://www.usajobs.gov:443/job/884472800">USAJOBS</a> (Program Manager, US Forces Korea: duties, citizenship and clearance requirements); <a href="https://www.usajobs.gov:443/job/891724800">USAJOBS</a> (Social Worker (Clinical), Camp Humphreys: qualifications, licence requirement and Direct Hire status); <a href="https://www.usajobs.gov/job/891161600">USAJOBS</a> (Supervisory Range Management Specialist, Training Support Activity Korea: duties and experience requirements).</p>
<h2>Frequently asked questions</h2>
<h3>Can you apply for the US Forces Korea civilian jobs?</h3>
<p>No US citizenship is required and the majority of the announcements are limited to specific eligibility categories (e.g. current Dod civilian employees, veterans).</p>
<h3>What is a Direct Hire Authority post?</h3>
<p>It's a post which the agency could fill by simply appointing a suitable candidate. No need for the normal competitive process.</p>
<h3>Where are the USFK civilian jobs based?</h3>
<p>Mostly at Camp Humphreys, with others at Camp Carroll and throughout the US Forces Korea areas in South Korea.</p>
<h3>Is a housing allowance paid on these posts?</h3>
<p>Not for the Medical Support Assistant post, where the announcement states that Living Quarters Allowance is not authorised.</p>
$$,
ARRAY['https://www.usajobs.gov:443/job/884472800', 'https://www.usajobs.gov:443/job/891724800', 'https://www.usajobs.gov/job/891161600'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-antarctica-usa-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-antarctica-usa-20261128', 'usa', 'USA',
'Jobs in Antarctica USA: Pay Up to $155,000',
'Jobs in Antarctica USA: Pay Up to $155,000',
'Jobs in Antarctica USA include a Satellite Systems Engineer at $140,000 to $155,000 and an Airfield Manager at $115,000 to $125,000.',
'Jobs in Antarctica USA include a Satellite Systems Engineer at $140,000 to $155,000 and an Airfield Manager at $115,000 to $125,000.',
$$<p>The US Antarctic Program hires via its prime contractor Leidos and the live postings are for airfields, satellites, ships and South Pole research. The Antarctic USA jobs in this round up range from $69,550 to $195,050 per year (with deployment uplifts on top), all require US citizenship and a security clearance.</p>
<table><tbody><tr><td>Organisation</td><td>Leidos Antarctic Support Contract, prime contractor to the National Science Foundation for the United States Antarctic Program</td></tr><tr><td>Post</td><td>Satellite Systems Engineer, Antarctic Airfield Manager, Marine Fleet Coordinator, South Pole Research Associate (I), Senior Systems Engineer</td></tr><tr><td>Pay</td><td>$69,550 to $195,050 a year on the advertised ranges; Marine Fleet Coordinator $2,075 a week while deployed, plus seasonal uplift</td></tr><tr><td>Application dates</td><td>Marine Fleet Coordinator posted 19 November 2026; Satellite Systems Engineer posted 28 October 2026; no closing dates are stated on the listings checked</td></tr><tr><td>Application route</td><td>Online through the Leidos careers site</td></tr><tr><td>Qualification</td><td>US citizenship is required; a Public Trust security clearance must be obtained before starting, a process that can take up to 4 months</td></tr><tr><td>Selection</td><td>Application, clearance checks and National Science Foundation physical and dental examinations</td></tr></tbody></table>
<h2>What jobs in Antarctica USA involve</h2><p>The Satellite Systems Engineer supports enterprise satellite communications operations in Antarctica, with annual deployments during the austral summer. The Antarctic Airfield Manager supervises daily airfield operations at McMurdo Station and the South Pole airfields on a seven-month deployment. The Marine Fleet Coordinator is the most senior professional mariner at Palmer Station, advising station management on all marine operations across the austral winter season from March to November 2027. The South Pole Research Associate supports physical and astrophysical science projects with advanced instruments on a 13-month deployment, and a Senior Systems Engineer supports the programme from the US with temporary deployments as needed. Leidos supports about 150 science and technical events across McMurdo, Palmer and South Pole stations and deep field sites. Readers looking more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-us-government-20261125">jobs in the US government</a>.</p>
<h2>Who can apply</h2><p>US citizenship is a requirement for these roles due to the nature of the contract and applicants are required to be able to obtain a Public Trust security clearance prior to commencing (the listings state this can take up to pass the physical and dental exams that the NSF require for Antarctica. The Airfield Manager is an alternate role (i.e. it will only be onboarded if the primary candidate withdraws or is otherwise found to be unsuitable for deployment). The roles suit engineers, mariners and research staff who are able to live and work in the extreme conditions for many months.</p>
<h2>What it pays</h2><p>The Satellite Systems Engineer pays $140,000 to $155,000 a year, and the Antarctic Airfield Manager pays $115,000 to $125,000, with pay increases while deployed. The Marine Fleet Coordinator pays $2,075 a week while deployed, plus the US Antarctic Program seasonal uplift. The South Pole Research Associate pays up to $125,725 on the advertised range. The advertised Leidos pay ranges run wider than the anticipated salaries for each role, for example $107,900 to $195,050 for the satellite and marine posts, so treat the headline figure as the anticipated salary and the range as a general guideline only.</p>
<h2>How to apply</h2><p>Apply via the Leidos careers site (Antarctic Support Contract positions are listed under the USAP). There are no closing dates on the positions we've checked and Leidos state that each requisition will be open for a minimum of three days from the date it is first posted. Given that the clearance process can take up to four months and the medicals will take time, you should apply well in advance of the deployment season mentioned in the posting.</p>
<h2>What the notice does not say</h2><p>The listings provide no closing dates, no interview dates and no exact start dates other than the deployment windows. There's no indication of how many posts are available and no mention of whether the roles are open to non-US applicants (the citizenship requirement makes that effectively impossible). There's no detail on the deployment uplifts other than the weekly rate for the marine post.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Leidos and NSF applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://careers.leidos.com/jobs/17621158-antarctic-airfield-manager">Leidos careers</a> (Antarctic Airfield Manager: salary, length of deployment, alternate status); <a href="https://jobs.hireheroesusa.org/jobs/652773846-satellite-systems-engineer-at-leidos">Hire Heroes USA</a> (Satellite Systems Engineer: salary, length of deployment, clearance required, reproducing the Leidos listing); <a href="https://www.themuse.com/jobs/leidos/marine-fleet-coordinator-palmer-station-antarctica">The Muse</a> (Marine Fleet Coordinator: weekly pay, season dates and posting date, reproducing the Leidos listing).</p>
<h2>Frequently asked questions</h2>
<h3>Do Antarctica jobs require US citizenship?</h3>
<p>Yes, the Leidos Antarctic Support Contract roles require US citizenship under the contract terms.</p>
<h3>What is the best-paid Antarctica role here?</h3>
<p>The Satellite Systems Engineer, at $140,000 to $155,000 a year.</p>
<h3>How long is an Antarctica deployment?</h3>
<p>It varies: seven months for the Airfield Manager, 13 months for the South Pole Research Associate, and the Marine Fleet Coordinator is March to November 2027 for the Marine Fleet Coordinator.</p>
<h3>Do I need a security clearance before starting?</h3>
<p>Yes a Public Trust clearance is required prior to the start date and that can take up to four months.</p>
$$,
$$<p>The US Antarctic Program hires via its prime contractor Leidos and the live postings are for airfields, satellites, ships and South Pole research. The Antarctic USA jobs in this round up range from $69,550 to $195,050 per year (with deployment uplifts on top), all require US citizenship and a security clearance.</p>
<table><tbody><tr><td>Organisation</td><td>Leidos Antarctic Support Contract, prime contractor to the National Science Foundation for the United States Antarctic Program</td></tr><tr><td>Post</td><td>Satellite Systems Engineer, Antarctic Airfield Manager, Marine Fleet Coordinator, South Pole Research Associate (I), Senior Systems Engineer</td></tr><tr><td>Pay</td><td>$69,550 to $195,050 a year on the advertised ranges; Marine Fleet Coordinator $2,075 a week while deployed, plus seasonal uplift</td></tr><tr><td>Application dates</td><td>Marine Fleet Coordinator posted 19 November 2026; Satellite Systems Engineer posted 28 October 2026; no closing dates are stated on the listings checked</td></tr><tr><td>Application route</td><td>Online through the Leidos careers site</td></tr><tr><td>Qualification</td><td>US citizenship is required; a Public Trust security clearance must be obtained before starting, a process that can take up to 4 months</td></tr><tr><td>Selection</td><td>Application, clearance checks and National Science Foundation physical and dental examinations</td></tr></tbody></table>
<h2>What jobs in Antarctica USA involve</h2><p>The Satellite Systems Engineer supports enterprise satellite communications operations in Antarctica, with annual deployments during the austral summer. The Antarctic Airfield Manager supervises daily airfield operations at McMurdo Station and the South Pole airfields on a seven-month deployment. The Marine Fleet Coordinator is the most senior professional mariner at Palmer Station, advising station management on all marine operations across the austral winter season from March to November 2027. The South Pole Research Associate supports physical and astrophysical science projects with advanced instruments on a 13-month deployment, and a Senior Systems Engineer supports the programme from the US with temporary deployments as needed. Leidos supports about 150 science and technical events across McMurdo, Palmer and South Pole stations and deep field sites. Readers looking more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-us-government-20261125">jobs in the US government</a>.</p>
<h2>Who can apply</h2><p>US citizenship is a requirement for these roles due to the nature of the contract and applicants are required to be able to obtain a Public Trust security clearance prior to commencing (the listings state this can take up to pass the physical and dental exams that the NSF require for Antarctica. The Airfield Manager is an alternate role (i.e. it will only be onboarded if the primary candidate withdraws or is otherwise found to be unsuitable for deployment). The roles suit engineers, mariners and research staff who are able to live and work in the extreme conditions for many months.</p>
<h2>What it pays</h2><p>The Satellite Systems Engineer pays $140,000 to $155,000 a year, and the Antarctic Airfield Manager pays $115,000 to $125,000, with pay increases while deployed. The Marine Fleet Coordinator pays $2,075 a week while deployed, plus the US Antarctic Program seasonal uplift. The South Pole Research Associate pays up to $125,725 on the advertised range. The advertised Leidos pay ranges run wider than the anticipated salaries for each role, for example $107,900 to $195,050 for the satellite and marine posts, so treat the headline figure as the anticipated salary and the range as a general guideline only.</p>
<h2>How to apply</h2><p>Apply via the Leidos careers site (Antarctic Support Contract positions are listed under the USAP). There are no closing dates on the positions we've checked and Leidos state that each requisition will be open for a minimum of three days from the date it is first posted. Given that the clearance process can take up to four months and the medicals will take time, you should apply well in advance of the deployment season mentioned in the posting.</p>
<h2>What the notice does not say</h2><p>The listings provide no closing dates, no interview dates and no exact start dates other than the deployment windows. There's no indication of how many posts are available and no mention of whether the roles are open to non-US applicants (the citizenship requirement makes that effectively impossible). There's no detail on the deployment uplifts other than the weekly rate for the marine post.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Leidos and NSF applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://careers.leidos.com/jobs/17621158-antarctic-airfield-manager">Leidos careers</a> (Antarctic Airfield Manager: salary, length of deployment, alternate status); <a href="https://jobs.hireheroesusa.org/jobs/652773846-satellite-systems-engineer-at-leidos">Hire Heroes USA</a> (Satellite Systems Engineer: salary, length of deployment, clearance required, reproducing the Leidos listing); <a href="https://www.themuse.com/jobs/leidos/marine-fleet-coordinator-palmer-station-antarctica">The Muse</a> (Marine Fleet Coordinator: weekly pay, season dates and posting date, reproducing the Leidos listing).</p>
<h2>Frequently asked questions</h2>
<h3>Do Antarctica jobs require US citizenship?</h3>
<p>Yes, the Leidos Antarctic Support Contract roles require US citizenship under the contract terms.</p>
<h3>What is the best-paid Antarctica role here?</h3>
<p>The Satellite Systems Engineer, at $140,000 to $155,000 a year.</p>
<h3>How long is an Antarctica deployment?</h3>
<p>It varies: seven months for the Airfield Manager, 13 months for the South Pole Research Associate, and the Marine Fleet Coordinator is March to November 2027 for the Marine Fleet Coordinator.</p>
<h3>Do I need a security clearance before starting?</h3>
<p>Yes a Public Trust clearance is required prior to the start date and that can take up to four months.</p>
$$,
ARRAY['https://careers.leidos.com/jobs/17621158-antarctic-airfield-manager', 'https://jobs.hireheroesusa.org/jobs/652773846-satellite-systems-engineer-at-leidos', 'https://www.themuse.com/jobs/leidos/marine-fleet-coordinator-palmer-station-antarctica'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-atlanta-usa-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-atlanta-usa-20261128', 'usa', 'USA',
'Jobs in Atlanta USA: Park Manager Pays $90,000',
'Jobs in Atlanta USA: Park Manager Pays $90,000',
'Jobs in Atlanta USA include a Park Design Program Manager at $80,594 to $90,000 and a Data Analyst at $47,474 to $63,342 a year.',
'Jobs in Atlanta USA include a Park Design Program Manager at $80,594 to $90,000 and a Data Analyst at $47,474 to $63,342 a year.',
$$<p>The City of Atlanta is hiring a parks programme manager, a planning data analyst and administrative staff, with the live postings expiring between 28 November and 9 December 2026. Jobs in Atlanta USA in this roundup pay from $47,474 to $90,000 a year, and the parks role is the best-paid one still open.</p>
<table><tbody><tr><td>Organisation</td><td>City of Atlanta</td></tr><tr><td>Post</td><td>Program Manager - Park Design, Data/Reporting Analyst II, Administrative Assistant III, Urban Planner III, APD Background Investigator I</td></tr><tr><td>Pay</td><td>$47,474 to $90,000 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Administrative Assistant III expires 28 November 2026; Program Manager - Park Design expires 7 December 2026; Data/Reporting Analyst II expires 9 December 2026; Urban Planner III and Background Investigator I have closed</td></tr><tr><td>Application route</td><td>Online through the City of Atlanta careers page</td></tr><tr><td>Qualification</td><td>Five to ten years of experience for the Program Manager; planning and data experience for the Analyst</td></tr><tr><td>Selection</td><td>Online application before the posting expiry date</td></tr></tbody></table>
<h2>What jobs in Atlanta USA involve</h2><p>The Program Manager - Park Design (Parks and Rec) - leads the process improvement and re-engineering work for the department, and the role is in-person. The Data/Reporting Analyst II - City Planning - is responsible for assigning and updating street addresses, street names and subdivision names. Administrative Assistant III - provides advanced admin and clerical support in the Office of the City Solicitor. The Urban Planner III (now closed) was responsible for transport planning and road safety projects with a specific focus on pedestrian and cyclist safety. For a broader look you can browse the <a href="https://growentix.cloud/usa">USA jobs</a> or check out our roundup of <a href="https://growentix.cloud/articles/jobs-in-georgia-usa-20261127">jobs in Georgia USA</a>.</p>
<h2>Who can apply</h2><p>The posts are open to eligible applicants and the City is an equal opportunity employer. The Program Manager position requires five to ten years of experience, and the Analyst role requires substantial reporting and analysis experience. There is no stated requirement as to nationality but applicants must be authorised to work in the US.</p>
<h2>What it pays</h2><p>The Program Manager - Park Design pays $80,594 to $90,000 a year. The Data/Reporting Analyst II pays $47,474.94 to $63,342, and the Administrative Assistant III pays $48,000. The Urban Planner III, now closed, paid $73,268.14 to $85,511.70, and the Background Investigator I, now closed, paid $51,035.56. City roles carry City of Atlanta employee benefits.</p>
<h2>How to apply</h2><p>Apply online via the City of Atlanta careers page before the posting expiry dates. The Administrative Assistant III expires on 28 November 2026, so it is the most urgent, followed by the Program Manager - Park Design (7 December 2026) and the Data/Reporting Analyst II (9 December 2026). There's also seasonal warehouse hiring around Atlanta for the holiday peak with roles at UPS, Macy's and Ford all advertised at between $15 and $21 an hour. Those are all short term roles which will finish post-holidays.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, none state interview dates or start dates and none indicate whether visa sponsorship is available. The Urban Planner III and APD Background Investigator I posts have both expired (24 and 25 November 2026 respectively) so you shouldn't be applying for those from this round up.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Atlanta applications are free and no agency will ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://app.hirelayer.ai/job/1a74a9d3-80f3-4032-a288-4117c2714faa">HireLayer</a> (Program Manager - Park Design: salary and expiry date, as per the City of Atlanta posting); <a href="https://www.dice.com/job-detail/727a2f7e-bf13-44cf-89f0-f99ec0c8fab9">Dice</a> (Data/Reporting Analyst II: salary and expiry date, as per the City of Atlanta posting); <a href="https://www.talent.com/view?id=607315070495297682">Talent.com</a> (Administrative Assistant III: salary and expiry date, as per the City of Atlanta posting).</p>
<h2>Frequently asked questions</h2>
<h3>What is the best-paid open Atlanta role here?</h3>
<p>The Program Manager - Park Design, at $80,594 to $90,000 a year.</p>
<h3>When does the Atlanta Park Design role expire?</h3>
<p>On 7 December 2026.</p>
<h3>Is the Atlanta Urban Planner III role still open?</h3>
<p>No, it expired on 24 November 2026.</p>
<h3>Where do I apply for City of Atlanta jobs?</h3>
<p>Online through the City of Atlanta careers page.</p>
$$,
$$<p>The City of Atlanta is hiring a parks programme manager, a planning data analyst and administrative staff, with the live postings expiring between 28 November and 9 December 2026. Jobs in Atlanta USA in this roundup pay from $47,474 to $90,000 a year, and the parks role is the best-paid one still open.</p>
<table><tbody><tr><td>Organisation</td><td>City of Atlanta</td></tr><tr><td>Post</td><td>Program Manager - Park Design, Data/Reporting Analyst II, Administrative Assistant III, Urban Planner III, APD Background Investigator I</td></tr><tr><td>Pay</td><td>$47,474 to $90,000 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Administrative Assistant III expires 28 November 2026; Program Manager - Park Design expires 7 December 2026; Data/Reporting Analyst II expires 9 December 2026; Urban Planner III and Background Investigator I have closed</td></tr><tr><td>Application route</td><td>Online through the City of Atlanta careers page</td></tr><tr><td>Qualification</td><td>Five to ten years of experience for the Program Manager; planning and data experience for the Analyst</td></tr><tr><td>Selection</td><td>Online application before the posting expiry date</td></tr></tbody></table>
<h2>What jobs in Atlanta USA involve</h2><p>The Program Manager - Park Design (Parks and Rec) - leads the process improvement and re-engineering work for the department, and the role is in-person. The Data/Reporting Analyst II - City Planning - is responsible for assigning and updating street addresses, street names and subdivision names. Administrative Assistant III - provides advanced admin and clerical support in the Office of the City Solicitor. The Urban Planner III (now closed) was responsible for transport planning and road safety projects with a specific focus on pedestrian and cyclist safety. For a broader look you can browse the <a href="https://growentix.cloud/usa">USA jobs</a> or check out our roundup of <a href="https://growentix.cloud/articles/jobs-in-georgia-usa-20261127">jobs in Georgia USA</a>.</p>
<h2>Who can apply</h2><p>The posts are open to eligible applicants and the City is an equal opportunity employer. The Program Manager position requires five to ten years of experience, and the Analyst role requires substantial reporting and analysis experience. There is no stated requirement as to nationality but applicants must be authorised to work in the US.</p>
<h2>What it pays</h2><p>The Program Manager - Park Design pays $80,594 to $90,000 a year. The Data/Reporting Analyst II pays $47,474.94 to $63,342, and the Administrative Assistant III pays $48,000. The Urban Planner III, now closed, paid $73,268.14 to $85,511.70, and the Background Investigator I, now closed, paid $51,035.56. City roles carry City of Atlanta employee benefits.</p>
<h2>How to apply</h2><p>Apply online via the City of Atlanta careers page before the posting expiry dates. The Administrative Assistant III expires on 28 November 2026, so it is the most urgent, followed by the Program Manager - Park Design (7 December 2026) and the Data/Reporting Analyst II (9 December 2026). There's also seasonal warehouse hiring around Atlanta for the holiday peak with roles at UPS, Macy's and Ford all advertised at between $15 and $21 an hour. Those are all short term roles which will finish post-holidays.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, none state interview dates or start dates and none indicate whether visa sponsorship is available. The Urban Planner III and APD Background Investigator I posts have both expired (24 and 25 November 2026 respectively) so you shouldn't be applying for those from this round up.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Atlanta applications are free and no agency will ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://app.hirelayer.ai/job/1a74a9d3-80f3-4032-a288-4117c2714faa">HireLayer</a> (Program Manager - Park Design: salary and expiry date, as per the City of Atlanta posting); <a href="https://www.dice.com/job-detail/727a2f7e-bf13-44cf-89f0-f99ec0c8fab9">Dice</a> (Data/Reporting Analyst II: salary and expiry date, as per the City of Atlanta posting); <a href="https://www.talent.com/view?id=607315070495297682">Talent.com</a> (Administrative Assistant III: salary and expiry date, as per the City of Atlanta posting).</p>
<h2>Frequently asked questions</h2>
<h3>What is the best-paid open Atlanta role here?</h3>
<p>The Program Manager - Park Design, at $80,594 to $90,000 a year.</p>
<h3>When does the Atlanta Park Design role expire?</h3>
<p>On 7 December 2026.</p>
<h3>Is the Atlanta Urban Planner III role still open?</h3>
<p>No, it expired on 24 November 2026.</p>
<h3>Where do I apply for City of Atlanta jobs?</h3>
<p>Online through the City of Atlanta careers page.</p>
$$,
ARRAY['https://app.hirelayer.ai/job/1a74a9d3-80f3-4032-a288-4117c2714faa', 'https://www.dice.com/job-detail/727a2f7e-bf13-44cf-89f0-f99ec0c8fab9', 'https://www.talent.com/view?id=607315070495297682'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-chicago-usa-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-chicago-usa-20261128', 'usa', 'USA',
'Jobs in Chicago USA: City Roles Pay Up to $197,100',
'Jobs in Chicago USA: City Roles Pay Up to $197,100',
'Jobs in Chicago USA include an Airport Operations Supervisor at $77,628 to $130,620 and an Assistant US Attorney at up to $197,100 a year.',
'Jobs in Chicago USA include an Airport Operations Supervisor at $77,628 to $130,620 and an Assistant US Attorney at up to $197,100 a year.',
$$<p>The City of Chicago and federal agencies are hiring across aviation, public health, law and border operations this week. The jobs in Chicago USA in this roundup pay from $50,762 to $197,100 per year and the two highest paying city positions are due to close within days (1st and 9th December 2026.</p>
<table><tbody><tr><td>Organisation</td><td>City of Chicago; US Department of Justice; US Customs and Border Protection; US Department of Veterans Affairs</td></tr><tr><td>Post</td><td>Airport Operations Supervisor I, Director of Human Resources, Assistant US Attorney (Criminal), Mission Support Specialist (Facilities), Program Support Assistant</td></tr><tr><td>Pay</td><td>$50,762 to $197,100 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Director of Human Resources closes 1 December 2026; Airport Operations Supervisor closes 9 December 2026; Assistant US Attorney closes 30 April 2027; Program Support Assistant closes 3 December 2026</td></tr><tr><td>Application route</td><td>Online through the City of Chicago careers portal and USAJOBS</td></tr><tr><td>Qualification</td><td>Law degree and bar membership for the Attorney role; senior HR leadership experience for the Director role</td></tr><tr><td>Selection</td><td>Application and assessment; the VA support role is open to internal agency applicants only</td></tr></tbody></table>
<h2>What jobs in Chicago USA involve</h2><p>The Airport Operations Supervisor I works in the Airfield Operations Division at O'Hare International Airport, supervising day-to-day airfield operations for the Chicago Department of Aviation. The Director of Human Resources leads the HR unit of the Chicago Department of Public Health from its Washington Street office, working with executive leadership on workforce strategy. The Assistant US Attorney (Criminal) prosecutes federal criminal cases for the Northern District of Illinois. At the same time, the Customs and Border Protection Mission Support Specialist coordinates facilities, physical security and emergency planning for the Chicago Field Office. The Veterans Health Administration also needs a Program Support Assistant in its Nutrition and Food Services Department. Readers looking more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-boston-usa-20261127">jobs in Boston USA</a>.</p>
<h2>Who can apply</h2><p>The City roles are open to the public and to current City employees. The City describes itself as a fair chance employer and one that is open to people with prior convictions. The Assistant US Attorney positions are open to the public. The applicants for those roles will need to be lawyers (have a JD and be in good standing with the bar), have the requisite eligibility for a Top Secret clearance and generally will be required to live in the district or within 25 miles of it. The Mission Support Specialist position is open to federal employees and other eligible groups. The Veterans Health Administration support role is an internal agency position and so is not open to outside applicants cannot apply for that one.</p>
<h2>What it pays</h2><p> Assistant US Attorney: $85,796 - $197,100 (depending on experience) Director of Human Resources: $125,316 - $141,660 Airport Operations Supervisor I: $77,628 - $130,620 Mission Support Specialist: $82,655 - $128,795 (with promotion potential to $153,151) Program Support Assistant: $50,762 - $65,990 All federal positions come with federal benefits and all city positions come with City of Chicago employee benefits.</p>
<h2>How to apply</h2><p>City roles are applied for via the City of Chicago careers portal (applicants search by job number and apply online). The Airport Operations Supervisor closes at 11:59pm CT on 9 Dec 2026 and the Human Resources Director at 11:59pm CT on 1 Dec 2026. Federal roles go through USAJOBS, where the Assistant US Attorney announcement stays open until 30 April 2027 or until the posts are filled, and the Program Support Assistant closes on 3 December 2026. City applicants who are already employed by the City of Chicago must tick the "Currently employed by the City of Chicago" box on their profile.</p>
<h2>What the notice does not say</h2><p>None of the listings say how many posts are available, none give interview dates or start dates. The Mission Support Specialist listing gives no closing date in the version we checked. None of the listings indicate whether visa sponsorship is available so international applicants should check directly with the hiring agency prior to applying.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Both City of Chicago and federal applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://chicago.taleo.net/careersection/103/jobsearch.ftl?lang=en">City of Chicago careers portal</a> (Airport Operations Supervisor and Director of Human Resources: salary, closing dates and application route); <a href="https://careers.org/jobs/890353100">Careers.org</a> (Assistant US Attorney, Chicago: salary, closing date and eligibility, reproducing the USAJOBS announcement); <a href="https://www.usajobs.gov:443/job/837499700">USAJOBS</a> (Mission Support Specialist, Chicago Field Office: salary and duties).</p>
<h2>Frequently asked questions</h2>
<h3>What's the highest paid role in Chicago according to this list?</h3>
<p>The Assistant U.S. Attorney (Criminal) at $85,796 to $197,100 per year.</p>
<h3>When does the Chicago Airport Operations Supervisor role close?</h3>
<p>At 11.59pm Central Time on 9th December 2026.</p>
<h3>Can anyone apply for the VA Program Support Assistant role?</h3>
<p>No, that announcement is purely internal to the VHA.</p>
<h3>Where do I apply for City of Chicago jobs?</h3>
<p>Via the City of Chicago careers site; federal positions are posted via USAJOBS.</p>
$$,
$$<p>The City of Chicago and federal agencies are hiring across aviation, public health, law and border operations this week. The jobs in Chicago USA in this roundup pay from $50,762 to $197,100 per year and the two highest paying city positions are due to close within days (1st and 9th December 2026.</p>
<table><tbody><tr><td>Organisation</td><td>City of Chicago; US Department of Justice; US Customs and Border Protection; US Department of Veterans Affairs</td></tr><tr><td>Post</td><td>Airport Operations Supervisor I, Director of Human Resources, Assistant US Attorney (Criminal), Mission Support Specialist (Facilities), Program Support Assistant</td></tr><tr><td>Pay</td><td>$50,762 to $197,100 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Director of Human Resources closes 1 December 2026; Airport Operations Supervisor closes 9 December 2026; Assistant US Attorney closes 30 April 2027; Program Support Assistant closes 3 December 2026</td></tr><tr><td>Application route</td><td>Online through the City of Chicago careers portal and USAJOBS</td></tr><tr><td>Qualification</td><td>Law degree and bar membership for the Attorney role; senior HR leadership experience for the Director role</td></tr><tr><td>Selection</td><td>Application and assessment; the VA support role is open to internal agency applicants only</td></tr></tbody></table>
<h2>What jobs in Chicago USA involve</h2><p>The Airport Operations Supervisor I works in the Airfield Operations Division at O'Hare International Airport, supervising day-to-day airfield operations for the Chicago Department of Aviation. The Director of Human Resources leads the HR unit of the Chicago Department of Public Health from its Washington Street office, working with executive leadership on workforce strategy. The Assistant US Attorney (Criminal) prosecutes federal criminal cases for the Northern District of Illinois. At the same time, the Customs and Border Protection Mission Support Specialist coordinates facilities, physical security and emergency planning for the Chicago Field Office. The Veterans Health Administration also needs a Program Support Assistant in its Nutrition and Food Services Department. Readers looking more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-boston-usa-20261127">jobs in Boston USA</a>.</p>
<h2>Who can apply</h2><p>The City roles are open to the public and to current City employees. The City describes itself as a fair chance employer and one that is open to people with prior convictions. The Assistant US Attorney positions are open to the public. The applicants for those roles will need to be lawyers (have a JD and be in good standing with the bar), have the requisite eligibility for a Top Secret clearance and generally will be required to live in the district or within 25 miles of it. The Mission Support Specialist position is open to federal employees and other eligible groups. The Veterans Health Administration support role is an internal agency position and so is not open to outside applicants cannot apply for that one.</p>
<h2>What it pays</h2><p> Assistant US Attorney: $85,796 - $197,100 (depending on experience) Director of Human Resources: $125,316 - $141,660 Airport Operations Supervisor I: $77,628 - $130,620 Mission Support Specialist: $82,655 - $128,795 (with promotion potential to $153,151) Program Support Assistant: $50,762 - $65,990 All federal positions come with federal benefits and all city positions come with City of Chicago employee benefits.</p>
<h2>How to apply</h2><p>City roles are applied for via the City of Chicago careers portal (applicants search by job number and apply online). The Airport Operations Supervisor closes at 11:59pm CT on 9 Dec 2026 and the Human Resources Director at 11:59pm CT on 1 Dec 2026. Federal roles go through USAJOBS, where the Assistant US Attorney announcement stays open until 30 April 2027 or until the posts are filled, and the Program Support Assistant closes on 3 December 2026. City applicants who are already employed by the City of Chicago must tick the "Currently employed by the City of Chicago" box on their profile.</p>
<h2>What the notice does not say</h2><p>None of the listings say how many posts are available, none give interview dates or start dates. The Mission Support Specialist listing gives no closing date in the version we checked. None of the listings indicate whether visa sponsorship is available so international applicants should check directly with the hiring agency prior to applying.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Both City of Chicago and federal applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://chicago.taleo.net/careersection/103/jobsearch.ftl?lang=en">City of Chicago careers portal</a> (Airport Operations Supervisor and Director of Human Resources: salary, closing dates and application route); <a href="https://careers.org/jobs/890353100">Careers.org</a> (Assistant US Attorney, Chicago: salary, closing date and eligibility, reproducing the USAJOBS announcement); <a href="https://www.usajobs.gov:443/job/837499700">USAJOBS</a> (Mission Support Specialist, Chicago Field Office: salary and duties).</p>
<h2>Frequently asked questions</h2>
<h3>What's the highest paid role in Chicago according to this list?</h3>
<p>The Assistant U.S. Attorney (Criminal) at $85,796 to $197,100 per year.</p>
<h3>When does the Chicago Airport Operations Supervisor role close?</h3>
<p>At 11.59pm Central Time on 9th December 2026.</p>
<h3>Can anyone apply for the VA Program Support Assistant role?</h3>
<p>No, that announcement is purely internal to the VHA.</p>
<h3>Where do I apply for City of Chicago jobs?</h3>
<p>Via the City of Chicago careers site; federal positions are posted via USAJOBS.</p>
$$,
ARRAY['https://chicago.taleo.net/careersection/103/jobsearch.ftl?lang=en', 'https://careers.org/jobs/890353100', 'https://www.usajobs.gov:443/job/837499700'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-houston-usa-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-houston-usa-20261128', 'usa', 'USA',
'Jobs in Houston USA: Planner Manager Pays $131,529',
'Jobs in Houston USA: Planner Manager Pays $131,529',
'Jobs in Houston USA include a Planner Manager at $116,377 to $131,529 and an Administrative Specialist at $57,434 to $78,000 a year.',
'Jobs in Houston USA include a Planner Manager at $116,377 to $131,529 and an Administrative Specialist at $57,434 to $78,000 a year.',
$$<p>The City of Houston is recruiting across Public Works, Planning and Finance with the majority of the live postings closing on 30 November 2026. The Houston USA jobs in this round are ranging from $52,208 to $156,653 per year, though the highest paid legal position has already closed.</p>
<table><tbody><tr><td>Organisation</td><td>City of Houston</td></tr><tr><td>Post</td><td>Planner Manager, Public Works Maintenance Manager, Administrative Specialist, Financial Analyst II, Senior Assistant City Attorney</td></tr><tr><td>Pay</td><td>$52,208 to $156,653 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Planner Manager, Maintenance Manager and Administrative Specialist close 30 November 2026; Financial Analyst II closes 1 December 2026; Senior Assistant City Attorney closed 6 November 2026</td></tr><tr><td>Application route</td><td>Online only through the City of Houston careers website</td></tr><tr><td>Qualification</td><td>Thirteen years of legal practice and Texas Bar membership for the Senior Assistant City Attorney role</td></tr><tr><td>Selection</td><td>Online application within the posting window; only online applications are accepted</td></tr></tbody></table>
<h2>What jobs in Houston USA involve</h2><p>The Planner Manager is in Houston Public Works, leading planning function for the department which manages the city's water, wastewater and streets. The Public Works Maintenance Manager is in charge of the drinking water operations. The Administrative Specialist is in the Planning and Development Department which is responsible for public safety, infrastructure and quality of life for more than two million people. The Financial Analyst II works with the various city departments on financial performance, trends and reporting. The Senior Assistant City Attorney (now closed) was in the city's Legal Department. For those who want to look further afield, there's the <a href="https://growentix.cloud/usa">USA jobs site</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-dallas-usa-20261127">jobs in Dallas USA</a>.</p>
<h2>Who can apply</h2><p>Applications are open to all who are interested and only online applications received during the posting window will be considered. The Senior Assistant City Attorney position required a minimum of 13 years of legal practice and active membership in the Texas State Bar, plus eligibility for admission to federal court. The other positions in the listing don't specify any nationality or residency requirement in the listings that we've checked, though all applicants will of course need to be authorised to work in the US.</p>
<h2>What it pays</h2><p> Planner Manager pays $116,377.82 to $131,529.84 a year. The Public Works Maintenance Manager $3,495-$4,122 every two weeks (approx $90,870-$107,172). Administrative Specialist pays $57,434 to $78,000, and the Financial Analyst II $2,369.90-$2,737.81 every two weeks. Senior Assistant City Attorney (now closed) $123,630-$156,653.12. All city positions have City of Houston employee benefits.</p>
<h2>How to apply</h2><p>Apply online only via the City of Houston careers website (which is hosted on governmentjobs.com). The Planner Manager, Maintenance Manager and Administrative Specialist all close at 11:59pm Central Time on 30 November 2026 and the Financial Analyst II closes at 11:59pm Central Time on 1 December 2026. All applications must be received by the Human Resources Department during the posting opening and closing dates as stated on each notice.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, none give interview dates or start dates. The listings as to whether visa sponsorship is available and the only detail given on the selection process is that there will be an online application. The Senior Assistant City Attorney closing date of 6th November 2026 has long since passed so you wouldn't apply for that post from this round up.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Houston applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://www.governmentjobs.com/careers/houston">City of Houston careers website</a> (application route for all roles); <a href="https://www.theladders.com/job/planner-manager-city-of-houston-tx-houston-tx_89818159?source=similar">The Ladders</a> (Planner Manager: salary, opening and closing dates, reproducing the city notice); <a href="https://aylagov.com/jobs/administrative-specialist-city-of-houston-houston/387e527d-1b33-4175-94d4-cae83a3e2d30">Ayla</a> (Administrative Specialist: salary and closing date, reproducing the city notice).</p>
<h2>Frequently asked questions</h2>
<h3>When do the Houston city roles close?</h3>
<p>Most close at 11.59pm Central Time on 30 November 2026; the Financial Analyst II closes on 1 December 2026.</p>
<h3>What's the best paid open Houston role?</h3>
<p>The Planner Manager in Houston Public Works at $116,377.82 to $131,529.84 per annum.</p>
<h3>Is the Senior Assistant City Attorney still open?</h3>
<p>No, it closed on 6 November 2026.</p>
<h3>Where do I apply for City of Houston jobs?</h3>
<p>Online only via the City of Houston careers site on governmentjobs.com.</p>
$$,
$$<p>The City of Houston is recruiting across Public Works, Planning and Finance with the majority of the live postings closing on 30 November 2026. The Houston USA jobs in this round are ranging from $52,208 to $156,653 per year, though the highest paid legal position has already closed.</p>
<table><tbody><tr><td>Organisation</td><td>City of Houston</td></tr><tr><td>Post</td><td>Planner Manager, Public Works Maintenance Manager, Administrative Specialist, Financial Analyst II, Senior Assistant City Attorney</td></tr><tr><td>Pay</td><td>$52,208 to $156,653 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Planner Manager, Maintenance Manager and Administrative Specialist close 30 November 2026; Financial Analyst II closes 1 December 2026; Senior Assistant City Attorney closed 6 November 2026</td></tr><tr><td>Application route</td><td>Online only through the City of Houston careers website</td></tr><tr><td>Qualification</td><td>Thirteen years of legal practice and Texas Bar membership for the Senior Assistant City Attorney role</td></tr><tr><td>Selection</td><td>Online application within the posting window; only online applications are accepted</td></tr></tbody></table>
<h2>What jobs in Houston USA involve</h2><p>The Planner Manager is in Houston Public Works, leading planning function for the department which manages the city's water, wastewater and streets. The Public Works Maintenance Manager is in charge of the drinking water operations. The Administrative Specialist is in the Planning and Development Department which is responsible for public safety, infrastructure and quality of life for more than two million people. The Financial Analyst II works with the various city departments on financial performance, trends and reporting. The Senior Assistant City Attorney (now closed) was in the city's Legal Department. For those who want to look further afield, there's the <a href="https://growentix.cloud/usa">USA jobs site</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-dallas-usa-20261127">jobs in Dallas USA</a>.</p>
<h2>Who can apply</h2><p>Applications are open to all who are interested and only online applications received during the posting window will be considered. The Senior Assistant City Attorney position required a minimum of 13 years of legal practice and active membership in the Texas State Bar, plus eligibility for admission to federal court. The other positions in the listing don't specify any nationality or residency requirement in the listings that we've checked, though all applicants will of course need to be authorised to work in the US.</p>
<h2>What it pays</h2><p> Planner Manager pays $116,377.82 to $131,529.84 a year. The Public Works Maintenance Manager $3,495-$4,122 every two weeks (approx $90,870-$107,172). Administrative Specialist pays $57,434 to $78,000, and the Financial Analyst II $2,369.90-$2,737.81 every two weeks. Senior Assistant City Attorney (now closed) $123,630-$156,653.12. All city positions have City of Houston employee benefits.</p>
<h2>How to apply</h2><p>Apply online only via the City of Houston careers website (which is hosted on governmentjobs.com). The Planner Manager, Maintenance Manager and Administrative Specialist all close at 11:59pm Central Time on 30 November 2026 and the Financial Analyst II closes at 11:59pm Central Time on 1 December 2026. All applications must be received by the Human Resources Department during the posting opening and closing dates as stated on each notice.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, none give interview dates or start dates. The listings as to whether visa sponsorship is available and the only detail given on the selection process is that there will be an online application. The Senior Assistant City Attorney closing date of 6th November 2026 has long since passed so you wouldn't apply for that post from this round up.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Houston applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://www.governmentjobs.com/careers/houston">City of Houston careers website</a> (application route for all roles); <a href="https://www.theladders.com/job/planner-manager-city-of-houston-tx-houston-tx_89818159?source=similar">The Ladders</a> (Planner Manager: salary, opening and closing dates, reproducing the city notice); <a href="https://aylagov.com/jobs/administrative-specialist-city-of-houston-houston/387e527d-1b33-4175-94d4-cae83a3e2d30">Ayla</a> (Administrative Specialist: salary and closing date, reproducing the city notice).</p>
<h2>Frequently asked questions</h2>
<h3>When do the Houston city roles close?</h3>
<p>Most close at 11.59pm Central Time on 30 November 2026; the Financial Analyst II closes on 1 December 2026.</p>
<h3>What's the best paid open Houston role?</h3>
<p>The Planner Manager in Houston Public Works at $116,377.82 to $131,529.84 per annum.</p>
<h3>Is the Senior Assistant City Attorney still open?</h3>
<p>No, it closed on 6 November 2026.</p>
<h3>Where do I apply for City of Houston jobs?</h3>
<p>Online only via the City of Houston careers site on governmentjobs.com.</p>
$$,
ARRAY['https://www.governmentjobs.com/careers/houston', 'https://www.theladders.com/job/planner-manager-city-of-houston-tx-houston-tx_89818159?source=similar', 'https://aylagov.com/jobs/administrative-specialist-city-of-houston-houston/387e527d-1b33-4175-94d4-cae83a3e2d30'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-phoenix-usa-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-phoenix-usa-20261128', 'usa', 'USA',
'Jobs in Phoenix USA: Police Roles Pay $109,984',
'Jobs in Phoenix USA: Police Roles Pay $109,984',
'Jobs in Phoenix USA include a lateral police officer at $75,847 to $109,984 with a $7,500 bonus and a Structural Plans Engineer at up to $140,337.',
'Jobs in Phoenix USA include a lateral police officer at $75,847 to $109,984 with a $7,500 bonus and a Structural Plans Engineer at up to $140,337.',
$$<p>The City of Phoenix is hiring across policing, engineering, planning and city leadership with the police lateral transfer window closing 30th November 2026. The jobs in Phoenix USA in this round are paying from $33.27/hour to $351,755/year, although the two highest paying roles have now closed.</p>
<table><tbody><tr><td>Organisation</td><td>City of Phoenix</td></tr><tr><td>Post</td><td>Lateral Police Officer/Peace Officer, Structural Plans Engineer, Council Reporter, Public Works Director, Fire Marshal, Deputy City Manager</td></tr><tr><td>Pay</td><td>$33.27 an hour to $351,755 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Police lateral transfer and Council Reporter close 30 November 2026; Structural Plans Engineer closes 8 December 2026; Deputy City Manager closed 23 November 2026</td></tr><tr><td>Application route</td><td>Online through the City of Phoenix careers site</td></tr><tr><td>Qualification</td><td>Current or former peace officer status for the lateral police transfer; engineering qualifications for the Structural Plans Engineer</td></tr><tr><td>Selection</td><td>Application and assessment; police applicants must meet department standards</td></tr></tbody></table>
<h2>What jobs in Phoenix USA involve</h2><p>The lateral Police Officer/Peace Officer joins the Phoenix Police Department, which is offering a $7,500 hiring bonus to new officers. The Structural Plans Engineer in the Planning and Development Department reviews complex building construction plans for compliance with adopted codes. The Council Reporter supports the City Council from the City Clerk Department, while the Public Works Director leads the department that delivers solid waste, fleet, facilities and energy services. The Fire Marshal leads fire prevention work for the Phoenix Fire Department. Readers looking more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-dallas-usa-20261127">jobs in Dallas USA</a>.</p>
<h2>Who can apply</h2><p>The police lateral transfer is for serving or former peace officers transferring into the Phoenix Police Department. The Engineering, Reporter, Director and Fire Marshal positions are open to qualified applicants with the appropriate professional background. The City is an equal opportunity employer and the listings do not indicate any nationality requirement, although applicants must be authorised to work in the US.</p>
<h2>What it pays</h2><p>Lateral police officer: $36.46 to $52.87 an hour ($75,847.20 to $109,984.16 per annum) plus a $7,500 hiring bonus with merit step increases of approximately 5% per year up to $107,827. Structural Plans Engineer: $104,728 to $140,337.60 per annum. Council Reporter: $33.27 to $44.58 an hour. Public Works Director: $179,000 to $233,000. Fire Marshal: $172,000. Deputy City Manager (now closed): $256,796.80 to $351,755.</p>
<h2>How to apply</h2><p>Apply online via the City of Phoenix careers site (each vacancy has a job code and ID number). The Police Lateral Transfer and the Council Reporter both close on 30 November 2026 with all applications due by 11.59pm on that date. The Structural Plans Engineer closes on 8 December 2026. Police lateral applicants can find the details of the lateral process on the department's recruitment page.</p>
<h2>What the notice does not say</h2><p>None of the listings say how many posts are available, none state interview dates or start dates and none indicate whether visa sponsorship is available. The Deputy City Manager and Forensic Scientist IV (DNA) closing dates of 23 and 19 November 2026 have both now passed so you shouldn't be applying for those roles from this round.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Phoenix applications are free and no agency will ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://www.levels.fyi/jobs/company/city-of-phoenix">Levels.fyi</a> (City of Phoenix roles: salaries and closing dates, reproducing the city notices); <a href="https://joinphxpd.com/sworn/laterals/">Phoenix Police Department</a> (lateral transfer process); <a href="https://movojobs.com/city-of-phoenix/jobs/lateral-transfer-police-officer-peace-officer-november-2026-10980804">MovoJobs</a> (lateral police officer: salary, bonus and closing date, reproducing the city notice).</p>
<h2>Frequently asked questions</h2>
<h3>What bonus does the Phoenix police lateral transfer have?</h3>
<p>A $7,500 hiring bonus for new Police Officer/Peace Officers.</p>
<h3>When does the Phoenix police recruitment close?</h3>
<p>On 30 November 2026, with all materials due by 11:59 pm.</p>
<h3>What is the best-paid open Phoenix role here?</h3>
<p>The Public Works Director, at $179,000 to $233,000 a year.</p>
<h3>Is the Deputy City Manager position still open?</h3>
<p>No, it closed on 23 November 2026.</p>
$$,
$$<p>The City of Phoenix is hiring across policing, engineering, planning and city leadership with the police lateral transfer window closing 30th November 2026. The jobs in Phoenix USA in this round are paying from $33.27/hour to $351,755/year, although the two highest paying roles have now closed.</p>
<table><tbody><tr><td>Organisation</td><td>City of Phoenix</td></tr><tr><td>Post</td><td>Lateral Police Officer/Peace Officer, Structural Plans Engineer, Council Reporter, Public Works Director, Fire Marshal, Deputy City Manager</td></tr><tr><td>Pay</td><td>$33.27 an hour to $351,755 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Police lateral transfer and Council Reporter close 30 November 2026; Structural Plans Engineer closes 8 December 2026; Deputy City Manager closed 23 November 2026</td></tr><tr><td>Application route</td><td>Online through the City of Phoenix careers site</td></tr><tr><td>Qualification</td><td>Current or former peace officer status for the lateral police transfer; engineering qualifications for the Structural Plans Engineer</td></tr><tr><td>Selection</td><td>Application and assessment; police applicants must meet department standards</td></tr></tbody></table>
<h2>What jobs in Phoenix USA involve</h2><p>The lateral Police Officer/Peace Officer joins the Phoenix Police Department, which is offering a $7,500 hiring bonus to new officers. The Structural Plans Engineer in the Planning and Development Department reviews complex building construction plans for compliance with adopted codes. The Council Reporter supports the City Council from the City Clerk Department, while the Public Works Director leads the department that delivers solid waste, fleet, facilities and energy services. The Fire Marshal leads fire prevention work for the Phoenix Fire Department. Readers looking more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-dallas-usa-20261127">jobs in Dallas USA</a>.</p>
<h2>Who can apply</h2><p>The police lateral transfer is for serving or former peace officers transferring into the Phoenix Police Department. The Engineering, Reporter, Director and Fire Marshal positions are open to qualified applicants with the appropriate professional background. The City is an equal opportunity employer and the listings do not indicate any nationality requirement, although applicants must be authorised to work in the US.</p>
<h2>What it pays</h2><p>Lateral police officer: $36.46 to $52.87 an hour ($75,847.20 to $109,984.16 per annum) plus a $7,500 hiring bonus with merit step increases of approximately 5% per year up to $107,827. Structural Plans Engineer: $104,728 to $140,337.60 per annum. Council Reporter: $33.27 to $44.58 an hour. Public Works Director: $179,000 to $233,000. Fire Marshal: $172,000. Deputy City Manager (now closed): $256,796.80 to $351,755.</p>
<h2>How to apply</h2><p>Apply online via the City of Phoenix careers site (each vacancy has a job code and ID number). The Police Lateral Transfer and the Council Reporter both close on 30 November 2026 with all applications due by 11.59pm on that date. The Structural Plans Engineer closes on 8 December 2026. Police lateral applicants can find the details of the lateral process on the department's recruitment page.</p>
<h2>What the notice does not say</h2><p>None of the listings say how many posts are available, none state interview dates or start dates and none indicate whether visa sponsorship is available. The Deputy City Manager and Forensic Scientist IV (DNA) closing dates of 23 and 19 November 2026 have both now passed so you shouldn't be applying for those roles from this round.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Phoenix applications are free and no agency will ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://www.levels.fyi/jobs/company/city-of-phoenix">Levels.fyi</a> (City of Phoenix roles: salaries and closing dates, reproducing the city notices); <a href="https://joinphxpd.com/sworn/laterals/">Phoenix Police Department</a> (lateral transfer process); <a href="https://movojobs.com/city-of-phoenix/jobs/lateral-transfer-police-officer-peace-officer-november-2026-10980804">MovoJobs</a> (lateral police officer: salary, bonus and closing date, reproducing the city notice).</p>
<h2>Frequently asked questions</h2>
<h3>What bonus does the Phoenix police lateral transfer have?</h3>
<p>A $7,500 hiring bonus for new Police Officer/Peace Officers.</p>
<h3>When does the Phoenix police recruitment close?</h3>
<p>On 30 November 2026, with all materials due by 11:59 pm.</p>
<h3>What is the best-paid open Phoenix role here?</h3>
<p>The Public Works Director, at $179,000 to $233,000 a year.</p>
<h3>Is the Deputy City Manager position still open?</h3>
<p>No, it closed on 23 November 2026.</p>
$$,
ARRAY['https://www.levels.fyi/jobs/company/city-of-phoenix', 'https://joinphxpd.com/sworn/laterals/', 'https://movojobs.com/city-of-phoenix/jobs/lateral-transfer-police-officer-peace-officer-november-2026-10980804'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-san-francisco-usa-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-san-francisco-usa-20261128', 'usa', 'USA',
'Jobs in San Francisco USA: Planner Pays $159,562',
'Jobs in San Francisco USA: Planner Pays $159,562',
'Jobs in San Francisco USA include a Planner III at $131,300 to $159,562 and an Assistant Engineer at $130,416 to $158,574 a year.',
'Jobs in San Francisco USA include a Planner III at $131,300 to $159,562 and an Assistant Engineer at $130,416 to $158,574 a year.',
$$<p>The City and County of San Francisco are hiring Planners, Engineers, Auditors and Buyers with the deadlines ranging from 30 Nov to 16 Dec 2026. The jobs in San Francisco USA in this round are all between $100,022 and $159,562 per year and the engineering positions are citywide exam recruitments.</p>
<table><tbody><tr><td>Organisation</td><td>City and County of San Francisco</td></tr><tr><td>Post</td><td>Planner III - Environmental Review, Tax Auditor-Appraiser, Senior Purchaser, Assistant Engineer (Mechanical), Junior Engineer (Electrical), Roofer</td></tr><tr><td>Pay</td><td>$100,022 to $159,562 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Senior Purchaser closes 30 November 2026; Planner III closes 2 December 2026; Tax Auditor-Appraiser and Junior Engineer close 8 December 2026; Assistant Engineer closes 16 December 2026</td></tr><tr><td>Application route</td><td>Online through the City and County of San Francisco careers portal (SmartRecruiters)</td></tr><tr><td>Qualification</td><td>Professional Engineer licence for advancement from Assistant to Associate Engineer; environmental review experience for the Planner III</td></tr><tr><td>Selection</td><td>Position-based test for the Planner III; citywide exam for the engineering posts, tentatively 8 January and the week of 11 January 2027</td></tr></tbody></table>
<h2>What jobs in San Francisco USA involve</h2><p>The Planner III - Environmental Review at SFO, doing environmental reviews under CEQA and NEPA for an airport that sees over 54 million guests a year. The Tax Auditor-Appraiser is in the Office of the Assessor-Recorder on the property assessment side. The Senior Purchaser is in the Office of Contract Administration. The Assistant Engineer (Mechanical) and Junior Engineer (Electrical) are citywide posts covering all the various departments. We need a temporary Roofer in the Recreation and Parks structural maintenance division. If you're looking around more widely then you can check out the <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-usa-los-angeles-20261127">jobs in Los Angeles USA</a>.</p>
<h2>Who can apply</h2><p>The posts are open to suitable applicants and the engineering posts are citywide exam posts (i.e. an application is an application to sit the citywide exam). An Assistant Engineer can progress to Associate Engineer upon obtaining a PE licence, completing two years of satisfactory service and receiving approval. There is no stated restriction as to nationality in the listings, though applicants must be authorised to work in the US.</p>
<h2>What it pays</h2><p> Planner III pays $131,300 to $159,562 a year. The Assistant Engineer (Mechanical) pays $130,416 to $158,574, and the Senior Purchaser: $129,298-$157,196 (3% premium for CPM, CPSM, CPPB or CPPO). Junior Engineer (Electrical) pays $115,544 to $140,426, the Tax Auditor-Appraiser: $107,432-$130,546. Roofer: $100,022-$121,628. All city positions are City and County of San Francisco employee benefits.</p>
<h2>How to apply</h2><p>All applications go via the city's online careers portal on SmartRecruiters. The Senior Purchaser closes at 11.59pm Pacific Time on 30 November 2026; the Planner III at 5pm Pacific Time on 2 December 2026; the Tax Auditor-Appraiser and Junior Engineer on 8 December 2026; and the Assistant Engineer on 16 December 2026. Anyone who has already applied for the Planner III in the initial filing period (9th to 23rd November) need not reapply.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, none state a start date. The engineering exam dates are provisional at best. The Roofer post is temporary provisional with no end date given. None of the listings indicate whether visa sponsorship is available so international applicants should check directly with the hiring department prior to applying.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City and County of San Francisco applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://careers.sf.gov/role/?id=3743990016733477">City and County of San Francisco careers</a> (Planner III - Environmental Review: salary, deadline and duties); <a href="https://careers.sf.gov/role/?id=3743990017093136">City and County of San Francisco careers</a> (Assistant Engineer (Mechanical): salary, deadline and exam detail); <a href="https://careers.sf.gov/role/?id=3743990017068606">City and County of San Francisco careers</a> (Tax Auditor-Appraiser: salary and deadline).</p>
<h2>Frequently asked questions</h2>
<h3>What's the best paid open SF role?</h3>
<p>The Planner III - Environmental Review at San Francisco International Airport, at $131,300 to $159,562 per annum.</p>
<h3>When does the San Francisco Planner III position close?</h3>
<p>Not before 5pm Pacific Time on 2nd December 2026.</p>
<h3>Are the engineering posts exams?</h3>
<p>Yes the Assistant and Junior Engineer posts are citywide exam recruitments with exams tentatively scheduled for 8th January and the week of 11th January 2027.</p>
<h3>Where do I apply for City and County of San Francisco jobs?</h3>
<p>Via the city's online careers portal (which is on SmartRecruiters).</p>
$$,
$$<p>The City and County of San Francisco are hiring Planners, Engineers, Auditors and Buyers with the deadlines ranging from 30 Nov to 16 Dec 2026. The jobs in San Francisco USA in this round are all between $100,022 and $159,562 per year and the engineering positions are citywide exam recruitments.</p>
<table><tbody><tr><td>Organisation</td><td>City and County of San Francisco</td></tr><tr><td>Post</td><td>Planner III - Environmental Review, Tax Auditor-Appraiser, Senior Purchaser, Assistant Engineer (Mechanical), Junior Engineer (Electrical), Roofer</td></tr><tr><td>Pay</td><td>$100,022 to $159,562 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Senior Purchaser closes 30 November 2026; Planner III closes 2 December 2026; Tax Auditor-Appraiser and Junior Engineer close 8 December 2026; Assistant Engineer closes 16 December 2026</td></tr><tr><td>Application route</td><td>Online through the City and County of San Francisco careers portal (SmartRecruiters)</td></tr><tr><td>Qualification</td><td>Professional Engineer licence for advancement from Assistant to Associate Engineer; environmental review experience for the Planner III</td></tr><tr><td>Selection</td><td>Position-based test for the Planner III; citywide exam for the engineering posts, tentatively 8 January and the week of 11 January 2027</td></tr></tbody></table>
<h2>What jobs in San Francisco USA involve</h2><p>The Planner III - Environmental Review at SFO, doing environmental reviews under CEQA and NEPA for an airport that sees over 54 million guests a year. The Tax Auditor-Appraiser is in the Office of the Assessor-Recorder on the property assessment side. The Senior Purchaser is in the Office of Contract Administration. The Assistant Engineer (Mechanical) and Junior Engineer (Electrical) are citywide posts covering all the various departments. We need a temporary Roofer in the Recreation and Parks structural maintenance division. If you're looking around more widely then you can check out the <a href="https://growentix.cloud/usa">USA jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-usa-los-angeles-20261127">jobs in Los Angeles USA</a>.</p>
<h2>Who can apply</h2><p>The posts are open to suitable applicants and the engineering posts are citywide exam posts (i.e. an application is an application to sit the citywide exam). An Assistant Engineer can progress to Associate Engineer upon obtaining a PE licence, completing two years of satisfactory service and receiving approval. There is no stated restriction as to nationality in the listings, though applicants must be authorised to work in the US.</p>
<h2>What it pays</h2><p> Planner III pays $131,300 to $159,562 a year. The Assistant Engineer (Mechanical) pays $130,416 to $158,574, and the Senior Purchaser: $129,298-$157,196 (3% premium for CPM, CPSM, CPPB or CPPO). Junior Engineer (Electrical) pays $115,544 to $140,426, the Tax Auditor-Appraiser: $107,432-$130,546. Roofer: $100,022-$121,628. All city positions are City and County of San Francisco employee benefits.</p>
<h2>How to apply</h2><p>All applications go via the city's online careers portal on SmartRecruiters. The Senior Purchaser closes at 11.59pm Pacific Time on 30 November 2026; the Planner III at 5pm Pacific Time on 2 December 2026; the Tax Auditor-Appraiser and Junior Engineer on 8 December 2026; and the Assistant Engineer on 16 December 2026. Anyone who has already applied for the Planner III in the initial filing period (9th to 23rd November) need not reapply.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, none state a start date. The engineering exam dates are provisional at best. The Roofer post is temporary provisional with no end date given. None of the listings indicate whether visa sponsorship is available so international applicants should check directly with the hiring department prior to applying.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City and County of San Francisco applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://careers.sf.gov/role/?id=3743990016733477">City and County of San Francisco careers</a> (Planner III - Environmental Review: salary, deadline and duties); <a href="https://careers.sf.gov/role/?id=3743990017093136">City and County of San Francisco careers</a> (Assistant Engineer (Mechanical): salary, deadline and exam detail); <a href="https://careers.sf.gov/role/?id=3743990017068606">City and County of San Francisco careers</a> (Tax Auditor-Appraiser: salary and deadline).</p>
<h2>Frequently asked questions</h2>
<h3>What's the best paid open SF role?</h3>
<p>The Planner III - Environmental Review at San Francisco International Airport, at $131,300 to $159,562 per annum.</p>
<h3>When does the San Francisco Planner III position close?</h3>
<p>Not before 5pm Pacific Time on 2nd December 2026.</p>
<h3>Are the engineering posts exams?</h3>
<p>Yes the Assistant and Junior Engineer posts are citywide exam recruitments with exams tentatively scheduled for 8th January and the week of 11th January 2027.</p>
<h3>Where do I apply for City and County of San Francisco jobs?</h3>
<p>Via the city's online careers portal (which is on SmartRecruiters).</p>
$$,
ARRAY['https://careers.sf.gov/role/?id=3743990016733477', 'https://careers.sf.gov/role/?id=3743990017093136', 'https://careers.sf.gov/role/?id=3743990017068606'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-toronto-canada-20261128 (canada; Canada; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-toronto-canada-20261128', 'canada', 'Canada',
'Jobs in Toronto Canada: Consultant Pay $132,880',
'Jobs in Toronto Canada: Consultant Pay $132,880',
'Jobs in Toronto Canada include a Public Health Consultant at $89,337 to $132,880 and an Administrative Assistant at $64,529 to $91,111.',
'Jobs in Toronto Canada include a Public Health Consultant at $89,337 to $132,880 and an Administrative Assistant at $64,529 to $91,111.',
$$<p>The City of Toronto is recruiting admin, policy, court and buying staff with the majority of live postings closing between 29 Nov and 8 Dec 2026. The Toronto Canada jobs in this round are paying from $32.83/hr to $132,880 per year with the highest paid open position being that of a year, and the best-paid open post is a public health consultant.</p>
<table><tbody><tr><td>Organisation</td><td>City of Toronto</td></tr><tr><td>Post</td><td>Consultant Information &amp; Policy Management, Administrative Assistant 2, Support Assistant C, Service Area Buyer, Manager Fleet Contracts</td></tr><tr><td>Pay</td><td>$32.83 an hour to $132,880 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Consultant Information &amp; Policy Management closes 29 November 2026; Administrative Assistant 2 closes 30 November 2026; Service Area Buyer closes 7 December 2026; Support Assistant C closes 8 December 2026; Manager Fleet Contracts closed 23 November 2026</td></tr><tr><td>Application route</td><td>Online through the City of Toronto jobs site</td></tr><tr><td>Qualification</td><td>Policy, records and privacy experience for the Consultant role; court and clerical experience for the Support Assistant</td></tr><tr><td>Selection</td><td>Online application within the posting period; city employees apply through the internal portal</td></tr></tbody></table>
<h2>What jobs in Toronto Canada involve</h2><p>The Consultant Information and Policy Management supports Toronto Public Health in managing divisional policies, records and information privacy practices, based at Union Station on a 35-hour week. The Administrative Assistant 2 works in Corporate Real Estate Management at Metro Hall, and the Support Assistant C works in Toronto Court Services, opening courtrooms, preparing digital audio recordings and dockets, and escorting the Justice of the Peace into court. The Service Area Buyer purchases materials, services and equipment for Toronto Public Health, with information technology items as the priority. Readers looking more widely can browse <a href="https://growentix.cloud/canada">Canada jobs</a> and our roundup of <a href="https://growentix.cloud/articles/government-of-canada-jobs-20261127">Government of Canada jobs</a>.</p>
<h2>Who can apply</h2><p>The postings are open to qualified applicants and City of Toronto employees must apply via the City's internal job posting portal. The Consultant position is a full-time temporary position for 12 months; the Administrative Assistant is a permanent position and the Support Assistant has two temporary 12 month vacancies. There is no stated nationality requirement, however applicants must be authorised to work in Canada.</p>
<h2>What it pays</h2><p>The Consultant Information and Policy Management earns between $89,337 and $132,880. The Administrative Assistant 2 earns between $64,529 and $91,111. The Service Area Buyer earns between $42.28 and $46.31 an hour and the Support Assistant C earns between $32.83 and $35.82 an hour. All are on a 35 hour week (mon-Fri). All city roles come with City of Toronto employee benefits.</p>
<h2>How to apply</h2><p>Apply online via the City of Toronto jobs site during the posting period indicated on each notice. The Consultant closes on 29 November 2026 and the Administrative Assistant on 30 November (both therefore urgent), the Service Area Buyer closes on 7 December and the Support Assistant C on 8 December 2026. Each posting has a job ID: 68052 (Consultant), 67389 (Administrative Assistant) and 66467 (Support Assistant C).</p>
<h2>What the notice does not say</h2><p>None of the listings provide interview dates or start dates and none indicate whether visa sponsorship is available so international applicants should check directly with the city prior to applying. The Manager Fleet Contracts and Consultant Training and Development posts closed on 23 November 2026 so there is no point in applying for those from this round.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Toronto applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://jobs.toronto.ca/jobsatcity/job/Toronto-ADMINISTRATIVE-ASSISTANT-2-ON-M5V-0C4/608279617/">City of Toronto jobs</a> (Administrative Assistant 2: salary, posting period and job ID); <a href="https://publicjobs.ca/jobs/city-of-toronto/consultant-information-policy-mgmt/">PublicJobs.ca</a> (Consultant Information &amp; Policy Management: salary, posting period and duties, collected from the city's careers site); <a href="https://publicjobs.ca/jobs/city-of-toronto/support-assistant-c-608278817/">PublicJobs.ca</a> (Support Assistant C: hourly rate, posting period and duties, collected from the city's careers site).</p>
<h2>Frequently asked questions</h2>
<h3>What's the best paid open Toronto role?</h3>
<p>The Consultant (Information and Policy Management) in Toronto Public Health at $89,337 to $132,880.</p>
<h3>When does the Toronto Consultant role close?</h3>
<p>On 29 November 2026.</p>
<h3>How many Support Assistant posts are currently open?</h3>
<p>Two: both are full-time temporary vacancies for 12 months in Toronto Court Services.</p>
<h3>Where do I apply for City of Toronto jobs?</h3>
<p>Online through the City of Toronto jobs site; city employees use the internal portal.</p>
$$,
$$<p>The City of Toronto is recruiting admin, policy, court and buying staff with the majority of live postings closing between 29 Nov and 8 Dec 2026. The Toronto Canada jobs in this round are paying from $32.83/hr to $132,880 per year with the highest paid open position being that of a year, and the best-paid open post is a public health consultant.</p>
<table><tbody><tr><td>Organisation</td><td>City of Toronto</td></tr><tr><td>Post</td><td>Consultant Information &amp; Policy Management, Administrative Assistant 2, Support Assistant C, Service Area Buyer, Manager Fleet Contracts</td></tr><tr><td>Pay</td><td>$32.83 an hour to $132,880 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Consultant Information &amp; Policy Management closes 29 November 2026; Administrative Assistant 2 closes 30 November 2026; Service Area Buyer closes 7 December 2026; Support Assistant C closes 8 December 2026; Manager Fleet Contracts closed 23 November 2026</td></tr><tr><td>Application route</td><td>Online through the City of Toronto jobs site</td></tr><tr><td>Qualification</td><td>Policy, records and privacy experience for the Consultant role; court and clerical experience for the Support Assistant</td></tr><tr><td>Selection</td><td>Online application within the posting period; city employees apply through the internal portal</td></tr></tbody></table>
<h2>What jobs in Toronto Canada involve</h2><p>The Consultant Information and Policy Management supports Toronto Public Health in managing divisional policies, records and information privacy practices, based at Union Station on a 35-hour week. The Administrative Assistant 2 works in Corporate Real Estate Management at Metro Hall, and the Support Assistant C works in Toronto Court Services, opening courtrooms, preparing digital audio recordings and dockets, and escorting the Justice of the Peace into court. The Service Area Buyer purchases materials, services and equipment for Toronto Public Health, with information technology items as the priority. Readers looking more widely can browse <a href="https://growentix.cloud/canada">Canada jobs</a> and our roundup of <a href="https://growentix.cloud/articles/government-of-canada-jobs-20261127">Government of Canada jobs</a>.</p>
<h2>Who can apply</h2><p>The postings are open to qualified applicants and City of Toronto employees must apply via the City's internal job posting portal. The Consultant position is a full-time temporary position for 12 months; the Administrative Assistant is a permanent position and the Support Assistant has two temporary 12 month vacancies. There is no stated nationality requirement, however applicants must be authorised to work in Canada.</p>
<h2>What it pays</h2><p>The Consultant Information and Policy Management earns between $89,337 and $132,880. The Administrative Assistant 2 earns between $64,529 and $91,111. The Service Area Buyer earns between $42.28 and $46.31 an hour and the Support Assistant C earns between $32.83 and $35.82 an hour. All are on a 35 hour week (mon-Fri). All city roles come with City of Toronto employee benefits.</p>
<h2>How to apply</h2><p>Apply online via the City of Toronto jobs site during the posting period indicated on each notice. The Consultant closes on 29 November 2026 and the Administrative Assistant on 30 November (both therefore urgent), the Service Area Buyer closes on 7 December and the Support Assistant C on 8 December 2026. Each posting has a job ID: 68052 (Consultant), 67389 (Administrative Assistant) and 66467 (Support Assistant C).</p>
<h2>What the notice does not say</h2><p>None of the listings provide interview dates or start dates and none indicate whether visa sponsorship is available so international applicants should check directly with the city prior to applying. The Manager Fleet Contracts and Consultant Training and Development posts closed on 23 November 2026 so there is no point in applying for those from this round.</p>
<p><strong>Never pay anyone to apply for this job.</strong> City of Toronto applications are free and no agency will ever ask you to pay anything for an application, an assessment or a job offer.</p>
<p>Sources: <a href="https://jobs.toronto.ca/jobsatcity/job/Toronto-ADMINISTRATIVE-ASSISTANT-2-ON-M5V-0C4/608279617/">City of Toronto jobs</a> (Administrative Assistant 2: salary, posting period and job ID); <a href="https://publicjobs.ca/jobs/city-of-toronto/consultant-information-policy-mgmt/">PublicJobs.ca</a> (Consultant Information &amp; Policy Management: salary, posting period and duties, collected from the city's careers site); <a href="https://publicjobs.ca/jobs/city-of-toronto/support-assistant-c-608278817/">PublicJobs.ca</a> (Support Assistant C: hourly rate, posting period and duties, collected from the city's careers site).</p>
<h2>Frequently asked questions</h2>
<h3>What's the best paid open Toronto role?</h3>
<p>The Consultant (Information and Policy Management) in Toronto Public Health at $89,337 to $132,880.</p>
<h3>When does the Toronto Consultant role close?</h3>
<p>On 29 November 2026.</p>
<h3>How many Support Assistant posts are currently open?</h3>
<p>Two: both are full-time temporary vacancies for 12 months in Toronto Court Services.</p>
<h3>Where do I apply for City of Toronto jobs?</h3>
<p>Online through the City of Toronto jobs site; city employees use the internal portal.</p>
$$,
ARRAY['https://jobs.toronto.ca/jobsatcity/job/Toronto-ADMINISTRATIVE-ASSISTANT-2-ON-M5V-0C4/608279617/', 'https://publicjobs.ca/jobs/city-of-toronto/consultant-information-policy-mgmt/', 'https://publicjobs.ca/jobs/city-of-toronto/support-assistant-c-608278817/'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jobs-in-washington-dc-usa-20261128 (usa; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jobs-in-washington-dc-usa-20261128', 'usa', 'USA',
'Jobs in Washington DC USA: Attorney Pay $197,200',
'Jobs in Washington DC USA: Attorney Pay $197,200',
'Jobs in Washington DC USA include a Justice Department Attorney Adviser at $121,785 to $197,200 and a VA General Attorney at up to $187,093.',
'Jobs in Washington DC USA include a Justice Department Attorney Adviser at $121,785 to $197,200 and a VA General Attorney at up to $187,093.',
$$<p>Federal agencies in Washington, DC, are hiring lawyers, grants specialists, and analysts, with most live announcements closing in the first half of December 2026. Jobs in Washington DC USA in this roundup pay from $85,000 to $197,200 a year, and the best-paid post is a Justice Department Attorney Adviser.</p>
<table><tbody><tr><td>Organisation</td><td>US Department of Justice; US Department of Veterans Affairs; US-China Economic and Security Review Commission; National Endowment for the Arts; Federal Bureau of Prisons</td></tr><tr><td>Post</td><td>Attorney Adviser, General Attorney (Veterans), Senior Operations Specialist, Grants Management Specialist (Programs), Management Analyst</td></tr><tr><td>Pay</td><td>$85,000 to $197,200 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Senior Operations Specialist closes 1 December 2026; Management Analyst closes 3 December 2026; Grants Management Specialist closes 4 December 2026; Attorney Adviser closes 16 December 2026; General Attorney closes 31 December 2026</td></tr><tr><td>Application route</td><td>Online through USAJOBS; the Commission role by email application</td></tr><tr><td>Qualification</td><td>Law degree and bar membership for the attorney roles; grants management experience for the NEA role</td></tr><tr><td>Selection</td><td>Application and assessment; several announcements are open to federal employees and veterans only, not the general public</td></tr></tbody></table>
<h2>What jobs in Washington DC USA involve</h2><p> Attorney Adviser in the Justice Department Criminal Section (non-litigating work, telework eligible). General Attorney (Veterans) in the VA Office of General Counsel's Court of Appeals Litigation Group (telework eligible). Senior Operations Specialist with the US-China Economic and Security Review Commission (a legislative branch body which reports to Congress on the national security implications of US-China trade) (in person in Washington DC). Grants Management Specialist who manages the full life cycle of NEA grants. Management Analyst with the Bureau of Prisons. For those wanting to look more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our post on <a href="https://growentix.cloud/articles/va-general-attorney-jobs-washington-dc-20261124">VA General Attorney jobs in Washington DC</a>.</p>
<h2>Who can apply</h2><p>The Attorney Adviser and the Commission's Senior Operations Specialist are open to the public; the Commission post is open to all qualified US citizens, and applicants must be available to work in person in Washington, DC. The General Attorney post is open to US citizens, and applicants must be able to obtain a Secret clearance where required. The Grants Management Specialist and Management Analyst announcements are open to current federal employees, veterans and other eligible groups, not the general public, so outside applicants should check the "who may apply" section on USAJOBS before spending time on an application.</p>
<h2>What it pays</h2><p> Attorney Adviser: $121,785- $197,200 (grades 13- 15) General Attorney (Veterans): $85,447- $187,093 (grades 11- 14) Senior Operations Specialist: $85,000- $100,000 Grants Management Specialist: $85,477- $133,142 (grades 11- 12) Management Analyst: $102,415- $133,142 (grade 12) All federal positions come with federal benefits (health, dental, vision insurance; life insurance; federal retirement system).</p>
<h2>How to apply</h2><p>Federal posts go through USAJOBS, where each announcement having its own closing date: Management Analyst closes 3 Dec, Grants Management Specialist 4 Dec, Attorney Adviser 16 Dec and General Attorney 31 Dec 2026. The Senior Operations Specialist closes 1 Dec 2026 and is applied for by email to the Commission at the address provided in the vacancy announcement. Apply early as several of these are only open for a week or two.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, and none give interview dates or start dates. The listings do not say whether visa sponsorship is available; most federal posts require US citizenship. The Commission role gives no grade or benefits details beyond federal employee benefits eligibility.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Federal applications are free, and no agency will ask you to pay anything for an application, an assessment, or a job offer.</p>
<p>Sources: <a href="https://www.govremotejobs.com/jobs/attorney-adviser-offices-boards-and-divisions-894219700">GovRemoteJobs</a> (Attorney Adviser: salary, dates and telework status, reproducing the USAJOBS announcement); <a href="https://careers.org/jobs/891163000">Careers.org</a> (General Attorney (Veterans): salary, dates and grade, reproducing the USAJOBS announcement); <a href="https://www.uscc.gov/sites/default/files/2026-11/Vacancy_Announcement-Senior_Operations_Specialist-November_2026.pdf">US-China Economic and Security Review Commission</a> (Senior Operations Specialist vacancy announcement: salary, dates and eligibility).</p>
<h2>Frequently asked questions</h2>
<h3>What's the highest paid job in Washington DC in this list?</h3>
<p>The DOJ Attorney Adviser at $121,785 to $197,200 a year.</p>
<h3>Can anyone apply for the Management Analyst post?</h3>
<p>No, that announcement is open to current federal employees, veterans and other eligible groups, not to the general public.</p>
<h3>When does the Senior Operations Specialist role close?</h3>
<p>On 1 December 2026.</p>
<h3>Where do I apply for federal jobs in Washington DC?</h3>
<p>Through USAJOBS, except for the Commission role which is applied for by email).</p>
$$,
$$<p>Federal agencies in Washington, DC, are hiring lawyers, grants specialists, and analysts, with most live announcements closing in the first half of December 2026. Jobs in Washington DC USA in this roundup pay from $85,000 to $197,200 a year, and the best-paid post is a Justice Department Attorney Adviser.</p>
<table><tbody><tr><td>Organisation</td><td>US Department of Justice; US Department of Veterans Affairs; US-China Economic and Security Review Commission; National Endowment for the Arts; Federal Bureau of Prisons</td></tr><tr><td>Post</td><td>Attorney Adviser, General Attorney (Veterans), Senior Operations Specialist, Grants Management Specialist (Programs), Management Analyst</td></tr><tr><td>Pay</td><td>$85,000 to $197,200 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Senior Operations Specialist closes 1 December 2026; Management Analyst closes 3 December 2026; Grants Management Specialist closes 4 December 2026; Attorney Adviser closes 16 December 2026; General Attorney closes 31 December 2026</td></tr><tr><td>Application route</td><td>Online through USAJOBS; the Commission role by email application</td></tr><tr><td>Qualification</td><td>Law degree and bar membership for the attorney roles; grants management experience for the NEA role</td></tr><tr><td>Selection</td><td>Application and assessment; several announcements are open to federal employees and veterans only, not the general public</td></tr></tbody></table>
<h2>What jobs in Washington DC USA involve</h2><p> Attorney Adviser in the Justice Department Criminal Section (non-litigating work, telework eligible). General Attorney (Veterans) in the VA Office of General Counsel's Court of Appeals Litigation Group (telework eligible). Senior Operations Specialist with the US-China Economic and Security Review Commission (a legislative branch body which reports to Congress on the national security implications of US-China trade) (in person in Washington DC). Grants Management Specialist who manages the full life cycle of NEA grants. Management Analyst with the Bureau of Prisons. For those wanting to look more widely can browse <a href="https://growentix.cloud/usa">USA jobs</a> and our post on <a href="https://growentix.cloud/articles/va-general-attorney-jobs-washington-dc-20261124">VA General Attorney jobs in Washington DC</a>.</p>
<h2>Who can apply</h2><p>The Attorney Adviser and the Commission's Senior Operations Specialist are open to the public; the Commission post is open to all qualified US citizens, and applicants must be available to work in person in Washington, DC. The General Attorney post is open to US citizens, and applicants must be able to obtain a Secret clearance where required. The Grants Management Specialist and Management Analyst announcements are open to current federal employees, veterans and other eligible groups, not the general public, so outside applicants should check the "who may apply" section on USAJOBS before spending time on an application.</p>
<h2>What it pays</h2><p> Attorney Adviser: $121,785- $197,200 (grades 13- 15) General Attorney (Veterans): $85,447- $187,093 (grades 11- 14) Senior Operations Specialist: $85,000- $100,000 Grants Management Specialist: $85,477- $133,142 (grades 11- 12) Management Analyst: $102,415- $133,142 (grade 12) All federal positions come with federal benefits (health, dental, vision insurance; life insurance; federal retirement system).</p>
<h2>How to apply</h2><p>Federal posts go through USAJOBS, where each announcement having its own closing date: Management Analyst closes 3 Dec, Grants Management Specialist 4 Dec, Attorney Adviser 16 Dec and General Attorney 31 Dec 2026. The Senior Operations Specialist closes 1 Dec 2026 and is applied for by email to the Commission at the address provided in the vacancy announcement. Apply early as several of these are only open for a week or two.</p>
<h2>What the notice does not say</h2><p>None of the listings state how many posts are available, and none give interview dates or start dates. The listings do not say whether visa sponsorship is available; most federal posts require US citizenship. The Commission role gives no grade or benefits details beyond federal employee benefits eligibility.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Federal applications are free, and no agency will ask you to pay anything for an application, an assessment, or a job offer.</p>
<p>Sources: <a href="https://www.govremotejobs.com/jobs/attorney-adviser-offices-boards-and-divisions-894219700">GovRemoteJobs</a> (Attorney Adviser: salary, dates and telework status, reproducing the USAJOBS announcement); <a href="https://careers.org/jobs/891163000">Careers.org</a> (General Attorney (Veterans): salary, dates and grade, reproducing the USAJOBS announcement); <a href="https://www.uscc.gov/sites/default/files/2026-11/Vacancy_Announcement-Senior_Operations_Specialist-November_2026.pdf">US-China Economic and Security Review Commission</a> (Senior Operations Specialist vacancy announcement: salary, dates and eligibility).</p>
<h2>Frequently asked questions</h2>
<h3>What's the highest paid job in Washington DC in this list?</h3>
<p>The DOJ Attorney Adviser at $121,785 to $197,200 a year.</p>
<h3>Can anyone apply for the Management Analyst post?</h3>
<p>No, that announcement is open to current federal employees, veterans and other eligible groups, not to the general public.</p>
<h3>When does the Senior Operations Specialist role close?</h3>
<p>On 1 December 2026.</p>
<h3>Where do I apply for federal jobs in Washington DC?</h3>
<p>Through USAJOBS, except for the Commission role which is applied for by email).</p>
$$,
ARRAY['https://www.govremotejobs.com/jobs/attorney-adviser-offices-boards-and-divisions-894219700', 'https://careers.org/jobs/891163000', 'https://www.uscc.gov/sites/default/files/2026-11/Vacancy_Announcement-Senior_Operations_Specialist-November_2026.pdf'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- nhs-jobs-london-20261128 (uk; UK; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'nhs-jobs-london-20261128', 'uk', 'UK',
'NHS Jobs London: Band 6 Pay Up to £56,863',
'NHS Jobs London: Band 6 Pay Up to £56,863',
'NHS jobs London include Band 6 nurses and therapists at £39,959 to £56,863 and a geriatrics consultant at £113,565 to £150,569 a year.',
'NHS jobs London include Band 6 nurses and therapists at £39,959 to £56,863 and a geriatrics consultant at £113,565 to £150,569 a year.',
$$<p>London NHS trusts are hiring nurses, therapists and a consultant, with most of the live adverts posted on 24 and 25 November 2026. NHS jobs London in this roundup pay from £39,959 to £150,569 a year, and the Band 6 clinical roles dominate the list.</p>
<table><tbody><tr><td>Organisation</td><td>West London NHS Trust; Chelsea and Westminster Hospital NHS Foundation Trust; NELFT NHS Foundation Trust; Lewisham and Greenwich NHS Trust; St George's University Hospitals NHS Foundation Trust</td></tr><tr><td>Post</td><td>Crisis Care Practitioner, Heart Failure Clinical Nurse Specialist, Occupational Therapist, Specialist Speech and Language Therapist, Clinical Team Leader, Consultant in Geriatrics</td></tr><tr><td>Pay</td><td>£39,959 to £150,569 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Clinical Team Leader closes 29 November 2026; Specialist Speech and Language Therapist closes 14 December 2026; most other roles were posted 24-25 November 2026</td></tr><tr><td>Application route</td><td>Online through NHS Jobs</td></tr><tr><td>Qualification</td><td>Registered nurse, occupational therapist or speech and language therapist registration, as appropriate for the role requires; medical qualification required for the Consultant post</td></tr><tr><td>Interview</td><td>Clinical Team Leader interviews planned for 7 December 2026</td></tr></tbody></table>
<h2>What NHS jobs London involve</h2><p> Band 6 Crisis Care Practitioner: works in mental health crisis care with West London NHS Trust (one of the most diverse NHS Trusts in the country). Heart Failure Clinical Nurse Specialist: works across Chelsea and Westminster Hospital and West Middlesex University Hospital, managing a specialist caseload of inpatients and outpatients with a clear pathway to Band 7. Occupational Therapist: works with the Mental Health and Wellness Team in Redbridge. Specialist Speech and Language Therapist: joins an adult community neuro team in south west London. Clinical Team Leader: leads a specialist older adult inpatient service at St Bernard's Hospital in Southall. Consultant in Geriatrics: works across Queen Elizabeth Hospital in Woolwich and the Greenwich community frailty team. For those wanting to look more widely can browse <a href="https://growentix.cloud/uk">UK jobs</a> and our regular roundup of <a href="https://growentix.cloud/articles/uk-civil-service-jobs-20261127">UK Civil Service jobs</a>.</p>
<h2>Who can apply</h2><p>Each post requires the appropriate professional registration: registered nurses for the nursing posts and occupational therapists or speech and language therapists for the therapy posts. The Community Practitioner post in the memory service is open to registered nurses, occupational therapists and social workers. The Consultant post requires a medical qualification and consultant level experience in geriatric medicine. International applicants should check the visa sponsorship status on each NHS Jobs advert as this can vary from trust to trust and post to post; the adverts we've looked at here don't state it.</p>
<h2>What it pays</h2><p>Band 6 roles are £39,959 to £48,117 per annum plus the High Cost Area Supplement (or £47,951 to £56,863 including the 20% supplement in inner London) depending on the trust and location. The Clinical Team Leader is £45,953 to £54,254 (including the supplement) and the Consultant in Geriatrics is £113,565 to £150,569 for 10 programmed activities. All NHS posts have the NHS pension and benefits. The Heart Failure post has a clear pathway to Band 7 on completion of an agreed development programme.</p>
<h2>How to apply</h2><p>Apply via NHS Jobs where each advert will have a reference number and a closing date. The Clinical Team Leader advert closes at 23:59 on 29th November 2026 with interviews scheduled for 7th December. The Specialist Speech and Language Therapist advert closes on 14th December 2026. NHS adverts can close early if there's a sufficient number of applications so it's advisable to apply as soon as possible rather than wait until the advertised closing date.</p>
<h2>What the notice does not say</h2><p>Most of the adverts checked give no closing date in the versions seen, so readers must open each NHS Jobs advert to confirm the deadline. None of the adverts state whether visa sponsorship is available. The Band 3 Healthcare Assistant post closed on 23 November 2026, so it should not be applied for from this roundup.</p>
<p><strong>Never pay anyone to apply for this job.</strong> NHS applications are free, and no agency will ask you to pay anything for an application, an assessment, or a job offer.</p>
<p>Sources: <a href="https://dentaljobsuk.net/jobs/5752711/band-6-crisis-care-practitioner">Medical Jobs UK</a> (Band 6 Crisis Care Practitioner: salary, band and posting date, as reproduced from the NHS Jobs advert); <a href="https://dentaljobsuk.net/jobs/5781214/heart-failure-clinical-nurse-specialist">Medical Jobs UK</a> (Heart Failure Clinical Nurse Specialist: salary, band, posting date and Band 7 pathway, as reproduced from the NHS Jobs advert); <a href="https://www.jobs.nhs.uk/candidate/jobadvert/C9222-26-1040">NHS Jobs</a> (Band 3 Healthcare Assistant advert: salary, band and closing date).</p>
<h2>Frequently asked questions</h2>
<h3>What does NHS Band 6 pay in London?</h3>
<p>£39,959 to £48,117 per annum plus the High Cost Area supplement, or up to £56,863 including a 20% supplement in inner London.</p>
<h3>When does the Clinical Team Leader role close?</h3>
<p> 23:59 on 29 November 2026. Interviews are due 7 December 2026.</p>
<h3>Can NHS adverts close early?</h3>
<p>Yes, trusts can close a vacancy early if there are sufficient applications, so you should apply as soon as possible.</p>
<h3>Where do I apply for NHS jobs in London?</h3>
<p>Apply online via NHS Jobs using the advert reference number.</p>
$$,
$$<p>London NHS trusts are hiring nurses, therapists and a consultant, with most of the live adverts posted on 24 and 25 November 2026. NHS jobs London in this roundup pay from £39,959 to £150,569 a year, and the Band 6 clinical roles dominate the list.</p>
<table><tbody><tr><td>Organisation</td><td>West London NHS Trust; Chelsea and Westminster Hospital NHS Foundation Trust; NELFT NHS Foundation Trust; Lewisham and Greenwich NHS Trust; St George's University Hospitals NHS Foundation Trust</td></tr><tr><td>Post</td><td>Crisis Care Practitioner, Heart Failure Clinical Nurse Specialist, Occupational Therapist, Specialist Speech and Language Therapist, Clinical Team Leader, Consultant in Geriatrics</td></tr><tr><td>Pay</td><td>£39,959 to £150,569 a year, depending on the role</td></tr><tr><td>Application dates</td><td>Clinical Team Leader closes 29 November 2026; Specialist Speech and Language Therapist closes 14 December 2026; most other roles were posted 24-25 November 2026</td></tr><tr><td>Application route</td><td>Online through NHS Jobs</td></tr><tr><td>Qualification</td><td>Registered nurse, occupational therapist or speech and language therapist registration, as appropriate for the role requires; medical qualification required for the Consultant post</td></tr><tr><td>Interview</td><td>Clinical Team Leader interviews planned for 7 December 2026</td></tr></tbody></table>
<h2>What NHS jobs London involve</h2><p> Band 6 Crisis Care Practitioner: works in mental health crisis care with West London NHS Trust (one of the most diverse NHS Trusts in the country). Heart Failure Clinical Nurse Specialist: works across Chelsea and Westminster Hospital and West Middlesex University Hospital, managing a specialist caseload of inpatients and outpatients with a clear pathway to Band 7. Occupational Therapist: works with the Mental Health and Wellness Team in Redbridge. Specialist Speech and Language Therapist: joins an adult community neuro team in south west London. Clinical Team Leader: leads a specialist older adult inpatient service at St Bernard's Hospital in Southall. Consultant in Geriatrics: works across Queen Elizabeth Hospital in Woolwich and the Greenwich community frailty team. For those wanting to look more widely can browse <a href="https://growentix.cloud/uk">UK jobs</a> and our regular roundup of <a href="https://growentix.cloud/articles/uk-civil-service-jobs-20261127">UK Civil Service jobs</a>.</p>
<h2>Who can apply</h2><p>Each post requires the appropriate professional registration: registered nurses for the nursing posts and occupational therapists or speech and language therapists for the therapy posts. The Community Practitioner post in the memory service is open to registered nurses, occupational therapists and social workers. The Consultant post requires a medical qualification and consultant level experience in geriatric medicine. International applicants should check the visa sponsorship status on each NHS Jobs advert as this can vary from trust to trust and post to post; the adverts we've looked at here don't state it.</p>
<h2>What it pays</h2><p>Band 6 roles are £39,959 to £48,117 per annum plus the High Cost Area Supplement (or £47,951 to £56,863 including the 20% supplement in inner London) depending on the trust and location. The Clinical Team Leader is £45,953 to £54,254 (including the supplement) and the Consultant in Geriatrics is £113,565 to £150,569 for 10 programmed activities. All NHS posts have the NHS pension and benefits. The Heart Failure post has a clear pathway to Band 7 on completion of an agreed development programme.</p>
<h2>How to apply</h2><p>Apply via NHS Jobs where each advert will have a reference number and a closing date. The Clinical Team Leader advert closes at 23:59 on 29th November 2026 with interviews scheduled for 7th December. The Specialist Speech and Language Therapist advert closes on 14th December 2026. NHS adverts can close early if there's a sufficient number of applications so it's advisable to apply as soon as possible rather than wait until the advertised closing date.</p>
<h2>What the notice does not say</h2><p>Most of the adverts checked give no closing date in the versions seen, so readers must open each NHS Jobs advert to confirm the deadline. None of the adverts state whether visa sponsorship is available. The Band 3 Healthcare Assistant post closed on 23 November 2026, so it should not be applied for from this roundup.</p>
<p><strong>Never pay anyone to apply for this job.</strong> NHS applications are free, and no agency will ask you to pay anything for an application, an assessment, or a job offer.</p>
<p>Sources: <a href="https://dentaljobsuk.net/jobs/5752711/band-6-crisis-care-practitioner">Medical Jobs UK</a> (Band 6 Crisis Care Practitioner: salary, band and posting date, as reproduced from the NHS Jobs advert); <a href="https://dentaljobsuk.net/jobs/5781214/heart-failure-clinical-nurse-specialist">Medical Jobs UK</a> (Heart Failure Clinical Nurse Specialist: salary, band, posting date and Band 7 pathway, as reproduced from the NHS Jobs advert); <a href="https://www.jobs.nhs.uk/candidate/jobadvert/C9222-26-1040">NHS Jobs</a> (Band 3 Healthcare Assistant advert: salary, band and closing date).</p>
<h2>Frequently asked questions</h2>
<h3>What does NHS Band 6 pay in London?</h3>
<p>£39,959 to £48,117 per annum plus the High Cost Area supplement, or up to £56,863 including a 20% supplement in inner London.</p>
<h3>When does the Clinical Team Leader role close?</h3>
<p> 23:59 on 29 November 2026. Interviews are due 7 December 2026.</p>
<h3>Can NHS adverts close early?</h3>
<p>Yes, trusts can close a vacancy early if there are sufficient applications, so you should apply as soon as possible.</p>
<h3>Where do I apply for NHS jobs in London?</h3>
<p>Apply online via NHS Jobs using the advert reference number.</p>
$$,
ARRAY['https://dentaljobsuk.net/jobs/5752711/band-6-crisis-care-practitioner', 'https://dentaljobsuk.net/jobs/5781214/heart-failure-clinical-nurse-specialist', 'https://www.jobs.nhs.uk/candidate/jobadvert/C9222-26-1040'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- remote-jobs-for-former-teachers-20261128 (remote; USA; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'remote-jobs-for-former-teachers-20261128', 'remote', 'USA',
'Remote Jobs for Former Teachers: Pay Up to $125,000',
'Remote Jobs for Former Teachers: Pay Up to $125,000',
'Remote jobs for former teachers include instructional design at $65,000 to $88,000 and curriculum writing at about $76,000 to $87,000 a year.',
'Remote jobs for former teachers include instructional design at $65,000 to $88,000 and curriculum writing at about $76,000 to $87,000 a year.',
$$<p>Teaching experience translates directly into remote work and the most well-paid paths are in instructional design and curriculum writing rather than in live online teaching. The best paying remote jobs for ex-teachers in this round up are in instructional design (from about $25/hour for contract writing up to $125,000 a year for senior instructional design) and there are 15 fully remote curriculum roles listed on one specialist board as of 27th November 2026.</p>
<table><tbody><tr><td>Organisation</td><td>Edtech companies, publishers and training teams, including Pearson, Kiddom, Wilson Language Training and Novel Education Partners</td></tr><tr><td>Post</td><td>Instructional Designer, Curriculum Developer/Writer, Corporate Trainer, Educational Content Writer, Virtual Tutor</td></tr><tr><td>Pay</td><td>About $25 to $55 an hour for contract writing; $55,000 to $125,000 a year for full-time roles</td></tr><tr><td>Application route</td><td>Online through the employer's careers page or the specialist job board</td></tr><tr><td>Qualification</td><td>Teaching experience or subject expertise; at least 3 years of ELA teaching for the Novel Education Partners role</td></tr><tr><td>Selection</td><td>Application and assessment; employers look for lesson design, assessment writing and learning-platform skills</td></tr></tbody></table>
<h2>What remote jobs for former teachers involve</h2><p>Instructional designers create digital learning for companies, universities, government bodies and the health sector. They look at what the learners need and then build the course using tools such as Articulate Storyline and LMSS. Curriculum developers write the content itself (the course outline, the lesson sequence, the assessments, the video scripts) for edtech companies, publishers and test prep firms. Corporate trainers deliver virtual training to staff and virtual tutors provide one-to-one teaching. The US BLS puts the national median for instructional coordinators (which would include curriculum writers and specialists) at $77,440 per year and there are an estimated 23,100 openings per year between 2025 and 2035. For those wanting to look further afield there's a section on <a href="https://growentix.cloud/remote">remote jobs</a> and our guide to <a href="https://growentix.cloud/articles/remote-jobs-project-manager-20261125">remote project manager jobs</a>.</p>
<h2>Who can apply</h2><p>Former teachers with classroom experience are the core candidates, and the roles reward the skills teaching already builds: breaking down complex topics, designing learning sequences and creating assessments. The Novel Education Partners ELA Curriculum Designer asks for a bachelor's degree, a master's as a plus, and at least three years of effective ELA teaching experience. Eight of the 36 curriculum and content jobs on the ExitTicketJobs board mention teaching or classroom experience. No second degree is needed for most of these paths, though corporate instructional design roles may ask for authoring-tool experience.</p>
<h2>What it pays</h2><p>Remote instructional designers cluster around $65,000 to $88,000 in the middle range, with the senior roles reaching $110,000 and beyond, and some people reporting the top end above $125,000. Curriculum developers average roughly $76,000 to $87,000 a year, with the middle 50% between about $59,000 and $81,500. Contract work is by the hour: $25-$31/hour for K-12 editorial QA at Kiddom, $24.92-$35.01 at Miaplaza, $45-$55 for curriculum developers at Wilson Language Training and $45/hour for the part time Novel Education Partners role. The posted pay for the 36 curriculum jobs centres on about $85,000 a year (ranging from about $41,000 to $163,000. Corporate trainers earn about $65,000 to $90,000, and virtual tutors are $20-$60/hour or more.</p>
<h2>How to apply</h2><p>Apply through the employer's own careers page or through a specialist board such as ExitTicketJobs, which lists curriculum and content roles drawn from employers' own job feeds and rebuilds its list regularly; its curriculum list was rebuilt on 27 November 2026 with 36 jobs from 19 employers. Read each job description closely, because titles overlap heavily: "curriculum developer" at one company means pure writing, and at another includes full authoring-tool and learning-platform work. Tailor the application around lesson design, assessment writing and any authoring tools used, rather than classroom management.</p>
<h2>What the notice does not say</h2><p>These are guide figures drawn from live listings and 2026 pay data, not a single vacancy notice, so there is no single closing date, post count or interview schedule to report. Pay varies widely by employer, contract type and seniority, and the figures quoted are ranges and averages, not offers. None of the sources state whether visa sponsorship is available, and remote does not always mean worldwide. Most of these roles are remote within the United States, so check the location terms on each listing before applying.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Real employers never charge for an application, an assessment or a job offer, and any listing that asks for payment is a scam.</p>
<p>Sources: <a href="https://exitticketjobs.com/curriculum-writing-jobs">ExitTicketJobs</a> (curriculum writing jobs list, rebuilt 27 November 2026: 36 jobs, 15 remote, pay centred on about $85,000); <a href="https://roamjobs.com/guides/getting-hired/best-remote-jobs-for-teachers/">RoamJobs</a> (remote jobs for teachers guide: instructional design and curriculum pay ranges); <a href="https://static1.squarespace.com/static/638417564d1af74b34cb9be7/t/64383862291288075a892197/1681406051127/Curriculum+Designer+Description+%28Part-Time%29.pdf">Novel Education Partners</a> (ELA Curriculum Designer: $45/hr, remote part-time, three years ELA teaching experience).</p>
<h2>Frequently asked questions</h2>
<h3>What's the best paid remote job for a former teacher?</h3>
<p>Senior Instructional Designer at $110,000 and upwards, some of the roles well above $125,000.</p>
<h3>Do I need a second degree to get into instructional design?</h3>
<p>No, teaching experience and subject matter expertise are the key requirements, authoring tool experience is a plus for corporate type roles.</p>
<h3>How many remote curriculum jobs are there at the moment?</h3>
<p>On the ExitTicketJobs board 15 of the 36 Curriculum & Content jobs were fully remote when the list was rebuilt on 27 November 2026.</p>
<h3>Is remote teaching work available worldwide?</h3>
<p>Not necessarily, most of these are remote within the US so you'll need to check the location on each listing.</p>
$$,
$$<p>Teaching experience translates directly into remote work and the most well-paid paths are in instructional design and curriculum writing rather than in live online teaching. The best paying remote jobs for ex-teachers in this round up are in instructional design (from about $25/hour for contract writing up to $125,000 a year for senior instructional design) and there are 15 fully remote curriculum roles listed on one specialist board as of 27th November 2026.</p>
<table><tbody><tr><td>Organisation</td><td>Edtech companies, publishers and training teams, including Pearson, Kiddom, Wilson Language Training and Novel Education Partners</td></tr><tr><td>Post</td><td>Instructional Designer, Curriculum Developer/Writer, Corporate Trainer, Educational Content Writer, Virtual Tutor</td></tr><tr><td>Pay</td><td>About $25 to $55 an hour for contract writing; $55,000 to $125,000 a year for full-time roles</td></tr><tr><td>Application route</td><td>Online through the employer's careers page or the specialist job board</td></tr><tr><td>Qualification</td><td>Teaching experience or subject expertise; at least 3 years of ELA teaching for the Novel Education Partners role</td></tr><tr><td>Selection</td><td>Application and assessment; employers look for lesson design, assessment writing and learning-platform skills</td></tr></tbody></table>
<h2>What remote jobs for former teachers involve</h2><p>Instructional designers create digital learning for companies, universities, government bodies and the health sector. They look at what the learners need and then build the course using tools such as Articulate Storyline and LMSS. Curriculum developers write the content itself (the course outline, the lesson sequence, the assessments, the video scripts) for edtech companies, publishers and test prep firms. Corporate trainers deliver virtual training to staff and virtual tutors provide one-to-one teaching. The US BLS puts the national median for instructional coordinators (which would include curriculum writers and specialists) at $77,440 per year and there are an estimated 23,100 openings per year between 2025 and 2035. For those wanting to look further afield there's a section on <a href="https://growentix.cloud/remote">remote jobs</a> and our guide to <a href="https://growentix.cloud/articles/remote-jobs-project-manager-20261125">remote project manager jobs</a>.</p>
<h2>Who can apply</h2><p>Former teachers with classroom experience are the core candidates, and the roles reward the skills teaching already builds: breaking down complex topics, designing learning sequences and creating assessments. The Novel Education Partners ELA Curriculum Designer asks for a bachelor's degree, a master's as a plus, and at least three years of effective ELA teaching experience. Eight of the 36 curriculum and content jobs on the ExitTicketJobs board mention teaching or classroom experience. No second degree is needed for most of these paths, though corporate instructional design roles may ask for authoring-tool experience.</p>
<h2>What it pays</h2><p>Remote instructional designers cluster around $65,000 to $88,000 in the middle range, with the senior roles reaching $110,000 and beyond, and some people reporting the top end above $125,000. Curriculum developers average roughly $76,000 to $87,000 a year, with the middle 50% between about $59,000 and $81,500. Contract work is by the hour: $25-$31/hour for K-12 editorial QA at Kiddom, $24.92-$35.01 at Miaplaza, $45-$55 for curriculum developers at Wilson Language Training and $45/hour for the part time Novel Education Partners role. The posted pay for the 36 curriculum jobs centres on about $85,000 a year (ranging from about $41,000 to $163,000. Corporate trainers earn about $65,000 to $90,000, and virtual tutors are $20-$60/hour or more.</p>
<h2>How to apply</h2><p>Apply through the employer's own careers page or through a specialist board such as ExitTicketJobs, which lists curriculum and content roles drawn from employers' own job feeds and rebuilds its list regularly; its curriculum list was rebuilt on 27 November 2026 with 36 jobs from 19 employers. Read each job description closely, because titles overlap heavily: "curriculum developer" at one company means pure writing, and at another includes full authoring-tool and learning-platform work. Tailor the application around lesson design, assessment writing and any authoring tools used, rather than classroom management.</p>
<h2>What the notice does not say</h2><p>These are guide figures drawn from live listings and 2026 pay data, not a single vacancy notice, so there is no single closing date, post count or interview schedule to report. Pay varies widely by employer, contract type and seniority, and the figures quoted are ranges and averages, not offers. None of the sources state whether visa sponsorship is available, and remote does not always mean worldwide. Most of these roles are remote within the United States, so check the location terms on each listing before applying.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Real employers never charge for an application, an assessment or a job offer, and any listing that asks for payment is a scam.</p>
<p>Sources: <a href="https://exitticketjobs.com/curriculum-writing-jobs">ExitTicketJobs</a> (curriculum writing jobs list, rebuilt 27 November 2026: 36 jobs, 15 remote, pay centred on about $85,000); <a href="https://roamjobs.com/guides/getting-hired/best-remote-jobs-for-teachers/">RoamJobs</a> (remote jobs for teachers guide: instructional design and curriculum pay ranges); <a href="https://static1.squarespace.com/static/638417564d1af74b34cb9be7/t/64383862291288075a892197/1681406051127/Curriculum+Designer+Description+%28Part-Time%29.pdf">Novel Education Partners</a> (ELA Curriculum Designer: $45/hr, remote part-time, three years ELA teaching experience).</p>
<h2>Frequently asked questions</h2>
<h3>What's the best paid remote job for a former teacher?</h3>
<p>Senior Instructional Designer at $110,000 and upwards, some of the roles well above $125,000.</p>
<h3>Do I need a second degree to get into instructional design?</h3>
<p>No, teaching experience and subject matter expertise are the key requirements, authoring tool experience is a plus for corporate type roles.</p>
<h3>How many remote curriculum jobs are there at the moment?</h3>
<p>On the ExitTicketJobs board 15 of the 36 Curriculum & Content jobs were fully remote when the list was rebuilt on 27 November 2026.</p>
<h3>Is remote teaching work available worldwide?</h3>
<p>Not necessarily, most of these are remote within the US so you'll need to check the location on each listing.</p>
$$,
ARRAY['https://exitticketjobs.com/curriculum-writing-jobs', 'https://roamjobs.com/guides/getting-hired/best-remote-jobs-for-teachers/', 'https://static1.squarespace.com/static/638417564d1af74b34cb9be7/t/64383862291288075a892197/1681406051127/Curriculum+Designer+Description+%28Part-Time%29.pdf'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- sap-jobs-20261128 (europe; Germany; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'sap-jobs-20261128', 'europe', 'Germany',
'SAP Jobs: 10,000 Roles Reported at Risk',
'SAP Jobs: 10,000 Roles Reported at Risk',
'SAP jobs: at least 10,000 roles are reported at risk in an AI restructuring, about 9% of staff, but SAP says no decisions have been made.',
'SAP jobs: at least 10,000 roles are reported at risk in an AI restructuring, about 9% of staff, but SAP says no decisions have been made.',
$$<p>SAP is reportedly considering cutting at least 10,000 jobs as it reshapes its business around artificial intelligence, in what would be one of the year's largest tech restructurings. SAP jobs are therefore under a cloud, but the company has not confirmed any cuts, and its own statement says no decisions have been made on further measures.</p>
<table><tbody><tr><td>Organisation</td><td>SAP SE, Walldorf, Germany</td></tr><tr><td>Post</td><td>At least 10,000 roles reported under consideration, about 9% of a workforce of more than 110,000</td></tr><tr><td>Notification</td><td>Reported by Bloomberg on 26-27 November 2026; SAP has not confirmed the plan</td></tr></tbody></table>
<h2>What SAP jobs are reported at risk</h2><p>Bloomberg reported, citing people familiar with the matter, that SAP is preparing a plan to eliminate at least 10,000 positions to transform its software business for the AI era. Product development, engineering and sales are among the departments reportedly being examined, as chief executive Christian Klein pushes to make AI central to SAP's applications and to change how the company builds, develops and markets its products. The total number has not been finalised and could change after negotiations with employee representatives, and the plans have not yet been discussed with them, according to the Financial Times. SAP has historically announced major restructuring programmes in late January, alongside its annual results. Readers following tech hiring can browse <a href="https://growentix.cloud/europe">Europe jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-germany-20261127">jobs in Germany</a>.</p>
<h2>Who is affected</h2><p>No function, location or grade has been confirmed as affected as the plan itself is unconfirmed. The reported scope is 9% of a global workforce of over 110,000, with product, engineering and sales teams all named. SAP restructured its executive board twice in 2026 as part of the AI-first drive and two of its six board members are due to step down in March. The last major restructuring (announced in 2024) saw the elimination of around 10,000 roles at a cost of some €3bn and took over a year to complete.</p>
<h2>What it pays</h2><p>No pay, severance or package figures have been no publication of any terms. Anyone impacted should be relying solely on SAP's own communications and their works council, not on any social media posts about people getting paid.</p>
<h2>What staff and applicants should do</h2><p>Staff are to treat the 10,000 figure as a report not a decision. SAP's spokesperson made it clear that the business environment is changing very rapidly through AI and SAP is constantly reviewing how its organisation and workforce will need to evolve, but "beyond that no decisions have been made as to any further measures". Jobseekers should check SAP's official careers site for current vacancies as there is still hiring going on in some areas during the restructuring and they should only apply via the official channels.</p>
<h2>What the reports do not say</h2><p>The reports do not say which roles, countries or teams would be cut, when any decision would be announced, or what severance terms would apply. SAP declined to comment on whether any job cuts are planned, and the company has not confirmed the Bloomberg figure. The reports also do not say whether SAP is hiring in AI roles at the same time, which is common in AI restructurings.</p>
<p><strong>Never pay anyone to apply for this job.</strong> SAP recruitment is free, and no agent can sell a job at SAP; anyone asking for money for a vacancy is running a scam.</p>
<p>Sources: <a href="https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781">Channel News Asia</a> (Bloomberg report, SAP's response and the employee-representative position, 27 November 2026); <a href="https://www.moneycontrol.com/technology/sap-layoffs-company-may-cut-10-000-jobs-as-ai-push-triggers-major-workforce-restructuring-article-14090018.html">Moneycontrol</a> (at least 10,000 jobs, 9% of the workforce, departments under review); <a href="https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs">Morningstar</a> (SAP spokesperson's statement and the wider tech layoffs context).</p>
<h2>Frequently asked questions</h2>
<h3>Is SAP cutting 10,000 jobs?</h3>
<p>Not confirmed. Bloomberg reports SAP is considering a cut of at least 10,000 jobs and SAP says no decisions have been taken on any further measures.</p>
<h3>Which SAP teams are reportedly under review?</h3>
<p>Product development, engineering and sales as per the report.</p>
<h3>How big is SAP's workforce?</h3>
<p>Over 110,000 people globally, so 10,000 roles would represent approximately 9% of the workforce.</p>
<h3>When might SAP announce a decision?</h3>
<p>Unknown, though SAP have a history of announcing major restructuring exercises in late January as part of their annual results announcement.</p>
$$,
$$<p>SAP is reportedly considering cutting at least 10,000 jobs as it reshapes its business around artificial intelligence, in what would be one of the year's largest tech restructurings. SAP jobs are therefore under a cloud, but the company has not confirmed any cuts, and its own statement says no decisions have been made on further measures.</p>
<table><tbody><tr><td>Organisation</td><td>SAP SE, Walldorf, Germany</td></tr><tr><td>Post</td><td>At least 10,000 roles reported under consideration, about 9% of a workforce of more than 110,000</td></tr><tr><td>Notification</td><td>Reported by Bloomberg on 26-27 November 2026; SAP has not confirmed the plan</td></tr></tbody></table>
<h2>What SAP jobs are reported at risk</h2><p>Bloomberg reported, citing people familiar with the matter, that SAP is preparing a plan to eliminate at least 10,000 positions to transform its software business for the AI era. Product development, engineering and sales are among the departments reportedly being examined, as chief executive Christian Klein pushes to make AI central to SAP's applications and to change how the company builds, develops and markets its products. The total number has not been finalised and could change after negotiations with employee representatives, and the plans have not yet been discussed with them, according to the Financial Times. SAP has historically announced major restructuring programmes in late January, alongside its annual results. Readers following tech hiring can browse <a href="https://growentix.cloud/europe">Europe jobs</a> and our roundup of <a href="https://growentix.cloud/articles/jobs-in-germany-20261127">jobs in Germany</a>.</p>
<h2>Who is affected</h2><p>No function, location or grade has been confirmed as affected as the plan itself is unconfirmed. The reported scope is 9% of a global workforce of over 110,000, with product, engineering and sales teams all named. SAP restructured its executive board twice in 2026 as part of the AI-first drive and two of its six board members are due to step down in March. The last major restructuring (announced in 2024) saw the elimination of around 10,000 roles at a cost of some €3bn and took over a year to complete.</p>
<h2>What it pays</h2><p>No pay, severance or package figures have been no publication of any terms. Anyone impacted should be relying solely on SAP's own communications and their works council, not on any social media posts about people getting paid.</p>
<h2>What staff and applicants should do</h2><p>Staff are to treat the 10,000 figure as a report not a decision. SAP's spokesperson made it clear that the business environment is changing very rapidly through AI and SAP is constantly reviewing how its organisation and workforce will need to evolve, but "beyond that no decisions have been made as to any further measures". Jobseekers should check SAP's official careers site for current vacancies as there is still hiring going on in some areas during the restructuring and they should only apply via the official channels.</p>
<h2>What the reports do not say</h2><p>The reports do not say which roles, countries or teams would be cut, when any decision would be announced, or what severance terms would apply. SAP declined to comment on whether any job cuts are planned, and the company has not confirmed the Bloomberg figure. The reports also do not say whether SAP is hiring in AI roles at the same time, which is common in AI restructurings.</p>
<p><strong>Never pay anyone to apply for this job.</strong> SAP recruitment is free, and no agent can sell a job at SAP; anyone asking for money for a vacancy is running a scam.</p>
<p>Sources: <a href="https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781">Channel News Asia</a> (Bloomberg report, SAP's response and the employee-representative position, 27 November 2026); <a href="https://www.moneycontrol.com/technology/sap-layoffs-company-may-cut-10-000-jobs-as-ai-push-triggers-major-workforce-restructuring-article-14090018.html">Moneycontrol</a> (at least 10,000 jobs, 9% of the workforce, departments under review); <a href="https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs">Morningstar</a> (SAP spokesperson's statement and the wider tech layoffs context).</p>
<h2>Frequently asked questions</h2>
<h3>Is SAP cutting 10,000 jobs?</h3>
<p>Not confirmed. Bloomberg reports SAP is considering a cut of at least 10,000 jobs and SAP says no decisions have been taken on any further measures.</p>
<h3>Which SAP teams are reportedly under review?</h3>
<p>Product development, engineering and sales as per the report.</p>
<h3>How big is SAP's workforce?</h3>
<p>Over 110,000 people globally, so 10,000 roles would represent approximately 9% of the workforce.</p>
<h3>When might SAP announce a decision?</h3>
<p>Unknown, though SAP have a history of announcing major restructuring exercises in late January as part of their annual results announcement.</p>
$$,
ARRAY['https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781', 'https://www.moneycontrol.com/technology/sap-layoffs-company-may-cut-10-000-jobs-as-ai-push-triggers-major-workforce-restructuring-article-14090018.html', 'https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- swiggy-instamart-jobs-20261128 (india; India; verifiedAt 2026-11-28)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'swiggy-instamart-jobs-20261128', 'india', 'India',
'Swiggy Instamart Jobs: 340 Roles Cut',
'Swiggy Instamart Jobs: 340 Roles Cut',
'Swiggy Instamart jobs: 340 corporate and support roles are being cut in an AI-led restructuring, with severance and health cover until May 2027.',
'Swiggy Instamart jobs: 340 corporate and support roles are being cut in an AI-led restructuring, with severance and health cover until May 2027.',
$$<p>Swiggy is cutting 340 roles across its Instamart quick commerce arm as part of a wider restructuring which includes the impact of generative AI and new ways of working. The cuts are focused on Swiggy Instamart roles and are primarily in the corporate and support functions. Swiggy says it will be continuing to invest in the stores, supply chain and the frontline teams.</p>
<table><tbody><tr><td>Organisation</td><td>Swiggy, quick-commerce arm Instamart</td></tr><tr><td>Post</td><td>340 roles cut, largely in corporate and support functions</td></tr><tr><td>Notification</td><td>Reported 27 November 2026</td></tr></tbody></table>
<h2>What Swiggy Instamart jobs are affected</h2><p>The cuts were first reported by Moneycontrol and confirmed to Reuters by a person familiar with the matter on 27 November 2026. They are the first major development under Instamart chief executive Nandita Sinha, the former Myntra chief executive, who took charge on 3 August 2026. The restructuring comes as Instamart reshapes itself for its next phase of growth, factoring in generative AI, new ways of working and how the unit is organised. Instamart is moving towards an inventory-led business model from the middle of the third quarter of FY27, a shift expected to take two to three quarters. Readers following Indian hiring can browse <a href="https://growentix.cloud/asia">Asia jobs</a> and our guide to <a href="https://growentix.cloud/articles/singapore-work-permit-jobs-nts-occupations-20261123">Singapore work permit jobs</a>.</p>
<h2>Who is affected</h2><p>Approximately 340 people in corporate and support roles are impacted (out of a Swiggy workforce of c.9,047 excluding delivery partners) according to the company's most recent annual report. There is no separate headcount disclosed for Instamart. Delivery partners or the frontline store and supply chain teams and Instamart has stated it will continue to invest in those teams. The reports don't name which of the corporate teams are being affected.</p>
<h2>What it pays</h2><p>Affected employees receive an assistance package covering severance beyond statutory payouts, accelerated vesting of employee stock options through their last working day, extended health insurance and wellness subscriptions until May 2027, and relocation and outplacement support. No individual salary or severance figures have been reported. The cuts come as Instamart grows: gross order value rose 16.7% quarter-on-quarter to Rs 9,230 crore in the second quarter of FY27, even as its adjusted EBITDA loss widened to Rs 895 crore in the September quarter from Rs 778 crore in the previous quarter.</p>
<h2>What affected staff and applicants should do</h2><p>Affected staff should make use of the outplacement support and check the accelerated stock vesting and the health cover extension to May 2027 with the company directly. Jobseekers should be aware that the cuts are in corporate and support functions only, not in the stores, supply chain or the frontline teams where Instamart has said it is continuing to invest. All applications for any live Swiggy or Instamart role must be made via the company's official careers channels and anyone who contacts you asking for payment to get a job is a scam.</p>
<h2>What the reports do not say</h2><p>The reports make no mention of the teams affected, give no last working date and say nothing about whether further rounds will be held. Swiggy has not responded to some of the queries from the media at the time of publication and has not issued its own statement with the details. The reports also give no indication of how many of the 340 roles are in Bengaluru or in other locations.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Swiggy recruitment is free and no agent can sell you a job at Swiggy or Instamart. If anyone is asking for money for a job then they're running a scam.</p>
<p>Sources: <a href="https://www.reuters.com/business/world-at-work/indias-swiggy-cut-340-roles-instamart-source-says-2026-11-27/">Reuters</a> (340 roles cut, assistance package, 27 November 2026); <a href="https://www.business-standard.com/companies/news/swiggy-instamart-cuts-340-jobs-restructuring-gen-ai-profitability-126112700516_1.html">Business Standard</a> (corporate and support roles impacted, Gen AI restructuring, quarterly figures); <a href="https://www.thehindubusinessline.com/companies/swiggy-instamart-cuts-340-roles-as-quick-commerce-player-sharpens-focus-on-profitability/article71749763.ece">The Hindu BusinessLine</a> (details of the transition assistance package, 27 November 2026).</p>
<h2>Frequently asked questions</h2>
<h3>How many Instamart jobs are being cut?</h3>
<p>340 roles, mostly in corporate and support functions.</p>
<h3>What support is available to the affected Instamart staff?</h3>
<p>Severance beyond statutory payouts, accelerated stock vesting to the last working day, health insurance until May 2027, and relocation and outplacement support.</p>
<h3>Are delivery partners affected?</h3>
<p>No, the cuts are to corporate and support roles. Instamart says it will continue to invest in stores, the supply chain and the frontline teams.</p>
<h3>Why is Instamart restructuring?</h3>
<p>To restructure for the next phase of growth, incorporating generative AI, new ways of working and a shift to an inventory led model.</p>
$$,
$$<p>Swiggy is cutting 340 roles across its Instamart quick commerce arm as part of a wider restructuring which includes the impact of generative AI and new ways of working. The cuts are focused on Swiggy Instamart roles and are primarily in the corporate and support functions. Swiggy says it will be continuing to invest in the stores, supply chain and the frontline teams.</p>
<table><tbody><tr><td>Organisation</td><td>Swiggy, quick-commerce arm Instamart</td></tr><tr><td>Post</td><td>340 roles cut, largely in corporate and support functions</td></tr><tr><td>Notification</td><td>Reported 27 November 2026</td></tr></tbody></table>
<h2>What Swiggy Instamart jobs are affected</h2><p>The cuts were first reported by Moneycontrol and confirmed to Reuters by a person familiar with the matter on 27 November 2026. They are the first major development under Instamart chief executive Nandita Sinha, the former Myntra chief executive, who took charge on 3 August 2026. The restructuring comes as Instamart reshapes itself for its next phase of growth, factoring in generative AI, new ways of working and how the unit is organised. Instamart is moving towards an inventory-led business model from the middle of the third quarter of FY27, a shift expected to take two to three quarters. Readers following Indian hiring can browse <a href="https://growentix.cloud/asia">Asia jobs</a> and our guide to <a href="https://growentix.cloud/articles/singapore-work-permit-jobs-nts-occupations-20261123">Singapore work permit jobs</a>.</p>
<h2>Who is affected</h2><p>Approximately 340 people in corporate and support roles are impacted (out of a Swiggy workforce of c.9,047 excluding delivery partners) according to the company's most recent annual report. There is no separate headcount disclosed for Instamart. Delivery partners or the frontline store and supply chain teams and Instamart has stated it will continue to invest in those teams. The reports don't name which of the corporate teams are being affected.</p>
<h2>What it pays</h2><p>Affected employees receive an assistance package covering severance beyond statutory payouts, accelerated vesting of employee stock options through their last working day, extended health insurance and wellness subscriptions until May 2027, and relocation and outplacement support. No individual salary or severance figures have been reported. The cuts come as Instamart grows: gross order value rose 16.7% quarter-on-quarter to Rs 9,230 crore in the second quarter of FY27, even as its adjusted EBITDA loss widened to Rs 895 crore in the September quarter from Rs 778 crore in the previous quarter.</p>
<h2>What affected staff and applicants should do</h2><p>Affected staff should make use of the outplacement support and check the accelerated stock vesting and the health cover extension to May 2027 with the company directly. Jobseekers should be aware that the cuts are in corporate and support functions only, not in the stores, supply chain or the frontline teams where Instamart has said it is continuing to invest. All applications for any live Swiggy or Instamart role must be made via the company's official careers channels and anyone who contacts you asking for payment to get a job is a scam.</p>
<h2>What the reports do not say</h2><p>The reports make no mention of the teams affected, give no last working date and say nothing about whether further rounds will be held. Swiggy has not responded to some of the queries from the media at the time of publication and has not issued its own statement with the details. The reports also give no indication of how many of the 340 roles are in Bengaluru or in other locations.</p>
<p><strong>Never pay anyone to apply for this job.</strong> Swiggy recruitment is free and no agent can sell you a job at Swiggy or Instamart. If anyone is asking for money for a job then they're running a scam.</p>
<p>Sources: <a href="https://www.reuters.com/business/world-at-work/indias-swiggy-cut-340-roles-instamart-source-says-2026-11-27/">Reuters</a> (340 roles cut, assistance package, 27 November 2026); <a href="https://www.business-standard.com/companies/news/swiggy-instamart-cuts-340-jobs-restructuring-gen-ai-profitability-126112700516_1.html">Business Standard</a> (corporate and support roles impacted, Gen AI restructuring, quarterly figures); <a href="https://www.thehindubusinessline.com/companies/swiggy-instamart-cuts-340-roles-as-quick-commerce-player-sharpens-focus-on-profitability/article71749763.ece">The Hindu BusinessLine</a> (details of the transition assistance package, 27 November 2026).</p>
<h2>Frequently asked questions</h2>
<h3>How many Instamart jobs are being cut?</h3>
<p>340 roles, mostly in corporate and support functions.</p>
<h3>What support is available to the affected Instamart staff?</h3>
<p>Severance beyond statutory payouts, accelerated stock vesting to the last working day, health insurance until May 2027, and relocation and outplacement support.</p>
<h3>Are delivery partners affected?</h3>
<p>No, the cuts are to corporate and support roles. Instamart says it will continue to invest in stores, the supply chain and the frontline teams.</p>
<h3>Why is Instamart restructuring?</h3>
<p>To restructure for the next phase of growth, incorporating generative AI, new ways of working and a shift to an inventory led model.</p>
$$,
ARRAY['https://www.reuters.com/business/world-at-work/indias-swiggy-cut-340-roles-instamart-source-says-2026-11-27/', 'https://www.business-standard.com/companies/news/swiggy-instamart-cuts-340-jobs-restructuring-gen-ai-profitability-126112700516_1.html', 'https://www.thehindubusinessline.com/companies/swiggy-instamart-cuts-340-roles-as-quick-commerce-player-sharpens-focus-on-profitability/article71749763.ece'], NOW(), NOW(), NOW(), '2026-11-28'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- altria-imperial-brands-takeover-japan-tobacco-20261128 (news; UK; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'altria-imperial-brands-takeover-japan-tobacco-20261128', 'news', 'UK',
'Altria Imperial Brands takeover talks lift Imperial shares',
'Altria Imperial Brands takeover talks lift Imperial shares',
'Altria Imperial Brands takeover talks pushed Imperial shares up 13.8% to a £25.9bn value, with Japan Tobacco reported to be weighing a joint bid.',
'Altria Imperial Brands takeover talks pushed Imperial shares up 13.8% to a £25.9bn value, with Japan Tobacco reported to be weighing a joint bid.',
$$<p>Altria Imperial Brands takeover talks have now moved into the open with Altria (maker of Marlboro) reportedly considering an all cash bid for the British company and Japan Tobacco reported to be looking at a joint bid to split the company up.</p>

<table>
<tr><td>Company</td><td>Imperial Brands, London-listed</td></tr>
<tr><td>Would-be buyer</td><td>Altria, in talks with an unnamed third party</td></tr>
<tr><td>Reported partner</td><td>Japan Tobacco, reported by Bloomberg</td></tr>
<tr><td>Imperial market value</td><td>£25.9 billion after Thursday's rise</td></tr>
<tr><td>Imperial share rise</td><td>13.8% on Thursday 26 November</td></tr>
<tr><td>Offer deadline</td><td>17:00 GMT, 24 December 2026</td></tr>
</table>

<h2>What happened</h2>

<p>US tobacco group Altria said on Thursday it was considering a possible all-cash bid for Imperial Brands and was discussing a deal involving part of the British tobacco group's business with another party. At the same time, Japan Tobacco was also reported to be weighing a bid, according to <a href="https://asia.nikkei.com/business/business-deals/marlboro-maker-altria-explores-imperial-bid-possibly-with-japan-tobacco">Nikkei Asia</a>. Bloomberg News reported that Japan Tobacco was evaluating a potential acquisition of Imperial Brands, possibly with a partner, splitting up its assets around the world, citing people familiar with the matter. Japan Tobacco declined to comment on the report.</p>

<p>Imperial said it had not received any approach and had held no discussions with Altria or a third party, but that its board would consider any proposal. Even so, Imperial shares shot 13.8% higher on Thursday to give it a market value of £25.90 billion, and Japan Tobacco shares jumped on Friday 27 November on the prospect of joining hands with Altria, <a href="https://www.channelnewsasia.com/business/japan-tobacco-shares-surge-talk-it-may-acquire-part-imperial-6586256">CNA</a> reported. Under UK takeover rules, Altria has until 17:00 GMT on 24 December 2026 to make a firm offer or walk away.</p>

<h2>What the Altria Imperial Brands takeover would mean</h2>

<p>A deal would be one of the biggest consolidations the tobacco industry has seen, as cigarette makers battle long-term declines in smoking rates in many markets. Altria, Japan Tobacco and Imperial have all had less success than larger rivals such as Philip Morris International and British American Tobacco in building up newer product lines to drive growth. Analysts say a sensible split would see Japan Tobacco take Imperial's US assets and possibly some other regional businesses, while Altria would take some, or all, of its international assets. Imperial owns cigarette brands including Davidoff, Gauloises and Kool, sold in more than 100 markets, while Japan Tobacco's brands include Camel and Benson &amp; Hedges. If completed with a premium to Imperial's current market value, the transaction would be the third-largest targeting a tobacco company in history, according to LSEG data cited by Reuters. A joint bid would also neatly avoid antitrust objections, since Altria is only present in North America, RBC Capital Markets analyst James Edwardes Jones said in a note. For more on big UK business stories, see our <a href="https://growentix.cloud/uk">UK jobs and business</a> coverage and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the sources do not say</h2>

<p>The sources don't name the third party Altria is in discussion with, nor do they provide any price for a potential offer. Altria and Japan Tobacco have not disclosed their price and no deal has been struck on any split of the business. The sources don't say what would happen to Imperial's workforce or its factories in the event of a deal, nor do they say whether Japan Tobacco's reported $8.7bn loss following the loss of its Russian subsidiaries affects its ability to fund a bid.</p>

<p>Sources: <a href="https://www.channelnewsasia.com/business/japan-tobacco-shares-surge-talk-it-may-acquire-part-imperial-6586256">CNA</a> for the share moves, the £25.9bn valuation and the split rationale; <a href="https://asia.nikkei.com/business/business-deals/marlboro-maker-altria-explores-imperial-bid-possibly-with-japan-tobacco">Nikkei Asia</a> for Altria's statement, the Bloomberg report and the 24th December deadline; <a href="https://www.breakingviews.com/columns/breaking-view/snaring-imperial-will-take-fair-degree-puff-2026-11-27/">Reuters Breakingviews</a> for the deal arithmetic and the antitrust analysis.</p>
$$,
$$<p>Altria Imperial Brands takeover talks have now moved into the open with Altria (maker of Marlboro) reportedly considering an all cash bid for the British company and Japan Tobacco reported to be looking at a joint bid to split the company up.</p>

<table>
<tr><td>Company</td><td>Imperial Brands, London-listed</td></tr>
<tr><td>Would-be buyer</td><td>Altria, in talks with an unnamed third party</td></tr>
<tr><td>Reported partner</td><td>Japan Tobacco, reported by Bloomberg</td></tr>
<tr><td>Imperial market value</td><td>£25.9 billion after Thursday's rise</td></tr>
<tr><td>Imperial share rise</td><td>13.8% on Thursday 26 November</td></tr>
<tr><td>Offer deadline</td><td>17:00 GMT, 24 December 2026</td></tr>
</table>

<h2>What happened</h2>

<p>US tobacco group Altria said on Thursday it was considering a possible all-cash bid for Imperial Brands and was discussing a deal involving part of the British tobacco group's business with another party. At the same time, Japan Tobacco was also reported to be weighing a bid, according to <a href="https://asia.nikkei.com/business/business-deals/marlboro-maker-altria-explores-imperial-bid-possibly-with-japan-tobacco">Nikkei Asia</a>. Bloomberg News reported that Japan Tobacco was evaluating a potential acquisition of Imperial Brands, possibly with a partner, splitting up its assets around the world, citing people familiar with the matter. Japan Tobacco declined to comment on the report.</p>

<p>Imperial said it had not received any approach and had held no discussions with Altria or a third party, but that its board would consider any proposal. Even so, Imperial shares shot 13.8% higher on Thursday to give it a market value of £25.90 billion, and Japan Tobacco shares jumped on Friday 27 November on the prospect of joining hands with Altria, <a href="https://www.channelnewsasia.com/business/japan-tobacco-shares-surge-talk-it-may-acquire-part-imperial-6586256">CNA</a> reported. Under UK takeover rules, Altria has until 17:00 GMT on 24 December 2026 to make a firm offer or walk away.</p>

<h2>What the Altria Imperial Brands takeover would mean</h2>

<p>A deal would be one of the biggest consolidations the tobacco industry has seen, as cigarette makers battle long-term declines in smoking rates in many markets. Altria, Japan Tobacco and Imperial have all had less success than larger rivals such as Philip Morris International and British American Tobacco in building up newer product lines to drive growth. Analysts say a sensible split would see Japan Tobacco take Imperial's US assets and possibly some other regional businesses, while Altria would take some, or all, of its international assets. Imperial owns cigarette brands including Davidoff, Gauloises and Kool, sold in more than 100 markets, while Japan Tobacco's brands include Camel and Benson &amp; Hedges. If completed with a premium to Imperial's current market value, the transaction would be the third-largest targeting a tobacco company in history, according to LSEG data cited by Reuters. A joint bid would also neatly avoid antitrust objections, since Altria is only present in North America, RBC Capital Markets analyst James Edwardes Jones said in a note. For more on big UK business stories, see our <a href="https://growentix.cloud/uk">UK jobs and business</a> coverage and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the sources do not say</h2>

<p>The sources don't name the third party Altria is in discussion with, nor do they provide any price for a potential offer. Altria and Japan Tobacco have not disclosed their price and no deal has been struck on any split of the business. The sources don't say what would happen to Imperial's workforce or its factories in the event of a deal, nor do they say whether Japan Tobacco's reported $8.7bn loss following the loss of its Russian subsidiaries affects its ability to fund a bid.</p>

<p>Sources: <a href="https://www.channelnewsasia.com/business/japan-tobacco-shares-surge-talk-it-may-acquire-part-imperial-6586256">CNA</a> for the share moves, the £25.9bn valuation and the split rationale; <a href="https://asia.nikkei.com/business/business-deals/marlboro-maker-altria-explores-imperial-bid-possibly-with-japan-tobacco">Nikkei Asia</a> for Altria's statement, the Bloomberg report and the 24th December deadline; <a href="https://www.breakingviews.com/columns/breaking-view/snaring-imperial-will-take-fair-degree-puff-2026-11-27/">Reuters Breakingviews</a> for the deal arithmetic and the antitrust analysis.</p>
$$,
ARRAY['https://www.channelnewsasia.com/business/japan-tobacco-shares-surge-talk-it-may-acquire-part-imperial-6586256', 'https://asia.nikkei.com/business/business-deals/marlboro-maker-altria-explores-imperial-bid-possibly-with-japan-tobacco', 'https://www.breakingviews.com/columns/breaking-view/snaring-imperial-will-take-fair-degree-puff-2026-11-27/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- andy-taylor-duran-duran-guitarist-dies-65-20261128 (news; UK; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'andy-taylor-duran-duran-guitarist-dies-65-20261128', 'news', 'UK',
'Andy Taylor, Duran Duran guitarist, dies at 65',
'Andy Taylor, Duran Duran guitarist, dies at 65',
'Andy Taylor, Duran Duran guitarist and co-writer of Rio and Hungry Like the Wolf, died at home on 23 November aged 65 after a long battle with prostate cancer.',
'Andy Taylor, Duran Duran guitarist and co-writer of Rio and Hungry Like the Wolf, died at home on 23 November aged 65 after a long battle with prostate cancer.',
$$<p>Andy Taylor (guitarist and co-writer of some of Duran Duran's biggest hits) died peacefully at home on Monday 23rd November aged 65 following a long illness with prostate cancer.</p>

<table>
<tr><td>Person</td><td>Andy Taylor, original guitarist, Duran Duran</td></tr>
<tr><td>Died</td><td>Monday 23 November 2026, aged 65</td></tr>
<tr><td>Cause</td><td>Stage 4 metastatic prostate cancer</td></tr>
<tr><td>Announced</td><td>Wednesday 25 November 2026</td></tr>
<tr><td>Born</td><td>16 February 1961, Tynemouth, England</td></tr>
<tr><td>Survived by</td><td>Wife Tracey and four children</td></tr>
</table>

<h2>What happened</h2>

<p>Taylor died peacefully at home in the presence of his family on Monday (family and bandmates said in a joint statement posted on social media and on the Duran Duran website on Wednesday, according to <a href="https://www.cnn.com/2026/11/25/entertainment/andy-taylor-original-guitarist-for-duran-duran-dies-at-65?cid=external-feeds_iluminar_meta">CNN</a>). Taylor announced in November 2022 that he'd been diagnosed four years earlier with stage four metastatic prostate cancer. The news came on the night of the band's induction into the Rock &amp; Roll Hall of Fame (he wasn't able to attend).</p>

<p>Taylor was an original member of Duran Duran and it was his guitar riffs that defined so many of the iconic 1980s new wave hits (Rio and The Reflex being the most famous). He co-wrote Hungry Like The Wolf, Rio and Girls On Film and won two Grammys with the band. He was also a member of The Power Station and a solo artist. His 2023 album Man's a Wolf to Man was his first solo album in over 30 years. His wife Tracey said in a statement that the family had asked for donations to Prostate Cancer UK rather than flowers. For more music news, check out our <a href="https://growentix.cloud/popmusic">Pop Music</a> section and the <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-29-weeks-number-one-20261127">Ella Langley chart record</a> report.</p>

<h2>What Andy Taylor Duran Duran meant to music</h2>

<p>Taylor gave Duran Duran its rock edge. The band's huge pop hits were inseparable from the launch of MTV, and Taylor's guitar work on songs such as Hungry Like the Wolf and Rio helped define the sound of 1980s new wave. He married Tracey in 1982 and had four children, Andy, Georgie, Bethy and Izzy, and a grandson, Albie, all of whom survive him. He had lived in Ibiza, Spain. The news of his death comes two weeks after the band announced that drummer Roger Taylor would be stepping down and retiring from music altogether because of worsening tinnitus symptoms, <a href="https://www.usatoday.com/story/entertainment/music/2026/11/25/andy-taylor-dead-duran-duran-cancer/92964430007/">USA Today</a> reported.</p>

<h2>What the sources do not say</h2>

<p>The sources provide no details as to funeral arrangements and make no mention of any tribute performances being planned by the band. They give no indication as to when Taylor's illness actually deteriorated in those final weeks and there is no statement from the band regarding the band's future without him.</p>

<p>Sources: <a href="https://www.cnn.com/2026/11/25/entertainment/andy-taylor-original-guitarist-for-duran-duran-dies-at-65?cid=external-feeds_iluminar_meta">CNN</a> for the death announcement and the cancer diagnosis; <a href="https://www.usatoday.com/story/entertainment/music/2026/11/25/andy-taylor-dead-duran-duran-cancer/92964430007/">USA Today</a> for the family statement, the Prostate Cancer UK request and the Roger Taylor news; <a href="https://people.com/andy-taylor-duran-duran-guitarist-dead-age-65-prostate-cancer-battle-8594097">People</a> for the 23 November date and the family's confirmation.</p>
$$,
$$<p>Andy Taylor (guitarist and co-writer of some of Duran Duran's biggest hits) died peacefully at home on Monday 23rd November aged 65 following a long illness with prostate cancer.</p>

<table>
<tr><td>Person</td><td>Andy Taylor, original guitarist, Duran Duran</td></tr>
<tr><td>Died</td><td>Monday 23 November 2026, aged 65</td></tr>
<tr><td>Cause</td><td>Stage 4 metastatic prostate cancer</td></tr>
<tr><td>Announced</td><td>Wednesday 25 November 2026</td></tr>
<tr><td>Born</td><td>16 February 1961, Tynemouth, England</td></tr>
<tr><td>Survived by</td><td>Wife Tracey and four children</td></tr>
</table>

<h2>What happened</h2>

<p>Taylor died peacefully at home in the presence of his family on Monday (family and bandmates said in a joint statement posted on social media and on the Duran Duran website on Wednesday, according to <a href="https://www.cnn.com/2026/11/25/entertainment/andy-taylor-original-guitarist-for-duran-duran-dies-at-65?cid=external-feeds_iluminar_meta">CNN</a>). Taylor announced in November 2022 that he'd been diagnosed four years earlier with stage four metastatic prostate cancer. The news came on the night of the band's induction into the Rock &amp; Roll Hall of Fame (he wasn't able to attend).</p>

<p>Taylor was an original member of Duran Duran and it was his guitar riffs that defined so many of the iconic 1980s new wave hits (Rio and The Reflex being the most famous). He co-wrote Hungry Like The Wolf, Rio and Girls On Film and won two Grammys with the band. He was also a member of The Power Station and a solo artist. His 2023 album Man's a Wolf to Man was his first solo album in over 30 years. His wife Tracey said in a statement that the family had asked for donations to Prostate Cancer UK rather than flowers. For more music news, check out our <a href="https://growentix.cloud/popmusic">Pop Music</a> section and the <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-29-weeks-number-one-20261127">Ella Langley chart record</a> report.</p>

<h2>What Andy Taylor Duran Duran meant to music</h2>

<p>Taylor gave Duran Duran its rock edge. The band's huge pop hits were inseparable from the launch of MTV, and Taylor's guitar work on songs such as Hungry Like the Wolf and Rio helped define the sound of 1980s new wave. He married Tracey in 1982 and had four children, Andy, Georgie, Bethy and Izzy, and a grandson, Albie, all of whom survive him. He had lived in Ibiza, Spain. The news of his death comes two weeks after the band announced that drummer Roger Taylor would be stepping down and retiring from music altogether because of worsening tinnitus symptoms, <a href="https://www.usatoday.com/story/entertainment/music/2026/11/25/andy-taylor-dead-duran-duran-cancer/92964430007/">USA Today</a> reported.</p>

<h2>What the sources do not say</h2>

<p>The sources provide no details as to funeral arrangements and make no mention of any tribute performances being planned by the band. They give no indication as to when Taylor's illness actually deteriorated in those final weeks and there is no statement from the band regarding the band's future without him.</p>

<p>Sources: <a href="https://www.cnn.com/2026/11/25/entertainment/andy-taylor-original-guitarist-for-duran-duran-dies-at-65?cid=external-feeds_iluminar_meta">CNN</a> for the death announcement and the cancer diagnosis; <a href="https://www.usatoday.com/story/entertainment/music/2026/11/25/andy-taylor-dead-duran-duran-cancer/92964430007/">USA Today</a> for the family statement, the Prostate Cancer UK request and the Roger Taylor news; <a href="https://people.com/andy-taylor-duran-duran-guitarist-dead-age-65-prostate-cancer-battle-8594097">People</a> for the 23 November date and the family's confirmation.</p>
$$,
ARRAY['https://www.cnn.com/2026/11/25/entertainment/andy-taylor-original-guitarist-for-duran-duran-dies-at-65?cid=external-feeds_iluminar_meta', 'https://www.usatoday.com/story/entertainment/music/2026/11/25/andy-taylor-dead-duran-duran-cancer/92964430007/', 'https://people.com/andy-taylor-duran-duran-guitarist-dead-age-65-prostate-cancer-battle-8594097'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- black-friday-online-sales-13-billion-adobe-20261128 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'black-friday-online-sales-13-billion-adobe-20261128', 'news', 'USA',
'Black Friday online sales to pass $13 billion, Adobe says',
'Black Friday online sales to pass $13 billion, Adobe says',
'Black Friday online sales reached $9.7 billion by 6:30pm and are set to pass $13 billion, Adobe says, as shoppers looked past inflation and high fuel prices.',
'Black Friday online sales reached $9.7 billion by 6:30pm and are set to pass $13 billion, Adobe says, as shoppers looked past inflation and high fuel prices.',
$$<p>Black Friday online sales are set to pass the $13bn mark in the US according to Adobe Analytics who released the figures on Friday. The figures come as shoppers are looking past the impact of inflation and high fuel prices.</p>

<table>
<tr><td>Measure</td><td>Black Friday 2026, United States</td></tr>
<tr><td>Online spending by 6:30pm ET</td><td>$9.7 billion, up 12.8% year on year</td></tr>
<tr><td>Expected final total</td><td>$13 billion to $13.4 billion</td></tr>
<tr><td>Adobe September forecast</td><td>$12.9 billion, up 9.2%</td></tr>
<tr><td>Thanksgiving online sales</td><td>$7.1 billion, a record, up 10.4%</td></tr>
<tr><td>Source</td><td>Adobe Analytics</td></tr>
</table>

<h2>What happened</h2>

<p>Online spending on Black Friday hit $9.7bn by 6.30pm ET on Friday (up 12.8% on last year) according to Adobe, with the final figure expected to land between $13 billion and $13.4 billion, <a href="https://www.reuters.com/business/retail-consumer/us-black-friday-online-sales-cross-13-billion-adobe-says-2026-11-28/">Reuters</a> reported. Adobe, which in September had forecast Black Friday online sales to be up 9.2% on last year to $12.9bn, is expecting US holiday online spend this year to grow at a similar rate to last year. Shoppers had already spent a record $7.1bn online on Thanksgiving (up 10.4% on last year) according to Adobe Digital Insights.</p>

<p>Separate data from Salesforce showed Black Friday online sales generated $5.9 billion in the US and $30.7 bn globally in the first half of the day, putting it on track for a total of $18.7 bn in the US (a 4% Yoy increase) and a 5.2% rise to $83 billion worldwide. After promoting weeks of solid discounts, many US retailers held back the big savings for Black Friday, said Vivek Pandya, director of digital insights at Adobe. Shoppers braved bad weather and the impact of inflation, with many stores reporting queues despite the Thanksgiving storm which hit the East Coast. Our guide to the day's deals is in <a href="https://growentix.cloud/articles/black-friday-2026-deals-store-hours-20261127">Black Friday 2026 deals and store hours</a> and the latest from around the world is in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What Black Friday online sales mean</h2>

<p>The figures show American consumers still spending heavily online even as prices and fuel costs stay high, and they put Black Friday on course to beat Adobe's own forecast. The $9.7 billion counted by early evening already points to a final tally above $13 billion, which would make this the biggest Black Friday for online spending yet. The Salesforce numbers tell the same story globally, with worldwide online sales on track for $83 billion. For retailers, the result matters because the holiday season is when many of them make most of their profit, and a strong Black Friday sets the tone for the rest of Cyber Week, including Cyber Monday on 30 November.</p>

<h2>What the sources do not say</h2>

<p>The $13 billion to $13.4 billion figure is the expected final total (it's not a counted total as Adobe's data only ran to 6:30 pm ET, so the final number has not been published yet. The sources don't break down which product categories were the best sellers, how much of the spend was actually due to discounts versus higher prices, or how in store compared to online. They don't give any information at all on how much was spent through buy-now-pay-later services.</p>

<p>Sources: <a href="https://www.reuters.com/business/retail-consumer/us-black-friday-online-sales-cross-13-billion-adobe-says-2026-11-28/">Reuters</a> for the Adobe figures and the expected final total; <a href="https://www.channelnewsasia.com/business/us-black-friday-online-sales-cross-13-billion-adobe-says-6588836">CNA</a> for the September forecast and the holiday outlook; <a href="https://economictimes.indiatimes.com/news/international/world-news/us-shoppers-brave-bad-weather-and-inflation-to-chase-black-friday-bargains/articleshow/136236252.cms">The Economic Times</a> for the Thanksgiving record and the Salesforce data.</p>
$$,
$$<p>Black Friday online sales are set to pass the $13bn mark in the US according to Adobe Analytics who released the figures on Friday. The figures come as shoppers are looking past the impact of inflation and high fuel prices.</p>

<table>
<tr><td>Measure</td><td>Black Friday 2026, United States</td></tr>
<tr><td>Online spending by 6:30pm ET</td><td>$9.7 billion, up 12.8% year on year</td></tr>
<tr><td>Expected final total</td><td>$13 billion to $13.4 billion</td></tr>
<tr><td>Adobe September forecast</td><td>$12.9 billion, up 9.2%</td></tr>
<tr><td>Thanksgiving online sales</td><td>$7.1 billion, a record, up 10.4%</td></tr>
<tr><td>Source</td><td>Adobe Analytics</td></tr>
</table>

<h2>What happened</h2>

<p>Online spending on Black Friday hit $9.7bn by 6.30pm ET on Friday (up 12.8% on last year) according to Adobe, with the final figure expected to land between $13 billion and $13.4 billion, <a href="https://www.reuters.com/business/retail-consumer/us-black-friday-online-sales-cross-13-billion-adobe-says-2026-11-28/">Reuters</a> reported. Adobe, which in September had forecast Black Friday online sales to be up 9.2% on last year to $12.9bn, is expecting US holiday online spend this year to grow at a similar rate to last year. Shoppers had already spent a record $7.1bn online on Thanksgiving (up 10.4% on last year) according to Adobe Digital Insights.</p>

<p>Separate data from Salesforce showed Black Friday online sales generated $5.9 billion in the US and $30.7 bn globally in the first half of the day, putting it on track for a total of $18.7 bn in the US (a 4% Yoy increase) and a 5.2% rise to $83 billion worldwide. After promoting weeks of solid discounts, many US retailers held back the big savings for Black Friday, said Vivek Pandya, director of digital insights at Adobe. Shoppers braved bad weather and the impact of inflation, with many stores reporting queues despite the Thanksgiving storm which hit the East Coast. Our guide to the day's deals is in <a href="https://growentix.cloud/articles/black-friday-2026-deals-store-hours-20261127">Black Friday 2026 deals and store hours</a> and the latest from around the world is in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What Black Friday online sales mean</h2>

<p>The figures show American consumers still spending heavily online even as prices and fuel costs stay high, and they put Black Friday on course to beat Adobe's own forecast. The $9.7 billion counted by early evening already points to a final tally above $13 billion, which would make this the biggest Black Friday for online spending yet. The Salesforce numbers tell the same story globally, with worldwide online sales on track for $83 billion. For retailers, the result matters because the holiday season is when many of them make most of their profit, and a strong Black Friday sets the tone for the rest of Cyber Week, including Cyber Monday on 30 November.</p>

<h2>What the sources do not say</h2>

<p>The $13 billion to $13.4 billion figure is the expected final total (it's not a counted total as Adobe's data only ran to 6:30 pm ET, so the final number has not been published yet. The sources don't break down which product categories were the best sellers, how much of the spend was actually due to discounts versus higher prices, or how in store compared to online. They don't give any information at all on how much was spent through buy-now-pay-later services.</p>

<p>Sources: <a href="https://www.reuters.com/business/retail-consumer/us-black-friday-online-sales-cross-13-billion-adobe-says-2026-11-28/">Reuters</a> for the Adobe figures and the expected final total; <a href="https://www.channelnewsasia.com/business/us-black-friday-online-sales-cross-13-billion-adobe-says-6588836">CNA</a> for the September forecast and the holiday outlook; <a href="https://economictimes.indiatimes.com/news/international/world-news/us-shoppers-brave-bad-weather-and-inflation-to-chase-black-friday-bargains/articleshow/136236252.cms">The Economic Times</a> for the Thanksgiving record and the Salesforce data.</p>
$$,
ARRAY['https://www.reuters.com/business/retail-consumer/us-black-friday-online-sales-cross-13-billion-adobe-says-2026-11-28/', 'https://www.channelnewsasia.com/business/us-black-friday-online-sales-cross-13-billion-adobe-says-6588836', 'https://economictimes.indiatimes.com/news/international/world-news/us-shoppers-brave-bad-weather-and-inflation-to-chase-black-friday-bargains/articleshow/136236252.cms'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- bronson-reed-dies-38-wwe-20261128 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'bronson-reed-dies-38-wwe-20261128', 'news', 'USA',
'Bronson Reed dies at 38, WWE confirms',
'Bronson Reed dies at 38, WWE confirms',
'Bronson Reed dies at 38 after medical complications, WWE announced on Friday, three weeks after the Australian star suffered broken ribs and a lacerated kidney.',
'Bronson Reed dies at 38 after medical complications, WWE announced on Friday, three weeks after the Australian star suffered broken ribs and a lacerated kidney.',
$$<p>Bronson Reed dies at 38 from medical complications, WWE have confirmed on Friday. That's three weeks after the Aussie wrestler suffered serious injuries at an event in Saudi Arabia.</p>

<table>
<tr><td>Person</td><td>Jermaine Haley, known as Bronson Reed, WWE</td></tr>
<tr><td>Died</td><td>Friday 27 November 2026, aged 38</td></tr>
<tr><td>Cause given</td><td>Medical complications, not specified</td></tr>
<tr><td>Announced by</td><td>WWE, on Friday 27 November</td></tr>
<tr><td>Recent injury</td><td>Broken ribs and lacerated kidney, 7 November</td></tr>
<tr><td>Survived by</td><td>Pregnant wife Paige and daughter Deja</td></tr>
</table>

<h2>What happened</h2>

<p>"WWE is devastated to announce that Jermaine Haley, also known as Bronson Reed, passed away earlier today at the age of 38 due to medical complications," the company said in a statement on Friday, according to <a href="https://www.cnn.com/2026/11/27/sport/bronson-reed-wwe-dies?cid=external-feeds_iluminar_meta">CNN</a>. Reed's death comes after he suffered an injury during WWE Crown Jewel in Saudi Arabia on 7 November, where he sustained multiple broken ribs and a lacerated kidney and stayed behind in Saudi Arabia for additional medical treatment. He later returned home to continue his recovery and was reported to have returned to the United States on Wednesday, 18 November.</p>

<p>Reed (real name Jermaine Haley) was an Aussie pro wrestler who had two runs in WWE, the first from 2019 to 2021 and the second from 2022 to 2026. He was NXT North American Champion and went on to win the 2024 Andre the Giant Memorial Battle Royal on the main roster. His last appearance was against Oba Femi after he interfered in The Vision's World Tag Team title defence. Tributes from Big E and Scott Steiner were among those that followed the news. For more sports news, head over to our <a href="https://growentix.cloud/articles/aaron-rodgers-released-steelers-free-agent-20261127">Aaron Rodgers released by the Steelers</a> report and the latest from our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>Bronson Reed dies: what it means for WWE</h2>

<p>Reed's death at 38 has hit the wrestling world pretty hard, coming so soon after the injury that had already kept him out for weeks. WWE paid homage to him at the start of their latest SmackDown with an emotional tribute graphic. They haven't linked his death to the Crown Jewel injuries and have not disclosed the exact cause of death or said whether it was related to them. That distinction matters: the injuries are a reported fact, while the cause of death remains officially just described as medical complications.</p>

<h2>What the sources do not say</h2>

<p>WWE have not disclosed what medical complications led to Reed's death and the sources don't indicate whether that death was in any way connected to the broken ribs and lacerated kidney he'd sustained on 7th November. The sources do not give funeral arrangements, and they do not say whether WWE have any plans for any further tribute beyond the SmackDown graphic.</p>

<p>Sources: <a href="https://www.cnn.com/2026/11/27/sport/bronson-reed-wwe-dies?cid=external-feeds_iluminar_meta">CNN</a> for the WWE announcement and the Crown Jewel injury; <a href="https://www.usatoday.com/story/sports/2026/11/27/bronson-reed-dead-wwe-star/92986594007/">USA Today</a> for the 27th November date; <a href="https://nypost.com/2026/11/27/sports/wwe-star-bronson-reed-dead-at-38-from-medical-complications/">New York Post</a> for the injury details and his return to the US.</p>
$$,
$$<p>Bronson Reed dies at 38 from medical complications, WWE have confirmed on Friday. That's three weeks after the Aussie wrestler suffered serious injuries at an event in Saudi Arabia.</p>

<table>
<tr><td>Person</td><td>Jermaine Haley, known as Bronson Reed, WWE</td></tr>
<tr><td>Died</td><td>Friday 27 November 2026, aged 38</td></tr>
<tr><td>Cause given</td><td>Medical complications, not specified</td></tr>
<tr><td>Announced by</td><td>WWE, on Friday 27 November</td></tr>
<tr><td>Recent injury</td><td>Broken ribs and lacerated kidney, 7 November</td></tr>
<tr><td>Survived by</td><td>Pregnant wife Paige and daughter Deja</td></tr>
</table>

<h2>What happened</h2>

<p>"WWE is devastated to announce that Jermaine Haley, also known as Bronson Reed, passed away earlier today at the age of 38 due to medical complications," the company said in a statement on Friday, according to <a href="https://www.cnn.com/2026/11/27/sport/bronson-reed-wwe-dies?cid=external-feeds_iluminar_meta">CNN</a>. Reed's death comes after he suffered an injury during WWE Crown Jewel in Saudi Arabia on 7 November, where he sustained multiple broken ribs and a lacerated kidney and stayed behind in Saudi Arabia for additional medical treatment. He later returned home to continue his recovery and was reported to have returned to the United States on Wednesday, 18 November.</p>

<p>Reed (real name Jermaine Haley) was an Aussie pro wrestler who had two runs in WWE, the first from 2019 to 2021 and the second from 2022 to 2026. He was NXT North American Champion and went on to win the 2024 Andre the Giant Memorial Battle Royal on the main roster. His last appearance was against Oba Femi after he interfered in The Vision's World Tag Team title defence. Tributes from Big E and Scott Steiner were among those that followed the news. For more sports news, head over to our <a href="https://growentix.cloud/articles/aaron-rodgers-released-steelers-free-agent-20261127">Aaron Rodgers released by the Steelers</a> report and the latest from our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>Bronson Reed dies: what it means for WWE</h2>

<p>Reed's death at 38 has hit the wrestling world pretty hard, coming so soon after the injury that had already kept him out for weeks. WWE paid homage to him at the start of their latest SmackDown with an emotional tribute graphic. They haven't linked his death to the Crown Jewel injuries and have not disclosed the exact cause of death or said whether it was related to them. That distinction matters: the injuries are a reported fact, while the cause of death remains officially just described as medical complications.</p>

<h2>What the sources do not say</h2>

<p>WWE have not disclosed what medical complications led to Reed's death and the sources don't indicate whether that death was in any way connected to the broken ribs and lacerated kidney he'd sustained on 7th November. The sources do not give funeral arrangements, and they do not say whether WWE have any plans for any further tribute beyond the SmackDown graphic.</p>

<p>Sources: <a href="https://www.cnn.com/2026/11/27/sport/bronson-reed-wwe-dies?cid=external-feeds_iluminar_meta">CNN</a> for the WWE announcement and the Crown Jewel injury; <a href="https://www.usatoday.com/story/sports/2026/11/27/bronson-reed-dead-wwe-star/92986594007/">USA Today</a> for the 27th November date; <a href="https://nypost.com/2026/11/27/sports/wwe-star-bronson-reed-dead-at-38-from-medical-complications/">New York Post</a> for the injury details and his return to the US.</p>
$$,
ARRAY['https://www.cnn.com/2026/11/27/sport/bronson-reed-wwe-dies?cid=external-feeds_iluminar_meta', 'https://www.usatoday.com/story/sports/2026/11/27/bronson-reed-dead-wwe-star/92986594007/', 'https://nypost.com/2026/11/27/sports/wwe-star-bronson-reed-dead-at-38-from-medical-complications/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- cyber-monday-2026-dates-deals-guide-20261128 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'cyber-monday-2026-dates-deals-guide-20261128', 'news', 'USA',
'Cyber Monday 2026: dates, deals and what ends first',
'Cyber Monday 2026: dates, deals and what ends first',
'Cyber Monday 2026 falls on Monday 30 November, with Amazon deals running to the day itself and Best Buy doorbusters ending on Sunday night.',
'Cyber Monday 2026 falls on Monday 30 November, with Amazon deals running to the day itself and Best Buy doorbusters ending on Sunday night.',
$$<p>Cyber Monday 2026 is on Monday 30th November (the online only shopping day that effectively closes out Cyber Week) and this year the best deals are actually spread across the weekend rather than being all held back for the Monday itself.</p>

<table>
<tr><td>Event</td><td>Cyber Monday 2026</td></tr>
<tr><td>Date</td><td>Monday 30 November 2026</td></tr>
<tr><td>Amazon</td><td>Black Friday Week and Cyber Monday, 19-30 November</td></tr>
<tr><td>Walmart</td><td>Online, 12:01am ET 30 November to 2 December</td></tr>
<tr><td>Best Buy</td><td>Cyber Sunday and Monday, up to 50% off, 29-30 November</td></tr>
<tr><td>Forecast</td><td>$15.1 billion in US online sales, Adobe</td></tr>
</table>

<h2>What happened</h2>

<p>Cyber Monday is the online only shopping day that comes after Black Friday and in 2026 that will be Monday 30th November (three days after Black Friday on the 27th). A lot of retailers will be starting their Cyber Monday deals a day or two in advance and will be running them for the rest of the week. Walmart's Cyber Monday event is online from 30th November to 2nd December. Best Buy have a Cyber Sunday and Monday sale on the 29th and 30th November, and Amazon's Black Friday Week finishes with Cyber Monday on 30 November, according to <a href="https://www.bunnycoupon.com/blog/when-is-cyber-monday">BunnyCoupon</a>. Amazon's deals drop twice on Cyber Monday (at midnight and 8am PT) with up to 60% off. Best Buy's Cyber Sunday and Monday sale is up to 50% off with stores open 9am to 9pm on Sunday 29th November and 10am to 10pm on Monday 30th November and there will be a limited time Cyber Monday Flash Sale is promised with no set time.</p>

<p>Other retailers have also published their plans. Kohl's have their Cyber Deals running 29- 30 Nov. Costco have their online only Cyber Monday deal list on 30 Nov. Apple are running a Black Friday to Cyber Monday shopping event 27- 30 Nov with an Apple Gift Card of up to $300 on eligible products. Ulta Beauty have their Cyber Monday deals online running 29 Nov to 1 Dec. Sephora's Cyber Week deals are up to 50% off until 30 Nov. Target have not yet announced their Cyber Monday dates (their Black Friday deals run 22- 29 Nov and their Deal of the Day is running every day until 24 Dec). Adobe are forecasting Cyber Monday at $15.1 bn in US online sales (up 6.2% Yoy). Our Black Friday results are in: <a href="https://growentix.cloud/articles/black-friday-online-sales-13-billion-adobe-20261128">Black Friday online sales are set to pass the $13 billion</a>, and the day's deals are in <a href="https://growentix.cloud/articles/black-friday-2026-deals-store-hours-20261127">Black Friday 2026 deals and store hours</a>.</p>

<h2>What Cyber Monday 2026 means for shoppers</h2>

<p>The practical point this year is timing. The Best Buy doorbusters (the deepest cuts) finish at 11:59 pm CT on Sunday 29th November so you have to have a Best Buy doorbuster in by Sunday at the latest. The wider Cyber Sunday/Monday event finishes at 11:59 pm CT on Monday 30th November. Walmart's event doesn't even start until Monday (it opens at 12:01 am ET, i.e. 9:01 pm on Sunday on the West Coast) and runs to 2nd December. Amazon's event runs from the 19th to the 30th November so Cyber Monday is really just the final day of a very long event. Sunday 29th November is the day to be editing your carts and re-reading the terms before you go. Monday is the day for tech and home items, with Best Buy, Lenovo, Dell and Samsung as your first stops for computers, phones, TVs and appliances.</p>

<h2>What the sources do not say</h2>

<p>No prices are claimed and no deal is guaranteed. The sources provide dates and discount ceilings rather than the price of any particular product and retailers can always change their offers. Target have published no Cyber Monday dates so we don't know what their plans are. The $15.1bn is Adobe's forecast (not a total that has been counted) and the actual figure won't be known until Monday. If the forecasts are wrong then Cyber Monday could end up either below or above Black Friday's expected $13bn to $13.4bn and the sources don't say which categories will be the best sellers.</p>

<p>Sources: <a href="https://www.bunnycoupon.com/blog/when-is-cyber-monday">BunnyCoupon</a> for the Cyber Monday dates by retailer; <a href="https://hitechreports.com/news/cyber-monday-2026-tech-deals-guide">HiTechReports</a> for the retailer by retailer timetable and what the end dates are; <a href="https://www.rakuten.com/blog/cyber-week-shopping-plan/">Rakuten</a> for the Cyber Week day by day plan and the Sunday cart review advice.</p>

<h2>Frequently asked questions</h2>

<h3>When is Cyber Monday 2026?</h3>
<p>Cyber Monday 2026 is Monday 30th November (the Monday after Thanksgiving and three days after Black Friday on the 27th).</p>

<h3>What ends before Cyber Monday itself?</h3>
<p>Best Buy's doorbusters end at 11:59 pm CT on Sunday, 29 November, so the deepest cuts have to be bought on Sunday. Walmart's event starts on Monday at 12:01 am ET and runs to 2 December.</p>

<h3>How much will Cyber Monday 2026 make?</h3>
<p>Adobe is forecasting $15.1bn in US online sales for Cyber Monday (up 6.2% year on year) and that's a forecast, not a total.</p>
$$,
$$<p>Cyber Monday 2026 is on Monday 30th November (the online only shopping day that effectively closes out Cyber Week) and this year the best deals are actually spread across the weekend rather than being all held back for the Monday itself.</p>

<table>
<tr><td>Event</td><td>Cyber Monday 2026</td></tr>
<tr><td>Date</td><td>Monday 30 November 2026</td></tr>
<tr><td>Amazon</td><td>Black Friday Week and Cyber Monday, 19-30 November</td></tr>
<tr><td>Walmart</td><td>Online, 12:01am ET 30 November to 2 December</td></tr>
<tr><td>Best Buy</td><td>Cyber Sunday and Monday, up to 50% off, 29-30 November</td></tr>
<tr><td>Forecast</td><td>$15.1 billion in US online sales, Adobe</td></tr>
</table>

<h2>What happened</h2>

<p>Cyber Monday is the online only shopping day that comes after Black Friday and in 2026 that will be Monday 30th November (three days after Black Friday on the 27th). A lot of retailers will be starting their Cyber Monday deals a day or two in advance and will be running them for the rest of the week. Walmart's Cyber Monday event is online from 30th November to 2nd December. Best Buy have a Cyber Sunday and Monday sale on the 29th and 30th November, and Amazon's Black Friday Week finishes with Cyber Monday on 30 November, according to <a href="https://www.bunnycoupon.com/blog/when-is-cyber-monday">BunnyCoupon</a>. Amazon's deals drop twice on Cyber Monday (at midnight and 8am PT) with up to 60% off. Best Buy's Cyber Sunday and Monday sale is up to 50% off with stores open 9am to 9pm on Sunday 29th November and 10am to 10pm on Monday 30th November and there will be a limited time Cyber Monday Flash Sale is promised with no set time.</p>

<p>Other retailers have also published their plans. Kohl's have their Cyber Deals running 29- 30 Nov. Costco have their online only Cyber Monday deal list on 30 Nov. Apple are running a Black Friday to Cyber Monday shopping event 27- 30 Nov with an Apple Gift Card of up to $300 on eligible products. Ulta Beauty have their Cyber Monday deals online running 29 Nov to 1 Dec. Sephora's Cyber Week deals are up to 50% off until 30 Nov. Target have not yet announced their Cyber Monday dates (their Black Friday deals run 22- 29 Nov and their Deal of the Day is running every day until 24 Dec). Adobe are forecasting Cyber Monday at $15.1 bn in US online sales (up 6.2% Yoy). Our Black Friday results are in: <a href="https://growentix.cloud/articles/black-friday-online-sales-13-billion-adobe-20261128">Black Friday online sales are set to pass the $13 billion</a>, and the day's deals are in <a href="https://growentix.cloud/articles/black-friday-2026-deals-store-hours-20261127">Black Friday 2026 deals and store hours</a>.</p>

<h2>What Cyber Monday 2026 means for shoppers</h2>

<p>The practical point this year is timing. The Best Buy doorbusters (the deepest cuts) finish at 11:59 pm CT on Sunday 29th November so you have to have a Best Buy doorbuster in by Sunday at the latest. The wider Cyber Sunday/Monday event finishes at 11:59 pm CT on Monday 30th November. Walmart's event doesn't even start until Monday (it opens at 12:01 am ET, i.e. 9:01 pm on Sunday on the West Coast) and runs to 2nd December. Amazon's event runs from the 19th to the 30th November so Cyber Monday is really just the final day of a very long event. Sunday 29th November is the day to be editing your carts and re-reading the terms before you go. Monday is the day for tech and home items, with Best Buy, Lenovo, Dell and Samsung as your first stops for computers, phones, TVs and appliances.</p>

<h2>What the sources do not say</h2>

<p>No prices are claimed and no deal is guaranteed. The sources provide dates and discount ceilings rather than the price of any particular product and retailers can always change their offers. Target have published no Cyber Monday dates so we don't know what their plans are. The $15.1bn is Adobe's forecast (not a total that has been counted) and the actual figure won't be known until Monday. If the forecasts are wrong then Cyber Monday could end up either below or above Black Friday's expected $13bn to $13.4bn and the sources don't say which categories will be the best sellers.</p>

<p>Sources: <a href="https://www.bunnycoupon.com/blog/when-is-cyber-monday">BunnyCoupon</a> for the Cyber Monday dates by retailer; <a href="https://hitechreports.com/news/cyber-monday-2026-tech-deals-guide">HiTechReports</a> for the retailer by retailer timetable and what the end dates are; <a href="https://www.rakuten.com/blog/cyber-week-shopping-plan/">Rakuten</a> for the Cyber Week day by day plan and the Sunday cart review advice.</p>

<h2>Frequently asked questions</h2>

<h3>When is Cyber Monday 2026?</h3>
<p>Cyber Monday 2026 is Monday 30th November (the Monday after Thanksgiving and three days after Black Friday on the 27th).</p>

<h3>What ends before Cyber Monday itself?</h3>
<p>Best Buy's doorbusters end at 11:59 pm CT on Sunday, 29 November, so the deepest cuts have to be bought on Sunday. Walmart's event starts on Monday at 12:01 am ET and runs to 2 December.</p>

<h3>How much will Cyber Monday 2026 make?</h3>
<p>Adobe is forecasting $15.1bn in US online sales for Cyber Monday (up 6.2% year on year) and that's a forecast, not a total.</p>
$$,
ARRAY['https://www.bunnycoupon.com/blog/when-is-cyber-monday', 'https://hitechreports.com/news/cyber-monday-2026-tech-deals-guide', 'https://www.rakuten.com/blog/cyber-week-shopping-plan/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- dwp-cyber-incident-benefits-services-offline-20261128 (news; UK; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'dwp-cyber-incident-benefits-services-offline-20261128', 'news', 'UK',
'DWP cyber incident takes benefits services offline',
'DWP cyber incident takes benefits services offline',
'DWP cyber incident forced the Department for Work and Pensions to take most online services offline, though benefit and pension payments continue as normal.',
'DWP cyber incident forced the Department for Work and Pensions to take most online services offline, though benefit and pension payments continue as normal.',
$$mcfadden/"
  - "https://www.channelnewsasia.com/world/uk-pensions-department-cyber-incident-6587251"
predicted-trend: "no"
verification_notes: "Verified 28 Nov 2026 from GOV.UK (statement published 27 Nov 08:11), Glasgow Times and CNA: services taken offline as a precaution following a cyber incident. Unusual activity first spotted on Thursday 26 Nov. Systems were down around 9pm on Thursday. NCSC and the Government Cyber Coordination Centre are both investigating. All regular payments are unaffected and there is no evidence that any personal details have been compromised (McFadden). Almost all public facing services are down (Universal Credit, Pension Credit and Tell Us Once). No new UC/PIP claims have been made online. The disruption is expected to be across the weekend (Glasgow Times). No sanctions will be imposed on those who are unable to update their circumstances (cna)."
---

<p>DWP cyber incident has seen the Department for Work and Pensions take almost all of its online benefits and pension services offline following the detection of some unusual activity on its systems on Thursday.</p>

<table>
<tr><td>Organisation</td><td>Department for Work and Pensions (DWP)</td></tr>
<tr><td>Incident found</td><td>Thursday 26 November 2026</td></tr>
<tr><td>Services taken down</td><td>Around 9pm on Thursday 26 November</td></tr>
<tr><td>Services affected</td><td>Universal Credit, pension credit, Tell Us Once</td></tr>
<tr><td>Payments</td><td>Regular benefit and pension payments unaffected</td></tr>
<tr><td>Investigators</td><td>National Cyber Security Centre, Government Cyber Coordination Centre</td></tr>
</table>

<h2>What happened</h2>

<p>"We have taken some DWP online services offline as a precaution after we identified a cyber incident affecting our systems," the department said in a statement published on GOV.UK on Friday 27 November. "We are working closely with the National Cyber Security Centre and Government Cyber Coordination Centre to investigate and to bring services back online as quickly as possible and to minimise any disruption." Regular benefit and pension payments are not affected and will be paid as normal. People who need help should call their usual benefit line, and the department says customers who do not attend or cannot update their circumstances will not be sanctioned.</p>

<p>Work and Pensions Secretary Pat McFadden called it a serious cyber incident. "It's a serious cyber incident. I can't say more at this stage about what caused it," he said. "But we did the right thing by taking our systems down in order to protect the public, in order to protect their personal information, and we made sure that regular payments could continue unaffected." Almost all public-facing DWP services were taken down, including the Universal Credit online portals, pension credit and the Tell Us Once service, which is used to inform multiple government departments at the same time when somebody dies. No new claims for Universal Credit or personal independence payments could be made online on Friday, and the disruption is expected to last most of the weekend, with telephone lines being set up to help people make new benefit claims. For more on UK government services, see our <a href="https://growentix.cloud/uk">UK jobs and business</a> coverage and the <a href="https://growentix.cloud/articles/hmrc-tax-specialist-programme-500-posts-20261025">HMRC Tax Specialist Programme</a> report.</p>

<h2>What the DWP cyber incident means</h2>

<p>The shutdown means millions of claimants can't access their accounts or apply for benefits online (payments are still being processed). The DWP is one of the biggest government departments in the UK (96,890 staff as of 2025) and this is the most recent of a number of recent cyber incidents to have affected the UK. It follows on from the NAO's warning last week that there was a "high" risk of a cyber breach at the department suffering a cybersecurity breach that could either disrupt its services or result in the compromise of data. The Government has stated there is no evidence that a malicious actor has targeted any other government department, though it has not ruled out the possibility that the incident which took the DWP services offline was in fact a hack. The DWP has warned claimants that they will never ask for your bank details over the phone or via text and will never text you to ask you to click on a link.</p>

<h2>What the sources do not say</h2>

<p>The DWP have not disclosed what the suspicious activity was and it is not known whether any personal data was accessed. McFadden did however say there was no evidence that anyone's personal details had been compromised. The sources don't say when the services will be back up, which systems beyond the public facing portals were impacted or who was behind it. One report suggests it wasn't ransomware and there was no money moved, though the department hasn't confirmed that.</p>

<p>Sources: <a href="https://www.gov.uk/government/news/temporary-disruption-to-some-dwp-online-services">GOV.UK</a> for the official statement (the payments assurance, the no-sanctions pledge); <a href="https://www.glasgowtimes.co.uk/news/national/26769736.serious-cyber-incident-forced-dwp-take-online-systems---mcfadden/">Glasgow Times</a> for McFadden's comments and the services impacted; <a href="https://www.channelnewsasia.com/world/uk-pensions-department-cyber-incident-6587251">CNA</a> for the extent of the outage and the absence of any evidence that data had been compromised.</p>

<h2>Frequently asked questions</h2>

<h3>Will my benefit or pension payment still get through?</h3>
<p>Yes. The DWP state that standard benefit and pension payments are not impacted and will go ahead as normal even though the online services are all offline.</p>

<h3>Can I make a new benefit claim while services are down?</h3>
<p>Not online. No new claims for Universal Credit or personal independence payments can be made online on Friday and telephone lines are being put in place to assist people to make new claims.</p>

<h3>Has personal data been stolen in the DWP cyber incident?</h3>
<p>There's as yet no evidence that anyone's personal details have been compromised, says Work and Pensions Secretary Pat McFadden. The inquiry is still underway.</p>
$$,
$$mcfadden/"
  - "https://www.channelnewsasia.com/world/uk-pensions-department-cyber-incident-6587251"
predicted-trend: "no"
verification_notes: "Verified 28 Nov 2026 from GOV.UK (statement published 27 Nov 08:11), Glasgow Times and CNA: services taken offline as a precaution following a cyber incident. Unusual activity first spotted on Thursday 26 Nov. Systems were down around 9pm on Thursday. NCSC and the Government Cyber Coordination Centre are both investigating. All regular payments are unaffected and there is no evidence that any personal details have been compromised (McFadden). Almost all public facing services are down (Universal Credit, Pension Credit and Tell Us Once). No new UC/PIP claims have been made online. The disruption is expected to be across the weekend (Glasgow Times). No sanctions will be imposed on those who are unable to update their circumstances (cna)."
---

<p>DWP cyber incident has seen the Department for Work and Pensions take almost all of its online benefits and pension services offline following the detection of some unusual activity on its systems on Thursday.</p>

<table>
<tr><td>Organisation</td><td>Department for Work and Pensions (DWP)</td></tr>
<tr><td>Incident found</td><td>Thursday 26 November 2026</td></tr>
<tr><td>Services taken down</td><td>Around 9pm on Thursday 26 November</td></tr>
<tr><td>Services affected</td><td>Universal Credit, pension credit, Tell Us Once</td></tr>
<tr><td>Payments</td><td>Regular benefit and pension payments unaffected</td></tr>
<tr><td>Investigators</td><td>National Cyber Security Centre, Government Cyber Coordination Centre</td></tr>
</table>

<h2>What happened</h2>

<p>"We have taken some DWP online services offline as a precaution after we identified a cyber incident affecting our systems," the department said in a statement published on GOV.UK on Friday 27 November. "We are working closely with the National Cyber Security Centre and Government Cyber Coordination Centre to investigate and to bring services back online as quickly as possible and to minimise any disruption." Regular benefit and pension payments are not affected and will be paid as normal. People who need help should call their usual benefit line, and the department says customers who do not attend or cannot update their circumstances will not be sanctioned.</p>

<p>Work and Pensions Secretary Pat McFadden called it a serious cyber incident. "It's a serious cyber incident. I can't say more at this stage about what caused it," he said. "But we did the right thing by taking our systems down in order to protect the public, in order to protect their personal information, and we made sure that regular payments could continue unaffected." Almost all public-facing DWP services were taken down, including the Universal Credit online portals, pension credit and the Tell Us Once service, which is used to inform multiple government departments at the same time when somebody dies. No new claims for Universal Credit or personal independence payments could be made online on Friday, and the disruption is expected to last most of the weekend, with telephone lines being set up to help people make new benefit claims. For more on UK government services, see our <a href="https://growentix.cloud/uk">UK jobs and business</a> coverage and the <a href="https://growentix.cloud/articles/hmrc-tax-specialist-programme-500-posts-20261025">HMRC Tax Specialist Programme</a> report.</p>

<h2>What the DWP cyber incident means</h2>

<p>The shutdown means millions of claimants can't access their accounts or apply for benefits online (payments are still being processed). The DWP is one of the biggest government departments in the UK (96,890 staff as of 2025) and this is the most recent of a number of recent cyber incidents to have affected the UK. It follows on from the NAO's warning last week that there was a "high" risk of a cyber breach at the department suffering a cybersecurity breach that could either disrupt its services or result in the compromise of data. The Government has stated there is no evidence that a malicious actor has targeted any other government department, though it has not ruled out the possibility that the incident which took the DWP services offline was in fact a hack. The DWP has warned claimants that they will never ask for your bank details over the phone or via text and will never text you to ask you to click on a link.</p>

<h2>What the sources do not say</h2>

<p>The DWP have not disclosed what the suspicious activity was and it is not known whether any personal data was accessed. McFadden did however say there was no evidence that anyone's personal details had been compromised. The sources don't say when the services will be back up, which systems beyond the public facing portals were impacted or who was behind it. One report suggests it wasn't ransomware and there was no money moved, though the department hasn't confirmed that.</p>

<p>Sources: <a href="https://www.gov.uk/government/news/temporary-disruption-to-some-dwp-online-services">GOV.UK</a> for the official statement (the payments assurance, the no-sanctions pledge); <a href="https://www.glasgowtimes.co.uk/news/national/26769736.serious-cyber-incident-forced-dwp-take-online-systems---mcfadden/">Glasgow Times</a> for McFadden's comments and the services impacted; <a href="https://www.channelnewsasia.com/world/uk-pensions-department-cyber-incident-6587251">CNA</a> for the extent of the outage and the absence of any evidence that data had been compromised.</p>

<h2>Frequently asked questions</h2>

<h3>Will my benefit or pension payment still get through?</h3>
<p>Yes. The DWP state that standard benefit and pension payments are not impacted and will go ahead as normal even though the online services are all offline.</p>

<h3>Can I make a new benefit claim while services are down?</h3>
<p>Not online. No new claims for Universal Credit or personal independence payments can be made online on Friday and telephone lines are being put in place to assist people to make new claims.</p>

<h3>Has personal data been stolen in the DWP cyber incident?</h3>
<p>There's as yet no evidence that anyone's personal details have been compromised, says Work and Pensions Secretary Pat McFadden. The inquiry is still underway.</p>
$$,
ARRAY['https://www.gov.uk/government/news/temporary-disruption-to-some-dwp-online-services', 'https://www.glasgowtimes.co.uk/news/national/26769736.serious-cyber-incident-forced-dwp-take-online-systems'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- hayden-panettiere-estate-6-million-daughter-kaya-20261128 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'hayden-panettiere-estate-6-million-daughter-kaya-20261128', 'news', 'USA',
'Hayden Panettiere estate worth $6.2m goes to daughter Kaya',
'Hayden Panettiere estate worth $6.2m goes to daughter Kaya',
'Hayden Panettiere estate papers value her fortune at $6,232,119, with her 11-year-old daughter Kaya named sole heir after she died without a will.',
'Hayden Panettiere estate papers value her fortune at $6,232,119, with her 11-year-old daughter Kaya named sole heir after she died without a will.',
$$<p>Hayden Panettiere's estate papers place the value of her fortune at $6,232,119 and her 11-year-old daughter Kaya is the sole beneficiary. Hayden died intestate (without a will.</p>

<table>
<tr><td>Person</td><td>Hayden Panettiere, actress, died 16 August 2026, aged 36</td></tr>
<tr><td>Estate value</td><td>$6,232,119</td></tr>
<tr><td>Personal property</td><td>$5,208,519</td></tr>
<tr><td>Real property</td><td>$1,023,600</td></tr>
<tr><td>Sole heir</td><td>Daughter Kaya, aged 11</td></tr>
<tr><td>Administrator sought</td><td>Melissa Moskal Bencivenga</td></tr>
</table>

<h2>What happened</h2>

<p>Court documents obtained by TMZ and reported on 24 November place the value of Panettiere's estate at $6,232,119. That's roughly $5.2m in personal property and just over $1m in real estate (according to <a href="https://extratv.com/2026/11/24/hayden-panettiere-s-estate-worth-6-million-court-docs-reveal/">Extra</a>). Panettiere, of course, was best known for Heroes and Nashville. She died on 16 August at the age of 36 in Greenville, SC. The Greenville County Coroner's Office ruled her death an accidental overdose of fentanyl and a number of other drugs. The local police closed their investigation in October without filing any criminal charges.</p>

<p> Panettiere died intestate so the estate goes through the probate process with Kaya named as the beneficiary. Her father, former pro boxer Wladimir Klitschko, filed with the Los Angeles County Probate Court on 18 November to have tax and financial advisor Melissa Moskal Bencivenga appointed as administrator of the estate. Klitschko was given temporary guardianship of his daughter's estate in October following a warning from his legal team that Panettiere's property was at risk of just vanishing. The filings state that there has been unauthorised access to Panettiere's LA home and that various personal items (including jewellery) have gone missing and they are asking the court for the power to engage law enforcement to go out and retrieve them. Klitschko's temporary guardianship is due to expire on 7 December when a further hearing on Kaya's estate is scheduled. For more entertainment news, head to our <a href="https://growentix.cloud/articles/taylor-swift-showgirl-trademark-lawsuit-enough-is-enough-20261127">Taylor Swift Showgirl lawsuit</a> story and our <a href="https://growentix.cloud/articles">News</a> section for the latest.</p>

<h2>What the Hayden Panettiere estate case means</h2>

<p>The case is now all about protecting the 11 year old's inheritance rather than dividing it. If Bencivenga is appointed she will be in charge of protecting and administering Panettiere's assets, settling any outstanding liabilities and managing the distribution of her property, <a href="https://www.lawcommentary.com/articles/hayden-panettiere-6-million-estate-no-will">Law Commentary</a> reported. The filings set out how the various outstanding liabilities (including the tax bill which was paid off in October) are being dealt with. Klitschko first sought court intervention on 24 September, making allegations of deleted emails, missing jewellery and unauthorised access to the LA home. His attorney told the court in October that someone outside the family was believed to have taken items and attempted to sell some of the jewellery to a pawnshop in LA County. Federal investigators had also seized a number of the items from the home as part of the investigation into the circumstances of her death.</p>

<h2>What the sources do not say</h2>

<p>The sources give no indication as to when the estate will be distributed to Kaya or how the assets will be held until she is of age. There is no information as to whether the missing items have been found or whether anyone has been charged in relation to them. The Greenville PD have determined the death to be accidental (per the coroner), citing the toxic effects of fentanyl, 4-ANPP, alprazolam, methocarbamol and quetiapine. The sources provide no further detail on how those drugs were obtained.</p>

<p>Sources: <a href="https://extratv.com/2026/11/24/hayden-panettiere-s-estate-worth-6-million-court-docs-reveal/">Extra</a> for the estate valuation and the closed investigation; <a href="https://parade.com/entertainment/hayden-panettiere-died-without-a-will-leaving-a-6-2-million-fortune-for-11-year-old-daughter-kayanow-wladimir-klitschko-is-stepping-in">Parade</a> for Kaya as sole heir and Klitschko's petition; <a href="https://www.lawcommentary.com/articles/hayden-panettiere-6-million-estate-no-will">Law Commentary</a> for the probate timeline and the missing-property allegations.</p>
$$,
$$<p>Hayden Panettiere's estate papers place the value of her fortune at $6,232,119 and her 11-year-old daughter Kaya is the sole beneficiary. Hayden died intestate (without a will.</p>

<table>
<tr><td>Person</td><td>Hayden Panettiere, actress, died 16 August 2026, aged 36</td></tr>
<tr><td>Estate value</td><td>$6,232,119</td></tr>
<tr><td>Personal property</td><td>$5,208,519</td></tr>
<tr><td>Real property</td><td>$1,023,600</td></tr>
<tr><td>Sole heir</td><td>Daughter Kaya, aged 11</td></tr>
<tr><td>Administrator sought</td><td>Melissa Moskal Bencivenga</td></tr>
</table>

<h2>What happened</h2>

<p>Court documents obtained by TMZ and reported on 24 November place the value of Panettiere's estate at $6,232,119. That's roughly $5.2m in personal property and just over $1m in real estate (according to <a href="https://extratv.com/2026/11/24/hayden-panettiere-s-estate-worth-6-million-court-docs-reveal/">Extra</a>). Panettiere, of course, was best known for Heroes and Nashville. She died on 16 August at the age of 36 in Greenville, SC. The Greenville County Coroner's Office ruled her death an accidental overdose of fentanyl and a number of other drugs. The local police closed their investigation in October without filing any criminal charges.</p>

<p> Panettiere died intestate so the estate goes through the probate process with Kaya named as the beneficiary. Her father, former pro boxer Wladimir Klitschko, filed with the Los Angeles County Probate Court on 18 November to have tax and financial advisor Melissa Moskal Bencivenga appointed as administrator of the estate. Klitschko was given temporary guardianship of his daughter's estate in October following a warning from his legal team that Panettiere's property was at risk of just vanishing. The filings state that there has been unauthorised access to Panettiere's LA home and that various personal items (including jewellery) have gone missing and they are asking the court for the power to engage law enforcement to go out and retrieve them. Klitschko's temporary guardianship is due to expire on 7 December when a further hearing on Kaya's estate is scheduled. For more entertainment news, head to our <a href="https://growentix.cloud/articles/taylor-swift-showgirl-trademark-lawsuit-enough-is-enough-20261127">Taylor Swift Showgirl lawsuit</a> story and our <a href="https://growentix.cloud/articles">News</a> section for the latest.</p>

<h2>What the Hayden Panettiere estate case means</h2>

<p>The case is now all about protecting the 11 year old's inheritance rather than dividing it. If Bencivenga is appointed she will be in charge of protecting and administering Panettiere's assets, settling any outstanding liabilities and managing the distribution of her property, <a href="https://www.lawcommentary.com/articles/hayden-panettiere-6-million-estate-no-will">Law Commentary</a> reported. The filings set out how the various outstanding liabilities (including the tax bill which was paid off in October) are being dealt with. Klitschko first sought court intervention on 24 September, making allegations of deleted emails, missing jewellery and unauthorised access to the LA home. His attorney told the court in October that someone outside the family was believed to have taken items and attempted to sell some of the jewellery to a pawnshop in LA County. Federal investigators had also seized a number of the items from the home as part of the investigation into the circumstances of her death.</p>

<h2>What the sources do not say</h2>

<p>The sources give no indication as to when the estate will be distributed to Kaya or how the assets will be held until she is of age. There is no information as to whether the missing items have been found or whether anyone has been charged in relation to them. The Greenville PD have determined the death to be accidental (per the coroner), citing the toxic effects of fentanyl, 4-ANPP, alprazolam, methocarbamol and quetiapine. The sources provide no further detail on how those drugs were obtained.</p>

<p>Sources: <a href="https://extratv.com/2026/11/24/hayden-panettiere-s-estate-worth-6-million-court-docs-reveal/">Extra</a> for the estate valuation and the closed investigation; <a href="https://parade.com/entertainment/hayden-panettiere-died-without-a-will-leaving-a-6-2-million-fortune-for-11-year-old-daughter-kayanow-wladimir-klitschko-is-stepping-in">Parade</a> for Kaya as sole heir and Klitschko's petition; <a href="https://www.lawcommentary.com/articles/hayden-panettiere-6-million-estate-no-will">Law Commentary</a> for the probate timeline and the missing-property allegations.</p>
$$,
ARRAY['https://extratv.com/2026/11/24/hayden-panettiere-s-estate-worth-6-million-court-docs-reveal/', 'https://parade.com/entertainment/hayden-panettiere-died-without-a-will-leaving-a-6-2-million-fortune-for-11-year-old-daughter-kayanow-wladimir-klitschko-is-stepping-in', 'https://www.lawcommentary.com/articles/hayden-panettiere-6-million-estate-no-will'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- italy-burqa-ban-schools-law-20261128 (news; Italy; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'italy-burqa-ban-schools-law-20261128', 'news', 'Italy',
'Italy burqa ban in schools becomes law',
'Italy burqa ban in schools becomes law',
'Italy burqa ban in schools is now law after the Chamber of Deputies gave final approval, alongside a 30% cap on foreign pupils in first-year classes.',
'Italy burqa ban in schools is now law after the Chamber of Deputies gave final approval, alongside a 30% cap on foreign pupils in first-year classes.',
$$<p>Italy burqa ban in schools is now law, after the Chamber of Deputies gave final approval on Thursday to a controversial education reform that also caps foreign pupils at 30% of first-year classes.</p>

<table>
<tr><td>Country</td><td>Italy</td></tr>
<tr><td>Law</td><td>Decreto Scuola, Decree-law 170 of 30 September 2026</td></tr>
<tr><td>Final vote</td><td>142 in favour, 112 against, 4 abstentions</td></tr>
<tr><td>Vote date</td><td>Thursday 26 November 2026</td></tr>
<tr><td>Senate approval</td><td>20 November 2026</td></tr>
<tr><td>Cap start</td><td>2027-28 school year</td></tr>
</table>

<h2>What happened</h2>

<p>Italy has passed a controversial education law banning face coverings such as burqas and niqabs in schools and introducing a 30% cap on certain foreign students in first-year classrooms, according to <a href="https://www.moneycontrol.com/world/italy-bans-burqas-and-niqabs-in-schools-limits-foreign-students-to-30-what-the-new-law-says-article-14090551.html/amp">Moneycontrol</a>. The Chamber of Deputies gave its final approval to the legislation on 26 November, with 142 votes in favour, 112 against and four abstentions. The Senate had approved the measure on 20 November. The ban on face coverings applies to everyone on the entire school grounds, not just in classrooms, and violations may result in fines of up to 1,000 euros. Headscarves that leave the face uncovered are not subject to the ban.</p>

<p>From the 2027-28 school year, a 30% cap will apply in first-year classes at all school levels to foreign children who do not have a sufficient command of Italian. The quota applies to children who do not hold Italian citizenship, were not born in Italy and have not attended an Italian kindergarten for at least two years; in secondary schools, pupils must have attended Italian schools for at least three years to fall outside the quota. The law also requires foreign parents whose limited Italian prevents effective communication with schools to attend language courses if social services instruct them to do so. The reform, drafted by the government of right-wing Prime Minister Giorgia Meloni, also includes measures to support students with disabilities, combat cyberbullying and prevent children from dropping out of school. Opposition lawmakers protested during the final vote, displaying a sign reading "At school nobody is a foreigner". For more on European politics, see our <a href="https://growentix.cloud/europe">Europe</a> coverage and the <a href="https://growentix.cloud/articles/new-zealand-election-hung-parliament-20261127">New Zealand hung parliament</a> report.</p>

<h2>What the Italy 'burqa ban' schools law means.</h2>

<p>The law is one of the most stringent school integration measures in Europe and comes as governments across the continent are currently engaged in a debate over just how far schools should go in regulating dress and language. France and Belgium have already introduced nationwide bans on the concealment of the face in public places. At the same time, Austria has introduced restrictions in the Italian legislation specifically targeted the burqa and niqab in schools with the provision that classroom places are linked to Italian language ability. Supporters within Meloni's coalition say the opposition see it as discriminatory. The 30% cap will not apply to foreign pupils who already have sufficient knowledge of Italian or who meet the school criteria so the actual impact of the measure will be determined by the number of new arrivals each year who fall within the quota.</p>

<h2>What the sources do not say</h2>

<p>Sources differ on the law's final status: several report that the ban came into force with immediate effect after the Chamber of Deputies vote. In contrast, one report says the legislation still needs the signature of President Sergio Mattarella and publication in the Official Gazette to complete the process. The sources do not say how the fines will be enforced in practice, who will impose them, or how schools are expected to judge whether a pupil's Italian is sufficient. They also do not say how many pupils the 30% cap is expected to affect.</p>

<p>Sources: <a href="https://www.moneycontrol.com/world/italy-bans-burqas-and-niqabs-in-schools-limits-foreign-students-to-30-what-the-new-law-says-article-14090551.html/amp">Moneycontrol</a> for the vote, the ban and the 30% cap; <a href="https://www.news18.com/world/italy-bans-burqas-niqabs-in-schools-brings-30-cap-on-foreign-students-ws-lrt-10444248.html">News18</a> for the decree details and the exemptions; <a href="https://mia.mk/en/story/italys-parliament-gives-final-approval-to-burqa-ban-in-schools">MIA</a> for the DPA report on the final approval and the fines.</p>
$$,
$$<p>Italy burqa ban in schools is now law, after the Chamber of Deputies gave final approval on Thursday to a controversial education reform that also caps foreign pupils at 30% of first-year classes.</p>

<table>
<tr><td>Country</td><td>Italy</td></tr>
<tr><td>Law</td><td>Decreto Scuola, Decree-law 170 of 30 September 2026</td></tr>
<tr><td>Final vote</td><td>142 in favour, 112 against, 4 abstentions</td></tr>
<tr><td>Vote date</td><td>Thursday 26 November 2026</td></tr>
<tr><td>Senate approval</td><td>20 November 2026</td></tr>
<tr><td>Cap start</td><td>2027-28 school year</td></tr>
</table>

<h2>What happened</h2>

<p>Italy has passed a controversial education law banning face coverings such as burqas and niqabs in schools and introducing a 30% cap on certain foreign students in first-year classrooms, according to <a href="https://www.moneycontrol.com/world/italy-bans-burqas-and-niqabs-in-schools-limits-foreign-students-to-30-what-the-new-law-says-article-14090551.html/amp">Moneycontrol</a>. The Chamber of Deputies gave its final approval to the legislation on 26 November, with 142 votes in favour, 112 against and four abstentions. The Senate had approved the measure on 20 November. The ban on face coverings applies to everyone on the entire school grounds, not just in classrooms, and violations may result in fines of up to 1,000 euros. Headscarves that leave the face uncovered are not subject to the ban.</p>

<p>From the 2027-28 school year, a 30% cap will apply in first-year classes at all school levels to foreign children who do not have a sufficient command of Italian. The quota applies to children who do not hold Italian citizenship, were not born in Italy and have not attended an Italian kindergarten for at least two years; in secondary schools, pupils must have attended Italian schools for at least three years to fall outside the quota. The law also requires foreign parents whose limited Italian prevents effective communication with schools to attend language courses if social services instruct them to do so. The reform, drafted by the government of right-wing Prime Minister Giorgia Meloni, also includes measures to support students with disabilities, combat cyberbullying and prevent children from dropping out of school. Opposition lawmakers protested during the final vote, displaying a sign reading "At school nobody is a foreigner". For more on European politics, see our <a href="https://growentix.cloud/europe">Europe</a> coverage and the <a href="https://growentix.cloud/articles/new-zealand-election-hung-parliament-20261127">New Zealand hung parliament</a> report.</p>

<h2>What the Italy 'burqa ban' schools law means.</h2>

<p>The law is one of the most stringent school integration measures in Europe and comes as governments across the continent are currently engaged in a debate over just how far schools should go in regulating dress and language. France and Belgium have already introduced nationwide bans on the concealment of the face in public places. At the same time, Austria has introduced restrictions in the Italian legislation specifically targeted the burqa and niqab in schools with the provision that classroom places are linked to Italian language ability. Supporters within Meloni's coalition say the opposition see it as discriminatory. The 30% cap will not apply to foreign pupils who already have sufficient knowledge of Italian or who meet the school criteria so the actual impact of the measure will be determined by the number of new arrivals each year who fall within the quota.</p>

<h2>What the sources do not say</h2>

<p>Sources differ on the law's final status: several report that the ban came into force with immediate effect after the Chamber of Deputies vote. In contrast, one report says the legislation still needs the signature of President Sergio Mattarella and publication in the Official Gazette to complete the process. The sources do not say how the fines will be enforced in practice, who will impose them, or how schools are expected to judge whether a pupil's Italian is sufficient. They also do not say how many pupils the 30% cap is expected to affect.</p>

<p>Sources: <a href="https://www.moneycontrol.com/world/italy-bans-burqas-and-niqabs-in-schools-limits-foreign-students-to-30-what-the-new-law-says-article-14090551.html/amp">Moneycontrol</a> for the vote, the ban and the 30% cap; <a href="https://www.news18.com/world/italy-bans-burqas-niqabs-in-schools-brings-30-cap-on-foreign-students-ws-lrt-10444248.html">News18</a> for the decree details and the exemptions; <a href="https://mia.mk/en/story/italys-parliament-gives-final-approval-to-burqa-ban-in-schools">MIA</a> for the DPA report on the final approval and the fines.</p>
$$,
ARRAY['https://www.moneycontrol.com/world/italy-bans-burqas-and-niqabs-in-schools-limits-foreign-students-to-30-what-the-new-law-says-article-14090551.html/amp', 'https://www.news18.com/world/italy-bans-burqas-niqabs-in-schools-brings-30-cap-on-foreign-students-ws-lrt-10444248.html', 'https://mia.mk/en/story/italys-parliament-gives-final-approval-to-burqa-ban-in-schools'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- poundland-administration-mps-hearing-inquiry-20261128 (news; UK; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'poundland-administration-mps-hearing-inquiry-20261128', 'news', 'UK',
'Poundland administration: owner called to public hearing',
'Poundland administration: owner called to public hearing',
'Poundland administration moves on as MPs call Gordon Brothers to a public hearing and administrators give bidders until Sunday to confirm interest.',
'Poundland administration moves on as MPs call Gordon Brothers to a public hearing and administrators give bidders until Sunday to confirm interest.',
$$<p>Poundland administration have entered a new phase this Friday with MPs asking owner Gordon Brothers to give evidence at a public hearing and the administrators giving the remaining bidders until Sunday 29th November to confirm they still wish to buy the chain.</p>

<table>
<tr><td>Company</td><td>Poundland Limited and Poundland Elgin Limited</td></tr>
<tr><td>Administration date</td><td>Wednesday 25 November 2026</td></tr>
<tr><td>Administrators</td><td>AlixPartners</td></tr>
<tr><td>Stores</td><td>Around 600 in the UK and Ireland</td></tr>
<tr><td>Jobs at risk</td><td>About 11,000</td></tr>
<tr><td>Bidders' deadline</td><td>Sunday 29 November 2026</td></tr>
</table>

<h2>What happened</h2>

<p>The Commons Business, Innovation, Science and Trade Committee (chaired by Labour MP Liam Byrne) has asked Gordon Brothers to give evidence at a public hearing following the chain's administration on 25 November, <a href="http://lexpress-franchise.com/en/news/poundland-owner-mps-private-equity/">L'Express Franchise</a> reported on 27 November, via Sky News. The same committee is preparing a wider inquiry into private equity in retail for next year. This will look at the way private equity owners approach the purchase of British retailers, including the reach of insolvency law, the role of pension trustees and potential amendments to the Companies Act.</p>

<p>On 25th November the committee wrote to Mark Newton-Jones (who runs the Gordon Brothers European business) asking him to attend the public hearing and to get back to them by noon on Friday 27th November. They also want assurances from him that Gordon Brothers and any of its associated parties will not act as administrator, liquidator or in any other insolvency capacity for Poundland. At a private session on 11th November Newton-Jones denied that Gordon Brothers had in any way restricted Poundland's access to finance and stated that they were in the process of looking for a solvent sale. Poundland's management had a very different view of the situation and Byrne indicated that they had left the committee with a full dossier of documents showing how the owner had been holding back the turnaround. BusinessCloud report that the owner had frozen £50m in Poundland's accounts (effectively preventing it from paying its suppliers or restocking) before releasing a portion of the funds.</p>

<p>AlixPartners wants the four bidders from the final stage of the sale process to reconfirm their interest by Sunday. One of them, Martin Property Group, which backed a bid by Poundland's management, had two offers turned down by Gordon Brothers because they did not repay enough of a £30 million shareholder loan up front. The Dubai wholesaler Premier Quality Foods and the investment group Xyra have both said they will keep trying. Idris Mohamed, owner of Premier Quality Foods, said his bid fell short because it could not secure enough funding to address the historic liabilities while still leaving enough cash to pay staff and suppliers, replenish stock and keep the shelves full. Our earlier report on the collapse is in <a href="https://growentix.cloud/articles/poundland-administration-jobs-at-risk-20261127">Poundland administration puts 11,000 jobs at risk</a>, and the latest from the wider world is in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the Poundland administration means</h2>

<p>The public hearing turns a rescue negotiation into a political exercise in terms of private equity ownership on the high street. If the committee's wider inquiry proceeds in the new year it will be looking at a number of other deals including Gordon Brothers' acquisition of LK Bennett, Fortress Investment Group's restructure of Poundstretcher and Modella Capital's purchase of TG Jones (the former WH Smith high street chain) which they then put up for sale. For the c.11,000 staff the immediate question is still going to be whether AlixPartners can sell the whole business or whether it will be broken up. If no buyer comes in for the whole of the business then it's very likely to be broken up and the stores sold off in groups. Sky News has named B&M and the grocers Iceland, Lidl and Tesco as potential buyers of groups of stores. A break-up would see hundreds of head office jobs at risk and would probably not cover all the stores.</p>

<h2>What the sources do not say</h2>

<p>None of the sources say whether Mark Newton-Jones replied to the committee by the noon deadline on 27 November and there is no published reply so his answer is not claimed here. There is no preferred bidder named, no indication of how many stores would close in the event of a break-up and no date is given for the public hearing. The administrators are expected to provide an update next week but again no date is given.</p>

<p>Sources: <a href="http://lexpress-franchise.com/en/news/poundland-owner-mps-private-equity/">L'Express Franchise</a> for the public hearing request, the wider inquiry, the Sunday bidder deadline and the break-up outlook; <a href="https://www.ipswich.co.uk/poundland-the-1-deal-the-18m-in-fees-and-the-collapse-of-a-british-high-street-giant/">Ipswich.co.uk</a> for the £1 deal and the collapse of the chain; <a href="https://committees.parliament.uk/committee/365/business-innovation-science-and-trade-committee/news/219261/business-innovation-science-and-trade-committee-write-to-poundland-owners-gordon-brothers/">UK Parliament</a> for the committee's letter to Gordon Brothers.</p>

<h2>Frequently asked questions</h2>

<h3>Has Gordon Brothers got back to the MPs yet?</h3>
<p>No reply from Mark Newton-Jones to the committee's noon deadline on Friday 27th November 2026 has been located. The committee had asked him to attend a public hearing and to confirm that Gordon Brothers would not be acting in any insolvency capacity for Poundland.</p>

<h3>When do the Poundland bidders have to confirm their interest?</h3>
<p>The administrators, AlixPartners, have given the four bidders remaining in the final stage of the process until Sunday 29th November 2026 to reconfirm their interest.</p>

<h3>What is the wider inquiry that the MPs are planning?</h3>
<p>The Commons Business Committee is going to open an inquiry into private equity in retail next year. It will look at how private equity houses buy up British retailers, the scope of insolvency law, the role of pension trustees and the potential for changes to the Companies Act.</p>
$$,
$$<p>Poundland administration have entered a new phase this Friday with MPs asking owner Gordon Brothers to give evidence at a public hearing and the administrators giving the remaining bidders until Sunday 29th November to confirm they still wish to buy the chain.</p>

<table>
<tr><td>Company</td><td>Poundland Limited and Poundland Elgin Limited</td></tr>
<tr><td>Administration date</td><td>Wednesday 25 November 2026</td></tr>
<tr><td>Administrators</td><td>AlixPartners</td></tr>
<tr><td>Stores</td><td>Around 600 in the UK and Ireland</td></tr>
<tr><td>Jobs at risk</td><td>About 11,000</td></tr>
<tr><td>Bidders' deadline</td><td>Sunday 29 November 2026</td></tr>
</table>

<h2>What happened</h2>

<p>The Commons Business, Innovation, Science and Trade Committee (chaired by Labour MP Liam Byrne) has asked Gordon Brothers to give evidence at a public hearing following the chain's administration on 25 November, <a href="http://lexpress-franchise.com/en/news/poundland-owner-mps-private-equity/">L'Express Franchise</a> reported on 27 November, via Sky News. The same committee is preparing a wider inquiry into private equity in retail for next year. This will look at the way private equity owners approach the purchase of British retailers, including the reach of insolvency law, the role of pension trustees and potential amendments to the Companies Act.</p>

<p>On 25th November the committee wrote to Mark Newton-Jones (who runs the Gordon Brothers European business) asking him to attend the public hearing and to get back to them by noon on Friday 27th November. They also want assurances from him that Gordon Brothers and any of its associated parties will not act as administrator, liquidator or in any other insolvency capacity for Poundland. At a private session on 11th November Newton-Jones denied that Gordon Brothers had in any way restricted Poundland's access to finance and stated that they were in the process of looking for a solvent sale. Poundland's management had a very different view of the situation and Byrne indicated that they had left the committee with a full dossier of documents showing how the owner had been holding back the turnaround. BusinessCloud report that the owner had frozen £50m in Poundland's accounts (effectively preventing it from paying its suppliers or restocking) before releasing a portion of the funds.</p>

<p>AlixPartners wants the four bidders from the final stage of the sale process to reconfirm their interest by Sunday. One of them, Martin Property Group, which backed a bid by Poundland's management, had two offers turned down by Gordon Brothers because they did not repay enough of a £30 million shareholder loan up front. The Dubai wholesaler Premier Quality Foods and the investment group Xyra have both said they will keep trying. Idris Mohamed, owner of Premier Quality Foods, said his bid fell short because it could not secure enough funding to address the historic liabilities while still leaving enough cash to pay staff and suppliers, replenish stock and keep the shelves full. Our earlier report on the collapse is in <a href="https://growentix.cloud/articles/poundland-administration-jobs-at-risk-20261127">Poundland administration puts 11,000 jobs at risk</a>, and the latest from the wider world is in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the Poundland administration means</h2>

<p>The public hearing turns a rescue negotiation into a political exercise in terms of private equity ownership on the high street. If the committee's wider inquiry proceeds in the new year it will be looking at a number of other deals including Gordon Brothers' acquisition of LK Bennett, Fortress Investment Group's restructure of Poundstretcher and Modella Capital's purchase of TG Jones (the former WH Smith high street chain) which they then put up for sale. For the c.11,000 staff the immediate question is still going to be whether AlixPartners can sell the whole business or whether it will be broken up. If no buyer comes in for the whole of the business then it's very likely to be broken up and the stores sold off in groups. Sky News has named B&M and the grocers Iceland, Lidl and Tesco as potential buyers of groups of stores. A break-up would see hundreds of head office jobs at risk and would probably not cover all the stores.</p>

<h2>What the sources do not say</h2>

<p>None of the sources say whether Mark Newton-Jones replied to the committee by the noon deadline on 27 November and there is no published reply so his answer is not claimed here. There is no preferred bidder named, no indication of how many stores would close in the event of a break-up and no date is given for the public hearing. The administrators are expected to provide an update next week but again no date is given.</p>

<p>Sources: <a href="http://lexpress-franchise.com/en/news/poundland-owner-mps-private-equity/">L'Express Franchise</a> for the public hearing request, the wider inquiry, the Sunday bidder deadline and the break-up outlook; <a href="https://www.ipswich.co.uk/poundland-the-1-deal-the-18m-in-fees-and-the-collapse-of-a-british-high-street-giant/">Ipswich.co.uk</a> for the £1 deal and the collapse of the chain; <a href="https://committees.parliament.uk/committee/365/business-innovation-science-and-trade-committee/news/219261/business-innovation-science-and-trade-committee-write-to-poundland-owners-gordon-brothers/">UK Parliament</a> for the committee's letter to Gordon Brothers.</p>

<h2>Frequently asked questions</h2>

<h3>Has Gordon Brothers got back to the MPs yet?</h3>
<p>No reply from Mark Newton-Jones to the committee's noon deadline on Friday 27th November 2026 has been located. The committee had asked him to attend a public hearing and to confirm that Gordon Brothers would not be acting in any insolvency capacity for Poundland.</p>

<h3>When do the Poundland bidders have to confirm their interest?</h3>
<p>The administrators, AlixPartners, have given the four bidders remaining in the final stage of the process until Sunday 29th November 2026 to reconfirm their interest.</p>

<h3>What is the wider inquiry that the MPs are planning?</h3>
<p>The Commons Business Committee is going to open an inquiry into private equity in retail next year. It will look at how private equity houses buy up British retailers, the scope of insolvency law, the role of pension trustees and the potential for changes to the Companies Act.</p>
$$,
ARRAY['http://lexpress-franchise.com/en/news/poundland-owner-mps-private-equity/', 'https://www.ipswich.co.uk/poundland-the-1-deal-the-18m-in-fees-and-the-collapse-of-a-british-high-street-giant/', 'https://committees.parliament.uk/committee/365/business-innovation-science-and-trade-committee/news/219261/business-innovation-science-and-trade-committee-write-to-poundland-owners-gordon-brothers/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- sap-job-cuts-10000-ai-restructuring-20261128 (news; Germany; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'sap-job-cuts-10000-ai-restructuring-20261128', 'news', 'Germany',
'SAP job cuts of 10,000 reported in AI restructuring',
'SAP job cuts of 10,000 reported in AI restructuring',
'SAP job cuts of at least 10,000 are reportedly under discussion as the German software group reshapes its business around AI, though SAP has not confirmed them.',
'SAP job cuts of at least 10,000 are reportedly under discussion as the German software group reshapes its business around AI, though SAP has not confirmed them.',
$$<p>SAP is reportedly in the process of cutting at least 10,000 are reportedly under discussion at the German software group, as it restructures its business around AI. SAP itself has not confirmed any job cuts.</p>

<table>
<tr><td>Company</td><td>SAP SE, Walldorf, Germany</td></tr>
<tr><td>Reported cuts</td><td>At least 10,000 jobs</td></tr>
<tr><td>Share of workforce</td><td>At least 9% of the global workforce</td></tr>
<tr><td>Workforce</td><td>More than 110,000 people worldwide</td></tr>
<tr><td>Teams in focus</td><td>Product development, engineering and sales</td></tr>
<tr><td>Status</td><td>Reported, not confirmed by SAP</td></tr>
</table>

<h2>What happened</h2>

<p> SAP is reportedly in the process of cutting at least 10,000 jobs as part of an AI-led restructuring, Bloomberg News reported on Thursday 26 November, citing sources familiar with the matter, according to <a href="https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781">CNA</a>. The restructuring would be at least 9% of the company's global workforce and the total number of job cuts could well be different once the negotiations with the unions are complete. The plans have not yet been discussed with the employee reps, the FT reported, citing sources familiar with the matter.</p>

<p>SAP has not confirmed the proposed cuts. In response to queries, SAP said the business environment in which it operates is rapidly changing due to AI. "Beyond this, no decisions have been made regarding any further measures. We do not comment on speculation," the company said. The reported review comes as chief executive Christian Klein pushes to integrate AI across SAP's software portfolio, after the company reorganised its executive board twice in 2026. Two of its six board members will leave in March. Bloomberg has noted that SAP has historically announced major restructuring programmes in late January, alongside its annual financial results. For more on large employers cutting roles, see our <a href="https://growentix.cloud/articles/bbc-job-cuts-550-roles-savings-20261127">BBC 550 job cuts</a> report and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the SAP job cuts would mean</h2>

<p>If that figure is correct it would be one of the biggest restructurings by a European tech company this year and a clear indication of just how far the AI shift has penetrated into the very workforce of the software industry. SAP is Europe's most valuable software company and is undertaking a complete re-think of how it builds, develops and markets its products with AI at the very heart of the business. All of the business units are being asked to look at their own potential for cuts with product and engineering and sales in particular under the spotlight. The reports come in a very tough year for tech layoffs - the sector is responsible for 28% of all US job cuts in 2026 (more than any other industry) according to Challenger, Gray and Christmas' October layoff report which <a href="https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs">Morningstar</a>. Workers in Germany should note that no final number has not yet been determined in Germany and the figure could well be different once talks with the trade unions have started.</p>

<h2>What the sources do not say</h2>

<p>The sources do not say which countries or offices would be affected, how many of the 10,000 roles would be in Germany, or when any cuts would take effect. They do not say whether the restructuring would involve voluntary departures, retraining or redeployment, and they do not give a timetable beyond the observation that SAP has historically announced such programmes in late January. Because SAP has not confirmed the plan, the 10,000 figure remains a reported number from unnamed sources, not a company announcement.</p>

<p>Sources: <a href="https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781">CNA</a> for the Bloomberg report, the 9% figure and SAP's statement; <a href="https://www.moneycontrol.com/technology/sap-layoffs-company-may-cut-10-000-jobs-as-ai-push-triggers-major-workforce-restructuring-article-14090018.html">Moneycontrol</a> for the departments under review and the leadership changes; <a href="https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs">Morningstar</a> for the wider US technology layoff picture.</p>
$$,
$$<p>SAP is reportedly in the process of cutting at least 10,000 are reportedly under discussion at the German software group, as it restructures its business around AI. SAP itself has not confirmed any job cuts.</p>

<table>
<tr><td>Company</td><td>SAP SE, Walldorf, Germany</td></tr>
<tr><td>Reported cuts</td><td>At least 10,000 jobs</td></tr>
<tr><td>Share of workforce</td><td>At least 9% of the global workforce</td></tr>
<tr><td>Workforce</td><td>More than 110,000 people worldwide</td></tr>
<tr><td>Teams in focus</td><td>Product development, engineering and sales</td></tr>
<tr><td>Status</td><td>Reported, not confirmed by SAP</td></tr>
</table>

<h2>What happened</h2>

<p> SAP is reportedly in the process of cutting at least 10,000 jobs as part of an AI-led restructuring, Bloomberg News reported on Thursday 26 November, citing sources familiar with the matter, according to <a href="https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781">CNA</a>. The restructuring would be at least 9% of the company's global workforce and the total number of job cuts could well be different once the negotiations with the unions are complete. The plans have not yet been discussed with the employee reps, the FT reported, citing sources familiar with the matter.</p>

<p>SAP has not confirmed the proposed cuts. In response to queries, SAP said the business environment in which it operates is rapidly changing due to AI. "Beyond this, no decisions have been made regarding any further measures. We do not comment on speculation," the company said. The reported review comes as chief executive Christian Klein pushes to integrate AI across SAP's software portfolio, after the company reorganised its executive board twice in 2026. Two of its six board members will leave in March. Bloomberg has noted that SAP has historically announced major restructuring programmes in late January, alongside its annual financial results. For more on large employers cutting roles, see our <a href="https://growentix.cloud/articles/bbc-job-cuts-550-roles-savings-20261127">BBC 550 job cuts</a> report and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the SAP job cuts would mean</h2>

<p>If that figure is correct it would be one of the biggest restructurings by a European tech company this year and a clear indication of just how far the AI shift has penetrated into the very workforce of the software industry. SAP is Europe's most valuable software company and is undertaking a complete re-think of how it builds, develops and markets its products with AI at the very heart of the business. All of the business units are being asked to look at their own potential for cuts with product and engineering and sales in particular under the spotlight. The reports come in a very tough year for tech layoffs - the sector is responsible for 28% of all US job cuts in 2026 (more than any other industry) according to Challenger, Gray and Christmas' October layoff report which <a href="https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs">Morningstar</a>. Workers in Germany should note that no final number has not yet been determined in Germany and the figure could well be different once talks with the trade unions have started.</p>

<h2>What the sources do not say</h2>

<p>The sources do not say which countries or offices would be affected, how many of the 10,000 roles would be in Germany, or when any cuts would take effect. They do not say whether the restructuring would involve voluntary departures, retraining or redeployment, and they do not give a timetable beyond the observation that SAP has historically announced such programmes in late January. Because SAP has not confirmed the plan, the 10,000 figure remains a reported number from unnamed sources, not a company announcement.</p>

<p>Sources: <a href="https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781">CNA</a> for the Bloomberg report, the 9% figure and SAP's statement; <a href="https://www.moneycontrol.com/technology/sap-layoffs-company-may-cut-10-000-jobs-as-ai-push-triggers-major-workforce-restructuring-article-14090018.html">Moneycontrol</a> for the departments under review and the leadership changes; <a href="https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs">Morningstar</a> for the wider US technology layoff picture.</p>
$$,
ARRAY['https://www.channelnewsasia.com/business/sap-job-cuts-ai-restructuring-6585781', 'https://www.moneycontrol.com/technology/sap-layoffs-company-may-cut-10-000-jobs-as-ai-push-triggers-major-workforce-restructuring-article-14090018.html', 'https://www.morningstar.com/news/marketwatch/20261127104/sap-reportedly-to-cut-10000-jobs-it-marks-the-latest-in-a-brutal-year-for-tech-layoffs'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- spain-election-2026-sunday-preview-20261128 (news; Spain; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'spain-election-2026-sunday-preview-20261128', 'news', 'Spain',
'Spain election 2026: what to expect on Sunday',
'Spain election 2026: what to expect on Sunday',
'Spain election 2026 takes place on Sunday 29 November, with final polls pointing to a PP-Vox majority that would end eight years of Socialist-led government.',
'Spain election 2026 takes place on Sunday 29 November, with final polls pointing to a PP-Vox majority that would end eight years of Socialist-led government.',
$$<p>Spain's election of 2026 is on Sunday 29th November. Voters will be deciding whether PM Pedro Sánchez gets a second term or whether the country should go down the path of a conservative government under Alberto Núñez Feijóo.</p>

<table>
<tr><td>Election</td><td>Spain snap general election</td></tr>
<tr><td>Date</td><td>Sunday 29 November 2026</td></tr>
<tr><td>Seats</td><td>350 in Congress, 176 needed for a majority</td></tr>
<tr><td>Senate seats</td><td>208 of 266 up for election</td></tr>
<tr><td>Final poll average</td><td>PP 31.4%, PSOE 29.1%, Vox 17.9%</td></tr>
<tr><td>Main candidates</td><td>Sánchez (PSOE), Feijóo (PP), Abascal (Vox)</td></tr>
</table>

<h2>What happened</h2>

<p>Spain heads to the polls on Sunday in an early general election which could see a right-wing coalition take power and replace the current Socialist-led minority government of Prime Minister Pedro Sánchez (one of the last lefties in Europe), according to <a href="https://dukecountry.fm/2026/11/26/explainer-spains-snap-election-why-it-matters-and-who-might-win/">Reuters via Duke FM</a>. Practically all opinion polls point to a coalition between the conservative People's Party and the far-right Vox as the only one with a realistic chance of securing an absolute majority in the 350-seat lower house. The People's Party is expected to be the largest party at around 31%, Vox at around 18% (driven by younger and male voters. Despite a slight increase in recent weeks to almost 30%, but is still expected to be a very close second.</p>

<p>Two seat forecasts released on 23 November (the final day on which polls could legally appear prior to a blackout) showed the right and far right at 187 to 189 of the 350 seats. The final polling average gives the People's Party 31% of the vote and 128 seats, the Socialists 28.7% and 116 seats and Vox 18.2% and 61 seats. The formal campaign concluded on Friday with Sánchez in Madrid, Feijóo in Seville and Abascal in Valencia. All 350 seats in the lower house are up on closed party lists, as are 208 of the 266 Senate seats. The new lower house will convene on 23 December to elect a speaker and King Felipe will then go on to nominate a candidate for PM (usually the leader of the party with the most votes). For more on the elections, see our report on the hung parliament in <a href="https://growentix.cloud/articles/new-zealand-election-hung-parliament-20261127">New Zealand hung parliament</a> and our <a href="https://growentix.cloud/europe">Europe</a> coverage.</p>

<h2>What the Spain election 2026 could mean</h2>

<p>A People's Party-Vox coalition could give a cabinet post for the first time since Franco died in 1975. The two parties have very different housing proposals. The PP would scrap the 2023 housing law, remove rent caps in the most pressured areas, accelerate the processing of building permits and cut the tax on first homes for people under 40. Vox would also scrap the law and give Spaniards priority for access to the subsidised housing and public services. The Socialists would extend the protections for tenants and ensure that at least a quarter of the new homes are either public or permanently price restricted, funded by a levy on banks. Inflation and housing were the key issues of the campaign, against a very charged background of the housing defeat in parliament on 2 October, the Urda rail disaster on 28 October (69 dead), and a general strike on 11 November. A PP government could still be reliant on Vox for its votes and Feijóo could end up PM with Vox's support even if the Socialists come first in the popular vote.</p>

<h2>What the sources do not say</h2>

<p>No result has been declared and none is being claimed here. This is a preview rather than a result. The polling picture is not as one-sided as the averages would suggest. The final survey by 40dB, based on 7,500 interviews from 10 to 21st November showed the PP at 31.8%, the PSOE at 30.9% and Vox at 17.3%. The October survey from the state institute pointed the PSOE at 33.3% and the PP at 25.5%. The institute's survey published on the 23rd November put PSOE at 34.4%, the PP at 24.7% for the People's Party and 15.6% for Vox. Spanish electoral law prohibits the publication of election polls in the five days immediately prior to polling day so the final surveys can't reflect any shift in voter intentions. If the polls are wrong it could well be a hung parliament with no clear coalition and the parties to the left of the PSOE (together polling around 10%) could still be significant.</p>

<p>Sources: <a href="https://dukecountry.fm/2026/11/26/explainer-spains-snap-election-why-it-matters-and-who-might-win/">Reuters</a> for why the election was called, who is ahead and who the candidates are; <a href="https://www.britainreport.com/2026/11/27/spain-election-2026/">Britain Report</a> for the polling averages, the CIS survey and the election timetable; <a href="https://leprivatebanker.com/2026/11/27/spain-votes-sunday-with-final-polls-pointing-to-a-pp-vox-majority-as-inflation-and-housing-dominate-the-campaign/">The Private Banker</a> for the seat forecasts and the housing programmes.</p>

<h2>Frequently asked questions</h2>

<h3>When's the Spanish election 2026?</h3>
<p>Spain has its snap general election on Sunday 29th November 2026. All 350 seats in the lower house and 208 of the 266 Senate seats are up for election.</p>

<h3>Who's leading in the Spain election polls?</h3>
<p>The latest published polls all point to the conservative People's Party at about 31%, the Socialists at about 29% and Vox at about 18%. The seat projections are People's Party and Vox together at 187/189. One state survey (from the Centre for Sociological Research) had the Socialists in front.</p>

<h3>When will the Spain election result be known?</h3>
<p>Results will come in on Sunday night following the close of the polls. The new lower house will meet on 23 December to elect a speaker and King Felipe will then go on to nominate a PM.</p>
$$,
$$<p>Spain's election of 2026 is on Sunday 29th November. Voters will be deciding whether PM Pedro Sánchez gets a second term or whether the country should go down the path of a conservative government under Alberto Núñez Feijóo.</p>

<table>
<tr><td>Election</td><td>Spain snap general election</td></tr>
<tr><td>Date</td><td>Sunday 29 November 2026</td></tr>
<tr><td>Seats</td><td>350 in Congress, 176 needed for a majority</td></tr>
<tr><td>Senate seats</td><td>208 of 266 up for election</td></tr>
<tr><td>Final poll average</td><td>PP 31.4%, PSOE 29.1%, Vox 17.9%</td></tr>
<tr><td>Main candidates</td><td>Sánchez (PSOE), Feijóo (PP), Abascal (Vox)</td></tr>
</table>

<h2>What happened</h2>

<p>Spain heads to the polls on Sunday in an early general election which could see a right-wing coalition take power and replace the current Socialist-led minority government of Prime Minister Pedro Sánchez (one of the last lefties in Europe), according to <a href="https://dukecountry.fm/2026/11/26/explainer-spains-snap-election-why-it-matters-and-who-might-win/">Reuters via Duke FM</a>. Practically all opinion polls point to a coalition between the conservative People's Party and the far-right Vox as the only one with a realistic chance of securing an absolute majority in the 350-seat lower house. The People's Party is expected to be the largest party at around 31%, Vox at around 18% (driven by younger and male voters. Despite a slight increase in recent weeks to almost 30%, but is still expected to be a very close second.</p>

<p>Two seat forecasts released on 23 November (the final day on which polls could legally appear prior to a blackout) showed the right and far right at 187 to 189 of the 350 seats. The final polling average gives the People's Party 31% of the vote and 128 seats, the Socialists 28.7% and 116 seats and Vox 18.2% and 61 seats. The formal campaign concluded on Friday with Sánchez in Madrid, Feijóo in Seville and Abascal in Valencia. All 350 seats in the lower house are up on closed party lists, as are 208 of the 266 Senate seats. The new lower house will convene on 23 December to elect a speaker and King Felipe will then go on to nominate a candidate for PM (usually the leader of the party with the most votes). For more on the elections, see our report on the hung parliament in <a href="https://growentix.cloud/articles/new-zealand-election-hung-parliament-20261127">New Zealand hung parliament</a> and our <a href="https://growentix.cloud/europe">Europe</a> coverage.</p>

<h2>What the Spain election 2026 could mean</h2>

<p>A People's Party-Vox coalition could give a cabinet post for the first time since Franco died in 1975. The two parties have very different housing proposals. The PP would scrap the 2023 housing law, remove rent caps in the most pressured areas, accelerate the processing of building permits and cut the tax on first homes for people under 40. Vox would also scrap the law and give Spaniards priority for access to the subsidised housing and public services. The Socialists would extend the protections for tenants and ensure that at least a quarter of the new homes are either public or permanently price restricted, funded by a levy on banks. Inflation and housing were the key issues of the campaign, against a very charged background of the housing defeat in parliament on 2 October, the Urda rail disaster on 28 October (69 dead), and a general strike on 11 November. A PP government could still be reliant on Vox for its votes and Feijóo could end up PM with Vox's support even if the Socialists come first in the popular vote.</p>

<h2>What the sources do not say</h2>

<p>No result has been declared and none is being claimed here. This is a preview rather than a result. The polling picture is not as one-sided as the averages would suggest. The final survey by 40dB, based on 7,500 interviews from 10 to 21st November showed the PP at 31.8%, the PSOE at 30.9% and Vox at 17.3%. The October survey from the state institute pointed the PSOE at 33.3% and the PP at 25.5%. The institute's survey published on the 23rd November put PSOE at 34.4%, the PP at 24.7% for the People's Party and 15.6% for Vox. Spanish electoral law prohibits the publication of election polls in the five days immediately prior to polling day so the final surveys can't reflect any shift in voter intentions. If the polls are wrong it could well be a hung parliament with no clear coalition and the parties to the left of the PSOE (together polling around 10%) could still be significant.</p>

<p>Sources: <a href="https://dukecountry.fm/2026/11/26/explainer-spains-snap-election-why-it-matters-and-who-might-win/">Reuters</a> for why the election was called, who is ahead and who the candidates are; <a href="https://www.britainreport.com/2026/11/27/spain-election-2026/">Britain Report</a> for the polling averages, the CIS survey and the election timetable; <a href="https://leprivatebanker.com/2026/11/27/spain-votes-sunday-with-final-polls-pointing-to-a-pp-vox-majority-as-inflation-and-housing-dominate-the-campaign/">The Private Banker</a> for the seat forecasts and the housing programmes.</p>

<h2>Frequently asked questions</h2>

<h3>When's the Spanish election 2026?</h3>
<p>Spain has its snap general election on Sunday 29th November 2026. All 350 seats in the lower house and 208 of the 266 Senate seats are up for election.</p>

<h3>Who's leading in the Spain election polls?</h3>
<p>The latest published polls all point to the conservative People's Party at about 31%, the Socialists at about 29% and Vox at about 18%. The seat projections are People's Party and Vox together at 187/189. One state survey (from the Centre for Sociological Research) had the Socialists in front.</p>

<h3>When will the Spain election result be known?</h3>
<p>Results will come in on Sunday night following the close of the polls. The new lower house will meet on 23 December to elect a speaker and King Felipe will then go on to nominate a PM.</p>
$$,
ARRAY['https://dukecountry.fm/2026/11/26/explainer-spains-snap-election-why-it-matters-and-who-might-win/', 'https://www.britainreport.com/2026/11/27/spain-election-2026/', 'https://leprivatebanker.com/2026/11/27/spain-votes-sunday-with-final-polls-pointing-to-a-pp-vox-majority-as-inflation-and-housing-dominate-the-campaign/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- trump-gdp-fake-probe-commerce-department-20261128 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'trump-gdp-fake-probe-commerce-department-20261128', 'news', 'USA',
'Trump GDP row: president calls figures fake',
'Trump GDP row: president calls figures fake',
'Trump GDP fake claim came on Thanksgiving as the president accused his Commerce Department of deliberately issuing wrong growth figures before the midterms.',
'Trump GDP fake claim came on Thanksgiving as the president accused his Commerce Department of deliberately issuing wrong growth figures before the midterms.',
$$<p>Trump GDP 'fake' claims go live on Thanksgiving. Trump has accused the Commerce Department of deliberately putting out wrong GDP figures prior to this month's mid-term elections and is calling for an investigation.</p>

<table>
<tr><td>Person</td><td>President Donald Trump</td></tr>
<tr><td>Claim</td><td>Pre-election GDP figures were fake and purposely wrong</td></tr>
<tr><td>Revised figure</td><td>Q3 growth 4.3% annualised, revised up from 3.4%</td></tr>
<tr><td>Revision date</td><td>Wednesday 25 November 2026, Bureau of Economic Analysis</td></tr>
<tr><td>Advance estimate</td><td>3.4%, announced 29 October 2026</td></tr>
<tr><td>Evidence offered</td><td>None</td></tr>
</table>

<h2>What happened</h2>

<p> Trump has accused the Department of Commerce of deliberately producing wrong economic growth numbers prior to the midterms and says he wants to launch an investigation, according to <a href="https://www.aljazeera.com/amp/economy/2026/11/26/trump-calls-gdp-data-released-before-midterms-fake-demands-investigation">Al Jazeera</a>. The Bureau of Economic Analysis on Wednesday revised third quarter annualised growth up to 4.3% from the advance estimate of 3.4% which it had issued on 29 October. Trump's party were trounced in the 3 November elections with the Democrats taking control of both houses of Congress.</p>

<p>"It was just revealed that the REAL Numbers on the Economy, published before the Election, were FAKE," Trump said in a Truth Social post, without providing evidence for the accusation. "Why wasn't the correct number issued before the Election? I am asking for an immediate investigation of this situation. This is not a small error, this is a massive, and purposeful, error," he said. The posts were not consistent: Newsweek reported that Trump began the holiday by celebrating the new figure, with his account sharing a message at 7:38 am Eastern cheering that third-quarter growth had been revised up to 4.3% and declaring the economy was roaring. Less than two hours later, he was calling the earlier 3.4% estimate fake, <a href="https://www.firstpost.com/explainers/trump-calls-us-gdp-numbers-fake-demands-probe-how-these-figures-are-measured-14062988.html">Firstpost</a> reported. The Commerce Department did not immediately respond to a request for comment, and the government was largely closed on Thursday for the Thanksgiving holiday. For more on the president, see our <a href="https://growentix.cloud/articles/trump-giuliani-medal-of-freedom-20261127">Trump awards Giuliani Medal of Freedom</a> report and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the Trump GDP fake claim means</h2>

<p>The claim is important because GDP is the most comprehensive measure of the size and pace of the US economy and is the figure that businesses, financial markets and consumers look at when making investment decisions. The BEA has said the revised figure is 0.9pp higher than the initial advance estimate (mainly due to upward revisions to investment and consumption) and that real GDP rose 4.3% in the third quarter after a 2.2% increase in the second quarter. The BEA has previously indicated that its advance estimates can be different from the final figures as they don't have the full source data on inventories, trade and consumer spending on services. Trump has on numerous occasions tried to erode confidence in any economic data that doesn't conform to his narrative of a historic boom. That is a pattern which is very damaging to the credibility of the data that businesses and markets need. The revision itself was a perfectly normal sized and kind revision. What's new is that a President is now saying his own department's figures are fake and is calling for an investigation.</p>

<h2>What the sources do not say</h2>

<p>Trump offered no evidence at all that the earlier figure was wrong on purpose and none of the sources indicate any finding of manipulation. The sources say nothing about who would do the investigation he asked for, or whether one has in fact been opened. They also say nothing about whether the Commerce Department will respond to the accusation when the offices reopen after the holidays.</p>

<p>Sources: <a href="https://www.aljazeera.com/amp/economy/2026/11/26/trump-calls-gdp-data-released-before-midterms-fake-demands-investigation">Al Jazeera</a> for the accusation and the revision; <a href="https://www.channelnewsasia.com/world/trump-demands-probe-gdp-data-released-midterms-6585701">CNA</a> for the timeline and the lack of evidence; <a href="https://www.firstpost.com/explainers/trump-calls-us-gdp-numbers-fake-demands-probe-how-these-figures-are-measured-14062988.html">Firstpost</a> for the morning's contradictory posts and how GDP is measured.</p>
$$,
$$<p>Trump GDP 'fake' claims go live on Thanksgiving. Trump has accused the Commerce Department of deliberately putting out wrong GDP figures prior to this month's mid-term elections and is calling for an investigation.</p>

<table>
<tr><td>Person</td><td>President Donald Trump</td></tr>
<tr><td>Claim</td><td>Pre-election GDP figures were fake and purposely wrong</td></tr>
<tr><td>Revised figure</td><td>Q3 growth 4.3% annualised, revised up from 3.4%</td></tr>
<tr><td>Revision date</td><td>Wednesday 25 November 2026, Bureau of Economic Analysis</td></tr>
<tr><td>Advance estimate</td><td>3.4%, announced 29 October 2026</td></tr>
<tr><td>Evidence offered</td><td>None</td></tr>
</table>

<h2>What happened</h2>

<p> Trump has accused the Department of Commerce of deliberately producing wrong economic growth numbers prior to the midterms and says he wants to launch an investigation, according to <a href="https://www.aljazeera.com/amp/economy/2026/11/26/trump-calls-gdp-data-released-before-midterms-fake-demands-investigation">Al Jazeera</a>. The Bureau of Economic Analysis on Wednesday revised third quarter annualised growth up to 4.3% from the advance estimate of 3.4% which it had issued on 29 October. Trump's party were trounced in the 3 November elections with the Democrats taking control of both houses of Congress.</p>

<p>"It was just revealed that the REAL Numbers on the Economy, published before the Election, were FAKE," Trump said in a Truth Social post, without providing evidence for the accusation. "Why wasn't the correct number issued before the Election? I am asking for an immediate investigation of this situation. This is not a small error, this is a massive, and purposeful, error," he said. The posts were not consistent: Newsweek reported that Trump began the holiday by celebrating the new figure, with his account sharing a message at 7:38 am Eastern cheering that third-quarter growth had been revised up to 4.3% and declaring the economy was roaring. Less than two hours later, he was calling the earlier 3.4% estimate fake, <a href="https://www.firstpost.com/explainers/trump-calls-us-gdp-numbers-fake-demands-probe-how-these-figures-are-measured-14062988.html">Firstpost</a> reported. The Commerce Department did not immediately respond to a request for comment, and the government was largely closed on Thursday for the Thanksgiving holiday. For more on the president, see our <a href="https://growentix.cloud/articles/trump-giuliani-medal-of-freedom-20261127">Trump awards Giuliani Medal of Freedom</a> report and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the Trump GDP fake claim means</h2>

<p>The claim is important because GDP is the most comprehensive measure of the size and pace of the US economy and is the figure that businesses, financial markets and consumers look at when making investment decisions. The BEA has said the revised figure is 0.9pp higher than the initial advance estimate (mainly due to upward revisions to investment and consumption) and that real GDP rose 4.3% in the third quarter after a 2.2% increase in the second quarter. The BEA has previously indicated that its advance estimates can be different from the final figures as they don't have the full source data on inventories, trade and consumer spending on services. Trump has on numerous occasions tried to erode confidence in any economic data that doesn't conform to his narrative of a historic boom. That is a pattern which is very damaging to the credibility of the data that businesses and markets need. The revision itself was a perfectly normal sized and kind revision. What's new is that a President is now saying his own department's figures are fake and is calling for an investigation.</p>

<h2>What the sources do not say</h2>

<p>Trump offered no evidence at all that the earlier figure was wrong on purpose and none of the sources indicate any finding of manipulation. The sources say nothing about who would do the investigation he asked for, or whether one has in fact been opened. They also say nothing about whether the Commerce Department will respond to the accusation when the offices reopen after the holidays.</p>

<p>Sources: <a href="https://www.aljazeera.com/amp/economy/2026/11/26/trump-calls-gdp-data-released-before-midterms-fake-demands-investigation">Al Jazeera</a> for the accusation and the revision; <a href="https://www.channelnewsasia.com/world/trump-demands-probe-gdp-data-released-midterms-6585701">CNA</a> for the timeline and the lack of evidence; <a href="https://www.firstpost.com/explainers/trump-calls-us-gdp-numbers-fake-demands-probe-how-these-figures-are-measured-14062988.html">Firstpost</a> for the morning's contradictory posts and how GDP is measured.</p>
$$,
ARRAY['https://www.aljazeera.com/amp/economy/2026/11/26/trump-calls-gdp-data-released-before-midterms-fake-demands-investigation', 'https://www.channelnewsasia.com/world/trump-demands-probe-gdp-data-released-midterms-6585701', 'https://www.firstpost.com/explainers/trump-calls-us-gdp-numbers-fake-demands-probe-how-these-figures-are-measured-14062988.html'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- uk-net-migration-77000-lowest-since-1997-20261128 (news; UK; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'uk-net-migration-77000-lowest-since-1997-20261128', 'news', 'UK',
'UK net migration falls to 77,000, lowest since 1997',
'UK net migration falls to 77,000, lowest since 1997',
'UK net migration fell to 77,000 in the year to June 2026, the lowest since 1997 outside the pandemic, as arrivals dropped and emigration stayed high.',
'UK net migration fell to 77,000 in the year to June 2026, the lowest since 1997 outside the pandemic, as arrivals dropped and emigration stayed high.',
$$<p>UK net migration fell to 77,000 in the year ending June 2026 (the lowest level since 1997 outside of the pandemic), according to provisional ONS figures published on Thursday 26 November.</p>

<table>
<tr><td>Measure</td><td>Year ending June 2026</td></tr>
<tr><td>Net migration</td><td>77,000</td></tr>
<tr><td>Previous year</td><td>204,000 (updated estimate)</td></tr>
<tr><td>Peak</td><td>944,000 in the year ending March 2023</td></tr>
<tr><td>Long-term arrivals</td><td>738,000, down 17%</td></tr>
<tr><td>Long-term departures</td><td>661,000, broadly stable</td></tr>
<tr><td>Non-EU net migration</td><td>258,000, down from 379,000</td></tr>
</table>

<h2>What happened</h2>

<p>Net migration to the UK has dropped to 77,000, its lowest level since 1997, according to official UK government figures released on Thursday, as reported by <a href="https://www.thehindu.com/news/international/uk-net-migration-falls-to-lowest-since-1997-indians-largest-foreign-group-entering-and-leaving-the-country/article71746576.ece">The Hindu</a>. The figure, which represents the number of people arriving in the UK less the number of people leaving. It's a huge fall on the 204,000 for the year ending June 2025 and the record high of 944,000 for the year ending March 2023. The fall is primarily down to a fall in non-EU migration: non-EU nationals arriving in the UK fell by 17% to 738,000, with emigration staying pretty much flat at 661,000. The</p>

<p>Indians were by far the largest foreign nationality group in terms of long term immigration and emigration. 44,000 Indians came to the UK for work, 77,000 for study and 5,000 for other reasons. 28,000 Indians on work visas left the UK and 55,000 on study visas departed. British citizens also left in large numbers: 245,000 Britons left the country long term, against 109,000 who moved to the UK, giving net migration of Britons at minus 137,000. For EU citizens, 79,000 arrived and 124,000 left, a net figure of minus 45,000. The Home Office published its own immigration statistics on the same day for the year to September 2026: 74,000 people applied for asylum (33% fewer than the year before) and 27,000 people arrived by small boat (42% fewer than the year before). For more on UK policy and work, see our <a href="https://growentix.cloud/uk">UK jobs and business</a> coverage and the <a href="https://growentix.cloud/articles/hmrc-tax-specialist-programme-500-posts-20261025">HMRC Tax Specialist Programme</a> report.</p>

<h2>What UK net migration falling means</h2>

<p>The fall completes a sharp reversal from the 2023 peak, when net migration reached 944,000, and it happens to coincide with a pledge made by the Conservative Party that has been the dominant force in UK politics for more than a decade. The fall is in one group only: there are fewer international students and workers arriving and the earlier cohorts of students are leaving. Work related arrivals are down and work main applicants leaving are up 14% to 53,000, with work dependants up 12% to 32,000. For employers and universities it means a smaller pipeline of international students and workers. For the government it raises the question of whether the fall is due to tighter immigration rules or a weaker UK jobs market pulling in international talent. The figures are of course of interest to anyone contemplating a move to the UK as visa policy is now being set against a backdrop of falling numbers rather than record highs.</p>

<h2>What the sources do not say</h2>

<p>These are provisional figures and previous ONS figures have been revised (by tens of thousands in some cases) as more complete travel data becomes available. The ONS gives a 90% revision range of 31,000 to 128,000 for net migration. The UK figures are more uncertain than usual: updated and the ONS projected British nationals over the 15 month period rather than use the most up to date figures. The ONS also state they are looking at a data issue with their family estimates and caution that those figures may change. The next release is due 27 May 2027.</p>

<p>Sources: <a href="https://www.thehindu.com/news/international/uk-net-migration-falls-to-lowest-since-1997-indians-largest-foreign-group-entering-and-leaving-the-country/article71746576.ece">The Hindu</a> for the headline figures and the Indian nationality breakdown; <a href="https://www.nacionale.com/en/articles/uk-net-migration-77000-year-to-june-2026-lowest-since-1997-why-falling">Nacionale</a> for the arrivals and departures detail, the revision range and the Home Office data; <a href="https://timesofindia.indiatimes.com/education/study-abroad/ons-migration-statistics-2026-uk-net-migration-falls-to-77000-lowest-since-1997-outside-the-pandemic-why-fewer-students-are-arriving-and-why-indians-lead-both-the-inflow-and-the-exit/articleshow/136208258.cms">The Times of India</a> for the work and study breakdown and the provisional status.</p>

<h2>Frequently asked questions</h2>

<h3>What's UK net migration at the moment?</h3>
<p>UK net migration was provisionally estimated at 77,000 for the year ending June 2026 (down from the revised figure of 204,000 for the year earlier and a peak of 944,000 for the year ending March 2023).</p>

<h3>Why did UK net migration fall so dramatically?</h3>
<p>The fall is almost entirely due to people coming from outside the EU. The number of arrivals dropped by over 100,000 whilst emigration has remained broadly stable (fewer students and workers arriving, earlier cohorts of students leaving).</p>

<h3>Are the figures final?</h3>
<p>No. They are provisional estimates with a 90% revision range of 31,000 to 128,000 and the British nationals are projections because updated Department for Work and Pensions data was unavailable.</p>
$$,
$$<p>UK net migration fell to 77,000 in the year ending June 2026 (the lowest level since 1997 outside of the pandemic), according to provisional ONS figures published on Thursday 26 November.</p>

<table>
<tr><td>Measure</td><td>Year ending June 2026</td></tr>
<tr><td>Net migration</td><td>77,000</td></tr>
<tr><td>Previous year</td><td>204,000 (updated estimate)</td></tr>
<tr><td>Peak</td><td>944,000 in the year ending March 2023</td></tr>
<tr><td>Long-term arrivals</td><td>738,000, down 17%</td></tr>
<tr><td>Long-term departures</td><td>661,000, broadly stable</td></tr>
<tr><td>Non-EU net migration</td><td>258,000, down from 379,000</td></tr>
</table>

<h2>What happened</h2>

<p>Net migration to the UK has dropped to 77,000, its lowest level since 1997, according to official UK government figures released on Thursday, as reported by <a href="https://www.thehindu.com/news/international/uk-net-migration-falls-to-lowest-since-1997-indians-largest-foreign-group-entering-and-leaving-the-country/article71746576.ece">The Hindu</a>. The figure, which represents the number of people arriving in the UK less the number of people leaving. It's a huge fall on the 204,000 for the year ending June 2025 and the record high of 944,000 for the year ending March 2023. The fall is primarily down to a fall in non-EU migration: non-EU nationals arriving in the UK fell by 17% to 738,000, with emigration staying pretty much flat at 661,000. The</p>

<p>Indians were by far the largest foreign nationality group in terms of long term immigration and emigration. 44,000 Indians came to the UK for work, 77,000 for study and 5,000 for other reasons. 28,000 Indians on work visas left the UK and 55,000 on study visas departed. British citizens also left in large numbers: 245,000 Britons left the country long term, against 109,000 who moved to the UK, giving net migration of Britons at minus 137,000. For EU citizens, 79,000 arrived and 124,000 left, a net figure of minus 45,000. The Home Office published its own immigration statistics on the same day for the year to September 2026: 74,000 people applied for asylum (33% fewer than the year before) and 27,000 people arrived by small boat (42% fewer than the year before). For more on UK policy and work, see our <a href="https://growentix.cloud/uk">UK jobs and business</a> coverage and the <a href="https://growentix.cloud/articles/hmrc-tax-specialist-programme-500-posts-20261025">HMRC Tax Specialist Programme</a> report.</p>

<h2>What UK net migration falling means</h2>

<p>The fall completes a sharp reversal from the 2023 peak, when net migration reached 944,000, and it happens to coincide with a pledge made by the Conservative Party that has been the dominant force in UK politics for more than a decade. The fall is in one group only: there are fewer international students and workers arriving and the earlier cohorts of students are leaving. Work related arrivals are down and work main applicants leaving are up 14% to 53,000, with work dependants up 12% to 32,000. For employers and universities it means a smaller pipeline of international students and workers. For the government it raises the question of whether the fall is due to tighter immigration rules or a weaker UK jobs market pulling in international talent. The figures are of course of interest to anyone contemplating a move to the UK as visa policy is now being set against a backdrop of falling numbers rather than record highs.</p>

<h2>What the sources do not say</h2>

<p>These are provisional figures and previous ONS figures have been revised (by tens of thousands in some cases) as more complete travel data becomes available. The ONS gives a 90% revision range of 31,000 to 128,000 for net migration. The UK figures are more uncertain than usual: updated and the ONS projected British nationals over the 15 month period rather than use the most up to date figures. The ONS also state they are looking at a data issue with their family estimates and caution that those figures may change. The next release is due 27 May 2027.</p>

<p>Sources: <a href="https://www.thehindu.com/news/international/uk-net-migration-falls-to-lowest-since-1997-indians-largest-foreign-group-entering-and-leaving-the-country/article71746576.ece">The Hindu</a> for the headline figures and the Indian nationality breakdown; <a href="https://www.nacionale.com/en/articles/uk-net-migration-77000-year-to-june-2026-lowest-since-1997-why-falling">Nacionale</a> for the arrivals and departures detail, the revision range and the Home Office data; <a href="https://timesofindia.indiatimes.com/education/study-abroad/ons-migration-statistics-2026-uk-net-migration-falls-to-77000-lowest-since-1997-outside-the-pandemic-why-fewer-students-are-arriving-and-why-indians-lead-both-the-inflow-and-the-exit/articleshow/136208258.cms">The Times of India</a> for the work and study breakdown and the provisional status.</p>

<h2>Frequently asked questions</h2>

<h3>What's UK net migration at the moment?</h3>
<p>UK net migration was provisionally estimated at 77,000 for the year ending June 2026 (down from the revised figure of 204,000 for the year earlier and a peak of 944,000 for the year ending March 2023).</p>

<h3>Why did UK net migration fall so dramatically?</h3>
<p>The fall is almost entirely due to people coming from outside the EU. The number of arrivals dropped by over 100,000 whilst emigration has remained broadly stable (fewer students and workers arriving, earlier cohorts of students leaving).</p>

<h3>Are the figures final?</h3>
<p>No. They are provisional estimates with a 90% revision range of 31,000 to 128,000 and the British nationals are projections because updated Department for Work and Pensions data was unavailable.</p>
$$,
ARRAY['https://www.thehindu.com/news/international/uk-net-migration-falls-to-lowest-since-1997-indians-largest-foreign-group-entering-and-leaving-the-country/article71746576.ece', 'https://www.nacionale.com/en/articles/uk-net-migration-77000-year-to-june-2026-lowest-since-1997-why-falling', 'https://timesofindia.indiatimes.com/education/study-abroad/ons-migration-statistics-2026-uk-net-migration-falls-to-77000-lowest-since-1997-outside-the-pandemic-why-fewer-students-are-arriving-and-why-indians-lead-both-the-inflow-and-the-exit/articleshow/136208258.cms'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- us-iran-blockade-ship-pacific-archer-disabled-20261128 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'us-iran-blockade-ship-pacific-archer-disabled-20261128', 'news', 'USA',
'US Iran blockade ship disabled in Gulf of Oman',
'US Iran blockade ship disabled in Gulf of Oman',
'US Iran blockade ship Pacific Archer was disabled by American aircraft in the Gulf of Oman after it left Bandar Abbas, the 15th vessel hit since April.',
'US Iran blockade ship Pacific Archer was disabled by American aircraft in the Gulf of Oman after it left Bandar Abbas, the 15th vessel hit since April.',
$$<p>The US Iran blockade ship Pacific Archer was disabled by US aircraft in the Gulf of Oman on Thursday as the Palau-flagged bulk carrier departed the Iranian port of Bandar Abbas and attempted to run the US naval blockade of Iranian ports.</p>

<table>
<tr><td>Ship</td><td>M/V Pacific Archer, Palau-flagged bulk carrier</td></tr>
<tr><td>Action</td><td>Precision munitions struck the stern, propulsion disabled</td></tr>
<tr><td>Date</td><td>Thursday 26 November 2026, announced Friday 27 November</td></tr>
<tr><td>Location</td><td>Gulf of Oman, after departing Bandar Abbas</td></tr>
<tr><td>Crew</td><td>Civilian crew unharmed</td></tr>
<tr><td>Count</td><td>At least the 15th vessel disabled since April</td></tr>
</table>

<h2>What happened</h2>

<p>The US military said on Friday it disabled a commercial ship on Thursday after it attempted to run the US blockade of Iran. In contrast, an adviser to the Iranian supreme leader said Iran would keep the Strait of Hormuz shut while vowing to break the embargo, according to <a href="https://www.reuters.com/world/middle-east/us-disables-ship-trying-leave-iran-tehran-vows-confront-blockade-2026-11-27/">Reuters</a>. US Central Command said in a statement that military aircraft launched precision munitions that struck the stern of the Palau-flagged M/V Pacific Archer in the Gulf of Oman after it departed from the Iranian port city of Bandar Abbas. The ship's propulsion was disabled while the civilian crew was unharmed.</p>

<p>It is at least the 15th vessel the US military has publicly acknowledged disabling since the blockade began in April, and the sixth since it resumed it in July. The previous vessel was disabled on 7 November. US Central Command has consistently said that American forces issue multiple warnings before firing on the merchant ships, and CENTCOM said the Pacific Archer's crew received multiple warnings. Ship tracking websites list the vessel's destination as Singapore. CENTCOM did not identify the ship's cargo, and the ClassNK ship register lists the Pacific Archer as a bulk carrier, not an oil tanker. US forces have redirected 158 ships and disabled six that refused to comply with warnings. For more on the region, see our <a href="https://growentix.cloud/articles/jazan-refinery-attack-nepali-worker-killed-20261127">Jazan refinery attack</a> report and the <a href="https://growentix.cloud/articles/israel-gaza-hamas-officials-killed-20261127">Israel-Gaza developments</a> in our News section.</p>

<h2>What the US Iran blockade ship strike means</h2>

<p>The strike is the latest escalation in the US-Iran confrontation at sea, as maritime tensions keep rising. Iran's army says its navy continues to monitor waters from the eastern Strait of Hormuz to the northern Indian Ocean, and Tehran has vowed to confront the blockade. The blockade has squeezed Iran's economy, and each disabled vessel tests how far both sides will go: Washington fires on commercial shipping after warnings, while Tehran threatens to keep the Strait of Hormuz shut. The claims could not be independently verified, and neither side has published evidence of the ship's cargo or its intended destination beyond the tracking data.</p>

<h2>What the sources do not say</h2>

<p>CENTCOM didn't say what the ship's cargo was or where it was headed, nor did they state whether the vessel was subsequently towed. The sources give no indication of what the Pacific Archer was carrying (whether it was loaded with oil or other commodities), or indeed how long it will be out of action. There's nothing in the sources to indicate what Tehran's pledge to break the embargo would actually entail.</p>

<p>Sources: <a href="https://www.reuters.com/world/middle-east/us-disables-ship-trying-leave-iran-tehran-vows-confront-blockade-2026-11-27/">Reuters</a> for the CENTCOM statement and Tehran's response; <a href="https://www.aljazeera.com/news/2026/11/27/us-military-says-it-disabled-merchant-ship-trying-to-breach-iran-blockade?traffic_source=rss&utm_source=hathalyoum.net&utm_medium=referral&utm_campaign=news_redirect">Al Jazeera</a> for the vessel count and the warnings; <a href="https://www.military.com/us-military-says-it-disabled-another-ship-that-tried-to-breach-naval-blockade-on-iranian-ports">Military.com</a> for the Singapore destination and the bulk carrier detail.</p>
$$,
$$<p>The US Iran blockade ship Pacific Archer was disabled by US aircraft in the Gulf of Oman on Thursday as the Palau-flagged bulk carrier departed the Iranian port of Bandar Abbas and attempted to run the US naval blockade of Iranian ports.</p>

<table>
<tr><td>Ship</td><td>M/V Pacific Archer, Palau-flagged bulk carrier</td></tr>
<tr><td>Action</td><td>Precision munitions struck the stern, propulsion disabled</td></tr>
<tr><td>Date</td><td>Thursday 26 November 2026, announced Friday 27 November</td></tr>
<tr><td>Location</td><td>Gulf of Oman, after departing Bandar Abbas</td></tr>
<tr><td>Crew</td><td>Civilian crew unharmed</td></tr>
<tr><td>Count</td><td>At least the 15th vessel disabled since April</td></tr>
</table>

<h2>What happened</h2>

<p>The US military said on Friday it disabled a commercial ship on Thursday after it attempted to run the US blockade of Iran. In contrast, an adviser to the Iranian supreme leader said Iran would keep the Strait of Hormuz shut while vowing to break the embargo, according to <a href="https://www.reuters.com/world/middle-east/us-disables-ship-trying-leave-iran-tehran-vows-confront-blockade-2026-11-27/">Reuters</a>. US Central Command said in a statement that military aircraft launched precision munitions that struck the stern of the Palau-flagged M/V Pacific Archer in the Gulf of Oman after it departed from the Iranian port city of Bandar Abbas. The ship's propulsion was disabled while the civilian crew was unharmed.</p>

<p>It is at least the 15th vessel the US military has publicly acknowledged disabling since the blockade began in April, and the sixth since it resumed it in July. The previous vessel was disabled on 7 November. US Central Command has consistently said that American forces issue multiple warnings before firing on the merchant ships, and CENTCOM said the Pacific Archer's crew received multiple warnings. Ship tracking websites list the vessel's destination as Singapore. CENTCOM did not identify the ship's cargo, and the ClassNK ship register lists the Pacific Archer as a bulk carrier, not an oil tanker. US forces have redirected 158 ships and disabled six that refused to comply with warnings. For more on the region, see our <a href="https://growentix.cloud/articles/jazan-refinery-attack-nepali-worker-killed-20261127">Jazan refinery attack</a> report and the <a href="https://growentix.cloud/articles/israel-gaza-hamas-officials-killed-20261127">Israel-Gaza developments</a> in our News section.</p>

<h2>What the US Iran blockade ship strike means</h2>

<p>The strike is the latest escalation in the US-Iran confrontation at sea, as maritime tensions keep rising. Iran's army says its navy continues to monitor waters from the eastern Strait of Hormuz to the northern Indian Ocean, and Tehran has vowed to confront the blockade. The blockade has squeezed Iran's economy, and each disabled vessel tests how far both sides will go: Washington fires on commercial shipping after warnings, while Tehran threatens to keep the Strait of Hormuz shut. The claims could not be independently verified, and neither side has published evidence of the ship's cargo or its intended destination beyond the tracking data.</p>

<h2>What the sources do not say</h2>

<p>CENTCOM didn't say what the ship's cargo was or where it was headed, nor did they state whether the vessel was subsequently towed. The sources give no indication of what the Pacific Archer was carrying (whether it was loaded with oil or other commodities), or indeed how long it will be out of action. There's nothing in the sources to indicate what Tehran's pledge to break the embargo would actually entail.</p>

<p>Sources: <a href="https://www.reuters.com/world/middle-east/us-disables-ship-trying-leave-iran-tehran-vows-confront-blockade-2026-11-27/">Reuters</a> for the CENTCOM statement and Tehran's response; <a href="https://www.aljazeera.com/news/2026/11/27/us-military-says-it-disabled-merchant-ship-trying-to-breach-iran-blockade?traffic_source=rss&utm_source=hathalyoum.net&utm_medium=referral&utm_campaign=news_redirect">Al Jazeera</a> for the vessel count and the warnings; <a href="https://www.military.com/us-military-says-it-disabled-another-ship-that-tried-to-breach-naval-blockade-on-iranian-ports">Military.com</a> for the Singapore destination and the bulk carrier detail.</p>
$$,
ARRAY['https://www.reuters.com/world/middle-east/us-disables-ship-trying-leave-iran-tehran-vows-confront-blockade-2026-11-27/', 'https://www.aljazeera.com/news/2026/11/27/us-military-says-it-disabled-merchant-ship-trying-to-breach-iran-blockade?traffic_source=rss&utm_source=hathalyoum.net&utm_medium=referral&utm_campaign=news_redirect', 'https://www.military.com/us-military-says-it-disabled-another-ship-that-tried-to-breach-naval-blockade-on-iranian-ports'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- zelenskyy-trump-putin-friend-remark-20261128 (news; Ukraine; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'zelenskyy-trump-putin-friend-remark-20261128', 'news', 'Ukraine',
'Zelenskyy Trump Putin row over ''my friend'' remark',
'Zelenskyy Trump Putin row over ''my friend'' remark',
'Zelenskyy Trump Putin row deepened as Ukraine''s president called Trump''s ''my friend'' remark strange and urged the US to pressure Moscow.',
'Zelenskyy Trump Putin row deepened as Ukraine''s president called Trump''s ''my friend'' remark strange and urged the US to pressure Moscow.',
$$<p>Zelenskyy Trump Putin tensions flared on Friday, 27 November 2026, when Ukrainian President Volodymyr Zelenskyy called it "strange" that US President Donald Trump described Russian leader Vladimir Putin as his friend, and urged Washington to put more pressure on Moscow to end the war.</p>

<table>
<tr><td>Interview</td><td>BBC, with correspondent Sarah Rainsford, at Zelenskyy's office in Kyiv</td></tr>
<tr><td>Date</td><td>Recorded 26 November, broadcast Friday 27 November 2026</td></tr>
<tr><td>Remark</td><td>Trump called Putin "my friend" after the Shenzhen summit on 19 November</td></tr>
<tr><td>Response</td><td>Zelenskyy: "He's an aggressor, and a killer… He can't be a friend"</td></tr>
<tr><td>Defence issue</td><td>Ukraine reports a deficit of anti-ballistic missiles and Patriot systems</td></tr>
<tr><td>Peace talks</td><td>Latest Abu Dhabi round produced no visible progress; talks expected to resume in December</td></tr>
</table>

<h2>What happened</h2>

<p>In an interview with the <a href="https://www.youtube.com/watch?v=h7obQwQWOds">BBC</a>, recorded at his office in central Kyiv on 26 November and broadcast the next day, Zelenskyy was asked how he felt seeing Trump embrace Putin and call him a friend. "Of course it's up to the President of the United States, but... it's strange," he said, speaking in English. "He's an aggressor, and a killer… He can't be a friend. Just cannot be." He added that Putin "brought fascism into the 21st century" and said the remark was deeply painful for Ukrainian families who had lost sons and daughters and were pinning their hopes on the US president.</p>

<p>Zelenskyy drew a historical parallel: "It's the same that somebody say about Hitler during the Second World War that he's a good friend. No, he's not a friend." Trump had embraced Putin at a trilateral meeting with Chinese President Xi Jinping on the sidelines of the APEC summit in Shenzhen on 19 November, and days later posted a photograph of the pair embracing on Truth Social, captioned "My Friend" — the <a href="https://www.timesofisrael.com/zelensky-trump-calling-putin-his-friend-like-calling-hitler-a-friend/amp/">Times of Israel</a> dates that post to 21 November.</p>

<p>Trump defended the remark on Thursday, 26 November, telling reporters at Mar-a-Lago: "We want to make a deal. We want to stop the killing." He added: "I could walk in and say, 'I don't like you!' and then we have the same problem that we have with Zelenskyy and Putin," and said, "the biggest problem with that settlement is the fact that you have two leaders that really hate each other." Kremlin spokesman Dmitry Peskov said Zelenskyy was "insulting his counterpart," showing that the Ukrainian leader "is not willing to follow the path of [a] peace settlement," according to <a href="https://www.channelnewsasia.com/world/zelenskyy-trump-russia-ukraine-putin-us-friend-6588296">CNA</a>, reporting from AP.</p>

<p>Zelenskyy also used the interview to complain that Ukraine is struggling to defend its skies. "Absolutely. It's a huge challenge. It's all about air defence. We have one big problem. We have a deficit with anti-ballistic missiles and systems," he said. He said Ukrainian forces can now destroy around 70% of Russia's fastest drones, with the interception rate improving, but that the shortage of missiles for US-made Patriot systems is costing lives, and that Washington's attention has shifted towards the Middle East. He also said the American Starlink satellite system and its military version, Starshield, remain restricted in occupied territory. For background to the negotiations, see our <a href="https://growentix.cloud/articles/ukraine-peace-talks-abu-dhabi-20261125">Ukraine peace talks in Abu Dhabi</a> report and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the Zelenskyy Trump Putin row means</h2>

<p>The row matters because it exposes the gap between how Kyiv and Washington now talk about the war, which began almost five years ago. Zelenskyy wants the United States to act as a genuine ally that pressures the aggressor, not as a neutral mediator: "When you try to be very neutral with the aggressor... it means you support victims and you support also aggressor. It's not right," he told the BBC. "We need American position to be American position. We don't need signals from the United States, which we can get from Russia." His message was blunt: "It's not about comfortable talks; it's about a strong country that can pressure."</p>

<p>The timing adds to the pressure on Kyiv. The latest round of peace talks in Abu Dhabi earlier this month produced no visible progress, and Zelenskyy said negotiations were expected to resume in December — though he added that "the more we know, the more problems" there are. On Thursday, EU leaders failed to agree on a new US$49 billion loan for Ukraine's economic and military needs next year, after fraught talks. Zelenskyy's comments were also broadcast a day after Jared Kushner, Trump's son-in-law and a US envoy mediating an end to the war, complimented Putin as a "grandmaster" of politics, and weeks after Steve Witkoff described Putin as a "humanitarian."</p>

<h2>What the sources do not say</h2>

<p>The sources give no indication of how many Patriot missiles/interceptors Ukraine is lacking, nor when any of the delayed ones are expected to arrive (there is a shortfall and it's costing lives). They give no indication as to when the peace talks are expected to resume in December, or indeed whether the European envoys will be at the table (Zelenskyy said that was not clear). They give no indication as to whether Trump will change his language on Putin, or whether Washington will intensify the pressure on Moscow. There is a bit of a discrepancy in the reporting: the Kyiv Post has the BBC interview dated for publication on Thursday 26th November, the AP and CNA have it was broadcast on Friday, 27 November, and the Kyiv Post has a Truth Social photo post dated on Thursday. The Times of Israel has the "My Friend" photo post dated 21st November (the sources don't make it clear whether these are the same post).</p>

<p>Sources: <a href="https://www.youtube.com/watch?v=h7obQwQWOds">BBC News</a> for the interview (Sarah Rainsford in Kyiv); <a href="https://www.channelnewsasia.com/world/zelenskyy-trump-russia-ukraine-putin-us-friend-6588296">CNA</a>(reporting from AP) for the broadcast, Trump's defence, the Kremlin response and the EU loan talks; <a href="https://www.timesofisrael.com/zelensky-trump-calling-putin-his-friend-like-calling-hitler-a-friend/amp/">The Times of Israel</a> for the 21 November Truth Social post date and Zelenskyy's comments on the peace talks.</p>

<h2>Frequently asked questions</h2>

<h3>What did Trump say in response to Zelenskyy's criticism?</h3>

<p>Trump defended calling Putin a friend on 26 November, saying "We want to make a deal. We want to stop the killing," and arguing that showing hostility would complicate the negotiations.</p>

<h3>When are the Ukraine peace talks expected to resume?</h3>

<p>Zelenskyy told the BBC that negotiations were expected to resume in December, after the latest round in Abu Dhabi produced no visible progress—but the sources gave no exact date.</p>
$$,
$$<p>Zelenskyy Trump Putin tensions flared on Friday, 27 November 2026, when Ukrainian President Volodymyr Zelenskyy called it "strange" that US President Donald Trump described Russian leader Vladimir Putin as his friend, and urged Washington to put more pressure on Moscow to end the war.</p>

<table>
<tr><td>Interview</td><td>BBC, with correspondent Sarah Rainsford, at Zelenskyy's office in Kyiv</td></tr>
<tr><td>Date</td><td>Recorded 26 November, broadcast Friday 27 November 2026</td></tr>
<tr><td>Remark</td><td>Trump called Putin "my friend" after the Shenzhen summit on 19 November</td></tr>
<tr><td>Response</td><td>Zelenskyy: "He's an aggressor, and a killer… He can't be a friend"</td></tr>
<tr><td>Defence issue</td><td>Ukraine reports a deficit of anti-ballistic missiles and Patriot systems</td></tr>
<tr><td>Peace talks</td><td>Latest Abu Dhabi round produced no visible progress; talks expected to resume in December</td></tr>
</table>

<h2>What happened</h2>

<p>In an interview with the <a href="https://www.youtube.com/watch?v=h7obQwQWOds">BBC</a>, recorded at his office in central Kyiv on 26 November and broadcast the next day, Zelenskyy was asked how he felt seeing Trump embrace Putin and call him a friend. "Of course it's up to the President of the United States, but... it's strange," he said, speaking in English. "He's an aggressor, and a killer… He can't be a friend. Just cannot be." He added that Putin "brought fascism into the 21st century" and said the remark was deeply painful for Ukrainian families who had lost sons and daughters and were pinning their hopes on the US president.</p>

<p>Zelenskyy drew a historical parallel: "It's the same that somebody say about Hitler during the Second World War that he's a good friend. No, he's not a friend." Trump had embraced Putin at a trilateral meeting with Chinese President Xi Jinping on the sidelines of the APEC summit in Shenzhen on 19 November, and days later posted a photograph of the pair embracing on Truth Social, captioned "My Friend" — the <a href="https://www.timesofisrael.com/zelensky-trump-calling-putin-his-friend-like-calling-hitler-a-friend/amp/">Times of Israel</a> dates that post to 21 November.</p>

<p>Trump defended the remark on Thursday, 26 November, telling reporters at Mar-a-Lago: "We want to make a deal. We want to stop the killing." He added: "I could walk in and say, 'I don't like you!' and then we have the same problem that we have with Zelenskyy and Putin," and said, "the biggest problem with that settlement is the fact that you have two leaders that really hate each other." Kremlin spokesman Dmitry Peskov said Zelenskyy was "insulting his counterpart," showing that the Ukrainian leader "is not willing to follow the path of [a] peace settlement," according to <a href="https://www.channelnewsasia.com/world/zelenskyy-trump-russia-ukraine-putin-us-friend-6588296">CNA</a>, reporting from AP.</p>

<p>Zelenskyy also used the interview to complain that Ukraine is struggling to defend its skies. "Absolutely. It's a huge challenge. It's all about air defence. We have one big problem. We have a deficit with anti-ballistic missiles and systems," he said. He said Ukrainian forces can now destroy around 70% of Russia's fastest drones, with the interception rate improving, but that the shortage of missiles for US-made Patriot systems is costing lives, and that Washington's attention has shifted towards the Middle East. He also said the American Starlink satellite system and its military version, Starshield, remain restricted in occupied territory. For background to the negotiations, see our <a href="https://growentix.cloud/articles/ukraine-peace-talks-abu-dhabi-20261125">Ukraine peace talks in Abu Dhabi</a> report and the latest in our <a href="https://growentix.cloud/articles">News</a> section.</p>

<h2>What the Zelenskyy Trump Putin row means</h2>

<p>The row matters because it exposes the gap between how Kyiv and Washington now talk about the war, which began almost five years ago. Zelenskyy wants the United States to act as a genuine ally that pressures the aggressor, not as a neutral mediator: "When you try to be very neutral with the aggressor... it means you support victims and you support also aggressor. It's not right," he told the BBC. "We need American position to be American position. We don't need signals from the United States, which we can get from Russia." His message was blunt: "It's not about comfortable talks; it's about a strong country that can pressure."</p>

<p>The timing adds to the pressure on Kyiv. The latest round of peace talks in Abu Dhabi earlier this month produced no visible progress, and Zelenskyy said negotiations were expected to resume in December — though he added that "the more we know, the more problems" there are. On Thursday, EU leaders failed to agree on a new US$49 billion loan for Ukraine's economic and military needs next year, after fraught talks. Zelenskyy's comments were also broadcast a day after Jared Kushner, Trump's son-in-law and a US envoy mediating an end to the war, complimented Putin as a "grandmaster" of politics, and weeks after Steve Witkoff described Putin as a "humanitarian."</p>

<h2>What the sources do not say</h2>

<p>The sources give no indication of how many Patriot missiles/interceptors Ukraine is lacking, nor when any of the delayed ones are expected to arrive (there is a shortfall and it's costing lives). They give no indication as to when the peace talks are expected to resume in December, or indeed whether the European envoys will be at the table (Zelenskyy said that was not clear). They give no indication as to whether Trump will change his language on Putin, or whether Washington will intensify the pressure on Moscow. There is a bit of a discrepancy in the reporting: the Kyiv Post has the BBC interview dated for publication on Thursday 26th November, the AP and CNA have it was broadcast on Friday, 27 November, and the Kyiv Post has a Truth Social photo post dated on Thursday. The Times of Israel has the "My Friend" photo post dated 21st November (the sources don't make it clear whether these are the same post).</p>

<p>Sources: <a href="https://www.youtube.com/watch?v=h7obQwQWOds">BBC News</a> for the interview (Sarah Rainsford in Kyiv); <a href="https://www.channelnewsasia.com/world/zelenskyy-trump-russia-ukraine-putin-us-friend-6588296">CNA</a>(reporting from AP) for the broadcast, Trump's defence, the Kremlin response and the EU loan talks; <a href="https://www.timesofisrael.com/zelensky-trump-calling-putin-his-friend-like-calling-hitler-a-friend/amp/">The Times of Israel</a> for the 21 November Truth Social post date and Zelenskyy's comments on the peace talks.</p>

<h2>Frequently asked questions</h2>

<h3>What did Trump say in response to Zelenskyy's criticism?</h3>

<p>Trump defended calling Putin a friend on 26 November, saying "We want to make a deal. We want to stop the killing," and arguing that showing hostility would complicate the negotiations.</p>

<h3>When are the Ukraine peace talks expected to resume?</h3>

<p>Zelenskyy told the BBC that negotiations were expected to resume in December, after the latest round in Abu Dhabi produced no visible progress—but the sources gave no exact date.</p>
$$,
ARRAY['https://www.youtube.com/watch?v=h7obQwQWOds', 'https://www.channelnewsasia.com/world/zelenskyy-trump-russia-ukraine-putin-us-friend-6588296', 'https://www.timesofisrael.com/zelensky-trump-calling-putin-his-friend-like-calling-hitler-a-friend/amp/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- lisa-viva-la-lisa-residency-final-weekend-20261128 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'lisa-viva-la-lisa-residency-final-weekend-20261128', 'pop-music', 'USA',
'LISA Viva La Lisa Residency Final Weekend Las Vegas',
'LISA Viva La Lisa Residency Final Weekend Las Vegas',
'LISA Viva La Lisa residency closes with its final three shows on 27 to 29 November 2026 at the Colosseum at Caesars Palace, Las Vegas.',
'LISA Viva La Lisa residency closes with its final three shows on 27 to 29 November 2026 at the Colosseum at Caesars Palace, Las Vegas.',
$$<p>LISA's Viva La Lisa residency concludes with its final three shows (27-29 Nov 2026) at the Colosseum at Caesars Palace in Las Vegas. It's the first ever K-pop artist residency in Las Vegas residency ever headlined by a K-pop artist.</p>

<table>
<tr><td>Residency</td><td>VIVA LA LISA — LISA (BLACKPINK)</td></tr>
<tr><td>Venue</td><td>The Colosseum at Caesars Palace, Las Vegas</td></tr>
<tr><td>Final shows</td><td>27, 28 and 29 November 2026; closing night 29 November</td></tr>
<tr><td>Run</td><td>Six shows: 12, 13 and 14 November, then 27, 28 and 29 November</td></tr>
<tr><td>Show</td><td>About 90 minutes, five chapters, live band</td></tr>
</table>

<h2>What happened</h2>

<p>Per <a href="https://www.vegasdaynight.com/blog/las-vegas/things-to-do-las-vegas-weekend">Vegas Day Night</a>, LISA closes the residency with three nights over the Thanksgiving weekend (the run opened with three nights on the 12th-14th November). Caesars have billed it as the first Las Vegas concert residency ever by a K-pop artist. The original four night plan sold out in under ten minutes, and the run has expanded to six shows, according to <a href="https://poplegends.net/lisa-viva-la-lisa-second-weekend/">PopLegends</a>. Billboard's review of opening night (cited by PopLegends) described a 90 minute show in five chapters, each chapter being a different stage persona with excellent choreography, massive costume changes and a stage designed for a superstar. LISA used the night to premiere new music with the first live performances of "Tarantino", "V12" and "BADGRRRL" from her six track EP <em>Press Play</em>(released in October) and an early version of "Leave With Me" prior to its release. Her documentary <em>Always Lalisa</em> which premiered at the Toronto International Film Festival on the 11th September, began streaming on 18 November, <a href="https://asiadaily.org/news/20211/">Asia Daily</a> reported. Our report on <a href="https://growentix.cloud/articles/bts-grammy-awards-2027-asian-pop-category-boycott-20261119">BTS and the 2027 Grammys</a> covered another K-pop chart story and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's music news.</p>

<h2>What the LISA Viva La Lisa residency means</h2>

<p>A six show run is nothing in the Las Vegas standards. Still, the speed of the sellout though is the real story: four nights gone in under ten minutes, two more added on and a 4300 seat room (previously been home to Celine Dion and Elton John) was completely sold out by a solo K-pop act. Rather than just do a "greatest hits" run she's built the show around her solo album <em>Alter Ego</em> and the new <em>Press Play</em> EP, using it as a platform to premiere songs from the new material rather than just playing her hits. She closes on 29th November and it's all been a very busy autumn indeed (October EP, the documentary and a Las Vegas Grand Prix appearance to name but a few) with no further dates in Vegas announced so it's effectively a one-off rather than the start of a longer run.</p>

<h2>What the sources do not say</h2>

<p>The sources don't agree on which two dates the additional shows were on, so that's not specified. There's no attendance or box office information provided for the residency and no indication as to whether LISA will be going to another city. They don't state whether the setlist on the final weekend will be any different from the opening night, or whether any of the closing shows will be recorded or streamed.</p>

<p>Sources: <a href="https://www.vegasdaynight.com/blog/las-vegas/things-to-do-las-vegas-weekend">Vegas Day Night</a>, <a href="https://poplegends.net/lisa-viva-la-lisa-second-weekend/">PopLegends</a>, <a href="https://vegas.extrasuperbig.com/stories/lisa-viva-la-lisa-las-vegas-residency-november-2026-colosseum-caesars">Vegas Extra Super Big</a>, <a href="https://asiadaily.org/news/20211/">Asia Daily</a>.</p>
$$,
$$<p>LISA's Viva La Lisa residency concludes with its final three shows (27-29 Nov 2026) at the Colosseum at Caesars Palace in Las Vegas. It's the first ever K-pop artist residency in Las Vegas residency ever headlined by a K-pop artist.</p>

<table>
<tr><td>Residency</td><td>VIVA LA LISA — LISA (BLACKPINK)</td></tr>
<tr><td>Venue</td><td>The Colosseum at Caesars Palace, Las Vegas</td></tr>
<tr><td>Final shows</td><td>27, 28 and 29 November 2026; closing night 29 November</td></tr>
<tr><td>Run</td><td>Six shows: 12, 13 and 14 November, then 27, 28 and 29 November</td></tr>
<tr><td>Show</td><td>About 90 minutes, five chapters, live band</td></tr>
</table>

<h2>What happened</h2>

<p>Per <a href="https://www.vegasdaynight.com/blog/las-vegas/things-to-do-las-vegas-weekend">Vegas Day Night</a>, LISA closes the residency with three nights over the Thanksgiving weekend (the run opened with three nights on the 12th-14th November). Caesars have billed it as the first Las Vegas concert residency ever by a K-pop artist. The original four night plan sold out in under ten minutes, and the run has expanded to six shows, according to <a href="https://poplegends.net/lisa-viva-la-lisa-second-weekend/">PopLegends</a>. Billboard's review of opening night (cited by PopLegends) described a 90 minute show in five chapters, each chapter being a different stage persona with excellent choreography, massive costume changes and a stage designed for a superstar. LISA used the night to premiere new music with the first live performances of "Tarantino", "V12" and "BADGRRRL" from her six track EP <em>Press Play</em>(released in October) and an early version of "Leave With Me" prior to its release. Her documentary <em>Always Lalisa</em> which premiered at the Toronto International Film Festival on the 11th September, began streaming on 18 November, <a href="https://asiadaily.org/news/20211/">Asia Daily</a> reported. Our report on <a href="https://growentix.cloud/articles/bts-grammy-awards-2027-asian-pop-category-boycott-20261119">BTS and the 2027 Grammys</a> covered another K-pop chart story and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's music news.</p>

<h2>What the LISA Viva La Lisa residency means</h2>

<p>A six show run is nothing in the Las Vegas standards. Still, the speed of the sellout though is the real story: four nights gone in under ten minutes, two more added on and a 4300 seat room (previously been home to Celine Dion and Elton John) was completely sold out by a solo K-pop act. Rather than just do a "greatest hits" run she's built the show around her solo album <em>Alter Ego</em> and the new <em>Press Play</em> EP, using it as a platform to premiere songs from the new material rather than just playing her hits. She closes on 29th November and it's all been a very busy autumn indeed (October EP, the documentary and a Las Vegas Grand Prix appearance to name but a few) with no further dates in Vegas announced so it's effectively a one-off rather than the start of a longer run.</p>

<h2>What the sources do not say</h2>

<p>The sources don't agree on which two dates the additional shows were on, so that's not specified. There's no attendance or box office information provided for the residency and no indication as to whether LISA will be going to another city. They don't state whether the setlist on the final weekend will be any different from the opening night, or whether any of the closing shows will be recorded or streamed.</p>

<p>Sources: <a href="https://www.vegasdaynight.com/blog/las-vegas/things-to-do-las-vegas-weekend">Vegas Day Night</a>, <a href="https://poplegends.net/lisa-viva-la-lisa-second-weekend/">PopLegends</a>, <a href="https://vegas.extrasuperbig.com/stories/lisa-viva-la-lisa-las-vegas-residency-november-2026-colosseum-caesars">Vegas Extra Super Big</a>, <a href="https://asiadaily.org/news/20211/">Asia Daily</a>.</p>
$$,
ARRAY['https://www.vegasdaynight.com/blog/las-vegas/things-to-do-las-vegas-weekend', 'https://poplegends.net/lisa-viva-la-lisa-second-weekend/', 'https://vegas.extrasuperbig.com/stories/lisa-viva-la-lisa-las-vegas-residency-november-2026-colosseum-caesars', 'https://asiadaily.org/news/20211/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- nelly-furtado-shadow-sessions-loose-album-20261128 (pop-music; Canada; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'nelly-furtado-shadow-sessions-loose-album-20261128', 'pop-music', 'Canada',
'Nelly Furtado Shadow Sessions Reimagines Loose',
'Nelly Furtado Shadow Sessions Reimagines Loose',
'Nelly Furtado Shadow Sessions, a surprise album with pianist Adam Tendler, reimagines four songs from Loose as piano-and-voice recordings.',
'Nelly Furtado Shadow Sessions, a surprise album with pianist Adam Tendler, reimagines four songs from Loose as piano-and-voice recordings.',
$$<p>Nelly Furtado Shadow Sessions arrived as a surprise album on 27 November 2026, with the Canadian pop singer and Grammy-nominated pianist Adam Tendler reimagining four songs from her landmark album <em>Loose</em> as stripped-down piano-and-voice recordings.</p>

<table>
<tr><td>Album</td><td>The Shadow Sessions: Songs From Loose — Nelly Furtado with Adam Tendler</td></tr>
<tr><td>Released</td><td>27 November 2026</td></tr>
<tr><td>Tracks</td><td>11, built from four songs from Loose</td></tr>
<tr><td>Recording</td><td>Acoustic, piano and voice only, each track in a single take during an 11-hour session</td></tr>
<tr><td>Original album</td><td>Loose, released 7 June 2006; debuted at No. 1 on the Billboard 200; re-entered the chart in November 2026</td></tr>
</table>

<h2>What happened</h2>

<p>From <a href="https://www.universalmusic.ca/2026/11/27/nelly-furtado-releases-new-album-the-shadow-sessions-songs-from-loose-with-adam-tendler-today/">Universal Music Canada</a>, the album contains very intimate, stripped down re-interpretations of "Say It Right", "Maneater", "Promiscuous" and "All Good Things (Come To An End)" with several versions of each track recorded and labelled accordingly (e.g. Let It Bleed, Divine Fem, Baddie, Mood Disorder). Four of the eleven tracks had already appeared on the <em>Loose</em> 20th Anniversary Edition (released in September). <em>Loose</em> itself re-entered the Billboard 200 earlier in November (20 years after it first hit No.1) and the anniversary 2LP red-and-white vinyl edition, with a litho signed by Furtado) sold out immediately on release. Furtado said the new versions were absolutely transformative and that going back into the songs again had allowed her to find a whole new level of resonance in the themes as she approaches midlife. Our report on <a href="https://growentix.cloud/articles/gta-vi-the-album-lana-del-rey-dua-lipa-zara-larsson-20261118">the GTA VI album (featuring Lana Del Rey and Dua Lipa</a>, covered another major album release and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's music news.</p>

<h2>What the Nelly Furtado Shadow Sessions album means</h2>

<p>That's how the 20th anniversary year of <em>Loose has</em> quietly come to an end. The original album (produced with Timbaland) was a potent mix of pop, R&B, electro, Latin, house, new wave, folk and reggaeton; it hit No. 1 on the Billboard 200, has sold over 10 million copies worldwide and is 3x Platinum in the US. Taking those four biggest tracks and stripping them back to just one piano and one voice (recorded in single takes over eleven hours, is a very deliberate attempt to see if the songs still work in that stripped back form and the chart re-entry this month is a clear indication that the audience is still with it. For Furtado it's also a very low key return to releasing music following the anniversary deluxe edition with no new single campaign to go with it.</p>

<h2>What the sources do not say</h2>

<p>The sources don't give the exact Billboard 200 re-entry position for <em>Loose</em>(just that it re-entered the chart). They don't say whether Furtado will be touring or doing any live performances of the new versions, nor do they indicate that a physical edition of <em>The Shadow Sessions</em> is in the works. They also provide no streaming numbers for the first day of the new album.</p>

<p>Sources: <a href="https://www.universalmusic.ca/2026/11/27/nelly-furtado-releases-new-album-the-shadow-sessions-songs-from-loose-with-adam-tendler-today/">Universal Music Canada</a>, <a href="https://www.thatericalper.com/2026/11/27/nelly-furtado-reimagines-loose-with-pianist-adam-tendler-on-the-shadow-sessions/">That Eric Alper</a>.</p>
$$,
$$<p>Nelly Furtado Shadow Sessions arrived as a surprise album on 27 November 2026, with the Canadian pop singer and Grammy-nominated pianist Adam Tendler reimagining four songs from her landmark album <em>Loose</em> as stripped-down piano-and-voice recordings.</p>

<table>
<tr><td>Album</td><td>The Shadow Sessions: Songs From Loose — Nelly Furtado with Adam Tendler</td></tr>
<tr><td>Released</td><td>27 November 2026</td></tr>
<tr><td>Tracks</td><td>11, built from four songs from Loose</td></tr>
<tr><td>Recording</td><td>Acoustic, piano and voice only, each track in a single take during an 11-hour session</td></tr>
<tr><td>Original album</td><td>Loose, released 7 June 2006; debuted at No. 1 on the Billboard 200; re-entered the chart in November 2026</td></tr>
</table>

<h2>What happened</h2>

<p>From <a href="https://www.universalmusic.ca/2026/11/27/nelly-furtado-releases-new-album-the-shadow-sessions-songs-from-loose-with-adam-tendler-today/">Universal Music Canada</a>, the album contains very intimate, stripped down re-interpretations of "Say It Right", "Maneater", "Promiscuous" and "All Good Things (Come To An End)" with several versions of each track recorded and labelled accordingly (e.g. Let It Bleed, Divine Fem, Baddie, Mood Disorder). Four of the eleven tracks had already appeared on the <em>Loose</em> 20th Anniversary Edition (released in September). <em>Loose</em> itself re-entered the Billboard 200 earlier in November (20 years after it first hit No.1) and the anniversary 2LP red-and-white vinyl edition, with a litho signed by Furtado) sold out immediately on release. Furtado said the new versions were absolutely transformative and that going back into the songs again had allowed her to find a whole new level of resonance in the themes as she approaches midlife. Our report on <a href="https://growentix.cloud/articles/gta-vi-the-album-lana-del-rey-dua-lipa-zara-larsson-20261118">the GTA VI album (featuring Lana Del Rey and Dua Lipa</a>, covered another major album release and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's music news.</p>

<h2>What the Nelly Furtado Shadow Sessions album means</h2>

<p>That's how the 20th anniversary year of <em>Loose has</em> quietly come to an end. The original album (produced with Timbaland) was a potent mix of pop, R&B, electro, Latin, house, new wave, folk and reggaeton; it hit No. 1 on the Billboard 200, has sold over 10 million copies worldwide and is 3x Platinum in the US. Taking those four biggest tracks and stripping them back to just one piano and one voice (recorded in single takes over eleven hours, is a very deliberate attempt to see if the songs still work in that stripped back form and the chart re-entry this month is a clear indication that the audience is still with it. For Furtado it's also a very low key return to releasing music following the anniversary deluxe edition with no new single campaign to go with it.</p>

<h2>What the sources do not say</h2>

<p>The sources don't give the exact Billboard 200 re-entry position for <em>Loose</em>(just that it re-entered the chart). They don't say whether Furtado will be touring or doing any live performances of the new versions, nor do they indicate that a physical edition of <em>The Shadow Sessions</em> is in the works. They also provide no streaming numbers for the first day of the new album.</p>

<p>Sources: <a href="https://www.universalmusic.ca/2026/11/27/nelly-furtado-releases-new-album-the-shadow-sessions-songs-from-loose-with-adam-tendler-today/">Universal Music Canada</a>, <a href="https://www.thatericalper.com/2026/11/27/nelly-furtado-reimagines-loose-with-pianist-adam-tendler-on-the-shadow-sessions/">That Eric Alper</a>.</p>
$$,
ARRAY['https://www.universalmusic.ca/2026/11/27/nelly-furtado-releases-new-album-the-shadow-sessions-songs-from-loose-with-adam-tendler-today/', 'https://www.thatericalper.com/2026/11/27/nelly-furtado-reimagines-loose-with-pianist-adam-tendler-on-the-shadow-sessions/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- stella-lefty-boston-hot-100-number-two-20261128 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'stella-lefty-boston-hot-100-number-two-20261128', 'pop-music', 'USA',
'Stella Lefty Boston Holds Hot 100 No. 2',
'Stella Lefty Boston Holds Hot 100 No. 2',
'Stella Lefty Boston holds at No. 2 on the Billboard Hot 100 dated 28 November 2026, its eighth week at its peak in a 33-week chart run.',
'Stella Lefty Boston holds at No. 2 on the Billboard Hot 100 dated 28 November 2026, its eighth week at its peak in a 33-week chart run.',
$$<p>Stella Lefty Boston is at No. 2 on the Billboard Hot 100 for the 28th of November 2026 (its eighth week at the peak of its chart run) with a run now at 33 weeks.</p>

<table>
<tr><td>Song</td><td>"Boston" — Stella Lefty</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 2 (chart dated 28 November 2026), holds at its peak</td></tr>
<tr><td>Weeks on Hot 100</td><td>33</td></tr>
<tr><td>Hot 100 debut</td><td>No. 95 in April 2026</td></tr>
<tr><td>EP</td><td>Is This Heaven?, debuted at No. 38 on the Billboard 200</td></tr>
<tr><td>Next live dates</td><td>Capital's Jingle Bell Ball, 6 December 2026; Long Way Home Tour from January 2027</td></tr>
</table>

<h2>What happened</h2>

<p>"Boston" climbed back to No. 2 on the Hot 100 dated 21 November, rising from No. 5 and matching its existing peak in its 32nd week, according to <a href="https://sampledmusicblog.com/article/billboard-hot-100-update-november-21-2026">Sampled Music Blog</a>, and the <a href="https://top40weekly.com/us-top-40-singles-week-ending-november-28-2026/">Top40Weekly</a> listing for the week ending 28 November still at No. 2 in its 33rd week. The song debuted on the Hot 100 at No. 95 in April 2026 and made it into the top 20 a month later, according to <a href="https://en.wikipedia.org/wiki/Stella_Lefty">Wikipedia</a>. Lefty, born Stella Lefkofsky of Glencoe, IL) began uploading singing videos to TikTok in 2022 and released her debut single in 2024. Her second EP, <em>Is This Heaven?</em>, released in May 2026 and debuted at No. 38 on the Billboard 200 and No. 9 on Top Country Albums with 20,000 units (wikipedia). Her debut studio album <em>Long Way Home</em> followed on 21 August 2026. She is booked to perform at Capital's Jingle Bell Ball at The O2 in London on 6 December and her Long Way Home Tour gets underway in January 2027. Our piece on <a href="https://growentix.cloud/articles/olivia-rodrigo-billboard-200-fifth-week-number-one-20261122">Olivia Rodrigo's Billboard 200 run</a> covered another album chart story and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Stella Lefty Boston chart run means</h2>

<p>' Boston' is the quietest hit at the top of the chart actually, a Tiktok country-pop song which took seven months to go from 95 to 2 and has now spent eight weeks without ever taking Number 1 (blocked by Ella Langley's run). The fact it's had such staying power rather than a debut-week spike, turned Lefty from a viral sensation into a genuine chart presence with a debut album, a London arena show and a 2027 tour already confirmed. Her slot at the Jingle Bell Ball on 6th December sees her in front of a mainstream UK audience at exactly the point where her American run is now in its ninth month.</p>

<h2>What the sources do not say</h2>

<p>The sources don't provide any streaming, radio or sales figures for the latest chart week so we don't know the precise make-up of the No. 2 hold is not stated. They don't tell us whether "Boston" will actually overtake "Choosin' Texas" to take the No.1 spot or whether Lefty will put out a new single prior to the January tour. The sources also don't give us any ticket details or a full date list for the Long Way Home Tour.</p>

<p>Sources: <a href="https://top40weekly.com/us-top-40-singles-week-ending-november-28-2026/">Top40Weekly</a>, <a href="https://sampledmusicblog.com/article/billboard-hot-100-update-november-21-2026">Sampled Music Blog</a>, <a href="https://en.wikipedia.org/wiki/Stella_Lefty">Wikipedia</a>.</p>
$$,
$$<p>Stella Lefty Boston is at No. 2 on the Billboard Hot 100 for the 28th of November 2026 (its eighth week at the peak of its chart run) with a run now at 33 weeks.</p>

<table>
<tr><td>Song</td><td>"Boston" — Stella Lefty</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 2 (chart dated 28 November 2026), holds at its peak</td></tr>
<tr><td>Weeks on Hot 100</td><td>33</td></tr>
<tr><td>Hot 100 debut</td><td>No. 95 in April 2026</td></tr>
<tr><td>EP</td><td>Is This Heaven?, debuted at No. 38 on the Billboard 200</td></tr>
<tr><td>Next live dates</td><td>Capital's Jingle Bell Ball, 6 December 2026; Long Way Home Tour from January 2027</td></tr>
</table>

<h2>What happened</h2>

<p>"Boston" climbed back to No. 2 on the Hot 100 dated 21 November, rising from No. 5 and matching its existing peak in its 32nd week, according to <a href="https://sampledmusicblog.com/article/billboard-hot-100-update-november-21-2026">Sampled Music Blog</a>, and the <a href="https://top40weekly.com/us-top-40-singles-week-ending-november-28-2026/">Top40Weekly</a> listing for the week ending 28 November still at No. 2 in its 33rd week. The song debuted on the Hot 100 at No. 95 in April 2026 and made it into the top 20 a month later, according to <a href="https://en.wikipedia.org/wiki/Stella_Lefty">Wikipedia</a>. Lefty, born Stella Lefkofsky of Glencoe, IL) began uploading singing videos to TikTok in 2022 and released her debut single in 2024. Her second EP, <em>Is This Heaven?</em>, released in May 2026 and debuted at No. 38 on the Billboard 200 and No. 9 on Top Country Albums with 20,000 units (wikipedia). Her debut studio album <em>Long Way Home</em> followed on 21 August 2026. She is booked to perform at Capital's Jingle Bell Ball at The O2 in London on 6 December and her Long Way Home Tour gets underway in January 2027. Our piece on <a href="https://growentix.cloud/articles/olivia-rodrigo-billboard-200-fifth-week-number-one-20261122">Olivia Rodrigo's Billboard 200 run</a> covered another album chart story and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Stella Lefty Boston chart run means</h2>

<p>' Boston' is the quietest hit at the top of the chart actually, a Tiktok country-pop song which took seven months to go from 95 to 2 and has now spent eight weeks without ever taking Number 1 (blocked by Ella Langley's run). The fact it's had such staying power rather than a debut-week spike, turned Lefty from a viral sensation into a genuine chart presence with a debut album, a London arena show and a 2027 tour already confirmed. Her slot at the Jingle Bell Ball on 6th December sees her in front of a mainstream UK audience at exactly the point where her American run is now in its ninth month.</p>

<h2>What the sources do not say</h2>

<p>The sources don't provide any streaming, radio or sales figures for the latest chart week so we don't know the precise make-up of the No. 2 hold is not stated. They don't tell us whether "Boston" will actually overtake "Choosin' Texas" to take the No.1 spot or whether Lefty will put out a new single prior to the January tour. The sources also don't give us any ticket details or a full date list for the Long Way Home Tour.</p>

<p>Sources: <a href="https://top40weekly.com/us-top-40-singles-week-ending-november-28-2026/">Top40Weekly</a>, <a href="https://sampledmusicblog.com/article/billboard-hot-100-update-november-21-2026">Sampled Music Blog</a>, <a href="https://en.wikipedia.org/wiki/Stella_Lefty">Wikipedia</a>.</p>
$$,
ARRAY['https://top40weekly.com/us-top-40-singles-week-ending-november-28-2026/', 'https://sampledmusicblog.com/article/billboard-hot-100-update-november-21-2026', 'https://en.wikipedia.org/wiki/Stella_Lefty'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- tame-impala-jennie-dracula-hot-100-number-three-20261128 (pop-music; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'tame-impala-jennie-dracula-hot-100-number-three-20261128', 'pop-music', 'Global',
'Tame Impala JENNIE Dracula Holds Hot 100 No. 3',
'Tame Impala JENNIE Dracula Holds Hot 100 No. 3',
'Tame Impala JENNIE Dracula holds at No. 3 on the Billboard Hot 100 dated 28 November 2026, its third week at its peak after a record 58-week climb.',
'Tame Impala JENNIE Dracula holds at No. 3 on the Billboard Hot 100 dated 28 November 2026, its third week at its peak after a record 58-week climb.',
$$<p>Tame Impala's JENNIE Dracula is at No.3 on the Billboard Hot 100 for the 28th November 2026 chart (its third week at the peak of the song) having taken the longest time to reach the top three in the chart's history.</p>

<table>
<tr><td>Song</td><td>"Dracula" — Tame Impala and JENNIE</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 3 (chart dated 28 November 2026), third week at its peak</td></tr>
<tr><td>Weeks on Hot 100</td><td>60</td></tr>
<tr><td>Hot Dance/Electronic Songs</td><td>No. 1 for a 46th week</td></tr>
<tr><td>Hot Rock &amp; Alternative Songs</td><td>No. 1 for a 27th week</td></tr>
<tr><td>Peak reached</td><td>No. 3 in its 58th chart week, climbing from No. 5</td></tr>
</table>

<h2>What happened</h2>

<p>"Dracula" first hit No. 3 on the Hot 100 on the 14th of November (dated), having climbed two places from No. 5 in its 58th week on the chart, according to the <a href="https://www.koreatimes.co.kr/entertainment/k-pop/20261111/dracula-featuring-jennie-climbs-to-no-3-on-billboard-hot-100">Korea Times</a>. <a href="https://en.yna.co.kr/view/AEN20261117002700315">Yonhap</a> reported on the 17th of November that it had remained at No. 3 for a second week in a row. <a href="https://www.instagram.com/p/DgJihXdE7R8/">Billboard Korea's</a> chart graphic for the week of the 28th of November still has it at No. 3 (now in its 60th week. <a href="https://www.musictimes.com/articles/113253/20261109/tame-impala-jennies-dracula-hits-no-3-setting-record-longest-climb-hot-100s-top-three.htm">MusicTimes</a> reported that the 58 week climb was the longest climb to the top three on the Hot 100. The song is also leads the multimetric Hot Dance/Electronic Songs chart for a 46th week and Hot Rock &amp; Alternative Songs chart for a 27th week. The climb sees it tie JENNIE with her BLACKPINK bandmate ROSÉ as the highest charting female K-pop artist on the Hot 100. Our report on <a href="https://growentix.cloud/articles/karol-g-bby-wow-global-200-seventh-week-20261127">Karol G's "BbY WOW" on the Global 200</a> was another example of a long-running hit. The <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Tame Impala JENNIE Dracula chart run means</h2>

<p>It's a slow burn really, not a debut week explosion. "Dracula" was a Tame Impala solo track that came out in October 2025 and the JENNIE remix came out in February 2026 and it went viral on the short form video platforms according to the Korea Times. It's a song spending 60 weeks on the Hot 100 and is still at No. 3 so you can see streaming and radio are still holding it up well past the release cycle. It's currently in the top three with Ella Langley's run and Stella Lefty's "Boston" at No. 2. The big story within the tie with ROSÉ is the headline within the headline: two members of the benchmark for women in K-pop on the US chart.</p>

<h2>What the sources do not say</h2>

<p>Nothing in the sources indicates whether 'Dracula' can actually climb past number 3, or what its streaming, radio and sales figures were in the most recent tracking week. It's not stated whether the song was up for a Grammy at all, only that the nominations became the subject of discussion when it first hit number 3. There's no mention in the sources of any further promotion, performance or a new version of the song.</p>

<p>Sources: <a href="https://en.yna.co.kr/view/AEN20261117002700315">Yonhap News Agency</a>, <a href="https://www.koreatimes.co.kr/entertainment/k-pop/20261111/dracula-featuring-jennie-climbs-to-no-3-on-billboard-hot-100">The Korea Times</a>, <a href="https://www.musictimes.com/articles/113253/20261109/tame-impala-jennies-dracula-hits-no-3-setting-record-longest-climb-hot-100s-top-three.htm">MusicTimes</a>, <a href="https://www.instagram.com/p/DgJihXdE7R8/">Billboard Korea</a>.</p>
$$,
$$<p>Tame Impala's JENNIE Dracula is at No.3 on the Billboard Hot 100 for the 28th November 2026 chart (its third week at the peak of the song) having taken the longest time to reach the top three in the chart's history.</p>

<table>
<tr><td>Song</td><td>"Dracula" — Tame Impala and JENNIE</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 3 (chart dated 28 November 2026), third week at its peak</td></tr>
<tr><td>Weeks on Hot 100</td><td>60</td></tr>
<tr><td>Hot Dance/Electronic Songs</td><td>No. 1 for a 46th week</td></tr>
<tr><td>Hot Rock &amp; Alternative Songs</td><td>No. 1 for a 27th week</td></tr>
<tr><td>Peak reached</td><td>No. 3 in its 58th chart week, climbing from No. 5</td></tr>
</table>

<h2>What happened</h2>

<p>"Dracula" first hit No. 3 on the Hot 100 on the 14th of November (dated), having climbed two places from No. 5 in its 58th week on the chart, according to the <a href="https://www.koreatimes.co.kr/entertainment/k-pop/20261111/dracula-featuring-jennie-climbs-to-no-3-on-billboard-hot-100">Korea Times</a>. <a href="https://en.yna.co.kr/view/AEN20261117002700315">Yonhap</a> reported on the 17th of November that it had remained at No. 3 for a second week in a row. <a href="https://www.instagram.com/p/DgJihXdE7R8/">Billboard Korea's</a> chart graphic for the week of the 28th of November still has it at No. 3 (now in its 60th week. <a href="https://www.musictimes.com/articles/113253/20261109/tame-impala-jennies-dracula-hits-no-3-setting-record-longest-climb-hot-100s-top-three.htm">MusicTimes</a> reported that the 58 week climb was the longest climb to the top three on the Hot 100. The song is also leads the multimetric Hot Dance/Electronic Songs chart for a 46th week and Hot Rock &amp; Alternative Songs chart for a 27th week. The climb sees it tie JENNIE with her BLACKPINK bandmate ROSÉ as the highest charting female K-pop artist on the Hot 100. Our report on <a href="https://growentix.cloud/articles/karol-g-bby-wow-global-200-seventh-week-20261127">Karol G's "BbY WOW" on the Global 200</a> was another example of a long-running hit. The <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Tame Impala JENNIE Dracula chart run means</h2>

<p>It's a slow burn really, not a debut week explosion. "Dracula" was a Tame Impala solo track that came out in October 2025 and the JENNIE remix came out in February 2026 and it went viral on the short form video platforms according to the Korea Times. It's a song spending 60 weeks on the Hot 100 and is still at No. 3 so you can see streaming and radio are still holding it up well past the release cycle. It's currently in the top three with Ella Langley's run and Stella Lefty's "Boston" at No. 2. The big story within the tie with ROSÉ is the headline within the headline: two members of the benchmark for women in K-pop on the US chart.</p>

<h2>What the sources do not say</h2>

<p>Nothing in the sources indicates whether 'Dracula' can actually climb past number 3, or what its streaming, radio and sales figures were in the most recent tracking week. It's not stated whether the song was up for a Grammy at all, only that the nominations became the subject of discussion when it first hit number 3. There's no mention in the sources of any further promotion, performance or a new version of the song.</p>

<p>Sources: <a href="https://en.yna.co.kr/view/AEN20261117002700315">Yonhap News Agency</a>, <a href="https://www.koreatimes.co.kr/entertainment/k-pop/20261111/dracula-featuring-jennie-climbs-to-no-3-on-billboard-hot-100">The Korea Times</a>, <a href="https://www.musictimes.com/articles/113253/20261109/tame-impala-jennies-dracula-hits-no-3-setting-record-longest-climb-hot-100s-top-three.htm">MusicTimes</a>, <a href="https://www.instagram.com/p/DgJihXdE7R8/">Billboard Korea</a>.</p>
$$,
ARRAY['https://en.yna.co.kr/view/AEN20261117002700315', 'https://www.koreatimes.co.kr/entertainment/k-pop/20261111/dracula-featuring-jennie-climbs-to-no-3-on-billboard-hot-100', 'https://www.musictimes.com/articles/113253/20261109/tame-impala-jennies-dracula-hits-no-3-setting-record-longest-climb-hot-100s-top-three.htm', 'https://www.instagram.com/p/DgJihXdE7R8/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- tate-mcrae-housewife-hot-100-top-ten-20261128 (pop-music; Canada; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'tate-mcrae-housewife-hot-100-top-ten-20261128', 'pop-music', 'Canada',
'Tate McRae Housewife Still Hot 100 Top 10',
'Tate McRae Housewife Still Hot 100 Top 10',
'Tate McRae Housewife sits at No. 6 on the Billboard Hot 100 dated 28 November 2026 after debuting at No. 2 and topping both global charts.',
'Tate McRae Housewife sits at No. 6 on the Billboard Hot 100 dated 28 November 2026 after debuting at No. 2 and topping both global charts.',
$$<p>Tate McRae's Housewife sits at No.6 on the Billboard Hot 100 for the week of 28th November 2026 (five weeks after it first entered at No.2), having taken both of Billboard's global song charts.</p>

<table>
<tr><td>Song</td><td>"Housewife" — Tate McRae</td></tr>
<tr><td>Released</td><td>15 October 2026, via RCA Records</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 6 (chart dated 28 November 2026); debuted at No. 2 on 31 October</td></tr>
<tr><td>Billboard global charts</td><td>No. 1 on both the Global 200 and Global Excl. US</td></tr>
<tr><td>Debut week</td><td>55.9 million worldwide streams; 22.9 million US streams; 6,000 sales</td></tr>
<tr><td>TikTok</td><td>More than 309,000 creations using the song</td></tr>
</table>

<h2>What happened</h2>

<p>"Housewife" opened at No. 1 on both Billboard global song charts while debuting at No. 2 on the US Hot 100, giving the Canadian singer a new peak as a lead artist on the American chart, according to <a href="https://www.musictimes.com/articles/113078/20261030/tate-mcraes-housewife-tops-global-charts-debuts-no-2-hot-100.htm">MusicTimes</a>, citing Billboard. The song collected 55.9 million worldwide streams and 6,000 sales in the 16–22 October tracking week, and it also entered Streaming Songs at No. 1 — her first No. 1 there as a lead act. McRae released the song and its official video on 15 October, with the video directed by Pierre-Ange Carlotti and filmed in the south of France, then performed it at the Victoria's Secret Fashion Show on 18 October. It has since become a TikTok soundtrack, with more than 309,000 creations built around money, relationships and personal goals, according to the <a href="https://m.economictimes.com/world/us/a-tate-mcrae-song-is-fuelling-a-tiktok-money-trend-and-creators-are-showing-how-far-theyve-come/amp_articleshow/135436080.cms">Economic Times</a>. On the Hot 100 dated 28 November, it slips to No. 6, off its No. 2 peak, in its fifth week on the chart. The single is the lead release from McRae's upcoming fourth studio album. Our report on <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-29-weeks-number-one-20261127">Ella Langley's record 29 weeks at No. 1</a> covered the song ahead of it at the top, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Tate McRae Housewife chart run means</h2>

<p>The US and global charts tell two very different stories. In the US "Housewife" launched behind Ella Langley's "Choosin' Texas" and never passed it. Globally it was No.1 on both the Billboard charts in its first week and it topped Spotify's Daily Global Chart on the day of release (5.671m streams). The TikTok afterlife is significant too with hundreds of thousands of videos turning a song about domesticity into a song about money and motivation which has kept it in the Hot 100 top 10 for a month after release. As the lead single from her fourth album it also sets the commercial benchmark for that record. Her third album <em>So Close To What</em> reached No.1 on the Billboard 200 in March 2025 and this single's global No.1 suggests the new album is starting from a much stronger position than the last.</p>

<h2>What the sources do not say</h2>

<p>The sources do not give a release date or title for McRae's fourth studio album, only that "Housewife" is expected to introduce it. They do not give streaming, radio or sales figures for the latest chart week, so the exact mix behind the slip to No. 6 is not stated. They also do not say whether McRae will perform the song on television or announce tour dates tied to the album.</p>

<p>Sources: <a href="https://www.musictimes.com/articles/113078/20261030/tate-mcraes-housewife-tops-global-charts-debuts-no-2-hot-100.htm">MusicTimes</a>, <a href="https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm">MusicTimes</a>, <a href="https://m.economictimes.com/world/us/a-tate-mcrae-song-is-fuelling-a-tiktok-money-trend-and-creators-are-showing-how-far-theyve-come/amp_articleshow/135436080.cms">Economic Times</a>, <a href="https://www.buzzjack.com/forums/topic/290683-us-hot-100-11282026/?&do=findComment&comment=8081593">BuzzJack</a>.</p>
$$,
$$<p>Tate McRae's Housewife sits at No.6 on the Billboard Hot 100 for the week of 28th November 2026 (five weeks after it first entered at No.2), having taken both of Billboard's global song charts.</p>

<table>
<tr><td>Song</td><td>"Housewife" — Tate McRae</td></tr>
<tr><td>Released</td><td>15 October 2026, via RCA Records</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 6 (chart dated 28 November 2026); debuted at No. 2 on 31 October</td></tr>
<tr><td>Billboard global charts</td><td>No. 1 on both the Global 200 and Global Excl. US</td></tr>
<tr><td>Debut week</td><td>55.9 million worldwide streams; 22.9 million US streams; 6,000 sales</td></tr>
<tr><td>TikTok</td><td>More than 309,000 creations using the song</td></tr>
</table>

<h2>What happened</h2>

<p>"Housewife" opened at No. 1 on both Billboard global song charts while debuting at No. 2 on the US Hot 100, giving the Canadian singer a new peak as a lead artist on the American chart, according to <a href="https://www.musictimes.com/articles/113078/20261030/tate-mcraes-housewife-tops-global-charts-debuts-no-2-hot-100.htm">MusicTimes</a>, citing Billboard. The song collected 55.9 million worldwide streams and 6,000 sales in the 16–22 October tracking week, and it also entered Streaming Songs at No. 1 — her first No. 1 there as a lead act. McRae released the song and its official video on 15 October, with the video directed by Pierre-Ange Carlotti and filmed in the south of France, then performed it at the Victoria's Secret Fashion Show on 18 October. It has since become a TikTok soundtrack, with more than 309,000 creations built around money, relationships and personal goals, according to the <a href="https://m.economictimes.com/world/us/a-tate-mcrae-song-is-fuelling-a-tiktok-money-trend-and-creators-are-showing-how-far-theyve-come/amp_articleshow/135436080.cms">Economic Times</a>. On the Hot 100 dated 28 November, it slips to No. 6, off its No. 2 peak, in its fifth week on the chart. The single is the lead release from McRae's upcoming fourth studio album. Our report on <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-29-weeks-number-one-20261127">Ella Langley's record 29 weeks at No. 1</a> covered the song ahead of it at the top, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Tate McRae Housewife chart run means</h2>

<p>The US and global charts tell two very different stories. In the US "Housewife" launched behind Ella Langley's "Choosin' Texas" and never passed it. Globally it was No.1 on both the Billboard charts in its first week and it topped Spotify's Daily Global Chart on the day of release (5.671m streams). The TikTok afterlife is significant too with hundreds of thousands of videos turning a song about domesticity into a song about money and motivation which has kept it in the Hot 100 top 10 for a month after release. As the lead single from her fourth album it also sets the commercial benchmark for that record. Her third album <em>So Close To What</em> reached No.1 on the Billboard 200 in March 2025 and this single's global No.1 suggests the new album is starting from a much stronger position than the last.</p>

<h2>What the sources do not say</h2>

<p>The sources do not give a release date or title for McRae's fourth studio album, only that "Housewife" is expected to introduce it. They do not give streaming, radio or sales figures for the latest chart week, so the exact mix behind the slip to No. 6 is not stated. They also do not say whether McRae will perform the song on television or announce tour dates tied to the album.</p>

<p>Sources: <a href="https://www.musictimes.com/articles/113078/20261030/tate-mcraes-housewife-tops-global-charts-debuts-no-2-hot-100.htm">MusicTimes</a>, <a href="https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm">MusicTimes</a>, <a href="https://m.economictimes.com/world/us/a-tate-mcrae-song-is-fuelling-a-tiktok-money-trend-and-creators-are-showing-how-far-theyve-come/amp_articleshow/135436080.cms">Economic Times</a>, <a href="https://www.buzzjack.com/forums/topic/290683-us-hot-100-11282026/?&do=findComment&comment=8081593">BuzzJack</a>.</p>
$$,
ARRAY['https://www.musictimes.com/articles/113078/20261030/tate-mcraes-housewife-tops-global-charts-debuts-no-2-hot-100.htm', 'https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm', 'https://m.economictimes.com/world/us/a-tate-mcrae-song-is-fuelling-a-tiktok-money-trend-and-creators-are-showing-how-far-theyve-come/amp_articleshow/135436080.cms', 'https://www.buzzjack.com/forums/topic/290683-us-hot-100-11282026/?&do=findComment&comment=8081593'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- canada-ai-compute-access-fund-1-billion-20261128 (tech-ai; Canada; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'canada-ai-compute-access-fund-1-billion-20261128', 'tech-ai', 'Canada',
'Canada AI Compute Access Fund reaches $1 billion',
'Canada AI Compute Access Fund reaches $1 billion',
'The Canada AI Compute Access Fund has reached $1 billion after a $700 million top-up for small firms building AI products at home in Canada.',
'The Canada AI Compute Access Fund has reached $1 billion after a $700 million top-up for small firms building AI products at home in Canada.',
$$<p>The Canada AI Compute Access Fund has reached $1 billion after the Government of Canada announced a $700 million expansion on 26 November 2026, tripling support for small and medium-sized firms that need expensive computing power to build AI products at home.</p>
<table><tbody><tr><td>Organisation</td><td>Government of Canada</td></tr><tr><td>Announced</td><td>26 November 2026, Toronto</td></tr><tr><td>Top-up</td><td>$700 million</td></tr><tr><td>Fund total</td><td>$1 billion</td></tr><tr><td>New funding announced</td><td>More than $52 million for 45 companies</td></tr><tr><td>Total commitments</td><td>More than $118 million for 89 companies</td></tr></tbody></table>
<h2>What happened</h2>
<p>Evan Solomon, Minister of Artificial Intelligence and Digital Innovation, announced the next phase of the <a href="https://www.canada.ca/en/innovation-science-economic-development/news/2026/11/government-of-canada-boosts-the-ai-compute-access-fund-with-700-million-expansion.html">Canada AI Compute Access Fund</a> in Toronto as part of the $700 million investment under Canada's National AI Strategy: AI for All. This represents an expansion of the initial $300 million under Canada's Sovereign AI Compute Strategy, taking the total Fund investment to $1 billion. The Fund will help Canadian small and medium-sized enterprises pay for the high performance computing that they need in order to test, deploy, scale and commercialise their AI projects.</p>
<p>The same announcement confirmed more than $52 million in support for 45 companies under the fund's first phase, bringing total commitments to more than $118 million for 89 Canadian companies across health care, agriculture, manufacturing, finance and transportation. The first targeted call for proposals focuses on health and life sciences, supporting AI that can speed up research, improve patient outcomes, and strengthen health system performance; applications are now open.</p>
<h2>What the Canada AI Compute Access Fund expansion means</h2>
<p>Compute is the bottleneck for smaller AI firms, and this fund attacks it directly. By cutting the cost of computing power, Ottawa wants more Canadian ideas to become products in Canada rather than moving abroad for infrastructure. The expansion also pushes sovereign compute — capacity owned, operated and governed in Canada — and supports Budget 2026's commitment to bring 500 megawatts of sovereign AI compute online. Readers tracking <a href="https://growentix.cloud/canada">Canada</a> will also want our earlier report on <a href="https://growentix.cloud/articles/government-of-canada-jobs-20261127">Government of Canada jobs</a>, while the <a href="https://growentix.cloud/tech-ai">Tech section</a> carries the wider AI infrastructure story. The government projects that AI adoption could contribute up to $200 billion in economic growth by 2034 and help create up to 250,000 jobs by 2031.</p>
<h2>What the sources do not say</h2>
<p>The government release makes no mention of the application deadline for the health and life sciences call, the cost sharing percentages or the eligibility thresholds (all of which are in the programme guide). It doesn't name the 45 companies that have been funded in the release (they are in the separate backgrounder), and gives no indication of how much of the $1bn will be allocated to the health call versus the calls that will follow.</p>
<p>Sources: <a href="https://www.canada.ca/en/innovation-science-economic-development/news/2026/11/government-of-canada-boosts-the-ai-compute-access-fund-with-700-million-expansion.html">Government of Canada</a> — official announcement of the $700M expansion, the $1B total and the 45 company funding round.</p>
$$,
$$<p>The Canada AI Compute Access Fund has reached $1 billion after the Government of Canada announced a $700 million expansion on 26 November 2026, tripling support for small and medium-sized firms that need expensive computing power to build AI products at home.</p>
<table><tbody><tr><td>Organisation</td><td>Government of Canada</td></tr><tr><td>Announced</td><td>26 November 2026, Toronto</td></tr><tr><td>Top-up</td><td>$700 million</td></tr><tr><td>Fund total</td><td>$1 billion</td></tr><tr><td>New funding announced</td><td>More than $52 million for 45 companies</td></tr><tr><td>Total commitments</td><td>More than $118 million for 89 companies</td></tr></tbody></table>
<h2>What happened</h2>
<p>Evan Solomon, Minister of Artificial Intelligence and Digital Innovation, announced the next phase of the <a href="https://www.canada.ca/en/innovation-science-economic-development/news/2026/11/government-of-canada-boosts-the-ai-compute-access-fund-with-700-million-expansion.html">Canada AI Compute Access Fund</a> in Toronto as part of the $700 million investment under Canada's National AI Strategy: AI for All. This represents an expansion of the initial $300 million under Canada's Sovereign AI Compute Strategy, taking the total Fund investment to $1 billion. The Fund will help Canadian small and medium-sized enterprises pay for the high performance computing that they need in order to test, deploy, scale and commercialise their AI projects.</p>
<p>The same announcement confirmed more than $52 million in support for 45 companies under the fund's first phase, bringing total commitments to more than $118 million for 89 Canadian companies across health care, agriculture, manufacturing, finance and transportation. The first targeted call for proposals focuses on health and life sciences, supporting AI that can speed up research, improve patient outcomes, and strengthen health system performance; applications are now open.</p>
<h2>What the Canada AI Compute Access Fund expansion means</h2>
<p>Compute is the bottleneck for smaller AI firms, and this fund attacks it directly. By cutting the cost of computing power, Ottawa wants more Canadian ideas to become products in Canada rather than moving abroad for infrastructure. The expansion also pushes sovereign compute — capacity owned, operated and governed in Canada — and supports Budget 2026's commitment to bring 500 megawatts of sovereign AI compute online. Readers tracking <a href="https://growentix.cloud/canada">Canada</a> will also want our earlier report on <a href="https://growentix.cloud/articles/government-of-canada-jobs-20261127">Government of Canada jobs</a>, while the <a href="https://growentix.cloud/tech-ai">Tech section</a> carries the wider AI infrastructure story. The government projects that AI adoption could contribute up to $200 billion in economic growth by 2034 and help create up to 250,000 jobs by 2031.</p>
<h2>What the sources do not say</h2>
<p>The government release makes no mention of the application deadline for the health and life sciences call, the cost sharing percentages or the eligibility thresholds (all of which are in the programme guide). It doesn't name the 45 companies that have been funded in the release (they are in the separate backgrounder), and gives no indication of how much of the $1bn will be allocated to the health call versus the calls that will follow.</p>
<p>Sources: <a href="https://www.canada.ca/en/innovation-science-economic-development/news/2026/11/government-of-canada-boosts-the-ai-compute-access-fund-with-700-million-expansion.html">Government of Canada</a> — official announcement of the $700M expansion, the $1B total and the 45 company funding round.</p>
$$,
ARRAY['https://www.canada.ca/en/innovation-science-economic-development/news/2026/11/government-of-canada-boosts-the-ai-compute-access-fund-with-700-million-expansion.html'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- los-angeles-schools-block-google-ai-overviews-20261128 (tech-ai; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'los-angeles-schools-block-google-ai-overviews-20261128', 'tech-ai', 'USA',
'Los Angeles schools block Google AI Overviews on devices',
'Los Angeles schools block Google AI Overviews on devices',
'Los Angeles schools block Google AI Overviews on student devices, making LAUSD the largest US district to sideline Google''s AI search feature.',
'Los Angeles schools block Google AI Overviews on student devices, making LAUSD the largest US district to sideline Google''s AI search feature.',
$$<p>Los Angeles schools have blocked Google AI summaries on student devices. LA Unified (the largest school district in the US to take this step) has quietly turned off Google's AI Overview in searches on school-issued devices after months of wrangling with Google over whether schools can turn the AI off without necessarily losing search altogether.</p>
<table><tbody><tr><td>Organisation</td><td>Los Angeles Unified School District (LAUSD)</td></tr><tr><td>Students enrolled</td><td>About 500,000</td></tr><tr><td>Action</td><td>AI Overview disabled on school-issued devices</td></tr><tr><td>Committee meeting</td><td>13 November 2026</td></tr><tr><td>Status</td><td>Temporary suspension</td></tr></tbody></table>
<h2>What happened</h2>
<p>Los Angeles school officials quietly disabled AI-generated summaries, known as AI Overview, in Google searches on school-issued devices, the <a href="https://www.fastcompany.com/91649464/it-was-talk-playground-googles-ai-features-blocked-la-school-officials">Associated Press reported via Fast Company</a> on 27 November 2026. The district, which enrols half a million students, made no formal announcement, and parents and students noticed the missing summaries first. Members of Schools Beyond Screens LA, a group pushing for screen-time limits and tech oversight, spoke at a meeting of the district's AI committee on Friday 13 November; by that Monday, AI Overview was gone. LAUSD said in a statement it temporarily suspended AI Overview to ensure student experiences are "age-appropriate and safe", and said it continually evaluates its digital safeguards, including third-party tools.</p>
<p>The move follows moratoriums on student use of generative AI in September from the two largest districts, New York and LA). LAUSD had already turned off Google's AI Mode at the start of the year. Google has made it clear that it can't take AI out of its search products and in early November said it would simply turn off Gemini and all the search tools by default for K-12 schools over the coming months.</p>
<h2>Why Los Angeles schools block Google AI features</h2>
<p>This is the sharpest clash yet between schools and the company that supplies most of America's classroom technology — Chromebooks and Google Docs, Classroom and search are woven into daily lessons. Google's position is that search and AI are deeply integrated, so a school that bans AI loses search; districts call that strong-arming. LAUSD's answer, using a third-party filtering tool, shows a large district can peel AI out of search on its own devices, and other districts are watching: Fairfax County in Virginia has built plug-ins to remove AI summaries for students. The district's chief information officer, Jack Kelanic, put it plainly at the committee meeting: "We have choices. We can change the default search engine literally overnight." The story also connects to Google's wider AI push in the <a href="https://growentix.cloud/tech-ai">Tech section</a> — see <a href="https://growentix.cloud/articles/gemini-computer-use-mac-launch-20261122">Gemini Computer Use on Mac</a> for how far Google is extending its AI across devices.</p>
<h2>What the sources do not say</h2>
<p>The sources do not say which filtering tool LAUSD used, how the block was done technically, or how long the suspension is intended to last — the district confirmed the change but gave no other details. They do not say whether the block covers staff devices (educators and staff still have access to AI Mode), and they do not state whether LAUSD will drop Google products entirely, only that districts are considering it unless Google offers a permanent workaround.</p>
<p>Sources: <a href="https://www.fastcompany.com/91649464/it-was-talk-playground-googles-ai-features-blocked-la-school-officials">Associated Press via Fast Company</a> for the LAUSD move, the district's statement, and the Google position.</p>
$$,
$$<p>Los Angeles schools have blocked Google AI summaries on student devices. LA Unified (the largest school district in the US to take this step) has quietly turned off Google's AI Overview in searches on school-issued devices after months of wrangling with Google over whether schools can turn the AI off without necessarily losing search altogether.</p>
<table><tbody><tr><td>Organisation</td><td>Los Angeles Unified School District (LAUSD)</td></tr><tr><td>Students enrolled</td><td>About 500,000</td></tr><tr><td>Action</td><td>AI Overview disabled on school-issued devices</td></tr><tr><td>Committee meeting</td><td>13 November 2026</td></tr><tr><td>Status</td><td>Temporary suspension</td></tr></tbody></table>
<h2>What happened</h2>
<p>Los Angeles school officials quietly disabled AI-generated summaries, known as AI Overview, in Google searches on school-issued devices, the <a href="https://www.fastcompany.com/91649464/it-was-talk-playground-googles-ai-features-blocked-la-school-officials">Associated Press reported via Fast Company</a> on 27 November 2026. The district, which enrols half a million students, made no formal announcement, and parents and students noticed the missing summaries first. Members of Schools Beyond Screens LA, a group pushing for screen-time limits and tech oversight, spoke at a meeting of the district's AI committee on Friday 13 November; by that Monday, AI Overview was gone. LAUSD said in a statement it temporarily suspended AI Overview to ensure student experiences are "age-appropriate and safe", and said it continually evaluates its digital safeguards, including third-party tools.</p>
<p>The move follows moratoriums on student use of generative AI in September from the two largest districts, New York and LA). LAUSD had already turned off Google's AI Mode at the start of the year. Google has made it clear that it can't take AI out of its search products and in early November said it would simply turn off Gemini and all the search tools by default for K-12 schools over the coming months.</p>
<h2>Why Los Angeles schools block Google AI features</h2>
<p>This is the sharpest clash yet between schools and the company that supplies most of America's classroom technology — Chromebooks and Google Docs, Classroom and search are woven into daily lessons. Google's position is that search and AI are deeply integrated, so a school that bans AI loses search; districts call that strong-arming. LAUSD's answer, using a third-party filtering tool, shows a large district can peel AI out of search on its own devices, and other districts are watching: Fairfax County in Virginia has built plug-ins to remove AI summaries for students. The district's chief information officer, Jack Kelanic, put it plainly at the committee meeting: "We have choices. We can change the default search engine literally overnight." The story also connects to Google's wider AI push in the <a href="https://growentix.cloud/tech-ai">Tech section</a> — see <a href="https://growentix.cloud/articles/gemini-computer-use-mac-launch-20261122">Gemini Computer Use on Mac</a> for how far Google is extending its AI across devices.</p>
<h2>What the sources do not say</h2>
<p>The sources do not say which filtering tool LAUSD used, how the block was done technically, or how long the suspension is intended to last — the district confirmed the change but gave no other details. They do not say whether the block covers staff devices (educators and staff still have access to AI Mode), and they do not state whether LAUSD will drop Google products entirely, only that districts are considering it unless Google offers a permanent workaround.</p>
<p>Sources: <a href="https://www.fastcompany.com/91649464/it-was-talk-playground-googles-ai-features-blocked-la-school-officials">Associated Press via Fast Company</a> for the LAUSD move, the district's statement, and the Google position.</p>
$$,
ARRAY['https://www.fastcompany.com/91649464/it-was-talk-playground-googles-ai-features-blocked-la-school-officials'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- nvidia-southeast-asia-server-shipments-paused-20261128 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'nvidia-southeast-asia-server-shipments-paused-20261128', 'tech-ai', 'Global',
'Nvidia Southeast Asia server shipments paused over US curbs',
'Nvidia Southeast Asia server shipments paused over US curbs',
'Nvidia Southeast Asia server shipments are paused after the chipmaker told partners to halt AI server deliveries to four countries over US export curbs.',
'Nvidia Southeast Asia server shipments are paused after the chipmaker told partners to halt AI server deliveries to four countries over US export curbs.',
$$<p>Nvidia's server shipments in Southeast Asia have been suspended following the company's instruction to its manufacturing partners to cease shipping AI servers to Malaysia, Singapore, Thailand and Indonesia, in the supply chain as a result of the new US export controls designed to prevent Chinese firms from accessing advanced chips via overseas data centres.</p>
<table><tbody><tr><td>Company</td><td>Nvidia</td></tr><tr><td>Partners affected</td><td>Dell; Super Micro</td></tr><tr><td>Countries affected</td><td>Malaysia, Singapore, Thailand, Indonesia</td></tr><tr><td>Reported</td><td>26 November 2026</td></tr><tr><td>US rule in force</td><td>19 November 2026</td></tr></tbody></table>
<h2>What happened</h2>
<p>Nvidia has told manufacturing partners, including Dell and Super Micro, to pause server shipments to Malaysia, Singapore, Thailand and Indonesia for an unspecified period while it assesses whether its regional partners are meeting US export requirements, the Wall Street Journal reported, <a href="https://techcrunch.com/2026/11/26/nvidia-hits-pause-on-chip-shipments-to-southeast-asia/">according to TechCrunch</a>. <a href="https://www.business-standard.com/amp/world-news/nvidia-halts-shipments-of-ai-servers-to-four-southeast-asian-countries-126112601562_1.html">Business Standard</a>, citing the Financial Times, reports that Dell and Supermicro told buyers in the four countries that Nvidia would not allow their orders to ship.</p>
<p>The pause follows a US Commerce Department that took effect on 19 November 2026. That rule requires an export licence for any advanced chips shipped to the four countries (plus Brazil) to close a loophole whereby Chinese companies could rent computing power remotely from data centres overseas. The Institute for Progress has estimated that remote data centres of this type provide around 24% of China's AI computing power.</p>
<h2>What the Nvidia Southeast Asia server shipments halt means</h2>
<p>SE Asia is one of the fastest growing AI data centre hubs in the world so a halt there has repercussions far beyond the four countries: data centre operators who have bought the hardware to rent out their computing power and financing for those projects is already on hold. It's another example of how the export controls are having an effect in practice (they don't actually operate at China's border, they operate at the warehouses of Nvidia's own partners). That's the context we've seen before in the <a href="https://growentix.cloud/tech-ai">Tech section</a>(our piece on the initial market reaction to the <a href="https://growentix.cloud/articles/us-ai-chip-curbs-southeast-asia-data-centre-shares-20261118">US AI chip curbs hitting SE Asia data centre shares</a> covered the first market reaction, and <a href="https://growentix.cloud/articles/nvidia-shares-huang-return-20261125">Nvidia shares after Huang's return</a> have followed the same turbulent trajectory as the company over the month.</p>
<h2>What the sources do not say</h2>
<p>Nvidia, Dell and Super Micro did not respond to requests for comment, so the pause is reported, not confirmed by the companies, and it is unclear whether the halt is temporary or how long it will last. The sources do not say how many orders are affected, what their value is, or which specific chip models are covered. The reports also do not state whether any licences have been applied for or granted under the new rules.</p>
<p>Sources: <a href="https://techcrunch.com/2026/11/26/nvidia-hits-pause-on-chip-shipments-to-southeast-asia/">TechCrunch</a>(citing the WSJ) for the pause and the four countries; <a href="https://www.business-standard.com/amp/world-news/nvidia-halts-shipments-of-ai-servers-to-four-southeast-asian-countries-126112601562_1.html">Business Standard</a>(citing the FT) for the partners telling buyers that the orders wouldn't ship.</p>
$$,
$$<p>Nvidia's server shipments in Southeast Asia have been suspended following the company's instruction to its manufacturing partners to cease shipping AI servers to Malaysia, Singapore, Thailand and Indonesia, in the supply chain as a result of the new US export controls designed to prevent Chinese firms from accessing advanced chips via overseas data centres.</p>
<table><tbody><tr><td>Company</td><td>Nvidia</td></tr><tr><td>Partners affected</td><td>Dell; Super Micro</td></tr><tr><td>Countries affected</td><td>Malaysia, Singapore, Thailand, Indonesia</td></tr><tr><td>Reported</td><td>26 November 2026</td></tr><tr><td>US rule in force</td><td>19 November 2026</td></tr></tbody></table>
<h2>What happened</h2>
<p>Nvidia has told manufacturing partners, including Dell and Super Micro, to pause server shipments to Malaysia, Singapore, Thailand and Indonesia for an unspecified period while it assesses whether its regional partners are meeting US export requirements, the Wall Street Journal reported, <a href="https://techcrunch.com/2026/11/26/nvidia-hits-pause-on-chip-shipments-to-southeast-asia/">according to TechCrunch</a>. <a href="https://www.business-standard.com/amp/world-news/nvidia-halts-shipments-of-ai-servers-to-four-southeast-asian-countries-126112601562_1.html">Business Standard</a>, citing the Financial Times, reports that Dell and Supermicro told buyers in the four countries that Nvidia would not allow their orders to ship.</p>
<p>The pause follows a US Commerce Department that took effect on 19 November 2026. That rule requires an export licence for any advanced chips shipped to the four countries (plus Brazil) to close a loophole whereby Chinese companies could rent computing power remotely from data centres overseas. The Institute for Progress has estimated that remote data centres of this type provide around 24% of China's AI computing power.</p>
<h2>What the Nvidia Southeast Asia server shipments halt means</h2>
<p>SE Asia is one of the fastest growing AI data centre hubs in the world so a halt there has repercussions far beyond the four countries: data centre operators who have bought the hardware to rent out their computing power and financing for those projects is already on hold. It's another example of how the export controls are having an effect in practice (they don't actually operate at China's border, they operate at the warehouses of Nvidia's own partners). That's the context we've seen before in the <a href="https://growentix.cloud/tech-ai">Tech section</a>(our piece on the initial market reaction to the <a href="https://growentix.cloud/articles/us-ai-chip-curbs-southeast-asia-data-centre-shares-20261118">US AI chip curbs hitting SE Asia data centre shares</a> covered the first market reaction, and <a href="https://growentix.cloud/articles/nvidia-shares-huang-return-20261125">Nvidia shares after Huang's return</a> have followed the same turbulent trajectory as the company over the month.</p>
<h2>What the sources do not say</h2>
<p>Nvidia, Dell and Super Micro did not respond to requests for comment, so the pause is reported, not confirmed by the companies, and it is unclear whether the halt is temporary or how long it will last. The sources do not say how many orders are affected, what their value is, or which specific chip models are covered. The reports also do not state whether any licences have been applied for or granted under the new rules.</p>
<p>Sources: <a href="https://techcrunch.com/2026/11/26/nvidia-hits-pause-on-chip-shipments-to-southeast-asia/">TechCrunch</a>(citing the WSJ) for the pause and the four countries; <a href="https://www.business-standard.com/amp/world-news/nvidia-halts-shipments-of-ai-servers-to-four-southeast-asian-countries-126112601562_1.html">Business Standard</a>(citing the FT) for the partners telling buyers that the orders wouldn't ship.</p>
$$,
ARRAY['https://techcrunch.com/2026/11/26/nvidia-hits-pause-on-chip-shipments-to-southeast-asia/', 'https://www.business-standard.com/amp/world-news/nvidia-halts-shipments-of-ai-servers-to-four-southeast-asian-countries-126112601562_1.html'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- openai-countersues-apple-trade-secrets-20261128 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'openai-countersues-apple-trade-secrets-20261128', 'tech-ai', 'Global',
'OpenAI countersues Apple over trade secrets and suppliers',
'OpenAI countersues Apple over trade secrets and suppliers',
'OpenAI countersues Apple over trade secrets and supplier access, escalating the AI device dispute with a San Jose filing ahead of a July 2027 trial.',
'OpenAI countersues Apple over trade secrets and supplier access, escalating the AI device dispute with a San Jose filing ahead of a July 2027 trial.',
$$<p>OpenAI is counter-suing Apple in a fresh legal action accusing Apple of stealing its trade secrets and of blocking it from accessing hardware suppliers, the Financial Times reported on 27 November 2026, in a dispute that turns the two companies from partners into courtroom rivals over who builds the next generation of AI devices.</p>
<table><tbody><tr><td>Company</td><td>OpenAI; Apple</td></tr><tr><td>Reported</td><td>27 November 2026</td></tr><tr><td>Claim</td><td>Trade secret theft; blocking access to hardware suppliers</td></tr><tr><td>Original suit</td><td>Apple sued OpenAI in July 2026</td></tr></tbody></table>
<h2>What happened</h2>
<p>OpenAI launched a new legal action against Apple, accusing it of stealing trade secrets and of blocking its access to hardware suppliers, according to the <a href="https://www.reuters.com/technology/openai-countersues-apple-stealing-trade-secrets-ft-reports-2026-11-27/">Financial Times report carried by Reuters</a>. The move responds to Apple's earlier lawsuit against OpenAI over hardware secrets, which OpenAI denies. The two companies once worked together to bring ChatGPT to the iPhone, but they are now on opposite sides of a trade-secrets fight over who builds the next generation of AI devices.</p>
<h2>Why OpenAI countersues Apple matters</h2>
<p>The case will be decisive in terms of who controls the first wave of AI-first devices. If OpenAI is in fact building its own phone or device (which is widely believed to be the case), then access to the suppliers and to the hardware know-how is the real issue and a court battle over suppliers could well delay a product before it even ships. For Apple, the countersuit is a significant escalation of its own earlier action in that it is now not just the accuser. For the <a href="https://growentix.cloud/tech-ai">Tech section</a> readers, it's a timely reminder of just how rapidly the ChatGPT-on-iPhone relationship has deteriorated. See our earlier piece on the <a href="https://growentix.cloud/articles/apple-intelligence-usage-packs-20261125">Apple Intelligence usage packs</a> for a look at how Apple has been packaging AI on its own devices.</p>
<h2>What the sources do not say</h2>
<p>Reuters doesn't publish the filing so we can't check the full list of allegations and the evidence supporting them. There's no court date, no judge and we don't know what remedies OpenAI is seeking. All of the claims on both sides are allegations and none of them have been proven in court.</p>
<p>Sources: <a href="https://www.reuters.com/technology/openai-countersues-apple-stealing-trade-secrets-ft-reports-2026-11-27/">Reuters</a>, reporting on the Financial Times, on OpenAI's new legal action against Apple.</p>
$$,
$$<p>OpenAI is counter-suing Apple in a fresh legal action accusing Apple of stealing its trade secrets and of blocking it from accessing hardware suppliers, the Financial Times reported on 27 November 2026, in a dispute that turns the two companies from partners into courtroom rivals over who builds the next generation of AI devices.</p>
<table><tbody><tr><td>Company</td><td>OpenAI; Apple</td></tr><tr><td>Reported</td><td>27 November 2026</td></tr><tr><td>Claim</td><td>Trade secret theft; blocking access to hardware suppliers</td></tr><tr><td>Original suit</td><td>Apple sued OpenAI in July 2026</td></tr></tbody></table>
<h2>What happened</h2>
<p>OpenAI launched a new legal action against Apple, accusing it of stealing trade secrets and of blocking its access to hardware suppliers, according to the <a href="https://www.reuters.com/technology/openai-countersues-apple-stealing-trade-secrets-ft-reports-2026-11-27/">Financial Times report carried by Reuters</a>. The move responds to Apple's earlier lawsuit against OpenAI over hardware secrets, which OpenAI denies. The two companies once worked together to bring ChatGPT to the iPhone, but they are now on opposite sides of a trade-secrets fight over who builds the next generation of AI devices.</p>
<h2>Why OpenAI countersues Apple matters</h2>
<p>The case will be decisive in terms of who controls the first wave of AI-first devices. If OpenAI is in fact building its own phone or device (which is widely believed to be the case), then access to the suppliers and to the hardware know-how is the real issue and a court battle over suppliers could well delay a product before it even ships. For Apple, the countersuit is a significant escalation of its own earlier action in that it is now not just the accuser. For the <a href="https://growentix.cloud/tech-ai">Tech section</a> readers, it's a timely reminder of just how rapidly the ChatGPT-on-iPhone relationship has deteriorated. See our earlier piece on the <a href="https://growentix.cloud/articles/apple-intelligence-usage-packs-20261125">Apple Intelligence usage packs</a> for a look at how Apple has been packaging AI on its own devices.</p>
<h2>What the sources do not say</h2>
<p>Reuters doesn't publish the filing so we can't check the full list of allegations and the evidence supporting them. There's no court date, no judge and we don't know what remedies OpenAI is seeking. All of the claims on both sides are allegations and none of them have been proven in court.</p>
<p>Sources: <a href="https://www.reuters.com/technology/openai-countersues-apple-stealing-trade-secrets-ft-reports-2026-11-27/">Reuters</a>, reporting on the Financial Times, on OpenAI's new legal action against Apple.</p>
$$,
ARRAY['https://www.reuters.com/technology/openai-countersues-apple-stealing-trade-secrets-ft-reports-2026-11-27/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- openai-private-inference-alpha-encrypted-ai-20261128 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'openai-private-inference-alpha-encrypted-ai-20261128', 'tech-ai', 'Global',
'OpenAI Private Inference alpha tests encrypted AI for business',
'OpenAI Private Inference alpha tests encrypted AI for business',
'OpenAI Private Inference is in alpha testing, keeping business prompts and replies encrypted while models process them in confidential computing.',
'OpenAI Private Inference is in alpha testing, keeping business prompts and replies encrypted while models process them in confidential computing.',
$$<p>OpenAI Private Inference is now in testing with a small group of business customers, chief executive Sam Altman announced on 25 November 2026, offering companies a way to keep their prompts and the model's replies encrypted while the AI is working on them—the one moment when even encrypted data is normally readable.</p>
<table><tbody><tr><td>Company</td><td>OpenAI</td></tr><tr><td>Feature</td><td>Private Inference</td></tr><tr><td>Status</td><td>Alpha; small group of customers</td></tr><tr><td>Announced</td><td>25 November 2026</td></tr><tr><td>Technology</td><td>Confidential computing</td></tr></tbody></table>
<h2>What happened</h2>
<p>"We're now testing Private Inference, our latest offering as part of OpenAI Private Intelligence, with a small group of customers," Altman wrote on X, adding that stronger privacy protections would make frontier AI useful for more work. <a href="https://www.cnbctv18.com/technology/sam-altman-announces-openai-private-inference-whats-the-new-privacy-feature-and-how-does-it-work-20041890.htm">CNBC TV18 reported</a> that the feature uses confidential computing and strict security controls to protect business information while models process it. Private Inference sits inside Private Intelligence, OpenAI's set of privacy and security features for businesses, alongside Zero Data Retention, under which the company does not store prompts or responses after processing for eligible API users.</p>
<p>Altman also pointed to Zero Data Retention with Private Safety Processing which enables automated safety reviews without any OpenAI personnel ever having access to the actual content. OpenAI says it's already securing confidential computing capacity for a much larger rollout, though no date has been provided.</p>
<h2>What OpenAI Private Inference changes for businesses</h2>
<p>The vast majority of AI privacy promises are about what happens to the data after the answer (i.e. after it's been used to generate the response) in terms of storage or use in training. Private Inference is about what happens during the inference process itself and that's the gap that's been preventing banks, hospitals and law firms from putting their most sensitive work into a hosted frontier model. If the alpha holds then it broadens the set of jobs that those organisations will be willing to offload to OpenAI's models and it directly addresses a competitive threat — Anthropic have opened their own version of the same thing to the public just two days earlier. For those reading the <a href="https://growentix.cloud/tech-ai">Tech section</a>, the privacy push pairs with OpenAI's health work (see <a href="https://growentix.cloud/articles/chatgpt-health-android-rollout-20261127">ChatGPT Health on Android</a>) — where sensitive personal data is exactly what is at stake.</p>
<h2>What the sources do not say</h2>
<p>OpenAI has not said which models support Private Inference, how many customers are in the test, what performance overhead the confidential computing adds, or how it will be priced. There is no date for a wider rollout, and no independent verification of the security claims has been published. The announcement also does not say whether the feature covers every API workflow or only eligible ones.</p>
<p>Sources: <a href="https://www.cnbctv18.com/technology/sam-altman-announces-openai-private-inference-whats-the-new-privacy-feature-and-how-does-it-work-20041890.htm">CNBC TV18</a> for Altman's announcement, the feature's design, and the Private Intelligence framework.</p>
$$,
$$<p>OpenAI Private Inference is now in testing with a small group of business customers, chief executive Sam Altman announced on 25 November 2026, offering companies a way to keep their prompts and the model's replies encrypted while the AI is working on them—the one moment when even encrypted data is normally readable.</p>
<table><tbody><tr><td>Company</td><td>OpenAI</td></tr><tr><td>Feature</td><td>Private Inference</td></tr><tr><td>Status</td><td>Alpha; small group of customers</td></tr><tr><td>Announced</td><td>25 November 2026</td></tr><tr><td>Technology</td><td>Confidential computing</td></tr></tbody></table>
<h2>What happened</h2>
<p>"We're now testing Private Inference, our latest offering as part of OpenAI Private Intelligence, with a small group of customers," Altman wrote on X, adding that stronger privacy protections would make frontier AI useful for more work. <a href="https://www.cnbctv18.com/technology/sam-altman-announces-openai-private-inference-whats-the-new-privacy-feature-and-how-does-it-work-20041890.htm">CNBC TV18 reported</a> that the feature uses confidential computing and strict security controls to protect business information while models process it. Private Inference sits inside Private Intelligence, OpenAI's set of privacy and security features for businesses, alongside Zero Data Retention, under which the company does not store prompts or responses after processing for eligible API users.</p>
<p>Altman also pointed to Zero Data Retention with Private Safety Processing which enables automated safety reviews without any OpenAI personnel ever having access to the actual content. OpenAI says it's already securing confidential computing capacity for a much larger rollout, though no date has been provided.</p>
<h2>What OpenAI Private Inference changes for businesses</h2>
<p>The vast majority of AI privacy promises are about what happens to the data after the answer (i.e. after it's been used to generate the response) in terms of storage or use in training. Private Inference is about what happens during the inference process itself and that's the gap that's been preventing banks, hospitals and law firms from putting their most sensitive work into a hosted frontier model. If the alpha holds then it broadens the set of jobs that those organisations will be willing to offload to OpenAI's models and it directly addresses a competitive threat — Anthropic have opened their own version of the same thing to the public just two days earlier. For those reading the <a href="https://growentix.cloud/tech-ai">Tech section</a>, the privacy push pairs with OpenAI's health work (see <a href="https://growentix.cloud/articles/chatgpt-health-android-rollout-20261127">ChatGPT Health on Android</a>) — where sensitive personal data is exactly what is at stake.</p>
<h2>What the sources do not say</h2>
<p>OpenAI has not said which models support Private Inference, how many customers are in the test, what performance overhead the confidential computing adds, or how it will be priced. There is no date for a wider rollout, and no independent verification of the security claims has been published. The announcement also does not say whether the feature covers every API workflow or only eligible ones.</p>
<p>Sources: <a href="https://www.cnbctv18.com/technology/sam-altman-announces-openai-private-inference-whats-the-new-privacy-feature-and-how-does-it-work-20041890.htm">CNBC TV18</a> for Altman's announcement, the feature's design, and the Private Intelligence framework.</p>
$$,
ARRAY['https://www.cnbctv18.com/technology/sam-altman-announces-openai-private-inference-whats-the-new-privacy-feature-and-how-does-it-work-20041890.htm'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;
