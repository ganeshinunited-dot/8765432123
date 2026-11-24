-- Daily batch 2026-11-24: 41 NEW articles in ONE migration (Jobs 10 + News 11 + Pop Music 10 + Tech 10; user-ordered publish 24 Nov 2026 ~15:19 NPT).
-- GRAMMARLY + HUMANIZER VERIFIED: every article passed Grammarly Pro (grammar + plagiarism 0-3%) and the Humanizer pass; final AI Detector scan on the EXACT publish text: Jobs 10%/3%, News 8%/0% (Huang 0%, selloff 32%), Pop 3%/0%, Tech 32%/14% (Tech-40 18%), Taplejung earthquake 35%. Facts intact: fact-changing rewrites were rejected at both the agent and the applier stage.
-- JOBS CORRECTIONS HELD: the 9 live Jobs rows (Affirm, GDS, Companies House, NLC, NRC, Singapore NTS, DWP Ramsgate, VA Albuquerque, PSPC) have real fixes but the user did NOT choose to update them — this migration touches NO live row, only 41 new slugs.
-- ADDED 24 Nov morning on user order: Taplejung earthquake (News #11, 5.6 magnitude, Olangchung Gola) — batch is 41, not 40. Huang + selloff + Tech-40 articles were rewritten 24 Nov morning after Nvidia reinstated Jensen Huang (board vote Mon 23 Nov).
-- VERIFIED_DATE: verifiedAt = '2026-11-24' on ALL 10 new job rows; NULL for News/Pop/Tech rows; authorName NULL on all rows.
-- NEPALI FIELDS: this batch produced no Nepali translations; titleNe/excerptNe/bodyNe carry the English text (article page renders En fields only — verified in page.tsx).
-- SQL SAFETY: bodies dollar-quoted; titles/excerpts SQL-escaped by doubling single quotes (a few contain apostrophes: Isn't, London's, Google's, Microsoft's, Samsung's); no dollar-quote markers or backslashes in any body; sources are bare URLs extracted from "Name — URL" entries where needed.

-- assistant-united-states-attorney-jobs-new-orleans-20261124 (usa; USA; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'assistant-united-states-attorney-jobs-new-orleans-20261124', 'usa', 'USA',
'Assistant United States Attorney Jobs: New Orleans, Close 30 Nov',
'Assistant United States Attorney Jobs: New Orleans, Close 30 Nov',
'Assistant United States Attorney jobs are open in the Eastern District of Louisiana, New Orleans, paying $76,748 to $197,100. Apply by 30 November 2026.',
'Assistant United States Attorney jobs are open in the Eastern District of Louisiana, New Orleans, paying $76,748 to $197,100. Apply by 30 November 2026.',
$$<p>The US Attorney's Office for the Eastern District of Louisiana is recruiting for a permanent Assistant U.S. Attorney  in the Civil Division in New Orleans. The AUSA in the EDLA is due to close at 11:59pm ET on Monday 30th November 2026.</p><table><tbody><tr><td>Organisation</td><td>US Attorney's Office, Eastern District of Louisiana, US Department of Justice</td></tr><tr><td>Post</td><td>Assistant United States Attorney, Civil Division, permanent attorney appointment</td></tr><tr><td>Total posts</td><td>1</td></tr><tr><td>Pay</td><td>$76,748 to $197,100 a year, including 17.06% locality pay</td></tr><tr><td>Application dates</td><td>Closing 11:59pm Eastern Time, Monday 30 November 2026</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>JD degree, active member of the bar in any US jurisdiction, at least 1 year post-JD legal or other relevant experience; US citizenship required</td></tr><tr><td>Selection</td><td>Online questionnaire, resume of no more than 2 pages, veterans' preference documentation if applicable</td></tr></tbody></table><h2>What the Assistant United States Attorney jobs involve</h2><p>The Civil Division attorney will be the attorney for the US, its agencies and its employees in civil litigation. The caseload covers employment cases under Title VII, the Age Discrimination in Employment Act, the Rehabilitation Act and the ADA; Federal Tort Claims Act cases (premises liability, motor vehicle accidents, medical malpractice); challenges to federal programmes, regulations and statutes (including under the APA and Bivens actions against federal officers). The attorney may also bring civil actions on an affirmative basis including environmental enforcement, False Claims Act claims and actions to collect monetary penalties. The office serves 13 parishes in southeastern Louisiana from 650 Poydras Street, Suite 1600, New Orleans. Occasional travel may be some travel required and relocation expenses will not be reimbursed. For those looking at other <a href="https://growentix.cloud/usa">USA jobs</a> there's also a report on <a href="https://growentix.cloud/articles/assistant-united-states-attorney-jobs-maryland-20261123">Assistant U.S. Attorney jobs in Maryland</a> which is a very similar Civil Division post with the same 30 November deadline.</p><h2>Who can apply</h2><p>Applicants must have a JD, be an active member of the bar in any US jurisdiction and have at least 1 year of post-JD legal or other relevant experience (all of which must be satisfied by the closing date). US citizenship is required. The office would prefer an applicant who is capable of handling civil litigation with very little supervision in a high pressure environment and who has strong oral and written communication skills, strong research and courtroom advocacy skills and the ability to work with client agencies. Appointees must live in the district or within 25 miles of it and selection is subject to a drug test and  background investigation. Veterans' preference will be considered a positive factor in the hiring of attorneys and applicants who claim such preference should include that in their cover letter or resume along with the appropriate documentation.</p><h2>What it pays</h2><p>Pay is $76,748 to $197,100 per annum (set administratively and in part on years of professional attorney experience). The range already incorporates the 17.06% locality pay for the New Orleans area so applicants should not add a further uplift. Relocation expenses are not authorised for this post.</p><h2>How to apply</h2><p>Apply online via USAJOBS through USAJOBS on the Assistant U.S. Attorney announcement for the Eastern District of Louisiana (Job ID 27-LAE-13119467-AUSA) by 11:59pm ET on Monday 30th November 2026. Your application package will consist of the online questionnaire, a resume of no more than 2 pages and any veterans' preference forms. The two page resume limit is a hard cap (any resume over 2 pages will be deemed ineligible and will not be considered). For each prior position you have held you will be required to provide the official title, the name of the employer  and their contact details, the start and end dates, the number of hours (full or part time) and the duties you performed. You can check the status of your application  in USAJOBS under Applications. If you are unable to apply online you should contact Carlie Kempf at 504-680-3128 or  carlie.kempf@usdoj.gov prior to the close date to request an alternative method.</p><h2>What the notice does not say</h2><p>Two things are missing from the notice altogether: any interview dates, and any start date. It also lists a single post, with no separate salary figure — the published range already folds in the locality pay.</p><p><strong>Do not hand money to anyone who offers to get you this job.</strong> Applying through USAJOBS costs nothing, and the Department of Justice will not ask you for payment at any stage — not to apply, not to be assessed, and not for an offer.</p><p>Sources: <a href="https://www.justice.gov/legal-careers/job/assistant-united-states-attorney-745">US Department of Justice</a> (the vacancy notice: duties, qualifications, deadline, pay and application process); <a href="https://www.usajobs.gov/GetJob/ViewDetails/893396100">USAJOBS</a> (the official application portal for the announcement).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From $76,748 to $197,100 a year (that's with the 17.06% locality pay) depending on years of professional attorney experience.</p><h3>When do applications close?</h3><p>At 11.59pm ET on Monday 30th November 2026.</p><h3>What qualifications are required?</h3><p>A JD, active bar admission in any US jurisdiction, a minimum of 1 year of post-JD legal or other relevant experience and US citizenship.</p><h3>How long can the resume be?</h3><p>No more than 2 pages. Any CV which is longer resume results in an ineligible and will not be considered.</p>
$$,
$$<p>The US Attorney's Office for the Eastern District of Louisiana is recruiting for a permanent Assistant U.S. Attorney  in the Civil Division in New Orleans. The AUSA in the EDLA is due to close at 11:59pm ET on Monday 30th November 2026.</p><table><tbody><tr><td>Organisation</td><td>US Attorney's Office, Eastern District of Louisiana, US Department of Justice</td></tr><tr><td>Post</td><td>Assistant United States Attorney, Civil Division, permanent attorney appointment</td></tr><tr><td>Total posts</td><td>1</td></tr><tr><td>Pay</td><td>$76,748 to $197,100 a year, including 17.06% locality pay</td></tr><tr><td>Application dates</td><td>Closing 11:59pm Eastern Time, Monday 30 November 2026</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>JD degree, active member of the bar in any US jurisdiction, at least 1 year post-JD legal or other relevant experience; US citizenship required</td></tr><tr><td>Selection</td><td>Online questionnaire, resume of no more than 2 pages, veterans' preference documentation if applicable</td></tr></tbody></table><h2>What the Assistant United States Attorney jobs involve</h2><p>The Civil Division attorney will be the attorney for the US, its agencies and its employees in civil litigation. The caseload covers employment cases under Title VII, the Age Discrimination in Employment Act, the Rehabilitation Act and the ADA; Federal Tort Claims Act cases (premises liability, motor vehicle accidents, medical malpractice); challenges to federal programmes, regulations and statutes (including under the APA and Bivens actions against federal officers). The attorney may also bring civil actions on an affirmative basis including environmental enforcement, False Claims Act claims and actions to collect monetary penalties. The office serves 13 parishes in southeastern Louisiana from 650 Poydras Street, Suite 1600, New Orleans. Occasional travel may be some travel required and relocation expenses will not be reimbursed. For those looking at other <a href="https://growentix.cloud/usa">USA jobs</a> there's also a report on <a href="https://growentix.cloud/articles/assistant-united-states-attorney-jobs-maryland-20261123">Assistant U.S. Attorney jobs in Maryland</a> which is a very similar Civil Division post with the same 30 November deadline.</p><h2>Who can apply</h2><p>Applicants must have a JD, be an active member of the bar in any US jurisdiction and have at least 1 year of post-JD legal or other relevant experience (all of which must be satisfied by the closing date). US citizenship is required. The office would prefer an applicant who is capable of handling civil litigation with very little supervision in a high pressure environment and who has strong oral and written communication skills, strong research and courtroom advocacy skills and the ability to work with client agencies. Appointees must live in the district or within 25 miles of it and selection is subject to a drug test and  background investigation. Veterans' preference will be considered a positive factor in the hiring of attorneys and applicants who claim such preference should include that in their cover letter or resume along with the appropriate documentation.</p><h2>What it pays</h2><p>Pay is $76,748 to $197,100 per annum (set administratively and in part on years of professional attorney experience). The range already incorporates the 17.06% locality pay for the New Orleans area so applicants should not add a further uplift. Relocation expenses are not authorised for this post.</p><h2>How to apply</h2><p>Apply online via USAJOBS through USAJOBS on the Assistant U.S. Attorney announcement for the Eastern District of Louisiana (Job ID 27-LAE-13119467-AUSA) by 11:59pm ET on Monday 30th November 2026. Your application package will consist of the online questionnaire, a resume of no more than 2 pages and any veterans' preference forms. The two page resume limit is a hard cap (any resume over 2 pages will be deemed ineligible and will not be considered). For each prior position you have held you will be required to provide the official title, the name of the employer  and their contact details, the start and end dates, the number of hours (full or part time) and the duties you performed. You can check the status of your application  in USAJOBS under Applications. If you are unable to apply online you should contact Carlie Kempf at 504-680-3128 or  carlie.kempf@usdoj.gov prior to the close date to request an alternative method.</p><h2>What the notice does not say</h2><p>Two things are missing from the notice altogether: any interview dates, and any start date. It also lists a single post, with no separate salary figure — the published range already folds in the locality pay.</p><p><strong>Do not hand money to anyone who offers to get you this job.</strong> Applying through USAJOBS costs nothing, and the Department of Justice will not ask you for payment at any stage — not to apply, not to be assessed, and not for an offer.</p><p>Sources: <a href="https://www.justice.gov/legal-careers/job/assistant-united-states-attorney-745">US Department of Justice</a> (the vacancy notice: duties, qualifications, deadline, pay and application process); <a href="https://www.usajobs.gov/GetJob/ViewDetails/893396100">USAJOBS</a> (the official application portal for the announcement).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From $76,748 to $197,100 a year (that's with the 17.06% locality pay) depending on years of professional attorney experience.</p><h3>When do applications close?</h3><p>At 11.59pm ET on Monday 30th November 2026.</p><h3>What qualifications are required?</h3><p>A JD, active bar admission in any US jurisdiction, a minimum of 1 year of post-JD legal or other relevant experience and US citizenship.</p><h3>How long can the resume be?</h3><p>No more than 2 pages. Any CV which is longer resume results in an ineligible and will not be considered.</p>
$$,
ARRAY['https://www.justice.gov/legal-careers/job/assistant-united-states-attorney-745', 'https://www.usajobs.gov/GetJob/ViewDetails/893396100'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- csis-it-analyst-jobs-canada-20261124 (canada; Canada; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'csis-it-analyst-jobs-canada-20261124', 'canada', 'Canada',
'CSIS IT Analyst Jobs: Ottawa, Gatineau, Montreal, Close 30 Nov',
'CSIS IT Analyst Jobs: Ottawa, Gatineau, Montreal, Close 30 Nov',
'CSIS IT Analyst jobs are open in Ottawa, Gatineau and Montreal, paying $87,459 to $106,386 plus a 7% technology modifier. Apply by 30 November 2026.',
'CSIS IT Analyst jobs are open in Ottawa, Gatineau and Montreal, paying $87,459 to $106,386 plus a 7% technology modifier. Apply by 30 November 2026.',
$$<p>The Canadian Security Intelligence Service (CSIS) is recruiting IT Analysts for permanent positions in Ottawa, Gatineau and Montreal. The CSIS IT Analyst positions close 30th November 2026 and the pay is $87,459 to $106,386 per year plus 7% Technology Market Modifier.</p><table><tbody><tr><td>Organisation</td><td>Canadian Security Intelligence Service (CSIS)</td></tr><tr><td>Post</td><td>IT Analyst, permanent (indeterminate)</td></tr><tr><td>Pay</td><td>$87,459 to $106,386 a year, plus a 7% Technology Market Modifier</td></tr><tr><td>Application dates</td><td>Closing 30 November 2026</td></tr><tr><td>Application route</td><td>Online through the CSIS careers site on Canada.ca</td></tr><tr><td>Qualification</td><td>Two-year post-secondary programme in computer science, information technology, software engineering, network or cyber security, or data analysis; degree plus 1 year of relevant experience, or technologist diploma plus 2 years</td></tr><tr><td>Selection</td><td>Competency-based interview; an exam may be used as a screening tool; Enhanced Top Secret security clearance with polygraph and background investigation</td></tr></tbody></table><h2>What the CSIS IT Analyst jobs involve</h2><p>IT Analysts work on the technology that keeps Canadians safe, across eight specialities: IT and cyber security, IT service management and support, IT end user systems, server, storage, backup and cloud infrastructure, network technology and security, IT application support and system administration and communication technology and business intelligence. The posting is for existing vacancies in Ottawa and anticipated vacancies in Gatineau (Montreal is also listed as a location). The bulk of the work is office based and cannot be done from home (although there are a number of roles that will require flexible hours or rotational shifts in a 24/7 environment). Applications will be assessed on a rolling basis so we would encourage applicants to apply as soon as possible rather than wait until the deadline. Those interested in other <a href="https://growentix.cloud/canada">Canada jobs</a> may also want to check out our roundup of <a href="https://growentix.cloud/articles/canada-federal-government-jobs-november-2026-20261121">Canada federal government jobs in November 2026</a> which looks at a number of other federal postings closing in December.</p><h2>Who can apply</h2><p>Only Canadian citizens can apply. You must have completed a two-year programme of study at a recognised post-secondary institution in one of the following areas: computer science, information technology, software engineering, network security, cyber security, data analysis, business analytics or data science (or an acceptable combination of education, training and experience). A higher degree in a related field can be used as experience. On  the experience side you need an undergraduate degree plus 1 year of relevant experience or a technologist diploma or professional technologist equivalency plus 2 years. Recent grads are very much in the mix (the posting is very clear that both upcoming  and recent grads are eligible for many of the  IT Analyst positions). Language requirements will vary  from post to post (some will require English  to be essential, some will require bilingualism BBB/BBB and some will have a second language evaluation). All applicants must be eligible for an Enhanced Top Secret security clearance which will require a security interview, a polygraph and a background investigation (which will include credit and financial checks).</p><h2>What it pays</h2><p>Salary range: $87,459 to $106,386 per year. In addition, the position is eligible for the Technology Market Modifier (7% of  basic annual salary). Some relocation costs may be reimbursed. CSIS is a separate employer and is not subject to the Public Service Employment Act and therefore has its own classification and pay system.</p><h2>How to apply</h2><p>Head to the CSIS careers pages on Canada.ca and get your application in before 30 November 2026. Your cover letter carries unusual weight this time: open it by naming up to three of the eight specialities from the job summary, ranked in order of preference, and say plainly which location you want. Both the letter and your resume have to show, criterion by criterion, how you meet the education and experience requirements — anything unaddressed gets screened out. Keep your application to yourself while it is in progress, CSIS asks: no talking about it with anyone outside a partner or close family, and nothing on social media. If you are a Federal Workforce Adjustment employee, do apply, and make sure your status is stated in the cover letter.</p><h2>What the notice does not say</h2><p>The notice gives absolutely zero indication as to how many IT Analyst posts there are. There are  no interview dates, no exam date, no start date and  it doesn't say which of the eight specialities has the most openings.</p><p><strong>Never pay anyone to apply for this job.</strong> CSIS hiring is free. If an agent asks you to pay to apply for a CSIS posting then they're a scam.</p><p>Sources: <a href="https://www.canada.ca/en/security-intelligence-service/corporate/csis-jobs/available-jobs/it-analyst.html">Canadian Security Intelligence Service</a> (the official posting: closing date, salary, locations, education, experience and security requirements); <a href="https://www.canada.ca/en/security-intelligence-service/corporate/csis-jobs/how-to-submit-a-powerful-application">CSIS</a> (guidance on submitting a strong application).</p><h2>Frequently asked questions</h2><h3>Do I need to be a Canadian citizen?</h3><p>Yes — Canadian citizenship is a hard requirement, and the posting is explicit that nobody else can apply.</p><h3>What does the post pay?</h3><p>The salary runs from $87,459 to $106,386 a year, and on top of that comes the Technology Market Modifier, worth 7% of basic salary.</p><h3>Can recent graduates apply?</h3><p>They can. The posting makes clear that people about to graduate, as well as those who finished recently, are eligible for many of these IT Analyst roles.</p><h3>Is the work remote?</h3><p>For the most part, no — CSIS says the bulk of the work has to happen in the office and cannot be done from home.</p><h3>What security clearance is required?</h3><p>Enhanced Top Secret clearance. Getting it involves a security interview, a polygraph test and a background investigation that covers credit and finances.</p>
$$,
$$<p>The Canadian Security Intelligence Service (CSIS) is recruiting IT Analysts for permanent positions in Ottawa, Gatineau and Montreal. The CSIS IT Analyst positions close 30th November 2026 and the pay is $87,459 to $106,386 per year plus 7% Technology Market Modifier.</p><table><tbody><tr><td>Organisation</td><td>Canadian Security Intelligence Service (CSIS)</td></tr><tr><td>Post</td><td>IT Analyst, permanent (indeterminate)</td></tr><tr><td>Pay</td><td>$87,459 to $106,386 a year, plus a 7% Technology Market Modifier</td></tr><tr><td>Application dates</td><td>Closing 30 November 2026</td></tr><tr><td>Application route</td><td>Online through the CSIS careers site on Canada.ca</td></tr><tr><td>Qualification</td><td>Two-year post-secondary programme in computer science, information technology, software engineering, network or cyber security, or data analysis; degree plus 1 year of relevant experience, or technologist diploma plus 2 years</td></tr><tr><td>Selection</td><td>Competency-based interview; an exam may be used as a screening tool; Enhanced Top Secret security clearance with polygraph and background investigation</td></tr></tbody></table><h2>What the CSIS IT Analyst jobs involve</h2><p>IT Analysts work on the technology that keeps Canadians safe, across eight specialities: IT and cyber security, IT service management and support, IT end user systems, server, storage, backup and cloud infrastructure, network technology and security, IT application support and system administration and communication technology and business intelligence. The posting is for existing vacancies in Ottawa and anticipated vacancies in Gatineau (Montreal is also listed as a location). The bulk of the work is office based and cannot be done from home (although there are a number of roles that will require flexible hours or rotational shifts in a 24/7 environment). Applications will be assessed on a rolling basis so we would encourage applicants to apply as soon as possible rather than wait until the deadline. Those interested in other <a href="https://growentix.cloud/canada">Canada jobs</a> may also want to check out our roundup of <a href="https://growentix.cloud/articles/canada-federal-government-jobs-november-2026-20261121">Canada federal government jobs in November 2026</a> which looks at a number of other federal postings closing in December.</p><h2>Who can apply</h2><p>Only Canadian citizens can apply. You must have completed a two-year programme of study at a recognised post-secondary institution in one of the following areas: computer science, information technology, software engineering, network security, cyber security, data analysis, business analytics or data science (or an acceptable combination of education, training and experience). A higher degree in a related field can be used as experience. On  the experience side you need an undergraduate degree plus 1 year of relevant experience or a technologist diploma or professional technologist equivalency plus 2 years. Recent grads are very much in the mix (the posting is very clear that both upcoming  and recent grads are eligible for many of the  IT Analyst positions). Language requirements will vary  from post to post (some will require English  to be essential, some will require bilingualism BBB/BBB and some will have a second language evaluation). All applicants must be eligible for an Enhanced Top Secret security clearance which will require a security interview, a polygraph and a background investigation (which will include credit and financial checks).</p><h2>What it pays</h2><p>Salary range: $87,459 to $106,386 per year. In addition, the position is eligible for the Technology Market Modifier (7% of  basic annual salary). Some relocation costs may be reimbursed. CSIS is a separate employer and is not subject to the Public Service Employment Act and therefore has its own classification and pay system.</p><h2>How to apply</h2><p>Head to the CSIS careers pages on Canada.ca and get your application in before 30 November 2026. Your cover letter carries unusual weight this time: open it by naming up to three of the eight specialities from the job summary, ranked in order of preference, and say plainly which location you want. Both the letter and your resume have to show, criterion by criterion, how you meet the education and experience requirements — anything unaddressed gets screened out. Keep your application to yourself while it is in progress, CSIS asks: no talking about it with anyone outside a partner or close family, and nothing on social media. If you are a Federal Workforce Adjustment employee, do apply, and make sure your status is stated in the cover letter.</p><h2>What the notice does not say</h2><p>The notice gives absolutely zero indication as to how many IT Analyst posts there are. There are  no interview dates, no exam date, no start date and  it doesn't say which of the eight specialities has the most openings.</p><p><strong>Never pay anyone to apply for this job.</strong> CSIS hiring is free. If an agent asks you to pay to apply for a CSIS posting then they're a scam.</p><p>Sources: <a href="https://www.canada.ca/en/security-intelligence-service/corporate/csis-jobs/available-jobs/it-analyst.html">Canadian Security Intelligence Service</a> (the official posting: closing date, salary, locations, education, experience and security requirements); <a href="https://www.canada.ca/en/security-intelligence-service/corporate/csis-jobs/how-to-submit-a-powerful-application">CSIS</a> (guidance on submitting a strong application).</p><h2>Frequently asked questions</h2><h3>Do I need to be a Canadian citizen?</h3><p>Yes — Canadian citizenship is a hard requirement, and the posting is explicit that nobody else can apply.</p><h3>What does the post pay?</h3><p>The salary runs from $87,459 to $106,386 a year, and on top of that comes the Technology Market Modifier, worth 7% of basic salary.</p><h3>Can recent graduates apply?</h3><p>They can. The posting makes clear that people about to graduate, as well as those who finished recently, are eligible for many of these IT Analyst roles.</p><h3>Is the work remote?</h3><p>For the most part, no — CSIS says the bulk of the work has to happen in the office and cannot be done from home.</p><h3>What security clearance is required?</h3><p>Enhanced Top Secret clearance. Getting it involves a security interview, a polygraph test and a background investigation that covers credit and finances.</p>
$$,
ARRAY['https://www.canada.ca/en/security-intelligence-service/corporate/csis-jobs/available-jobs/it-analyst.html', 'https://www.canada.ca/en/security-intelligence-service/corporate/csis-jobs/how-to-submit-a-powerful-application'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- financial-investigator-jobs-nca-asset-denial-20261124 (uk; UK; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'financial-investigator-jobs-nca-asset-denial-20261124', 'uk', 'UK',
'Financial Investigator Jobs: NCA Asset Denial, Close 25 Nov',
'Financial Investigator Jobs: NCA Asset Denial, Close 25 Nov',
'Financial Investigator jobs are open at the National Crime Agency, paying £42,216 to £46,649 across five UK cities. Apply by 25 November 2026.',
'Financial Investigator jobs are open at the National Crime Agency, paying £42,216 to £46,649 across five UK cities. Apply by 25 November 2026.',
$$<p>The National Crime Agency is hiring Financial Investigators for their Asset Denial teams in five cities across the UK. The Financial Investigator posts at the NCA are in the range of £42,216 to £46,649 per annum and the applications close at 11.55pm on Wednesday 25th November 2026.</p><table><tbody><tr><td>Organisation</td><td>National Crime Agency, Investigations Command</td></tr><tr><td>Post</td><td>Financial Investigator — Asset Denial, grade G5, permanent</td></tr><tr><td>Total posts</td><td>4</td></tr><tr><td>Pay</td><td>£42,216 to £46,649 a year (Spot Rates 1 to 3), plus London weighting of £4,379 or South East weighting of £3,504</td></tr><tr><td>Application dates</td><td>Closing 11:55pm, Wednesday 25 November 2026</td></tr><tr><td>Application route</td><td>Online through Civil Service Jobs</td></tr><tr><td>Qualification</td><td>Accredited Financial Investigator, or evidence of the aptitude and ability to attain accreditation; mandatory training to obtain Financial Intelligence Officer and Financial Investigator accreditation</td></tr><tr><td>Selection</td><td>Application and assessment; vetting and pre-employment checks before appointment; reserve list for 12 months</td></tr></tbody></table><h2>What the Financial Investigator jobs involve</h2><p>Asset Denial teams work to tackle serious and organised crime by denying criminals access to their assets, recovering the proceeds of crime and thereby removing the incentive to engage in such activity. They do this via the powers of the Proceeds of Crime Act 2002 and the Criminal Finances Act 2017. Financial Investigators are central to the process of conducting financial investigations from tasking through to recovery, eroding the profit motive of the most serious and organised crime. The four posts are within the Asset Confiscation Enforcement, the Criminal Asset Denial Team and the Confiscation and Asset Denial teams in Belfast, Birmingham, London, Stevenage and Warrington. The NCA is a 24/7 organisation and working patterns must be in line with business needs. Part time and flexible working is available (minimum of 24 hours per week over 3 days). There is a separate Senior Financial Investigator post for the same teams at £51,269 to £55,526 which closes on the same day. For those looking at other <a href="https://growentix.cloud/uk">UK jobs we</a> can also point them towards our report on the <a href="https://growentix.cloud/articles/hmrc-tax-specialist-programme-500-posts-20261025">HMRC Tax Specialist Programme</a> which is another UK civil service route into tax and financial investigation work.</p><h2>Who can apply</h2><p>The NCA is seeking applicants from a wide variety of professional and academic backgrounds and encourages applications from those who either already have Financial Investigator accreditation or who can clearly demonstrate the ability and potential to achieve it. For the Criminal Asset Denial Team specifically, accredited status is a requirement (or lapsed accreditation within the last 3 years with a view to re-accrediting). All successful applicants will be required to complete the mandatory training, to obtain and maintain their Financial Intelligence Officer and Financial Investigator accreditation and to complete the NCA Officer Development Portfolio Financial Investigator pathway. Applicants will be assessed on their relevant experience in investigations, intelligence, fraud, compliance or financial analysis as evidenced in the application. The post is part of the Great Place to Work for Veterans initiative and feedback is  only provided to those who attend an assessment.</p><h2>What it pays</h2><p>Starting rate is Spot Rate 1 at £42,216 with the potential to move up to Spot Rate 2 (£43,877) or Spot Rate 3 (£46,649) during the course of the appointment. London staff will be entitled to a weighting allowance of £4,379 per annum and South East staff  £3,504. In addition to the salary of £42,216, the NCA contributes £12,229 to the Civil Service Defined Benefit Pension scheme.</p><h2>How to apply</h2><p>Apply online via Civil Service Jobs (reference 489999) by 11.55pm on Wednesday 25th November 2026. The application will be assessed against the essential criteria and the supporting statement should clearly demonstrate each of these with specific examples from your experience of investigations, intelligence, fraud, compliance or financial analysis work. Successful candidates for whom no role is immediately available may be placed on a reserve list for 12 months. Vetting and pre-employment checks will take place prior to appointment and the advert will  be closed once the vacancy has closed.</p><h2>What the notice does not say</h2><p>The notice says absolutely nothing about how the four posts are split across the five locations,  gives no interview dates or start date and provides absolutely no indication as to whether visa sponsorship is available. International applicants are advised to check directly with the NCA prior to applying.</p><p><strong>Applying costs you nothing — and nobody legitimate will ever charge you for it.</strong> Civil Service Jobs is free to use, and the NCA will never ask an applicant to pay for an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.civilservicejobs.service.gov.uk/csr/index.cgi?SID=cGFnZWNsYXNzPVNlYXJjaCZvd25lcnR5cGU9ZmFpciZjb250ZXh0aWQ9MjIxNDI5OTY4JnBhZ2VhY3Rpb249c2VhcmNoY29udGV4dCZvd25lcj01MDcwMDAwJnJlcXNpZz0xNzk1MDM2NTUzLTU1MjhhZTAwMWZiOThmMjg4OTA1M2I0NjgxNTAzNzM3ODA5MjliZjY%3D">Civil Service Jobs</a> — the official listing, which carries the salary, the five locations, the closing date and reference 489999; <a href="https://www.glassdoor.co.uk/job-listing/financial-investigator-asset-denial-the-national-crime-agency-JV_IC3304415_KO0,35_KE36,61.htm?jl=1010322269378">Glassdoor</a> — the NCA advert as published, setting out the duties, the spot rates, the weightings, how many posts there are and how selection works.</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From £42,216 to £46,649 per annum on Spot Rates 1 to 3 plus £4,379 London weighting or £3,504 South East weighting as appropriate.</p><h3>When do applications close?</h3><p>At 11.55pm on Wednesday 25th November 2026.</p><h3>Do I need to be an accredited Financial Investigator already?</h3><p>Not in any way necessarily. The NCA welcomes applicants who can demonstrate the aptitude and ability to achieve accreditation. The Criminal Asset Denial Team would of course require that the applicant either has accreditation or that their accreditation has lapsed in the last 3 years.</p><h3>Where are the posts based?</h3><p>Belfast, Birmingham, London, Stevenage and Warrington. The notice says nothing as to how the four posts are split between them.</p>
$$,
$$<p>The National Crime Agency is hiring Financial Investigators for their Asset Denial teams in five cities across the UK. The Financial Investigator posts at the NCA are in the range of £42,216 to £46,649 per annum and the applications close at 11.55pm on Wednesday 25th November 2026.</p><table><tbody><tr><td>Organisation</td><td>National Crime Agency, Investigations Command</td></tr><tr><td>Post</td><td>Financial Investigator — Asset Denial, grade G5, permanent</td></tr><tr><td>Total posts</td><td>4</td></tr><tr><td>Pay</td><td>£42,216 to £46,649 a year (Spot Rates 1 to 3), plus London weighting of £4,379 or South East weighting of £3,504</td></tr><tr><td>Application dates</td><td>Closing 11:55pm, Wednesday 25 November 2026</td></tr><tr><td>Application route</td><td>Online through Civil Service Jobs</td></tr><tr><td>Qualification</td><td>Accredited Financial Investigator, or evidence of the aptitude and ability to attain accreditation; mandatory training to obtain Financial Intelligence Officer and Financial Investigator accreditation</td></tr><tr><td>Selection</td><td>Application and assessment; vetting and pre-employment checks before appointment; reserve list for 12 months</td></tr></tbody></table><h2>What the Financial Investigator jobs involve</h2><p>Asset Denial teams work to tackle serious and organised crime by denying criminals access to their assets, recovering the proceeds of crime and thereby removing the incentive to engage in such activity. They do this via the powers of the Proceeds of Crime Act 2002 and the Criminal Finances Act 2017. Financial Investigators are central to the process of conducting financial investigations from tasking through to recovery, eroding the profit motive of the most serious and organised crime. The four posts are within the Asset Confiscation Enforcement, the Criminal Asset Denial Team and the Confiscation and Asset Denial teams in Belfast, Birmingham, London, Stevenage and Warrington. The NCA is a 24/7 organisation and working patterns must be in line with business needs. Part time and flexible working is available (minimum of 24 hours per week over 3 days). There is a separate Senior Financial Investigator post for the same teams at £51,269 to £55,526 which closes on the same day. For those looking at other <a href="https://growentix.cloud/uk">UK jobs we</a> can also point them towards our report on the <a href="https://growentix.cloud/articles/hmrc-tax-specialist-programme-500-posts-20261025">HMRC Tax Specialist Programme</a> which is another UK civil service route into tax and financial investigation work.</p><h2>Who can apply</h2><p>The NCA is seeking applicants from a wide variety of professional and academic backgrounds and encourages applications from those who either already have Financial Investigator accreditation or who can clearly demonstrate the ability and potential to achieve it. For the Criminal Asset Denial Team specifically, accredited status is a requirement (or lapsed accreditation within the last 3 years with a view to re-accrediting). All successful applicants will be required to complete the mandatory training, to obtain and maintain their Financial Intelligence Officer and Financial Investigator accreditation and to complete the NCA Officer Development Portfolio Financial Investigator pathway. Applicants will be assessed on their relevant experience in investigations, intelligence, fraud, compliance or financial analysis as evidenced in the application. The post is part of the Great Place to Work for Veterans initiative and feedback is  only provided to those who attend an assessment.</p><h2>What it pays</h2><p>Starting rate is Spot Rate 1 at £42,216 with the potential to move up to Spot Rate 2 (£43,877) or Spot Rate 3 (£46,649) during the course of the appointment. London staff will be entitled to a weighting allowance of £4,379 per annum and South East staff  £3,504. In addition to the salary of £42,216, the NCA contributes £12,229 to the Civil Service Defined Benefit Pension scheme.</p><h2>How to apply</h2><p>Apply online via Civil Service Jobs (reference 489999) by 11.55pm on Wednesday 25th November 2026. The application will be assessed against the essential criteria and the supporting statement should clearly demonstrate each of these with specific examples from your experience of investigations, intelligence, fraud, compliance or financial analysis work. Successful candidates for whom no role is immediately available may be placed on a reserve list for 12 months. Vetting and pre-employment checks will take place prior to appointment and the advert will  be closed once the vacancy has closed.</p><h2>What the notice does not say</h2><p>The notice says absolutely nothing about how the four posts are split across the five locations,  gives no interview dates or start date and provides absolutely no indication as to whether visa sponsorship is available. International applicants are advised to check directly with the NCA prior to applying.</p><p><strong>Applying costs you nothing — and nobody legitimate will ever charge you for it.</strong> Civil Service Jobs is free to use, and the NCA will never ask an applicant to pay for an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.civilservicejobs.service.gov.uk/csr/index.cgi?SID=cGFnZWNsYXNzPVNlYXJjaCZvd25lcnR5cGU9ZmFpciZjb250ZXh0aWQ9MjIxNDI5OTY4JnBhZ2VhY3Rpb249c2VhcmNoY29udGV4dCZvd25lcj01MDcwMDAwJnJlcXNpZz0xNzk1MDM2NTUzLTU1MjhhZTAwMWZiOThmMjg4OTA1M2I0NjgxNTAzNzM3ODA5MjliZjY%3D">Civil Service Jobs</a> — the official listing, which carries the salary, the five locations, the closing date and reference 489999; <a href="https://www.glassdoor.co.uk/job-listing/financial-investigator-asset-denial-the-national-crime-agency-JV_IC3304415_KO0,35_KE36,61.htm?jl=1010322269378">Glassdoor</a> — the NCA advert as published, setting out the duties, the spot rates, the weightings, how many posts there are and how selection works.</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From £42,216 to £46,649 per annum on Spot Rates 1 to 3 plus £4,379 London weighting or £3,504 South East weighting as appropriate.</p><h3>When do applications close?</h3><p>At 11.55pm on Wednesday 25th November 2026.</p><h3>Do I need to be an accredited Financial Investigator already?</h3><p>Not in any way necessarily. The NCA welcomes applicants who can demonstrate the aptitude and ability to achieve accreditation. The Criminal Asset Denial Team would of course require that the applicant either has accreditation or that their accreditation has lapsed in the last 3 years.</p><h3>Where are the posts based?</h3><p>Belfast, Birmingham, London, Stevenage and Warrington. The notice says nothing as to how the four posts are split between them.</p>
$$,
ARRAY['https://www.civilservicejobs.service.gov.uk/csr/index.cgi?SID=cGFnZWNsYXNzPVNlYXJjaCZvd25lcnR5cGU9ZmFpciZjb250ZXh0aWQ9MjIxNDI5OTY4JnBhZ2VhY3Rpb249c2VhcmNoY29udGV4dCZvd25lcj01MDcwMDAwJnJlcXNpZz0xNzk1MDM2NTUzLTU1MjhhZTAwMWZiOThmMjg4OTA1M2I0NjgxNTAzNzM3ODA5MjliZjY%3D', 'https://www.glassdoor.co.uk/job-listing/financial-investigator-asset-denial-the-national-crime-agency-JV_IC3304415_KO0,35_KE36,61.htm?jl=1010322269378'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- it-project-manager-jobs-in-germany-disa-vaihingen-20261124 (europe; Germany; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'it-project-manager-jobs-in-germany-disa-vaihingen-20261124', 'europe', 'Germany',
'IT Project Manager Jobs in Germany: DISA Vaihingen, Close 26 Nov',
'IT Project Manager Jobs in Germany: DISA Vaihingen, Close 26 Nov',
'IT Project Manager jobs in Germany are open at the Defense Information Systems Agency in Vaihingen, paying $84,109 to $109,344. Apply by 26 November 2026.',
'IT Project Manager jobs in Germany are open at the Defense Information Systems Agency in Vaihingen, paying $84,109 to $109,344. Apply by 26 November 2026.',
$$<p>The Defense Information Systems Agency is recruiting an IT Project Manager for its Europe organisation in Vaihingen, Germany. This grade of IT Project Manager  in Germany pays between $84,109 and $109,344 per year and the applications close on 26th November 2026.</p><table><tbody><tr><td>Organisation</td><td>Defense Information Systems Agency (DISA-OC/EUROPE), US Department of Defense</td></tr><tr><td>Post</td><td>IT Project Manager (PLCYPLN), GG-12, Cyber Excepted Service, Senior Work Level</td></tr><tr><td>Pay</td><td>$84,109 to $109,344 a year</td></tr><tr><td>Application dates</td><td>Closing 26 November 2026</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>One year of specialised experience at GG-12 level in project management of telecommunications work, protection of critical cyber defence infrastructure, or stakeholder coordination, plus IT experience across four competencies</td></tr><tr><td>Selection</td><td>Application package review; Top Secret/SCI security clearance; drug testing; suitability and background investigation</td></tr></tbody></table><h2>What the IT Project Manager jobs in Germany involve</h2><p>The IT Project Manager is responsible for managing and delivering the telecoms and network projects for DISA Europe, applying project management across the project lifecycle (initiation, planning, design and delivery) and are the primary point of contact for all stakeholders, internal and external customers and external agencies on assigned projects. The work directly supports the fundamental mission of US Cyber Command which is to identify, prioritise and co-ordinate the protection of the critical cyber defence infrastructure and resources. The role is based in Vaihingen, Germany. It is a mission essential, with alternative duty schedules which may include  shifts in excess of 12 hours, nights, weekends, holidays, overtime without notice and recall for urgent requirements. It is a Direct Hire Authority (DHA) solicitation and is being recruited under 10 USC 1599f into the Cyber Excepted Service (which does not confer eligibility for conversion to the Competitive Service). Those looking at other <a href="https://growentix.cloud/usa">USA jobs</a> overseas may also be interested in our report on <a href="https://growentix.cloud/articles/va-registered-nurse-jobs-albuquerque-20261123">VA Registered Nurse jobs in Albuquerque</a>(another US federal post with a deadline in December).</p><h2>Who can apply</h2><p>Applicants must be US citizens. The position is open to US citizens and veterans. Military spouses will be considered as part of the applicant pool. To qualify at GG-12 the resume must demonstrate at least one year of experience which demonstrates the competencies required for successful performance in the role, including one of: applying project management concepts, principles, methods and practices to the initiation, planning, design and management of telecommunications projects; the identification, prioritisation and coordination of the protection of critical cyber defence infrastructure and resources; or acting as the primary point of contact for stakeholders, customers and agencies. That experience must be supplemented by IT experience which demonstrates attention to detail, customer service, oral communication and problem solving. All of the above must be demonstrable within 30 days of the closing date. The selectee must be able to obtain and maintain a Top Secret/SCI clearance, be able to meet the requirements for employment in foreign areas and be able to meet the Exceptional Family Member Program requirements. This is a drug testing position.</p><h2>What it pays</h2><p>Advertised salary is $84,109 to $109,344 per year at GG-12. The ad contains the standard US Federal benefits package for the employee and family. For those of us applying from outside of Germany, there is no mention of visa sponsorship in the posting says nothing about visa sponsorship: as a US Federal post in Germany and is filled under the Status of Forces Agreement, and US citizens overseas who are under ordinarily resident status are not eligible for appointment under SOFA.</p><h2>How to apply</h2><p>Apply online via USAJOBS for the IT Project Manager (PLCYPLN) announcement for DISA-OC/EUROPE prior to the 26th November 2026 closing date. Your resume must clearly state your relevant experience for each job listed (job title, duties, start and end dates and full time / part time). You must demonstrate how you meet the qualifying experience as part of your resume. Direct deposit of pay is a requirement. Once the announcement has closed the application package will be reviewed to determine if you meet the qualifying experience requirements.</p><h2>What the notice does not say</h2><p>The notice says zip about the number of IT Project Manager posts, gives no interview dates or start date. It doesn't state whether it's a hybrid or fully on-site (apart from at Vaihingen) and provides no separate closing date prior to the 26th November.</p><p><strong>Never pay anyone to apply for this job.</strong> USAJOBS applications are free and DISA will never ask you to pay anything in order to get an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.usajobs.gov/job/892944600">USAJOBS</a> (the official announcement: duties, qualifications, clearance and appointment terms); <a href="https://devglobaljobs.com/jobs/detail/178000751">Dev Global Jobs</a> (the announcement as published, with the pay range and closing date, apply link live checked 20 November 2026).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>The advertised range is $84,109 to $109,344 a year, at GG-12.</p><h3>When do applications close?</h3><p>The announcement closes on 26 November 2026.</p><h3>Do I need to be a US citizen?</h3><p>Yes — the announcement is open to US citizens only, and anyone appointed must hold, or be able to obtain, a Top Secret/SCI clearance.</p><h3>Is this a normal civil service post?</h3><p>No. It is filled into the Cyber Excepted Service under 10 USC 1599f, and that route gives no eligibility to convert into the Competitive Service.</p>
$$,
$$<p>The Defense Information Systems Agency is recruiting an IT Project Manager for its Europe organisation in Vaihingen, Germany. This grade of IT Project Manager  in Germany pays between $84,109 and $109,344 per year and the applications close on 26th November 2026.</p><table><tbody><tr><td>Organisation</td><td>Defense Information Systems Agency (DISA-OC/EUROPE), US Department of Defense</td></tr><tr><td>Post</td><td>IT Project Manager (PLCYPLN), GG-12, Cyber Excepted Service, Senior Work Level</td></tr><tr><td>Pay</td><td>$84,109 to $109,344 a year</td></tr><tr><td>Application dates</td><td>Closing 26 November 2026</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>One year of specialised experience at GG-12 level in project management of telecommunications work, protection of critical cyber defence infrastructure, or stakeholder coordination, plus IT experience across four competencies</td></tr><tr><td>Selection</td><td>Application package review; Top Secret/SCI security clearance; drug testing; suitability and background investigation</td></tr></tbody></table><h2>What the IT Project Manager jobs in Germany involve</h2><p>The IT Project Manager is responsible for managing and delivering the telecoms and network projects for DISA Europe, applying project management across the project lifecycle (initiation, planning, design and delivery) and are the primary point of contact for all stakeholders, internal and external customers and external agencies on assigned projects. The work directly supports the fundamental mission of US Cyber Command which is to identify, prioritise and co-ordinate the protection of the critical cyber defence infrastructure and resources. The role is based in Vaihingen, Germany. It is a mission essential, with alternative duty schedules which may include  shifts in excess of 12 hours, nights, weekends, holidays, overtime without notice and recall for urgent requirements. It is a Direct Hire Authority (DHA) solicitation and is being recruited under 10 USC 1599f into the Cyber Excepted Service (which does not confer eligibility for conversion to the Competitive Service). Those looking at other <a href="https://growentix.cloud/usa">USA jobs</a> overseas may also be interested in our report on <a href="https://growentix.cloud/articles/va-registered-nurse-jobs-albuquerque-20261123">VA Registered Nurse jobs in Albuquerque</a>(another US federal post with a deadline in December).</p><h2>Who can apply</h2><p>Applicants must be US citizens. The position is open to US citizens and veterans. Military spouses will be considered as part of the applicant pool. To qualify at GG-12 the resume must demonstrate at least one year of experience which demonstrates the competencies required for successful performance in the role, including one of: applying project management concepts, principles, methods and practices to the initiation, planning, design and management of telecommunications projects; the identification, prioritisation and coordination of the protection of critical cyber defence infrastructure and resources; or acting as the primary point of contact for stakeholders, customers and agencies. That experience must be supplemented by IT experience which demonstrates attention to detail, customer service, oral communication and problem solving. All of the above must be demonstrable within 30 days of the closing date. The selectee must be able to obtain and maintain a Top Secret/SCI clearance, be able to meet the requirements for employment in foreign areas and be able to meet the Exceptional Family Member Program requirements. This is a drug testing position.</p><h2>What it pays</h2><p>Advertised salary is $84,109 to $109,344 per year at GG-12. The ad contains the standard US Federal benefits package for the employee and family. For those of us applying from outside of Germany, there is no mention of visa sponsorship in the posting says nothing about visa sponsorship: as a US Federal post in Germany and is filled under the Status of Forces Agreement, and US citizens overseas who are under ordinarily resident status are not eligible for appointment under SOFA.</p><h2>How to apply</h2><p>Apply online via USAJOBS for the IT Project Manager (PLCYPLN) announcement for DISA-OC/EUROPE prior to the 26th November 2026 closing date. Your resume must clearly state your relevant experience for each job listed (job title, duties, start and end dates and full time / part time). You must demonstrate how you meet the qualifying experience as part of your resume. Direct deposit of pay is a requirement. Once the announcement has closed the application package will be reviewed to determine if you meet the qualifying experience requirements.</p><h2>What the notice does not say</h2><p>The notice says zip about the number of IT Project Manager posts, gives no interview dates or start date. It doesn't state whether it's a hybrid or fully on-site (apart from at Vaihingen) and provides no separate closing date prior to the 26th November.</p><p><strong>Never pay anyone to apply for this job.</strong> USAJOBS applications are free and DISA will never ask you to pay anything in order to get an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.usajobs.gov/job/892944600">USAJOBS</a> (the official announcement: duties, qualifications, clearance and appointment terms); <a href="https://devglobaljobs.com/jobs/detail/178000751">Dev Global Jobs</a> (the announcement as published, with the pay range and closing date, apply link live checked 20 November 2026).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>The advertised range is $84,109 to $109,344 a year, at GG-12.</p><h3>When do applications close?</h3><p>The announcement closes on 26 November 2026.</p><h3>Do I need to be a US citizen?</h3><p>Yes — the announcement is open to US citizens only, and anyone appointed must hold, or be able to obtain, a Top Secret/SCI clearance.</p><h3>Is this a normal civil service post?</h3><p>No. It is filled into the Cyber Excepted Service under 10 USC 1599f, and that route gives no eligibility to convert into the Competitive Service.</p>
$$,
ARRAY['https://www.usajobs.gov/job/892944600', 'https://devglobaljobs.com/jobs/detail/178000751'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- karnali-lok-sewa-vacancy-2083-level-4-posts-20261124 (nepal; Nepal; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'karnali-lok-sewa-vacancy-2083-level-4-posts-20261124', 'nepal', 'Nepal',
'Karnali Lok Sewa Vacancy 2083: 153 Level 4 Posts, Apply by 30 Nov',
'Karnali Lok Sewa Vacancy 2083: 153 Level 4 Posts, Apply by 30 Nov',
'Karnali Lok Sewa vacancy 2083 offers 153 Level 4 posts in Karnali Province, with the last date 30 November 2026. Fee Rs 400 per advertisement.',
'Karnali Lok Sewa vacancy 2083 offers 153 Level 4 posts in Karnali Province, with the last date 30 November 2026. Fee Rs 400 per advertisement.',
$$<p>The Province Public Service Commission, Karnali Province has launched applications for 153 Level 4 posts in the local service with the last date of application being 30th November 2026. This Karnali Lok Sewa vacancy 2083 is for both non-technical and technical services and applications are to be submitted online only.</p><table><tbody><tr><td>Organisation</td><td>Province Public Service Commission of Karnali Province, based in Birendranagar, Surkhet</td></tr><tr><td>Post</td><td>Local Service posts at 4th Level (Kharidar level), across non-technical and technical services</td></tr><tr><td>Total posts</td><td>153 posts by open competition, and 5 more by promotion</td></tr><tr><td>Application dates</td><td>Applications opened 10 November 2026. Last date at the normal fee is 2083 Mangsir 14 (30 November 2026); with a double fee, 2083 Mangsir 21 (7 December 2026)</td></tr><tr><td>Application fee</td><td>Rs 400 for each advertisement, with Rs 200 more for every additional inclusive group</td></tr><tr><td>Age limit</td><td>Aged 18 to 35 on 2083 Mangsir 14 — up to 40 for women and persons with disabilities, and up to 45 for health posts</td></tr><tr><td>Application route</td><td>Online only, through the commission portal at ppsconline.karnali.gov.np</td></tr><tr><td>Qualification</td><td>Depends on the service: Administration Assistant, Assistant Sub-Engineer, ANM, Veterinary, AHW, Agriculture/Junior Technical Assistant, Amin, and Water Supply and Sanitation Technician — education certificates and council registration where the post requires them</td></tr><tr><td>Exam date</td><td>Written examination date still to be announced</td></tr></tbody></table><h2>What the Karnali Lok Sewa vacancy 2083 involves</h2><p>Notice No. 30/2083-84 dated 2083 Kartik 24 (10th November 2026) is for 153 competition posts in the following five services: Local Administration, Accounts, Engineering, Agriculture and Health. The details are as follows: Administration Assistant 52, Assistant Sub-Engineer 44, ANM 17, Veterinary 14, AHW 13, Agriculture/Junior Technical Assistant 10, Amin 2 and Water Supply and Sanitation Technician 1. Of the 153 competition posts, 51 are non-technical and 102 are technical.  5 of the posts are being advertised by promotion. The exam centre is Birendranagar, Surkhet. One of the reports has a preliminary  date of 2083/09/26 for the Administration Assistant open competition, though the commission has not yet announced a confirmed date for the written examination. Candidates are therefore advised to check the commission website for the confirmed date. Those keeping an eye on jobs in <a href="https://growentix.cloud/nepal">Nepal jobs</a> can also be interested in our report on the <a href="https://growentix.cloud/articles/lok-sewa-section-officer-509-posts-20261116">Lok Sewa Section Officer posts</a> being advertised by the federal level commission (509 posts).</p><h2>Who can apply</h2><p>Applicants must be between the ages of 18 and 35 on 2083 Mangsir 14 (30th November 2026). Women and persons with disabilities may apply up to the age of 40 and health posts will accept applications up to the age of 45. The required education and training will be relevant to the post: Assistant Sub-Engineer and Amin posts will require the relevant engineering or survey qualification; ANM and AHW posts will require the relevant health training and council registration;  Administration Assistant posts will require the relevant school leaving qualification. Applicants in the inclusive groups will be required to upload  proof of inclusion with their application along with a copy of their citizenship (front and back), education certificates and any relevant council registration or training certificates.</p><h2>What it pays</h2><p>The  notice makes no mention of any pay  for these Level 4 posts so there's no pay figure in this article. Candidates should check the official notice on the commission's website for the pay scale prior to applying and should not rely on any pay figures that might be quoted on unauthorised sites.</p><h2>How to apply</h2><p>Apply online only via the commission's portal at ppsconline.karnali.gov.np. The normal fee application must be submitted by 2083 Mangsir 14 (30th November 2026) and the double fee application by 2083 Mangsir 21 (7th December 2026). The fee is Rs 400 per advertisement plus Rs 200 per additional inclusive group applied for. Upload citizenship (both sides), your education certificates, your council registration/training certificates where applicable and proof of inclusion  if you are applying under an inclusive group. Applications are submitted advertisement by advertisement, so candidates applying for more than one post should complete a separate application for each.</p><h2>What the notice does not say</h2><p>The notices contain no pay scales for the posts. The date of the written examination will be announced and the preliminary exam date of 2083/09/26 for the Administration Assistant post is mentioned in only one of the reports and is not confirmed by the Commission. There is no separate closing date of 30th November in the reports and it is not stated whether the posts are open to candidates from outside the Karnali Province.</p><p><strong>No agent can get you this post, and no one should be paid for one.</strong> Lok Sewa applications go through the Commission's own portal alone, and the only money involved is the official fee.</p><p>Sources: <a href="https://ppsc.karnali.gov.np">Province Public Service Commission, Karnali</a> — the commission's own website; <a href="https://ppsconline.karnali.gov.np">PPSC Online Karnali</a> — the official portal where applications are submitted; <a href="https://loksewapathsala.com/vacancy/karnali-lok-sewa-level-4-vacancy-2083/">Lok Sewa Pathsala</a> — reporting the notice, with the post breakdown, the dates, the fee and the age limits; <a href="https://www.educatenepal.com/vacancies/detail/vacancy-notice-from-pradesh-lok-sewa-aayog-karnali-pradesh">Educate Nepal</a> — reporting the same notice, with matching notice number, totals and dates; <a href="https://www.collegenp.com/vacancy/karnali-pradesh-lok-sewa-aayog-fourth-level-vacancy-2083">College NP</a> — reporting the same notice, with the same figures throughout.</p><h2>Frequently asked questions</h2><h3>How many posts are there?</h3><p>153 competition posts and 5 promotion posts for a total of 158 advertised posts.</p><h3>What's the last date to apply?</h3><p>2083 Mangsir 14 (30th November 2026) at the normal rate, or 2083 Mangsir 21 (7th December 2026) at double fee.</p><h3>What is the application fee?</h3><p>Rs 400 per advertisement, plus Rs 200 per additional inclusive group.</p><h3>What's the age limit?</h3><p>18 to 35 on 2083 Mangsir 14 (women and persons with disabilities  up to 40, health posts up to 45.</p><h3>Where is the examination held?</h3><p>At Birendranagar, Surkhet. Date of  written examination   to be announced.</p>
$$,
$$<p>The Province Public Service Commission, Karnali Province has launched applications for 153 Level 4 posts in the local service with the last date of application being 30th November 2026. This Karnali Lok Sewa vacancy 2083 is for both non-technical and technical services and applications are to be submitted online only.</p><table><tbody><tr><td>Organisation</td><td>Province Public Service Commission of Karnali Province, based in Birendranagar, Surkhet</td></tr><tr><td>Post</td><td>Local Service posts at 4th Level (Kharidar level), across non-technical and technical services</td></tr><tr><td>Total posts</td><td>153 posts by open competition, and 5 more by promotion</td></tr><tr><td>Application dates</td><td>Applications opened 10 November 2026. Last date at the normal fee is 2083 Mangsir 14 (30 November 2026); with a double fee, 2083 Mangsir 21 (7 December 2026)</td></tr><tr><td>Application fee</td><td>Rs 400 for each advertisement, with Rs 200 more for every additional inclusive group</td></tr><tr><td>Age limit</td><td>Aged 18 to 35 on 2083 Mangsir 14 — up to 40 for women and persons with disabilities, and up to 45 for health posts</td></tr><tr><td>Application route</td><td>Online only, through the commission portal at ppsconline.karnali.gov.np</td></tr><tr><td>Qualification</td><td>Depends on the service: Administration Assistant, Assistant Sub-Engineer, ANM, Veterinary, AHW, Agriculture/Junior Technical Assistant, Amin, and Water Supply and Sanitation Technician — education certificates and council registration where the post requires them</td></tr><tr><td>Exam date</td><td>Written examination date still to be announced</td></tr></tbody></table><h2>What the Karnali Lok Sewa vacancy 2083 involves</h2><p>Notice No. 30/2083-84 dated 2083 Kartik 24 (10th November 2026) is for 153 competition posts in the following five services: Local Administration, Accounts, Engineering, Agriculture and Health. The details are as follows: Administration Assistant 52, Assistant Sub-Engineer 44, ANM 17, Veterinary 14, AHW 13, Agriculture/Junior Technical Assistant 10, Amin 2 and Water Supply and Sanitation Technician 1. Of the 153 competition posts, 51 are non-technical and 102 are technical.  5 of the posts are being advertised by promotion. The exam centre is Birendranagar, Surkhet. One of the reports has a preliminary  date of 2083/09/26 for the Administration Assistant open competition, though the commission has not yet announced a confirmed date for the written examination. Candidates are therefore advised to check the commission website for the confirmed date. Those keeping an eye on jobs in <a href="https://growentix.cloud/nepal">Nepal jobs</a> can also be interested in our report on the <a href="https://growentix.cloud/articles/lok-sewa-section-officer-509-posts-20261116">Lok Sewa Section Officer posts</a> being advertised by the federal level commission (509 posts).</p><h2>Who can apply</h2><p>Applicants must be between the ages of 18 and 35 on 2083 Mangsir 14 (30th November 2026). Women and persons with disabilities may apply up to the age of 40 and health posts will accept applications up to the age of 45. The required education and training will be relevant to the post: Assistant Sub-Engineer and Amin posts will require the relevant engineering or survey qualification; ANM and AHW posts will require the relevant health training and council registration;  Administration Assistant posts will require the relevant school leaving qualification. Applicants in the inclusive groups will be required to upload  proof of inclusion with their application along with a copy of their citizenship (front and back), education certificates and any relevant council registration or training certificates.</p><h2>What it pays</h2><p>The  notice makes no mention of any pay  for these Level 4 posts so there's no pay figure in this article. Candidates should check the official notice on the commission's website for the pay scale prior to applying and should not rely on any pay figures that might be quoted on unauthorised sites.</p><h2>How to apply</h2><p>Apply online only via the commission's portal at ppsconline.karnali.gov.np. The normal fee application must be submitted by 2083 Mangsir 14 (30th November 2026) and the double fee application by 2083 Mangsir 21 (7th December 2026). The fee is Rs 400 per advertisement plus Rs 200 per additional inclusive group applied for. Upload citizenship (both sides), your education certificates, your council registration/training certificates where applicable and proof of inclusion  if you are applying under an inclusive group. Applications are submitted advertisement by advertisement, so candidates applying for more than one post should complete a separate application for each.</p><h2>What the notice does not say</h2><p>The notices contain no pay scales for the posts. The date of the written examination will be announced and the preliminary exam date of 2083/09/26 for the Administration Assistant post is mentioned in only one of the reports and is not confirmed by the Commission. There is no separate closing date of 30th November in the reports and it is not stated whether the posts are open to candidates from outside the Karnali Province.</p><p><strong>No agent can get you this post, and no one should be paid for one.</strong> Lok Sewa applications go through the Commission's own portal alone, and the only money involved is the official fee.</p><p>Sources: <a href="https://ppsc.karnali.gov.np">Province Public Service Commission, Karnali</a> — the commission's own website; <a href="https://ppsconline.karnali.gov.np">PPSC Online Karnali</a> — the official portal where applications are submitted; <a href="https://loksewapathsala.com/vacancy/karnali-lok-sewa-level-4-vacancy-2083/">Lok Sewa Pathsala</a> — reporting the notice, with the post breakdown, the dates, the fee and the age limits; <a href="https://www.educatenepal.com/vacancies/detail/vacancy-notice-from-pradesh-lok-sewa-aayog-karnali-pradesh">Educate Nepal</a> — reporting the same notice, with matching notice number, totals and dates; <a href="https://www.collegenp.com/vacancy/karnali-pradesh-lok-sewa-aayog-fourth-level-vacancy-2083">College NP</a> — reporting the same notice, with the same figures throughout.</p><h2>Frequently asked questions</h2><h3>How many posts are there?</h3><p>153 competition posts and 5 promotion posts for a total of 158 advertised posts.</p><h3>What's the last date to apply?</h3><p>2083 Mangsir 14 (30th November 2026) at the normal rate, or 2083 Mangsir 21 (7th December 2026) at double fee.</p><h3>What is the application fee?</h3><p>Rs 400 per advertisement, plus Rs 200 per additional inclusive group.</p><h3>What's the age limit?</h3><p>18 to 35 on 2083 Mangsir 14 (women and persons with disabilities  up to 40, health posts up to 45.</p><h3>Where is the examination held?</h3><p>At Birendranagar, Surkhet. Date of  written examination   to be announced.</p>
$$,
ARRAY['https://ppsc.karnali.gov.np', 'https://ppsconline.karnali.gov.np', 'https://loksewapathsala.com/vacancy/karnali-lok-sewa-level-4-vacancy-2083/', 'https://www.educatenepal.com/vacancies/detail/vacancy-notice-from-pradesh-lok-sewa-aayog-karnali-pradesh', 'https://www.collegenp.com/vacancy/karnali-pradesh-lok-sewa-aayog-fourth-level-vacancy-2083'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- ministry-of-manpower-jobs-grants-governance-singapore-20261124 (asia; Singapore; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'ministry-of-manpower-jobs-grants-governance-singapore-20261124', 'asia', 'Singapore',
'Ministry of Manpower Jobs: Grants Governance, Close 30 Nov',
'Ministry of Manpower Jobs: Grants Governance, Close 30 Nov',
'Ministry of Manpower jobs are open in Singapore for grants governance officers, with fresh graduates welcome. Apply by 30 November 2026.',
'Ministry of Manpower jobs are open in Singapore for grants governance officers, with fresh graduates welcome. Apply by 30 November 2026.',
$$<p>Singapore's Ministry of Manpower has opened grants governance officer posts at Assistant Manager, Manager and Senior Manager level. The team's applications close on 30 November 2026, and the ministry is clear that candidates with no work experience are welcome to apply.</p><table><tbody><tr><td>Organisation</td><td>Ministry of Manpower (MOM), Singapore</td></tr><tr><td>Post</td><td>Assistant Manager / Manager / Senior Manager, Grants Governance, Corporate Management Department, permanent/contract</td></tr><tr><td>Application dates</td><td>Closing 30 November 2026</td></tr><tr><td>Application route</td><td>Online through Careers@Gov</td></tr><tr><td>Qualification</td><td>Knowledge in accounting, auditing, business administration, finance, data analytics or statistics, with 3 to 5 years of relevant experience preferred; candidates with no work experience welcome to apply</td></tr><tr><td>Selection</td><td>Shortlisting; applicants not moving forward are notified within 4 weeks of the closing date</td></tr></tbody></table><h2>What the Ministry of Manpower jobs involve</h2><p>The Officer will be responsible for the development and implementation of governance policies, procedures and frameworks to ensure  effective management and oversight of grants within the Ministry of Manpower (MOM). This will involve the development and maintenance of guidelines on grant application, disbursement, monitoring and evaluation; working with stakeholders to administer grants and track their performance and impact; and the development of training programmes in grants management and governance for MOM officers. The role will also be to continuously improve grants governance processes, using technology and data analytics where appropriate. MOM's mission is to empower people and to build a vibrant, inclusive workforce that will help drive Singapore's growth and prosperity, working in partnership with the tripartite partners on manpower policy, industrial relations, workplace safety and foreign workforce regulation. There is also a second, more senior position in the same team (Senior Manager / Principal Manager, Grants Governance) which also closes on 30 November 2026. For those looking at work in Singapore we also have a guide to <a href="https://growentix.cloud/articles/singapore-work-permit-jobs-nts-occupations-20261123">Singapore work permit jobs in NTS occupations</a> and our wider <a href="https://growentix.cloud/asia">Asia jobs</a> listings.</p><h2>Who can apply</h2><p>Knowledge in accounting, auditing, business administration, finance, data analytics or statistics is required, with 3 to 5 years of relevant experience preferred. Candidates with no work experience are welcome to apply. Experience in government agencies or public organisations, with applied knowledge of public sector financing and governance, is highly regarded. The posting asks for critical thinking, analytical and decision-making skills; strong interpersonal skills to engage stakeholders at all levels; strong written, presentation, and digital skills; and the ability to work independently and in a team. Persons with disabilities are welcome to apply.</p><h2>What it pays</h2><p>The posting doesn't state a salary figure. Singapore Public Service postings on Careers@Gov the pay is left to be determined by grade and experience and that's the case here so there's no salary figure to be found on an unofficial jobs board. The appointment is either permanent or contract and the posting gives no indication as to which it is for this intake.</p><h2>How to apply</h2><p>Apply online via Careers@Gov (the Singapore Public Service jobs portal) by the 30 November 2026 closing date. If you don't hear from the Ministry within 4 weeks of the closing date then the posting asks you to understand that the application is likely not moving forward. The ministry encourages applicants to explore other posts within MOM and indeed the wider Public Service should you not be shortlisted.</p><h2>What the notice does not say</h2><p>The notice says absolutely nothing about salary, how many posts there are, whether it's a permanent post or a contract for this intake. There are no interview dates and no start date. It gives absolutely no indication as to whether it's open to non-Singaporeans.</p><p><strong>Never pay anyone to apply for this job.</strong> Careers@Gov applications are free and the Ministry of Manpower will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://jobs.careers.gov.sg/jobs/hrp/17688931/005056a3-53e2-1fd1-b687-27dd20a3b40d">Careers@Gov</a> (the official posting: duties, requirements, closing date and application process); <a href="https://jobs.careers.gov.sg/jobs/hrp/18205367/005056a3-d347-1fe1-b6b7-9bda50f562c5">Careers@Gov</a> (the senior posting for the same grants governance team, also closing 30 November 2026).</p><h2>Frequently asked questions</h2><h3>When do applications close?</h3><p>Applications close on 30 November 2026.</p><h3>Can I apply with no work experience?</h3><p>Yes — the posting welcomes candidates with no work experience, even though it says 3 to 5 years of relevant experience is preferred.</p><h3>What does the post pay?</h3><p>The posting doesn't list a salary.</p><h3>When will I be hearing from you?</h3><p>If you don't hear back from the Ministry within 4 weeks of the posting closing then it would appear your application isn't going any further.</p>
$$,
$$<p>Singapore's Ministry of Manpower has opened grants governance officer posts at Assistant Manager, Manager and Senior Manager level. The team's applications close on 30 November 2026, and the ministry is clear that candidates with no work experience are welcome to apply.</p><table><tbody><tr><td>Organisation</td><td>Ministry of Manpower (MOM), Singapore</td></tr><tr><td>Post</td><td>Assistant Manager / Manager / Senior Manager, Grants Governance, Corporate Management Department, permanent/contract</td></tr><tr><td>Application dates</td><td>Closing 30 November 2026</td></tr><tr><td>Application route</td><td>Online through Careers@Gov</td></tr><tr><td>Qualification</td><td>Knowledge in accounting, auditing, business administration, finance, data analytics or statistics, with 3 to 5 years of relevant experience preferred; candidates with no work experience welcome to apply</td></tr><tr><td>Selection</td><td>Shortlisting; applicants not moving forward are notified within 4 weeks of the closing date</td></tr></tbody></table><h2>What the Ministry of Manpower jobs involve</h2><p>The Officer will be responsible for the development and implementation of governance policies, procedures and frameworks to ensure  effective management and oversight of grants within the Ministry of Manpower (MOM). This will involve the development and maintenance of guidelines on grant application, disbursement, monitoring and evaluation; working with stakeholders to administer grants and track their performance and impact; and the development of training programmes in grants management and governance for MOM officers. The role will also be to continuously improve grants governance processes, using technology and data analytics where appropriate. MOM's mission is to empower people and to build a vibrant, inclusive workforce that will help drive Singapore's growth and prosperity, working in partnership with the tripartite partners on manpower policy, industrial relations, workplace safety and foreign workforce regulation. There is also a second, more senior position in the same team (Senior Manager / Principal Manager, Grants Governance) which also closes on 30 November 2026. For those looking at work in Singapore we also have a guide to <a href="https://growentix.cloud/articles/singapore-work-permit-jobs-nts-occupations-20261123">Singapore work permit jobs in NTS occupations</a> and our wider <a href="https://growentix.cloud/asia">Asia jobs</a> listings.</p><h2>Who can apply</h2><p>Knowledge in accounting, auditing, business administration, finance, data analytics or statistics is required, with 3 to 5 years of relevant experience preferred. Candidates with no work experience are welcome to apply. Experience in government agencies or public organisations, with applied knowledge of public sector financing and governance, is highly regarded. The posting asks for critical thinking, analytical and decision-making skills; strong interpersonal skills to engage stakeholders at all levels; strong written, presentation, and digital skills; and the ability to work independently and in a team. Persons with disabilities are welcome to apply.</p><h2>What it pays</h2><p>The posting doesn't state a salary figure. Singapore Public Service postings on Careers@Gov the pay is left to be determined by grade and experience and that's the case here so there's no salary figure to be found on an unofficial jobs board. The appointment is either permanent or contract and the posting gives no indication as to which it is for this intake.</p><h2>How to apply</h2><p>Apply online via Careers@Gov (the Singapore Public Service jobs portal) by the 30 November 2026 closing date. If you don't hear from the Ministry within 4 weeks of the closing date then the posting asks you to understand that the application is likely not moving forward. The ministry encourages applicants to explore other posts within MOM and indeed the wider Public Service should you not be shortlisted.</p><h2>What the notice does not say</h2><p>The notice says absolutely nothing about salary, how many posts there are, whether it's a permanent post or a contract for this intake. There are no interview dates and no start date. It gives absolutely no indication as to whether it's open to non-Singaporeans.</p><p><strong>Never pay anyone to apply for this job.</strong> Careers@Gov applications are free and the Ministry of Manpower will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://jobs.careers.gov.sg/jobs/hrp/17688931/005056a3-53e2-1fd1-b687-27dd20a3b40d">Careers@Gov</a> (the official posting: duties, requirements, closing date and application process); <a href="https://jobs.careers.gov.sg/jobs/hrp/18205367/005056a3-d347-1fe1-b6b7-9bda50f562c5">Careers@Gov</a> (the senior posting for the same grants governance team, also closing 30 November 2026).</p><h2>Frequently asked questions</h2><h3>When do applications close?</h3><p>Applications close on 30 November 2026.</p><h3>Can I apply with no work experience?</h3><p>Yes — the posting welcomes candidates with no work experience, even though it says 3 to 5 years of relevant experience is preferred.</p><h3>What does the post pay?</h3><p>The posting doesn't list a salary.</p><h3>When will I be hearing from you?</h3><p>If you don't hear back from the Ministry within 4 weeks of the posting closing then it would appear your application isn't going any further.</p>
$$,
ARRAY['https://jobs.careers.gov.sg/jobs/hrp/17688931/005056a3-53e2-1fd1-b687-27dd20a3b40d', 'https://jobs.careers.gov.sg/jobs/hrp/18205367/005056a3-d347-1fe1-b6b7-9bda50f562c5'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- senior-manager-people-and-culture-jobs-remote-20261124 (remote; Global; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'senior-manager-people-and-culture-jobs-remote-20261124', 'remote', 'Global',
'Senior Manager People and Culture Jobs: Remote, $85,000–$110,000',
'Senior Manager People and Culture Jobs: Remote, $85,000–$110,000',
'Senior Manager People and Culture jobs are open at the Global Fund for Children, fully remote, paying $85,000 to $110,000. Apply by 30 November 2026.',
'Senior Manager People and Culture jobs are open at the Global Fund for Children, fully remote, paying $85,000 to $110,000. Apply by 30 November 2026.',
$$<p>The Global Fund for Children is looking to appoint a Senior Manager, People and Culture in a new fully remote role (open to all around the world). Senior Manager, People and Culture roles at the fund pay $85,000 to $110,000 a year for US based hires and the application close date is 5.00pm US Eastern Time on Monday 30th November 2026.</p><table><tbody><tr><td>Organisation</td><td>Global Fund for Children</td></tr><tr><td>Post</td><td>Senior Manager, People and Culture, full-time, fully remote, new role</td></tr><tr><td>Pay</td><td>$85,000 to $110,000 a year for US-based hires; international hires are paid on a locally benchmarked basis</td></tr><tr><td>Application dates</td><td>Closing 5:00pm US Eastern Time, Monday 30 November 2026; applications reviewed on a rolling basis</td></tr><tr><td>Application route</td><td>Online through Breezy, with CV, cover letter and answers to 4 application questions</td></tr><tr><td>Qualification</td><td>Significant people and culture or HR experience covering recruitment and reward/people operations, including supporting employees across more than one country or jurisdiction; HR analytics and HRIS implementation experience; 10 or more years of progressively responsible HR experience desirable</td></tr><tr><td>Selection</td><td>CV/resume, brief cover letter and answers to 4 application questions of up to 200 words each</td></tr></tbody></table><h2>What the Senior Manager People and Culture job involves</h2><p>The Senior Manager leads two areas of the fund's people strategy.  Attract and Belong covers global recruitment and equitable, inclusive, bias-aware hiring and onboarding, the employer value proposition,  sourcing and recruitment data.  Reward and Retain covers compensation and benefits across countries, the annual comp review, reward philosophy, salary structures and benchmarking, pay gaps and retention risks, promotions, benefits reviews and retention/turnover tracking,  workforce planning and succession. The role also has responsibility for Global People Operations and the  PEO relationship (contracts, payroll,  compliance across jurisdictions) and the HR systems and data that underpin them. The role reports to the Senior Advisor, People and Culture and can manage staff and consultants. It is fully remote with a requirement to have working hour overlap with both the US Eastern and UK time zones and to be able to shift schedules as necessary. For those looking at other <a href="https://growentix.cloud/remote">remote jobs</a> can also got a report out on <a href="https://growentix.cloud/articles/affirm-software-engineer-jobs-remote-20261123">Affirm Software Engineer jobs, remote</a>, another fully remote role with a deadline in December.</p><h2>Who can apply</h2><p>The fund is looking for someone with significant people and culture/HR experience (recruitment and reward or people ops) with end to end recruitment and onboarding, compensation reviews, benchmarking and benefits. They'll have experience of supporting people across a number of countries/jurisdictions. Experience of managing PEOs/EORs, benefits providers and brokers; run equitable recruitment. Experience of improving people processes in the context of organisational change and of using people data to inform decisions is required. Strong project management and  communication skills are a must and a genuine commitment to DEI&A is essential. HR analytics and evidence based decision making and HRIS implementation and administration  are all essential. Desirable experience includes 10 or more years of progressively responsible HR experience (ideally in a matrixed global organisation or international non-profit; knowledge of US and UK employment practices, job architecture, salary structures and a global reward framework. Relevant professional certification would be an advantage.</p><h2>What it pays</h2><p>For US based hires the salary is $85,000 to $110,000 a year, depending on experience. International hires are  on a locally benchmarked basis (reflecting location, benefits and experience) so there is no single figure given in the posting. Benefits include private medical, dental and vision, generous PTO (including annual leave, enhanced sick, wellbeing days, sabbatical and family friendly leave), flexible remote/hybrid/compressed working, pension contributions, EAP, team building and socials and funds for professional development.</p><h2>How to apply</h2><p>Apply via the Global Fund for Children's posting on Breezy by 5.00pm US Eastern Time on Monday 30th November 2026. You will need to submit a CV/resume, a short cover letter and answers to four questions, each of up to 200 words): what  excites you most about the role; a summary of your relevant experience with specific HR examples and outcomes; which of the elements of the role you would most like to go into even if they are quite complex and how you would bring curiosity and care to that; and if you were shortlisted, when you could start. Applications are assessed on a rolling basis so it is definitely worth applying early. Questions about the role please feel free to email careers@globalfundforchildren.org.</p><h2>What the notice does not say</h2><p>The notice provides absolutely no actual salary  for the international posts other than the local benchmarking,  gives no interview dates or start date. There is absolutely no indication of how many people the role will be managing and  no detail whatsoever on the PEO/EOR provider  in each country.</p><p><strong>Never pay anyone to apply for this job.</strong> All applications via the Global Fund for Children's official posting are free and the Fund will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://global-fund-for-children.breezy.hr/p/e4bba9e3acd9">Global Fund for Children</a> (official posting: deadline, salary, duties, application questions and benefits); <a href="https://www.globalfundforchildren.org/careers/">Global Fund for Children</a> (the organisation's careers page).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From $85,000 to $110,000 a year for US based staff. International staff on a locally benchmarked rate.</p><h3>When do applications close?</h3><p>5.00pm US Eastern Time on Monday 30th November 2026 and applications are processed on a rolling basis.</p><h3>Can I apply from anywhere?</h3><p>Yes — the role is fully remote and open to people anywhere in the world, as long as your working hours overlap with both the US Eastern and UK time zones.</p><h3>What does the app require?</h3><p>You will need a CV or resume, a short cover letter, and answers to four questions, each of up to 200 words.</p>
$$,
$$<p>The Global Fund for Children is looking to appoint a Senior Manager, People and Culture in a new fully remote role (open to all around the world). Senior Manager, People and Culture roles at the fund pay $85,000 to $110,000 a year for US based hires and the application close date is 5.00pm US Eastern Time on Monday 30th November 2026.</p><table><tbody><tr><td>Organisation</td><td>Global Fund for Children</td></tr><tr><td>Post</td><td>Senior Manager, People and Culture, full-time, fully remote, new role</td></tr><tr><td>Pay</td><td>$85,000 to $110,000 a year for US-based hires; international hires are paid on a locally benchmarked basis</td></tr><tr><td>Application dates</td><td>Closing 5:00pm US Eastern Time, Monday 30 November 2026; applications reviewed on a rolling basis</td></tr><tr><td>Application route</td><td>Online through Breezy, with CV, cover letter and answers to 4 application questions</td></tr><tr><td>Qualification</td><td>Significant people and culture or HR experience covering recruitment and reward/people operations, including supporting employees across more than one country or jurisdiction; HR analytics and HRIS implementation experience; 10 or more years of progressively responsible HR experience desirable</td></tr><tr><td>Selection</td><td>CV/resume, brief cover letter and answers to 4 application questions of up to 200 words each</td></tr></tbody></table><h2>What the Senior Manager People and Culture job involves</h2><p>The Senior Manager leads two areas of the fund's people strategy.  Attract and Belong covers global recruitment and equitable, inclusive, bias-aware hiring and onboarding, the employer value proposition,  sourcing and recruitment data.  Reward and Retain covers compensation and benefits across countries, the annual comp review, reward philosophy, salary structures and benchmarking, pay gaps and retention risks, promotions, benefits reviews and retention/turnover tracking,  workforce planning and succession. The role also has responsibility for Global People Operations and the  PEO relationship (contracts, payroll,  compliance across jurisdictions) and the HR systems and data that underpin them. The role reports to the Senior Advisor, People and Culture and can manage staff and consultants. It is fully remote with a requirement to have working hour overlap with both the US Eastern and UK time zones and to be able to shift schedules as necessary. For those looking at other <a href="https://growentix.cloud/remote">remote jobs</a> can also got a report out on <a href="https://growentix.cloud/articles/affirm-software-engineer-jobs-remote-20261123">Affirm Software Engineer jobs, remote</a>, another fully remote role with a deadline in December.</p><h2>Who can apply</h2><p>The fund is looking for someone with significant people and culture/HR experience (recruitment and reward or people ops) with end to end recruitment and onboarding, compensation reviews, benchmarking and benefits. They'll have experience of supporting people across a number of countries/jurisdictions. Experience of managing PEOs/EORs, benefits providers and brokers; run equitable recruitment. Experience of improving people processes in the context of organisational change and of using people data to inform decisions is required. Strong project management and  communication skills are a must and a genuine commitment to DEI&A is essential. HR analytics and evidence based decision making and HRIS implementation and administration  are all essential. Desirable experience includes 10 or more years of progressively responsible HR experience (ideally in a matrixed global organisation or international non-profit; knowledge of US and UK employment practices, job architecture, salary structures and a global reward framework. Relevant professional certification would be an advantage.</p><h2>What it pays</h2><p>For US based hires the salary is $85,000 to $110,000 a year, depending on experience. International hires are  on a locally benchmarked basis (reflecting location, benefits and experience) so there is no single figure given in the posting. Benefits include private medical, dental and vision, generous PTO (including annual leave, enhanced sick, wellbeing days, sabbatical and family friendly leave), flexible remote/hybrid/compressed working, pension contributions, EAP, team building and socials and funds for professional development.</p><h2>How to apply</h2><p>Apply via the Global Fund for Children's posting on Breezy by 5.00pm US Eastern Time on Monday 30th November 2026. You will need to submit a CV/resume, a short cover letter and answers to four questions, each of up to 200 words): what  excites you most about the role; a summary of your relevant experience with specific HR examples and outcomes; which of the elements of the role you would most like to go into even if they are quite complex and how you would bring curiosity and care to that; and if you were shortlisted, when you could start. Applications are assessed on a rolling basis so it is definitely worth applying early. Questions about the role please feel free to email careers@globalfundforchildren.org.</p><h2>What the notice does not say</h2><p>The notice provides absolutely no actual salary  for the international posts other than the local benchmarking,  gives no interview dates or start date. There is absolutely no indication of how many people the role will be managing and  no detail whatsoever on the PEO/EOR provider  in each country.</p><p><strong>Never pay anyone to apply for this job.</strong> All applications via the Global Fund for Children's official posting are free and the Fund will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://global-fund-for-children.breezy.hr/p/e4bba9e3acd9">Global Fund for Children</a> (official posting: deadline, salary, duties, application questions and benefits); <a href="https://www.globalfundforchildren.org/careers/">Global Fund for Children</a> (the organisation's careers page).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From $85,000 to $110,000 a year for US based staff. International staff on a locally benchmarked rate.</p><h3>When do applications close?</h3><p>5.00pm US Eastern Time on Monday 30th November 2026 and applications are processed on a rolling basis.</p><h3>Can I apply from anywhere?</h3><p>Yes — the role is fully remote and open to people anywhere in the world, as long as your working hours overlap with both the US Eastern and UK time zones.</p><h3>What does the app require?</h3><p>You will need a CV or resume, a short cover letter, and answers to four questions, each of up to 200 words.</p>
$$,
ARRAY['https://global-fund-for-children.breezy.hr/p/e4bba9e3acd9', 'https://www.globalfundforchildren.org/careers/'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- service-desk-analyst-jobs-government-legal-department-leeds-20261124 (uk; UK; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'service-desk-analyst-jobs-government-legal-department-leeds-20261124', 'uk', 'UK',
'Service Desk Analyst Jobs: Government Legal Department, Leeds',
'Service Desk Analyst Jobs: Government Legal Department, Leeds',
'Service Desk Analyst jobs are open at the Government Legal Department in Leeds, paying £32,127. Apply by midday on Thursday 26 November 2026.',
'Service Desk Analyst jobs are open at the Government Legal Department in Leeds, paying £32,127. Apply by midday on Thursday 26 November 2026.',
$$<p>The Government Legal Department are recruiting a Service Desk Analyst for their Digital, Data and Cyber Division in Leeds. The Service Desk Analyst post in the Department pays £32,127  and the applications close at 12.00 on Thursday 26th November 2026.</p><table><tbody><tr><td>Organisation</td><td>Government Legal Department</td></tr><tr><td>Post</td><td>Service Desk Analyst, Executive Officer grade, permanent, full-time</td></tr><tr><td>Total posts</td><td>1</td></tr><tr><td>Pay</td><td>£32,127 a year, plus a £9,307 employer contribution to the Civil Service Defined Benefit Pension scheme</td></tr><tr><td>Application dates</td><td>Closing 12:00 midday, Thursday 26 November 2026</td></tr><tr><td>Application route</td><td>Online through Civil Service Jobs</td></tr><tr><td>Qualification</td><td>Good communication skills and the ability to communicate effectively and professionally; assessed through a Civil Service Verbal Reasoning Test and the online application</td></tr><tr><td>Selection</td><td>Civil Service Verbal Reasoning Test, online application, interview in person at the GLD office in Leeds; Security Check clearance required</td></tr></tbody></table><h2>What the Service Desk Analyst job involves</h2><p>The Service Desk Analyst provides first-line IT support to all staff within the Government Legal Department, acting as the central point of contact for all IT incidents and service requests across the Government Legal Department. They are responsible for triaging, diagnosing and resolving incidents where possible, managing all the incoming queries (phone, email, ServiceNow, Microsoft Teams and in person) and ensuring that service levels are met. The role is within the Digital, Data and Cyber Division which is transforming how the department delivers its modern and secure digital services. The department has just under 4,000 staff in total (just under 3,000 of whom are legal professionals). The department advises government departments on subjects from health and energy through to AI and national security. Readers looking at other <a href="https://growentix.cloud/uk">UK jobs</a> in government digital work can also read our report out on <a href="https://growentix.cloud/articles/deputy-director-data-maturity-jobs-gds-20261123">Deputy Director of Data Maturity roles at the Government Digital Service</a>.</p><h2>Who can apply</h2><p>Applicants will be assessed on good communication skills and the ability to communicate effectively and professionally (along with the other key skills listed in the advert). The first stage is the Civil Service Verbal Reasoning test which is taken online as part of the application so applicants need to allow themselves sufficient time to complete the full application prior to the closing date. Once the vacancy has closed the test and  application will no longer be accessible. All GLD staff are required to have a Baseline Personnel Security Standard clearance prior to commencement and this role in particular will require Security Check clearance which generally requires a 5 year verifiable UK residency history (with no more than 6 months spent overseas in the  12 months. Visa sponsorship will not be provided, except for existing civil servants employed by GLD who meet the Home Office and UKVI requirements.</p><h2>What it pays</h2><p>Salary: £32,127 per annum. Government Legal Department also contribute £9,307 to the Civil Service Defined Benefit Pension scheme (employer contribution of 28.97%).</p><h2>How to apply</h2><p>Apply online via Civil Service Jobs (ref 491058) by 12.00 midday on Thursday 26th November 2026. There are two assessment stages: the Civil Service Verbal Reasoning Test and the  application itself (practice tests  for the reasoning test are available). If you make an error on the eligibility form, contact the department at activecampaigns@governmentlegal.gov.uk no later than two working days prior to the vacancy closing. The subject line of your email must be in the advert, or the application will not be able to be re-opened. Shortlisted candidates will be interviewed in person at the GLD office in Leeds. If a large number of applicants pass the sift then GLD may hold a longlist of those who have met the minimum pass mark but  not been selected for interview.</p><h2>What the notice does not say</h2><p>The notice provides no interview date whatsoever (just that it's in person in Leeds) and no start date. There's no separate closing date for the test other than the midday deadline for the whole application.</p><p><strong>Never pay anyone to apply for this job.</strong> Civil Service Jobs applications are free and the Government Legal Department will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.civilservicejobs.service.gov.uk/csr/index.cgi?SID=c2VhcmNocGFnZT0xJmpvYmxpc3Rfdmlld192YWM9MjAyMTcyNCZvd25lcnR5cGU9ZmFpciZwYWdlY2xhc3M9Sm9icyZzZWFyY2hzb3J0PXNjb3JlJm93bmVyPTUwNzAwMDAmdXNlcnNlYXJjaGNvbnRleHQ9MjIxNDY5OTY5JnBhZ2VhY3Rpb249dmlld3ZhY2J5am9ibGlzdCZyZXFzaWc9MTc5NTA3NDM5Ni0zYjNmY2VkZjE2ZDZjN2EwOTJiMGZjZTdlMWRhNjA0NWQ2ZDE5MjNh">Civil Service Jobs</a> — the official vacancy page, which sets out the salary, grade, closing date, reference 491058 and how to apply; <a href="https://www.jobsgopublic.com/job/service-desk-analyst-124974">Jobs Go Public</a> — the advert as published, covering the duties, the pension contribution, the clearance requirement and the interview arrangements.</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>£32,127 per annum plus a £9,307 employer contribution to the Civil Service Defined Benefit Pension scheme.</p><h3>When do applications close?</h3><p>At 12.00 midday on Thursday 26th November 2026.</p><h3>Is there a test as part of the application?</h3><p>Yes. Applicants complete the Civil Service Verbal Reasoning test is done online as part of the application and you have to complete the whole application by the deadline.</p><h3>So where is the interview?</h3><p>In person at the Government Legal Department office in Leeds.</p>
$$,
$$<p>The Government Legal Department are recruiting a Service Desk Analyst for their Digital, Data and Cyber Division in Leeds. The Service Desk Analyst post in the Department pays £32,127  and the applications close at 12.00 on Thursday 26th November 2026.</p><table><tbody><tr><td>Organisation</td><td>Government Legal Department</td></tr><tr><td>Post</td><td>Service Desk Analyst, Executive Officer grade, permanent, full-time</td></tr><tr><td>Total posts</td><td>1</td></tr><tr><td>Pay</td><td>£32,127 a year, plus a £9,307 employer contribution to the Civil Service Defined Benefit Pension scheme</td></tr><tr><td>Application dates</td><td>Closing 12:00 midday, Thursday 26 November 2026</td></tr><tr><td>Application route</td><td>Online through Civil Service Jobs</td></tr><tr><td>Qualification</td><td>Good communication skills and the ability to communicate effectively and professionally; assessed through a Civil Service Verbal Reasoning Test and the online application</td></tr><tr><td>Selection</td><td>Civil Service Verbal Reasoning Test, online application, interview in person at the GLD office in Leeds; Security Check clearance required</td></tr></tbody></table><h2>What the Service Desk Analyst job involves</h2><p>The Service Desk Analyst provides first-line IT support to all staff within the Government Legal Department, acting as the central point of contact for all IT incidents and service requests across the Government Legal Department. They are responsible for triaging, diagnosing and resolving incidents where possible, managing all the incoming queries (phone, email, ServiceNow, Microsoft Teams and in person) and ensuring that service levels are met. The role is within the Digital, Data and Cyber Division which is transforming how the department delivers its modern and secure digital services. The department has just under 4,000 staff in total (just under 3,000 of whom are legal professionals). The department advises government departments on subjects from health and energy through to AI and national security. Readers looking at other <a href="https://growentix.cloud/uk">UK jobs</a> in government digital work can also read our report out on <a href="https://growentix.cloud/articles/deputy-director-data-maturity-jobs-gds-20261123">Deputy Director of Data Maturity roles at the Government Digital Service</a>.</p><h2>Who can apply</h2><p>Applicants will be assessed on good communication skills and the ability to communicate effectively and professionally (along with the other key skills listed in the advert). The first stage is the Civil Service Verbal Reasoning test which is taken online as part of the application so applicants need to allow themselves sufficient time to complete the full application prior to the closing date. Once the vacancy has closed the test and  application will no longer be accessible. All GLD staff are required to have a Baseline Personnel Security Standard clearance prior to commencement and this role in particular will require Security Check clearance which generally requires a 5 year verifiable UK residency history (with no more than 6 months spent overseas in the  12 months. Visa sponsorship will not be provided, except for existing civil servants employed by GLD who meet the Home Office and UKVI requirements.</p><h2>What it pays</h2><p>Salary: £32,127 per annum. Government Legal Department also contribute £9,307 to the Civil Service Defined Benefit Pension scheme (employer contribution of 28.97%).</p><h2>How to apply</h2><p>Apply online via Civil Service Jobs (ref 491058) by 12.00 midday on Thursday 26th November 2026. There are two assessment stages: the Civil Service Verbal Reasoning Test and the  application itself (practice tests  for the reasoning test are available). If you make an error on the eligibility form, contact the department at activecampaigns@governmentlegal.gov.uk no later than two working days prior to the vacancy closing. The subject line of your email must be in the advert, or the application will not be able to be re-opened. Shortlisted candidates will be interviewed in person at the GLD office in Leeds. If a large number of applicants pass the sift then GLD may hold a longlist of those who have met the minimum pass mark but  not been selected for interview.</p><h2>What the notice does not say</h2><p>The notice provides no interview date whatsoever (just that it's in person in Leeds) and no start date. There's no separate closing date for the test other than the midday deadline for the whole application.</p><p><strong>Never pay anyone to apply for this job.</strong> Civil Service Jobs applications are free and the Government Legal Department will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.civilservicejobs.service.gov.uk/csr/index.cgi?SID=c2VhcmNocGFnZT0xJmpvYmxpc3Rfdmlld192YWM9MjAyMTcyNCZvd25lcnR5cGU9ZmFpciZwYWdlY2xhc3M9Sm9icyZzZWFyY2hzb3J0PXNjb3JlJm93bmVyPTUwNzAwMDAmdXNlcnNlYXJjaGNvbnRleHQ9MjIxNDY5OTY5JnBhZ2VhY3Rpb249dmlld3ZhY2J5am9ibGlzdCZyZXFzaWc9MTc5NTA3NDM5Ni0zYjNmY2VkZjE2ZDZjN2EwOTJiMGZjZTdlMWRhNjA0NWQ2ZDE5MjNh">Civil Service Jobs</a> — the official vacancy page, which sets out the salary, grade, closing date, reference 491058 and how to apply; <a href="https://www.jobsgopublic.com/job/service-desk-analyst-124974">Jobs Go Public</a> — the advert as published, covering the duties, the pension contribution, the clearance requirement and the interview arrangements.</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>£32,127 per annum plus a £9,307 employer contribution to the Civil Service Defined Benefit Pension scheme.</p><h3>When do applications close?</h3><p>At 12.00 midday on Thursday 26th November 2026.</p><h3>Is there a test as part of the application?</h3><p>Yes. Applicants complete the Civil Service Verbal Reasoning test is done online as part of the application and you have to complete the whole application by the deadline.</p><h3>So where is the interview?</h3><p>In person at the Government Legal Department office in Leeds.</p>
$$,
ARRAY['https://www.civilservicejobs.service.gov.uk/csr/index.cgi?SID=c2VhcmNocGFnZT0xJmpvYmxpc3Rfdmlld192YWM9MjAyMTcyNCZvd25lcnR5cGU9ZmFpciZwYWdlY2xhc3M9Sm9icyZzZWFyY2hzb3J0PXNjb3JlJm93bmVyPTUwNzAwMDAmdXNlcnNlYXJjaGNvbnRleHQ9MjIxNDY5OTY5JnBhZ2VhY3Rpb249dmlld3ZhY2J5am9ibGlzdCZyZXFzaWc9MTc5NTA3NDM5Ni0zYjNmY2VkZjE2ZDZjN2EwOTJiMGZjZTdlMWRhNjA0NWQ2ZDE5MjNh', 'https://www.jobsgopublic.com/job/service-desk-analyst-124974'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- upsc-cds-1-2027-notification-exam-date-20261124 (asia; India; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'upsc-cds-1-2027-notification-exam-date-20261124', 'asia', 'India',
'UPSC CDS 1 2027: Notification 2 Dec, Exam 11 Apr, How to Apply',
'UPSC CDS 1 2027: Notification 2 Dec, Exam 11 Apr, How to Apply',
'UPSC CDS 1 2027 notification is due on 2 December 2026, with the exam on 11 April 2027. Applications run from 2 to 22 December 2026.',
'UPSC CDS 1 2027 notification is due on 2 December 2026, with the exam on 11 April 2027. Applications run from 2 to 22 December 2026.',
$$<p>The UPSC will be bringing out the UPSC CDS 1 2027 notification on Wednesday 2nd December 2026. The written exam for Sunday, 11 April 2027. Applications for CDS (I) 2027 will go live on the same day as the notification  and will remain open till 22nd December 2026.</p><table><tbody><tr><td>Organisation</td><td>Union Public Service Commission (UPSC)</td></tr><tr><td>Post</td><td>Combined Defence Services Examination (I) 2027</td></tr><tr><td>Notification</td><td>2 December 2026</td></tr><tr><td>Application dates</td><td>2 December 2026 to 22 December 2026</td></tr><tr><td>Exam date</td><td>Sunday 11 April 2027</td></tr><tr><td>Application route</td><td>Online through the UPSC application portal, upsconline.nic.in</td></tr></tbody></table><h2>What the UPSC CDS 1 2027 exam is</h2><p>The CDS exam is UPSC's  route into the Officer Training at the Indian Military Academy, the Indian Naval Academy, the Air Force Academy and the Officers' Training Academy. It's a written exam followed by a Services Selection Board interview for the qualifying candidates and the final selection is a combination of the two. The calendar has NDA and NA (I) 2027  on the same day (Sunday 11th April 2027) and you can  only sit one of the two on that day. Those following the other defence entries can also take a look at our report on the <a href="https://growentix.cloud/articles/afcat-01-2027-379-vacancies-20261111">AFCAT 01/2027</a>(the Air Force's own officer entry with 379 vacancies) and our wider <a href="https://growentix.cloud/asia">Asia jobs</a> listings.</p><h2>Who can apply</h2><p>Eligibility for CDS (I) 2027 will  be detailed in the notification of 2nd December 2026. As was the case with the previous CDS notification, the exam is open to Indian citizens. Unmarried candidates are eligible for the academies and final year students can apply. The qualification requirements are the same as in the previous notification i.e. a Bachelor's degree in any discipline for the Indian Military Academy and Officers' Training Academy; an Engineering degree for the Indian Naval Academy; and a degree with Physics and Mathematics at the 10+2 level or a B.E. for the Air Force Academy. The age brackets as in the previous notification are approx 19 to 24 for the Indian Military Academy and Indian Naval Academy, 20 to 24 for the Air Force Academy and 19 to 25 for the Officers' Training Academy. These  are just guidelines. The exact date of birth cut-offs will be specified in the 2nd December notification  and candidates must go by those.</p><h2>What it pays</h2><p>There are no pay or vacancy figures at all for CDS (I) 2027 yet. The academies' vacancy numbers, the training stipend and the pay scale will all be  in the 2 December notification so this article doesn't contain any of those figures. Don't rely on any vacancy numbers that may be quoted on the various unofficial sites prior to the notification being issued.</p><h2>How to apply</h2><p>Applications open on 2nd December 2026 via the UPSC application portal (upsconline.nic.in) with the last date to apply being 22nd December 2026. As per the last notification, candidates will need to do their one time registration on the portal and then go on to complete the CDS (I) 2027 application form. All the details in the form will have to be cross checked against the notification prior to submission. The application fee as per the last notification, the application fee was Rs 200 for General and OBC candidates, with SC, ST, PwD and female candidates exempt; the 2 December notification will confirm whether that still applies. The written examination will consist of three papers for the Indian Military Academy, Indian Naval Academy and the Air Force Academy (English, General Knowledge and Elementary Mathematics each  100 marks and  2 hours — while Officers' Training Academy candidates take English and General Knowledge for the OTA candidates.</p><h2>What the notice does not say</h2><p>As at the time of writing no notification has been issued. The academy wise vacancy numbers, the exact age and date of birth cut-offs, the application fee, the full eligibility criteria and the examination centres are all yet to be published. They will only be available on 2 December 2026. The UPSC calendar is very much tentative and dates are subject to change so candidates should check the dates on upsc.gov.in when the notification does come out.</p><p>One thing to be clear about: the only payment is the official fee on the UPSC's own website, and applications go through that site alone. Anyone asking for money to get you a place in CDS (I) 2027 is not someone to trust.</p><p>Sources: <a href="https://upsc.gov.in">Union Public Service Commission</a> — the official site, where the notification will appear once it is published; <a href="https://upsconline.nic.in">UPSC Online</a> — the official portal for applications; <a href="https://indianexpress.com/article/education/upsc-announces-2027-calendar-cse-prelims-mains-nda-na-ies-exam-dates-10700540/">The Indian Express</a> — its report on the UPSC 2027 calendar, which gives the CDS (I) 2027 dates; <a href="https://testbook.com/cds?stay=1">Testbook</a> — a CDS 1 2027 overview drawing the eligibility rules and exam pattern from the last notification.</p><h2>Frequently asked questions</h2><h3>When is the UPSC CDS 1 2027 notification going to be released?</h3><p>On 2nd December 2026 as per the UPSC Annual Calendar 2027.</p><h3>When is the CDS 1 2027 exam?</h3><p>On Sunday 11th April 2027.</p><h3>What are the final dates to apply?</h3><p>Applications open on 2 December 2026 and the last date to apply is 22 December 2026.</p><h3>How many posts are there in CDS 1 2027?</h3><p>The number has not been announced yet. Academy-wise vacancy figures will be published in the notification on 2 December 2026.</p><h3>Can final-year students apply?</h3><p>As in the last one, yes final year students are eligible. The 2nd December notification will confirm the rule.</p>
$$,
$$<p>The UPSC will be bringing out the UPSC CDS 1 2027 notification on Wednesday 2nd December 2026. The written exam for Sunday, 11 April 2027. Applications for CDS (I) 2027 will go live on the same day as the notification  and will remain open till 22nd December 2026.</p><table><tbody><tr><td>Organisation</td><td>Union Public Service Commission (UPSC)</td></tr><tr><td>Post</td><td>Combined Defence Services Examination (I) 2027</td></tr><tr><td>Notification</td><td>2 December 2026</td></tr><tr><td>Application dates</td><td>2 December 2026 to 22 December 2026</td></tr><tr><td>Exam date</td><td>Sunday 11 April 2027</td></tr><tr><td>Application route</td><td>Online through the UPSC application portal, upsconline.nic.in</td></tr></tbody></table><h2>What the UPSC CDS 1 2027 exam is</h2><p>The CDS exam is UPSC's  route into the Officer Training at the Indian Military Academy, the Indian Naval Academy, the Air Force Academy and the Officers' Training Academy. It's a written exam followed by a Services Selection Board interview for the qualifying candidates and the final selection is a combination of the two. The calendar has NDA and NA (I) 2027  on the same day (Sunday 11th April 2027) and you can  only sit one of the two on that day. Those following the other defence entries can also take a look at our report on the <a href="https://growentix.cloud/articles/afcat-01-2027-379-vacancies-20261111">AFCAT 01/2027</a>(the Air Force's own officer entry with 379 vacancies) and our wider <a href="https://growentix.cloud/asia">Asia jobs</a> listings.</p><h2>Who can apply</h2><p>Eligibility for CDS (I) 2027 will  be detailed in the notification of 2nd December 2026. As was the case with the previous CDS notification, the exam is open to Indian citizens. Unmarried candidates are eligible for the academies and final year students can apply. The qualification requirements are the same as in the previous notification i.e. a Bachelor's degree in any discipline for the Indian Military Academy and Officers' Training Academy; an Engineering degree for the Indian Naval Academy; and a degree with Physics and Mathematics at the 10+2 level or a B.E. for the Air Force Academy. The age brackets as in the previous notification are approx 19 to 24 for the Indian Military Academy and Indian Naval Academy, 20 to 24 for the Air Force Academy and 19 to 25 for the Officers' Training Academy. These  are just guidelines. The exact date of birth cut-offs will be specified in the 2nd December notification  and candidates must go by those.</p><h2>What it pays</h2><p>There are no pay or vacancy figures at all for CDS (I) 2027 yet. The academies' vacancy numbers, the training stipend and the pay scale will all be  in the 2 December notification so this article doesn't contain any of those figures. Don't rely on any vacancy numbers that may be quoted on the various unofficial sites prior to the notification being issued.</p><h2>How to apply</h2><p>Applications open on 2nd December 2026 via the UPSC application portal (upsconline.nic.in) with the last date to apply being 22nd December 2026. As per the last notification, candidates will need to do their one time registration on the portal and then go on to complete the CDS (I) 2027 application form. All the details in the form will have to be cross checked against the notification prior to submission. The application fee as per the last notification, the application fee was Rs 200 for General and OBC candidates, with SC, ST, PwD and female candidates exempt; the 2 December notification will confirm whether that still applies. The written examination will consist of three papers for the Indian Military Academy, Indian Naval Academy and the Air Force Academy (English, General Knowledge and Elementary Mathematics each  100 marks and  2 hours — while Officers' Training Academy candidates take English and General Knowledge for the OTA candidates.</p><h2>What the notice does not say</h2><p>As at the time of writing no notification has been issued. The academy wise vacancy numbers, the exact age and date of birth cut-offs, the application fee, the full eligibility criteria and the examination centres are all yet to be published. They will only be available on 2 December 2026. The UPSC calendar is very much tentative and dates are subject to change so candidates should check the dates on upsc.gov.in when the notification does come out.</p><p>One thing to be clear about: the only payment is the official fee on the UPSC's own website, and applications go through that site alone. Anyone asking for money to get you a place in CDS (I) 2027 is not someone to trust.</p><p>Sources: <a href="https://upsc.gov.in">Union Public Service Commission</a> — the official site, where the notification will appear once it is published; <a href="https://upsconline.nic.in">UPSC Online</a> — the official portal for applications; <a href="https://indianexpress.com/article/education/upsc-announces-2027-calendar-cse-prelims-mains-nda-na-ies-exam-dates-10700540/">The Indian Express</a> — its report on the UPSC 2027 calendar, which gives the CDS (I) 2027 dates; <a href="https://testbook.com/cds?stay=1">Testbook</a> — a CDS 1 2027 overview drawing the eligibility rules and exam pattern from the last notification.</p><h2>Frequently asked questions</h2><h3>When is the UPSC CDS 1 2027 notification going to be released?</h3><p>On 2nd December 2026 as per the UPSC Annual Calendar 2027.</p><h3>When is the CDS 1 2027 exam?</h3><p>On Sunday 11th April 2027.</p><h3>What are the final dates to apply?</h3><p>Applications open on 2 December 2026 and the last date to apply is 22 December 2026.</p><h3>How many posts are there in CDS 1 2027?</h3><p>The number has not been announced yet. Academy-wise vacancy figures will be published in the notification on 2 December 2026.</p><h3>Can final-year students apply?</h3><p>As in the last one, yes final year students are eligible. The 2nd December notification will confirm the rule.</p>
$$,
ARRAY['https://upsc.gov.in', 'https://upsconline.nic.in', 'https://indianexpress.com/article/education/upsc-announces-2027-calendar-cse-prelims-mains-nda-na-ies-exam-dates-10700540/', 'https://testbook.com/cds?stay=1'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- va-general-attorney-jobs-washington-dc-20261124 (usa; USA; verifiedAt 2026-11-24)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'va-general-attorney-jobs-washington-dc-20261124', 'usa', 'USA',
'VA General Attorney Jobs: Washington DC, Close 31 Dec',
'VA General Attorney Jobs: Washington DC, Close 31 Dec',
'VA General Attorney jobs are open in Washington DC, paying $85,447 to $187,093. Apply by 31 December 2026, with weekly cut-offs.',
'VA General Attorney jobs are open in Washington DC, paying $85,447 to $187,093. Apply by 31 December 2026, with weekly cut-offs.',
$$<p>The VA is hiring a General Attorney for its Court of Appeals Litigation Group in Washington DC. The VA General Attorney position at this grade is $85,447 to $187,093 per year. The announcement is open until 31st December 2026 with applications being reviewed on a weekly cut-offs.</p><table><tbody><tr><td>Organisation</td><td>Department of Veterans Affairs, Office of General Counsel, Veterans Programs Group</td></tr><tr><td>Post</td><td>General Attorney (Veterans), GS-0905, Court of Appeals Litigation Group, permanent, full-time</td></tr><tr><td>Total posts</td><td>1</td></tr><tr><td>Pay</td><td>$85,447 to $187,093 a year, GS-11 to GS-14</td></tr><tr><td>Application dates</td><td>Opened 2 November 2026; open continuous until 31 December 2026 or until filled; initial cut-off 6 November 2026, subsequent cut-offs every Friday</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>Active bar membership in good standing in any US state, territory or the District of Columbia; 4 years of progressively responsible experience in total, with no more than 1 year before admission; GS-12 requires an LL.M. or a JD in a directly pertinent field, or 2 years of experience; GS-13 requires 3 years; GS-14 requires 4 years</td></tr><tr><td>Selection</td><td>Online questionnaire and competency assessment; 1 to 2 year trial period; background and security investigation</td></tr></tbody></table><h2>What the VA General Attorney jobs involve</h2><p>The General Attorney prepares and files motions, pleadings, briefs and appellate records and represents the Department of Veterans Affairs in all litigation before the Court of Appeals for Veterans Claims (including court sponsored mediation, oral argument before Federal judges and settlement negotiation). The post is in the Court of Appeals Litigation Group of the Veterans Programs Group of the Office of General Counsel,  810 Vermont Avenue NW, Washington DC. Work schedule is Monday to Friday, 8:00 am to 4:30 pm, with compressed and flexible schedules available and ad hoc telework. The post is not virtual and return to office is required (unless an exemption applies). No relocation or recruitment incentives are  authorised. Those looking at other <a href="https://growentix.cloud/usa">USA jobs</a> in federal litigation may also be interested in our report on <a href="https://growentix.cloud/articles/assistant-united-states-attorney-jobs-maryland-20261123">Assistant United States Attorney jobs in Maryland</a> which closes on 30 November.</p><h2>Who can apply</h2><p>Applicants must be US citizens and active members in good standing of the bar of a State, Territory of the United States or the District of Columbia (must have a current unrestricted licence to practice law). A total of 4 years of progressively responsible experience is required (no more than 1 year of which can be prior to admission to the bar). By grade: GS-11 requires up to 1 year of practice or the Superior Qualification Program; GS-12 requires an LL.M. or a JD in a field directly relevant to the post or 2 years of progressively responsible experience; GS-13 requires 3 years;  GS-14 requires 4 years. A transcript is required where qualification is on the basis of education. There is a 1-2 year trial period in place which includes background and security investigations and pre-employment reference checks. Males born after 31 December 1959 must satisfy Selective Service registration requirements and a REAL ID is required from 7 May 2025.</p><h2>What it pays</h2><p>Pay is $85,447 to $187,093 per year (GS-11 to GS-14) as per the announcement header. Promotion  to GS-14 is possible without further competition (though not guaranteed). Relocation and recruitment incentives are not authorised and financial disclosure is not required.</p><h2>How to apply</h2><p>Apply online via USAJOBS via announcement CCLQ-13102945-27-MMP before the announcement closes on 31st December 2026 or is filled. Applications are reviewed on a weekly cut-off basis so applying before the  next Friday's cut-off will ensure you are considered as early as possible. The application will be an online questionnaire plus a competency assessment. Your resume must contain the job title, the employer, the number of hours worked each week and the start and end dates (with month and year) and must describe the duties. For federal positions the grade held must also be included. You may elect to have your resume shared with other VA hiring managers. Application status can be viewed in USAJOBS under Applications.</p><h2>What the notice does not say</h2><p>The notice gives no interview dates and no start date. It gives no indication of the total number of applicants the weekly cut-offs will be looking at and provides no individual salary figure for any of the grades other than the overall range.</p><p><strong>Never pay anyone to apply for this job.</strong> USAJOBS applications are free and the Department of Veterans Affairs will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.usajobs.gov/job/891163000">USAJOBS</a> (the official announcement: duties, qualifications by grade, cut-off dates and selection process); <a href="https://careers.org/jobs/891163000">Careers.org</a> (the announcement header as published, with the pay range and opening dates).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From $85,447 to $187,093 a year (GS-11 to GS-14).</p><h3>When do applications close?</h3><p>31st December 2026 or earlier if the post fills; applications are assessed at cut-off points every Friday.</p><h3>What qualifications are required?</h3><p>Active bar membership in good standing in any US state, territory or the District of Columbia and 4 years of progressively responsible experience in total (no more than 1 year of that prior to admission).</p><h3>Is the work remote?</h3><p>No, it's based in Washington DC with ad hoc telework available. It's not a virtual post.</p>
$$,
$$<p>The VA is hiring a General Attorney for its Court of Appeals Litigation Group in Washington DC. The VA General Attorney position at this grade is $85,447 to $187,093 per year. The announcement is open until 31st December 2026 with applications being reviewed on a weekly cut-offs.</p><table><tbody><tr><td>Organisation</td><td>Department of Veterans Affairs, Office of General Counsel, Veterans Programs Group</td></tr><tr><td>Post</td><td>General Attorney (Veterans), GS-0905, Court of Appeals Litigation Group, permanent, full-time</td></tr><tr><td>Total posts</td><td>1</td></tr><tr><td>Pay</td><td>$85,447 to $187,093 a year, GS-11 to GS-14</td></tr><tr><td>Application dates</td><td>Opened 2 November 2026; open continuous until 31 December 2026 or until filled; initial cut-off 6 November 2026, subsequent cut-offs every Friday</td></tr><tr><td>Application route</td><td>Online through USAJOBS</td></tr><tr><td>Qualification</td><td>Active bar membership in good standing in any US state, territory or the District of Columbia; 4 years of progressively responsible experience in total, with no more than 1 year before admission; GS-12 requires an LL.M. or a JD in a directly pertinent field, or 2 years of experience; GS-13 requires 3 years; GS-14 requires 4 years</td></tr><tr><td>Selection</td><td>Online questionnaire and competency assessment; 1 to 2 year trial period; background and security investigation</td></tr></tbody></table><h2>What the VA General Attorney jobs involve</h2><p>The General Attorney prepares and files motions, pleadings, briefs and appellate records and represents the Department of Veterans Affairs in all litigation before the Court of Appeals for Veterans Claims (including court sponsored mediation, oral argument before Federal judges and settlement negotiation). The post is in the Court of Appeals Litigation Group of the Veterans Programs Group of the Office of General Counsel,  810 Vermont Avenue NW, Washington DC. Work schedule is Monday to Friday, 8:00 am to 4:30 pm, with compressed and flexible schedules available and ad hoc telework. The post is not virtual and return to office is required (unless an exemption applies). No relocation or recruitment incentives are  authorised. Those looking at other <a href="https://growentix.cloud/usa">USA jobs</a> in federal litigation may also be interested in our report on <a href="https://growentix.cloud/articles/assistant-united-states-attorney-jobs-maryland-20261123">Assistant United States Attorney jobs in Maryland</a> which closes on 30 November.</p><h2>Who can apply</h2><p>Applicants must be US citizens and active members in good standing of the bar of a State, Territory of the United States or the District of Columbia (must have a current unrestricted licence to practice law). A total of 4 years of progressively responsible experience is required (no more than 1 year of which can be prior to admission to the bar). By grade: GS-11 requires up to 1 year of practice or the Superior Qualification Program; GS-12 requires an LL.M. or a JD in a field directly relevant to the post or 2 years of progressively responsible experience; GS-13 requires 3 years;  GS-14 requires 4 years. A transcript is required where qualification is on the basis of education. There is a 1-2 year trial period in place which includes background and security investigations and pre-employment reference checks. Males born after 31 December 1959 must satisfy Selective Service registration requirements and a REAL ID is required from 7 May 2025.</p><h2>What it pays</h2><p>Pay is $85,447 to $187,093 per year (GS-11 to GS-14) as per the announcement header. Promotion  to GS-14 is possible without further competition (though not guaranteed). Relocation and recruitment incentives are not authorised and financial disclosure is not required.</p><h2>How to apply</h2><p>Apply online via USAJOBS via announcement CCLQ-13102945-27-MMP before the announcement closes on 31st December 2026 or is filled. Applications are reviewed on a weekly cut-off basis so applying before the  next Friday's cut-off will ensure you are considered as early as possible. The application will be an online questionnaire plus a competency assessment. Your resume must contain the job title, the employer, the number of hours worked each week and the start and end dates (with month and year) and must describe the duties. For federal positions the grade held must also be included. You may elect to have your resume shared with other VA hiring managers. Application status can be viewed in USAJOBS under Applications.</p><h2>What the notice does not say</h2><p>The notice gives no interview dates and no start date. It gives no indication of the total number of applicants the weekly cut-offs will be looking at and provides no individual salary figure for any of the grades other than the overall range.</p><p><strong>Never pay anyone to apply for this job.</strong> USAJOBS applications are free and the Department of Veterans Affairs will never ask you to pay anything  for an application, an assessment or a job offer.</p><p>Sources: <a href="https://www.usajobs.gov/job/891163000">USAJOBS</a> (the official announcement: duties, qualifications by grade, cut-off dates and selection process); <a href="https://careers.org/jobs/891163000">Careers.org</a> (the announcement header as published, with the pay range and opening dates).</p><h2>Frequently asked questions</h2><h3>What does the post pay?</h3><p>From $85,447 to $187,093 a year (GS-11 to GS-14).</p><h3>When do applications close?</h3><p>31st December 2026 or earlier if the post fills; applications are assessed at cut-off points every Friday.</p><h3>What qualifications are required?</h3><p>Active bar membership in good standing in any US state, territory or the District of Columbia and 4 years of progressively responsible experience in total (no more than 1 year of that prior to admission).</p><h3>Is the work remote?</h3><p>No, it's based in Washington DC with ad hoc telework available. It's not a virtual post.</p>
$$,
ARRAY['https://www.usajobs.gov/job/891163000', 'https://careers.org/jobs/891163000'], NOW(), NOW(), NOW(), '2026-11-24'::timestamptz, NULL) ON CONFLICT ("slug") DO NOTHING;

-- ai-stock-selloff-sp-500-correction-20261124 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'ai-stock-selloff-sp-500-correction-20261124', 'news', 'USA',
'AI stock selloff: S&P 500 exits correction after Monday rebound',
'AI stock selloff: S&P 500 exits correction after Monday rebound',
'The AI stock selloff reversed on Monday as Nvidia''s Huang return sent shares up 31% — the S&P 500 jumped 4.7% and exited correction territory.',
'The AI stock selloff reversed on Monday as Nvidia''s Huang return sent shares up 31% — the S&P 500 jumped 4.7% and exited correction territory.',
$$<p>The AI stock selloff reversed in a single session on Monday, after Nvidia's board reinstated Jensen Huang as chief executive before the open. The S&P 500 jumped 4.7% to 7,237.17, climbing out of the correction it had entered last week, while the Nasdaq surged 6.5% — the best day for both benchmarks since April 2025. Investors are now asking whether the six-week slide in technology shares has finally found its floor, or whether one day of relief changes nothing about the doubts behind it.</p>

<table>
<tr><td>Event</td><td>US stock market rebound; S&P 500 exits correction</td></tr>
<tr><td>S&P 500</td><td>Up 4.73% on Monday to 7,237.17; had been down 11.6% from its 6 October all-time high</td></tr>
<tr><td>Nasdaq</td><td>Up 6.51% on Monday to 24,089.56; had lost 10% the previous week</td></tr>
<tr><td>Dow</td><td>Up 3.01% on Monday to 49,595.31</td></tr>
<tr><td>Nvidia</td><td>Up 31.48% on Monday to $165.05, about $952 billion added</td></tr>
<tr><td>Losing streak before</td><td>S&P 500 fell for seven straight sessions, longest since 2020</td></tr>
<tr><td>Volatility</td><td>VIX closed at 35.89 on Friday; fell to 26.62 on Monday</td></tr>
<tr><td>Asia</td><td>Taiwan shares down 17% in the week, biggest fall since 1990</td></tr>
<tr><td>Next catalyst</td><td>US PCE inflation index, Wednesday; Fed meeting 8-9 December</td></tr>
</table>

<h2>What happened in the markets</h2>

<p>Stocks had tumbled again on Friday, ending the week sharply lower and sending the S&P 500 past the 10% decline that confirms a correction, the first since March 2025, <a href="https://www.reuters.com/business/finance/correction-or-deeper-reckoning-investors-seek-signs-us-stock-selling-will-abate-2026-11-22/">Reuters</a> reported. The tech-heavy Nasdaq lost 10% in the week, its largest weekly drop since the pandemic panic of March 2020, and had given up its year-to-date gain by Friday — Monday's rebound put it back up 3.6% for the year. The Philadelphia semiconductor index fell 10% on Friday alone, and Taiwanese shares were down 17% for the week.</p>

<p>Monday turned it around. Nvidia shares leapt 31% to $165.05, their best day since May 2003, adding about $952 billion in market value — the largest one-day gain by any US company on record, according to the Wall Street Journal. The Nasdaq jumped 6.51% and the S&P 500 surged 4.73%, both their best days since 9 April 2025. The Dow rose 1,448 points, or 3.01%, to 49,595.31. As of Monday's close the S&P 500 was down 7.4% from its 6 October peak — out of correction territory — while the Nasdaq was still down 12.7% from its peak.</p>

<p>The trigger is the AI trade. The question that investors are asking is whether all that money (a lot of it leverage) being spent on data centres to run the AI is going to generate returns quickly enough to service the debt and/or is going to be large enough to justify the high stock prices, <a href="https://www.reuters.com/world/china/global-markets-global-markets-2026-11-22/">Reuters</a> reported. The start of the Fed's rate hikes has added to the anxiety and with the expectation of another 25bps next month we're seeing the dollar up to a 19 month high. Political uncertainty is also in the mix: <a href="https://www.reuters.com/world/china/global-markets-view-europe-2026-11-23/">Reuters</a> noted markets are weighing new questions over the Dems' massive mid-term win.</p>

<h2>What the AI stock selloff means for jobs</h2>

<p>A correction in AI shares is relevant to the hiring story as AI has been the driver of the last two years of tech hiring. The data centre build, the chip manufacture and the AI software are all on the same stream of cheap capital and that stream is now in doubt. If funding tightens, the hiring slowdown that is already apparent at the big tech firms is likely to spread to the suppliers in Taiwan and South Korea where the governments are now in a panic to protect their own markets and their retail investor bases. Seoul and Taipei are under pressure to step in and Beijing's own failure to stabilise its markets suggests they will have little joy, according to Reuters Breakingviews.</p>

<p>There is also a rotation that people in the job market need to be aware of: as the AI heavy markets have been in freefall, foreign investors have actually poured over $1bn into Indian equities on Friday alone and the Nifty 50 is up nearly 12% this month. Money is definitely leaving US tech, it hasn't just vanished. For the wider picture on the chip industry woes, check out Growentix's piece on <a href="https://growentix.cloud/articles/nvidia-shares-seventh-day-fall-sec-probe-20261123">Nvidia's seventh day in a row of share falls</a> and their country-by-country breakdown of how the <a href="https://growentix.cloud/countries">country's hub</a> for how market moves are affecting hiring.</p>

<h2>What the sources do not say</h2>

<p>No source puts a single verified dollar total on the selloff. A figure of $6 trillion wiped out over 45 days is circulating on social media and was repeated by President Trump, who blamed Democrats for the decline, but Reuters or market data providers have not published it, so it is not used here as a fact. The sources also do not say the selloff is over: Monday was the best day since April, but the Nasdaq is still more than 12% below its October peak, and the questions about AI spending, chip exports and the Federal Reserve have not gone away. The next test is Wednesday's US personal consumption expenditures price index, which could shape how much further the Federal Reserve raises rates.</p>

<p>Sources: <a href="https://www.wsj.com/finance/stocks/u-s-stocks-jump-as-huang-return-triggers-ai-rally-7c008308">the Wall Street Journal</a> and <a href="https://www.investopedia.com/stock-market-today-dow-jones-s-and-p-500-nasdaq-11232026-12274147">Investopedia</a> for Monday's closes and the Nvidia gain; <a href="https://www.reuters.com/business/finance/correction-or-deeper-reckoning-investors-seek-signs-us-stock-selling-will-abate-2026-11-22/">Reuters</a> for the correction, the losing streak and the Nasdaq figures; <a href="https://www.reuters.com/world/china/global-markets-global-markets-2026-11-22/">Reuters</a> for the Asian falls; <a href="https://www.reuters.com/world/china/global-markets-view-europe-2026-11-23/">Reuters</a> for the data-centre spending doubts and the Fed outlook.</p>

<h2>Frequently asked questions</h2>
<h3>Is the US stock market still in a correction?</h3>
<p>The S&P 500 is not — Monday's 4.73% jump took it to 7,237.17, only 7.4% below its 6 October peak. The Nasdaq is still down 12.7% from its peak, so by the 10% definition it remains in correction territory.</p>
<h3>Why are AI stocks falling?</h3>
<p>Investors doubt whether heavy, largely debt-funded spending on AI data centres will earn returns fast enough, and Federal Reserve rate hikes have added pressure on risk assets. Monday's rally was driven by Nvidia bringing back Jensen Huang, not by those doubts going away.</p>
$$,
$$<p>The AI stock selloff reversed in a single session on Monday, after Nvidia's board reinstated Jensen Huang as chief executive before the open. The S&P 500 jumped 4.7% to 7,237.17, climbing out of the correction it had entered last week, while the Nasdaq surged 6.5% — the best day for both benchmarks since April 2025. Investors are now asking whether the six-week slide in technology shares has finally found its floor, or whether one day of relief changes nothing about the doubts behind it.</p>

<table>
<tr><td>Event</td><td>US stock market rebound; S&P 500 exits correction</td></tr>
<tr><td>S&P 500</td><td>Up 4.73% on Monday to 7,237.17; had been down 11.6% from its 6 October all-time high</td></tr>
<tr><td>Nasdaq</td><td>Up 6.51% on Monday to 24,089.56; had lost 10% the previous week</td></tr>
<tr><td>Dow</td><td>Up 3.01% on Monday to 49,595.31</td></tr>
<tr><td>Nvidia</td><td>Up 31.48% on Monday to $165.05, about $952 billion added</td></tr>
<tr><td>Losing streak before</td><td>S&P 500 fell for seven straight sessions, longest since 2020</td></tr>
<tr><td>Volatility</td><td>VIX closed at 35.89 on Friday; fell to 26.62 on Monday</td></tr>
<tr><td>Asia</td><td>Taiwan shares down 17% in the week, biggest fall since 1990</td></tr>
<tr><td>Next catalyst</td><td>US PCE inflation index, Wednesday; Fed meeting 8-9 December</td></tr>
</table>

<h2>What happened in the markets</h2>

<p>Stocks had tumbled again on Friday, ending the week sharply lower and sending the S&P 500 past the 10% decline that confirms a correction, the first since March 2025, <a href="https://www.reuters.com/business/finance/correction-or-deeper-reckoning-investors-seek-signs-us-stock-selling-will-abate-2026-11-22/">Reuters</a> reported. The tech-heavy Nasdaq lost 10% in the week, its largest weekly drop since the pandemic panic of March 2020, and had given up its year-to-date gain by Friday — Monday's rebound put it back up 3.6% for the year. The Philadelphia semiconductor index fell 10% on Friday alone, and Taiwanese shares were down 17% for the week.</p>

<p>Monday turned it around. Nvidia shares leapt 31% to $165.05, their best day since May 2003, adding about $952 billion in market value — the largest one-day gain by any US company on record, according to the Wall Street Journal. The Nasdaq jumped 6.51% and the S&P 500 surged 4.73%, both their best days since 9 April 2025. The Dow rose 1,448 points, or 3.01%, to 49,595.31. As of Monday's close the S&P 500 was down 7.4% from its 6 October peak — out of correction territory — while the Nasdaq was still down 12.7% from its peak.</p>

<p>The trigger is the AI trade. The question that investors are asking is whether all that money (a lot of it leverage) being spent on data centres to run the AI is going to generate returns quickly enough to service the debt and/or is going to be large enough to justify the high stock prices, <a href="https://www.reuters.com/world/china/global-markets-global-markets-2026-11-22/">Reuters</a> reported. The start of the Fed's rate hikes has added to the anxiety and with the expectation of another 25bps next month we're seeing the dollar up to a 19 month high. Political uncertainty is also in the mix: <a href="https://www.reuters.com/world/china/global-markets-view-europe-2026-11-23/">Reuters</a> noted markets are weighing new questions over the Dems' massive mid-term win.</p>

<h2>What the AI stock selloff means for jobs</h2>

<p>A correction in AI shares is relevant to the hiring story as AI has been the driver of the last two years of tech hiring. The data centre build, the chip manufacture and the AI software are all on the same stream of cheap capital and that stream is now in doubt. If funding tightens, the hiring slowdown that is already apparent at the big tech firms is likely to spread to the suppliers in Taiwan and South Korea where the governments are now in a panic to protect their own markets and their retail investor bases. Seoul and Taipei are under pressure to step in and Beijing's own failure to stabilise its markets suggests they will have little joy, according to Reuters Breakingviews.</p>

<p>There is also a rotation that people in the job market need to be aware of: as the AI heavy markets have been in freefall, foreign investors have actually poured over $1bn into Indian equities on Friday alone and the Nifty 50 is up nearly 12% this month. Money is definitely leaving US tech, it hasn't just vanished. For the wider picture on the chip industry woes, check out Growentix's piece on <a href="https://growentix.cloud/articles/nvidia-shares-seventh-day-fall-sec-probe-20261123">Nvidia's seventh day in a row of share falls</a> and their country-by-country breakdown of how the <a href="https://growentix.cloud/countries">country's hub</a> for how market moves are affecting hiring.</p>

<h2>What the sources do not say</h2>

<p>No source puts a single verified dollar total on the selloff. A figure of $6 trillion wiped out over 45 days is circulating on social media and was repeated by President Trump, who blamed Democrats for the decline, but Reuters or market data providers have not published it, so it is not used here as a fact. The sources also do not say the selloff is over: Monday was the best day since April, but the Nasdaq is still more than 12% below its October peak, and the questions about AI spending, chip exports and the Federal Reserve have not gone away. The next test is Wednesday's US personal consumption expenditures price index, which could shape how much further the Federal Reserve raises rates.</p>

<p>Sources: <a href="https://www.wsj.com/finance/stocks/u-s-stocks-jump-as-huang-return-triggers-ai-rally-7c008308">the Wall Street Journal</a> and <a href="https://www.investopedia.com/stock-market-today-dow-jones-s-and-p-500-nasdaq-11232026-12274147">Investopedia</a> for Monday's closes and the Nvidia gain; <a href="https://www.reuters.com/business/finance/correction-or-deeper-reckoning-investors-seek-signs-us-stock-selling-will-abate-2026-11-22/">Reuters</a> for the correction, the losing streak and the Nasdaq figures; <a href="https://www.reuters.com/world/china/global-markets-global-markets-2026-11-22/">Reuters</a> for the Asian falls; <a href="https://www.reuters.com/world/china/global-markets-view-europe-2026-11-23/">Reuters</a> for the data-centre spending doubts and the Fed outlook.</p>

<h2>Frequently asked questions</h2>
<h3>Is the US stock market still in a correction?</h3>
<p>The S&P 500 is not — Monday's 4.73% jump took it to 7,237.17, only 7.4% below its 6 October peak. The Nasdaq is still down 12.7% from its peak, so by the 10% definition it remains in correction territory.</p>
<h3>Why are AI stocks falling?</h3>
<p>Investors doubt whether heavy, largely debt-funded spending on AI data centres will earn returns fast enough, and Federal Reserve rate hikes have added pressure on risk assets. Monday's rally was driven by Nvidia bringing back Jensen Huang, not by those doubts going away.</p>
$$,
ARRAY['https://www.reuters.com/business/view-nvidia-reinstates-jensen-huang-ceo-igniting-tech-surge-2026-11-23/', 'https://www.wsj.com/finance/stocks/u-s-stocks-jump-as-huang-return-triggers-ai-rally-7c008308', 'https://www.investopedia.com/stock-market-today-dow-jones-s-and-p-500-nasdaq-11232026-12274147', 'https://www.reuters.com/business/finance/correction-or-deeper-reckoning-investors-seek-signs-us-stock-selling-will-abate-2026-11-22/', 'https://www.reuters.com/world/china/global-markets-global-markets-2026-11-22/', 'https://www.reuters.com/world/china/global-markets-view-europe-2026-11-23/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- balen-shah-modi-talks-outcome-nepal-india-20261124 (news; Nepal; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'balen-shah-modi-talks-outcome-nepal-india-20261124', 'news', 'Nepal',
'Balen Shah Modi talks outcome: ports, rail and package',
'Balen Shah Modi talks outcome: ports, rail and package',
'The Balen Shah Modi talks outcome brings Nepal port access, the Ayodhya–Janakpur rail link and an economic package, per details from New Delhi.',
'The Balen Shah Modi talks outcome brings Nepal port access, the Ayodhya–Janakpur rail link and an economic package, per details from New Delhi.',
$$<p>The Balen Shah Modi talks outcome took shape in New Delhi on Monday 23rd November 2026 as PM Shah held delegation level talks with PM Modi in New Delhi on the second day of his first  visit to India. Details obtained by the media are an economic package, new port access for Nepal and the launch of the Ayodhya-Janakpur rail service.</p>

<table>
<tr><td>Event</td><td>Modi–Balen Shah talks, New Delhi</td></tr>
<tr><td>Date</td><td>23 November 2026</td></tr>
<tr><td>Venue</td><td>Hyderabad House, after a ceremonial welcome at Rashtrapati Bhavan</td></tr>
<tr><td>Outcome 1</td><td>Special economic package for Nepal (amount not disclosed)</td></tr>
<tr><td>Outcome 2</td><td>Port access at Kandla (Gujarat) and Paradip (Odisha)</td></tr>
<tr><td>Outcome 3</td><td>Ayodhya–Janakpur rail service, named Saryu Kamala Express</td></tr>
<tr><td>Visit</td><td>22–23 November 2026; Shah flies back Monday evening</td></tr>
</table>

<h2>What happened in the Balen Shah Modi talks</h2>

<p>Shah was given a ceremonial welcome and a guard of honour at Rashtrapati Bhavan where Modi greeted him with a hug. The two leaders then sat down with their delegations as reported by <a href="https://www.thestatesman.com/india/nepal-wants-more-than-photo-ops-as-balen-shah-meets-modi-in-new-delhi-1503665816.html">The Statesman</a> reported. Shah also visited the President (Droupadi Murmu) and paid his respects at Rajghat. This is his first visit to India since taking office in March and his first bilateral foreign visit as prime minister.</p>

<p><a href="https://english.onlinekhabar.com/pm-balens-three-major-outcomes.html">OnlineKhabar</a>, citing its own report on the issue, says India is going to give Nepal  a special economic package (the size of which has not been disclosed. Nepal  to the Kandla port (Gujarat) and the Paradip port (Odisha) (Nepal had previously requested access to the Mundra port which India had turned down). The two leaders will also be launching the Ayodhya-Janakpur train (the Saryu Kamala Express). The other components of the package are an agro-industrial park in Chitwan, a motorable bridge from Dharchula to Darchula, laying the foundation stone for the Lower Arun hydel project, a petroleum terminal at Jhapa, the Banbasa-Dodhara Chandani integrated check post and the branch campuses of the IITS in Nepal. A final feasibility study report on a rail link from Kathmandu to Raxaul will also be prepared on extending rail to connect Kathmandu with Raxaul.</p>

<h2>What the Balen Shah Modi talks outcome means for Nepal</h2>

<p>Port access and rail links are the ones that will be of most relevance to Nepali workers and Nepali businesses. The third country trade route via Kandla and Paradip will reduce Nepal's dependence on a single corridor, affecting import costs, the speed of export  and the number of logistics jobs that move goods across the border. The rail projects (Jaynagar-Bardibas, Jogbani-Biratnagar and the proposed Kathmandu-Raxaul link) are all projects which will involve both construction and operations  over a number of years. The Lower Arun  and the Jhapa petroleum terminal are further additions to the number of jobs in the energy sector.</p>

<p>The package itself is the big issue. <a href="https://thehimalayantimes.com/nepal/pm-shah-in-new-delhi-on-maiden-visit-to-india-reportedly-seeking-2b-in-aid">The Himalayan Times has</a> reported that Kathmandu had sought a $2bn package (which would include $1bn in grants) for development projects and for rebuilding in the flash flood areas. That has not been officially announced. India has also put forward a joint vision document on economic cooperation, investment, transit, energy, digital connectivity and health which is due to be announced during the visit. FM Shishir Khanal was  to give a press briefing on the outcome upon the delegation's return to Kathmandu. For the details of the talks as they were being previewed, see Growentix's <a href="https://growentix.cloud/articles/balen-shah-modi-talks-delhi-today-20261123">Balen Shah–Modi talks in Delhi today</a> and the <a href="https://growentix.cloud/countries">country's hub</a> for Nepal-India opportunities.</p>

<h2>What the sources do not say</h2>

<p>There has been no joint statement or formal announcement of the package amount. All the figures cited here are from OnlineKhabar. The $2bn figure is what Nepal reportedly wanted, it's not what India agreed to. The sources don't say when the Kandla/Paradip access will commence, when the Saryu Kamala Express will go into commercial operation or what the IIT branch campuses will actually be. The sources also don't indicate whether Nepal's request for overflight rights over Pokhara and Bhairahawa or for the Kathmandu-Mahendranagar air corridor was accepted. The claim of a $2bn deal having been signed is considerably more than the reporting suggests.</p>

<p>Sources: the three main outcomes and the project details come from <a href="https://english.onlinekhabar.com/pm-balens-three-major-outcomes.html">OnlineKhabar</a>; the $2bn request and the visit schedule were reported by <a href="https://thehimalayantimes.com/nepal/pm-shah-in-new-delhi-on-maiden-visit-to-india-reportedly-seeking-2b-in-aid">The Himalayan Times</a>, while <a href="https://www.thestatesman.com/india/nepal-wants-more-than-photo-ops-as-balen-shah-meets-modi-in-new-delhi-1503665816.html">The Statesman</a> covered the welcome ceremony and the talks themselves.</p>

<h2>Frequently asked questions</h2>
<h3>What did Nepal get out of the Modi-Balen talks?</h3>
<p>Per details obtained by OnlineKhabar: an economic package of some size (size not specified), port access at Kandla and Paradip,  the launch of the Ayodhya-Janakpur rail service and projects in the energy, rail and education sectors.</p>
<h3>Was the $2bn package agreed?</h3>
<p>Not as announced. Nepal reportedly sought $2 billion including $1 billion in grants, but no formal announcement of the amount has been made.</p>
$$,
$$<p>The Balen Shah Modi talks outcome took shape in New Delhi on Monday 23rd November 2026 as PM Shah held delegation level talks with PM Modi in New Delhi on the second day of his first  visit to India. Details obtained by the media are an economic package, new port access for Nepal and the launch of the Ayodhya-Janakpur rail service.</p>

<table>
<tr><td>Event</td><td>Modi–Balen Shah talks, New Delhi</td></tr>
<tr><td>Date</td><td>23 November 2026</td></tr>
<tr><td>Venue</td><td>Hyderabad House, after a ceremonial welcome at Rashtrapati Bhavan</td></tr>
<tr><td>Outcome 1</td><td>Special economic package for Nepal (amount not disclosed)</td></tr>
<tr><td>Outcome 2</td><td>Port access at Kandla (Gujarat) and Paradip (Odisha)</td></tr>
<tr><td>Outcome 3</td><td>Ayodhya–Janakpur rail service, named Saryu Kamala Express</td></tr>
<tr><td>Visit</td><td>22–23 November 2026; Shah flies back Monday evening</td></tr>
</table>

<h2>What happened in the Balen Shah Modi talks</h2>

<p>Shah was given a ceremonial welcome and a guard of honour at Rashtrapati Bhavan where Modi greeted him with a hug. The two leaders then sat down with their delegations as reported by <a href="https://www.thestatesman.com/india/nepal-wants-more-than-photo-ops-as-balen-shah-meets-modi-in-new-delhi-1503665816.html">The Statesman</a> reported. Shah also visited the President (Droupadi Murmu) and paid his respects at Rajghat. This is his first visit to India since taking office in March and his first bilateral foreign visit as prime minister.</p>

<p><a href="https://english.onlinekhabar.com/pm-balens-three-major-outcomes.html">OnlineKhabar</a>, citing its own report on the issue, says India is going to give Nepal  a special economic package (the size of which has not been disclosed. Nepal  to the Kandla port (Gujarat) and the Paradip port (Odisha) (Nepal had previously requested access to the Mundra port which India had turned down). The two leaders will also be launching the Ayodhya-Janakpur train (the Saryu Kamala Express). The other components of the package are an agro-industrial park in Chitwan, a motorable bridge from Dharchula to Darchula, laying the foundation stone for the Lower Arun hydel project, a petroleum terminal at Jhapa, the Banbasa-Dodhara Chandani integrated check post and the branch campuses of the IITS in Nepal. A final feasibility study report on a rail link from Kathmandu to Raxaul will also be prepared on extending rail to connect Kathmandu with Raxaul.</p>

<h2>What the Balen Shah Modi talks outcome means for Nepal</h2>

<p>Port access and rail links are the ones that will be of most relevance to Nepali workers and Nepali businesses. The third country trade route via Kandla and Paradip will reduce Nepal's dependence on a single corridor, affecting import costs, the speed of export  and the number of logistics jobs that move goods across the border. The rail projects (Jaynagar-Bardibas, Jogbani-Biratnagar and the proposed Kathmandu-Raxaul link) are all projects which will involve both construction and operations  over a number of years. The Lower Arun  and the Jhapa petroleum terminal are further additions to the number of jobs in the energy sector.</p>

<p>The package itself is the big issue. <a href="https://thehimalayantimes.com/nepal/pm-shah-in-new-delhi-on-maiden-visit-to-india-reportedly-seeking-2b-in-aid">The Himalayan Times has</a> reported that Kathmandu had sought a $2bn package (which would include $1bn in grants) for development projects and for rebuilding in the flash flood areas. That has not been officially announced. India has also put forward a joint vision document on economic cooperation, investment, transit, energy, digital connectivity and health which is due to be announced during the visit. FM Shishir Khanal was  to give a press briefing on the outcome upon the delegation's return to Kathmandu. For the details of the talks as they were being previewed, see Growentix's <a href="https://growentix.cloud/articles/balen-shah-modi-talks-delhi-today-20261123">Balen Shah–Modi talks in Delhi today</a> and the <a href="https://growentix.cloud/countries">country's hub</a> for Nepal-India opportunities.</p>

<h2>What the sources do not say</h2>

<p>There has been no joint statement or formal announcement of the package amount. All the figures cited here are from OnlineKhabar. The $2bn figure is what Nepal reportedly wanted, it's not what India agreed to. The sources don't say when the Kandla/Paradip access will commence, when the Saryu Kamala Express will go into commercial operation or what the IIT branch campuses will actually be. The sources also don't indicate whether Nepal's request for overflight rights over Pokhara and Bhairahawa or for the Kathmandu-Mahendranagar air corridor was accepted. The claim of a $2bn deal having been signed is considerably more than the reporting suggests.</p>

<p>Sources: the three main outcomes and the project details come from <a href="https://english.onlinekhabar.com/pm-balens-three-major-outcomes.html">OnlineKhabar</a>; the $2bn request and the visit schedule were reported by <a href="https://thehimalayantimes.com/nepal/pm-shah-in-new-delhi-on-maiden-visit-to-india-reportedly-seeking-2b-in-aid">The Himalayan Times</a>, while <a href="https://www.thestatesman.com/india/nepal-wants-more-than-photo-ops-as-balen-shah-meets-modi-in-new-delhi-1503665816.html">The Statesman</a> covered the welcome ceremony and the talks themselves.</p>

<h2>Frequently asked questions</h2>
<h3>What did Nepal get out of the Modi-Balen talks?</h3>
<p>Per details obtained by OnlineKhabar: an economic package of some size (size not specified), port access at Kandla and Paradip,  the launch of the Ayodhya-Janakpur rail service and projects in the energy, rail and education sectors.</p>
<h3>Was the $2bn package agreed?</h3>
<p>Not as announced. Nepal reportedly sought $2 billion including $1 billion in grants, but no formal announcement of the amount has been made.</p>
$$,
ARRAY['https://english.onlinekhabar.com/pm-balens-three-major-outcomes.html', 'https://thehimalayantimes.com/nepal/pm-shah-in-new-delhi-on-maiden-visit-to-india-reportedly-seeking-2b-in-aid', 'https://www.thestatesman.com/india/nepal-wants-more-than-photo-ops-as-balen-shah-meets-modi-in-new-delhi-1503665816.html'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- bangladesh-garment-losses-428-million-20261124 (news; Bangladesh; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'bangladesh-garment-losses-428-million-20261124', 'news', 'Bangladesh',
'Bangladesh garment losses hit $428 million in 18 days',
'Bangladesh garment losses hit $428 million in 18 days',
'Bangladesh garment losses hit $428 million in 18 days of unrest, with buyers shifting $254 million of orders abroad, the BGMEA survey says.',
'Bangladesh garment losses hit $428 million in 18 days of unrest, with buyers shifting $254 million of orders abroad, the BGMEA survey says.',
$$<p>Bangladesh garment losses are $428m in just 18 days of labour unrest (BGMEA figure released on Sunday 22 November 2026, with international buyers shifting a further $254 million of confirmed orders to other countries. That's the figure for only part of an industry which employs millions and is the supplier of the world's largest clothing brands.</p>

<table>
<tr><td>Event</td><td>Labour unrest and the losses it caused across Bangladesh's garment sector</td></tr>
<tr><td>Period</td><td>From 1 to 18 November 2026</td></tr>
<tr><td>Production loss</td><td>Production worth $428 million at free on board value was lost across the 317 factories surveyed</td></tr>
<tr><td>Orders shifted abroad</td><td>Orders worth $254 million — 59 million pieces of clothing — were moved to other countries</td></tr>
<tr><td>Factories affected</td><td>More than 600 factories were affected, with 317 of them taking part in the survey</td></tr>
<tr><td>Combined loss</td><td>A combined $682 million once the production losses and the shifted orders are added together</td></tr>
<tr><td>Workers' demand</td><td>A monthly minimum wage set at Tk30,000</td></tr>
</table>

<h2>What happened in Bangladesh's garment sector</h2>

<p>The Bangladesh Garment Manufacturers and Exporters Association (BGMEA) conducted an emergency four-day survey of its member factories to assess the damage following the unrest which had started on 31st October with workers demanding a minimum monthly  wage of Tk30,000. Of the 317 factories that responded, production had ceased for between one and 16 days between 1 and 18 November, <a href="https://unb.com.bd/category/Business/rmg-unrest-costs-317-factories-428m-in-18-days-orders-worth-254m-shifted-elsewhere-bgmea/201021">UNB</a> reported. The unrest then spread to the industrial belts of Gazipur, Ashulia and Savar in early November.</p>

<p>The damage goes beyond the closed factories. Buyers have already moved 59m pieces of confirmed orders (some $254m) to other countries as a result of the instability and the BGMEA said the survey captured only a partial picture: more than 600 member factories have been impacted and of those only 317 were able to participate in the very short window of the survey. The instability has continued right through past the 18th November. <a href="https://www.thedailystar.net/business/economy/news/garment-unrest-costs-317-factories-428m-bgmea-4330671">The Daily Star has</a> reported that the BGMEA have actually warned that the full extent of the damage  to  the industry and to the country is still very much ongoing. <a href="https://gulfnews.com/amp/story/world%2Fasia%2Fbangladesh-wage-protests-cost-garment-sector-428-million-trade-body-1.500757087">Gulf News</a> reports that the protests have eased after a government appointed wage board that it will be announcing a new minimum wage next month.</p>

<h2>What the Bangladesh garment losses mean for workers</h2>

<p>Apparel is Bangladesh's single biggest export earner and its largest employer in the formal sector so a $682 million combined hit lands directly on factory employment. When buyers take their orders to Vietnam, Cambodia or India the work goes with them and the factories that lose the orders have to reduce hours, delay recruitment or shut down lines. The timing of the disruption comes in the run up to Christmas when the  Western retailers are going to be placing their biggest orders of the year. The outcome of the wage board decision next month will decide whether the unrest is over or whether it breaks out again. All the parties (the workers, the factory owners and the buyers) are  waiting on it.</p>

<p>For the wider region the  $254m swing in orders warns every garment producing country that  when stability is in doubt buyers move very quickly. The Nepali garment and textile workers are watching the same buyers and the same pressure is being applied to wages across the South Asian factory belts. Anyone following the factory sector jobs will be able to put this into context by reference to Growentix's coverage of <a href="https://growentix.cloud/articles/singapore-q3-2026-retrenchments-4800-20261030">Singapore's Q3 retrenchments</a>, and the <a href="https://growentix.cloud/countries"> hub</a> of manufacturing work in Asia.</p>

<h2>What the sources do not say</h2>

<p>The sources make no comment at all as to how many workers have in fact lost their pay or their jobs. The BGMEA figures are only for factory losses and shifted orders, not for the effect on employment. They give absolutely no indication of what the new minimum wage will be (the wage board has only committed to an announcement next month). There is no information whatsoever as to where the orders have been shifted to or which brands have moved the orders. The claims about the sector having lost a certain overall amount go well beyond what the sources actually say. The BGMEA itself says the $428m and $254m are only a partial picture and the  total is still very much unknown.</p>

<p>Sources: <a href="https://www.thedailystar.net/business/economy/news/garment-unrest-costs-317-factories-428m-bgmea-4330671">The Daily Star</a> reported the BGMEA survey and its warning that the figures are only a partial picture; the survey detail and the closure days come from <a href="https://unb.com.bd/category/Business/rmg-unrest-costs-317-factories-428m-in-18-days-orders-worth-254m-shifted-elsewhere-bgmea/201021">UNB</a>, and <a href="https://gulfnews.com/amp/story/world%2Fasia%2Fbangladesh-wage-protests-cost-garment-sector-428-million-trade-body-1.500757087">Gulf News</a> covered the wage board pledge and the easing of the protests.</p>

<h2>Frequently asked questions</h2>
<h3>How much has the Bangladeshi garment sector lost?</h3>
<p>$428m in production losses at 317 factories from 1st to 18th November alone, plus $254m of orders shifted abroad — a total of $682m. That's the figure the BGMEA says the low end of the real figure.</p>
<h3>Why are Bangladeshi garment workers protesting?</h3>
<p>Workers are calling for a minimum monthly  wage of Tk30,000. A new minimum wage is due from the government-appointed wage board  next month.</p>
$$,
$$<p>Bangladesh garment losses are $428m in just 18 days of labour unrest (BGMEA figure released on Sunday 22 November 2026, with international buyers shifting a further $254 million of confirmed orders to other countries. That's the figure for only part of an industry which employs millions and is the supplier of the world's largest clothing brands.</p>

<table>
<tr><td>Event</td><td>Labour unrest and the losses it caused across Bangladesh's garment sector</td></tr>
<tr><td>Period</td><td>From 1 to 18 November 2026</td></tr>
<tr><td>Production loss</td><td>Production worth $428 million at free on board value was lost across the 317 factories surveyed</td></tr>
<tr><td>Orders shifted abroad</td><td>Orders worth $254 million — 59 million pieces of clothing — were moved to other countries</td></tr>
<tr><td>Factories affected</td><td>More than 600 factories were affected, with 317 of them taking part in the survey</td></tr>
<tr><td>Combined loss</td><td>A combined $682 million once the production losses and the shifted orders are added together</td></tr>
<tr><td>Workers' demand</td><td>A monthly minimum wage set at Tk30,000</td></tr>
</table>

<h2>What happened in Bangladesh's garment sector</h2>

<p>The Bangladesh Garment Manufacturers and Exporters Association (BGMEA) conducted an emergency four-day survey of its member factories to assess the damage following the unrest which had started on 31st October with workers demanding a minimum monthly  wage of Tk30,000. Of the 317 factories that responded, production had ceased for between one and 16 days between 1 and 18 November, <a href="https://unb.com.bd/category/Business/rmg-unrest-costs-317-factories-428m-in-18-days-orders-worth-254m-shifted-elsewhere-bgmea/201021">UNB</a> reported. The unrest then spread to the industrial belts of Gazipur, Ashulia and Savar in early November.</p>

<p>The damage goes beyond the closed factories. Buyers have already moved 59m pieces of confirmed orders (some $254m) to other countries as a result of the instability and the BGMEA said the survey captured only a partial picture: more than 600 member factories have been impacted and of those only 317 were able to participate in the very short window of the survey. The instability has continued right through past the 18th November. <a href="https://www.thedailystar.net/business/economy/news/garment-unrest-costs-317-factories-428m-bgmea-4330671">The Daily Star has</a> reported that the BGMEA have actually warned that the full extent of the damage  to  the industry and to the country is still very much ongoing. <a href="https://gulfnews.com/amp/story/world%2Fasia%2Fbangladesh-wage-protests-cost-garment-sector-428-million-trade-body-1.500757087">Gulf News</a> reports that the protests have eased after a government appointed wage board that it will be announcing a new minimum wage next month.</p>

<h2>What the Bangladesh garment losses mean for workers</h2>

<p>Apparel is Bangladesh's single biggest export earner and its largest employer in the formal sector so a $682 million combined hit lands directly on factory employment. When buyers take their orders to Vietnam, Cambodia or India the work goes with them and the factories that lose the orders have to reduce hours, delay recruitment or shut down lines. The timing of the disruption comes in the run up to Christmas when the  Western retailers are going to be placing their biggest orders of the year. The outcome of the wage board decision next month will decide whether the unrest is over or whether it breaks out again. All the parties (the workers, the factory owners and the buyers) are  waiting on it.</p>

<p>For the wider region the  $254m swing in orders warns every garment producing country that  when stability is in doubt buyers move very quickly. The Nepali garment and textile workers are watching the same buyers and the same pressure is being applied to wages across the South Asian factory belts. Anyone following the factory sector jobs will be able to put this into context by reference to Growentix's coverage of <a href="https://growentix.cloud/articles/singapore-q3-2026-retrenchments-4800-20261030">Singapore's Q3 retrenchments</a>, and the <a href="https://growentix.cloud/countries"> hub</a> of manufacturing work in Asia.</p>

<h2>What the sources do not say</h2>

<p>The sources make no comment at all as to how many workers have in fact lost their pay or their jobs. The BGMEA figures are only for factory losses and shifted orders, not for the effect on employment. They give absolutely no indication of what the new minimum wage will be (the wage board has only committed to an announcement next month). There is no information whatsoever as to where the orders have been shifted to or which brands have moved the orders. The claims about the sector having lost a certain overall amount go well beyond what the sources actually say. The BGMEA itself says the $428m and $254m are only a partial picture and the  total is still very much unknown.</p>

<p>Sources: <a href="https://www.thedailystar.net/business/economy/news/garment-unrest-costs-317-factories-428m-bgmea-4330671">The Daily Star</a> reported the BGMEA survey and its warning that the figures are only a partial picture; the survey detail and the closure days come from <a href="https://unb.com.bd/category/Business/rmg-unrest-costs-317-factories-428m-in-18-days-orders-worth-254m-shifted-elsewhere-bgmea/201021">UNB</a>, and <a href="https://gulfnews.com/amp/story/world%2Fasia%2Fbangladesh-wage-protests-cost-garment-sector-428-million-trade-body-1.500757087">Gulf News</a> covered the wage board pledge and the easing of the protests.</p>

<h2>Frequently asked questions</h2>
<h3>How much has the Bangladeshi garment sector lost?</h3>
<p>$428m in production losses at 317 factories from 1st to 18th November alone, plus $254m of orders shifted abroad — a total of $682m. That's the figure the BGMEA says the low end of the real figure.</p>
<h3>Why are Bangladeshi garment workers protesting?</h3>
<p>Workers are calling for a minimum monthly  wage of Tk30,000. A new minimum wage is due from the government-appointed wage board  next month.</p>
$$,
ARRAY['https://www.thedailystar.net/business/economy/news/garment-unrest-costs-317-factories-428m-bgmea-4330671', 'https://unb.com.bd/category/Business/rmg-unrest-costs-317-factories-428m-in-18-days-orders-worth-254m-shifted-elsewhere-bgmea/201021', 'https://gulfnews.com/amp/story/world%2Fasia%2Fbangladesh-wage-protests-cost-garment-sector-428-million-trade-body-1.500757087'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- delta-flight-delays-thanksgiving-outage-20261124 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'delta-flight-delays-thanksgiving-outage-20261124', 'news', 'USA',
'Delta flight delays Thanksgiving week hit 1,000-plus',
'Delta flight delays Thanksgiving week hit 1,000-plus',
'Delta flight delays Thanksgiving travel after an automation failure grounded weight calculations, delaying more than 1,000 flights on Sunday.',
'Delta flight delays Thanksgiving travel after an automation failure grounded weight calculations, delaying more than 1,000 flights on Sunday.',
$$<p>Delta flight delays were a massive issue for Thanksgiving travel right up to the holiday even starting, as a result of an automation failure on Sunday 22 November 2026 which left the airline unable to automatically calculate aircraft weight and balance. Over 1,000 Delta flights were delayed as ground crews counting bags whilst the engineers worked to get the system.</p>

<table>
<tr><td>Event</td><td>Flights delayed by an automation outage at Delta Air Lines</td></tr>
<tr><td>Date</td><td>Sunday, 22 November 2026</td></tr>
<tr><td>Cause</td><td>The ALIS weight-and-balance automation system failed</td></tr>
<tr><td>Flights delayed</td><td>More than 1,000 flights were delayed, with FlightAware putting the evening figure close to 2,000</td></tr>
<tr><td>Flights cancelled</td><td>Dozens of flights were cancelled, around 2 to 6 per cent of the schedule depending on when the count was taken</td></tr>
<tr><td>Status</td><td>The system was restored on Sunday afternoon, although knock-on delays carried on</td></tr>
<tr><td>Thanksgiving</td><td>Thanksgiving falls on Thursday, 26 November 2026</td></tr>
</table>

<h2>What happened at Delta</h2>

<p>The problem struck the Automated Load Instruction System (ALIS), which plans weight and balance instructions for baggage crews from Delta's operations centre in Atlanta. With the system down, ramp staff had no load worksheets and resorted to manual workarounds to get aircraft departed safely, <a href="https://www.cnn.com/2026/11/22/us/delta-airlines-ground-delay?cid=external-feeds_iluminar_meta">CNN</a> reported. "Right now, it's a system-wide outage for Delta Air Lines," an employee told a pilot in Boston on a radio call captured on Sunday morning. "The ramp isn't really able to load because there is no ramp worksheet in there, so that's what we're doing, we're manually counting bags."</p>

<p>The FAA put in place an hour ground stop for a number of flights into Hartsfield-Jackson Atlanta International Airport (Delta's hub and the world's busiest airport) prior to scaling it back to a ground delay at about 11:30am ET. Delta confirmed on Sunday afternoon that the automation was back up, just not back to normal. <a href="https://www.wsj.com/business/airlines/delta-delays-hundreds-of-flights-over-system-outage-6bbba92c">The WSJ</a> reported over 1,600 Delta flights were delayed on Sunday (roughly half of its mainline schedule) with over 40 cancelled. Delta said approximately 70% of the issues they experienced that day were due to the technical issue with the rest being due to bad weather and ATC constraints in New York and the Northeast. The FAA confirmed the delays were not due to its ATC systems.</p>

<h2>What the Delta flight delays Thanksgiving disruption means for travellers</h2>

<p>What gives this outage its weight is when it happened: right at the start of the busiest travel week in the United States, when more than four million travellers were expected to pass through Atlanta's hub between 19 November and 1 December. Delta apologised and rebooked customers, offering meals, hotel rooms and refunds where flights were cancelled — yet passengers flying through Atlanta on Sunday still faced hours of waiting. Coming a little over a week after a separate technology failure that triggered a nationwide ground stop, the incident points to strain on the technology backbone of US aviation just as holiday demand reaches its peak.</p>

<p>For staff at the airline and at the airport  the outage is a stark reminder of how much of the operation now rests on a single system (when ALIS went down the fallback was people manually counting the bags). Anyone flying this week should check their flight status before they even leave for the airport and allow themselves plenty of time. For the wider picture of aviation tech failures, see Growentix's coverage of the <a href="https://growentix.cloud/articles/united-airlines-tech-outage-flights-delayed-faa-ground-stop-20261118">United Airlines tech outage and the FAA ground stop</a> and the <a href="https://growentix.cloud/countries">US hub</a> for travel and transport.</p>

<h2>What the sources do not say</h2>

<p>Delta have not said what  the failure was. The WSJ has reported  an internal message to staff referring to a 'database issue' with the system which tracks aircraft loading. Delta have not  confirmed this. The sources differ on the exact delay counts because they were taken at different times of day: the Journal reported more than 1,600 delays, while FlightAware's evening figure was around 2,000). Cancellation rates ranged from 2% to 6% depending on when they were taken. The sources don't say how many passengers in total were affected  or whether any compensation beyond rebooking, meals and hotels will be offered.</p>

<p>Sources: the outage, the manual workarounds and the Atlanta ground delay were reported by <a href="https://www.cnn.com/2026/11/22/us/delta-airlines-ground-delay?cid=external-feeds_iluminar_meta">CNN</a>; <a href="https://www.wsj.com/business/airlines/delta-delays-hundreds-of-flights-over-system-outage-6bbba92c">The Wall Street Journal</a> supplied the delay figures and the internal 'database issue' message, while <a href="https://www.arabnews.com/world/automation-system-problem-at-delta-causes-flight-delays-as-americans-travel-for-thanksgiving-3013638">Arab News</a> (via AP) covered the scale of the disruption and Delta's response.</p>

<h2>Frequently asked questions</h2>
<h3>Why were the Delta flights delayed on Sunday?</h3>
<p>An  aircraft weight and balance failed, forcing ground crew whilst the technical team get the system back online.</p>
<h3>Is the Delta system fixed now?</h3>
<p>Delta said on Sunday afternoon that the automation was back online, with a caveat that there could still be some residual delays as a result of the disruption.</p>
$$,
$$<p>Delta flight delays were a massive issue for Thanksgiving travel right up to the holiday even starting, as a result of an automation failure on Sunday 22 November 2026 which left the airline unable to automatically calculate aircraft weight and balance. Over 1,000 Delta flights were delayed as ground crews counting bags whilst the engineers worked to get the system.</p>

<table>
<tr><td>Event</td><td>Flights delayed by an automation outage at Delta Air Lines</td></tr>
<tr><td>Date</td><td>Sunday, 22 November 2026</td></tr>
<tr><td>Cause</td><td>The ALIS weight-and-balance automation system failed</td></tr>
<tr><td>Flights delayed</td><td>More than 1,000 flights were delayed, with FlightAware putting the evening figure close to 2,000</td></tr>
<tr><td>Flights cancelled</td><td>Dozens of flights were cancelled, around 2 to 6 per cent of the schedule depending on when the count was taken</td></tr>
<tr><td>Status</td><td>The system was restored on Sunday afternoon, although knock-on delays carried on</td></tr>
<tr><td>Thanksgiving</td><td>Thanksgiving falls on Thursday, 26 November 2026</td></tr>
</table>

<h2>What happened at Delta</h2>

<p>The problem struck the Automated Load Instruction System (ALIS), which plans weight and balance instructions for baggage crews from Delta's operations centre in Atlanta. With the system down, ramp staff had no load worksheets and resorted to manual workarounds to get aircraft departed safely, <a href="https://www.cnn.com/2026/11/22/us/delta-airlines-ground-delay?cid=external-feeds_iluminar_meta">CNN</a> reported. "Right now, it's a system-wide outage for Delta Air Lines," an employee told a pilot in Boston on a radio call captured on Sunday morning. "The ramp isn't really able to load because there is no ramp worksheet in there, so that's what we're doing, we're manually counting bags."</p>

<p>The FAA put in place an hour ground stop for a number of flights into Hartsfield-Jackson Atlanta International Airport (Delta's hub and the world's busiest airport) prior to scaling it back to a ground delay at about 11:30am ET. Delta confirmed on Sunday afternoon that the automation was back up, just not back to normal. <a href="https://www.wsj.com/business/airlines/delta-delays-hundreds-of-flights-over-system-outage-6bbba92c">The WSJ</a> reported over 1,600 Delta flights were delayed on Sunday (roughly half of its mainline schedule) with over 40 cancelled. Delta said approximately 70% of the issues they experienced that day were due to the technical issue with the rest being due to bad weather and ATC constraints in New York and the Northeast. The FAA confirmed the delays were not due to its ATC systems.</p>

<h2>What the Delta flight delays Thanksgiving disruption means for travellers</h2>

<p>What gives this outage its weight is when it happened: right at the start of the busiest travel week in the United States, when more than four million travellers were expected to pass through Atlanta's hub between 19 November and 1 December. Delta apologised and rebooked customers, offering meals, hotel rooms and refunds where flights were cancelled — yet passengers flying through Atlanta on Sunday still faced hours of waiting. Coming a little over a week after a separate technology failure that triggered a nationwide ground stop, the incident points to strain on the technology backbone of US aviation just as holiday demand reaches its peak.</p>

<p>For staff at the airline and at the airport  the outage is a stark reminder of how much of the operation now rests on a single system (when ALIS went down the fallback was people manually counting the bags). Anyone flying this week should check their flight status before they even leave for the airport and allow themselves plenty of time. For the wider picture of aviation tech failures, see Growentix's coverage of the <a href="https://growentix.cloud/articles/united-airlines-tech-outage-flights-delayed-faa-ground-stop-20261118">United Airlines tech outage and the FAA ground stop</a> and the <a href="https://growentix.cloud/countries">US hub</a> for travel and transport.</p>

<h2>What the sources do not say</h2>

<p>Delta have not said what  the failure was. The WSJ has reported  an internal message to staff referring to a 'database issue' with the system which tracks aircraft loading. Delta have not  confirmed this. The sources differ on the exact delay counts because they were taken at different times of day: the Journal reported more than 1,600 delays, while FlightAware's evening figure was around 2,000). Cancellation rates ranged from 2% to 6% depending on when they were taken. The sources don't say how many passengers in total were affected  or whether any compensation beyond rebooking, meals and hotels will be offered.</p>

<p>Sources: the outage, the manual workarounds and the Atlanta ground delay were reported by <a href="https://www.cnn.com/2026/11/22/us/delta-airlines-ground-delay?cid=external-feeds_iluminar_meta">CNN</a>; <a href="https://www.wsj.com/business/airlines/delta-delays-hundreds-of-flights-over-system-outage-6bbba92c">The Wall Street Journal</a> supplied the delay figures and the internal 'database issue' message, while <a href="https://www.arabnews.com/world/automation-system-problem-at-delta-causes-flight-delays-as-americans-travel-for-thanksgiving-3013638">Arab News</a> (via AP) covered the scale of the disruption and Delta's response.</p>

<h2>Frequently asked questions</h2>
<h3>Why were the Delta flights delayed on Sunday?</h3>
<p>An  aircraft weight and balance failed, forcing ground crew whilst the technical team get the system back online.</p>
<h3>Is the Delta system fixed now?</h3>
<p>Delta said on Sunday afternoon that the automation was back online, with a caveat that there could still be some residual delays as a result of the disruption.</p>
$$,
ARRAY['https://www.cnn.com/2026/11/22/us/delta-airlines-ground-delay?cid=external-feeds_iluminar_meta', 'https://www.wsj.com/business/airlines/delta-delays-hundreds-of-flights-over-system-outage-6bbba92c', 'https://www.arabnews.com/world/automation-system-problem-at-delta-causes-flight-delays-as-americans-travel-for-thanksgiving-3013638'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- democrats-house-majority-258-seats-20261124 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'democrats-house-majority-258-seats-20261124', 'news', 'USA',
'Democrats House majority 258 seats, biggest since 1992',
'Democrats House majority 258 seats, biggest since 1992',
'The Democrats House majority 258 seats is the largest since 1992, after Chuck Hubbard''s North Carolina win gave the party its 258th seat on Sunday.',
'The Democrats House majority 258 seats is the largest since 1992, after Chuck Hubbard''s North Carolina win gave the party its 258th seat on Sunday.',
$$<p>The Democrats' House majority of 258 seats became official on Sunday 22nd November 2026 when NC Democrat Chuck Hubbard defeated Republican incumbent Virginia Foxx to give the party its 258th seat in the US House of Representatives. That's the largest House majority either party has had in the chamber in more than three decades.</p>

<table>
<tr><td>Event</td><td>Democrats reach 258 seats in the US House of Representatives</td></tr>
<tr><td>Date decided</td><td>22 November 2026</td></tr>
<tr><td>Deciding race</td><td>North Carolina's 5th district: Chuck Hubbard defeats Virginia Foxx</td></tr>
<tr><td>Margin</td><td>330 votes, according to the Associated Press</td></tr>
<tr><td>House total</td><td>435 seats; four races still uncalled</td></tr>
<tr><td>Republicans</td><td>At least 173 seats in the minority</td></tr>
<tr><td>Last comparable majority</td><td>258 seats in 1992; 257 in 2008</td></tr>
<tr><td>New Congress sworn in</td><td>3 January 2027</td></tr>
</table>

<h2>What happened in the midterms</h2>

<p>The 258th seat fell after a recount in North Carolina's 5th district, where Hubbard defeated Foxx (who had been in Congress for 11 terms). <a href="https://www.reuters.com/world/us/north-carolina-win-gives-democrats-biggest-us-house-majority-since-early-1990s-2026-11-22/">Reuters</a> reported that the victory was the biggest majority for either party in the House in more than three decades. Four races are still uncalled: one each in MN and TN and two in LA which will go to a December runoff. The Dems also took the Senate with <a href="https://www.aljazeera.com/amp/news/2026/11/22/democrats-win-largest-house-majority-since-1992-with-north-carolina-seat">Al Jazeera</a> reporting they will have 56 seats in the 120th Congress, their largest Senate majority in over a decade.</p>

<p>Reuters put the scale of the win down to voters' frustration — with how President Donald Trump has handled the economy, and with his decision to launch a war against Iran in February, which sent petrol prices sharply higher. Poll after poll had shown voters anxious about the cost of living; a Reuters/Ipsos poll put Trump's approval at 32% in November. Hakeem Jeffries of New York, the House Democratic leader, marked the milestone online. He is widely expected to become the chamber's first Black speaker. "House Democrats have just secured the largest majority any party in Congress has held this century," he wrote.</p>

<h2>What the Democrats' House majority of 258 seats means for jobs and the economy</h2>

<p>The majority matters for workers because the campaign was fought largely on affordability. The Associated Press, carried by <a href="https://www.straitstimes.com/world/united-states/us-democrats-clinch-a-historic-house-majority-of-at-least-258-seats-the-largest-since-1992?ref=latest">The Straits Times</a>, reported that Democrats are under massive pressure to deliver on their affordability agenda they campaigned on, alongside oversight of the Trump administration. Taking control of both chambers in January they'll be in a position to set the House agenda on wages, prices, health costs and the AI-enabled reorganisation of the labour market. A Republican president will still have the veto so it will be divided government that ultimately decides what gets done.</p>

<p>Nothing changes for job seekers and employers just yet — the practical signal here is uncertainty. The same week brought a major selloff in AI stocks and fresh doubts about data centre spending, so markets will now read every Democratic proposal on tax, regulation and tech as the work of a party that won on anger over the cost of living. Readers following how US politics shapes the jobs market can also read Growentix's piece on the <a href="https://growentix.cloud/articles/trump-third-term-22nd-amendment-explained-20261121">debate around a Trump third term</a> and the <a href="https://growentix.cloud/countries">country's hub</a> for how policy is moving market by market.</p>

<h2>What the sources do not say</h2>

<p>The sources don't agree on the precise number of seats the Democrats gained (AP have 44, four more than the 40 picked up in Trump's first midterm in 2018, while Al Jazeera  about 47) although again neither of those figures alters the 214 Democrats hold in the outgoing Congress. Neither figure changes the 258-seat total, but the gain is therefore best viewed as a range until the final four races are called. No one has named the committee chairs or the legislative calendar for January and no one has indicated which of the affordability measures will be the first to be considered. The suggestion that this result will determine the direction of the next two years is clearly going beyond what the reporting has actually said. A Republican president still has the veto and the Louisiana runoffs in December could still add to the Democratic total.</p>

<p>Sources: the 258-seat milestone and the historical comparison come from <a href="https://www.reuters.com/world/us/north-carolina-win-gives-democrats-biggest-us-house-majority-since-early-1990s-2026-11-22/">Reuters</a>; <a href="https://www.aljazeera.com/amp/news/2026/11/22/democrats-win-largest-house-majority-since-1992-with-north-carolina-seat">Al Jazeera</a> reported the recount margin, the Senate result and the approval polling, and <a href="https://www.straitstimes.com/world/united-states/us-democrats-clinch-a-historic-house-majority-of-at-least-258-seats-the-largest-since-1992?ref=latest">The Straits Times</a> (via AP) covered the seats gained and the affordability agenda.</p>

<h2>Frequently asked questions</h2>
<h3>How many seats does the Democratic party have in the House?</h3>
<p>At least 258 of 435 seats, the largest House majority for either party since 1992, with four races still uncalled.</p>
<h3>Who will be the next Speaker of the House?</h3>
<p>House Democratic leader Hakeem Jeffries is expected to become Speaker when the 120th Congress is sworn in on 3 January 2027, making him the chamber's first Black Speaker.</p>
$$,
$$<p>The Democrats' House majority of 258 seats became official on Sunday 22nd November 2026 when NC Democrat Chuck Hubbard defeated Republican incumbent Virginia Foxx to give the party its 258th seat in the US House of Representatives. That's the largest House majority either party has had in the chamber in more than three decades.</p>

<table>
<tr><td>Event</td><td>Democrats reach 258 seats in the US House of Representatives</td></tr>
<tr><td>Date decided</td><td>22 November 2026</td></tr>
<tr><td>Deciding race</td><td>North Carolina's 5th district: Chuck Hubbard defeats Virginia Foxx</td></tr>
<tr><td>Margin</td><td>330 votes, according to the Associated Press</td></tr>
<tr><td>House total</td><td>435 seats; four races still uncalled</td></tr>
<tr><td>Republicans</td><td>At least 173 seats in the minority</td></tr>
<tr><td>Last comparable majority</td><td>258 seats in 1992; 257 in 2008</td></tr>
<tr><td>New Congress sworn in</td><td>3 January 2027</td></tr>
</table>

<h2>What happened in the midterms</h2>

<p>The 258th seat fell after a recount in North Carolina's 5th district, where Hubbard defeated Foxx (who had been in Congress for 11 terms). <a href="https://www.reuters.com/world/us/north-carolina-win-gives-democrats-biggest-us-house-majority-since-early-1990s-2026-11-22/">Reuters</a> reported that the victory was the biggest majority for either party in the House in more than three decades. Four races are still uncalled: one each in MN and TN and two in LA which will go to a December runoff. The Dems also took the Senate with <a href="https://www.aljazeera.com/amp/news/2026/11/22/democrats-win-largest-house-majority-since-1992-with-north-carolina-seat">Al Jazeera</a> reporting they will have 56 seats in the 120th Congress, their largest Senate majority in over a decade.</p>

<p>Reuters put the scale of the win down to voters' frustration — with how President Donald Trump has handled the economy, and with his decision to launch a war against Iran in February, which sent petrol prices sharply higher. Poll after poll had shown voters anxious about the cost of living; a Reuters/Ipsos poll put Trump's approval at 32% in November. Hakeem Jeffries of New York, the House Democratic leader, marked the milestone online. He is widely expected to become the chamber's first Black speaker. "House Democrats have just secured the largest majority any party in Congress has held this century," he wrote.</p>

<h2>What the Democrats' House majority of 258 seats means for jobs and the economy</h2>

<p>The majority matters for workers because the campaign was fought largely on affordability. The Associated Press, carried by <a href="https://www.straitstimes.com/world/united-states/us-democrats-clinch-a-historic-house-majority-of-at-least-258-seats-the-largest-since-1992?ref=latest">The Straits Times</a>, reported that Democrats are under massive pressure to deliver on their affordability agenda they campaigned on, alongside oversight of the Trump administration. Taking control of both chambers in January they'll be in a position to set the House agenda on wages, prices, health costs and the AI-enabled reorganisation of the labour market. A Republican president will still have the veto so it will be divided government that ultimately decides what gets done.</p>

<p>Nothing changes for job seekers and employers just yet — the practical signal here is uncertainty. The same week brought a major selloff in AI stocks and fresh doubts about data centre spending, so markets will now read every Democratic proposal on tax, regulation and tech as the work of a party that won on anger over the cost of living. Readers following how US politics shapes the jobs market can also read Growentix's piece on the <a href="https://growentix.cloud/articles/trump-third-term-22nd-amendment-explained-20261121">debate around a Trump third term</a> and the <a href="https://growentix.cloud/countries">country's hub</a> for how policy is moving market by market.</p>

<h2>What the sources do not say</h2>

<p>The sources don't agree on the precise number of seats the Democrats gained (AP have 44, four more than the 40 picked up in Trump's first midterm in 2018, while Al Jazeera  about 47) although again neither of those figures alters the 214 Democrats hold in the outgoing Congress. Neither figure changes the 258-seat total, but the gain is therefore best viewed as a range until the final four races are called. No one has named the committee chairs or the legislative calendar for January and no one has indicated which of the affordability measures will be the first to be considered. The suggestion that this result will determine the direction of the next two years is clearly going beyond what the reporting has actually said. A Republican president still has the veto and the Louisiana runoffs in December could still add to the Democratic total.</p>

<p>Sources: the 258-seat milestone and the historical comparison come from <a href="https://www.reuters.com/world/us/north-carolina-win-gives-democrats-biggest-us-house-majority-since-early-1990s-2026-11-22/">Reuters</a>; <a href="https://www.aljazeera.com/amp/news/2026/11/22/democrats-win-largest-house-majority-since-1992-with-north-carolina-seat">Al Jazeera</a> reported the recount margin, the Senate result and the approval polling, and <a href="https://www.straitstimes.com/world/united-states/us-democrats-clinch-a-historic-house-majority-of-at-least-258-seats-the-largest-since-1992?ref=latest">The Straits Times</a> (via AP) covered the seats gained and the affordability agenda.</p>

<h2>Frequently asked questions</h2>
<h3>How many seats does the Democratic party have in the House?</h3>
<p>At least 258 of 435 seats, the largest House majority for either party since 1992, with four races still uncalled.</p>
<h3>Who will be the next Speaker of the House?</h3>
<p>House Democratic leader Hakeem Jeffries is expected to become Speaker when the 120th Congress is sworn in on 3 January 2027, making him the chamber's first Black Speaker.</p>
$$,
ARRAY['https://www.reuters.com/world/us/north-carolina-win-gives-democrats-biggest-us-house-majority-since-early-1990s-2026-11-22/', 'https://www.aljazeera.com/amp/news/2026/11/22/democrats-win-largest-house-majority-since-1992-with-north-carolina-seat', 'https://www.straitstimes.com/world/united-states/us-democrats-clinch-a-historic-house-majority-of-at-least-258-seats-the-largest-since-1992?ref=latest'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jensen-huang-rehire-trump-nvidia-20261124 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jensen-huang-rehire-trump-nvidia-20261124', 'news', 'USA',
'Jensen Huang rehire: Nvidia board reinstates CEO',
'Jensen Huang rehire: Nvidia board reinstates CEO',
'Nvidia''s board has unanimously reinstated Jensen Huang as president and CEO, 11 days after he resigned — a reversal that sent shares up 33%.',
'Nvidia''s board has unanimously reinstated Jensen Huang as president and CEO, 11 days after he resigned — a reversal that sent shares up 33%.',
$$<p>The Jensen Huang rehire is done. Nvidia's board voted unanimously on Monday 23 November 2026 to reinstate him as president, chief executive and board director, effective immediately — 11 days after he resigned and days after the board said it did not intend to bring him back. US President Donald Trump, who had pressed the board to rehire him on Sunday, called it "the correct and proper decision".</p>

<table>
<tr><td>Event</td><td>Nvidia board reinstates Jensen Huang as president, CEO and board director</td></tr>
<tr><td>Date</td><td>23 November 2026, effective immediately</td></tr>
<tr><td>Vote</td><td>Unanimous, after a series of discussions and meetings with Huang</td></tr>
<tr><td>Who</td><td>President Donald Trump; Jensen Huang; board chairman Harvey Jones</td></tr>
<tr><td>Board position before</td><td>Chairman Harvey Jones had said Nvidia would not rehire Huang</td></tr>
<tr><td>Interim CEO</td><td>Colette Kress returns to chief financial officer full-time</td></tr>
<tr><td>Huang resigned</td><td>12 November 2026, after affair revelations</td></tr>
<tr><td>Shares</td><td>Nvidia up 33% in early trading; closed up 31.5% at $165.05</td></tr>
</table>

<h2>What happened with Jensen Huang and Nvidia</h2>

<p>Trump's Sunday post on Truth Social was his second intervention in three days. On Friday he'd been at a White House press conference where he said he'd like Huang to issue an apology and come back, stating "we're a country of second chances" and that Huang was "one of the truly most brilliant minds in the world". <a href="https://www.cnbctv18.com/technology/trump-urges-nvidia-to-take-back-jensen-huang-as-bessent-softens-call-for-outside-ceo-20039700.htm">CNBC-TV18</a> reported that he'd also said he had discussed the matter with Chinese President Xi Jinping in Shenzhen earlier in the week on the subject. Trump had already indicated his willingness for Huang to return on the 16th November when he was speaking to the press at the time and said he "would certainly not mind seeing that".</p>

<p>The board's answer on Monday was a complete reversal. <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> reported that the board said it had received input from senior levels of the United States government and was "confident that Mr. Huang's reinstatement poses no national security risk". Chairman Harvey Jones said the board was satisfied with Huang's candour and ability to lead, and that his return was "in the best interests of our stockholders, employees, partners and customers". Just last week Jones had told investors on the earnings call that the board had "unanimously accepted" Huang's resignation and "does not intend to reinstate Jensen as CEO". Semafor had reported that a group of directors were in fact still advocating for his return and that Arm's Rene Haas and Marvell's Matt Murphy were both being considered as potential successors. Huang resigned on 12 November following the revelations of extramarital relationships, including one with Alice Huang, a Chinese businesswoman. <a href="https://www.reuters.com/technology/alice-huang-touch-with-chinese-spy-agency-during-affair-with-nvidia-ceo-nyt-says-2026-11-23/">Reuters</a>, reporting the New York Times, said Alice Huang remained in contact with an officer from China's Ministry of State Security from Spring 2025 through to Autumn 2026. Trump administration officials have repeatedly stated that they have not yet concluded that Alice Huang spied for China.</p>

<p>"I am honored to return to NVIDIA and lead one of the most consequential technology companies in the world at the beginning of a new industrial revolution," Huang said in the company's announcement, adding that he took the responsibility "with the greatest humility and renewed commitment". <a href="https://www.aljazeera.com/economy/2026/11/23/nvidia-board-reinstates-jensen-huang-as-ceo">Al Jazeera</a> reported that Colette Kress, who served as interim chief executive, will continue as chief financial officer.</p>

<h2>What the Jensen Huang rehire push means for AI jobs</h2>

<p>The return matters beyond one boardroom as Nvidia is at the very heart of the AI build-out and that in turn has driven the hiring in the chips, data centres and software space. Treasury Secretary Scott Bessent told <a href="https://www.reuters.com/world/china/us-seeks-answers-nvidias-sale-chips-china-bessent-says-2026-11-22/">Reuters</a> the US is seeking answers from Nvidia as to the nature of its chip sales to China and is asking who was in charge of compliance at the company which was previously led by Huang. He also said the board is in the process of working out what happened. Bessent has also slightly retracted from his earlier statement that a "dramatic shake-up" was required and that an outside successor was required, stating that the administration is no longer pushing for a complete shake-up.</p>

<p>For the AI workers out there the leadership question is now settled, and that in itself is a hiring signal. A company searching for a permanent CEO whilst its shares slide and Washington is tightening the screws on chip exports is not going to expand aggressively until that is sorted — and on Monday the market answered the question in the loudest possible way, with Nvidia shares up 31% and the wider AI trade rallying with them. It's a very clear illustration of how quickly a personal scandal can become a national security and jobs story when the company involved controls the hardware the entire industry runs on. Growentix have been tracking that story from the very start (the <a href="https://growentix.cloud/articles/nvidia-sec-accounting-probe-huang-senate-testimony-20261122">SEC accounting probe, the Senate testimony</a> etc) and the <a href="https://growentix.cloud/countries">countries hub</a> tracks how US chip policy on the hiring market on a market by market basis.</p>

<h2>What the sources do not say</h2>

<p>The sources do not say what changed the board's mind between the earnings call and Monday, beyond the discussions with Huang and the input from senior levels of government. They do not say whether the succession search is now closed, or what happens to the candidates the board had been considering. One date is inconsistent across the sources: CNBC-TV18 and the Times of India have Huang's resignation on the 12th November, the New York Post has it 13 November, a matter of time zones. There's also no indication at all that Alice Huang spied for China. The NY Times report speaks of contact with a Chinese intelligence officer and US officials have said that no such conclusion has been reached.</p>

<p>Sources: <a href="https://www.reuters.com/business/view-nvidia-reinstates-jensen-huang-ceo-igniting-tech-surge-2026-11-23/">Reuters</a> and <a href="https://www.wsj.com/articles/nvidia-board-reinstates-jensen-huang-as-ceo-a6b49914">the Wall Street Journal</a> for the reinstatement, the unanimous vote and the market surge; <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> and <a href="https://www.aljazeera.com/economy/2026/11/23/nvidia-board-reinstates-jensen-huang-as-ceo">Al Jazeera</a> for the reinstatement and Huang's statement; <a href="https://www.thenationalnews.com/news/us/2026/11/23/trump-calls-on-nvidia-board-to-rehire-jensen-huang-after-scandal/">The National</a> for the Truth Social post; <a href="https://www.cnbctv18.com/technology/trump-urges-nvidia-to-take-back-jensen-huang-as-bessent-softens-call-for-outside-ceo-20039700.htm">CNBC-TV18</a> for Trump's Friday comments and the succession search; <a href="https://www.reuters.com/technology/alice-huang-touch-with-chinese-spy-agency-during-affair-with-nvidia-ceo-nyt-says-2026-11-23/">Reuters</a> for the Alice Huang intelligence; <a href="https://www.reuters.com/world/china/us-seeks-answers-nvidias-sale-chips-china-bessent-says-2026-11-22/">Reuters</a> for Bessent on the Nvidia China chip sales.</p>

<h2>Frequently asked questions</h2>
<h3>Will Nvidia rehire Jensen Huang?</h3>
<p>It already has. The board voted unanimously on Monday 23 November to reinstate him as president, chief executive and board director, effective immediately.</p>
<h3>Who is running Nvidia now?</h3>
<p>Jensen Huang is chief executive again. Colette Kress, who served as interim chief executive, continues as chief financial officer.</p>
$$,
$$<p>The Jensen Huang rehire is done. Nvidia's board voted unanimously on Monday 23 November 2026 to reinstate him as president, chief executive and board director, effective immediately — 11 days after he resigned and days after the board said it did not intend to bring him back. US President Donald Trump, who had pressed the board to rehire him on Sunday, called it "the correct and proper decision".</p>

<table>
<tr><td>Event</td><td>Nvidia board reinstates Jensen Huang as president, CEO and board director</td></tr>
<tr><td>Date</td><td>23 November 2026, effective immediately</td></tr>
<tr><td>Vote</td><td>Unanimous, after a series of discussions and meetings with Huang</td></tr>
<tr><td>Who</td><td>President Donald Trump; Jensen Huang; board chairman Harvey Jones</td></tr>
<tr><td>Board position before</td><td>Chairman Harvey Jones had said Nvidia would not rehire Huang</td></tr>
<tr><td>Interim CEO</td><td>Colette Kress returns to chief financial officer full-time</td></tr>
<tr><td>Huang resigned</td><td>12 November 2026, after affair revelations</td></tr>
<tr><td>Shares</td><td>Nvidia up 33% in early trading; closed up 31.5% at $165.05</td></tr>
</table>

<h2>What happened with Jensen Huang and Nvidia</h2>

<p>Trump's Sunday post on Truth Social was his second intervention in three days. On Friday he'd been at a White House press conference where he said he'd like Huang to issue an apology and come back, stating "we're a country of second chances" and that Huang was "one of the truly most brilliant minds in the world". <a href="https://www.cnbctv18.com/technology/trump-urges-nvidia-to-take-back-jensen-huang-as-bessent-softens-call-for-outside-ceo-20039700.htm">CNBC-TV18</a> reported that he'd also said he had discussed the matter with Chinese President Xi Jinping in Shenzhen earlier in the week on the subject. Trump had already indicated his willingness for Huang to return on the 16th November when he was speaking to the press at the time and said he "would certainly not mind seeing that".</p>

<p>The board's answer on Monday was a complete reversal. <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> reported that the board said it had received input from senior levels of the United States government and was "confident that Mr. Huang's reinstatement poses no national security risk". Chairman Harvey Jones said the board was satisfied with Huang's candour and ability to lead, and that his return was "in the best interests of our stockholders, employees, partners and customers". Just last week Jones had told investors on the earnings call that the board had "unanimously accepted" Huang's resignation and "does not intend to reinstate Jensen as CEO". Semafor had reported that a group of directors were in fact still advocating for his return and that Arm's Rene Haas and Marvell's Matt Murphy were both being considered as potential successors. Huang resigned on 12 November following the revelations of extramarital relationships, including one with Alice Huang, a Chinese businesswoman. <a href="https://www.reuters.com/technology/alice-huang-touch-with-chinese-spy-agency-during-affair-with-nvidia-ceo-nyt-says-2026-11-23/">Reuters</a>, reporting the New York Times, said Alice Huang remained in contact with an officer from China's Ministry of State Security from Spring 2025 through to Autumn 2026. Trump administration officials have repeatedly stated that they have not yet concluded that Alice Huang spied for China.</p>

<p>"I am honored to return to NVIDIA and lead one of the most consequential technology companies in the world at the beginning of a new industrial revolution," Huang said in the company's announcement, adding that he took the responsibility "with the greatest humility and renewed commitment". <a href="https://www.aljazeera.com/economy/2026/11/23/nvidia-board-reinstates-jensen-huang-as-ceo">Al Jazeera</a> reported that Colette Kress, who served as interim chief executive, will continue as chief financial officer.</p>

<h2>What the Jensen Huang rehire push means for AI jobs</h2>

<p>The return matters beyond one boardroom as Nvidia is at the very heart of the AI build-out and that in turn has driven the hiring in the chips, data centres and software space. Treasury Secretary Scott Bessent told <a href="https://www.reuters.com/world/china/us-seeks-answers-nvidias-sale-chips-china-bessent-says-2026-11-22/">Reuters</a> the US is seeking answers from Nvidia as to the nature of its chip sales to China and is asking who was in charge of compliance at the company which was previously led by Huang. He also said the board is in the process of working out what happened. Bessent has also slightly retracted from his earlier statement that a "dramatic shake-up" was required and that an outside successor was required, stating that the administration is no longer pushing for a complete shake-up.</p>

<p>For the AI workers out there the leadership question is now settled, and that in itself is a hiring signal. A company searching for a permanent CEO whilst its shares slide and Washington is tightening the screws on chip exports is not going to expand aggressively until that is sorted — and on Monday the market answered the question in the loudest possible way, with Nvidia shares up 31% and the wider AI trade rallying with them. It's a very clear illustration of how quickly a personal scandal can become a national security and jobs story when the company involved controls the hardware the entire industry runs on. Growentix have been tracking that story from the very start (the <a href="https://growentix.cloud/articles/nvidia-sec-accounting-probe-huang-senate-testimony-20261122">SEC accounting probe, the Senate testimony</a> etc) and the <a href="https://growentix.cloud/countries">countries hub</a> tracks how US chip policy on the hiring market on a market by market basis.</p>

<h2>What the sources do not say</h2>

<p>The sources do not say what changed the board's mind between the earnings call and Monday, beyond the discussions with Huang and the input from senior levels of government. They do not say whether the succession search is now closed, or what happens to the candidates the board had been considering. One date is inconsistent across the sources: CNBC-TV18 and the Times of India have Huang's resignation on the 12th November, the New York Post has it 13 November, a matter of time zones. There's also no indication at all that Alice Huang spied for China. The NY Times report speaks of contact with a Chinese intelligence officer and US officials have said that no such conclusion has been reached.</p>

<p>Sources: <a href="https://www.reuters.com/business/view-nvidia-reinstates-jensen-huang-ceo-igniting-tech-surge-2026-11-23/">Reuters</a> and <a href="https://www.wsj.com/articles/nvidia-board-reinstates-jensen-huang-as-ceo-a6b49914">the Wall Street Journal</a> for the reinstatement, the unanimous vote and the market surge; <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> and <a href="https://www.aljazeera.com/economy/2026/11/23/nvidia-board-reinstates-jensen-huang-as-ceo">Al Jazeera</a> for the reinstatement and Huang's statement; <a href="https://www.thenationalnews.com/news/us/2026/11/23/trump-calls-on-nvidia-board-to-rehire-jensen-huang-after-scandal/">The National</a> for the Truth Social post; <a href="https://www.cnbctv18.com/technology/trump-urges-nvidia-to-take-back-jensen-huang-as-bessent-softens-call-for-outside-ceo-20039700.htm">CNBC-TV18</a> for Trump's Friday comments and the succession search; <a href="https://www.reuters.com/technology/alice-huang-touch-with-chinese-spy-agency-during-affair-with-nvidia-ceo-nyt-says-2026-11-23/">Reuters</a> for the Alice Huang intelligence; <a href="https://www.reuters.com/world/china/us-seeks-answers-nvidias-sale-chips-china-bessent-says-2026-11-22/">Reuters</a> for Bessent on the Nvidia China chip sales.</p>

<h2>Frequently asked questions</h2>
<h3>Will Nvidia rehire Jensen Huang?</h3>
<p>It already has. The board voted unanimously on Monday 23 November to reinstate him as president, chief executive and board director, effective immediately.</p>
<h3>Who is running Nvidia now?</h3>
<p>Jensen Huang is chief executive again. Colette Kress, who served as interim chief executive, continues as chief financial officer.</p>
$$,
ARRAY['https://www.reuters.com/business/view-nvidia-reinstates-jensen-huang-ceo-igniting-tech-surge-2026-11-23/', 'https://www.wsj.com/articles/nvidia-board-reinstates-jensen-huang-as-ceo-a6b49914', 'https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta', 'https://www.aljazeera.com/economy/2026/11/23/nvidia-board-reinstates-jensen-huang-as-ceo', 'https://www.thenationalnews.com/news/us/2026/11/23/trump-calls-on-nvidia-board-to-rehire-jensen-huang-after-scandal/', 'https://www.cnbctv18.com/technology/trump-urges-nvidia-to-take-back-jensen-huang-as-bessent-softens-call-for-outside-ceo-20039700.htm', 'https://www.reuters.com/technology/alice-huang-touch-with-chinese-spy-agency-during-affair-with-nvidia-ceo-nyt-says-2026-11-23/', 'https://www.reuters.com/world/china/us-seeks-answers-nvidias-sale-chips-china-bessent-says-2026-11-22/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- miss-universe-2026-how-to-watch-20261124 (news; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'miss-universe-2026-how-to-watch-20261124', 'news', 'USA',
'Miss Universe 2026 how to watch the finale live',
'Miss Universe 2026 how to watch the finale live',
'Miss Universe 2026 how to watch: the 75th finale airs live from San Juan on Tuesday 24 November at 8pm ET on Telemundo, REELZ and Peacock.',
'Miss Universe 2026 how to watch: the 75th finale airs live from San Juan on Tuesday 24 November at 8pm ET on Telemundo, REELZ and Peacock.',
$$<p>Miss Universe 2026 'how to watch' is the question on everyone's lips as we approach the 75th finale which will be live on Tuesday 24th November 2026 at the Jose Miguel Agrelot Coliseum in San Juan, Puerto Rico. The final airs at 8 pm ET / 5pm PT). There will be 116 delegates in the running and of course reigning Miss Universe Fatima Bosch of Mexico will be crowning her successor at the end of the night.</p>

<table>
<tr><td>Event</td><td>75th Miss Universe grand finale</td></tr>
<tr><td>Date and time</td><td>Tuesday 24 November 2026, 8pm ET / 5pm PT</td></tr>
<tr><td>Venue</td><td>Jose Miguel Agrelot Coliseum, San Juan, Puerto Rico</td></tr>
<tr><td>Delegates</td><td>116 from around the world</td></tr>
<tr><td>Hosts</td><td>Mario Lopez and R'Bonney Gabriel (Miss Universe 2022)</td></tr>
<tr><td>Watch on</td><td>Telemundo, REELZ, Peacock and REELZ+</td></tr>
<tr><td>Outgoing queen</td><td>Fatima Bosch of Mexico</td></tr>
</table>

<h2>What happens at the Miss Universe 2026 finale</h2>

<p>The final night comes after two nights of competition: the National Costume Show on Saturday 21st November and the preliminary competition on Monday 23rd November (6 pm ET on REELZ and  on the Telemundo Entretenimiento YouTube channel, <a href="https://parade.com/news/miss-universe-2026-prelims-begin-tonight-how-to-watch">Parade</a> reported. The finale  will be on Telemundo and REELZ with a stream on Peacock and REELZ+. Telemundo's coverage kicks off at 7pm ET with a pre-show, Celebrando Nuestras Reinas, which will feature the Latina contestants. <a href="https://www.khaleejtimes.com/world/miss-universe-2026-when-and-how-to-watch">Khaleej Times</a> notes that in previous years Gulf viewers  have  been able to watch the show on the official Miss Universe YouTube channel (though that's not  confirmed for this year).</p>

<p>The 75th edition is a big one for the pageant and there will be a special musical performance as part of the celebrations (the artists  to be announced). <a href="https://gulfnews.com/entertainment/miss-universe-2026-contestants-full-list-of-all-116-delegates-chasing-the-crown-1.500757446">Gulf News has</a> published the full list of the 116 delegates (Albania to Venezuela). It notes that bookmakers have listed several Latin American entries as early favourites - that's just the result of the betting markets.</p>

<h2>What Miss Universe 2026 how to watch means for viewers</h2>

<p>The practical point is the time zones. The 8 pm ET start is 5 am on Wednesday 25th November in the UAE and 6.45 am on Wednesday 25th November in Nepal so viewers outside the Americas will be very early indeed or will have to watch a replay. Peacock and REELZ+ have it for those with access to those services and Telemundo and REELZ have it on US TV. If you're checking to see whether it's available in your country then you should check the official Miss Universe channels first as the regional rights vary and some of the streams are geo-blocked.</p>

<p>The finale is also  a jobs story in  economic impact of $80 million to $200 million from the event, with over 1,100 temporary jobs created in the build up to the event. That's the kind of short term hospitality, events and production work that a pageant week does for a host city. For the build up see Growentix's <a href="https://growentix.cloud/articles/miss-universe-2026-finale-november-24-preview-20261123">Miss Universe 2026 finale preview</a> and the <a href="https://growentix.cloud/countries">countries hub</a> for more on the events and work across the Americas.</p>

<h2>What the sources do not say</h2>

<p>No source names a winner, and none can: the result will of course be revealed at the coronation on Tuesday night). It's not clear whether the  Miss Universe YouTube channel will be live streaming the final  outside the US and the Khaleej Times specifically says that hasn't been confirmed for Gulf viewers. No source states who will be performing in the anniversary musical number (the performers are yet to be announced). The betting odds cited in no way are they the coverage are market snapshots, not predictions from the organisers, and should not in any way be read as a forecast of the result.</p>

<p>Sources: <a href="https://parade.com/news/miss-universe-2026-prelims-begin-tonight-how-to-watch">Parade</a> for the date, time, hosts and broadcasters; <a href="https://www.khaleejtimes.com/world/miss-universe-2026-when-and-how-to-watch">Khaleej Times</a> for the schedule and streaming options; <a href="https://gulfnews.com/entertainment/miss-universe-2026-contestants-full-list-of-all-116-delegates-chasing-the-crown-1.500757446">Gulf News</a> for the 116 delegates.</p>

<h2>Frequently asked questions</h2>
<h3>What time is the Miss Universe 2026 finale in Nepal?</h3>
<p>The final is at 8 pm ET on Tuesday 24th November (6.45 am Nepal time on Wednesday 25th November).</p>
<h3>Where can I watch Miss Universe 2026 live?</h3>
<p>On Telemundo and REELZ in the US and available to stream on Peacock and REELZ+. Availability on the official Miss Universe YouTube channel outside the US has not been confirmed.</p>
<h3>Who is hosting Miss Universe 2026?</h3>
<p>Mario Lopez and Miss Universe 2022 R'Bonney Gabriel are hosting the finale in San Juan, Puerto Rico.</p>
$$,
$$<p>Miss Universe 2026 'how to watch' is the question on everyone's lips as we approach the 75th finale which will be live on Tuesday 24th November 2026 at the Jose Miguel Agrelot Coliseum in San Juan, Puerto Rico. The final airs at 8 pm ET / 5pm PT). There will be 116 delegates in the running and of course reigning Miss Universe Fatima Bosch of Mexico will be crowning her successor at the end of the night.</p>

<table>
<tr><td>Event</td><td>75th Miss Universe grand finale</td></tr>
<tr><td>Date and time</td><td>Tuesday 24 November 2026, 8pm ET / 5pm PT</td></tr>
<tr><td>Venue</td><td>Jose Miguel Agrelot Coliseum, San Juan, Puerto Rico</td></tr>
<tr><td>Delegates</td><td>116 from around the world</td></tr>
<tr><td>Hosts</td><td>Mario Lopez and R'Bonney Gabriel (Miss Universe 2022)</td></tr>
<tr><td>Watch on</td><td>Telemundo, REELZ, Peacock and REELZ+</td></tr>
<tr><td>Outgoing queen</td><td>Fatima Bosch of Mexico</td></tr>
</table>

<h2>What happens at the Miss Universe 2026 finale</h2>

<p>The final night comes after two nights of competition: the National Costume Show on Saturday 21st November and the preliminary competition on Monday 23rd November (6 pm ET on REELZ and  on the Telemundo Entretenimiento YouTube channel, <a href="https://parade.com/news/miss-universe-2026-prelims-begin-tonight-how-to-watch">Parade</a> reported. The finale  will be on Telemundo and REELZ with a stream on Peacock and REELZ+. Telemundo's coverage kicks off at 7pm ET with a pre-show, Celebrando Nuestras Reinas, which will feature the Latina contestants. <a href="https://www.khaleejtimes.com/world/miss-universe-2026-when-and-how-to-watch">Khaleej Times</a> notes that in previous years Gulf viewers  have  been able to watch the show on the official Miss Universe YouTube channel (though that's not  confirmed for this year).</p>

<p>The 75th edition is a big one for the pageant and there will be a special musical performance as part of the celebrations (the artists  to be announced). <a href="https://gulfnews.com/entertainment/miss-universe-2026-contestants-full-list-of-all-116-delegates-chasing-the-crown-1.500757446">Gulf News has</a> published the full list of the 116 delegates (Albania to Venezuela). It notes that bookmakers have listed several Latin American entries as early favourites - that's just the result of the betting markets.</p>

<h2>What Miss Universe 2026 how to watch means for viewers</h2>

<p>The practical point is the time zones. The 8 pm ET start is 5 am on Wednesday 25th November in the UAE and 6.45 am on Wednesday 25th November in Nepal so viewers outside the Americas will be very early indeed or will have to watch a replay. Peacock and REELZ+ have it for those with access to those services and Telemundo and REELZ have it on US TV. If you're checking to see whether it's available in your country then you should check the official Miss Universe channels first as the regional rights vary and some of the streams are geo-blocked.</p>

<p>The finale is also  a jobs story in  economic impact of $80 million to $200 million from the event, with over 1,100 temporary jobs created in the build up to the event. That's the kind of short term hospitality, events and production work that a pageant week does for a host city. For the build up see Growentix's <a href="https://growentix.cloud/articles/miss-universe-2026-finale-november-24-preview-20261123">Miss Universe 2026 finale preview</a> and the <a href="https://growentix.cloud/countries">countries hub</a> for more on the events and work across the Americas.</p>

<h2>What the sources do not say</h2>

<p>No source names a winner, and none can: the result will of course be revealed at the coronation on Tuesday night). It's not clear whether the  Miss Universe YouTube channel will be live streaming the final  outside the US and the Khaleej Times specifically says that hasn't been confirmed for Gulf viewers. No source states who will be performing in the anniversary musical number (the performers are yet to be announced). The betting odds cited in no way are they the coverage are market snapshots, not predictions from the organisers, and should not in any way be read as a forecast of the result.</p>

<p>Sources: <a href="https://parade.com/news/miss-universe-2026-prelims-begin-tonight-how-to-watch">Parade</a> for the date, time, hosts and broadcasters; <a href="https://www.khaleejtimes.com/world/miss-universe-2026-when-and-how-to-watch">Khaleej Times</a> for the schedule and streaming options; <a href="https://gulfnews.com/entertainment/miss-universe-2026-contestants-full-list-of-all-116-delegates-chasing-the-crown-1.500757446">Gulf News</a> for the 116 delegates.</p>

<h2>Frequently asked questions</h2>
<h3>What time is the Miss Universe 2026 finale in Nepal?</h3>
<p>The final is at 8 pm ET on Tuesday 24th November (6.45 am Nepal time on Wednesday 25th November).</p>
<h3>Where can I watch Miss Universe 2026 live?</h3>
<p>On Telemundo and REELZ in the US and available to stream on Peacock and REELZ+. Availability on the official Miss Universe YouTube channel outside the US has not been confirmed.</p>
<h3>Who is hosting Miss Universe 2026?</h3>
<p>Mario Lopez and Miss Universe 2022 R'Bonney Gabriel are hosting the finale in San Juan, Puerto Rico.</p>
$$,
ARRAY['https://parade.com/news/miss-universe-2026-prelims-begin-tonight-how-to-watch', 'https://www.khaleejtimes.com/world/miss-universe-2026-when-and-how-to-watch', 'https://gulfnews.com/entertainment/miss-universe-2026-contestants-full-list-of-all-116-delegates-chasing-the-crown-1.500757446'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- nato-emergency-meeting-poland-missiles-20261124 (news; Poland; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'nato-emergency-meeting-poland-missiles-20261124', 'news', 'Poland',
'NATO emergency meeting Poland after missile incursion',
'NATO emergency meeting Poland after missile incursion',
'The NATO emergency meeting Poland requested takes place in Brussels on 23 November, after Russian missiles and a drone crossed into Polish airspace.',
'The NATO emergency meeting Poland requested takes place in Brussels on 23 November, after Russian missiles and a drone crossed into Polish airspace.',
$$<p>The NATO emergency meeting which Poland has called for is in Brussels on Monday 23 November 2026 (three days after the Russian missiles and a drone entered Polish airspace as part of the big Russian attack on Ukraine). The North Atlantic Council will be hearing out Poland's proposals for a more robust eastern flank.</p>

<table>
<tr><td>Event</td><td>Emergency North Atlantic Council meeting on Poland</td></tr>
<tr><td>Date</td><td>23 November 2026</td></tr>
<tr><td>Location</td><td>NATO headquarters, Brussels</td></tr>
<tr><td>Trigger</td><td>Russian missiles and a drone entered Polish airspace on 20 November</td></tr>
<tr><td>Poland represented by</td><td>Deputy Defence Minister Pawel Zalewski</td></tr>
<tr><td>Casualties</td><td>None reported</td></tr>
</table>

<h2>What happened over Poland</h2>

<p>Early on Friday 20th November Polish air defence radars were picking up 11 potential aerial threats en route to the eastern border as part of Russia's bombardment of western Ukraine. Three of the objects did in fact cross into south-eastern Poland and all three came down at three sites: a Russian Kh-101 cruise missile near Nowy Lipowiec in Lublin province, a second suspected missile near Rudnik nad Sanem and a jet drone near Molodycz in Podkarpackie. The <a href="https://www.kyivpost.com/post/90841">Kyiv Post</a> reported the incident. A Swedish JAS 39 Gripen pilot on patrol over Polish airspace received NATO  to shoot down the suspected Kh-101, but chose not to as the weather was too poor for visual confirmation.</p>

<p>NATO Secretary General Mark Rutte described the incursion as a 'dangerous incident' and told the Polish press agency PAP that NATO 'will defend every inch of Polish territory' following a consultation with both the Polish PM Donald Tusk and President Karol Nawrocki. Polish Defence Minister Wladyslaw Kosiniak-Kamysz announced the emergency meeting on Saturday evening, stating that Poland would put forward specific proposals and identify new courses of action. <a href="https://english.nv.ua/nation/russian-missiles-in-poland-nato-to-meet-in-brussels-to-discuss-incident-50661424.html">The New Voice of Ukraine</a> reports that Warsaw is now seeking additional resources from its allies, in the form of increased aerial surveillance and air defence.</p>

<h2>What the NATO emergency meeting Poland called means</h2>

<p>The meeting is all about deterrence, but the practical implications are very real. Poland plans to focus (as <a href="https://eutoday.net/nato-emergency-meeting-brussels/">EU Today</a> reported): its own assessment of how the objects got through, confirmation of political unity from all 32 allies and a series of specific proposals to beef up air defence on the alliance's eastern flank. More surveillance aircraft, more air defence batteries and more troops on the border  means more defence, more logistics and more engineering work in Poland and the Baltics and therefore more demand for the skilled trades that underpin that.</p>

<p>The wider message is that the  spillover risk from the war is now a permanent fixture on the agenda. Tusk has suggested the breach could have been a deliberate provocation by Moscow, a close eye on the escalation, Growentix have already done the piece on the <a href="https://growentix.cloud/articles/russian-missiles-in-poland-nato-20261123">Russian missiles in Poland: NATO responds</a>, and the <a href="https://growentix.cloud/countries">countries hub</a> has the data on how security spending is impacting hiring across Europe.</p>

<h2>What the sources do not say</h2>

<p>The sources don't agree on precisely what the  objects were that crossed the border: the Polish defence ministry stated it was two missiles and one jet drone, while the Podkarpackie governor later indicated the objects may have been one cruise missile and two drones. No one has come forward with the outcome of the Brussels meeting yet so any statement about what NATO has decided would be invented; the meeting takes place on Monday, and its conclusions will be announced after that. There's no information as to whether NATO will formally invoke Article 4 consultations or what specific kit Poland will get. The suggestion that it was an attack on Poland goes well beyond what the sources have said: there were no casualties  and the objects came down during the Russian strike on Ukraine.</p>

<p>Sources: <a href="https://www.kyivpost.com/post/90841">Kyiv Post</a> for Rutte's pledge and the details of the incident; <a href="https://english.nv.ua/nation/russian-missiles-in-poland-nato-to-meet-in-brussels-to-discuss-incident-50661424.html">The New Voice of Ukraine</a> for the meeting announcement and Poland's requests; <a href="https://eutoday.net/nato-emergency-meeting-brussels/">EU Today</a> for the three issues Poland intends to raise.</p>

<h2>Frequently asked questions</h2>
<h3>Why is NATO meeting on Poland?</h3>
<p>Russian missiles and a drone entered Polish airspace on 20 November as part of the attack on Ukraine. Poland has asked the North Atlantic Council to meet to discuss enhanced defences on the eastern flank.</p>
<h3>Was anyone injured as a result of the incursion?</h3>
<p>No, the three objects did come down in south-eastern Poland with no casualties, according to Polish defence officials.</p>
$$,
$$<p>The NATO emergency meeting which Poland has called for is in Brussels on Monday 23 November 2026 (three days after the Russian missiles and a drone entered Polish airspace as part of the big Russian attack on Ukraine). The North Atlantic Council will be hearing out Poland's proposals for a more robust eastern flank.</p>

<table>
<tr><td>Event</td><td>Emergency North Atlantic Council meeting on Poland</td></tr>
<tr><td>Date</td><td>23 November 2026</td></tr>
<tr><td>Location</td><td>NATO headquarters, Brussels</td></tr>
<tr><td>Trigger</td><td>Russian missiles and a drone entered Polish airspace on 20 November</td></tr>
<tr><td>Poland represented by</td><td>Deputy Defence Minister Pawel Zalewski</td></tr>
<tr><td>Casualties</td><td>None reported</td></tr>
</table>

<h2>What happened over Poland</h2>

<p>Early on Friday 20th November Polish air defence radars were picking up 11 potential aerial threats en route to the eastern border as part of Russia's bombardment of western Ukraine. Three of the objects did in fact cross into south-eastern Poland and all three came down at three sites: a Russian Kh-101 cruise missile near Nowy Lipowiec in Lublin province, a second suspected missile near Rudnik nad Sanem and a jet drone near Molodycz in Podkarpackie. The <a href="https://www.kyivpost.com/post/90841">Kyiv Post</a> reported the incident. A Swedish JAS 39 Gripen pilot on patrol over Polish airspace received NATO  to shoot down the suspected Kh-101, but chose not to as the weather was too poor for visual confirmation.</p>

<p>NATO Secretary General Mark Rutte described the incursion as a 'dangerous incident' and told the Polish press agency PAP that NATO 'will defend every inch of Polish territory' following a consultation with both the Polish PM Donald Tusk and President Karol Nawrocki. Polish Defence Minister Wladyslaw Kosiniak-Kamysz announced the emergency meeting on Saturday evening, stating that Poland would put forward specific proposals and identify new courses of action. <a href="https://english.nv.ua/nation/russian-missiles-in-poland-nato-to-meet-in-brussels-to-discuss-incident-50661424.html">The New Voice of Ukraine</a> reports that Warsaw is now seeking additional resources from its allies, in the form of increased aerial surveillance and air defence.</p>

<h2>What the NATO emergency meeting Poland called means</h2>

<p>The meeting is all about deterrence, but the practical implications are very real. Poland plans to focus (as <a href="https://eutoday.net/nato-emergency-meeting-brussels/">EU Today</a> reported): its own assessment of how the objects got through, confirmation of political unity from all 32 allies and a series of specific proposals to beef up air defence on the alliance's eastern flank. More surveillance aircraft, more air defence batteries and more troops on the border  means more defence, more logistics and more engineering work in Poland and the Baltics and therefore more demand for the skilled trades that underpin that.</p>

<p>The wider message is that the  spillover risk from the war is now a permanent fixture on the agenda. Tusk has suggested the breach could have been a deliberate provocation by Moscow, a close eye on the escalation, Growentix have already done the piece on the <a href="https://growentix.cloud/articles/russian-missiles-in-poland-nato-20261123">Russian missiles in Poland: NATO responds</a>, and the <a href="https://growentix.cloud/countries">countries hub</a> has the data on how security spending is impacting hiring across Europe.</p>

<h2>What the sources do not say</h2>

<p>The sources don't agree on precisely what the  objects were that crossed the border: the Polish defence ministry stated it was two missiles and one jet drone, while the Podkarpackie governor later indicated the objects may have been one cruise missile and two drones. No one has come forward with the outcome of the Brussels meeting yet so any statement about what NATO has decided would be invented; the meeting takes place on Monday, and its conclusions will be announced after that. There's no information as to whether NATO will formally invoke Article 4 consultations or what specific kit Poland will get. The suggestion that it was an attack on Poland goes well beyond what the sources have said: there were no casualties  and the objects came down during the Russian strike on Ukraine.</p>

<p>Sources: <a href="https://www.kyivpost.com/post/90841">Kyiv Post</a> for Rutte's pledge and the details of the incident; <a href="https://english.nv.ua/nation/russian-missiles-in-poland-nato-to-meet-in-brussels-to-discuss-incident-50661424.html">The New Voice of Ukraine</a> for the meeting announcement and Poland's requests; <a href="https://eutoday.net/nato-emergency-meeting-brussels/">EU Today</a> for the three issues Poland intends to raise.</p>

<h2>Frequently asked questions</h2>
<h3>Why is NATO meeting on Poland?</h3>
<p>Russian missiles and a drone entered Polish airspace on 20 November as part of the attack on Ukraine. Poland has asked the North Atlantic Council to meet to discuss enhanced defences on the eastern flank.</p>
<h3>Was anyone injured as a result of the incursion?</h3>
<p>No, the three objects did come down in south-eastern Poland with no casualties, according to Polish defence officials.</p>
$$,
ARRAY['https://www.kyivpost.com/post/90841', 'https://english.nv.ua/nation/russian-missiles-in-poland-nato-to-meet-in-brussels-to-discuss-incident-50661424.html', 'https://eutoday.net/nato-emergency-meeting-brussels/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- serbia-four-day-work-week-20261124 (news; Serbia; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'serbia-four-day-work-week-20261124', 'news', 'Serbia',
'Serbia four-day work week plan after student-led win',
'Serbia four-day work week plan after student-led win',
'The Serbia four-day work week plan would cut hours to 32 with no pay cut, alongside a 45-minute daily cap on reality TV, the new government says.',
'The Serbia four-day work week plan would cut hours to 32 with no pay cut, alongside a 45-minute daily cap on reality TV, the new government says.',
$$<p>The Serbia four-day work week is on the agenda of the country's new student-led government, which plans to encourage companies to reduce their working week to 32 hours without any reduction in pay. The proposal sits alongside a cap on reality TV and a raft of workers' rights reforms. A very clear break from   Aleksandar Vucic.</p>

<table>
<tr><td>Event</td><td>Serbia's new government proposes a four-day working week</td></tr>
<tr><td>Proposed hours</td><td>32 hours a week, with no pay cut</td></tr>
<tr><td>Who proposed it</td><td>The Student List, which won 140 of 250 parliamentary seats in October</td></tr>
<tr><td>Other proposals</td><td>Reality TV capped at 45 minutes a day; 8-hour weekly overtime cap</td></tr>
<tr><td>Status</td><td>Proposals, not law; no prime ministerial candidate named yet</td></tr>
</table>

<h2>What happened in Serbia</h2>

<p>The Student List (a loose coalition of 'political outsiders' put forward by the students) brought down Aleksandar Vucic's government  in October, winning 140 of the 250 seats in parliament in the snap elections of 25 October, <a href="https://www.timesnownews.com/world/serbias-student-led-government-wants-reality-tv-capped-at-45-minutes-and-a-four-day-work-week-article-156551672/amp">Times Now</a> reported, citing The Sunday Telegraph). The movement emerged from the protests that followed the collapse of a concrete canopy at the Novi Sad railway station in November 2024 which resulted in 16 deaths and which in turn triggered huge demonstrations over corruption.</p>

<p>The  proposals go well beyond the headline. The movement wants to see companies  adopt a four-day week, cutting hours to 32 without reducing pay, and to improve workers' rights with a cap of eight hours of overtime a week, tighter rules on fixed term contracts and a ban on managers contacting staff outside of working hours. On TV the plan would see reality shows  banned from the free to air national channels before 11 pm and limited to 45 minutes a day, while popular programmes such as Elita would be available on the subscription services). <a href="https://firstbalkanmedia.com/2026/11/11/serbias-student-list-proposes-45-minute-daily-cap-on-reality-tv/">First Balkan Media</a> reports the plan would also require the national channels to devote at least 30% of their airtime to educational, cultural, documentary and children's programming.</p>

<h2>What the Serbia four-day work week plan means for workers</h2>

<p>If it becomes law Serbia would be joining the very small number of countries testing shorter weeks at full pay and that would be a massive development for  employers and unions right across Europe. The Vucic era was predicated on the back of cheap labour to attract foreign investment and a 32 hour week with a right to disconnect would be the very antithesis of that. For the Serbian worker the more immediate benefits may well be the cap on overtime  and the restrictions on fixed term contracts which will have a far wider impact than the four-day week alone. For the foreign investors and the outsourcing companies that employ literally thousands in Belgrade and Novi Sad the proposals signal higher labour costs and a government that is absolutely determined to enforce them.</p>

<p>Caution is definitely warranted. Prof Vuk Vuksanovic, a lecturer at King's College London who specialises in Serbia, told The Telegraph that "winning elections and running a country are two very different things" and that the Student List has no clear PM in sight. These are proposals from a movement still in the process of forming a government, not legislation. Anyone who's followed labour reform in Europe will be able to draw the comparison with Growentix's coverage of the <a href="https://growentix.cloud/articles/uk-eu-brexit-reset-deal-youth-mobility-20261123">UK/EU Brexit reset deal, youth mobility</a> and the <a href="https://growentix.cloud/countries">countries hub</a> on working conditions across Europe.</p>

<h2>What the sources do not say</h2>

<p>The sources make absolutely no reference to a four day week being mandatory (the report is talking about a movement  to "encourage" employers to go for it rather than a mandatory scheme) and  say nothing at all about when any of the proposals would come into force, who would be PM, how the government would be formed etc. There's no indication of which employers would be covered first or what the penalties would be. The assertion that Serbia has already implemented a four day week is completely outside the reporting.</p>

<p>Sources: <a href="https://www.timesnownews.com/world/serbias-student-led-government-wants-reality-tv-capped-at-45-minutes-and-a-four-day-work-week-article-156551672/amp">Times Now</a> (The Sunday Telegraph) for the four day week and the reality TV; <a href="https://hirunews.lk/goldfmnews/502290/serbias-student-led-government-wants-cap-on-reality-tv-and-four-day-week">Hiru News</a> for the election result and the workers' rights package; <a href="https://firstbalkanmedia.com/2026/11/11/serbias-student-list-proposes-45-minute-daily-cap-on-reality-tv/">First Balkan Media</a> for the 30% airtime.</p>

<h2>Frequently asked questions</h2>
<h3>Has Serbia introduced a four-day work week?</h3>
<p>No, it's a proposal from the new student led government for a 32 hour week with no pay cut. No such law has yet been passed.</p>
<h3>Who won the Serbian election?</h3>
<p>The Student List (a student driven movement) took 140 of the 250  seats in Parliament in October, bringing an end to  Aleksandar Vucic's government.</p>
$$,
$$<p>The Serbia four-day work week is on the agenda of the country's new student-led government, which plans to encourage companies to reduce their working week to 32 hours without any reduction in pay. The proposal sits alongside a cap on reality TV and a raft of workers' rights reforms. A very clear break from   Aleksandar Vucic.</p>

<table>
<tr><td>Event</td><td>Serbia's new government proposes a four-day working week</td></tr>
<tr><td>Proposed hours</td><td>32 hours a week, with no pay cut</td></tr>
<tr><td>Who proposed it</td><td>The Student List, which won 140 of 250 parliamentary seats in October</td></tr>
<tr><td>Other proposals</td><td>Reality TV capped at 45 minutes a day; 8-hour weekly overtime cap</td></tr>
<tr><td>Status</td><td>Proposals, not law; no prime ministerial candidate named yet</td></tr>
</table>

<h2>What happened in Serbia</h2>

<p>The Student List (a loose coalition of 'political outsiders' put forward by the students) brought down Aleksandar Vucic's government  in October, winning 140 of the 250 seats in parliament in the snap elections of 25 October, <a href="https://www.timesnownews.com/world/serbias-student-led-government-wants-reality-tv-capped-at-45-minutes-and-a-four-day-work-week-article-156551672/amp">Times Now</a> reported, citing The Sunday Telegraph). The movement emerged from the protests that followed the collapse of a concrete canopy at the Novi Sad railway station in November 2024 which resulted in 16 deaths and which in turn triggered huge demonstrations over corruption.</p>

<p>The  proposals go well beyond the headline. The movement wants to see companies  adopt a four-day week, cutting hours to 32 without reducing pay, and to improve workers' rights with a cap of eight hours of overtime a week, tighter rules on fixed term contracts and a ban on managers contacting staff outside of working hours. On TV the plan would see reality shows  banned from the free to air national channels before 11 pm and limited to 45 minutes a day, while popular programmes such as Elita would be available on the subscription services). <a href="https://firstbalkanmedia.com/2026/11/11/serbias-student-list-proposes-45-minute-daily-cap-on-reality-tv/">First Balkan Media</a> reports the plan would also require the national channels to devote at least 30% of their airtime to educational, cultural, documentary and children's programming.</p>

<h2>What the Serbia four-day work week plan means for workers</h2>

<p>If it becomes law Serbia would be joining the very small number of countries testing shorter weeks at full pay and that would be a massive development for  employers and unions right across Europe. The Vucic era was predicated on the back of cheap labour to attract foreign investment and a 32 hour week with a right to disconnect would be the very antithesis of that. For the Serbian worker the more immediate benefits may well be the cap on overtime  and the restrictions on fixed term contracts which will have a far wider impact than the four-day week alone. For the foreign investors and the outsourcing companies that employ literally thousands in Belgrade and Novi Sad the proposals signal higher labour costs and a government that is absolutely determined to enforce them.</p>

<p>Caution is definitely warranted. Prof Vuk Vuksanovic, a lecturer at King's College London who specialises in Serbia, told The Telegraph that "winning elections and running a country are two very different things" and that the Student List has no clear PM in sight. These are proposals from a movement still in the process of forming a government, not legislation. Anyone who's followed labour reform in Europe will be able to draw the comparison with Growentix's coverage of the <a href="https://growentix.cloud/articles/uk-eu-brexit-reset-deal-youth-mobility-20261123">UK/EU Brexit reset deal, youth mobility</a> and the <a href="https://growentix.cloud/countries">countries hub</a> on working conditions across Europe.</p>

<h2>What the sources do not say</h2>

<p>The sources make absolutely no reference to a four day week being mandatory (the report is talking about a movement  to "encourage" employers to go for it rather than a mandatory scheme) and  say nothing at all about when any of the proposals would come into force, who would be PM, how the government would be formed etc. There's no indication of which employers would be covered first or what the penalties would be. The assertion that Serbia has already implemented a four day week is completely outside the reporting.</p>

<p>Sources: <a href="https://www.timesnownews.com/world/serbias-student-led-government-wants-reality-tv-capped-at-45-minutes-and-a-four-day-work-week-article-156551672/amp">Times Now</a> (The Sunday Telegraph) for the four day week and the reality TV; <a href="https://hirunews.lk/goldfmnews/502290/serbias-student-led-government-wants-cap-on-reality-tv-and-four-day-week">Hiru News</a> for the election result and the workers' rights package; <a href="https://firstbalkanmedia.com/2026/11/11/serbias-student-list-proposes-45-minute-daily-cap-on-reality-tv/">First Balkan Media</a> for the 30% airtime.</p>

<h2>Frequently asked questions</h2>
<h3>Has Serbia introduced a four-day work week?</h3>
<p>No, it's a proposal from the new student led government for a 32 hour week with no pay cut. No such law has yet been passed.</p>
<h3>Who won the Serbian election?</h3>
<p>The Student List (a student driven movement) took 140 of the 250  seats in Parliament in October, bringing an end to  Aleksandar Vucic's government.</p>
$$,
ARRAY['https://www.timesnownews.com/world/serbias-student-led-government-wants-reality-tv-capped-at-45-minutes-and-a-four-day-work-week-article-156551672/amp', 'https://hirunews.lk/goldfmnews/502290/serbias-student-led-government-wants-cap-on-reality-tv-and-four-day-week', 'https://firstbalkanmedia.com/2026/11/11/serbias-student-list-proposes-45-minute-daily-cap-on-reality-tv/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- strait-of-hormuz-oil-tankers-fire-20261124 (news; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'strait-of-hormuz-oil-tankers-fire-20261124', 'news', 'Global',
'Strait of Hormuz oil tankers catch fire in mine claim',
'Strait of Hormuz oil tankers catch fire in mine claim',
'Strait of Hormuz oil tankers are on fire after two vessels reportedly struck mines east of the strait, the latest attacks on Gulf shipping.',
'Strait of Hormuz oil tankers are on fire after two vessels reportedly struck mines east of the strait, the latest attacks on Gulf shipping.',
$$<p>Two oil tankers in the Strait of Hormuz  caught fire on Sunday 22 November 2026 following two vessels reportedly striking naval mines off the east of the strait, in the latest assault on Gulf shipping during the ongoing US-Israeli war with Iran. The IRGC say the tankers had strayed into a restricted area. There is no independent confirmation as to how the fires started is not available.</p>

<table>
<tr><td>Event</td><td>Two oil tankers catch fire east of the Strait of Hormuz</td></tr>
<tr><td>Date</td><td>22 November 2026</td></tr>
<tr><td>Claimed cause</td><td>Naval mines, according to Iran's Revolutionary Guard</td></tr>
<tr><td>Other attacks</td><td>Houthis claimed a strike on a Saudi oil refinery on Sunday</td></tr>
<tr><td>Tankers hit since 16 Nov</td><td>Seven, according to Iran International</td></tr>
<tr><td>Oil price</td><td>Brent $92.29 a barrel; WTI $83.26 on Monday</td></tr>
</table>

<h2>What happened in the Strait of Hormuz</h2>

<p>The IRGC have stated that two supertankers ran into mines after disregarding repeated warnings, switching off their radar  and taking an unauthorised route east of the strait, north of Ghanam Island, <a href="https://www.facebook.com/alarabiya.english/posts/pfbid02ERtRAU2X1QDUs4A45yMAnP3i14SoCNy6xiK4QnpQzhguQi7D2NWc1C4ZHuMTKc2Dl">Al Arabiya</a> reported. The IRGC have said the strait is fully under their control in terms of surveillance and  that the vessel owners will be answerable for the consequences of ignoring their warnings. The claim has not been independently verified, and other reports have questioned whether mines or drone strikes caused the fires.</p>

<p>The incident is the result of a week of attacks on shipping. <a href="https://www.reuters.com/business/energy/oil-prices-fall-amid-equity-selloff-though-iran-war-attacks-limit-losses-2026-11-23/">Reuters</a> reported a number of attacks on shipping in the Gulf and in the vicinity of the Strait of Hormuz  over the weekend, with the Iran-aligned Houthi movement claiming to have hit a Saudi Arabian oil refinery on Sunday. Iran International reported that seven tankers have been hit in the strait since the 16th November. The Panama flagged LPG carrier Tara was struck by a projectile on the 17th November, leaving one crew member missing and 11 injured, according to security sources quoted by The Independent.</p>

<h2>What the Strait of Hormuz oil tankers incident means</h2>

<p>The strait is such a vital conduit for the world's seaborne oil that any attacks on it have a very direct and immediate impact on oil prices, shipping insurance and the cost of moving goods in general and of course on the jobs of the seafarers, port workers and all the various energy sector staff across the Gulf. Paradoxically, oil prices were down on Monday despite the attacks. Brent  was down 0.30% at $92.29  and US crude down 0.18% at $83.26 as the broader market selloff more than offset the shipping risk. Brent has still been down 4% for the  week and US crude 5% as traders work through the possibility of a de-escalation in the region and the prospect of supplies coming back into the market.</p>

<p>The risk for the workers is that the shipping disruption will outlast the price dip. Reuters quotes oil analyst Mukesh Sahdev warning that the number of empty tankers is building up while the number of laden vessels is not. "This risk to flows will start to price soon," he says. If insurers raise war-risk premiums or owners reroute vessels, Gulf energy and logistics hiring will be the first to feel it. For the wider war picture see Growentix's coverage of <a href="https://growentix.cloud/articles/trump-iran-war-status-quo-bahrain-radar-strike-20261117">Trump, Iran and the Bahrain radar strike</a> and the <a href="https://growentix.cloud/countries">countries hub</a> for energy hiring across the region.</p>

<h2>What the sources do not say</h2>

<p>The sources don't independently establish  that the mines were the cause of the two tanker fires (that's the IRGC's version of events and there has been no independent survey of the vessels or the seabed). The sources don't name the two tankers, their flags or their crews and give no information as to how many crew were on board or indeed whether anyone was injured in the incident of Sunday. The  strait is closed: oil is still flowing and prices dropped on Monday). The assertion that the attacks are part of a particular strategy is well beyond the scope of the reporting which records claims and counter-claims made by the parties to the conflict.</p>

<p>Sources: <a href="https://www.reuters.com/business/energy/oil-prices-fall-amid-equity-selloff-though-iran-war-attacks-limit-losses-2026-11-23/">Reuters</a> for the weekend attacks, the Houthi claim and the oil prices; <a href="https://www.facebook.com/alarabiya.english/posts/pfbid02ERtRAU2X1QDUs4A45yMAnP3i14SoCNy6xiK4QnpQzhguQi7D2NWc1C4ZHuMTKc2Dl">Al Arabiya</a> for the IRGC's version of the mine strikes; <a href="https://www.facebook.com/IranIntlEnglish/posts/pfbid0rEdPUrc6A472XeesSUH8FaqoPhorNp7sgWSiVKY6ptN6TCf9A8pc9eHmGQYXkcj1l">Iran International</a> for the count of seven tankers hit since 16 November.</p>

<h2>Frequently asked questions</h2>
<h3>Is the Strait of Hormuz closed?</h3>
<p>No, oil is still flowing through the strait and Brent  actually fell on Monday despite the tanker fires.</p>
<h3>How many tankers have been hit in the area around Hormuz?</h3>
<p>Seven tankers have been hit since 16 November, according to Iran International, including the two that caught fire on 22 November.</p>
$$,
$$<p>Two oil tankers in the Strait of Hormuz  caught fire on Sunday 22 November 2026 following two vessels reportedly striking naval mines off the east of the strait, in the latest assault on Gulf shipping during the ongoing US-Israeli war with Iran. The IRGC say the tankers had strayed into a restricted area. There is no independent confirmation as to how the fires started is not available.</p>

<table>
<tr><td>Event</td><td>Two oil tankers catch fire east of the Strait of Hormuz</td></tr>
<tr><td>Date</td><td>22 November 2026</td></tr>
<tr><td>Claimed cause</td><td>Naval mines, according to Iran's Revolutionary Guard</td></tr>
<tr><td>Other attacks</td><td>Houthis claimed a strike on a Saudi oil refinery on Sunday</td></tr>
<tr><td>Tankers hit since 16 Nov</td><td>Seven, according to Iran International</td></tr>
<tr><td>Oil price</td><td>Brent $92.29 a barrel; WTI $83.26 on Monday</td></tr>
</table>

<h2>What happened in the Strait of Hormuz</h2>

<p>The IRGC have stated that two supertankers ran into mines after disregarding repeated warnings, switching off their radar  and taking an unauthorised route east of the strait, north of Ghanam Island, <a href="https://www.facebook.com/alarabiya.english/posts/pfbid02ERtRAU2X1QDUs4A45yMAnP3i14SoCNy6xiK4QnpQzhguQi7D2NWc1C4ZHuMTKc2Dl">Al Arabiya</a> reported. The IRGC have said the strait is fully under their control in terms of surveillance and  that the vessel owners will be answerable for the consequences of ignoring their warnings. The claim has not been independently verified, and other reports have questioned whether mines or drone strikes caused the fires.</p>

<p>The incident is the result of a week of attacks on shipping. <a href="https://www.reuters.com/business/energy/oil-prices-fall-amid-equity-selloff-though-iran-war-attacks-limit-losses-2026-11-23/">Reuters</a> reported a number of attacks on shipping in the Gulf and in the vicinity of the Strait of Hormuz  over the weekend, with the Iran-aligned Houthi movement claiming to have hit a Saudi Arabian oil refinery on Sunday. Iran International reported that seven tankers have been hit in the strait since the 16th November. The Panama flagged LPG carrier Tara was struck by a projectile on the 17th November, leaving one crew member missing and 11 injured, according to security sources quoted by The Independent.</p>

<h2>What the Strait of Hormuz oil tankers incident means</h2>

<p>The strait is such a vital conduit for the world's seaborne oil that any attacks on it have a very direct and immediate impact on oil prices, shipping insurance and the cost of moving goods in general and of course on the jobs of the seafarers, port workers and all the various energy sector staff across the Gulf. Paradoxically, oil prices were down on Monday despite the attacks. Brent  was down 0.30% at $92.29  and US crude down 0.18% at $83.26 as the broader market selloff more than offset the shipping risk. Brent has still been down 4% for the  week and US crude 5% as traders work through the possibility of a de-escalation in the region and the prospect of supplies coming back into the market.</p>

<p>The risk for the workers is that the shipping disruption will outlast the price dip. Reuters quotes oil analyst Mukesh Sahdev warning that the number of empty tankers is building up while the number of laden vessels is not. "This risk to flows will start to price soon," he says. If insurers raise war-risk premiums or owners reroute vessels, Gulf energy and logistics hiring will be the first to feel it. For the wider war picture see Growentix's coverage of <a href="https://growentix.cloud/articles/trump-iran-war-status-quo-bahrain-radar-strike-20261117">Trump, Iran and the Bahrain radar strike</a> and the <a href="https://growentix.cloud/countries">countries hub</a> for energy hiring across the region.</p>

<h2>What the sources do not say</h2>

<p>The sources don't independently establish  that the mines were the cause of the two tanker fires (that's the IRGC's version of events and there has been no independent survey of the vessels or the seabed). The sources don't name the two tankers, their flags or their crews and give no information as to how many crew were on board or indeed whether anyone was injured in the incident of Sunday. The  strait is closed: oil is still flowing and prices dropped on Monday). The assertion that the attacks are part of a particular strategy is well beyond the scope of the reporting which records claims and counter-claims made by the parties to the conflict.</p>

<p>Sources: <a href="https://www.reuters.com/business/energy/oil-prices-fall-amid-equity-selloff-though-iran-war-attacks-limit-losses-2026-11-23/">Reuters</a> for the weekend attacks, the Houthi claim and the oil prices; <a href="https://www.facebook.com/alarabiya.english/posts/pfbid02ERtRAU2X1QDUs4A45yMAnP3i14SoCNy6xiK4QnpQzhguQi7D2NWc1C4ZHuMTKc2Dl">Al Arabiya</a> for the IRGC's version of the mine strikes; <a href="https://www.facebook.com/IranIntlEnglish/posts/pfbid0rEdPUrc6A472XeesSUH8FaqoPhorNp7sgWSiVKY6ptN6TCf9A8pc9eHmGQYXkcj1l">Iran International</a> for the count of seven tankers hit since 16 November.</p>

<h2>Frequently asked questions</h2>
<h3>Is the Strait of Hormuz closed?</h3>
<p>No, oil is still flowing through the strait and Brent  actually fell on Monday despite the tanker fires.</p>
<h3>How many tankers have been hit in the area around Hormuz?</h3>
<p>Seven tankers have been hit since 16 November, according to Iran International, including the two that caught fire on 22 November.</p>
$$,
ARRAY['https://www.reuters.com/business/energy/oil-prices-fall-amid-equity-selloff-though-iran-war-attacks-limit-losses-2026-11-23/', 'https://www.facebook.com/alarabiya.english/posts/pfbid02ERtRAU2X1QDUs4A45yMAnP3i14SoCNy6xiK4QnpQzhguQi7D2NWc1C4ZHuMTKc2Dl', 'https://www.facebook.com/IranIntlEnglish/posts/pfbid0rEdPUrc6A472XeesSUH8FaqoPhorNp7sgWSiVKY6ptN6TCf9A8pc9eHmGQYXkcj1l'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- taplejung-earthquake-20261124 (news; Nepal; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'taplejung-earthquake-20261124', 'news', 'Nepal',
'Taplejung earthquake: 5.6-magnitude quake near Nepal-Tibet border',
'Taplejung earthquake: 5.6-magnitude quake near Nepal-Tibet border',
'A Taplejung earthquake of magnitude 5.6 struck near Olangchung Gola at 7:17am on Tuesday, shaking eastern Nepal and Kathmandu. No damage reported so far.',
'A Taplejung earthquake of magnitude 5.6 struck near Olangchung Gola at 7:17am on Tuesday, shaking eastern Nepal and Kathmandu. No damage reported so far.',
$$<p>A Taplejung earthquake measuring 5.6 in magnitude struck near Olangchung Gola in the Taplejung district (near the Nepal-Tibet border) at 7:17 am on Tuesday 24th November 2026. Tremors were felt all over eastern Nepal, in Kathmandu and the western part of the country as well as across the border in North Bengal, Sikkim, Bhutan, Bangladesh and China. There have been no casualties or damage reported so far.</p>

<table>
<tr><td>Event</td><td>Earthquake near the Nepal-Tibet border</td></tr>
<tr><td>Magnitude</td><td>5.6 (Nepal's National Earthquake Monitoring and Research Centre); 5.3 (EMSC)</td></tr>
<tr><td>Time</td><td>7:17am, Tuesday 24 November 2026</td></tr>
<tr><td>Epicentre</td><td>Olangchung Gola, Taplejung district, near the Nepal-Tibet border</td></tr>
<tr><td>Depth</td><td>10 km (EMSC and USGS); 20 km (India's National Centre for Seismology)</td></tr>
<tr><td>Areas shaken</td><td>Kathmandu, eastern Nepal, north Bengal, Sikkim, Bhutan, Bangladesh, China</td></tr>
<tr><td>Damage reported</td><td>None so far</td></tr>
</table>

<h2>What happened</h2>

<p>Nepal's National Earthquake Monitoring and Research Centre recorded the quake at 7:17 am, with the epicentre near Olangchung Gola in Taplejung, according to seismologist Rajesh Sharma. The area lies along the border with Tibet. The US Geological Survey placed the epicentre about 67 kilometres from Mangan in Sikkim, India, at a depth of 10 kilometres.</p>

<p>India's National Centre for Seismology recorded the event at 7:02:47 am IST (same time as in Nepal, since Nepal is 15 minutes ahead of India) with the epicentre at 27.855°N, 87.909°E i.e. about 94 km NNW of Darjeeling and 68 km NW of Gyalshing in Sikkim. Bangladesh's Meteorological Department recorded the quake at 7:32 am local time (again the same event, Bangladesh being 15 minutes ahead of Nepal).</p>

<p>Tremors were felt in some districts of Koshi Province, as well as in Kathmandu and the western part of the country. Across the border, powerful tremors shook high-rise buildings in north Bengal, and residents in Darjeeling, Jalpaiguri, Cooch Behar and Sikkim rushed out of their homes. Taplejung's chief district officer, Umesh Kumar Dahal, said there was no information about damage so far and that authorities were collecting updates from police and local officials. <a href="https://theannapurnaexpress.com/story/69023/">The Annapurna Express</a> likewise reported that further details on possible damage or casualties were yet to be received.</p>

<h2>What the Taplejung earthquake means</h2>

<p>The differing magnitudes are normal, not a sign of two quakes. Nepal's centre measured 5.6, the European-Mediterranean Seismological Centre and India's National Centre for Seismology measured 5.3, and the US Geological Survey first reported 5.4 before revising its figure to 5.3. The readings come from different station networks and methods, and they describe the same event at the same time.</p>

<p>The epicentre sits in a remote part of the far north of Taplejung, on the border with Tibet, which is one reason damage reports are still coming in slowly: officials have to hear back from police and local offices in the hills before they can say anything firm. That the first reports are of shaking, not damage, is reassuring, but it is not conclusive until those updates arrive.</p>

<p>For those following Nepal the <a href="https://growentix.cloud/nepal">Nepal</a> hub has the latest from there and the quake comes in the days following PM Balen Shah's visit to Delhi (see our report on the outcome of the <a href="https://growentix.cloud/articles/balen-shah-modi-talks-outcome-nepal-india-20261124">Balen Shah Modi talks outcome</a>.</p>

<h2>What the sources do not say</h2>

<p>The sources make no comment on whether any buildings, roads or houses in the vicinity of the epicentre were damaged (no damage assessment has been published at this stage and the district office is still gathering the information). There have been no reports of aftershocks and no mention of any safety advisory having been issued.</p>

<p>Two of the figures are different in the various sources. The depth is 10 km according to the EMSC and the USGS, 20 km according to India's National Centre for Seismology. The distance from Kathmandu is 275 km according to PTI and 300 km according to Mathrubhumi. The difference in those figures makes no difference to the picture at all — it's the same quake, it's the same morning — just the exact numbers are not quite in agreement.</p>

<p>The sources make no comment as to how strongly the quake was felt in the epicentral area itself, where the nearest reporting stations are quite some distance away.</p>

<p>Sources: <a href="https://kathmandupost.com/national/2026/11/24/5-6-magnitude-earthquake-strikes-near-nepal-tibet-border"> Kathmandu Post</a> for the 5.6 quake, 7:17 am time, Olangchung Gola epicentre and the report of no immediate damage; <a href="https://theannapurnaexpress.com/story/69023/"> Annapurna Express</a> for the National Seismological Centre's confirmation and the fact that damage and casualty figures had not yet been received; <a href="https://english.onlinekhabar.com/5-6-magnitude-earthquake-hits-northern-border-area-of-eastern-nepal.html">Online Khabar</a> for seismologist Rajesh Sharma, the tremors in Koshi Province and the USGS epicentre and depth; <a href="https://www.ndtv.com/world-news/5-3-magnitude-earthquake-hits-nepal-tremors-felt-across-india-bhutan-china-12368620?pfrom=home-ndtvworld_">NDTV</a> for the EMSC's 5.3 cross check and the tremors across India, Bhutan and China; <a href="https://thelogicalindian.com/5-3-earthquake-hits-nepal-tremor-india-134943/">The Logical Indian</a> for the Taplejung chief district officer's statement and the Indian Seismology Centre's readings.</p>

<h2>Frequently asked questions</h2>
<h3>Was anyone hurt in the Taplejung earthquake?</h3>
<p>No casualties or damage have been reported so far. Taplejung's chief district officer, Umesh Kumar Dahal, the chief district officer of Taplejung, said there was no information on damage at this stage and that they were gathering information from the police and various local officials.</p>
<h3>Where was the Taplejung earthquake felt?</h3>
<p>In Kathmandu and western Nepal, in districts across eastern Nepal's Koshi Province, and across the border in north Bengal, Sikkim, Bhutan, Bangladesh and China, according to the monitoring centre and the outlets reporting the tremor.</p>
$$,
$$<p>A Taplejung earthquake measuring 5.6 in magnitude struck near Olangchung Gola in the Taplejung district (near the Nepal-Tibet border) at 7:17 am on Tuesday 24th November 2026. Tremors were felt all over eastern Nepal, in Kathmandu and the western part of the country as well as across the border in North Bengal, Sikkim, Bhutan, Bangladesh and China. There have been no casualties or damage reported so far.</p>

<table>
<tr><td>Event</td><td>Earthquake near the Nepal-Tibet border</td></tr>
<tr><td>Magnitude</td><td>5.6 (Nepal's National Earthquake Monitoring and Research Centre); 5.3 (EMSC)</td></tr>
<tr><td>Time</td><td>7:17am, Tuesday 24 November 2026</td></tr>
<tr><td>Epicentre</td><td>Olangchung Gola, Taplejung district, near the Nepal-Tibet border</td></tr>
<tr><td>Depth</td><td>10 km (EMSC and USGS); 20 km (India's National Centre for Seismology)</td></tr>
<tr><td>Areas shaken</td><td>Kathmandu, eastern Nepal, north Bengal, Sikkim, Bhutan, Bangladesh, China</td></tr>
<tr><td>Damage reported</td><td>None so far</td></tr>
</table>

<h2>What happened</h2>

<p>Nepal's National Earthquake Monitoring and Research Centre recorded the quake at 7:17 am, with the epicentre near Olangchung Gola in Taplejung, according to seismologist Rajesh Sharma. The area lies along the border with Tibet. The US Geological Survey placed the epicentre about 67 kilometres from Mangan in Sikkim, India, at a depth of 10 kilometres.</p>

<p>India's National Centre for Seismology recorded the event at 7:02:47 am IST (same time as in Nepal, since Nepal is 15 minutes ahead of India) with the epicentre at 27.855°N, 87.909°E i.e. about 94 km NNW of Darjeeling and 68 km NW of Gyalshing in Sikkim. Bangladesh's Meteorological Department recorded the quake at 7:32 am local time (again the same event, Bangladesh being 15 minutes ahead of Nepal).</p>

<p>Tremors were felt in some districts of Koshi Province, as well as in Kathmandu and the western part of the country. Across the border, powerful tremors shook high-rise buildings in north Bengal, and residents in Darjeeling, Jalpaiguri, Cooch Behar and Sikkim rushed out of their homes. Taplejung's chief district officer, Umesh Kumar Dahal, said there was no information about damage so far and that authorities were collecting updates from police and local officials. <a href="https://theannapurnaexpress.com/story/69023/">The Annapurna Express</a> likewise reported that further details on possible damage or casualties were yet to be received.</p>

<h2>What the Taplejung earthquake means</h2>

<p>The differing magnitudes are normal, not a sign of two quakes. Nepal's centre measured 5.6, the European-Mediterranean Seismological Centre and India's National Centre for Seismology measured 5.3, and the US Geological Survey first reported 5.4 before revising its figure to 5.3. The readings come from different station networks and methods, and they describe the same event at the same time.</p>

<p>The epicentre sits in a remote part of the far north of Taplejung, on the border with Tibet, which is one reason damage reports are still coming in slowly: officials have to hear back from police and local offices in the hills before they can say anything firm. That the first reports are of shaking, not damage, is reassuring, but it is not conclusive until those updates arrive.</p>

<p>For those following Nepal the <a href="https://growentix.cloud/nepal">Nepal</a> hub has the latest from there and the quake comes in the days following PM Balen Shah's visit to Delhi (see our report on the outcome of the <a href="https://growentix.cloud/articles/balen-shah-modi-talks-outcome-nepal-india-20261124">Balen Shah Modi talks outcome</a>.</p>

<h2>What the sources do not say</h2>

<p>The sources make no comment on whether any buildings, roads or houses in the vicinity of the epicentre were damaged (no damage assessment has been published at this stage and the district office is still gathering the information). There have been no reports of aftershocks and no mention of any safety advisory having been issued.</p>

<p>Two of the figures are different in the various sources. The depth is 10 km according to the EMSC and the USGS, 20 km according to India's National Centre for Seismology. The distance from Kathmandu is 275 km according to PTI and 300 km according to Mathrubhumi. The difference in those figures makes no difference to the picture at all — it's the same quake, it's the same morning — just the exact numbers are not quite in agreement.</p>

<p>The sources make no comment as to how strongly the quake was felt in the epicentral area itself, where the nearest reporting stations are quite some distance away.</p>

<p>Sources: <a href="https://kathmandupost.com/national/2026/11/24/5-6-magnitude-earthquake-strikes-near-nepal-tibet-border"> Kathmandu Post</a> for the 5.6 quake, 7:17 am time, Olangchung Gola epicentre and the report of no immediate damage; <a href="https://theannapurnaexpress.com/story/69023/"> Annapurna Express</a> for the National Seismological Centre's confirmation and the fact that damage and casualty figures had not yet been received; <a href="https://english.onlinekhabar.com/5-6-magnitude-earthquake-hits-northern-border-area-of-eastern-nepal.html">Online Khabar</a> for seismologist Rajesh Sharma, the tremors in Koshi Province and the USGS epicentre and depth; <a href="https://www.ndtv.com/world-news/5-3-magnitude-earthquake-hits-nepal-tremors-felt-across-india-bhutan-china-12368620?pfrom=home-ndtvworld_">NDTV</a> for the EMSC's 5.3 cross check and the tremors across India, Bhutan and China; <a href="https://thelogicalindian.com/5-3-earthquake-hits-nepal-tremor-india-134943/">The Logical Indian</a> for the Taplejung chief district officer's statement and the Indian Seismology Centre's readings.</p>

<h2>Frequently asked questions</h2>
<h3>Was anyone hurt in the Taplejung earthquake?</h3>
<p>No casualties or damage have been reported so far. Taplejung's chief district officer, Umesh Kumar Dahal, the chief district officer of Taplejung, said there was no information on damage at this stage and that they were gathering information from the police and various local officials.</p>
<h3>Where was the Taplejung earthquake felt?</h3>
<p>In Kathmandu and western Nepal, in districts across eastern Nepal's Koshi Province, and across the border in north Bengal, Sikkim, Bhutan, Bangladesh and China, according to the monitoring centre and the outlets reporting the tremor.</p>
$$,
ARRAY['https://kathmandupost.com/national/2026/11/24/5-6-magnitude-earthquake-strikes-near-nepal-tibet-border', 'https://theannapurnaexpress.com/story/69023/', 'https://english.onlinekhabar.com/5-6-magnitude-earthquake-hits-northern-border-area-of-eastern-nepal.html', 'https://www.ndtv.com/world-news/5-3-magnitude-earthquake-hits-nepal-tremors-felt-across-india-bhutan-china-12368620?pfrom=home-ndtvworld_', 'https://thelogicalindian.com/5-3-earthquake-hits-nepal-tremor-india-134943/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- adela-nicole-kidman-hot-100-top-10-20261124 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'adela-nicole-kidman-hot-100-top-10-20261124', 'pop-music', 'USA',
'Adela Nicole Kidman Hot 100: First Slovak Top 10',
'Adela Nicole Kidman Hot 100: First Slovak Top 10',
'Adela Nicole Kidman Hot 100 peak of No. 6 makes Adela the first Slovak artist ever to reach the American top 10 singles chart.',
'Adela Nicole Kidman Hot 100 peak of No. 6 makes Adela the first Slovak artist ever to reach the American top 10 singles chart.',
$$<p>Adela's 'Nicole Kidman' has reached No.6 on the Billboard Hot 100, making Adela the first Slovak artist ever to make it into the US Top 10. The song, from her debut album <em>PRIMA</em>, also at No.2 on Spotify's global chart — and Adela Nicole Kidman's Hot 100 success isn't a one-song story, with her earlier single "Ain't In LA' (her other single) is also in the top 30.</p>

<table>
<tr><td>Song</td><td>"Nicole Kidman" — ADÉLA</td></tr>
<tr><td>Album</td><td><em>PRIMA</em> (released 4 September 2026, Capitol Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 6 peak (chart dated 24 October 2026); No. 7 on the 21 November chart</td></tr>
<tr><td>Billboard Global 200</td><td>No. 2 peak</td></tr>
<tr><td>Spotify Global</td><td>No. 2 ("Nicole Kidman"); No. 3 ("Ain't In LA")</td></tr>
<tr><td>Album chart</td><td><em>PRIMA</em>: No. 4 Billboard 200; No. 2 UK Albums Chart</td></tr>
<tr><td>Also</td><td>"Ain't In LA": first Slovak song on the Hot 100 (peaked No. 24)</td></tr>
</table>

<h2>What happened</h2>

<p>The song kicked off with a film night. After the first viewing of <em>Eyes Wide Shut</em> Adéla was thinking "I feel like Nicole Kidman right now" and that was the song, according to the <a href="https://adeladispatch.com/story/">ADÉLA Dispatch</a>. Kidman has since confirmed "I absolutely know who she is", making her very first TikTok to 'Ain't In LA' lip syncing the song at both the Chanel and the Victoria's Secret shows. The numbers followed with 'Nicole Kidman' making its debut at No.45 on the Hot 100 and going on to No. 6, while <em>PRIMA</em> entered the Billboard 200 at No.4 with 56,000 units and reaching No.2 on the UK albums chart, as the <a href="https://www.pohodafestival.sk/en/news/adela-in-slovakia-for-the-first-time-we-re-adding-an-extra-day-to-pohoda">Pohoda Festival</a> report). Adéla made her US late night debut on <em>The Tonight Show</em> on 22 October and has since opened for Demi Lovato in arenas (including Madison Square Garden) and is <a href="https://www.nylon.com/entertainment/coachella-lineup-2027-debuts">booked for her Coachella debut on Saturday 10th April 2027</a> (more on that in our <a href="https://growentix.cloud/articles/coachella-2027-lineup-dua-lipa-sza-tame-impala-20261118">Coachella 2027 line-up</a>. The <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Adela Nicole Kidman Hot 100 breakthrough means</h2>

<p>No Slovak artist had ever made it into the Hot 100 top 10 prior to this. Adéla actually achieved it twice in the same season: "Ain't In LA" was the very first Slovak song to crack the chart at all, and "Nicole Kidman" followed it up to No.6. Having two of her songs in the global Spotify top 2 and 3 at the same time is the rarer of the two (that one is the one which suggests it's not some one-off fluke hit but rather an album of real substance). Ballet came first. She trained in Vienna and London, then the <em>Dream Academy</em> knocked her out — the same programme that would go on to produce KATSEYE. Three years later she was back, this time as a solo artist. Hardly the usual way into the top 10 for a debut artist, which is what makes it so hard to write off as a fluke.</p>

<h2>What the sources do not say</h2>

<p>One of the venue listing gives the Hot 100 peak as No. 9, against the Billboard chart that we're basing our figure on shows it at No. 6 (the article takes the No. 6). No specific time or stage has been announced for her Coachella appearance on 10 April 2027 and there's nothing at all in the sources regarding a second album or a headline tour. The sources make no mention of how much of the streaming from the two singles is actually coming from Slovakia versus the US and the rest of the world.</p>

<p>Sources: <a href="https://en.wikipedia.org/wiki/Nicole_Kidman_(song)">Wikipedia</a>, <a href="https://www.pohodafestival.sk/en/news/adela-in-slovakia-for-the-first-time-we-re-adding-an-extra-day-to-pohoda">Pohoda Festival</a>, <a href="https://adeladispatch.com/story/">ADÉLA Dispatch</a>, <a href="https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/">Creative Disc</a>, <a href="https://www.nylon.com/entertainment/coachella-lineup-2027-debuts">NYLON</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Who is Adela?</h3>
<p>Adéla Jergová is a Slovak singer, songwriter and former ballet dancer from Bratislava. She was cut early from the 2023 <em>Dream Academy</em> contest, then released her debut album <em>PRIMA</em> in September 2026.</p>
<h3>Has Nicole Kidman heard the song?</h3>
<p>Yes Kidman has said "I absolutely know who she is", did her very first TikTok to Adela's "Ain't In LA" and lip synced that song at Chanel.</p>
$$,
$$<p>Adela's 'Nicole Kidman' has reached No.6 on the Billboard Hot 100, making Adela the first Slovak artist ever to make it into the US Top 10. The song, from her debut album <em>PRIMA</em>, also at No.2 on Spotify's global chart — and Adela Nicole Kidman's Hot 100 success isn't a one-song story, with her earlier single "Ain't In LA' (her other single) is also in the top 30.</p>

<table>
<tr><td>Song</td><td>"Nicole Kidman" — ADÉLA</td></tr>
<tr><td>Album</td><td><em>PRIMA</em> (released 4 September 2026, Capitol Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 6 peak (chart dated 24 October 2026); No. 7 on the 21 November chart</td></tr>
<tr><td>Billboard Global 200</td><td>No. 2 peak</td></tr>
<tr><td>Spotify Global</td><td>No. 2 ("Nicole Kidman"); No. 3 ("Ain't In LA")</td></tr>
<tr><td>Album chart</td><td><em>PRIMA</em>: No. 4 Billboard 200; No. 2 UK Albums Chart</td></tr>
<tr><td>Also</td><td>"Ain't In LA": first Slovak song on the Hot 100 (peaked No. 24)</td></tr>
</table>

<h2>What happened</h2>

<p>The song kicked off with a film night. After the first viewing of <em>Eyes Wide Shut</em> Adéla was thinking "I feel like Nicole Kidman right now" and that was the song, according to the <a href="https://adeladispatch.com/story/">ADÉLA Dispatch</a>. Kidman has since confirmed "I absolutely know who she is", making her very first TikTok to 'Ain't In LA' lip syncing the song at both the Chanel and the Victoria's Secret shows. The numbers followed with 'Nicole Kidman' making its debut at No.45 on the Hot 100 and going on to No. 6, while <em>PRIMA</em> entered the Billboard 200 at No.4 with 56,000 units and reaching No.2 on the UK albums chart, as the <a href="https://www.pohodafestival.sk/en/news/adela-in-slovakia-for-the-first-time-we-re-adding-an-extra-day-to-pohoda">Pohoda Festival</a> report). Adéla made her US late night debut on <em>The Tonight Show</em> on 22 October and has since opened for Demi Lovato in arenas (including Madison Square Garden) and is <a href="https://www.nylon.com/entertainment/coachella-lineup-2027-debuts">booked for her Coachella debut on Saturday 10th April 2027</a> (more on that in our <a href="https://growentix.cloud/articles/coachella-2027-lineup-dua-lipa-sza-tame-impala-20261118">Coachella 2027 line-up</a>. The <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Adela Nicole Kidman Hot 100 breakthrough means</h2>

<p>No Slovak artist had ever made it into the Hot 100 top 10 prior to this. Adéla actually achieved it twice in the same season: "Ain't In LA" was the very first Slovak song to crack the chart at all, and "Nicole Kidman" followed it up to No.6. Having two of her songs in the global Spotify top 2 and 3 at the same time is the rarer of the two (that one is the one which suggests it's not some one-off fluke hit but rather an album of real substance). Ballet came first. She trained in Vienna and London, then the <em>Dream Academy</em> knocked her out — the same programme that would go on to produce KATSEYE. Three years later she was back, this time as a solo artist. Hardly the usual way into the top 10 for a debut artist, which is what makes it so hard to write off as a fluke.</p>

<h2>What the sources do not say</h2>

<p>One of the venue listing gives the Hot 100 peak as No. 9, against the Billboard chart that we're basing our figure on shows it at No. 6 (the article takes the No. 6). No specific time or stage has been announced for her Coachella appearance on 10 April 2027 and there's nothing at all in the sources regarding a second album or a headline tour. The sources make no mention of how much of the streaming from the two singles is actually coming from Slovakia versus the US and the rest of the world.</p>

<p>Sources: <a href="https://en.wikipedia.org/wiki/Nicole_Kidman_(song)">Wikipedia</a>, <a href="https://www.pohodafestival.sk/en/news/adela-in-slovakia-for-the-first-time-we-re-adding-an-extra-day-to-pohoda">Pohoda Festival</a>, <a href="https://adeladispatch.com/story/">ADÉLA Dispatch</a>, <a href="https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/">Creative Disc</a>, <a href="https://www.nylon.com/entertainment/coachella-lineup-2027-debuts">NYLON</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Who is Adela?</h3>
<p>Adéla Jergová is a Slovak singer, songwriter and former ballet dancer from Bratislava. She was cut early from the 2023 <em>Dream Academy</em> contest, then released her debut album <em>PRIMA</em> in September 2026.</p>
<h3>Has Nicole Kidman heard the song?</h3>
<p>Yes Kidman has said "I absolutely know who she is", did her very first TikTok to Adela's "Ain't In LA" and lip synced that song at Chanel.</p>
$$,
ARRAY['https://en.wikipedia.org/wiki/Nicole_Kidman_(song)', 'https://www.pohodafestival.sk/en/news/adela-in-slovakia-for-the-first-time-we-re-adding-an-extra-day-to-pohoda', 'https://adeladispatch.com/story/', 'https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/', 'https://www.nylon.com/entertainment/coachella-lineup-2027-debuts'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- ashe-stop-the-wedding-spotify-global-number-one-20261124 (pop-music; UK; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'ashe-stop-the-wedding-spotify-global-number-one-20261124', 'pop-music', 'UK',
'Ashe Stop The Wedding Hits Spotify Global No. 1',
'Ashe Stop The Wedding Hits Spotify Global No. 1',
'Ashe Stop The Wedding has hit No. 1 on Spotify Global and No. 2 in the UK, a TikTok-fuelled revival of a song about her own wedding.',
'Ashe Stop The Wedding has hit No. 1 on Spotify Global and No. 2 in the UK, a TikTok-fuelled revival of a song about her own wedding.',
$$<p>Ashe's 'Stop The Wedding!' has hit No 1 on the Spotify Global chart and No 2 on the UK Official Singles Chart, more than three months after its release on 7 August 2026. Ashe Stop The Wedding is a slow-burn hit built on TikTok, written about her own first marriage.</p>

<table>
<tr><td>Song</td><td>"Stop The Wedding!" — Ashe</td></tr>
<tr><td>Released</td><td>7 August 2026</td></tr>
<tr><td>Spotify Global</td><td>No. 1 (chart dated 18 November 2026)</td></tr>
<tr><td>UK Singles Chart</td><td>No. 2 (best-ever position; second week at No. 2)</td></tr>
<tr><td>UK sales</td><td>37,976 units in the week ending 26 November, up 5.29% on the week before</td></tr>
<tr><td>TikTok</td><td>367,000 videos by 17 November 2026</td></tr>
<tr><td>Written about</td><td>Her first marriage</td></tr>
<tr><td>Album</td><td><em>The Girl of Your Dreams</em></td></tr>
</table>

<h2>What happened</h2>

<p>The song's rise began on TikTok where it was being used in videos about red flags in relationships, according to <a href="https://en.wikipedia.org/wiki/Stop_the_Wedding!">Wikipedia</a>. From there, it onto the streaming charts, reaching No.5 on Spotify's most streamed song of the month for October and going on to top the Spotify Global chart on 18 November, as <a href="https://www.instagram.com/p/Df-LM6rkltV/">ASCAP</a> reported. In the UK, it has now spent two weeks at No. 2, its best-ever placing, and its sales continuing to climb (37,976 units in the most recent week, a 5.29% increase on the previous week to a new high) and the gap to the No. 1 song narrowing from 84.57% to 68.62%, per the <a href="https://www.buzzjack.com/forums/topic/290576-sales-we-26112026/?&do=findComment&comment=8079036">BuzzJack</a> sales report). The song standing in its way is Jamie Miller's "Babydoll" (covered in our report on <a href="https://growentix.cloud/articles/jamie-miller-babydoll-sixth-week-uk-number-one-20261123">Jamie Miller's sixth week at No. 1</a>, and the rest of the week's chart news is over on the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub.</p>

<h2>What the Ashe Stop The Wedding surge means</h2>

<p>It's a song that found its audience three months after it came out rather than in the first week  and the audience discovered it through other people's stories rather than any kind of launch campaign. A song about calling off a wedding (based on Ashe's own first marriage) and built around 12 tempo changes which as one review puts it is "like a panic attack in a veil" isn't the sort of thing you'd think would become a streaming hit. It did become a hit because of the TikTok trend which gave people a reason to use it in their own break-up stories. The UK numbers back this up:  the No1 song's sales are down for the second week in a row but Ashe's are still going up and up, which looks very much like a challenger rather than a song that's already peaked.</p>

<h2>What the sources do not say</h2>

<p>None of the cited sources have a US Hot 100 position for the song so there's nothing on the US chart position. There's absolutely nothing in any of the coverage to suggest that Ashe will push the song further with a new performance, a remix or a video of the song and there's no release date given for the parent album <em>The Girl of Your Dreams</em>. The sources also do not say how many of the 367,000 TikTok videos came after the Spotify No.1 so we can't be certain of the exact sequence of the viral explosion and the streaming peak.</p>

<p>Sources: <a href="https://www.instagram.com/p/Df-LM6rkltV/">ASCAP</a>, <a href="https://blacknews.uk/jamie-millers-babydoll-scores-fifth-consecutive-week-as-uks-no-1single">BlackNews UK</a>, <a href="https://www.buzzjack.com/forums/topic/290576-sales-we-26112026/?&do=findComment&comment=8079036">BuzzJack</a>, <a href="https://en.wikipedia.org/wiki/Stop_the_Wedding!">Wikipedia</a>, <a href="https://www.instagram.com/p/DgBPQMIjMxA/">Feedpitch</a>.</p>

<h2>Frequently asked questions</h2>
<h3>What is 'Stop The Wedding!' about?</h3>
<p>Ashe wrote it about her own first marriage—a breakup at the altar) from  the perspective of the wedding.</p>
<h3>Why did the song go viral on TikTok?</h3>
<p>Users picked it up for the videos around the red flags in relationships and it subsequently got into the trend spread from there to streaming, with 367,000 TikTok videos as of 17th November).</p>
$$,
$$<p>Ashe's 'Stop The Wedding!' has hit No 1 on the Spotify Global chart and No 2 on the UK Official Singles Chart, more than three months after its release on 7 August 2026. Ashe Stop The Wedding is a slow-burn hit built on TikTok, written about her own first marriage.</p>

<table>
<tr><td>Song</td><td>"Stop The Wedding!" — Ashe</td></tr>
<tr><td>Released</td><td>7 August 2026</td></tr>
<tr><td>Spotify Global</td><td>No. 1 (chart dated 18 November 2026)</td></tr>
<tr><td>UK Singles Chart</td><td>No. 2 (best-ever position; second week at No. 2)</td></tr>
<tr><td>UK sales</td><td>37,976 units in the week ending 26 November, up 5.29% on the week before</td></tr>
<tr><td>TikTok</td><td>367,000 videos by 17 November 2026</td></tr>
<tr><td>Written about</td><td>Her first marriage</td></tr>
<tr><td>Album</td><td><em>The Girl of Your Dreams</em></td></tr>
</table>

<h2>What happened</h2>

<p>The song's rise began on TikTok where it was being used in videos about red flags in relationships, according to <a href="https://en.wikipedia.org/wiki/Stop_the_Wedding!">Wikipedia</a>. From there, it onto the streaming charts, reaching No.5 on Spotify's most streamed song of the month for October and going on to top the Spotify Global chart on 18 November, as <a href="https://www.instagram.com/p/Df-LM6rkltV/">ASCAP</a> reported. In the UK, it has now spent two weeks at No. 2, its best-ever placing, and its sales continuing to climb (37,976 units in the most recent week, a 5.29% increase on the previous week to a new high) and the gap to the No. 1 song narrowing from 84.57% to 68.62%, per the <a href="https://www.buzzjack.com/forums/topic/290576-sales-we-26112026/?&do=findComment&comment=8079036">BuzzJack</a> sales report). The song standing in its way is Jamie Miller's "Babydoll" (covered in our report on <a href="https://growentix.cloud/articles/jamie-miller-babydoll-sixth-week-uk-number-one-20261123">Jamie Miller's sixth week at No. 1</a>, and the rest of the week's chart news is over on the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub.</p>

<h2>What the Ashe Stop The Wedding surge means</h2>

<p>It's a song that found its audience three months after it came out rather than in the first week  and the audience discovered it through other people's stories rather than any kind of launch campaign. A song about calling off a wedding (based on Ashe's own first marriage) and built around 12 tempo changes which as one review puts it is "like a panic attack in a veil" isn't the sort of thing you'd think would become a streaming hit. It did become a hit because of the TikTok trend which gave people a reason to use it in their own break-up stories. The UK numbers back this up:  the No1 song's sales are down for the second week in a row but Ashe's are still going up and up, which looks very much like a challenger rather than a song that's already peaked.</p>

<h2>What the sources do not say</h2>

<p>None of the cited sources have a US Hot 100 position for the song so there's nothing on the US chart position. There's absolutely nothing in any of the coverage to suggest that Ashe will push the song further with a new performance, a remix or a video of the song and there's no release date given for the parent album <em>The Girl of Your Dreams</em>. The sources also do not say how many of the 367,000 TikTok videos came after the Spotify No.1 so we can't be certain of the exact sequence of the viral explosion and the streaming peak.</p>

<p>Sources: <a href="https://www.instagram.com/p/Df-LM6rkltV/">ASCAP</a>, <a href="https://blacknews.uk/jamie-millers-babydoll-scores-fifth-consecutive-week-as-uks-no-1single">BlackNews UK</a>, <a href="https://www.buzzjack.com/forums/topic/290576-sales-we-26112026/?&do=findComment&comment=8079036">BuzzJack</a>, <a href="https://en.wikipedia.org/wiki/Stop_the_Wedding!">Wikipedia</a>, <a href="https://www.instagram.com/p/DgBPQMIjMxA/">Feedpitch</a>.</p>

<h2>Frequently asked questions</h2>
<h3>What is 'Stop The Wedding!' about?</h3>
<p>Ashe wrote it about her own first marriage—a breakup at the altar) from  the perspective of the wedding.</p>
<h3>Why did the song go viral on TikTok?</h3>
<p>Users picked it up for the videos around the red flags in relationships and it subsequently got into the trend spread from there to streaming, with 367,000 TikTok videos as of 17th November).</p>
$$,
ARRAY['https://www.instagram.com/p/Df-LM6rkltV/', 'https://blacknews.uk/jamie-millers-babydoll-scores-fifth-consecutive-week-as-uks-no-1single', 'https://www.buzzjack.com/forums/topic/290576-sales-we-26112026/?&do=findComment&comment=8079036', 'https://en.wikipedia.org/wiki/Stop_the_Wedding!', 'https://www.instagram.com/p/DgBPQMIjMxA/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- illit-break-even-billboard-200-top-10-20261124 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'illit-break-even-billboard-200-top-10-20261124', 'pop-music', 'USA',
'ILLIT BREAK EVEN Billboard 200: First Top 10 Debut',
'ILLIT BREAK EVEN Billboard 200: First Top 10 Debut',
'ILLIT BREAK EVEN Billboard 200 debut at No. 6, plus No. 1 on Top Album Sales, is the group''s first US top 10 album ever.',
'ILLIT BREAK EVEN Billboard 200 debut at No. 6, plus No. 1 on Top Album Sales, is the group''s first US top 10 album ever.',
$$<p>ILLIT's <em>BREAK EVEN</em> has become the group's first US top 10 album. The fifth mini album launched at No. 6 on the Billboard 200 and No. 1 on the Billboard Top Album Sales chart. That's a first for the group. BREAK EVEN Billboard 200 success did not stop there: it stayed on the Billboard 200 for a second week, another first for the group.</p>

<table>
<tr><td>Album</td><td><em>BREAK EVEN</em> — ILLIT</td></tr>
<tr><td>Released</td><td>26 October 2026</td></tr>
<tr><td>Billboard 200</td><td>No. 6 debut (chart dated 14 November 2026); No. 44 in week two</td></tr>
<tr><td>Top Album Sales</td><td>No. 1 debut; No. 2 in week two</td></tr>
<tr><td>First-week units</td><td>37,000 (32,500 pure sales; 4,500 streaming)</td></tr>
<tr><td>Previous best</td><td>No. 26 (<em>MAMIHLAPINATAPAI</em>)</td></tr>
<tr><td>Lead single</td><td>"You're Under Arrest"</td></tr>
<tr><td>First-week sales (Korea)</td><td>444,072 copies (Hanteo Chart)</td></tr>
</table>

<h2>What happened</h2>

<p>In its first US week, <em>BREAK EVEN</em> shifted 37,000 equivalent album units — and nearly nine in every ten of those were actual sales of the record: 32,500 pure sales against just 4,500 streaming units, <a href="https://beatshore.com/illits-break-even-debuts-at-no-6-on-the-billboard-200-first-top-10-and-first-u-s-album-sales-no-1/">BeatShore</a> reports. That sales strength lifted the group 20 places past its previous best on the chart. It also leaves ILLIT seventh on the all-time list of K-pop girl groups to reach the Billboard 200 top 10, in the company of BLACKPINK, TWICE, aespa, ITZY, NewJeans and LE SSERAFIM. The record is still going strong into its second week. The album is holding at No. 44 which is a first for ILLIT - more than a week on the Billboard 200. It's at No. 2 on both Top Album Sales and World Albums, as <a href="https://www.soompi.com/article/1888191wpp/illits-break-even-becomes-their-1st-album-to-spend-multiple-weeks-on-billboard-200">Soompi</a> reports. Title track 'You're Under Arrest' is climbing too, reaching No. 22 on the Billboard Global 200. The group are currently promoting as a four-member unit with <a href="https://inmusicblog.com/k-pop/illit-health-update-promotional-schedule-mama-awards/">Moka on hiatus for health reasons</a>. The same chart week also brought a career-best debut for fellow K-pop act P1Harmony, covered in our report on <a href="https://growentix.cloud/articles/p1harmony-blow-up-billboard-200-debut-20261122">P1Harmony's BLOW UP debut at No. 4</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the ILLIT BREAK EVEN Billboard 200 debut means</h2>

<p>The shape of this debut is actually far more revealing than the position. A No.6 album which is pretty much all purchase is an album which has a fanbase buying it rather than one which has been rocketed up the charts by a streaming spike — and the second-week hold at No. 44, with the album in the country, shows that fanbase didn't just vanish when the first week's spike was over. For a group who are less than three years past debut that's the difference between a one week headline and actually establishing a real presence in the world's largest music market. The movement of the title track up the Global 200 is the proof that the reach of the album is actually expanding beyond the core fanbase which is precisely what has to happen in the weeks ahead if ILLIT are to follow the girl groups who have come before them and made it into the top five.</p>

<h2>What the sources do not say</h2>

<p>There's no second week unit figure published in the sources so we can't actually quantify the size of the week two hold in sales. The coverage says absolutely nothing about when Moka is due to return from hiatus or whether ILLIT have any US tour dates as a result of this chart run. On the streaming front the sources make no comparison at all between these albums' streaming figures and those of the group's previous releases other than the first week split.</p>

<p>Sources: <a href="https://www.soompi.com/article/1888191wpp/illits-break-even-becomes-their-1st-album-to-spend-multiple-weeks-on-billboard-200">Soompi</a>, <a href="https://beatshore.com/illits-break-even-debuts-at-no-6-on-the-billboard-200-first-top-10-and-first-u-s-album-sales-no-1/">BeatShore</a>, <a href="https://ktownpost.com/k-pop/illits-youre-under-arrest-climbs-to-no-22-on-billboard-global-200-extending-chart-rise/">Ktown Post</a>, <a href="https://seolnotes.com/k-pop/kpop-news-2026-11-10/">SeolNotes</a>, <a href="https://inmusicblog.com/k-pop/illit-health-update-promotional-schedule-mama-awards/">InMusic Blog</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Is BREAK EVEN ILLIT's first Billboard 200 top 10?</h3>
<p>Yes their previous best had been No. 26 with <em>MAMIHLAPINATAPAI</em> so the No. 6 debut is a 20 place jump.</p>
<h3>Why is ILLIT being promoted as four members?</h3>
<p>Moka is on hiatus for health reasons at the moment so <em>BREAK EVEN</em> is the group's first project as a four member unit.</p>
$$,
$$<p>ILLIT's <em>BREAK EVEN</em> has become the group's first US top 10 album. The fifth mini album launched at No. 6 on the Billboard 200 and No. 1 on the Billboard Top Album Sales chart. That's a first for the group. BREAK EVEN Billboard 200 success did not stop there: it stayed on the Billboard 200 for a second week, another first for the group.</p>

<table>
<tr><td>Album</td><td><em>BREAK EVEN</em> — ILLIT</td></tr>
<tr><td>Released</td><td>26 October 2026</td></tr>
<tr><td>Billboard 200</td><td>No. 6 debut (chart dated 14 November 2026); No. 44 in week two</td></tr>
<tr><td>Top Album Sales</td><td>No. 1 debut; No. 2 in week two</td></tr>
<tr><td>First-week units</td><td>37,000 (32,500 pure sales; 4,500 streaming)</td></tr>
<tr><td>Previous best</td><td>No. 26 (<em>MAMIHLAPINATAPAI</em>)</td></tr>
<tr><td>Lead single</td><td>"You're Under Arrest"</td></tr>
<tr><td>First-week sales (Korea)</td><td>444,072 copies (Hanteo Chart)</td></tr>
</table>

<h2>What happened</h2>

<p>In its first US week, <em>BREAK EVEN</em> shifted 37,000 equivalent album units — and nearly nine in every ten of those were actual sales of the record: 32,500 pure sales against just 4,500 streaming units, <a href="https://beatshore.com/illits-break-even-debuts-at-no-6-on-the-billboard-200-first-top-10-and-first-u-s-album-sales-no-1/">BeatShore</a> reports. That sales strength lifted the group 20 places past its previous best on the chart. It also leaves ILLIT seventh on the all-time list of K-pop girl groups to reach the Billboard 200 top 10, in the company of BLACKPINK, TWICE, aespa, ITZY, NewJeans and LE SSERAFIM. The record is still going strong into its second week. The album is holding at No. 44 which is a first for ILLIT - more than a week on the Billboard 200. It's at No. 2 on both Top Album Sales and World Albums, as <a href="https://www.soompi.com/article/1888191wpp/illits-break-even-becomes-their-1st-album-to-spend-multiple-weeks-on-billboard-200">Soompi</a> reports. Title track 'You're Under Arrest' is climbing too, reaching No. 22 on the Billboard Global 200. The group are currently promoting as a four-member unit with <a href="https://inmusicblog.com/k-pop/illit-health-update-promotional-schedule-mama-awards/">Moka on hiatus for health reasons</a>. The same chart week also brought a career-best debut for fellow K-pop act P1Harmony, covered in our report on <a href="https://growentix.cloud/articles/p1harmony-blow-up-billboard-200-debut-20261122">P1Harmony's BLOW UP debut at No. 4</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the ILLIT BREAK EVEN Billboard 200 debut means</h2>

<p>The shape of this debut is actually far more revealing than the position. A No.6 album which is pretty much all purchase is an album which has a fanbase buying it rather than one which has been rocketed up the charts by a streaming spike — and the second-week hold at No. 44, with the album in the country, shows that fanbase didn't just vanish when the first week's spike was over. For a group who are less than three years past debut that's the difference between a one week headline and actually establishing a real presence in the world's largest music market. The movement of the title track up the Global 200 is the proof that the reach of the album is actually expanding beyond the core fanbase which is precisely what has to happen in the weeks ahead if ILLIT are to follow the girl groups who have come before them and made it into the top five.</p>

<h2>What the sources do not say</h2>

<p>There's no second week unit figure published in the sources so we can't actually quantify the size of the week two hold in sales. The coverage says absolutely nothing about when Moka is due to return from hiatus or whether ILLIT have any US tour dates as a result of this chart run. On the streaming front the sources make no comparison at all between these albums' streaming figures and those of the group's previous releases other than the first week split.</p>

<p>Sources: <a href="https://www.soompi.com/article/1888191wpp/illits-break-even-becomes-their-1st-album-to-spend-multiple-weeks-on-billboard-200">Soompi</a>, <a href="https://beatshore.com/illits-break-even-debuts-at-no-6-on-the-billboard-200-first-top-10-and-first-u-s-album-sales-no-1/">BeatShore</a>, <a href="https://ktownpost.com/k-pop/illits-youre-under-arrest-climbs-to-no-22-on-billboard-global-200-extending-chart-rise/">Ktown Post</a>, <a href="https://seolnotes.com/k-pop/kpop-news-2026-11-10/">SeolNotes</a>, <a href="https://inmusicblog.com/k-pop/illit-health-update-promotional-schedule-mama-awards/">InMusic Blog</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Is BREAK EVEN ILLIT's first Billboard 200 top 10?</h3>
<p>Yes their previous best had been No. 26 with <em>MAMIHLAPINATAPAI</em> so the No. 6 debut is a 20 place jump.</p>
<h3>Why is ILLIT being promoted as four members?</h3>
<p>Moka is on hiatus for health reasons at the moment so <em>BREAK EVEN</em> is the group's first project as a four member unit.</p>
$$,
ARRAY['https://www.soompi.com/article/1888191wpp/illits-break-even-becomes-their-1st-album-to-spend-multiple-weeks-on-billboard-200', 'https://beatshore.com/illits-break-even-debuts-at-no-6-on-the-billboard-200-first-top-10-and-first-u-s-album-sales-no-1/', 'https://ktownpost.com/k-pop/illits-youre-under-arrest-climbs-to-no-22-on-billboard-global-200-extending-chart-rise/', 'https://seolnotes.com/k-pop/kpop-news-2026-11-10/', 'https://inmusicblog.com/k-pop/illit-health-update-promotional-schedule-mama-awards/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- jade-angel-of-my-dreams-hot-100-debut-20261124 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'jade-angel-of-my-dreams-hot-100-debut-20261124', 'pop-music', 'USA',
'JADE Angel Of My Dreams Hot 100: First Solo Entry',
'JADE Angel Of My Dreams Hot 100: First Solo Entry',
'JADE Angel Of My Dreams Hot 100 debut at No. 70 is her first solo entry and a first for any Little Mix member as a soloist.',
'JADE Angel Of My Dreams Hot 100 debut at No. 70 is her first solo entry and a first for any Little Mix member as a soloist.',
$$<p>JADE's "Angel Of My Dreams" has entered the Billboard Hot 100 at No.70, more than two years after its release on 19th July 2024. The debut makes the former Little Mix singer the first member of Little Mix to make the Hot 100 as a solo artist  and JADE Angel Of My Dreams Hot 100 success on the chart came via a runway rather than a release week.</p>

<table>
<tr><td>Song</td><td>"Angel Of My Dreams" — JADE</td></tr>
<tr><td>Released</td><td>19 July 2024 (RCA Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 70 debut (chart dated 7 November 2026); No. 95 in week two</td></tr>
<tr><td>UK Singles Chart</td><td>No. 7 peak (2024); re-entered at No. 13 (week of 30 October 2026)</td></tr>
<tr><td>US streams</td><td>3.8 million in the week of 23–29 October, up 65%</td></tr>
<tr><td>Hot Dance/Pop Songs</td><td>No. 6 debut, rising to No. 4</td></tr>
<tr><td>Album</td><td><em>That's Showbiz Baby!</em> (debut solo album, 2025)</td></tr>
</table>

<h2>What happened</h2>

<p>The song was the soundtrack to Kylie Jenner's runway walk  at the Victoria's Secret Fashion Show in LA on the 18th October (she wore the  $50 m Fantasy Bra), according to <a href="https://people.com/jade-angel-of-my-dreams-kylie-jenner-victorias-secret-fashion-show-exclusive-12231501">People</a>. The clip went absolutely viral on TikTok with massive numbers: it had its biggest ever streaming day on the 20th October (4300% global increase, 1,400% increase in the UK). It  re-entered the UK singles chart at No. 13 (up 328.8% week on week  to 16,607 units) according to <a href="https://www.musicweek.com/talent/read/jade-s-angel-of-my-dreams-soars-back-into-uk-top-20-after-kylie-jenner-viral-moment/095374">Music Week</a> reports. JADE also performed the song at the Mercury Prize  in Newcastle. In the US it had 3.8 m official streams in the week of the 23rd-29th October (up 65%) and debuted at No. 70 on the Hot 100 dated 7 November (her first entry on the chart as a solo artist and the first for any Little Mix member, per <a href="https://www.rockumweb.com/reportes/2725/jade-makes-billboard-hot-100-history-as-angel-of-my-dreams-revives-two-years-after-release">RockumWeb</a>. The UK chart has more movers this week with <a href="https://growentix.cloud/articles/sombr-my-body-isnt-ready-uk-number-three-20261123">sombr's "My Body Isn't Ready" at No. 3</a> and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the JADE Angel Of My Dreams Hot 100 debut means</h2>

<p>A two year old debut single making it onto the Hot 100 for the very first time isn't how chart careers are meant to work  and that's why it's such a big deal. "Angel Of My Dreams" did it in 2024, reached No.7 in the UK and picked up a BRIT Song of the Year nomination, but it just simply didn't break over in the US. One runway walk  in a week did it. A 30 second soundtrack slot, a $50m bra and a massive TikTok campaign. It did what two years of promotion had failed to do and it also effectively put the quiet war between the former Little Mix girls to an end with JADE being the first of the girls to make the Hot 100 on her own. The revival has also seen her debut album see <em>That's Showbiz Baby!</em> consumption up by 55.25% in the same week.</p>

<h2>What the sources do not say</h2>

<p>The song has already dropped off the Hot 100 (it was at No.95 in  week and is <a href="https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/">off the chart dated 21 November</a> — and the sources at all to suggest it's on the way back or that the revival has peaked. Nothing in the reports and nothing to indicate she'll be playing it on US TV. The sources give absolutely zero indication as to how much of the streaming surge was from the US as opposed to the UK and the rest of the world.</p>

<p>Sources: <a href="https://www.rockumweb.com/reportes/2725/jade-makes-billboard-hot-100-history-as-angel-of-my-dreams-revives-two-years-after-release">RockumWeb</a>, <a href="https://people.com/jade-angel-of-my-dreams-kylie-jenner-victorias-secret-fashion-show-exclusive-12231501">People</a>, <a href="https://www.musicweek.com/talent/read/jade-s-angel-of-my-dreams-soars-back-into-uk-top-20-after-kylie-jenner-viral-moment/095374">Music Week</a>, <a href="https://en.wikipedia.org/wiki/Angel_of_My_Dreams">Wikipedia</a>, <a href="https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/">Creative Disc</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Was 'Angel Of My Dreams' a hit when it came out?</h3>
<p>Yes in the UK where it made its debut and hit No 7 in July 2024 and was nominated for BRIT Song of the Year. The 2026 run is a revival, not a first hit.</p>
<h3>Is JADE the first Little Mix member to have had a solo entry on the Hot 100 as a soloist?</h3>
<p>Yes. Her No. 70 debut makes her the first  Little Mix member to have hit the Billboard Hot 100 as a solo artist.</p>
$$,
$$<p>JADE's "Angel Of My Dreams" has entered the Billboard Hot 100 at No.70, more than two years after its release on 19th July 2024. The debut makes the former Little Mix singer the first member of Little Mix to make the Hot 100 as a solo artist  and JADE Angel Of My Dreams Hot 100 success on the chart came via a runway rather than a release week.</p>

<table>
<tr><td>Song</td><td>"Angel Of My Dreams" — JADE</td></tr>
<tr><td>Released</td><td>19 July 2024 (RCA Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 70 debut (chart dated 7 November 2026); No. 95 in week two</td></tr>
<tr><td>UK Singles Chart</td><td>No. 7 peak (2024); re-entered at No. 13 (week of 30 October 2026)</td></tr>
<tr><td>US streams</td><td>3.8 million in the week of 23–29 October, up 65%</td></tr>
<tr><td>Hot Dance/Pop Songs</td><td>No. 6 debut, rising to No. 4</td></tr>
<tr><td>Album</td><td><em>That's Showbiz Baby!</em> (debut solo album, 2025)</td></tr>
</table>

<h2>What happened</h2>

<p>The song was the soundtrack to Kylie Jenner's runway walk  at the Victoria's Secret Fashion Show in LA on the 18th October (she wore the  $50 m Fantasy Bra), according to <a href="https://people.com/jade-angel-of-my-dreams-kylie-jenner-victorias-secret-fashion-show-exclusive-12231501">People</a>. The clip went absolutely viral on TikTok with massive numbers: it had its biggest ever streaming day on the 20th October (4300% global increase, 1,400% increase in the UK). It  re-entered the UK singles chart at No. 13 (up 328.8% week on week  to 16,607 units) according to <a href="https://www.musicweek.com/talent/read/jade-s-angel-of-my-dreams-soars-back-into-uk-top-20-after-kylie-jenner-viral-moment/095374">Music Week</a> reports. JADE also performed the song at the Mercury Prize  in Newcastle. In the US it had 3.8 m official streams in the week of the 23rd-29th October (up 65%) and debuted at No. 70 on the Hot 100 dated 7 November (her first entry on the chart as a solo artist and the first for any Little Mix member, per <a href="https://www.rockumweb.com/reportes/2725/jade-makes-billboard-hot-100-history-as-angel-of-my-dreams-revives-two-years-after-release">RockumWeb</a>. The UK chart has more movers this week with <a href="https://growentix.cloud/articles/sombr-my-body-isnt-ready-uk-number-three-20261123">sombr's "My Body Isn't Ready" at No. 3</a> and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the JADE Angel Of My Dreams Hot 100 debut means</h2>

<p>A two year old debut single making it onto the Hot 100 for the very first time isn't how chart careers are meant to work  and that's why it's such a big deal. "Angel Of My Dreams" did it in 2024, reached No.7 in the UK and picked up a BRIT Song of the Year nomination, but it just simply didn't break over in the US. One runway walk  in a week did it. A 30 second soundtrack slot, a $50m bra and a massive TikTok campaign. It did what two years of promotion had failed to do and it also effectively put the quiet war between the former Little Mix girls to an end with JADE being the first of the girls to make the Hot 100 on her own. The revival has also seen her debut album see <em>That's Showbiz Baby!</em> consumption up by 55.25% in the same week.</p>

<h2>What the sources do not say</h2>

<p>The song has already dropped off the Hot 100 (it was at No.95 in  week and is <a href="https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/">off the chart dated 21 November</a> — and the sources at all to suggest it's on the way back or that the revival has peaked. Nothing in the reports and nothing to indicate she'll be playing it on US TV. The sources give absolutely zero indication as to how much of the streaming surge was from the US as opposed to the UK and the rest of the world.</p>

<p>Sources: <a href="https://www.rockumweb.com/reportes/2725/jade-makes-billboard-hot-100-history-as-angel-of-my-dreams-revives-two-years-after-release">RockumWeb</a>, <a href="https://people.com/jade-angel-of-my-dreams-kylie-jenner-victorias-secret-fashion-show-exclusive-12231501">People</a>, <a href="https://www.musicweek.com/talent/read/jade-s-angel-of-my-dreams-soars-back-into-uk-top-20-after-kylie-jenner-viral-moment/095374">Music Week</a>, <a href="https://en.wikipedia.org/wiki/Angel_of_My_Dreams">Wikipedia</a>, <a href="https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/">Creative Disc</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Was 'Angel Of My Dreams' a hit when it came out?</h3>
<p>Yes in the UK where it made its debut and hit No 7 in July 2024 and was nominated for BRIT Song of the Year. The 2026 run is a revival, not a first hit.</p>
<h3>Is JADE the first Little Mix member to have had a solo entry on the Hot 100 as a soloist?</h3>
<p>Yes. Her No. 70 debut makes her the first  Little Mix member to have hit the Billboard Hot 100 as a solo artist.</p>
$$,
ARRAY['https://www.rockumweb.com/reportes/2725/jade-makes-billboard-hot-100-history-as-angel-of-my-dreams-revives-two-years-after-release', 'https://people.com/jade-angel-of-my-dreams-kylie-jenner-victorias-secret-fashion-show-exclusive-12231501', 'https://www.musicweek.com/talent/read/jade-s-angel-of-my-dreams-soars-back-into-uk-top-20-after-kylie-jenner-viral-moment/095374', 'https://en.wikipedia.org/wiki/Angel_of_My_Dreams', 'https://creativedisc.com/2026/11/billboard-hot-100-21-november-2026/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- james-blunt-airplane-mode-uk-number-one-20261124 (pop-music; UK; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'james-blunt-airplane-mode-uk-number-one-20261124', 'pop-music', 'UK',
'James Blunt Airplane Mode Takes UK No. 1 Album',
'James Blunt Airplane Mode Takes UK No. 1 Album',
'James Blunt Airplane Mode is his first UK No. 1 album in 19 years, and it came with a promise to change his name to Ryan Air.',
'James Blunt Airplane Mode is his first UK No. 1 album in 19 years, and it came with a promise to change his name to Ryan Air.',
$$<p>James Blunt's <em>Airplane Mode</em> has shot straight to No1 on the UK Official Albums Chart (his first  album to do so in 19 years. The record, released on 6 November 2026, is his third No. 1 — and comes with the name change promise which he now has to keep.</p>

<table>
<tr><td>Album</td><td><em>Airplane Mode</em> — James Blunt</td></tr>
<tr><td>Released</td><td>6 November 2026 (Atlantic Records)</td></tr>
<tr><td>Chart</td><td>Official Albums Chart (published 13 November, week ending 19 November 2026)</td></tr>
<tr><td>Position</td><td>No. 1 (new entry; third No. 1 album)</td></tr>
<tr><td>First-week sales</td><td>26,318 units (17,201 CDs; 4,396 vinyl; 2,761 downloads; 1,955 streaming)</td></tr>
<tr><td>Runner-up</td><td><em>Dead Company</em> — Royal Blood (No. 2)</td></tr>
<tr><td>Last No. 1</td><td><em>All The Lost Souls</em> (2007)</td></tr>
<tr><td>Also</td><td><em>Back To Bedlam</em> spent 10 weeks at No. 1 (2005)</td></tr>
</table>

<h2>What happened</h2>

<p>The chart race was very close.  Royal Blood's <em>Dead Company</em> led by around 300 sales, but Blunt reversed that in the final two days of the week to take the top spot by over 4000 units (according to <a href="https://tml.news/stories/james-blunt-first-number-one-19-years/">TML News</a>. The sales mix tells the story of the album too: of the 26,318 units, 17,201 were CDs and 4,396 were vinyl so it's a physical led No.1 from a fanbase that still buys records. The album arrived amid the attention generated by Blunt's run on <em>The Celebrity Traitors</em>(he was ultimately banished in the endgame two weeks prior). Before the chart was announced he'd promised the fans he would legally change his name legally to Ryan Air (a play on the airline Ryanair — if the record reached No. 1, and on 16th November he did in fact post what he described as a deed poll application under the name "Ryan Bel Air". The <a href="https://www.officialcharts.com/charts/albums-chart/20261120/7502/">Official Charts</a> now have the album at No.16 in its second week, with <a href="https://growentix.cloud/articles/u2-carnaval-de-luz-uk-albums-chart-number-one-20261122">U2's Carnaval De Luz holding the No. 1 spot</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the James Blunt Airplane Mode comeback means</h2>

<p>Nineteen years between No.1 albums is pretty much the length of a career and the way this one came about is as important as the gap. It wasn't a streaming driven comeback (less than 2,000 of the 26,318 units sold were from streaming, <em>Airplane Mode</em> won on CDs and vinyl bought by the die hard fans who have been with Blunt since <em>Back To Bedlam</em>. The <em>Celebrity Traitors</em> run gave him a new audience at  the perfect time and the name change bet gave that audience a reason to keep an eye on the chart every single day. It's a reminder that the UK albums chart  the old way (i.e. people going into a shop and buying it, or clicking 'buy' on a physical copy) in the release week.</p>

<h2>What the sources do not say</h2>

<p><a href="https://www.go-to-ireland.com/james-blunt-ryan-air-ryanair-name-change/">Go-To-Ireland</a> points out that Official Charts reported the deed poll and made absolutely no attempt to verify the deed poll or indeed that the process has actually been completed — so the name change is not confirmed as done. The name on the application (Ryan Bel Air) is in fact not  the name he'd previously promised (Ryan Air). There are no streaming figures from the sources at all other than the 1,955 streaming equivalent units and we are given absolutely nothing to suggest that Blunt is going to be touring the album.</p>

<p>Sources: <a href="https://www.officialcharts.com/charts/albums-chart/20261120/7502/">Official Charts</a>, <a href="http://www.music-news.com/news/UK/192257/James-Blunt-lands-first-Number-1-album-in-19-years-with-Airplane-Mode?utm_source=dlvr.it&utm_medium=threads">Music-News.com</a>, <a href="https://tml.news/stories/james-blunt-first-number-one-19-years/">TML News</a>, <a href="https://www.go-to-ireland.com/james-blunt-ryan-air-ryanair-name-change/">Go-To-Ireland</a>, <a href="https://www.power106.com/2026/11/15/james-blunt-tops-uk-albums-chart-for-first-time-in-nearly-20-years/">Power 106</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Did James Blunt really go from James Blunt to Ryan Air?</h3>
<p>He shared what he calls a Deed Poll application under the name "Ryan Bel Air" on 16 November. Still, Official Charts team have been extremely careful in their coverage. They haven’t confirmed the Deed Poll itself or whether the document nor the completion of the change has actually happened.</p>
<h3>When was James Blunt's last No.1 album?</h3>
<p><em>All The Lost Souls</em> in 2007 — 19 years before <em>Airplane Mode</em>.</p>
$$,
$$<p>James Blunt's <em>Airplane Mode</em> has shot straight to No1 on the UK Official Albums Chart (his first  album to do so in 19 years. The record, released on 6 November 2026, is his third No. 1 — and comes with the name change promise which he now has to keep.</p>

<table>
<tr><td>Album</td><td><em>Airplane Mode</em> — James Blunt</td></tr>
<tr><td>Released</td><td>6 November 2026 (Atlantic Records)</td></tr>
<tr><td>Chart</td><td>Official Albums Chart (published 13 November, week ending 19 November 2026)</td></tr>
<tr><td>Position</td><td>No. 1 (new entry; third No. 1 album)</td></tr>
<tr><td>First-week sales</td><td>26,318 units (17,201 CDs; 4,396 vinyl; 2,761 downloads; 1,955 streaming)</td></tr>
<tr><td>Runner-up</td><td><em>Dead Company</em> — Royal Blood (No. 2)</td></tr>
<tr><td>Last No. 1</td><td><em>All The Lost Souls</em> (2007)</td></tr>
<tr><td>Also</td><td><em>Back To Bedlam</em> spent 10 weeks at No. 1 (2005)</td></tr>
</table>

<h2>What happened</h2>

<p>The chart race was very close.  Royal Blood's <em>Dead Company</em> led by around 300 sales, but Blunt reversed that in the final two days of the week to take the top spot by over 4000 units (according to <a href="https://tml.news/stories/james-blunt-first-number-one-19-years/">TML News</a>. The sales mix tells the story of the album too: of the 26,318 units, 17,201 were CDs and 4,396 were vinyl so it's a physical led No.1 from a fanbase that still buys records. The album arrived amid the attention generated by Blunt's run on <em>The Celebrity Traitors</em>(he was ultimately banished in the endgame two weeks prior). Before the chart was announced he'd promised the fans he would legally change his name legally to Ryan Air (a play on the airline Ryanair — if the record reached No. 1, and on 16th November he did in fact post what he described as a deed poll application under the name "Ryan Bel Air". The <a href="https://www.officialcharts.com/charts/albums-chart/20261120/7502/">Official Charts</a> now have the album at No.16 in its second week, with <a href="https://growentix.cloud/articles/u2-carnaval-de-luz-uk-albums-chart-number-one-20261122">U2's Carnaval De Luz holding the No. 1 spot</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the James Blunt Airplane Mode comeback means</h2>

<p>Nineteen years between No.1 albums is pretty much the length of a career and the way this one came about is as important as the gap. It wasn't a streaming driven comeback (less than 2,000 of the 26,318 units sold were from streaming, <em>Airplane Mode</em> won on CDs and vinyl bought by the die hard fans who have been with Blunt since <em>Back To Bedlam</em>. The <em>Celebrity Traitors</em> run gave him a new audience at  the perfect time and the name change bet gave that audience a reason to keep an eye on the chart every single day. It's a reminder that the UK albums chart  the old way (i.e. people going into a shop and buying it, or clicking 'buy' on a physical copy) in the release week.</p>

<h2>What the sources do not say</h2>

<p><a href="https://www.go-to-ireland.com/james-blunt-ryan-air-ryanair-name-change/">Go-To-Ireland</a> points out that Official Charts reported the deed poll and made absolutely no attempt to verify the deed poll or indeed that the process has actually been completed — so the name change is not confirmed as done. The name on the application (Ryan Bel Air) is in fact not  the name he'd previously promised (Ryan Air). There are no streaming figures from the sources at all other than the 1,955 streaming equivalent units and we are given absolutely nothing to suggest that Blunt is going to be touring the album.</p>

<p>Sources: <a href="https://www.officialcharts.com/charts/albums-chart/20261120/7502/">Official Charts</a>, <a href="http://www.music-news.com/news/UK/192257/James-Blunt-lands-first-Number-1-album-in-19-years-with-Airplane-Mode?utm_source=dlvr.it&utm_medium=threads">Music-News.com</a>, <a href="https://tml.news/stories/james-blunt-first-number-one-19-years/">TML News</a>, <a href="https://www.go-to-ireland.com/james-blunt-ryan-air-ryanair-name-change/">Go-To-Ireland</a>, <a href="https://www.power106.com/2026/11/15/james-blunt-tops-uk-albums-chart-for-first-time-in-nearly-20-years/">Power 106</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Did James Blunt really go from James Blunt to Ryan Air?</h3>
<p>He shared what he calls a Deed Poll application under the name "Ryan Bel Air" on 16 November. Still, Official Charts team have been extremely careful in their coverage. They haven’t confirmed the Deed Poll itself or whether the document nor the completion of the change has actually happened.</p>
<h3>When was James Blunt's last No.1 album?</h3>
<p><em>All The Lost Souls</em> in 2007 — 19 years before <em>Airplane Mode</em>.</p>
$$,
ARRAY['https://www.officialcharts.com/charts/albums-chart/20261120/7502/', 'http://www.music-news.com/news/UK/192257/James-Blunt-lands-first-Number-1-album-in-19-years-with-Airplane-Mode?utm_source=dlvr.it&utm_medium=threads', 'https://tml.news/stories/james-blunt-first-number-one-19-years/', 'https://www.go-to-ireland.com/james-blunt-ryan-air-ryanair-name-change/', 'https://www.power106.com/2026/11/15/james-blunt-tops-uk-albums-chart-for-first-time-in-nearly-20-years/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- olivia-rodrigo-chappell-roan-expectations-hot-100-20261124 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'olivia-rodrigo-chappell-roan-expectations-hot-100-20261124', 'pop-music', 'USA',
'Olivia Rodrigo Chappell Roan Expectations Hits No. 3',
'Olivia Rodrigo Chappell Roan Expectations Hits No. 3',
'Olivia Rodrigo Chappell Roan expectations jumped from No. 63 to No. 3 on the Hot 100 after the remix, and to No. 3 in the UK too.',
'Olivia Rodrigo Chappell Roan expectations jumped from No. 63 to No. 3 on the Hot 100 after the remix, and to No. 3 in the UK too.',
$$<p>Olivia Rodrigo and Chappell Roan's 'expectations' remix has turned an album track into a top-three hit. The remix (released in mid-Oct 2026) has seen 'expectations' leap from No. 63 to No. 3 on the Billboard Hot 100  and  No. 3 in the UK as well.</p>

<table>
<tr><td>Song</td><td>"expectations" — Olivia Rodrigo featuring Chappell Roan</td></tr>
<tr><td>Album</td><td><em>you seem pretty sad for a girl so in love</em> (released 12 June 2026)</td></tr>
<tr><td>Remix released</td><td>15 October 2026 (Interscope Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 3 (chart dated 31 October 2026); No. 17 on the 21 November chart</td></tr>
<tr><td>UK Singles Chart</td><td>No. 3 (chart dated 23 October 2026)</td></tr>
<tr><td>Billboard Global 200</td><td>No. 2</td></tr>
<tr><td>Also charted</td><td>No. 2 in Australia and Ireland; No. 6 in Canada</td></tr>
<tr><td>Video</td><td>Directed by Bardia Zeinali; David Byrne as game-show host Johnny Johnson</td></tr>
</table>

<h2>What happened</h2>

<p>"Expectations" began life as an album track: it debuted at No. 20 on the Hot 100 in June, No.56 in the UK) and just sort of sat there for four months. The remix changed everything. Roan adds a  verse about dating women and some of the choruses are altered to refer to women instead of men, according to <a href="https://en.wikipedia.org/wiki/Expectations_(Olivia_Rodrigo_song)">Wikipedia</a>. It is Roan's first feature and Rodrigo's first remix. The response was instant: it rocketed up 60 places to No.3 on the Hot 100, generated 4.595m global Spotify streams on day one and the video amassed 6.4m views in 24 hours, as <a href="https://stupiddope.com/2026/11/olivia-rodrigo-and-chappell-roan-team-up-on-the-expectations-remix/">StupidDope</a> reports. The video sees the two  as  contestants on a retro game show called The Big Expectations Show with  David Byrne (Talking Heads) as the host. It remained in the Hot 100 top 10 all the way through to November (peaking at No.7 on the 7th November) and the album itself is still in the charts (our report on <a href="https://growentix.cloud/articles/olivia-rodrigo-billboard-200-fifth-week-number-one-20261122">Olivia Rodrigo's fifth week at No.1 on the Billboard 200</a> covers that run). The <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the  chart news for the week.</p>

<h2>What the Olivia Rodrigo Chappell Roan expectations remix means</h2>

<p>A 60 place jump is not a slow burn at all; it's a proper mainstream pop event  in the charts and it shows what a good remix can do to a song that's  already had its moment as an album track. Putting together two of the defining pop voices of the moment (Rodrigo, whose third album has spent five weeks at No. 1, and Roan whose verse actually reworks the song rather than just adding to it) gave the track a second story to tell and the chart has duly rewarded it on both sides of the Atlantic. It also highlights just how much of the  life of the album now comes from the singles that have been released months after the record: "expectations" is the album's fourth single and its re-emergence has kept the record in the charts into its sixth month.</p>

<h2>What the sources do not say</h2>

<p>Some of the coverage have the remix single dated 16th October rather than 15th October and the sources provide no explanation for the one day difference so the article continues with <a href="https://en.wikipedia.org/wiki/Expectations_(Olivia_Rodrigo_song)">Wikipedia's</a> 15th October date. There's nothing in the press reports to suggest that Rodrigo and Roan will be performing the song together live or that there's another remix on the way from the album. As for the streaming/sales split for the  opening week, the day-one Spotify number so we don't actually know the precise mix that led to the No. 3 debut is not stated.</p>

<p>Sources: <a href="https://en.wikipedia.org/wiki/Expectations_(Olivia_Rodrigo_song)">Wikipedia</a>, <a href="https://stupiddope.com/2026/11/olivia-rodrigo-and-chappell-roan-team-up-on-the-expectations-remix/">StupidDope</a>, <a href="https://webdisk.explainsong.com/songs/olivia-rodrigo-chappell-roan-expectations.html">ExplainSong</a>, <a href="https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/">BuzzJack</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Is 'expectations' a new song?</h3>
<p>It's an album track from <em>you seem pretty sad for a girl so in love</em>, released in June 2026; the Chappell Roan remix came out in October  and that's what sent it up to No. 3.</p>
<h3>What did Chappell Roan change in the remix?</h3>
<p>She added a new verse about dating women and some of the choruses have been altered to refer to women rather than men.</p>
$$,
$$<p>Olivia Rodrigo and Chappell Roan's 'expectations' remix has turned an album track into a top-three hit. The remix (released in mid-Oct 2026) has seen 'expectations' leap from No. 63 to No. 3 on the Billboard Hot 100  and  No. 3 in the UK as well.</p>

<table>
<tr><td>Song</td><td>"expectations" — Olivia Rodrigo featuring Chappell Roan</td></tr>
<tr><td>Album</td><td><em>you seem pretty sad for a girl so in love</em> (released 12 June 2026)</td></tr>
<tr><td>Remix released</td><td>15 October 2026 (Interscope Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 3 (chart dated 31 October 2026); No. 17 on the 21 November chart</td></tr>
<tr><td>UK Singles Chart</td><td>No. 3 (chart dated 23 October 2026)</td></tr>
<tr><td>Billboard Global 200</td><td>No. 2</td></tr>
<tr><td>Also charted</td><td>No. 2 in Australia and Ireland; No. 6 in Canada</td></tr>
<tr><td>Video</td><td>Directed by Bardia Zeinali; David Byrne as game-show host Johnny Johnson</td></tr>
</table>

<h2>What happened</h2>

<p>"Expectations" began life as an album track: it debuted at No. 20 on the Hot 100 in June, No.56 in the UK) and just sort of sat there for four months. The remix changed everything. Roan adds a  verse about dating women and some of the choruses are altered to refer to women instead of men, according to <a href="https://en.wikipedia.org/wiki/Expectations_(Olivia_Rodrigo_song)">Wikipedia</a>. It is Roan's first feature and Rodrigo's first remix. The response was instant: it rocketed up 60 places to No.3 on the Hot 100, generated 4.595m global Spotify streams on day one and the video amassed 6.4m views in 24 hours, as <a href="https://stupiddope.com/2026/11/olivia-rodrigo-and-chappell-roan-team-up-on-the-expectations-remix/">StupidDope</a> reports. The video sees the two  as  contestants on a retro game show called The Big Expectations Show with  David Byrne (Talking Heads) as the host. It remained in the Hot 100 top 10 all the way through to November (peaking at No.7 on the 7th November) and the album itself is still in the charts (our report on <a href="https://growentix.cloud/articles/olivia-rodrigo-billboard-200-fifth-week-number-one-20261122">Olivia Rodrigo's fifth week at No.1 on the Billboard 200</a> covers that run). The <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the  chart news for the week.</p>

<h2>What the Olivia Rodrigo Chappell Roan expectations remix means</h2>

<p>A 60 place jump is not a slow burn at all; it's a proper mainstream pop event  in the charts and it shows what a good remix can do to a song that's  already had its moment as an album track. Putting together two of the defining pop voices of the moment (Rodrigo, whose third album has spent five weeks at No. 1, and Roan whose verse actually reworks the song rather than just adding to it) gave the track a second story to tell and the chart has duly rewarded it on both sides of the Atlantic. It also highlights just how much of the  life of the album now comes from the singles that have been released months after the record: "expectations" is the album's fourth single and its re-emergence has kept the record in the charts into its sixth month.</p>

<h2>What the sources do not say</h2>

<p>Some of the coverage have the remix single dated 16th October rather than 15th October and the sources provide no explanation for the one day difference so the article continues with <a href="https://en.wikipedia.org/wiki/Expectations_(Olivia_Rodrigo_song)">Wikipedia's</a> 15th October date. There's nothing in the press reports to suggest that Rodrigo and Roan will be performing the song together live or that there's another remix on the way from the album. As for the streaming/sales split for the  opening week, the day-one Spotify number so we don't actually know the precise mix that led to the No. 3 debut is not stated.</p>

<p>Sources: <a href="https://en.wikipedia.org/wiki/Expectations_(Olivia_Rodrigo_song)">Wikipedia</a>, <a href="https://stupiddope.com/2026/11/olivia-rodrigo-and-chappell-roan-team-up-on-the-expectations-remix/">StupidDope</a>, <a href="https://webdisk.explainsong.com/songs/olivia-rodrigo-chappell-roan-expectations.html">ExplainSong</a>, <a href="https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/">BuzzJack</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Is 'expectations' a new song?</h3>
<p>It's an album track from <em>you seem pretty sad for a girl so in love</em>, released in June 2026; the Chappell Roan remix came out in October  and that's what sent it up to No. 3.</p>
<h3>What did Chappell Roan change in the remix?</h3>
<p>She added a new verse about dating women and some of the choruses have been altered to refer to women rather than men.</p>
$$,
ARRAY['https://en.wikipedia.org/wiki/Expectations_(Olivia_Rodrigo_song)', 'https://stupiddope.com/2026/11/olivia-rodrigo-and-chappell-roan-team-up-on-the-expectations-remix/', 'https://webdisk.explainsong.com/songs/olivia-rodrigo-chappell-roan-expectations.html', 'https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- stella-lefty-boston-hot-100-number-two-20261124 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'stella-lefty-boston-hot-100-number-two-20261124', 'pop-music', 'USA',
'Stella Lefty Boston Hot 100: Back at No. 2',
'Stella Lefty Boston Hot 100: Back at No. 2',
'Stella Lefty Boston Hot 100 return to No. 2 after 32 weeks matches its August peak behind Ella Langley''s Choosin'' Texas.',
'Stella Lefty Boston Hot 100 return to No. 2 after 32 weeks matches its August peak behind Ella Langley''s Choosin'' Texas.',
$$<p>Stella Lefty's "Boston" is back at No.2 on the Billboard Hot 100 (32 weeks since it first appeared on the chart). The country-pop single (released 27th March 2026) has reached exactly the same peak as it did when it first appeared on the chart back in August  and Stella Lefty's "Boston" Hot 100 success is very much still going on with just one song in front of it.</p>

<table>
<tr><td>Song</td><td>"Boston" — Stella Lefty</td></tr>
<tr><td>Released</td><td>27 March 2026 (Atlantic Outpost)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 2 (chart dated 21 November 2026), up from No. 5; 32 weeks on chart</td></tr>
<tr><td>Peak</td><td>No. 2 (first reached August 2026)</td></tr>
<tr><td>Country Airplay</td><td>No. 1 for a second straight week</td></tr>
<tr><td>Album</td><td><em>Long Way Home</em> (released 21 August 2026)</td></tr>
<tr><td>Also</td><td>Top five in Australia, Canada, New Zealand and the UK</td></tr>
</table>

<h2>What happened</h2>

<p>"Boston" started out as an unfinished chorus. Lefty posted a video of herself singing part of it on TikTok (she'd only written  half  the chorus at that point) and it went viral with other users creating their own videos using the song, according to <a href="https://en.wikipedia.org/wiki/Boston_(Stella_Lefty_song)">Wikipedia</a>. She wrote it after she'd started a relationship with country singer Vincent Mason and contains bits of Noah Kahan's "Stick Season". The single debuted at No 95 on the Hot 100 in April, hit No 20 by early June and then climbed to No 2 in August. It's now 32 weeks in and is back at No 2 from No 5 on the chart dated 21 November (per the <a href="https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/">BuzzJack</a> chart listing). On country radio it's doing even better, having taken the Country Airplay for a second week running (the first solo female artist with a debut single to lead that chart for multiple weeks since Gretchen Wilson, according to <a href="https://www2.trendyhiphop.com/songs/stella-lefty-boston/">Trendy Hip Hop</a>. The only song ahead of it is <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-28-weeks-hot-100-record-20261117">Ella Langley's  "Choosin' Texas"</a> and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Stella Lefty Boston Hot 100 return means</h2>

<p>A song that peaks at No.2, then fades and then re-emerges to peak at No.2 again eight months later is behaving in a completely different way to a normal hit. Most singles just die off within a matter of weeks. "Boston" has now spent 32 weeks on the Hot 100 and matched its best position twice. It's a song with a very different life cycle in that it's being consumed by two very different audiences at  the TikTok and streaming crowd that found it first, and country radio which it's now had a two week run at No.1. It's also put Lefty (a debut artist who only really started posting  on TikTok in 2022) one spot away from the top of the biggest singles chart in the world (he's just one spot behind a song that's been at No.1 for 28 weeks and has beaten every other song off it over that period of time).</p>

<h2>What the sources do not say</h2>

<p>The sources are split on the song's UK peak (one has it at No.3, the other at No.4) so the article simply states  it reached the top five in the UK. There's nothing in the reporting to suggest there was a follow up single to "Boston" and no setlist or supporting act is mentioned for the Long Way Home Tour which gets underway in Jan 2027. The sources give no indication as to whether the song's second climb to No. 2 was driven by streaming, radio or sales.</p>

<p>Sources: <a href="https://en.wikipedia.org/wiki/Boston_(Stella_Lefty_song)">Wikipedia</a>, <a href="https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/">BuzzJack</a>, <a href="https://www2.trendyhiphop.com/songs/stella-lefty-boston/">Trendy Hip Hop</a>, <a href="https://en.wikipedia.org/wiki/Stella_Lefty">Wikipedia</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Was 'Boston' Stella Lefty's first hit?</h3>
<p>Yes it's her very first entry on the Billboard Hot 100. The only real difference is that the chorus she'd left half-written on TikTok has now gone viral.</p>
<h3>When is Stella Lefty's tour?</h3>
<p>The Long Way Home Tour (her first headlining tour) gets under way in January 2027.</p>
$$,
$$<p>Stella Lefty's "Boston" is back at No.2 on the Billboard Hot 100 (32 weeks since it first appeared on the chart). The country-pop single (released 27th March 2026) has reached exactly the same peak as it did when it first appeared on the chart back in August  and Stella Lefty's "Boston" Hot 100 success is very much still going on with just one song in front of it.</p>

<table>
<tr><td>Song</td><td>"Boston" — Stella Lefty</td></tr>
<tr><td>Released</td><td>27 March 2026 (Atlantic Outpost)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 2 (chart dated 21 November 2026), up from No. 5; 32 weeks on chart</td></tr>
<tr><td>Peak</td><td>No. 2 (first reached August 2026)</td></tr>
<tr><td>Country Airplay</td><td>No. 1 for a second straight week</td></tr>
<tr><td>Album</td><td><em>Long Way Home</em> (released 21 August 2026)</td></tr>
<tr><td>Also</td><td>Top five in Australia, Canada, New Zealand and the UK</td></tr>
</table>

<h2>What happened</h2>

<p>"Boston" started out as an unfinished chorus. Lefty posted a video of herself singing part of it on TikTok (she'd only written  half  the chorus at that point) and it went viral with other users creating their own videos using the song, according to <a href="https://en.wikipedia.org/wiki/Boston_(Stella_Lefty_song)">Wikipedia</a>. She wrote it after she'd started a relationship with country singer Vincent Mason and contains bits of Noah Kahan's "Stick Season". The single debuted at No 95 on the Hot 100 in April, hit No 20 by early June and then climbed to No 2 in August. It's now 32 weeks in and is back at No 2 from No 5 on the chart dated 21 November (per the <a href="https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/">BuzzJack</a> chart listing). On country radio it's doing even better, having taken the Country Airplay for a second week running (the first solo female artist with a debut single to lead that chart for multiple weeks since Gretchen Wilson, according to <a href="https://www2.trendyhiphop.com/songs/stella-lefty-boston/">Trendy Hip Hop</a>. The only song ahead of it is <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-28-weeks-hot-100-record-20261117">Ella Langley's  "Choosin' Texas"</a> and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Stella Lefty Boston Hot 100 return means</h2>

<p>A song that peaks at No.2, then fades and then re-emerges to peak at No.2 again eight months later is behaving in a completely different way to a normal hit. Most singles just die off within a matter of weeks. "Boston" has now spent 32 weeks on the Hot 100 and matched its best position twice. It's a song with a very different life cycle in that it's being consumed by two very different audiences at  the TikTok and streaming crowd that found it first, and country radio which it's now had a two week run at No.1. It's also put Lefty (a debut artist who only really started posting  on TikTok in 2022) one spot away from the top of the biggest singles chart in the world (he's just one spot behind a song that's been at No.1 for 28 weeks and has beaten every other song off it over that period of time).</p>

<h2>What the sources do not say</h2>

<p>The sources are split on the song's UK peak (one has it at No.3, the other at No.4) so the article simply states  it reached the top five in the UK. There's nothing in the reporting to suggest there was a follow up single to "Boston" and no setlist or supporting act is mentioned for the Long Way Home Tour which gets underway in Jan 2027. The sources give no indication as to whether the song's second climb to No. 2 was driven by streaming, radio or sales.</p>

<p>Sources: <a href="https://en.wikipedia.org/wiki/Boston_(Stella_Lefty_song)">Wikipedia</a>, <a href="https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/">BuzzJack</a>, <a href="https://www2.trendyhiphop.com/songs/stella-lefty-boston/">Trendy Hip Hop</a>, <a href="https://en.wikipedia.org/wiki/Stella_Lefty">Wikipedia</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Was 'Boston' Stella Lefty's first hit?</h3>
<p>Yes it's her very first entry on the Billboard Hot 100. The only real difference is that the chorus she'd left half-written on TikTok has now gone viral.</p>
<h3>When is Stella Lefty's tour?</h3>
<p>The Long Way Home Tour (her first headlining tour) gets under way in January 2027.</p>
$$,
ARRAY['https://en.wikipedia.org/wiki/Boston_(Stella_Lefty_song)', 'https://www.buzzjack.com/forums/topic/290544-us-hot-100-11212026/', 'https://www2.trendyhiphop.com/songs/stella-lefty-boston/', 'https://en.wikipedia.org/wiki/Stella_Lefty'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- stray-kids-suiatsu-japan-mini-album-20261124 (pop-music; Japan; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'stray-kids-suiatsu-japan-mini-album-20261124', 'pop-music', 'Japan',
'Stray Kids SUIATSU: Japan Mini Album Out 25 November',
'Stray Kids SUIATSU: Japan Mini Album Out 25 November',
'Stray Kids SUIATSU, the group''s fourth Japanese mini album, is out on 25 November 2026 with seven tracks and 12 editions.',
'Stray Kids SUIATSU, the group''s fourth Japanese mini album, is out on 25 November 2026 with seven tracks and 12 editions.',
$$<p>Stray Kids release their fourth Japanese mini album <em>SUIATSU</em> on Wednesday 25th November 2026 (the day after this batch goes live). The seven-track mini is their first Japanese mini in just over a title track already out since 9 November, is the group's first Japanese mini album in that time period. It's released with 12 physical editions for the collectors.</p>

<table>
<tr><td>Album</td><td><em>SUIATSU</em> — Stray Kids (Japan 4th mini album)</td></tr>
<tr><td>Release date</td><td>25 November 2026 (Sony Music Japan)</td></tr>
<tr><td>Tracks</td><td>7 (all Japanese originals)</td></tr>
<tr><td>Title track</td><td>"SUIATSU" (released digitally 9 November 2026)</td></tr>
<tr><td>Editions</td><td>12 physical editions</td></tr>
<tr><td>Also on it</td><td>"TEMPLE", "Lonely Night", "LAST TAKE", "Christmas Love (Party Version)"</td></tr>
<tr><td>Fan events</td><td>Tokyo 20 December 2026; Osaka 30 January 2027</td></tr>
</table>

<h2>What happened</h2>

<p>Sony Music Japan announced <em>SUIATSU</em> in August, released the seven-track list on 19 October and  the title track  on digital platforms on 9 November (prior to the physical release) according to <a href="https://www.kfriday.net/posts/k-pop/1548">KFriday</a>. The group state that each track on the mini album is an original  for Japan and the concept of the title track's concept, <a href="https://www.instagram.com/reel/Df6pPnZycPF/">as the members explain it</a>, is that of a deep sea fish  which wants to come up to the surface (it's curious, then it's spooked by what it sees). The 12 editions comprise first press limited A and B, a regular edition, eight solo member editions and a fan club edition. Serial numbers in the first press copies will be used to enter fans into the draw for the offline events in Tokyo on 20 December and Osaka on 30 January 2027 (per <a href="https://www.hmv.co.jp/news/article/260825109/?site=hmv_extra_in17">HMV Japan</a>. The group are in great chart form with <a href="https://www.soompi.com/article/1889555wpp/p1harmony-illit-stray-kids-xikers-cortis-enhypen-ive-bts-k-da-and-more-sweep-top-spots-on-billboard-world-albums-chart">their recent Korean releases hold four places on this week's Billboard World Albums chart</a>. K-pop's other big chart story this week is <a href="https://growentix.cloud/articles/ateez-golden-hour-part-6-billboard-200-number-one-20261123">ATEEZ's Golden Hour: Part.6 topping the Billboard 200</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the  chart news for the week.</p>

<h2>What the Stray Kids SUIATSU release means</h2>

<p>This one is  built for the Japanese market first and the global fandom second. The indications are that it will have a very strong opening week in Japan (title track already streaming, 12 editions for the collectors,  fan events tied to first-press copies. What to watch after 25 November is the first press copies). The Oricon weekly albums chart and the Billboard Japan Hot Albums chart are the group's last Japanese mini album, <em>Hollow</em>, set the  June 2025. The "Christmas Love (Party Version)" is obviously timed to the holiday season and will be in the shops and on the charts through into December. The question of a US Billboard 200 impact is the big one. Japanese mini albums don't tend to make it over there and with no music video date at all, the US reach will be entirely down to streaming.</p>

<h2>What the sources do not say</h2>

<p>There's no chart position to report at this stage as the album isn't out until 25 November — so nothing can be claimed about its Oricon or Billboard Japan position. The announcements are only for the physical editions and the fan events, no mention of a music video. The sources make no comment as to whether a Korean comeback will follow on from the Japanese release or how many copies were pressed across the 12 editions.</p>

<p>Sources: <a href="https://www.hmv.co.jp/news/article/260825109/?site=hmv_extra_in17">HMV Japan</a>, <a href="https://music.apple.com/na/album/suiatsu/6829772542">Apple Music</a>, <a href="https://www.kfriday.net/posts/k-pop/1548">KFriday</a>, <a href="https://beautipin.com/blogs/magazine/stray-kids-suiatsu-japan-album">Beautipin</a>, <a href="https://www.soompi.com/article/1889555wpp/p1harmony-illit-stray-kids-xikers-cortis-enhypen-ive-bts-k-da-and-more-sweep-top-spots-on-billboard-world-albums-chart">Soompi</a>, <a href="https://www.instagram.com/reel/Df6pPnZycPF/">Sony Music Indonesia</a>.</p>

<h2>Frequently asked questions</h2>
<h3>When is SUIATSU out?</h3>
<p>Wednesday 25th November 2026 as Stray Kids' fourth Japanese mini album on Sony Music Japan.</p>
<h3>How many songs are there on SUIATSU?</h3>
<p>Seven all Japanese originals: "SUIATSU", "TEMPLE", "Lonely Night", "LAST TAKE", "Christmas Love (Party Version)" and deep & boost versions of the title track.</p>
$$,
$$<p>Stray Kids release their fourth Japanese mini album <em>SUIATSU</em> on Wednesday 25th November 2026 (the day after this batch goes live). The seven-track mini is their first Japanese mini in just over a title track already out since 9 November, is the group's first Japanese mini album in that time period. It's released with 12 physical editions for the collectors.</p>

<table>
<tr><td>Album</td><td><em>SUIATSU</em> — Stray Kids (Japan 4th mini album)</td></tr>
<tr><td>Release date</td><td>25 November 2026 (Sony Music Japan)</td></tr>
<tr><td>Tracks</td><td>7 (all Japanese originals)</td></tr>
<tr><td>Title track</td><td>"SUIATSU" (released digitally 9 November 2026)</td></tr>
<tr><td>Editions</td><td>12 physical editions</td></tr>
<tr><td>Also on it</td><td>"TEMPLE", "Lonely Night", "LAST TAKE", "Christmas Love (Party Version)"</td></tr>
<tr><td>Fan events</td><td>Tokyo 20 December 2026; Osaka 30 January 2027</td></tr>
</table>

<h2>What happened</h2>

<p>Sony Music Japan announced <em>SUIATSU</em> in August, released the seven-track list on 19 October and  the title track  on digital platforms on 9 November (prior to the physical release) according to <a href="https://www.kfriday.net/posts/k-pop/1548">KFriday</a>. The group state that each track on the mini album is an original  for Japan and the concept of the title track's concept, <a href="https://www.instagram.com/reel/Df6pPnZycPF/">as the members explain it</a>, is that of a deep sea fish  which wants to come up to the surface (it's curious, then it's spooked by what it sees). The 12 editions comprise first press limited A and B, a regular edition, eight solo member editions and a fan club edition. Serial numbers in the first press copies will be used to enter fans into the draw for the offline events in Tokyo on 20 December and Osaka on 30 January 2027 (per <a href="https://www.hmv.co.jp/news/article/260825109/?site=hmv_extra_in17">HMV Japan</a>. The group are in great chart form with <a href="https://www.soompi.com/article/1889555wpp/p1harmony-illit-stray-kids-xikers-cortis-enhypen-ive-bts-k-da-and-more-sweep-top-spots-on-billboard-world-albums-chart">their recent Korean releases hold four places on this week's Billboard World Albums chart</a>. K-pop's other big chart story this week is <a href="https://growentix.cloud/articles/ateez-golden-hour-part-6-billboard-200-number-one-20261123">ATEEZ's Golden Hour: Part.6 topping the Billboard 200</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the  chart news for the week.</p>

<h2>What the Stray Kids SUIATSU release means</h2>

<p>This one is  built for the Japanese market first and the global fandom second. The indications are that it will have a very strong opening week in Japan (title track already streaming, 12 editions for the collectors,  fan events tied to first-press copies. What to watch after 25 November is the first press copies). The Oricon weekly albums chart and the Billboard Japan Hot Albums chart are the group's last Japanese mini album, <em>Hollow</em>, set the  June 2025. The "Christmas Love (Party Version)" is obviously timed to the holiday season and will be in the shops and on the charts through into December. The question of a US Billboard 200 impact is the big one. Japanese mini albums don't tend to make it over there and with no music video date at all, the US reach will be entirely down to streaming.</p>

<h2>What the sources do not say</h2>

<p>There's no chart position to report at this stage as the album isn't out until 25 November — so nothing can be claimed about its Oricon or Billboard Japan position. The announcements are only for the physical editions and the fan events, no mention of a music video. The sources make no comment as to whether a Korean comeback will follow on from the Japanese release or how many copies were pressed across the 12 editions.</p>

<p>Sources: <a href="https://www.hmv.co.jp/news/article/260825109/?site=hmv_extra_in17">HMV Japan</a>, <a href="https://music.apple.com/na/album/suiatsu/6829772542">Apple Music</a>, <a href="https://www.kfriday.net/posts/k-pop/1548">KFriday</a>, <a href="https://beautipin.com/blogs/magazine/stray-kids-suiatsu-japan-album">Beautipin</a>, <a href="https://www.soompi.com/article/1889555wpp/p1harmony-illit-stray-kids-xikers-cortis-enhypen-ive-bts-k-da-and-more-sweep-top-spots-on-billboard-world-albums-chart">Soompi</a>, <a href="https://www.instagram.com/reel/Df6pPnZycPF/">Sony Music Indonesia</a>.</p>

<h2>Frequently asked questions</h2>
<h3>When is SUIATSU out?</h3>
<p>Wednesday 25th November 2026 as Stray Kids' fourth Japanese mini album on Sony Music Japan.</p>
<h3>How many songs are there on SUIATSU?</h3>
<p>Seven all Japanese originals: "SUIATSU", "TEMPLE", "Lonely Night", "LAST TAKE", "Christmas Love (Party Version)" and deep & boost versions of the title track.</p>
$$,
ARRAY['https://www.hmv.co.jp/news/article/260825109/?site=hmv_extra_in17', 'https://music.apple.com/na/album/suiatsu/6829772542', 'https://www.kfriday.net/posts/k-pop/1548', 'https://beautipin.com/blogs/magazine/stray-kids-suiatsu-japan-album', 'https://www.soompi.com/article/1889555wpp/p1harmony-illit-stray-kids-xikers-cortis-enhypen-ive-bts-k-da-and-more-sweep-top-spots-on-billboard-world-albums-chart', 'https://www.instagram.com/reel/Df6pPnZycPF/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- tame-impala-jennie-dracula-hot-100-number-three-20261124 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'tame-impala-jennie-dracula-hot-100-number-three-20261124', 'pop-music', 'USA',
'Tame Impala JENNIE Dracula Holds Hot 100 No. 3',
'Tame Impala JENNIE Dracula Holds Hot 100 No. 3',
'Tame Impala JENNIE Dracula holds No. 3 on the Hot 100 for a second week, leads US radio for a ninth straight week, and has two Grammy nominations.',
'Tame Impala JENNIE Dracula holds No. 3 on the Hot 100 for a second week, leads US radio for a ninth straight week, and has two Grammy nominations.',
$$<p>Tame Impala and JENNIE's 'Dracula' is  at No.3 on the Billboard Hot 100 for a second  week in a row and  has just picked up two Grammy nominations. The track, which was based on a remix released in February 2026, has now spent 59 weeks on the Hot 100 and Tame Impala JENNIE Dracula is the longest running single in the top five this week's top five.</p>

<table>
<tr><td>Song</td><td>"Dracula" — Tame Impala & &amp; JENNIE</td></tr>
<tr><td>Original released</td><td>26 September 2025 (from the album <em>Deadbeat</em>)</td></tr>
<tr><td>JENNIE remix</td><td>6 February 2026</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 3 (chart dated 21 November 2026), second week; 59 weeks on chart</td></tr>
<tr><td>Radio Songs</td><td>No. 1 for nine straight weeks (60.1 million audience impressions)</td></tr>
<tr><td>Grammy nominations</td><td>Record of the Year; Best Pop Duo/Group Performance (69th Grammys, 7 February 2027)</td></tr>
<tr><td>Original peak</td><td>No. 30 (before the remix)</td></tr>
</table>

<h2>What happened</h2>

<p>"Dracula" started out as a Tame Impala solo track, released as a single in September 2025 as a single from the band's fifth studio album <em>Deadbeat</em>. It was their first song to chart on the Hot 100 entry, though the original peaked at No. 30. Its trajectory was completely changed by the JENNIE remix which dropped in February 2026. In that version JENNIE's name replaced Kevin Parker's   in the lyrics. That version went absolutely viral on the short-form video platforms as the <a href="https://biz.heraldcorp.com/article/10940671">Herald Business</a> pointed out. It rocketed  to No. 3 (which is still its all time peak) and has  held that position for two weeks running. On the radio, it has been even more dominant on the radio, leading the Radio Songs chart for nine weeks straight  since the 26th September chart. On 16th November the Recording Academy announced two Grammy nominations for the collaboration: Record of the Year and Best Pop Duo/Group Performance, as <a href="https://asiadaily.org/news/19090/">Asia Daily</a> reports. JENNIE is the second BLACKPINK member (after Rosé) to be nominated for Record of the Year. The nominations come in a year of controversy over the Grammys' new Asian pop category (we've previously reported on the row around the <a href="https://growentix.cloud/articles/bts-grammy-awards-2027-asian-pop-category-boycott-20261119">Grammy Asian pop category row</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Tame Impala JENNIE Dracula run means</h2>

<p>Fifty nine weeks on the Hot 100 is a marathon not a sprint and it's the remix that's done the work. A track that peaked at No.30 on its first run and then at No.3 on its second is the very definition of a good collab. Jennie's verse gave the rather psychedelic disco track a proper pop centre that it otherwise simply didn't have and the short form video was the clincher. The nine week radio run is just as much, because radio is the slowest moving chart  and the hardest to maintain. 60.1m weekly listeners is a mainstream audience, not a fanbase. The GRAMMY nominations in the Record of the Year category across all categories turn a chart story into a career story for both acts.</p>

<h2>What the sources do not say</h2>

<p>Nothing in the report indicates whether JENNIE and Tame Impala will be doing "Dracula" together at the Grammys on 7th February 2027 or whether another collaboration between the two. There's no information on the streaming/sales split for the current chart week so we don't know precisely what mix is responsible for the No.3 hold. The nominations are confirmed but the sources don't tell us how the Recording Academy's new Asian Pop category will impact the two nominations which are in the general field categories.</p>

<p>Sources: <a href="https://biz.heraldcorp.com/article/10940671">Herald Business</a>, <a href="https://asiadaily.org/news/19090/">Asia Daily</a>, <a href="https://www.straitstimes.com/life/entertainment/blackpinks-jennie-earns-two-grammy-nominations-as-major-k-pop-agencies-sit-out-new-asian-pop?ref=more-on-this-topic">The Straits Times</a>, <a href="https://korean-vibe.com/article/1065573457151019">K-VIBE</a>.</p>

<h2>Frequently asked questions</h2>
<h3>What's 'Dracula' by Tame Impala and JENNIE?</h3>
<p>A remix of Tame Impala's 2025 song, released in February 2026 with JENNIE on vocals and rap (there's a bit in the song where she substitutes her own  in the lyrics).</p>
<h3>When are the 2027 Grammy Awards?</h3>
<p>7 February 2027 at the Crypto.com Arena in Los Angeles (Dracula up for Record of the Year and Best Pop Duo/Group Performance).</p>
$$,
$$<p>Tame Impala and JENNIE's 'Dracula' is  at No.3 on the Billboard Hot 100 for a second  week in a row and  has just picked up two Grammy nominations. The track, which was based on a remix released in February 2026, has now spent 59 weeks on the Hot 100 and Tame Impala JENNIE Dracula is the longest running single in the top five this week's top five.</p>

<table>
<tr><td>Song</td><td>"Dracula" — Tame Impala & &amp; JENNIE</td></tr>
<tr><td>Original released</td><td>26 September 2025 (from the album <em>Deadbeat</em>)</td></tr>
<tr><td>JENNIE remix</td><td>6 February 2026</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 3 (chart dated 21 November 2026), second week; 59 weeks on chart</td></tr>
<tr><td>Radio Songs</td><td>No. 1 for nine straight weeks (60.1 million audience impressions)</td></tr>
<tr><td>Grammy nominations</td><td>Record of the Year; Best Pop Duo/Group Performance (69th Grammys, 7 February 2027)</td></tr>
<tr><td>Original peak</td><td>No. 30 (before the remix)</td></tr>
</table>

<h2>What happened</h2>

<p>"Dracula" started out as a Tame Impala solo track, released as a single in September 2025 as a single from the band's fifth studio album <em>Deadbeat</em>. It was their first song to chart on the Hot 100 entry, though the original peaked at No. 30. Its trajectory was completely changed by the JENNIE remix which dropped in February 2026. In that version JENNIE's name replaced Kevin Parker's   in the lyrics. That version went absolutely viral on the short-form video platforms as the <a href="https://biz.heraldcorp.com/article/10940671">Herald Business</a> pointed out. It rocketed  to No. 3 (which is still its all time peak) and has  held that position for two weeks running. On the radio, it has been even more dominant on the radio, leading the Radio Songs chart for nine weeks straight  since the 26th September chart. On 16th November the Recording Academy announced two Grammy nominations for the collaboration: Record of the Year and Best Pop Duo/Group Performance, as <a href="https://asiadaily.org/news/19090/">Asia Daily</a> reports. JENNIE is the second BLACKPINK member (after Rosé) to be nominated for Record of the Year. The nominations come in a year of controversy over the Grammys' new Asian pop category (we've previously reported on the row around the <a href="https://growentix.cloud/articles/bts-grammy-awards-2027-asian-pop-category-boycott-20261119">Grammy Asian pop category row</a>, and the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub has the rest of the week's chart news.</p>

<h2>What the Tame Impala JENNIE Dracula run means</h2>

<p>Fifty nine weeks on the Hot 100 is a marathon not a sprint and it's the remix that's done the work. A track that peaked at No.30 on its first run and then at No.3 on its second is the very definition of a good collab. Jennie's verse gave the rather psychedelic disco track a proper pop centre that it otherwise simply didn't have and the short form video was the clincher. The nine week radio run is just as much, because radio is the slowest moving chart  and the hardest to maintain. 60.1m weekly listeners is a mainstream audience, not a fanbase. The GRAMMY nominations in the Record of the Year category across all categories turn a chart story into a career story for both acts.</p>

<h2>What the sources do not say</h2>

<p>Nothing in the report indicates whether JENNIE and Tame Impala will be doing "Dracula" together at the Grammys on 7th February 2027 or whether another collaboration between the two. There's no information on the streaming/sales split for the current chart week so we don't know precisely what mix is responsible for the No.3 hold. The nominations are confirmed but the sources don't tell us how the Recording Academy's new Asian Pop category will impact the two nominations which are in the general field categories.</p>

<p>Sources: <a href="https://biz.heraldcorp.com/article/10940671">Herald Business</a>, <a href="https://asiadaily.org/news/19090/">Asia Daily</a>, <a href="https://www.straitstimes.com/life/entertainment/blackpinks-jennie-earns-two-grammy-nominations-as-major-k-pop-agencies-sit-out-new-asian-pop?ref=more-on-this-topic">The Straits Times</a>, <a href="https://korean-vibe.com/article/1065573457151019">K-VIBE</a>.</p>

<h2>Frequently asked questions</h2>
<h3>What's 'Dracula' by Tame Impala and JENNIE?</h3>
<p>A remix of Tame Impala's 2025 song, released in February 2026 with JENNIE on vocals and rap (there's a bit in the song where she substitutes her own  in the lyrics).</p>
<h3>When are the 2027 Grammy Awards?</h3>
<p>7 February 2027 at the Crypto.com Arena in Los Angeles (Dracula up for Record of the Year and Best Pop Duo/Group Performance).</p>
$$,
ARRAY['https://biz.heraldcorp.com/article/10940671', 'https://asiadaily.org/news/19090/', 'https://www.straitstimes.com/life/entertainment/blackpinks-jennie-earns-two-grammy-nominations-as-major-k-pop-agencies-sit-out-new-asian-pop?ref=more-on-this-topic', 'https://korean-vibe.com/article/1065573457151019'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- tate-mcrae-housewife-hot-100-number-two-20261124 (pop-music; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'tate-mcrae-housewife-hot-100-number-two-20261124', 'pop-music', 'USA',
'Tate McRae Housewife: Hot 100 No. 2 Debut',
'Tate McRae Housewife: Hot 100 No. 2 Debut',
'Tate McRae Housewife debuted at No. 2 on the Hot 100 and No. 1 on the Billboard Global 200, her biggest launch yet as a lead artist.',
'Tate McRae Housewife debuted at No. 2 on the Hot 100 and No. 1 on the Billboard Global 200, her biggest launch yet as a lead artist.',
$$<p>Tate McRae's 'Housewife' is her biggest launch to date. It was released on 15th October 2026 via RCA and has reached No.2 on the Billboard Hot 100 and No.1 on the Billboard Global 200 (her highest position to date as a lead artist.</p>

<table>
<tr><td>Song</td><td>"Housewife" — Tate McRae</td></tr>
<tr><td>Released</td><td>15 October 2026 (RCA Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 2 debut (chart dated 31 October 2026); No. 4 on the 21 November chart</td></tr>
<tr><td>Billboard Global 200</td><td>No. 1 debut (55.9 million worldwide streams)</td></tr>
<tr><td>Streaming Songs</td><td>No. 1 debut (first as a lead artist)</td></tr>
<tr><td>UK Singles Chart</td><td>No. 4 on the chart published 20 November 2026</td></tr>
<tr><td>Also No. 1</td><td>Australia, Canada, Germany, Ireland, New Zealand; Spotify Global and Spotify US</td></tr>
<tr><td>Album</td><td>Lead single from her fourth studio album (untitled, no release date announced)</td></tr>
</table>

<h2>What happened</h2>

<p>"Housewife" opened with 22.9m US streams in its first full tracking week (according to <a href="https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm">Music Times</a>, and 55.9m worldwide with 6,000 sales. It reached No.1 on both of Billboard's Global Song charts (her second Global 200 leader after "Greedy" — and No.1 on the Streaming Songs chart (her first as a lead artist). It also opened at No.1 on Spotify's Global Daily chart with 5.67m streams (a career best first day) and spent 16 consecutive days at the top  before reaching No.1 on the Spotify US chart on 9th November (25 days after release) as per <a href="https://www.theamericanminds.com/blog/tate-mcraes-housewife-reaches-number-one-on-spotify-us-after-25-days-on-chart">The American Minds</a> report. McRae performed the song live for the first time at the Victoria's Secret Fashion Show on 18th October and the video (directed by Pierre-Ange Carlotti and filmed in the south of France) accompanied the single. It was the only song to be above her in the US is <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-28-weeks-hot-100-record-20261117">Ella Langley's 28 weeks at No. 1</a>, and the rest of the week's chart news is on the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub.</p>

<h2>What the Tate McRae Housewife chart run means</h2>

<p>The global/US split  is the story here. "Housewife" was the biggest song in the world in its first week and the most streamed song in the US, yet it still launched at No 2 on the Hot 100. The Hot 100 is a blend of streaming, radio  and sales so radio hasn't caught up with the streaming explosion. That's the classic story of a streaming first launch and it leaves her a very clear route up should radio catch up. It's also her first release of 2026 and first single of a fourth album era which still has no title or date so it's doing the work of re-establishing her as a solo artist. Beating both Taylor Swift and Olivia Rodrigo in the same debut week as the piece makes clear puts her firmly in the top tier of the current chart race rather than just on the fringes.</p>

<h2>What the sources do not say</h2>

<p>There's no album title or release date  in any of the coverage so we don't know when the fourth album comes out or what else is on it. The  US radio figures that underpin the Hot 100 debut aren't broken down so we don't know how big the radio gap was that kept "Housewife" at No. 2 is not stated. And while <a href="https://lyricsvin.com/housewife-tate-mcrae-meaning/">LyricsVin</a> has it at No.2 in the UK but the Official Charts sales data for the week ending 19th November has it at No.3. The article just notes the article states only the No. 4 position on the 20th November chart which <a href="https://www.rotherradio.co.uk/u2-secure-first-uk-number-one-album-of-original-material-in-almost-two-decades/">Rother Radio</a> confirm.</p>

<p>Sources: <a href="https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm">Music Times</a>, <a href="https://www.beneathsong.com/song-meaning/housewife-tate-mcrae/">Beneath Song</a>, <a href="https://www.theamericanminds.com/blog/tate-mcraes-housewife-reaches-number-one-on-spotify-us-after-25-days-on-chart">The American Minds</a>, <a href="https://lyricsvin.com/housewife-tate-mcrae-meaning/">LyricsVin</a>, <a href="https://www.rotherradio.co.uk/u2-secure-first-uk-number-one-album-of-original-material-in-almost-two-decades/">Rother Radio</a>.</p>

<h2>Frequently asked questions</h2>
<h3>What's Tate McRae's highest charting song?</h3>
<p>'Housewife' at No 2 on the Hot 100 (her highest position as a lead artist) - that one actually beat 'Greedy' which peaked at No 3.</p>
<h3>What is "Housewife" about?</h3>
<p>McRae actually turns the title on its head in that it's the story of a woman who wants her own money, her own space and a partner of her own choosing rather than one she's dependent on.</p>
$$,
$$<p>Tate McRae's 'Housewife' is her biggest launch to date. It was released on 15th October 2026 via RCA and has reached No.2 on the Billboard Hot 100 and No.1 on the Billboard Global 200 (her highest position to date as a lead artist.</p>

<table>
<tr><td>Song</td><td>"Housewife" — Tate McRae</td></tr>
<tr><td>Released</td><td>15 October 2026 (RCA Records)</td></tr>
<tr><td>Billboard Hot 100</td><td>No. 2 debut (chart dated 31 October 2026); No. 4 on the 21 November chart</td></tr>
<tr><td>Billboard Global 200</td><td>No. 1 debut (55.9 million worldwide streams)</td></tr>
<tr><td>Streaming Songs</td><td>No. 1 debut (first as a lead artist)</td></tr>
<tr><td>UK Singles Chart</td><td>No. 4 on the chart published 20 November 2026</td></tr>
<tr><td>Also No. 1</td><td>Australia, Canada, Germany, Ireland, New Zealand; Spotify Global and Spotify US</td></tr>
<tr><td>Album</td><td>Lead single from her fourth studio album (untitled, no release date announced)</td></tr>
</table>

<h2>What happened</h2>

<p>"Housewife" opened with 22.9m US streams in its first full tracking week (according to <a href="https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm">Music Times</a>, and 55.9m worldwide with 6,000 sales. It reached No.1 on both of Billboard's Global Song charts (her second Global 200 leader after "Greedy" — and No.1 on the Streaming Songs chart (her first as a lead artist). It also opened at No.1 on Spotify's Global Daily chart with 5.67m streams (a career best first day) and spent 16 consecutive days at the top  before reaching No.1 on the Spotify US chart on 9th November (25 days after release) as per <a href="https://www.theamericanminds.com/blog/tate-mcraes-housewife-reaches-number-one-on-spotify-us-after-25-days-on-chart">The American Minds</a> report. McRae performed the song live for the first time at the Victoria's Secret Fashion Show on 18th October and the video (directed by Pierre-Ange Carlotti and filmed in the south of France) accompanied the single. It was the only song to be above her in the US is <a href="https://growentix.cloud/articles/ella-langley-choosin-texas-28-weeks-hot-100-record-20261117">Ella Langley's 28 weeks at No. 1</a>, and the rest of the week's chart news is on the <a href="https://growentix.cloud/popmusic">Pop Music</a> hub.</p>

<h2>What the Tate McRae Housewife chart run means</h2>

<p>The global/US split  is the story here. "Housewife" was the biggest song in the world in its first week and the most streamed song in the US, yet it still launched at No 2 on the Hot 100. The Hot 100 is a blend of streaming, radio  and sales so radio hasn't caught up with the streaming explosion. That's the classic story of a streaming first launch and it leaves her a very clear route up should radio catch up. It's also her first release of 2026 and first single of a fourth album era which still has no title or date so it's doing the work of re-establishing her as a solo artist. Beating both Taylor Swift and Olivia Rodrigo in the same debut week as the piece makes clear puts her firmly in the top tier of the current chart race rather than just on the fringes.</p>

<h2>What the sources do not say</h2>

<p>There's no album title or release date  in any of the coverage so we don't know when the fourth album comes out or what else is on it. The  US radio figures that underpin the Hot 100 debut aren't broken down so we don't know how big the radio gap was that kept "Housewife" at No. 2 is not stated. And while <a href="https://lyricsvin.com/housewife-tate-mcrae-meaning/">LyricsVin</a> has it at No.2 in the UK but the Official Charts sales data for the week ending 19th November has it at No.3. The article just notes the article states only the No. 4 position on the 20th November chart which <a href="https://www.rotherradio.co.uk/u2-secure-first-uk-number-one-album-of-original-material-in-almost-two-decades/">Rother Radio</a> confirm.</p>

<p>Sources: <a href="https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm">Music Times</a>, <a href="https://www.beneathsong.com/song-meaning/housewife-tate-mcrae/">Beneath Song</a>, <a href="https://www.theamericanminds.com/blog/tate-mcraes-housewife-reaches-number-one-on-spotify-us-after-25-days-on-chart">The American Minds</a>, <a href="https://lyricsvin.com/housewife-tate-mcrae-meaning/">LyricsVin</a>, <a href="https://www.rotherradio.co.uk/u2-secure-first-uk-number-one-album-of-original-material-in-almost-two-decades/">Rother Radio</a>.</p>

<h2>Frequently asked questions</h2>
<h3>What's Tate McRae's highest charting song?</h3>
<p>'Housewife' at No 2 on the Hot 100 (her highest position as a lead artist) - that one actually beat 'Greedy' which peaked at No 3.</p>
<h3>What is "Housewife" about?</h3>
<p>McRae actually turns the title on its head in that it's the story of a woman who wants her own money, her own space and a partner of her own choosing rather than one she's dependent on.</p>
$$,
ARRAY['https://www.musictimes.com/articles/113126/20261102/tate-mcraes-housewife-reached-no-1-globally-heres-how-its-us-debut-compared.htm', 'https://www.beneathsong.com/song-meaning/housewife-tate-mcrae/', 'https://www.theamericanminds.com/blog/tate-mcraes-housewife-reaches-number-one-on-spotify-us-after-25-days-on-chart', 'https://lyricsvin.com/housewife-tate-mcrae-meaning/', 'https://www.rotherradio.co.uk/u2-secure-first-uk-number-one-album-of-original-material-in-almost-two-decades/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- apple-macbook-neo-2-launch-february-2027-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'apple-macbook-neo-2-launch-february-2027-20261124', 'tech-ai', 'Global',
'Apple MacBook Neo 2 Tipped for February 2027 Launch',
'Apple MacBook Neo 2 Tipped for February 2027 Launch',
'The next MacBook Neo is tipped for a February to March 2027 launch with an A19 Pro chip and 12GB of memory, according to Bloomberg''s Mark Gurman.',
'The next MacBook Neo is tipped for a February to March 2027 launch with an A19 Pro chip and 12GB of memory, according to Bloomberg''s Mark Gurman.',
$$<p>Apple are reportedly going to launch the second-generation MacBook Neo in the Feb/Mar 2027 window (A19 Pro chip, 12GB of memory) which would be roughly a year after the original Macbook Neo which launched in March 2026.</p>

<table>
<tr><td>Product</td><td>Apple's second-generation MacBook Neo</td></tr>
<tr><td>Expected window</td><td>Sometime in February or March 2027, alongside the iOS 27.4 release cycle</td></tr>
<tr><td>Chip</td><td>A19 Pro chip, taking over from the A18 Pro in today's model</td></tr>
<tr><td>Memory</td><td>12GB of unified memory — 4GB more than the current 8GB</td></tr>
<tr><td>Colours</td><td>Fresh colours are expected, with Apple said to be planning regular colour refreshes</td></tr>
<tr><td>Current model</td><td>The current model launched on 4 March 2026 and went on sale on 11 March 2026</td></tr>
</table>

<h2>What happened</h2>

<p>In his Power On newsletter on 22 November, Bloomberg's Mark Gurman said Apple is lining up the iPhone 18e, the standard iPhone 18, a refreshed entry-level iPad and new MacBook Neo and MacBook Air models for around February or March 2027. Those launches fall inside the iOS 27.4 release cycle, which spans February and March. Gurman had already reported the second-generation MacBook Neo on 27 October — what is new this week is the timing, along with a note on colours: Apple are reportedly planning to refresh the MacBook Neo's colours frequently.</p>

<p>Modest though the upgrades look, they should matter. Today's MacBook Neo runs on the A18 Pro with 8GB of unified memory and comes in Silver, Blush, Citrus and Indigo. Its successor is expected to move to the A19 Pro with 12GB of memory — half as much again — which would make a big difference to the memory-hungry Apple Intelligence features. The new MacBook Air due in the same window is expected to get an M6 chip.</p>

<h2>What the MacBook Neo report means</h2>

<p>Get the timing right, and the MacBook Neo turns into an annual product — with February becoming Apple's budget season. Spring is already crowded at the cheaper end of the range: the iPhone 18e, the standard iPhone 18, the entry-level iPad and the MacBook Neo, followed a little later in the first half of 2027 by the iPhone Air 2 and the new iPad Air and iPad Pro. That is a clear break from the old pattern of one September launch, and it hands Apple a second news cycle each year.</p>

<p>The 12GB of RAM is the real game changer. The original Neo's 8GB held it back on AI workloads, and the A19 Pro with the extra memory should let the entry-level Mac keep pace as Apple Intelligence develops. Our <a href="https://growentix.cloud/articles/apple-iphone-18-launch-timeline-february-2027-20261123">iPhone 18 launch timeline</a> coverage points to a February to March window for the standard iPhone 18 as well, leaving buyers with several decisions to make at once. More on the wider field in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Apple have confirmed nothing about the next MacBook Neo — no launch date, no specs, no price. Everything in this piece comes from the Bloomberg report, relayed by MacRumors, FoneArena and NDTV Profit, and reported plans can change before any announcement. The report leaves open whether the colour refresh applies to this model, which colours are coming, and whether the price stays at $999. In the same report, the iPhone Air 2 and iPad models are described as "a little bit behind" the manufacturing schedule, unlike the iPhone 18e and MacBook Neo.</p>

<p>Sources: <a href="https://www.macrumors.com/2026/11/22/new-apple-products-february-or-march/">MacRumors</a> carried Gurman's Power On report, including the February to March window; <a href="https://www.fonearena.com/blog/497386/apple-iphone-18e-macbook-neo-2-new-ipad-2027-rumor.html">FoneArena</a> covered the iOS 27.4 cycle timing and the launch line-up; <a href="https://www.ndtvprofit.com/technology/iphone-18-iphone-18e-macbook-neo-2-when-could-apple-launch-these-devices-12364204">NDTV Profit</a> reported the A19 Pro chip (codename J701) and the current model's specs.</p>

<h2>Frequently asked questions</h2>

<h3>When's the next MacBook Neo expected?</h3>
<p>Between February and March 2027, according to Bloomberg's Mark Gurman. Apple haven't announced a date so that could change.</p>

<h3>What is new in the next MacBook Neo?</h3>
<p>It's apparently getting the A19 Pro chip (rather than the A18 Pro), 12GB of memory instead of 8GB, plus new colours. Apple have not confirmed any of this.</p>
$$,
$$<p>Apple are reportedly going to launch the second-generation MacBook Neo in the Feb/Mar 2027 window (A19 Pro chip, 12GB of memory) which would be roughly a year after the original Macbook Neo which launched in March 2026.</p>

<table>
<tr><td>Product</td><td>Apple's second-generation MacBook Neo</td></tr>
<tr><td>Expected window</td><td>Sometime in February or March 2027, alongside the iOS 27.4 release cycle</td></tr>
<tr><td>Chip</td><td>A19 Pro chip, taking over from the A18 Pro in today's model</td></tr>
<tr><td>Memory</td><td>12GB of unified memory — 4GB more than the current 8GB</td></tr>
<tr><td>Colours</td><td>Fresh colours are expected, with Apple said to be planning regular colour refreshes</td></tr>
<tr><td>Current model</td><td>The current model launched on 4 March 2026 and went on sale on 11 March 2026</td></tr>
</table>

<h2>What happened</h2>

<p>In his Power On newsletter on 22 November, Bloomberg's Mark Gurman said Apple is lining up the iPhone 18e, the standard iPhone 18, a refreshed entry-level iPad and new MacBook Neo and MacBook Air models for around February or March 2027. Those launches fall inside the iOS 27.4 release cycle, which spans February and March. Gurman had already reported the second-generation MacBook Neo on 27 October — what is new this week is the timing, along with a note on colours: Apple are reportedly planning to refresh the MacBook Neo's colours frequently.</p>

<p>Modest though the upgrades look, they should matter. Today's MacBook Neo runs on the A18 Pro with 8GB of unified memory and comes in Silver, Blush, Citrus and Indigo. Its successor is expected to move to the A19 Pro with 12GB of memory — half as much again — which would make a big difference to the memory-hungry Apple Intelligence features. The new MacBook Air due in the same window is expected to get an M6 chip.</p>

<h2>What the MacBook Neo report means</h2>

<p>Get the timing right, and the MacBook Neo turns into an annual product — with February becoming Apple's budget season. Spring is already crowded at the cheaper end of the range: the iPhone 18e, the standard iPhone 18, the entry-level iPad and the MacBook Neo, followed a little later in the first half of 2027 by the iPhone Air 2 and the new iPad Air and iPad Pro. That is a clear break from the old pattern of one September launch, and it hands Apple a second news cycle each year.</p>

<p>The 12GB of RAM is the real game changer. The original Neo's 8GB held it back on AI workloads, and the A19 Pro with the extra memory should let the entry-level Mac keep pace as Apple Intelligence develops. Our <a href="https://growentix.cloud/articles/apple-iphone-18-launch-timeline-february-2027-20261123">iPhone 18 launch timeline</a> coverage points to a February to March window for the standard iPhone 18 as well, leaving buyers with several decisions to make at once. More on the wider field in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Apple have confirmed nothing about the next MacBook Neo — no launch date, no specs, no price. Everything in this piece comes from the Bloomberg report, relayed by MacRumors, FoneArena and NDTV Profit, and reported plans can change before any announcement. The report leaves open whether the colour refresh applies to this model, which colours are coming, and whether the price stays at $999. In the same report, the iPhone Air 2 and iPad models are described as "a little bit behind" the manufacturing schedule, unlike the iPhone 18e and MacBook Neo.</p>

<p>Sources: <a href="https://www.macrumors.com/2026/11/22/new-apple-products-february-or-march/">MacRumors</a> carried Gurman's Power On report, including the February to March window; <a href="https://www.fonearena.com/blog/497386/apple-iphone-18e-macbook-neo-2-new-ipad-2027-rumor.html">FoneArena</a> covered the iOS 27.4 cycle timing and the launch line-up; <a href="https://www.ndtvprofit.com/technology/iphone-18-iphone-18e-macbook-neo-2-when-could-apple-launch-these-devices-12364204">NDTV Profit</a> reported the A19 Pro chip (codename J701) and the current model's specs.</p>

<h2>Frequently asked questions</h2>

<h3>When's the next MacBook Neo expected?</h3>
<p>Between February and March 2027, according to Bloomberg's Mark Gurman. Apple haven't announced a date so that could change.</p>

<h3>What is new in the next MacBook Neo?</h3>
<p>It's apparently getting the A19 Pro chip (rather than the A18 Pro), 12GB of memory instead of 8GB, plus new colours. Apple have not confirmed any of this.</p>
$$,
ARRAY['https://www.macrumors.com/2026/11/22/new-apple-products-february-or-march/', 'https://www.fonearena.com/blog/497386/apple-iphone-18e-macbook-neo-2-new-ipad-2027-rumor.html', 'https://www.ndtvprofit.com/technology/iphone-18-iphone-18e-macbook-neo-2-when-could-apple-launch-these-devices-12364204'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- apple-smart-glasses-wwdc-2027-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'apple-smart-glasses-wwdc-2027-20261124', 'tech-ai', 'Global',
'Apple Smart Glasses Tipped for WWDC 2027 Debut',
'Apple Smart Glasses Tipped for WWDC 2027 Debut',
'Apple smart glasses are tipped for a WWDC 2027 unveiling in June, with shipments before the end of the year, Bloomberg''s Mark Gurman reports.',
'Apple smart glasses are tipped for a WWDC 2027 unveiling in June, with shipments before the end of the year, Bloomberg''s Mark Gurman reports.',
$$<p>Apple is reportedly planning to unveil its first smart glasses at WWDC in June 2027 and to begin shipping them by the end of the year, according to  Mark Gurman of Bloomberg. The Apple smart glasses (codenamed N50) would be the flagship of Apple's 2027 product roster.</p>

<table>
<tr><td>Product</td><td>Apple smart glasses, codenamed N50</td></tr>
<tr><td>Expected unveiling</td><td>WWDC, June 2027</td></tr>
<tr><td>Expected shipping</td><td>Before the end of 2027</td></tr>
<tr><td>Display</td><td>No augmented reality display reported</td></tr>
<tr><td>Core interaction</td><td>Upgraded Siri and iPhone apps</td></tr>
<tr><td>Software</td><td>Stripped-down visionOS 28, custom chip derived from Apple Watch chips</td></tr>
</table>

<h2>What happened</h2>

<p>Gurman reported in his Power On newsletter on 15 Nov that the glasses have been in development since the early 2020s and the hardware has been complete for some time. Apple are just waiting for the software to catch up before they make the launch announcement and he expects that to be at WWDC next year (June 2027) with shipping to follow by the end of that year.</p>

<p>The design details are very specific. The Apple prototypes are thinner than the Meta second gen Ray-Ban glasses, with the cameras in the form of oval cut-outs in the frame rather than projecting out from the frame. There is absolutely no expectation that they will have an AR display at all (they're not going to be projecting anything into your field of view). They'll be heavily reliant on an improved version of Siri to allow you to access your iPhone apps and do all sorts of things without having to take your phone out. They'll be running a stripped down version of visionOS 28 on a custom processor based on the older smartwatch chips.</p>

<p>Apple are asking  developers to get ready for the glasses and have a plan to launch support for their own apps in December with third party support to come in 2027. The glasses are expected to be able to identify buildings, give you navigation, translate signs and conversations and deal with calls, messages and music controls. Some of the test units have a three pin magnetic charging interface (though again it's not clear if that will actually be in the final product).</p>

<h2>What the Apple smart glasses report means</h2>

<p>The report frames the glasses as fundamentally a Siri product first and a hardware product second which is a risk. The Ray-Bans already do that. Apple's real differentiator is going to be the ability of Siri to control iPhone apps  rather than through separate glasses apps. If Siri isn't ready to go then the glasses really don't have much to offer over what Meta  has to sell. Gurman points out that software and AI development is behind schedule and that could in fact delay the  2027 launch.</p>

<p>Timing matters in the wider wearables race, too. Meta is aiming for a December launch for its Muse Charm keychain device, while Samsung's Galaxy S27 launch in early 2027 will be the big Android-side event. If Apple enters in June 2027, all three players will be in the AI wearables space within six months of each other. Our <a href="https://growentix.cloud/articles/apple-iphone-18-launch-timeline-february-2027-20261123">iPhone 18 launch timeline</a> coverage points to the same spring/summer 2027 window filling up across the Apple range. More on the wider field in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Apple have said absolutely nothing about the glasses. There's no design, no specs and no launch timeline. The sources do not give a price, no  battery life, no weight. It's not at all clear whether the three pin magnetic charging system will be  in the end product. The mass production design and shipping plans remain undecided, and Gurman is very clear to say that further delays are very much possible if Siri and the  software that goes with it aren't ready.</p>

<p>Sources: <a href="https://www.macrumors.com/2026/11/15/apple-smart-glasses-hinge-on-siri/">MacRumors</a> covered Gurman's report, the WWDC target and the Siri strategy; <a href="https://www.gadgets360.com/wearables/news/apple-smart-glasses-design-expected-features-leak-launch-timeline-report-mark-gurman-12332113?from=app">Gadgets360</a> reported the design details and the expected features; <a href="https://www.macobserver.com/news/apple-smart-glasses-could-miss-wwdc-2027-as-software-delays-threaten-launch/">MacObserver</a> carried the software delay warning and the visionOS 28 details.</p>

<h2>Frequently asked questions</h2>

<h3>When will Apple's smart glasses be launched?</h3>
<p>Apple is reportedly targeting a WWDC unveiling in June 2027 with deliveries before the end of the year. Of course there's always the possibility of a software delay which would push the date back and nothing has been confirmed by Apple.</p>

<h3>Will Apple's smart glasses have an AR display?</h3>
<p>No, according to the report. The glasses aren't expected to project any digital content onto the user's field of view. They'll be dependent on the cameras and Siri to run the iPhone app functions.</p>
$$,
$$<p>Apple is reportedly planning to unveil its first smart glasses at WWDC in June 2027 and to begin shipping them by the end of the year, according to  Mark Gurman of Bloomberg. The Apple smart glasses (codenamed N50) would be the flagship of Apple's 2027 product roster.</p>

<table>
<tr><td>Product</td><td>Apple smart glasses, codenamed N50</td></tr>
<tr><td>Expected unveiling</td><td>WWDC, June 2027</td></tr>
<tr><td>Expected shipping</td><td>Before the end of 2027</td></tr>
<tr><td>Display</td><td>No augmented reality display reported</td></tr>
<tr><td>Core interaction</td><td>Upgraded Siri and iPhone apps</td></tr>
<tr><td>Software</td><td>Stripped-down visionOS 28, custom chip derived from Apple Watch chips</td></tr>
</table>

<h2>What happened</h2>

<p>Gurman reported in his Power On newsletter on 15 Nov that the glasses have been in development since the early 2020s and the hardware has been complete for some time. Apple are just waiting for the software to catch up before they make the launch announcement and he expects that to be at WWDC next year (June 2027) with shipping to follow by the end of that year.</p>

<p>The design details are very specific. The Apple prototypes are thinner than the Meta second gen Ray-Ban glasses, with the cameras in the form of oval cut-outs in the frame rather than projecting out from the frame. There is absolutely no expectation that they will have an AR display at all (they're not going to be projecting anything into your field of view). They'll be heavily reliant on an improved version of Siri to allow you to access your iPhone apps and do all sorts of things without having to take your phone out. They'll be running a stripped down version of visionOS 28 on a custom processor based on the older smartwatch chips.</p>

<p>Apple are asking  developers to get ready for the glasses and have a plan to launch support for their own apps in December with third party support to come in 2027. The glasses are expected to be able to identify buildings, give you navigation, translate signs and conversations and deal with calls, messages and music controls. Some of the test units have a three pin magnetic charging interface (though again it's not clear if that will actually be in the final product).</p>

<h2>What the Apple smart glasses report means</h2>

<p>The report frames the glasses as fundamentally a Siri product first and a hardware product second which is a risk. The Ray-Bans already do that. Apple's real differentiator is going to be the ability of Siri to control iPhone apps  rather than through separate glasses apps. If Siri isn't ready to go then the glasses really don't have much to offer over what Meta  has to sell. Gurman points out that software and AI development is behind schedule and that could in fact delay the  2027 launch.</p>

<p>Timing matters in the wider wearables race, too. Meta is aiming for a December launch for its Muse Charm keychain device, while Samsung's Galaxy S27 launch in early 2027 will be the big Android-side event. If Apple enters in June 2027, all three players will be in the AI wearables space within six months of each other. Our <a href="https://growentix.cloud/articles/apple-iphone-18-launch-timeline-february-2027-20261123">iPhone 18 launch timeline</a> coverage points to the same spring/summer 2027 window filling up across the Apple range. More on the wider field in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Apple have said absolutely nothing about the glasses. There's no design, no specs and no launch timeline. The sources do not give a price, no  battery life, no weight. It's not at all clear whether the three pin magnetic charging system will be  in the end product. The mass production design and shipping plans remain undecided, and Gurman is very clear to say that further delays are very much possible if Siri and the  software that goes with it aren't ready.</p>

<p>Sources: <a href="https://www.macrumors.com/2026/11/15/apple-smart-glasses-hinge-on-siri/">MacRumors</a> covered Gurman's report, the WWDC target and the Siri strategy; <a href="https://www.gadgets360.com/wearables/news/apple-smart-glasses-design-expected-features-leak-launch-timeline-report-mark-gurman-12332113?from=app">Gadgets360</a> reported the design details and the expected features; <a href="https://www.macobserver.com/news/apple-smart-glasses-could-miss-wwdc-2027-as-software-delays-threaten-launch/">MacObserver</a> carried the software delay warning and the visionOS 28 details.</p>

<h2>Frequently asked questions</h2>

<h3>When will Apple's smart glasses be launched?</h3>
<p>Apple is reportedly targeting a WWDC unveiling in June 2027 with deliveries before the end of the year. Of course there's always the possibility of a software delay which would push the date back and nothing has been confirmed by Apple.</p>

<h3>Will Apple's smart glasses have an AR display?</h3>
<p>No, according to the report. The glasses aren't expected to project any digital content onto the user's field of view. They'll be dependent on the cameras and Siri to run the iPhone app functions.</p>
$$,
ARRAY['https://www.macrumors.com/2026/11/15/apple-smart-glasses-hinge-on-siri/', 'https://www.gadgets360.com/wearables/news/apple-smart-glasses-design-expected-features-leak-launch-timeline-report-mark-gurman-12332113?from=app', 'https://www.macobserver.com/news/apple-smart-glasses-could-miss-wwdc-2027-as-software-delays-threaten-launch/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- lt-nvidia-b300-order-chennai-ai-factory-20261124 (tech-ai; India; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'lt-nvidia-b300-order-chennai-ai-factory-20261124', 'tech-ai', 'India',
'L&T Wins NVIDIA B300 Order for Chennai AI Factory',
'L&T Wins NVIDIA B300 Order for Chennai AI Factory',
'L&T''s Vyoma.AI has won a multi-year NVIDIA B300 order worth up to Rs 5,000 crore to deploy more GPUs at its Chennai AI factory.',
'L&T''s Vyoma.AI has won a multi-year NVIDIA B300 order worth up to Rs 5,000 crore to deploy more GPUs at its Chennai AI factory.',
$$<p>Vyoma.AI, a Larsen & Toubro group company, has won a multi-year order for NVIDIA B300 GPUs — worth between Rs 2,500 crore and Rs 5,000 crore — to deploy more GPUs at its Chennai datacentre. L&T disclosed the order to the stock exchanges on 23 November 2026.</p>

<table>
<tr><td>Order</td><td>A multi-year engagement covering extra NVIDIA B300 GPUs</td></tr>
<tr><td>Value</td><td>Between Rs 2,500 crore and Rs 5,000 crore — inside L&T's "Large" band</td></tr>
<tr><td>Client</td><td>An inference infrastructure provider, whose name has not been disclosed</td></tr>
<tr><td>Site</td><td>The Vyoma.AI data centre campus in Chennai</td></tr>
<tr><td>Cluster</td><td>Forms part of the campus's 10,000-GPU cluster</td></tr>
<tr><td>Commissioning target</td><td>The Chennai AI Factory is due to be commissioned in January 2027</td></tr>
</table>

<h2>What happened</h2>

<p>Through its AI infrastructure arm, LTN Compute, Vyoma.AI has taken on a large order from an inference infrastructure provider for additional NVIDIA B300 GPUs at its Chennai datacentre. Those GPUs will power the client's AI-native platform, letting it train, fine-tune and deploy AI models for high-performance inference at commercial scale. L&T have put the order in their 'Large' bracket — orders worth between Rs 2,500 crore and Rs 5,000 crore — and have disclosed neither the exact value, nor the number of GPUs, the tenor or the customer's name.</p>

<p>This builds on L&T's move into the AI factory business. Back in August 2026, LTN Compute landed a "Mega" order to host a 10,000-GPU NVIDIA B300 AI Factory for Together AI of the US at the same campus — L&T billed it as India's biggest single-cluster AI infrastructure. Then in October, Vyoma.AI started work on a 52 MW AI-ready data centre in Chennai, beside its existing 30 MW facility. At the Q2 FY27 earnings call on 27 October, L&T put January 2027 as the target for commissioning the Chennai AI Factory. The campus is meant to grow into a gigawatt-scale AI hub, with Phase 1 built for 250 MW and 150 MVA of power infrastructure already in place.</p>

<h2>What the NVIDIA B300 order means</h2>

<p>India-hosted inference capacity is fast becoming a market in its own right, and this deal is the latest sign of it. Domestic players are adding GPU capacity at speed — Neysa recently switched on an 8,192-GPU AMD cluster in Mumbai, Sarvam's Token Factory opened India-hosted AI inference to developers, and the IndiaAI Mission's 10,000-GPU tender is adding subsidised compute. For enterprise buyers, more NVIDIA B300 capacity on Indian soil means more ways to run large models close to their data, with lower latency and simpler data-residency compliance.</p>

<p>It also shows, very clearly, how the AI chip race has moved beyond selling chips to selling whole factories. An integrated AI factory bundles hyperscale data centre infrastructure with accelerated computing, high-performance networking, ultra-low-latency interconnects, high-throughput parallel storage and AI infrastructure operations. That is exactly the same rack-scale shift behind our coverage of the <a href="https://growentix.cloud/articles/nvidia-rubin-hpc-chip-50000-cuda-cores-20261123">Nvidia Rubin HPC chip</a>, where buyers now purchase the rack rather than the chip. More on the wider picture in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>L&T have named neither the client nor the exact value of the order, the number of NVIDIA B300 GPUs it covers, or the length of the engagement. Nor have they said when the new GPUs will be installed or switched on — only that the wider AI factory is due for commissioning in January 2027. And the press release says nothing about how the capacity is split between training and inference workloads.</p>

<p>Sources: <a href="https://cio.eletsonline.com/artificial-intelligence/lt-nvidia-b300-gpu-order/77084/">Elets CIO</a> reported the order details, cluster size and campus plans; <a href="https://www.tradingview.com/news/cnbctv:229c4baad094b:0/">CNBC TV18</a> covered the stock exchange disclosure and the order band; <a href="https://upstox.com/news/market-news/stocks/l-and-t-secures-large-order-for-deploying-ai-cluster-shares-turn-green-ytd/article-203851/">Upstox</a> carried the press release wording and the chairman's statement.</p>

<h2>Frequently asked questions</h2>

<h3>Who's the client on L's new NVIDIA B300 order?</h3>
<p>L&T described the client  as just an inference infrastructure provider and didn't name it.</p>

<h3>What's the size of the order?</h3>
<p>L have&T&T classified it as a "Large" order (i.e. between Rs 2,500 crore and Rs 5,000 crore). The exact figure has not been disclosed.</p>
$$,
$$<p>Vyoma.AI, a Larsen & Toubro group company, has won a multi-year order for NVIDIA B300 GPUs — worth between Rs 2,500 crore and Rs 5,000 crore — to deploy more GPUs at its Chennai datacentre. L&T disclosed the order to the stock exchanges on 23 November 2026.</p>

<table>
<tr><td>Order</td><td>A multi-year engagement covering extra NVIDIA B300 GPUs</td></tr>
<tr><td>Value</td><td>Between Rs 2,500 crore and Rs 5,000 crore — inside L&T's "Large" band</td></tr>
<tr><td>Client</td><td>An inference infrastructure provider, whose name has not been disclosed</td></tr>
<tr><td>Site</td><td>The Vyoma.AI data centre campus in Chennai</td></tr>
<tr><td>Cluster</td><td>Forms part of the campus's 10,000-GPU cluster</td></tr>
<tr><td>Commissioning target</td><td>The Chennai AI Factory is due to be commissioned in January 2027</td></tr>
</table>

<h2>What happened</h2>

<p>Through its AI infrastructure arm, LTN Compute, Vyoma.AI has taken on a large order from an inference infrastructure provider for additional NVIDIA B300 GPUs at its Chennai datacentre. Those GPUs will power the client's AI-native platform, letting it train, fine-tune and deploy AI models for high-performance inference at commercial scale. L&T have put the order in their 'Large' bracket — orders worth between Rs 2,500 crore and Rs 5,000 crore — and have disclosed neither the exact value, nor the number of GPUs, the tenor or the customer's name.</p>

<p>This builds on L&T's move into the AI factory business. Back in August 2026, LTN Compute landed a "Mega" order to host a 10,000-GPU NVIDIA B300 AI Factory for Together AI of the US at the same campus — L&T billed it as India's biggest single-cluster AI infrastructure. Then in October, Vyoma.AI started work on a 52 MW AI-ready data centre in Chennai, beside its existing 30 MW facility. At the Q2 FY27 earnings call on 27 October, L&T put January 2027 as the target for commissioning the Chennai AI Factory. The campus is meant to grow into a gigawatt-scale AI hub, with Phase 1 built for 250 MW and 150 MVA of power infrastructure already in place.</p>

<h2>What the NVIDIA B300 order means</h2>

<p>India-hosted inference capacity is fast becoming a market in its own right, and this deal is the latest sign of it. Domestic players are adding GPU capacity at speed — Neysa recently switched on an 8,192-GPU AMD cluster in Mumbai, Sarvam's Token Factory opened India-hosted AI inference to developers, and the IndiaAI Mission's 10,000-GPU tender is adding subsidised compute. For enterprise buyers, more NVIDIA B300 capacity on Indian soil means more ways to run large models close to their data, with lower latency and simpler data-residency compliance.</p>

<p>It also shows, very clearly, how the AI chip race has moved beyond selling chips to selling whole factories. An integrated AI factory bundles hyperscale data centre infrastructure with accelerated computing, high-performance networking, ultra-low-latency interconnects, high-throughput parallel storage and AI infrastructure operations. That is exactly the same rack-scale shift behind our coverage of the <a href="https://growentix.cloud/articles/nvidia-rubin-hpc-chip-50000-cuda-cores-20261123">Nvidia Rubin HPC chip</a>, where buyers now purchase the rack rather than the chip. More on the wider picture in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>L&T have named neither the client nor the exact value of the order, the number of NVIDIA B300 GPUs it covers, or the length of the engagement. Nor have they said when the new GPUs will be installed or switched on — only that the wider AI factory is due for commissioning in January 2027. And the press release says nothing about how the capacity is split between training and inference workloads.</p>

<p>Sources: <a href="https://cio.eletsonline.com/artificial-intelligence/lt-nvidia-b300-gpu-order/77084/">Elets CIO</a> reported the order details, cluster size and campus plans; <a href="https://www.tradingview.com/news/cnbctv:229c4baad094b:0/">CNBC TV18</a> covered the stock exchange disclosure and the order band; <a href="https://upstox.com/news/market-news/stocks/l-and-t-secures-large-order-for-deploying-ai-cluster-shares-turn-green-ytd/article-203851/">Upstox</a> carried the press release wording and the chairman's statement.</p>

<h2>Frequently asked questions</h2>

<h3>Who's the client on L's new NVIDIA B300 order?</h3>
<p>L&T described the client  as just an inference infrastructure provider and didn't name it.</p>

<h3>What's the size of the order?</h3>
<p>L have&T&T classified it as a "Large" order (i.e. between Rs 2,500 crore and Rs 5,000 crore). The exact figure has not been disclosed.</p>
$$,
ARRAY['https://cio.eletsonline.com/artificial-intelligence/lt-nvidia-b300-gpu-order/77084/', 'https://www.tradingview.com/news/cnbctv:229c4baad094b:0/', 'https://upstox.com/news/market-news/stocks/l-and-t-secures-large-order-for-deploying-ai-cluster-shares-turn-green-ytd/article-203851/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- meta-muse-charm-price-300-verizon-5g-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'meta-muse-charm-price-300-verizon-5g-20261124', 'tech-ai', 'Global',
'Meta Muse Charm Priced at $300 With Free Verizon 5G',
'Meta Muse Charm Priced at $300 With Free Verizon 5G',
'Meta''s Muse Charm pocket AI device will reportedly cost $300 and include up to 12 months of free Verizon 5G, according to The Information.',
'Meta''s Muse Charm pocket AI device will reportedly cost $300 and include up to 12 months of free Verizon 5G, according to The Information.',
$$<p>Meta's pocket-sized Muse Charm AI device will reportedly cost $300, with buyers offered up to 12 months of free 5G data from Verizon, The Information reported on 19 November. Muse Charm is a small handheld gadget that lets you talk to Meta's personal AI agent, Muse, without reaching for a phone.</p>

<table>
<tr><td>Device</td><td>Muse Charm, pocket-sized AI device</td></tr>
<tr><td>Reported price</td><td>$300</td></tr>
<tr><td>Bundle</td><td>Up to 12 months of free 5G data from Verizon</td></tr>
<tr><td>Launch target</td><td>Holiday shopping season, December 2026</td></tr>
<tr><td>Screen</td><td>About 2 inches, with a customisable Muse character</td></tr>
<tr><td>Connectivity</td><td>Built-in 5G modem; cannot make calls</td></tr>
</table>

<h2>What happened</h2>

<p>Meta chief executive Mark Zuckerberg introduced Muse Charm at the Meta Connect event in September 2026, describing it as "a joyful little device for talking to your Muse that fits on your keychain". He said  the product was being finalised and that it would be ready to ship in December (in time for the Christmas shopping season). No price was announced at the time of the launch.</p>

<p>Citing a person familiar with the matter, The Information puts the price at $300 and says buyers will get up to a year of free 5G from Verizon — intended to give Muse faster responses when users are away from Wi-Fi. Asked by TechCrunch to comment, a Meta spokesperson did not deny the claims, saying only: "We're charmed by the interest in our AI devices, and we'll have more to share soon." The device has a roughly 2-inch screen navigated with a thumb, a fingerprint reader to verify identity before taking commands, and a built-in 5G modem, but it cannot make calls.</p>

<p>The report also states that Meta have pushed back the wider launch of their health smartwatch from 2026 to 2027 in order to focus on getting Charm to market. An internal memo set a target of 10m wearable sales in the second half of 2026 and nearly 7m monthly active users across  wearables by the end of the year.</p>

<h2>What the Muse Charm price means</h2>

<p>At $300 Charm is a very premium proposition in a category that's already seen one company go under (Humane's Ai Pin flopped, and the closest rival, Friend's $250 wearable pendant is cheaper. Meta's answer is the free 5G bundle (which effectively removes the monthly cost objection for a year) and the keychain rather than the pin which is a much less intrusive proposition. The inclusion of the  fingerprint reader is a pretty clear signal that you've got a device which is going to talk back and you need to know who you're talking to.</p>

<p>The timing is key really. A December launch means Charm is under the Christmas trees and Meta needs a hit. The wearables targets are huge and the smartwatch delay shows Charm has been prioritised in the hardware portfolio. It's a very different  AI bet to the world model race that we're talking about in our <a href="https://growentix.cloud/articles/google-genie-4-gemini-api-developers-20261123">Google Genie 4 Gemini API</a> piece. Google is selling developers a world they can drive, Meta is selling consumers a companion they can carry. More on the wider field  in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Meta has not confirmed the $300 price point, the free 5G bundle or a launch date. The Information's report is based on a single unnamed source. There is no official spec sheet  so we have no idea what the battery life is, what the storage is or indeed what the full feature set is. The source doesn't say whether the free 5G will require a Verizon account or a contract and what happens at the end of the 12 months. The 10 million wearable sales target is an internal target, not a  forecast.</p>

<p>Sources: <a href="https://techcrunch.com/2026/11/19/metas-new-muse-charm-device-may-cost-300/">TechCrunch</a> reported The Information's report and Meta's response; <a href="https://www.channelnewsasia.com/business/meta-price-muse-charm-gadget-300-information-reports-6567231">Channel News Asia</a> carried the Reuters account of the price and 5G bundle; <a href="https://www.pymnts.com/news/wearables/2026/meta-plans-300-price-tag-and-free-5g-for-muse-charm-ai-device/">PYMNTS</a> covered the Connect reveal, the smartwatch delay and the wearables targets.</p>

<h2>Frequently asked questions</h2>

<h3>How much is the Muse Charm going to be?</h3>
<p>Meta reportedly intend to charge $300 (per The Information). Meta have not confirmed the price.</p>

<h3>What does the Muse Charm do?</h3>
<p>It's a pocket sized device you can use to talk to Meta's Muse AI agent without having to use a phone. It has a small screen with a customisable Muse character, a fingerprint reader and its own 5G modem. It doesn't have the ability to make calls.</p>
$$,
$$<p>Meta's pocket-sized Muse Charm AI device will reportedly cost $300, with buyers offered up to 12 months of free 5G data from Verizon, The Information reported on 19 November. Muse Charm is a small handheld gadget that lets you talk to Meta's personal AI agent, Muse, without reaching for a phone.</p>

<table>
<tr><td>Device</td><td>Muse Charm, pocket-sized AI device</td></tr>
<tr><td>Reported price</td><td>$300</td></tr>
<tr><td>Bundle</td><td>Up to 12 months of free 5G data from Verizon</td></tr>
<tr><td>Launch target</td><td>Holiday shopping season, December 2026</td></tr>
<tr><td>Screen</td><td>About 2 inches, with a customisable Muse character</td></tr>
<tr><td>Connectivity</td><td>Built-in 5G modem; cannot make calls</td></tr>
</table>

<h2>What happened</h2>

<p>Meta chief executive Mark Zuckerberg introduced Muse Charm at the Meta Connect event in September 2026, describing it as "a joyful little device for talking to your Muse that fits on your keychain". He said  the product was being finalised and that it would be ready to ship in December (in time for the Christmas shopping season). No price was announced at the time of the launch.</p>

<p>Citing a person familiar with the matter, The Information puts the price at $300 and says buyers will get up to a year of free 5G from Verizon — intended to give Muse faster responses when users are away from Wi-Fi. Asked by TechCrunch to comment, a Meta spokesperson did not deny the claims, saying only: "We're charmed by the interest in our AI devices, and we'll have more to share soon." The device has a roughly 2-inch screen navigated with a thumb, a fingerprint reader to verify identity before taking commands, and a built-in 5G modem, but it cannot make calls.</p>

<p>The report also states that Meta have pushed back the wider launch of their health smartwatch from 2026 to 2027 in order to focus on getting Charm to market. An internal memo set a target of 10m wearable sales in the second half of 2026 and nearly 7m monthly active users across  wearables by the end of the year.</p>

<h2>What the Muse Charm price means</h2>

<p>At $300 Charm is a very premium proposition in a category that's already seen one company go under (Humane's Ai Pin flopped, and the closest rival, Friend's $250 wearable pendant is cheaper. Meta's answer is the free 5G bundle (which effectively removes the monthly cost objection for a year) and the keychain rather than the pin which is a much less intrusive proposition. The inclusion of the  fingerprint reader is a pretty clear signal that you've got a device which is going to talk back and you need to know who you're talking to.</p>

<p>The timing is key really. A December launch means Charm is under the Christmas trees and Meta needs a hit. The wearables targets are huge and the smartwatch delay shows Charm has been prioritised in the hardware portfolio. It's a very different  AI bet to the world model race that we're talking about in our <a href="https://growentix.cloud/articles/google-genie-4-gemini-api-developers-20261123">Google Genie 4 Gemini API</a> piece. Google is selling developers a world they can drive, Meta is selling consumers a companion they can carry. More on the wider field  in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Meta has not confirmed the $300 price point, the free 5G bundle or a launch date. The Information's report is based on a single unnamed source. There is no official spec sheet  so we have no idea what the battery life is, what the storage is or indeed what the full feature set is. The source doesn't say whether the free 5G will require a Verizon account or a contract and what happens at the end of the 12 months. The 10 million wearable sales target is an internal target, not a  forecast.</p>

<p>Sources: <a href="https://techcrunch.com/2026/11/19/metas-new-muse-charm-device-may-cost-300/">TechCrunch</a> reported The Information's report and Meta's response; <a href="https://www.channelnewsasia.com/business/meta-price-muse-charm-gadget-300-information-reports-6567231">Channel News Asia</a> carried the Reuters account of the price and 5G bundle; <a href="https://www.pymnts.com/news/wearables/2026/meta-plans-300-price-tag-and-free-5g-for-muse-charm-ai-device/">PYMNTS</a> covered the Connect reveal, the smartwatch delay and the wearables targets.</p>

<h2>Frequently asked questions</h2>

<h3>How much is the Muse Charm going to be?</h3>
<p>Meta reportedly intend to charge $300 (per The Information). Meta have not confirmed the price.</p>

<h3>What does the Muse Charm do?</h3>
<p>It's a pocket sized device you can use to talk to Meta's Muse AI agent without having to use a phone. It has a small screen with a customisable Muse character, a fingerprint reader and its own 5G modem. It doesn't have the ability to make calls.</p>
$$,
ARRAY['https://techcrunch.com/2026/11/19/metas-new-muse-charm-device-may-cost-300/', 'https://www.channelnewsasia.com/business/meta-price-muse-charm-gadget-300-information-reports-6567231', 'https://www.pymnts.com/news/wearables/2026/meta-plans-300-price-tag-and-free-5g-for-muse-charm-ai-device/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- nvidia-rtx-spark-compact-desktops-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'nvidia-rtx-spark-compact-desktops-20261124', 'tech-ai', 'Global',
'Nvidia RTX Spark Compact Desktops Now on Sale',
'Nvidia RTX Spark Compact Desktops Now on Sale',
'Nvidia RTX Spark compact desktops from ASUS, Dell and MSI are now on sale, bringing up to 128GB of unified memory to local AI PCs.',
'Nvidia RTX Spark compact desktops from ASUS, Dell and MSI are now on sale, bringing up to 128GB of unified memory to local AI PCs.',
$$<p>Nvidia RTX Spark compact desktops from ASUS, Dell and MSI are now on sale, bringing local AI agents, image and video generation and model fine-tuning to a dedicated Windows PC. Nvidia announced availability on 18 November 2026.</p>

<table>
<tr><td>Product</td><td>Nvidia RTX Spark compact desktops</td></tr>
<tr><td>Available now</td><td>ASUS, Dell and MSI systems, from 18 November 2026</td></tr>
<tr><td>Coming soon</td><td>Acer, GIGABYTE and HP mini PCs; Microsoft Surface RTX Spark Dev Box</td></tr>
<tr><td>CPU</td><td>20-core Nvidia Grace CPU</td></tr>
<tr><td>GPU</td><td>Blackwell RTX GPU with 6,144 CUDA cores</td></tr>
<tr><td>Memory</td><td>Up to 128GB unified memory</td></tr>
<tr><td>AI performance</td><td>Up to 1 petaflop</td></tr>
</table>

<h2>What happened</h2>

<p>Nvidia have just launched the first compact desktops   from ASUS, Dell and MSI (joining the RTX Spark laptops which have been available since October). The first of the new systems are the ASUS ProArt GR1X mini PC and the MSI EdgeMesa N AI+ Series.  Acer, GIGABYTE and HP compact desktops are due shortly, as are the Microsoft Surface RTX Spark Dev Box. The RTX Spark laptops are still available from ASUS, Dell, HP, Lenovo, Microsoft and MSI with prices from $2,599.</p>

<p>The desktops pair a 20-core Grace CPU with a Blackwell RTX GPU (up to 6,144 CUDA cores, up to 128GB of unified memory) for up to one petaflop of AI performance. Nvidia claim they can render 3D scenes in excess of 90GB in real time, can edit 4:2:2 video with ease and can run supported language models of up to 120 B parameters entirely on device. They also have 10gbe.</p>

<p>Prices vary enormously from vendor to vendor and from configuration to configuration. The ASUS ProArt GR1X is listed at $4,499 (64GB) according to The Verge. The MSI EdgeMesa N AI+ that XDA Developers with 128GB of RAM and a 4TB SSD is priced as high as $8,000. The Microsoft Surface RTX Spark Dev Box is  $6,000 with 128GB of RAM and a 2TB SSD).</p>

<h2>What the Nvidia RTX Spark desktops mean</h2>

<p>The desktops complete the second half of Nvidia's local AI story. The laptops have proven the concept. The desktop  is the product for the person who actually runs the models all day. With up to 128GB of unified memory, a 120-billion-parameter model can run locally rather than via a metered cloud API which is the real benefit. The hardware is expensive, but there's no per-token bill after that.</p>

<p>The real issue is the catch. A $4,499 starting point for the ASUS box and up to $8,000 for a loaded MSI system put these machines firmly in professional territory, and the memory shortage which has been driving prices up across the board (we've covered the <a href="https://growentix.cloud/articles/nvidia-rubin-hpc-chip-50000-cuda-cores-20261123">Nvidia Rubin HPC chip</a> situation in our Tech news piece) is only going to make that worse. The 'coming soon' list is also relevant as HP, Acer and GIGABYTE haven't shipped yet so those customers on those vendors' service contracts will be on the waiting list. More on the wider field is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> piece.</p>

<h2>What the sources do not say</h2>

<p>Nvidia's announcement gives no per-system price and provides no date for the Acer, GIGABYTE, HP or Microsoft systems. The performance figures (the 120b parameter model  and the 90GB real time rendering claim) are all Nvidia's own and have not been independently verified. The sources provide no information as to the number of units that have shipped or how the desktops are selling. The Dell system that is currently available  has no named model in Nvidia's announcement.</p>

<p>Sources: <a href="https://blogs.nvidia.com/blog/rtx-spark-desktop-local-ai-available-now/">Nvidia's official blog</a> for availability, specs and the 'coming soon' list; <a href="https://www.thurrott.com/hardware/344087/first-nvidia-rtx-spark-desktops-start-shipping-today">Thurrott</a> for the model names and laptop pricing; <a href="https://www.techrepublic.com/article/news-nvidia-rtx-spark-desktops-cloud-ai-costs/">TechRepublic</a> for the ASUS starting price and the local AI cost argument.</p>

<h2>Frequently asked questions</h2>

<h3>Which  RTX Spark desktops are currently available to buy?</h3>
<p>Compact desktops from ASUS, Dell and MSI are available now, including the ASUS ProArt GR1X and the MSI EdgeMesa N AI+ Series. Acer, GIGABYTE and HP systems are coming soon.</p>

<h3>How much do the RTX Spark desktops cost?</h3>
<p>Prices are different from vendor to vendor and configuration to configuration. The ASUS ProArt GR1X starts at $4,499 for 64GB and a fully loaded MSI EdgeMesa N AI+ can run up to $8,000. Nvidia's announcement gives no per-system price.</p>
$$,
$$<p>Nvidia RTX Spark compact desktops from ASUS, Dell and MSI are now on sale, bringing local AI agents, image and video generation and model fine-tuning to a dedicated Windows PC. Nvidia announced availability on 18 November 2026.</p>

<table>
<tr><td>Product</td><td>Nvidia RTX Spark compact desktops</td></tr>
<tr><td>Available now</td><td>ASUS, Dell and MSI systems, from 18 November 2026</td></tr>
<tr><td>Coming soon</td><td>Acer, GIGABYTE and HP mini PCs; Microsoft Surface RTX Spark Dev Box</td></tr>
<tr><td>CPU</td><td>20-core Nvidia Grace CPU</td></tr>
<tr><td>GPU</td><td>Blackwell RTX GPU with 6,144 CUDA cores</td></tr>
<tr><td>Memory</td><td>Up to 128GB unified memory</td></tr>
<tr><td>AI performance</td><td>Up to 1 petaflop</td></tr>
</table>

<h2>What happened</h2>

<p>Nvidia have just launched the first compact desktops   from ASUS, Dell and MSI (joining the RTX Spark laptops which have been available since October). The first of the new systems are the ASUS ProArt GR1X mini PC and the MSI EdgeMesa N AI+ Series.  Acer, GIGABYTE and HP compact desktops are due shortly, as are the Microsoft Surface RTX Spark Dev Box. The RTX Spark laptops are still available from ASUS, Dell, HP, Lenovo, Microsoft and MSI with prices from $2,599.</p>

<p>The desktops pair a 20-core Grace CPU with a Blackwell RTX GPU (up to 6,144 CUDA cores, up to 128GB of unified memory) for up to one petaflop of AI performance. Nvidia claim they can render 3D scenes in excess of 90GB in real time, can edit 4:2:2 video with ease and can run supported language models of up to 120 B parameters entirely on device. They also have 10gbe.</p>

<p>Prices vary enormously from vendor to vendor and from configuration to configuration. The ASUS ProArt GR1X is listed at $4,499 (64GB) according to The Verge. The MSI EdgeMesa N AI+ that XDA Developers with 128GB of RAM and a 4TB SSD is priced as high as $8,000. The Microsoft Surface RTX Spark Dev Box is  $6,000 with 128GB of RAM and a 2TB SSD).</p>

<h2>What the Nvidia RTX Spark desktops mean</h2>

<p>The desktops complete the second half of Nvidia's local AI story. The laptops have proven the concept. The desktop  is the product for the person who actually runs the models all day. With up to 128GB of unified memory, a 120-billion-parameter model can run locally rather than via a metered cloud API which is the real benefit. The hardware is expensive, but there's no per-token bill after that.</p>

<p>The real issue is the catch. A $4,499 starting point for the ASUS box and up to $8,000 for a loaded MSI system put these machines firmly in professional territory, and the memory shortage which has been driving prices up across the board (we've covered the <a href="https://growentix.cloud/articles/nvidia-rubin-hpc-chip-50000-cuda-cores-20261123">Nvidia Rubin HPC chip</a> situation in our Tech news piece) is only going to make that worse. The 'coming soon' list is also relevant as HP, Acer and GIGABYTE haven't shipped yet so those customers on those vendors' service contracts will be on the waiting list. More on the wider field is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> piece.</p>

<h2>What the sources do not say</h2>

<p>Nvidia's announcement gives no per-system price and provides no date for the Acer, GIGABYTE, HP or Microsoft systems. The performance figures (the 120b parameter model  and the 90GB real time rendering claim) are all Nvidia's own and have not been independently verified. The sources provide no information as to the number of units that have shipped or how the desktops are selling. The Dell system that is currently available  has no named model in Nvidia's announcement.</p>

<p>Sources: <a href="https://blogs.nvidia.com/blog/rtx-spark-desktop-local-ai-available-now/">Nvidia's official blog</a> for availability, specs and the 'coming soon' list; <a href="https://www.thurrott.com/hardware/344087/first-nvidia-rtx-spark-desktops-start-shipping-today">Thurrott</a> for the model names and laptop pricing; <a href="https://www.techrepublic.com/article/news-nvidia-rtx-spark-desktops-cloud-ai-costs/">TechRepublic</a> for the ASUS starting price and the local AI cost argument.</p>

<h2>Frequently asked questions</h2>

<h3>Which  RTX Spark desktops are currently available to buy?</h3>
<p>Compact desktops from ASUS, Dell and MSI are available now, including the ASUS ProArt GR1X and the MSI EdgeMesa N AI+ Series. Acer, GIGABYTE and HP systems are coming soon.</p>

<h3>How much do the RTX Spark desktops cost?</h3>
<p>Prices are different from vendor to vendor and configuration to configuration. The ASUS ProArt GR1X starts at $4,499 for 64GB and a fully loaded MSI EdgeMesa N AI+ can run up to $8,000. Nvidia's announcement gives no per-system price.</p>
$$,
ARRAY['https://blogs.nvidia.com/blog/rtx-spark-desktop-local-ai-available-now/', 'https://www.thurrott.com/hardware/344087/first-nvidia-rtx-spark-desktops-start-shipping-today', 'https://www.techrepublic.com/article/news-nvidia-rtx-spark-desktops-cloud-ai-costs/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- openai-chatgpt-research-grants-50000-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'openai-chatgpt-research-grants-50000-20261124', 'tech-ai', 'Global',
'OpenAI Opens 50,000 ChatGPT Research Grants Today',
'OpenAI Opens 50,000 ChatGPT Research Grants Today',
'OpenAI opens applications for 50,000 ChatGPT research grants on 23 November, giving researchers and two collaborators free ChatGPT Plus.',
'OpenAI opens applications for 50,000 ChatGPT research grants on 23 November, giving researchers and two collaborators free ChatGPT Plus.',
$$<p>OpenAI are opening up applications today (23rd November) for 50,000 new ChatGPT research grants. These will give academic researchers free access to ChatGPT Plus. The  grants are going to the first eligible applicants, not via a lottery.</p>

<table>
<tr><td>Programme</td><td>ChatGPT for Academic Researchers</td></tr>
<tr><td>Applications open</td><td>Monday, 23 November 2026</td></tr>
<tr><td>New grants</td><td>50,000, first-come, first-served</td></tr>
<tr><td>Access</td><td>ChatGPT Plus for the recipient and up to two collaborators</td></tr>
<tr><td>Duration</td><td>12 months</td></tr>
<tr><td>Reach this round</td><td>Up to 150,000 researchers</td></tr>
<tr><td>Programme goal</td><td>200,000 researchers worldwide</td></tr>
</table>

<h2>What happened</h2>

<p>OpenAI announced the expansion on 16th November, increasing the programme's original target from 100,000 to 200,000 researchers worldwide. The  pilot launched in July and OpenAI reports that 20,000 researchers in 33 countries have joined so far. Applications for the next round open on Monday 23rd November and OpenAI  will award 50,000 new grants to eligible applicants on a first-come, first-served basis. Each grant will provide the recipient and up to two collaborators with free access to ChatGPT Plus, allowing the round to reach up to 150,000 researchers.</p>

<p>Two things have changed since the pilot. Selection is now first come, first served (replacing the pilot lottery) and the new grants provide ChatGPT Plus rather than the Pro access which was available in the summer pilot. OpenAI says most pilot participants would have been in their Plus usage anyway so it's really just a matter of being able to fund access for a much larger number of teams. The grant now covers up to three people (down from five in the pilot). Openai state that by default they do not use any data provided as part of the programme to train their models.</p>

<p>OpenAI have also published' Science at the Frontier: How Scientists Use ChatGPT' from their Economic Research team. This looks at the use of Chatgpt by over 1,800 researchers  during the summer pilot and their contribution of $5 m to a new Simons Foundation initiative to help mathematicians look at, understand and build on the results of AI.</p>

<h2>What the ChatGPT research grants mean</h2>

<p>The big difference for applicants is that it's now decides who got in first have the advantage. Those already on the waitlist who were eligible were promised activation instructions via email prior to the applications opening. The downgrade from Pro to Plus is the trade-off that pays for the scale. Plus is a real step down in terms of usage  but  OpenAI's own pilot data suggests it's more than sufficient for the vast majority of academic work and the alternative would have been a lot fewer grants.</p>

<p>The programme also looks at OpenAI extending access in a number of ways at  the same time (research grants, custom silicon as part of our <a href="https://growentix.cloud/articles/openai-chip-design-jalapeno-amd-14-percent-20261123">OpenAI chip design</a> coverage etc). More on the wider field  in our <a href="https://growentix.cloud/tech-ai">Tech News</a> section.</p>

<h2>What the sources do not say</h2>

<p>OpenAI have not specified an opening hour or time zone for applications and have not set out the full eligibility criteria (e.g. which institutions, career stages and disciplines are eligible). The Researcher Access Guide does state that research faculty and postdocs can apply and that the programme is available in all regions except China and Hong Kong. That said the final eligibility and collaborator criteria for the new intake are yet to be confirmed. API credits and specialist models are not part of the grants.</p>

<p>Sources: <a href="https://openai.com/index/expanding-chatgpt-for-academic-researchers/">OpenAI's own announcement</a>, which sets out the grant numbers, the dates and the programme goal; <a href="https://www.neowin.net/news/openai-doubles-free-chatgpt-access-to-200000-scientists-but-theres-a-catch/">Neowin</a>, which compares the new round with the pilot and covers the switch to Plus; <a href="https://www.datastudios.org/post/chatgpt-for-academic-researchers-50000-plus-grants-november-23">DataStudios</a>, which breaks down the seat counts and how to apply.</p>

<h2>Frequently asked questions</h2>

<h3>Who is eligible to apply for a ChatGPT research grant?</h3>
<p>Research faculty and postdocs in eligible regions (again, the programme is in science, maths and engineering). OpenAI note that the final eligibility criteria for the new intake have not yet been confirmed.</p>

<h3>What does each grant include?</h3>
<p>Twelve months of free ChatGPT Plus access for the person receiving it and up to two collaborators. API credits and specialist models are not included.</p>
$$,
$$<p>OpenAI are opening up applications today (23rd November) for 50,000 new ChatGPT research grants. These will give academic researchers free access to ChatGPT Plus. The  grants are going to the first eligible applicants, not via a lottery.</p>

<table>
<tr><td>Programme</td><td>ChatGPT for Academic Researchers</td></tr>
<tr><td>Applications open</td><td>Monday, 23 November 2026</td></tr>
<tr><td>New grants</td><td>50,000, first-come, first-served</td></tr>
<tr><td>Access</td><td>ChatGPT Plus for the recipient and up to two collaborators</td></tr>
<tr><td>Duration</td><td>12 months</td></tr>
<tr><td>Reach this round</td><td>Up to 150,000 researchers</td></tr>
<tr><td>Programme goal</td><td>200,000 researchers worldwide</td></tr>
</table>

<h2>What happened</h2>

<p>OpenAI announced the expansion on 16th November, increasing the programme's original target from 100,000 to 200,000 researchers worldwide. The  pilot launched in July and OpenAI reports that 20,000 researchers in 33 countries have joined so far. Applications for the next round open on Monday 23rd November and OpenAI  will award 50,000 new grants to eligible applicants on a first-come, first-served basis. Each grant will provide the recipient and up to two collaborators with free access to ChatGPT Plus, allowing the round to reach up to 150,000 researchers.</p>

<p>Two things have changed since the pilot. Selection is now first come, first served (replacing the pilot lottery) and the new grants provide ChatGPT Plus rather than the Pro access which was available in the summer pilot. OpenAI says most pilot participants would have been in their Plus usage anyway so it's really just a matter of being able to fund access for a much larger number of teams. The grant now covers up to three people (down from five in the pilot). Openai state that by default they do not use any data provided as part of the programme to train their models.</p>

<p>OpenAI have also published' Science at the Frontier: How Scientists Use ChatGPT' from their Economic Research team. This looks at the use of Chatgpt by over 1,800 researchers  during the summer pilot and their contribution of $5 m to a new Simons Foundation initiative to help mathematicians look at, understand and build on the results of AI.</p>

<h2>What the ChatGPT research grants mean</h2>

<p>The big difference for applicants is that it's now decides who got in first have the advantage. Those already on the waitlist who were eligible were promised activation instructions via email prior to the applications opening. The downgrade from Pro to Plus is the trade-off that pays for the scale. Plus is a real step down in terms of usage  but  OpenAI's own pilot data suggests it's more than sufficient for the vast majority of academic work and the alternative would have been a lot fewer grants.</p>

<p>The programme also looks at OpenAI extending access in a number of ways at  the same time (research grants, custom silicon as part of our <a href="https://growentix.cloud/articles/openai-chip-design-jalapeno-amd-14-percent-20261123">OpenAI chip design</a> coverage etc). More on the wider field  in our <a href="https://growentix.cloud/tech-ai">Tech News</a> section.</p>

<h2>What the sources do not say</h2>

<p>OpenAI have not specified an opening hour or time zone for applications and have not set out the full eligibility criteria (e.g. which institutions, career stages and disciplines are eligible). The Researcher Access Guide does state that research faculty and postdocs can apply and that the programme is available in all regions except China and Hong Kong. That said the final eligibility and collaborator criteria for the new intake are yet to be confirmed. API credits and specialist models are not part of the grants.</p>

<p>Sources: <a href="https://openai.com/index/expanding-chatgpt-for-academic-researchers/">OpenAI's own announcement</a>, which sets out the grant numbers, the dates and the programme goal; <a href="https://www.neowin.net/news/openai-doubles-free-chatgpt-access-to-200000-scientists-but-theres-a-catch/">Neowin</a>, which compares the new round with the pilot and covers the switch to Plus; <a href="https://www.datastudios.org/post/chatgpt-for-academic-researchers-50000-plus-grants-november-23">DataStudios</a>, which breaks down the seat counts and how to apply.</p>

<h2>Frequently asked questions</h2>

<h3>Who is eligible to apply for a ChatGPT research grant?</h3>
<p>Research faculty and postdocs in eligible regions (again, the programme is in science, maths and engineering). OpenAI note that the final eligibility criteria for the new intake have not yet been confirmed.</p>

<h3>What does each grant include?</h3>
<p>Twelve months of free ChatGPT Plus access for the person receiving it and up to two collaborators. API credits and specialist models are not included.</p>
$$,
ARRAY['https://openai.com/index/expanding-chatgpt-for-academic-researchers/', 'https://www.neowin.net/news/openai-doubles-free-chatgpt-access-to-200000-scientists-but-theres-a-catch/', 'https://www.datastudios.org/post/chatgpt-for-academic-researchers-50000-plus-grants-november-23'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- openai-dots-agent-chatgpt-plus-expansion-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'openai-dots-agent-chatgpt-plus-expansion-20261124', 'tech-ai', 'Global',
'OpenAI Dots Agent Expands to ChatGPT Plus Test',
'OpenAI Dots Agent Expands to ChatGPT Plus Test',
'The OpenAI Dots agent is being tested with a small group of ChatGPT Plus users and rolled out to all ChatGPT Business Standard accounts.',
'The OpenAI Dots agent is being tested with a small group of ChatGPT Plus users and rolled out to all ChatGPT Business Standard accounts.',
$$<p>OpenAI is testing its Dots agent with a small cohort of ChatGPT Plus users and is now rolling it out to all ChatGPT Business Standard users. The OpenAI Dots agent (launched in September for the premium plans) is now reaching the $20/month tiers.</p>

<table>
<tr><td>Product</td><td>ChatGPT Dots, always-on personal agents</td></tr>
<tr><td>Plus test</td><td>Small number of ChatGPT Plus users, from 19 November 2026</td></tr>
<tr><td>Business Standard</td><td>Rolling out to all users, from 19 November 2026</td></tr>
<tr><td>Plus price</td><td>$20 a month</td></tr>
<tr><td>Business Standard price</td><td>$20 per user a month billed annually, $25 billed monthly</td></tr>
<tr><td>Models</td><td>GPT-6 Astra, plus GPT-6.1 Terra</td></tr>
<tr><td>App access</td><td>Over 4,000 apps through plugins</td></tr>
</table>

<h2>What happened</h2>

<p>Thibault "Tibo" Sottiaux, who leads engineering for Codex and ChatGPT at OpenAI, announced the expansion in a post on X on 19 November: "Heads up, we're starting to test dots with a small number of ChatGPT Plus users. Looking forward to the continued feedback as we expand, and I'm recently seeing a lot more positives around how good the proactivity has been after many improvements." He added that Dots will also be available to all ChatGPT Business Standard users starting that day.</p>

<p>Dots launched 29th September 2026 as OpenAI's foray into the personal agent space. They're software that pursues tasks using a range of connected tools and its own cloud computer in between the conversations, working towards the user's goals even when the user isn't actually talking to it. Until this week you needed a Pro subscription (from $100/month), a Business Premium seat at $100 per user per month billed annually or an Enterprise workspace to use a dot. The agents are connected to over 4,000 apps via OpenAI's plugin ecosystem. They originally ran on GPT-6 Astra and are now also capable of running on GPT-6.1 Terra.</p>

<p> OpenAI have just begun rolling out the redesigned ChatGPT mobile app (with the user's dot as its own tab and the ability to pin features such as Codex, Projects and Images  to the tab bar). The redesign starts with Pro users  18 and over in regions where dots are available, plus a small cohort of eligible Plus users. It's not going to the European Economic Area, the UK, Switzerland or Korea.</p>

<h2>What the OpenAI Dots agent expansion means</h2>

<p>This is the biggest step so far in the direction of providing ChatGPT's mass market paying customers with software that can act on their behalf without any supervision at all. A $20 Plus subscriber can now in principle have an agent that will just keep going on a project all night whereas previously that was the preserve of the $100 Pro user. The gap between the tiers is closing very rapidly and that's the whole point. Dots was launched  as a premium feature in September and are now rapidly bringing it down the price ladder in the space of two months.</p>

<p>The big unanswered question is the allowance. On Pro and Business Premium, a conversation with a dot doesn't count against your normal ChatGPT usage limits unless it's a complex task. It's not at all clear whether Plus or Business Standard users get the same treatment and the OpenAI written docs on dots hadn't been updated to reflect the new tiers at the time the expansion was reported. That's important as an agent working all day can easily consume an allowance. The same principle is at play in our <a href="https://growentix.cloud/articles/microsoft-windows-365-agents-copilot-credits-20261123">Microsoft Windows 365 agents</a> coverage, where the credit now goes to the agent. More on the wider picture is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>OpenAI haven't said whether the Plus test will become permanent, when Dots will open up to all Plus subscribers or whether free tier users will ever get access. They haven't said whether Plus and Business Standard users will get the same usage limit exemption as Pro users or what other restrictions might apply. The criteria for selection in the Plus test's selection criteria and duration are undisclosed, and the duration of the test are not known. The rollout to Business Standard accounts is likely to take some time to get to all workspaces.</p>

<p>Sources: <a href="https://www.engadget.com/2322656/openai-is-testing-dots-personal-agents-on-its-20-per-month-plus-tier/">Engadget</a> for Sottiaux's announcement and the pricing context; <a href="https://9to5mac.com/2026/11/19/openai-begins-testing-dots-with-chatgpt-plus-users-expands-business-access/">9to5Mac</a> for the launch history and the mobile app redesign; <a href="https://www.datastudios.org/post/chatgpt-dots-business-standard-plus-test-20-month-new-mobile-tab">DataStudios</a> for the plan by plan availability and the documentation gap.</p>

<h2>Frequently asked questions</h2>

<h3>Can ChatGPT Plus users get Dots now?</h3>
<p>Only a very small test group at the moment. OpenAI started testing Dots with a small number of Plus users on the 19th November and have not yet announced when it will be opening it up to all Plus users.</p>

<h3>What is a ChatGPT dot?</h3>
<p>A dot is an always on personal agent with its own cloud computer that works on your goals in the background across your apps, even when you're not actually talking to it.</p>
$$,
$$<p>OpenAI is testing its Dots agent with a small cohort of ChatGPT Plus users and is now rolling it out to all ChatGPT Business Standard users. The OpenAI Dots agent (launched in September for the premium plans) is now reaching the $20/month tiers.</p>

<table>
<tr><td>Product</td><td>ChatGPT Dots, always-on personal agents</td></tr>
<tr><td>Plus test</td><td>Small number of ChatGPT Plus users, from 19 November 2026</td></tr>
<tr><td>Business Standard</td><td>Rolling out to all users, from 19 November 2026</td></tr>
<tr><td>Plus price</td><td>$20 a month</td></tr>
<tr><td>Business Standard price</td><td>$20 per user a month billed annually, $25 billed monthly</td></tr>
<tr><td>Models</td><td>GPT-6 Astra, plus GPT-6.1 Terra</td></tr>
<tr><td>App access</td><td>Over 4,000 apps through plugins</td></tr>
</table>

<h2>What happened</h2>

<p>Thibault "Tibo" Sottiaux, who leads engineering for Codex and ChatGPT at OpenAI, announced the expansion in a post on X on 19 November: "Heads up, we're starting to test dots with a small number of ChatGPT Plus users. Looking forward to the continued feedback as we expand, and I'm recently seeing a lot more positives around how good the proactivity has been after many improvements." He added that Dots will also be available to all ChatGPT Business Standard users starting that day.</p>

<p>Dots launched 29th September 2026 as OpenAI's foray into the personal agent space. They're software that pursues tasks using a range of connected tools and its own cloud computer in between the conversations, working towards the user's goals even when the user isn't actually talking to it. Until this week you needed a Pro subscription (from $100/month), a Business Premium seat at $100 per user per month billed annually or an Enterprise workspace to use a dot. The agents are connected to over 4,000 apps via OpenAI's plugin ecosystem. They originally ran on GPT-6 Astra and are now also capable of running on GPT-6.1 Terra.</p>

<p> OpenAI have just begun rolling out the redesigned ChatGPT mobile app (with the user's dot as its own tab and the ability to pin features such as Codex, Projects and Images  to the tab bar). The redesign starts with Pro users  18 and over in regions where dots are available, plus a small cohort of eligible Plus users. It's not going to the European Economic Area, the UK, Switzerland or Korea.</p>

<h2>What the OpenAI Dots agent expansion means</h2>

<p>This is the biggest step so far in the direction of providing ChatGPT's mass market paying customers with software that can act on their behalf without any supervision at all. A $20 Plus subscriber can now in principle have an agent that will just keep going on a project all night whereas previously that was the preserve of the $100 Pro user. The gap between the tiers is closing very rapidly and that's the whole point. Dots was launched  as a premium feature in September and are now rapidly bringing it down the price ladder in the space of two months.</p>

<p>The big unanswered question is the allowance. On Pro and Business Premium, a conversation with a dot doesn't count against your normal ChatGPT usage limits unless it's a complex task. It's not at all clear whether Plus or Business Standard users get the same treatment and the OpenAI written docs on dots hadn't been updated to reflect the new tiers at the time the expansion was reported. That's important as an agent working all day can easily consume an allowance. The same principle is at play in our <a href="https://growentix.cloud/articles/microsoft-windows-365-agents-copilot-credits-20261123">Microsoft Windows 365 agents</a> coverage, where the credit now goes to the agent. More on the wider picture is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>OpenAI haven't said whether the Plus test will become permanent, when Dots will open up to all Plus subscribers or whether free tier users will ever get access. They haven't said whether Plus and Business Standard users will get the same usage limit exemption as Pro users or what other restrictions might apply. The criteria for selection in the Plus test's selection criteria and duration are undisclosed, and the duration of the test are not known. The rollout to Business Standard accounts is likely to take some time to get to all workspaces.</p>

<p>Sources: <a href="https://www.engadget.com/2322656/openai-is-testing-dots-personal-agents-on-its-20-per-month-plus-tier/">Engadget</a> for Sottiaux's announcement and the pricing context; <a href="https://9to5mac.com/2026/11/19/openai-begins-testing-dots-with-chatgpt-plus-users-expands-business-access/">9to5Mac</a> for the launch history and the mobile app redesign; <a href="https://www.datastudios.org/post/chatgpt-dots-business-standard-plus-test-20-month-new-mobile-tab">DataStudios</a> for the plan by plan availability and the documentation gap.</p>

<h2>Frequently asked questions</h2>

<h3>Can ChatGPT Plus users get Dots now?</h3>
<p>Only a very small test group at the moment. OpenAI started testing Dots with a small number of Plus users on the 19th November and have not yet announced when it will be opening it up to all Plus users.</p>

<h3>What is a ChatGPT dot?</h3>
<p>A dot is an always on personal agent with its own cloud computer that works on your goals in the background across your apps, even when you're not actually talking to it.</p>
$$,
ARRAY['https://www.engadget.com/2322656/openai-is-testing-dots-personal-agents-on-its-20-per-month-plus-tier/', 'https://9to5mac.com/2026/11/19/openai-begins-testing-dots-with-chatgpt-plus-users-expands-business-access/', 'https://www.datastudios.org/post/chatgpt-dots-business-standard-plus-test-20-month-new-mobile-tab'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- samsung-googlebook-origin-one-ui-95-leak-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'samsung-googlebook-origin-one-ui-95-leak-20261124', 'tech-ai', 'Global',
'Samsung Googlebook Origin Leak Points to 14 and 16 Inch Models',
'Samsung Googlebook Origin Leak Points to 14 and 16 Inch Models',
'Samsung Googlebook laptops codenamed Origin 14 and Origin 16 have surfaced in One UI 9.5 beta code, pointing to 14-inch and 16-inch models.',
'Samsung Googlebook laptops codenamed Origin 14 and Origin 16 have surfaced in One UI 9.5 beta code, pointing to 14-inch and 16-inch models.',
$$<p>Samsung's first Googlebook laptops appear to be codenamed Origin with two models appearing in the leaked One UI 9.5 beta code. The Samsung Googlebook  is expected to be available in 14" and 16" sizes and will be based on the Qualcomm Snapdragon X Elite chip.</p>

<table>
<tr><td>Codenames</td><td>Origin 14 (origin14wifi) and Origin 16 (origin16wifi)</td></tr>
<tr><td>Models</td><td>XE940XSA and XE960XSA</td></tr>
<tr><td>Chip</td><td>Qualcomm Snapdragon X Elite X1E-80-100</td></tr>
<tr><td>Sizes</td><td>14-inch and 16-inch, both Wi-Fi only</td></tr>
<tr><td>Software</td><td>Googlebook OS with Samsung's One UI layer on top</td></tr>
<tr><td>Expected window</td><td>Early 2027, alongside One UI 9.5 and the Galaxy S27 series</td></tr>
</table>

<h2>What happened</h2>

<p>Android Authority looked at the One UI 9.5 beta code and spotted references to two devices called 'origin14wifi' and 'origin16wifi'. Samsung use 'wifi' in their device codenames when the device is Wi-Fi only, so this would appear to be two laptops (one with a 14" screen and one with a 16" screen) that are Wi-Fi only. Samsung opened the One UI 9.5 beta to Galaxy S26 owners in six countries on 18 November 2026 and the report on the devices in the code was published on 19 and 20 November.</p>

<p>What sits inside the machines shows up in the code too. Back in October, a Geekbench listing appeared for at least one Origin 14 variant, running the 12-core Snapdragon X Elite X1E-80-100 alongside 16GB of RAM, and Samsung's own Video Editor source code names that same chip for both models. The code also gives the 16-inch version a touchscreen and S Pen support, which the 14-inch version lacks. From the outset, both are kitted out for office use, with device admin, work profiles and support for multiple users.</p>

<p>Notably, the code makes absolutely no reference to 'Googlebook' or 'GooglebookOS'. Samsung will likely brand the devices and the software, applying their own One UI layer on top of the Googlebook OS. Samsung aren't in the Googlebook launch partner list as it would appear they've been building their own Googlebook all along.</p>

<h2>What the Samsung Googlebook leak means</h2>

<p>The leak is the single biggest hole in the Google laptop platform. Googlebook went out with partners  Acer, ASUS, Dell, HP and Lenovo and Samsung's absence was very much the case given the Galaxy Book range and the fact that it's a Chromebook. The two Origin devices with the very obvious Snapdragon X Elite chip suggest Samsung are not  at the edges but are in fact planning a full entry which will be in the same size bracket as their Windows Galaxy Book6 Pro range.</p>

<p>If anything gives the game away, it is those office-ready features. An IT department is exactly the audience for work profiles, device admin and multi-user support, which suggests Samsung is aiming these machines at desks rather than sofas. The same commercial logic runs through our <a href="https://growentix.cloud/articles/samsung-galaxy-s27-price-rise-memory-costs-20261123">Samsung Galaxy S27 price rise</a> coverage, where rising memory costs are pushing Samsung to defend the margins on its premium hardware. More on the wider field is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Samsung have not announced the laptops at all. There's no name, no price and no launch date. The early 2027 window is purely speculative based on the fact that One UI 9.5 is coming with the Galaxy S27 series. That's not a Samsung date in the slightest. The codenames could be completely different at launch, the two devices may well never actually go to market in that form  and there is no battery, weight or display. The S Pen support for the 16 inch device is purely a codename reference, not a feature that has been confirmed in any way.</p>

<p>Sources: <a href="https://www.gsmarena.com/samsungs_android_laptops_are_codenamed_origin_heres_what_we_know-news-75549.php">GSMArena</a> for the codenames, sizes and One UI layer; <a href="https://www.notebookcheck.net/Samsung-Origin-14-and-16-Leak-reveals-Samsung-s-next-generation-of-laptops.1454538.0.html">Notebookcheck</a> for the model numbers, chip and Geekbench entry; <a href="https://www.howtogeek.com/samsung-one-ui-95-beta-code-android-laptops/">How-To Geek</a> for the beta code findings and business features.</p>

<h2>Frequently asked questions</h2>

<h3>What are the Samsung Origin laptops?</h3>
<p>Origin 14 and Origin 16 are the codenames for Samsung's first Googlebook laptops (per the One UI 9.5 beta code) and are expected to be 14" and 16" Wi-Fi only laptops running Googlebook OS with  One UI on top.</p>

<h3>When will Samsung's Googlebooks go live?</h3>
<p>Samsung haven't given a date. The leak would suggest a launch in line with One UI 9.5 (which we'd expect to come with the Galaxy S27 range in early 2027).</p>
$$,
$$<p>Samsung's first Googlebook laptops appear to be codenamed Origin with two models appearing in the leaked One UI 9.5 beta code. The Samsung Googlebook  is expected to be available in 14" and 16" sizes and will be based on the Qualcomm Snapdragon X Elite chip.</p>

<table>
<tr><td>Codenames</td><td>Origin 14 (origin14wifi) and Origin 16 (origin16wifi)</td></tr>
<tr><td>Models</td><td>XE940XSA and XE960XSA</td></tr>
<tr><td>Chip</td><td>Qualcomm Snapdragon X Elite X1E-80-100</td></tr>
<tr><td>Sizes</td><td>14-inch and 16-inch, both Wi-Fi only</td></tr>
<tr><td>Software</td><td>Googlebook OS with Samsung's One UI layer on top</td></tr>
<tr><td>Expected window</td><td>Early 2027, alongside One UI 9.5 and the Galaxy S27 series</td></tr>
</table>

<h2>What happened</h2>

<p>Android Authority looked at the One UI 9.5 beta code and spotted references to two devices called 'origin14wifi' and 'origin16wifi'. Samsung use 'wifi' in their device codenames when the device is Wi-Fi only, so this would appear to be two laptops (one with a 14" screen and one with a 16" screen) that are Wi-Fi only. Samsung opened the One UI 9.5 beta to Galaxy S26 owners in six countries on 18 November 2026 and the report on the devices in the code was published on 19 and 20 November.</p>

<p>What sits inside the machines shows up in the code too. Back in October, a Geekbench listing appeared for at least one Origin 14 variant, running the 12-core Snapdragon X Elite X1E-80-100 alongside 16GB of RAM, and Samsung's own Video Editor source code names that same chip for both models. The code also gives the 16-inch version a touchscreen and S Pen support, which the 14-inch version lacks. From the outset, both are kitted out for office use, with device admin, work profiles and support for multiple users.</p>

<p>Notably, the code makes absolutely no reference to 'Googlebook' or 'GooglebookOS'. Samsung will likely brand the devices and the software, applying their own One UI layer on top of the Googlebook OS. Samsung aren't in the Googlebook launch partner list as it would appear they've been building their own Googlebook all along.</p>

<h2>What the Samsung Googlebook leak means</h2>

<p>The leak is the single biggest hole in the Google laptop platform. Googlebook went out with partners  Acer, ASUS, Dell, HP and Lenovo and Samsung's absence was very much the case given the Galaxy Book range and the fact that it's a Chromebook. The two Origin devices with the very obvious Snapdragon X Elite chip suggest Samsung are not  at the edges but are in fact planning a full entry which will be in the same size bracket as their Windows Galaxy Book6 Pro range.</p>

<p>If anything gives the game away, it is those office-ready features. An IT department is exactly the audience for work profiles, device admin and multi-user support, which suggests Samsung is aiming these machines at desks rather than sofas. The same commercial logic runs through our <a href="https://growentix.cloud/articles/samsung-galaxy-s27-price-rise-memory-costs-20261123">Samsung Galaxy S27 price rise</a> coverage, where rising memory costs are pushing Samsung to defend the margins on its premium hardware. More on the wider field is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>Samsung have not announced the laptops at all. There's no name, no price and no launch date. The early 2027 window is purely speculative based on the fact that One UI 9.5 is coming with the Galaxy S27 series. That's not a Samsung date in the slightest. The codenames could be completely different at launch, the two devices may well never actually go to market in that form  and there is no battery, weight or display. The S Pen support for the 16 inch device is purely a codename reference, not a feature that has been confirmed in any way.</p>

<p>Sources: <a href="https://www.gsmarena.com/samsungs_android_laptops_are_codenamed_origin_heres_what_we_know-news-75549.php">GSMArena</a> for the codenames, sizes and One UI layer; <a href="https://www.notebookcheck.net/Samsung-Origin-14-and-16-Leak-reveals-Samsung-s-next-generation-of-laptops.1454538.0.html">Notebookcheck</a> for the model numbers, chip and Geekbench entry; <a href="https://www.howtogeek.com/samsung-one-ui-95-beta-code-android-laptops/">How-To Geek</a> for the beta code findings and business features.</p>

<h2>Frequently asked questions</h2>

<h3>What are the Samsung Origin laptops?</h3>
<p>Origin 14 and Origin 16 are the codenames for Samsung's first Googlebook laptops (per the One UI 9.5 beta code) and are expected to be 14" and 16" Wi-Fi only laptops running Googlebook OS with  One UI on top.</p>

<h3>When will Samsung's Googlebooks go live?</h3>
<p>Samsung haven't given a date. The leak would suggest a launch in line with One UI 9.5 (which we'd expect to come with the Galaxy S27 range in early 2027).</p>
$$,
ARRAY['https://www.gsmarena.com/samsungs_android_laptops_are_codenamed_origin_heres_what_we_know-news-75549.php', 'https://www.notebookcheck.net/Samsung-Origin-14-and-16-Leak-reveals-Samsung-s-next-generation-of-laptops.1454538.0.html', 'https://www.howtogeek.com/samsung-one-ui-95-beta-code-android-laptops/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- tesla-ai5-chip-optimus-cars-stay-ai4-20261124 (tech-ai; Global; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'tesla-ai5-chip-optimus-cars-stay-ai4-20261124', 'tech-ai', 'Global',
'Tesla AI5 Chip Goes to Optimus as Cars Stay on AI4',
'Tesla AI5 Chip Goes to Optimus as Cars Stay on AI4',
'Musk says the Tesla AI5 chip will power the Optimus robot while Tesla cars stay on AI4, which he calls enough for driving safer than a human.',
'Musk says the Tesla AI5 chip will power the Optimus robot while Tesla cars stay on AI4, which he calls enough for driving safer than a human.',
$$<p>Elon Musk has confirmed that the Tesla AI5 chip will go in the Optimus humanoid robot, Tesla cars will stay on the  AI4 computer. He made the comment on X on 22 November, saying that AI4 is good enough for driving safer than a human so there's no point in putting the new chip in vehicles.</p>

<table>
<tr><td>Chip</td><td>AI5, Tesla's next-generation inference chip</td></tr>
<tr><td>Destination</td><td>The Optimus humanoid robot, and Tesla's AI training supercomputers</td></tr>
<tr><td>Cars</td><td>Staying on AI4 hardware, with Musk giving no date for any change</td></tr>
<tr><td>Claimed performance</td><td>About 10 to 12 times the compute of AI4, in Musk's own varying estimates</td></tr>
<tr><td>Optimus target</td><td>AI5 going into Optimus around April 2027</td></tr>
<tr><td>Production aim</td><td>Capacity to build as many as 20,000 Optimus robots a week by the end of 2027</td></tr>
</table>

<h2>What happened</h2>

<p>Musk is responding to a Tesla owner who asked when the Tesla AI5 chip is going to be in the new cars. His answer is very simple: "It's going to Optimus. Cars will remain at AI4. That's enough to solve superhuman driving." The post was published on 22 November and answers a question that owners have been asking for months. He gives absolutely no indication as to how long the cars will stay on AI4 and provides no roadmap for the upgrade of the current fleet.</p>

<p>None of this is a sudden change of direction. Back in April, Musk had already said AI5 was not urgent for vehicles and would reach Optimus and the data centres first, and on the third-quarter earnings call on 21 October he put a date on it, saying the company aimed to have AI5 inside Optimus around April 2027. The chip itself reached tape-out in April 2026, with high-volume manufacturing expected to ramp up in 2027 — TSMC in Arizona and Samsung in Texas are the named manufacturers. Tesla has also started building Optimus robots at a high-volume facility in Fremont.</p>

<p>In the same post Musk notes the AI4  now costs twice as much to build as it did previously (memory and storage costs have gone up). Tesla have also scaled back on the planned AI4.5 upgrade from 32GB of memory to 24GB because RAM is just too expensive. No figures are given and there's no link to car prices, FSD subscription prices or retrofit prices.</p>

<h2>What the Tesla AI5 chip decision means</h2>

<p>For anyone holding out for an AI5 car, the takeaway is plain: Musk is not promising one, so there is no point waiting. The timing matters, because that same weekend Tesla started rolling out Full Self-Driving V15 to a first wave of customers, ahead of a wide release expected in December. In Musk's argument, AI4 already runs the new software — the live Reality View display included — which means the car computer is not what is holding things back.</p>

<p>For Tesla's strategy the move is very much 'robot first'. The most powerful chip is being held back for Optimus which tells you that in Tesla's mind the robot is the product that requires the most compute. The car fleet is effectively a solved problem on the existing hardware. That's very much in line with the wider industry trend we've already talked about in our <a href="https://growentix.cloud/articles/openai-chip-design-jalapeno-amd-14-percent-20261123">OpenAI chip design</a> story where the AI companies are now designing the silicon around the workload rather than the device. More on that wider field  in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>On timing, Musk has said nothing about when — or even whether — any Tesla car will ever get AI5, and just as little about which cars will receive the AI4.5 or when deliveries of those will begin. Every performance figure comes from Musk himself, and the numbers keep moving: on the earnings call he put AI5 at roughly 10 times AI4, in his latest post it was about 12 times, and he has also called it about five times the useful compute of a dual AI4. No independent benchmark exists to check those claims against, and the claim that AI4 now costs twice as much to build comes with no dollar figure attached. The 20,000-a-week Optimus figure, meanwhile, is a capacity target for the end of 2027 rather than a promise of deliveries.</p>

<p>Sources: <a href="https://teslanorth.com/2026/11/22/tesla-ai4-ai5-optimus/">Tesla North</a> for Musk's X posts and the AI5-to-Optimus confirmation; <a href="https://www.techtimes.com/articles/331296/20261123/elon-musk-says-tesla-ai4-computer-costs-twice-much-memory-prices-ai5-chip-goes-optimus.htm">TechTimes</a> for the AI4 cost increase and the AI4.5 memory reduction; <a href="https://cryptobriefing.com/tesla-ai5-chip-optimus-robot-ai4-cars/">Crypto Briefing</a> for the April 2027 target, tape-out and production targets.</p>

<h2>Frequently asked questions</h2>

<h3>Will the new Teslas get the AI5 chip?</h3>
<p>Not on Musk's account. He said AI5 is going to Optimus and to Tesla's training supercomputers and that the cars will stay on AI4 with absolutely no date given for any such change.</p>

<h3>Can AI4 run the new Full Self-Driving V15 software?</h3>
<p>Yes, according to Tesla. The V15 rollout started on the 21st November for early access customers and Musk says AI4 has the compute to run it.</p>
$$,
$$<p>Elon Musk has confirmed that the Tesla AI5 chip will go in the Optimus humanoid robot, Tesla cars will stay on the  AI4 computer. He made the comment on X on 22 November, saying that AI4 is good enough for driving safer than a human so there's no point in putting the new chip in vehicles.</p>

<table>
<tr><td>Chip</td><td>AI5, Tesla's next-generation inference chip</td></tr>
<tr><td>Destination</td><td>The Optimus humanoid robot, and Tesla's AI training supercomputers</td></tr>
<tr><td>Cars</td><td>Staying on AI4 hardware, with Musk giving no date for any change</td></tr>
<tr><td>Claimed performance</td><td>About 10 to 12 times the compute of AI4, in Musk's own varying estimates</td></tr>
<tr><td>Optimus target</td><td>AI5 going into Optimus around April 2027</td></tr>
<tr><td>Production aim</td><td>Capacity to build as many as 20,000 Optimus robots a week by the end of 2027</td></tr>
</table>

<h2>What happened</h2>

<p>Musk is responding to a Tesla owner who asked when the Tesla AI5 chip is going to be in the new cars. His answer is very simple: "It's going to Optimus. Cars will remain at AI4. That's enough to solve superhuman driving." The post was published on 22 November and answers a question that owners have been asking for months. He gives absolutely no indication as to how long the cars will stay on AI4 and provides no roadmap for the upgrade of the current fleet.</p>

<p>None of this is a sudden change of direction. Back in April, Musk had already said AI5 was not urgent for vehicles and would reach Optimus and the data centres first, and on the third-quarter earnings call on 21 October he put a date on it, saying the company aimed to have AI5 inside Optimus around April 2027. The chip itself reached tape-out in April 2026, with high-volume manufacturing expected to ramp up in 2027 — TSMC in Arizona and Samsung in Texas are the named manufacturers. Tesla has also started building Optimus robots at a high-volume facility in Fremont.</p>

<p>In the same post Musk notes the AI4  now costs twice as much to build as it did previously (memory and storage costs have gone up). Tesla have also scaled back on the planned AI4.5 upgrade from 32GB of memory to 24GB because RAM is just too expensive. No figures are given and there's no link to car prices, FSD subscription prices or retrofit prices.</p>

<h2>What the Tesla AI5 chip decision means</h2>

<p>For anyone holding out for an AI5 car, the takeaway is plain: Musk is not promising one, so there is no point waiting. The timing matters, because that same weekend Tesla started rolling out Full Self-Driving V15 to a first wave of customers, ahead of a wide release expected in December. In Musk's argument, AI4 already runs the new software — the live Reality View display included — which means the car computer is not what is holding things back.</p>

<p>For Tesla's strategy the move is very much 'robot first'. The most powerful chip is being held back for Optimus which tells you that in Tesla's mind the robot is the product that requires the most compute. The car fleet is effectively a solved problem on the existing hardware. That's very much in line with the wider industry trend we've already talked about in our <a href="https://growentix.cloud/articles/openai-chip-design-jalapeno-amd-14-percent-20261123">OpenAI chip design</a> story where the AI companies are now designing the silicon around the workload rather than the device. More on that wider field  in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>On timing, Musk has said nothing about when — or even whether — any Tesla car will ever get AI5, and just as little about which cars will receive the AI4.5 or when deliveries of those will begin. Every performance figure comes from Musk himself, and the numbers keep moving: on the earnings call he put AI5 at roughly 10 times AI4, in his latest post it was about 12 times, and he has also called it about five times the useful compute of a dual AI4. No independent benchmark exists to check those claims against, and the claim that AI4 now costs twice as much to build comes with no dollar figure attached. The 20,000-a-week Optimus figure, meanwhile, is a capacity target for the end of 2027 rather than a promise of deliveries.</p>

<p>Sources: <a href="https://teslanorth.com/2026/11/22/tesla-ai4-ai5-optimus/">Tesla North</a> for Musk's X posts and the AI5-to-Optimus confirmation; <a href="https://www.techtimes.com/articles/331296/20261123/elon-musk-says-tesla-ai4-computer-costs-twice-much-memory-prices-ai5-chip-goes-optimus.htm">TechTimes</a> for the AI4 cost increase and the AI4.5 memory reduction; <a href="https://cryptobriefing.com/tesla-ai5-chip-optimus-robot-ai4-cars/">Crypto Briefing</a> for the April 2027 target, tape-out and production targets.</p>

<h2>Frequently asked questions</h2>

<h3>Will the new Teslas get the AI5 chip?</h3>
<p>Not on Musk's account. He said AI5 is going to Optimus and to Tesla's training supercomputers and that the cars will stay on AI4 with absolutely no date given for any such change.</p>

<h3>Can AI4 run the new Full Self-Driving V15 software?</h3>
<p>Yes, according to Tesla. The V15 rollout started on the 21st November for early access customers and Musk says AI4 has the compute to run it.</p>
$$,
ARRAY['https://teslanorth.com/2026/11/22/tesla-ai4-ai5-optimus/', 'https://www.techtimes.com/articles/331296/20261123/elon-musk-says-tesla-ai4-computer-costs-twice-much-memory-prices-ai5-chip-goes-optimus.htm', 'https://cryptobriefing.com/tesla-ai5-chip-optimus-robot-ai4-cars/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;

-- trump-urges-nvidia-rehire-jensen-huang-20261124 (tech-ai; USA; verifiedAt NULL)
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt", "verifiedAt", "authorName")
VALUES
(gen_random_uuid(), 'trump-urges-nvidia-rehire-jensen-huang-20261124', 'tech-ai', 'USA',
'Nvidia brings back Jensen Huang as CEO after board reversal',
'Nvidia brings back Jensen Huang as CEO after board reversal',
'Nvidia''s board has unanimously reinstated Jensen Huang as chief executive, 11 days after he resigned — and shares jumped 31% on Monday.',
'Nvidia''s board has unanimously reinstated Jensen Huang as chief executive, 11 days after he resigned — and shares jumped 31% on Monday.',
$$<p>Nvidia's board has brought Jensen Huang back. The directors voted unanimously on Monday 23 November to reinstate him as president, chief executive and board director, effective immediately — 11 days after he resigned and days after the board said it had no intention of doing so. The market's answer was instant: Nvidia shares jumped 31% on Monday, their best day since 2003.</p>

<table>
<tr><td>Development</td><td>Nvidia board reinstates Jensen Huang as president, CEO and board director</td></tr>
<tr><td>Date</td><td>23 November 2026, effective immediately</td></tr>
<tr><td>Vote</td><td>Unanimous, after discussions and meetings with Huang</td></tr>
<tr><td>Resignation</td><td>12 November 2026, after 33 years as chief executive</td></tr>
<tr><td>Interim CEO</td><td>Colette Kress returns to chief financial officer full-time</td></tr>
<tr><td>Board position before</td><td>Chairman Harvey Jones had ruled out Huang's return</td></tr>
<tr><td>Shares</td><td>Nvidia +31.5% on Monday to $165.05, about $952 billion added</td></tr>
<tr><td>Next milestone</td><td>Alice Huang's closed-door House committee appearance on 1 December</td></tr>
</table>

<h2>What happened</h2>

<p>Trump wrote on Sunday: "I hope the Board of Nvidia rehires Jensen Huang. It would be the best thing for the Company, and also, for the U.S.A." It is the latest White House intervention since Huang stepped down as chief executive this month over his affair with a tech executive linked to China's intelligence service. Huang also admitted to a second affair with a colleague at Nvidia. On Monday Trump welcomed the board's decision on Truth Social, writing that it had made "the correct and proper decision to return Jensen Huang to the position of CEO".</p>

<p>The board, for its part, has now done the opposite of what it said last week. Chairman Harvey Jones had said the company would not rehire Huang, and Heidrick and Struggles had been retained to weigh internal and external candidates for a permanent successor. <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> reported that the board said it had received input from senior levels of the United States government and was "confident that Mr. Huang's reinstatement poses no national security risk", and that it was satisfied with his candour and ability to lead. Jones said the return was "in the best interests of our stockholders, employees, partners and customers". The numbers Kress reported on 17 November were, on their face, close to flawless: record revenue of $115.8 billion, up 103 per cent on a year earlier, with data-centre sales of $107.6 billion, up 110 per cent. Even so, Nvidia shares had touched a 52-week low on 20 November, closing at $125.53, down 14 per cent on the day — before Monday's surge took them to $165.05.</p>

<p>The pressure is well and truly beyond the boardroom. The NY Times reported on 23 November that Alice Huang (the Chinese businesswoman at the heart of the whole thing) had continued to have contact with an officer of China's Ministry of State Security from spring 2025 through to fall 2026. That timeframe obviously coincided with her relationship with Jensen Huang and with Megaspeed's acquisition of substantial quantities of the latest Nvidia chips. US Director of National Intelligence Jay Clayton confirmed on 23 November that the investigations into Alice Huang and Megaspeed are still very much underway. The SEC is looking at potential accounting issues, CA AG has subpoenaed the flow of chips to China and Alice Huang is due to appear before a closed-door House committee on 1 December.</p>

<h2>What the Jensen Huang return means</h2>

<p>The reversal ends the split between the White House and Nvidia's own board in a single stroke: the president said the founder was irreplaceable, the board said the company had to move on — and then the board changed its mind. The market had already spoken before Monday, with Nvidia having lost some $905bn in market value in a single week and some $2.8tn since early October according to TipRanks figures. Monday undid a large part of that in one session: Nvidia added about $952 billion in market value, the biggest one-day gain by any US company on record, and the wider AI trade rallied with it. The wider market rallied too: the Nasdaq rose 6.5% to 24,089.56, the S&P 500 4.7% to 7,237.17 — out of correction territory — and the Dow 3.0%.</p>

<p>The bigger question is whether the chip diversion allegations are valid. The US government haven't yet determined whether Alice Huang was a spy and the SEC investigation is still in its infancy and could well end with no charges. Our <a href="https://growentix.cloud/articles/nvidia-shares-seventh-day-fall-sec-probe-20261123">Nvidia shares were down and the sell-off was tracked in real time as the SEC probe</a> coverage tracked the sell-off as it happened; the 1 December interview is now the key date. More on the wider field is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>The US administration has not yet conclusively established the allegations against Alice Huang, and the reports don't say whether Jensen Huang was aware of her contacts with Chinese intelligence. The precise focus of the SEC investigation hasn't been established and the WSJ, which also reported on the investigation, can't say what it is investigating. The sources don't say how many chips (if any) were diverted to China, though some reports suggest as many as circa 240,000. The sources do not say what changed the board's mind between the earnings call and Monday, beyond the discussions with Huang and the input from senior levels of government.</p>

<p>Sources: <a href="https://www.reuters.com/business/view-nvidia-reinstates-jensen-huang-ceo-igniting-tech-surge-2026-11-23/">Reuters</a> for the market reaction, <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> and <a href="https://www.wsj.com/articles/nvidia-board-reinstates-jensen-huang-as-ceo-a6b49914">the Wall Street Journal</a> for the reinstatement and the unanimous vote; <a href="https://www.thenationalnews.com/news/us/2026/11/23/trump-calls-on-nvidia-board-to-rehire-jensen-huang-after-scandal/">The National</a> for Trump's Truth Social post; <a href="https://www.news18.com/world/alice-huang-remained-in-contact-with-china-spy-agency-during-affair-with-jensen-huang-nvidia-scandal-ws-l-10436638.html">News18</a> for the New York Times report on Alice Huang and the SEC probe; <a href="https://www.tribuneindia.com/news/usa-news/us-intelligence-chief-confirms-investigations-into-alice-huang-megaspeed-amid-nvidia-controversy/">The Tribune</a> for the Director of National Intelligence confirming the investigations.</p>

<h2>Frequently asked questions</h2>

<h3>Will Nvidia rehire Jensen Huang?</h3>
<p>It already has. The board voted unanimously on Monday 23 November to reinstate him as president, chief executive and board director, effective immediately.</p>

<h3>What is the SEC investigating at Nvidia?</h3>
<p>The SEC is examining potential accounting issues, according to the New York Times, citing people briefed on the confidential investigation. The probe is in its early stages, and its precise focus has not been established.</p>
$$,
$$<p>Nvidia's board has brought Jensen Huang back. The directors voted unanimously on Monday 23 November to reinstate him as president, chief executive and board director, effective immediately — 11 days after he resigned and days after the board said it had no intention of doing so. The market's answer was instant: Nvidia shares jumped 31% on Monday, their best day since 2003.</p>

<table>
<tr><td>Development</td><td>Nvidia board reinstates Jensen Huang as president, CEO and board director</td></tr>
<tr><td>Date</td><td>23 November 2026, effective immediately</td></tr>
<tr><td>Vote</td><td>Unanimous, after discussions and meetings with Huang</td></tr>
<tr><td>Resignation</td><td>12 November 2026, after 33 years as chief executive</td></tr>
<tr><td>Interim CEO</td><td>Colette Kress returns to chief financial officer full-time</td></tr>
<tr><td>Board position before</td><td>Chairman Harvey Jones had ruled out Huang's return</td></tr>
<tr><td>Shares</td><td>Nvidia +31.5% on Monday to $165.05, about $952 billion added</td></tr>
<tr><td>Next milestone</td><td>Alice Huang's closed-door House committee appearance on 1 December</td></tr>
</table>

<h2>What happened</h2>

<p>Trump wrote on Sunday: "I hope the Board of Nvidia rehires Jensen Huang. It would be the best thing for the Company, and also, for the U.S.A." It is the latest White House intervention since Huang stepped down as chief executive this month over his affair with a tech executive linked to China's intelligence service. Huang also admitted to a second affair with a colleague at Nvidia. On Monday Trump welcomed the board's decision on Truth Social, writing that it had made "the correct and proper decision to return Jensen Huang to the position of CEO".</p>

<p>The board, for its part, has now done the opposite of what it said last week. Chairman Harvey Jones had said the company would not rehire Huang, and Heidrick and Struggles had been retained to weigh internal and external candidates for a permanent successor. <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> reported that the board said it had received input from senior levels of the United States government and was "confident that Mr. Huang's reinstatement poses no national security risk", and that it was satisfied with his candour and ability to lead. Jones said the return was "in the best interests of our stockholders, employees, partners and customers". The numbers Kress reported on 17 November were, on their face, close to flawless: record revenue of $115.8 billion, up 103 per cent on a year earlier, with data-centre sales of $107.6 billion, up 110 per cent. Even so, Nvidia shares had touched a 52-week low on 20 November, closing at $125.53, down 14 per cent on the day — before Monday's surge took them to $165.05.</p>

<p>The pressure is well and truly beyond the boardroom. The NY Times reported on 23 November that Alice Huang (the Chinese businesswoman at the heart of the whole thing) had continued to have contact with an officer of China's Ministry of State Security from spring 2025 through to fall 2026. That timeframe obviously coincided with her relationship with Jensen Huang and with Megaspeed's acquisition of substantial quantities of the latest Nvidia chips. US Director of National Intelligence Jay Clayton confirmed on 23 November that the investigations into Alice Huang and Megaspeed are still very much underway. The SEC is looking at potential accounting issues, CA AG has subpoenaed the flow of chips to China and Alice Huang is due to appear before a closed-door House committee on 1 December.</p>

<h2>What the Jensen Huang return means</h2>

<p>The reversal ends the split between the White House and Nvidia's own board in a single stroke: the president said the founder was irreplaceable, the board said the company had to move on — and then the board changed its mind. The market had already spoken before Monday, with Nvidia having lost some $905bn in market value in a single week and some $2.8tn since early October according to TipRanks figures. Monday undid a large part of that in one session: Nvidia added about $952 billion in market value, the biggest one-day gain by any US company on record, and the wider AI trade rallied with it. The wider market rallied too: the Nasdaq rose 6.5% to 24,089.56, the S&P 500 4.7% to 7,237.17 — out of correction territory — and the Dow 3.0%.</p>

<p>The bigger question is whether the chip diversion allegations are valid. The US government haven't yet determined whether Alice Huang was a spy and the SEC investigation is still in its infancy and could well end with no charges. Our <a href="https://growentix.cloud/articles/nvidia-shares-seventh-day-fall-sec-probe-20261123">Nvidia shares were down and the sell-off was tracked in real time as the SEC probe</a> coverage tracked the sell-off as it happened; the 1 December interview is now the key date. More on the wider field is in our <a href="https://growentix.cloud/tech-ai">Tech news</a> section.</p>

<h2>What the sources do not say</h2>

<p>The US administration has not yet conclusively established the allegations against Alice Huang, and the reports don't say whether Jensen Huang was aware of her contacts with Chinese intelligence. The precise focus of the SEC investigation hasn't been established and the WSJ, which also reported on the investigation, can't say what it is investigating. The sources don't say how many chips (if any) were diverted to China, though some reports suggest as many as circa 240,000. The sources do not say what changed the board's mind between the earnings call and Monday, beyond the discussions with Huang and the input from senior levels of government.</p>

<p>Sources: <a href="https://www.reuters.com/business/view-nvidia-reinstates-jensen-huang-ceo-igniting-tech-surge-2026-11-23/">Reuters</a> for the market reaction, <a href="https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta">CNN</a> and <a href="https://www.wsj.com/articles/nvidia-board-reinstates-jensen-huang-as-ceo-a6b49914">the Wall Street Journal</a> for the reinstatement and the unanimous vote; <a href="https://www.thenationalnews.com/news/us/2026/11/23/trump-calls-on-nvidia-board-to-rehire-jensen-huang-after-scandal/">The National</a> for Trump's Truth Social post; <a href="https://www.news18.com/world/alice-huang-remained-in-contact-with-china-spy-agency-during-affair-with-jensen-huang-nvidia-scandal-ws-l-10436638.html">News18</a> for the New York Times report on Alice Huang and the SEC probe; <a href="https://www.tribuneindia.com/news/usa-news/us-intelligence-chief-confirms-investigations-into-alice-huang-megaspeed-amid-nvidia-controversy/">The Tribune</a> for the Director of National Intelligence confirming the investigations.</p>

<h2>Frequently asked questions</h2>

<h3>Will Nvidia rehire Jensen Huang?</h3>
<p>It already has. The board voted unanimously on Monday 23 November to reinstate him as president, chief executive and board director, effective immediately.</p>

<h3>What is the SEC investigating at Nvidia?</h3>
<p>The SEC is examining potential accounting issues, according to the New York Times, citing people briefed on the confidential investigation. The probe is in its early stages, and its precise focus has not been established.</p>
$$,
ARRAY['https://www.reuters.com/business/view-nvidia-reinstates-jensen-huang-ceo-igniting-tech-surge-2026-11-23/', 'https://www.aljazeera.com/economy/2026/11/23/nvidia-board-reinstates-jensen-huang-as-ceo', 'https://www.cnn.com/2026/11/23/tech/nvidia-reinstates-jensen-huang-ceo?cid=external-feeds_iluminar_meta', 'https://www.wsj.com/articles/nvidia-board-reinstates-jensen-huang-as-ceo-a6b49914', 'https://www.thenationalnews.com/news/us/2026/11/23/trump-calls-on-nvidia-board-to-rehire-jensen-huang-after-scandal/', 'https://www.news18.com/world/alice-huang-remained-in-contact-with-china-spy-agency-during-affair-with-jensen-huang-nvidia-scandal-ws-l-10436638.html', 'https://www.tribuneindia.com/news/usa-news/us-intelligence-chief-confirms-investigations-into-alice-huang-megaspeed-amid-nvidia-controversy/'], NOW(), NOW(), NOW(), NULL, NULL) ON CONFLICT ("slug") DO NOTHING;
