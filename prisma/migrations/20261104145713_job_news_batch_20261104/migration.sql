-- Job-news batch approved by user 4 Nov 2026 evening ("Next batch ma halne").
-- OUSSSC 7,268 posts: INSERT copied VERBATIM from staged migration 20261031134900_job_news_2h_20261031
-- (push_staging_20261031_1348), verified 31 Oct 2026, re-corroborated 4 Nov 2026; same slug
-- ousssc-constable-7268-posts-20261031, so ON CONFLICT DO NOTHING blocks any duplicate if the
-- staged copy is ever pushed later. STAGED OUSSSC MIGRATION MUST BE EXCLUDED from the morning push.
-- RRB NTPC UG 1,688 posts: new article, verified 4 Nov 2026 against detailed CEN 07/2026 reporting.
-- Dedupe: live sitemap 4 Nov 2026 contains no ousssc/osssc slug and no ntpc-undergraduate slug
-- (only the graduate CEN 06/2026 article, a different drive). English only, Nepali columns empty.
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt") VALUES
(gen_random_uuid(), 'ousssc-constable-7268-posts-20261031', 'global', 'India',
'OUSSSC Recruitment 2026: 7,268 Constable, OISF and Firefighter Posts, Apply by 12 November 2026',
'',
'The Odisha Uniformed Services Staff Selection Commission has opened online applications for 7,268 posts under the Combined Uniformed Services (Below Graduate Level) Examination, 2026. Registration runs from 23 October to 12 November 2026.',
'',
$$<p>OUSSSC Recruitment 2026 has opened online applications for 7,268 posts under the Combined Uniformed Services (Below Graduate Level) Examination, 2026, run by the Odisha Uniformed Services Staff Selection Commission. Online registration began on 23 October 2026 at 5:00 pm and will continue until 12 November 2026 at 10:00 pm, with the last date for payment of the examination fee set at 13 November 2026 at 10:00 pm. The drive covers seven posts in the police and fire services of Odisha, and it is one of the largest uniformed-services recruitments announced in India in recent weeks.</p>
<p>The advertisement, numbered 01-CRE-2026/OUSSSC, covers Constable (Civil), Constable (Communication), Constable (OISF), Firefighter, Firefighting Driver, Driver PMT and Traffic Constable posts. Applications are online only through the commission's official website, ousssc.odisha.gov.in, and the notification states that there is no provision for physical submission or receipt of a hard copy of the application. Candidates should therefore ignore any person or shop offering to file a paper application on their behalf, because the commission will not accept one.</p>
<h2>At a glance</h2>
<table>
<tr><th>Conducting body</th><td>Odisha Uniformed Services Staff Selection Commission (OUSSSC)</td></tr>
<tr><th>Advertisement</th><td>01-CRE-2026/OUSSSC, Combined Uniformed Services (Below Graduate Level) Examination, 2026</td></tr>
<tr><th>Total posts</th><td>7,268</td></tr>
<tr><th>Registration window</th><td>23 October 2026 (5:00 pm) to 12 November 2026 (10:00 pm)</td></tr>
<tr><th>Fee payment last date</th><td>13 November 2026 (10:00 pm)</td></tr>
<tr><th>Examination fee</th><td>Rs 500 for candidates other than SC and ST; SC and ST candidates exempt</td></tr>
<tr><th>Apply at</th><td>ousssc.odisha.gov.in</td></tr>
<tr><th>Selection</th><td>Written examination, physical measurement and physical efficiency test, medical examination, document verification</td></tr>
</table>
<h2>OUSSSC Recruitment 2026: vacancy break-up</h2>
<table>
<tr><th>Post</th><td>Posts</td></tr>
<tr><th>Constable (Civil)</th><td>4,219</td></tr>
<tr><th>Constable (OISF)</th><td>2,212</td></tr>
<tr><th>Constable (Communication)</th><td>300</td></tr>
<tr><th>Firefighter</th><td>317</td></tr>
<tr><th>Driver PMT</th><td>154</td></tr>
<tr><th>Firefighting Driver</th><td>62</td></tr>
<tr><th>Traffic Constable</th><td>4</td></tr>
<tr><th>Total</th><td>7,268</td></tr>
</table>
<p>Constable (Civil) alone accounts for 4,219 of the 7,268 posts, and Constable (OISF) accounts for 2,212, so more than six out of every seven posts sit in those two categories. Women and transgender candidates are eligible for all notified posts except Firefighter, Firefighting Driver and Driver PMT, according to the notification coverage. The category-wise break-up for all posts together is 4,437 unreserved, 1,042 Scheduled Caste, 1,430 Scheduled Tribe and 359 SEBC posts, which sums to the same 7,268 total.</p>
<h2>Who can apply: age and qualification</h2>
<p>The age limits are calculated as on 1 January 2026 and vary by post. Constable (Civil) allows 18 to 26 years, Constable (Communication), Constable (OISF) and Driver PMT allow 18 to 23 years, Firefighter and Firefighting Driver allow 18 to 25 years, and Traffic Constable allows 21 to 32 years. Age relaxation applies for reserved categories and women candidates under the rules, and the exact relaxation for each category is set out in the notification, so applicants should check that table rather than assuming a single figure.</p>
<p>The educational bar also varies by post, and it is lower than many applicants expect. Constable (Civil), Firefighter, Firefighting Driver and Traffic Constable require a Higher Secondary (+2) pass from the Council of Higher Secondary Education, Odisha, or an equivalent recognised board or council. Constable (Communication) requires +2 in Science with Physics and one of Chemistry, Mathematics, Electronics, Statistics, Computer Science or Information Technology, or a three-year engineering diploma approved by the state technical education council or the All India Council for Technical Education. Constable (OISF) and Driver PMT require only matriculation, the High School Certificate examination or its equivalent. Candidates must also meet the post-wise physical standards and, for the driving posts, the driving licence conditions in the notification, which the commission said form part of eligibility.</p>
<h2>Fee, exam pattern and selection</h2>
<p>Under the Odisha Payment of Recruitment Examination Fees and Refund Rules, 2025, candidates other than Scheduled Caste and Scheduled Tribe candidates must pay an examination fee of Rs 500 through net banking, credit card, debit card or UPI during submission of the online application. Scheduled Caste and Scheduled Tribe candidates are exempt from the fee. The commission said the fee will be refunded to candidates who appear in the written examination, which is a point applicants should note when they read the fee rule in full.</p>
<p>The common written examination carries 100 marks across 100 multiple-choice questions, to be answered in 120 minutes, at Higher Secondary or Class 10 standard depending on the post, with 0.25 marks deducted for each wrong answer. The subjects are Odia language, English language, general knowledge, quantitative aptitude and reasoning, and basic computer literacy. Only candidates shortlisted from the written examination will be called for physical measurement and the physical efficiency test, followed by medical examination and document and certificate verification. The date, time and venue of the written examination will be given on the admit card, and candidates whose applications are found valid will be informed by SMS on their registered mobile number and by email to download their admit cards.</p>
<h2>How to apply</h2>
<p>First, open ousssc.odisha.gov.in and read the full notification for Advertisement 01-CRE-2026/OUSSSC, including the post-wise age, qualification and physical standard tables. Second, choose the post that matches your qualification and age, and check whether you meet the physical and licence conditions for that post. Third, register and fill in the form online, pay the Rs 500 fee if it applies to your category, and submit before 12 November 2026 at 10:00 pm, completing the fee payment by 13 November 2026 at 10:00 pm. Fourth, keep the registration number and a copy of the submitted form, and visit the commission's website regularly for admit card and examination updates, because the commission said further updates will be posted there.</p>
<p>Two cautions apply. Applicants from outside Odisha should read the domicile conditions in the notification before applying, because this is a state recruitment. And no agent can secure a post: the selection runs through the written examination and the physical stages, and any demand for money beyond the official Rs 500 fee, or any promise of selection in exchange for payment, is a scam flag. Apply only through the commission's official website, and never hand original certificates to a stranger.</p>
<h2>Why this drive matters</h2>
<p>A single examination offering 7,268 uniformed posts, with entry at matriculation or +2 level, is rare, and the window is short: registration closes on 12 November 2026, less than three weeks after it opened. The scale also means competition will be heavy, especially for Constable (Civil), where the largest number of applicants is expected. Applicants who prepare for the written paper now, rather than waiting for the admit card, will have the advantage, because the syllabus is fixed and the negative marking punishes guessing. For readers tracking other large Indian drives, the <a href="https://growentix.cloud/articles/rrb-ntpc-graduate-3548-posts-20261027">RRB NTPC graduate recruitment for 3,548 posts</a> and the <a href="https://growentix.cloud/articles/dpsa-vacancies-circular-39-2026-20261030">DPSA Circular 39 vacancies</a> are also open, each with its own deadline and eligibility rules.</p>
<p><small>Sources: Odisha Uniformed Services Staff Selection Commission, Advertisement 01-CRE-2026/OUSSSC, Combined Uniformed Services (Below Graduate Level) Examination, 2026, as reported by <a href="https://kalingatv.com/odisha/ousssc-recruitment-2026-online-applications-for-7268-posts-begins-check-details/">Kalinga TV</a>, <a href="https://argusenglish.in/odisha/odisha-govt-invites-applications-for-7268-constable-oisf-and-firefighter-posts-apply-by-november-12">Argus English</a> and <a href="https://www.ndtv.com/education/ousssc-recruitment-2026-begins-for-7-268-posts-check-application-details-12232767/amp/1">NDTV</a>; official website <a href="https://ousssc.odisha.gov.in">ousssc.odisha.gov.in</a>.</small></p>
$$, 
'',
ARRAY['https://kalingatv.com/odisha/ousssc-recruitment-2026-online-applications-for-7268-posts-begins-check-details/', 'https://argusenglish.in/odisha/odisha-govt-invites-applications-for-7268-constable-oisf-and-firefighter-posts-apply-by-november-12', 'https://www.ndtv.com/education/ousssc-recruitment-2026-begins-for-7-268-posts-check-application-details-12232767/amp/1', 'https://ousssc.odisha.gov.in'],
NOW(), NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt") VALUES
(gen_random_uuid(), 'rrb-ntpc-undergraduate-1688-posts-20261104', 'global', 'India',
'RRB NTPC Undergraduate Recruitment 2026: 1,688 Posts, Apply by 13 November 2026',
'' ,
'The Railway Recruitment Boards have opened online applications for 1,688 posts under CEN 07/2026 for Class 12 pass candidates. Applications run from 15 October to 13 November 2026.',
'' ,
$$<p>The Railway Recruitment Boards have opened online applications for 1,688 Non-Technical Popular Categories (Undergraduate) posts under Centralised Employment Notification (CEN) No. 07/2026, and the window closes on 13 November 2026 at 11:59 pm. RRB NTPC Undergraduate Recruitment 2026 is open to candidates who have passed Class 12, and applications are accepted online only through rrbapply.gov.in. The posts are spread across 21 Railway Recruitment Boards, and each applicant may apply to only one board, so the choice of board matters as much as the choice of post.</p>
<p>The four posts are Commercial cum Ticket Clerk (700), Junior Clerk cum Typist (600), Accounts Clerk cum Typist (200) and Trains Clerk (188). The detailed notice, published on 15 October 2026, runs to 57 pages and sets out the post-wise and board-wise vacancies, the fee rules and the examination pattern, and the boards said the vacancy figures are provisional.</p>
<h2>At a glance</h2>
<table>
<tr><th>Conducting body</th><td>Railway Recruitment Boards (RRBs), Ministry of Railways</td></tr>
<tr><th>Notification</th><td>CEN No. 07/2026, NTPC (Undergraduate)</td></tr>
<tr><th>Total posts</th><td>1,688 (provisional, across 21 RRBs)</td></tr>
<tr><th>Application window</th><td>15 October 2026 to 13 November 2026 (11:59 pm)</td></tr>
<tr><th>Fee payment last date</th><td>15 November 2026 (for a submitted application)</td></tr>
<tr><th>Correction window</th><td>16 to 25 November 2026 (Rs 250 per correction)</td></tr>
<tr><th>Qualification</th><td>Class 12 pass with 50% marks (exceptions below)</td></tr>
<tr><th>Age limit</th><td>18 to 30 years as on 1 January 2027</td></tr>
<tr><th>Pay</th><td>Level 2 (Rs 19,900) and Level 3 (Rs 21,700), 7th CPC</td></tr>
<tr><th>Selection</th><td>CBT 1, CBT 2, document verification, medical examination</td></tr>
<tr><th>Apply at</th><td>rrbapply.gov.in</td></tr>
</table>
<h2>RRB NTPC Undergraduate Recruitment 2026: vacancy break-up</h2>
<table>
<tr><th>Post</th><td>Pay level</td><td>Starting basic pay</td><td>Medical standard</td><td>Posts</td></tr>
<tr><th>Commercial cum Ticket Clerk</th><td>Level 3</td><td>Rs 21,700</td><td>B2</td><td>700</td></tr>
<tr><th>Junior Clerk cum Typist</th><td>Level 2</td><td>Rs 19,900</td><td>C2</td><td>600</td></tr>
<tr><th>Accounts Clerk cum Typist</th><td>Level 2</td><td>Rs 19,900</td><td>C2</td><td>200</td></tr>
<tr><th>Trains Clerk</th><td>Level 2</td><td>Rs 19,900</td><td>A3</td><td>188</td></tr>
<tr><th>Total</th><td></td><td></td><td></td><td>1,688</td></tr>
</table>
<p>The category break-up is 686 unreserved, 414 OBC-NCL, 258 Scheduled Caste, 167 Scheduled Tribe and 163 EWS posts, with 162 posts reserved for ex-servicemen within those figures. Kolkata has the most posts at 329 and Muzaffarpur only 7, all Commercial cum Ticket Clerk. Not every board has all four posts, so read Annexure B of the detailed notice for your board before choosing.</p>
<h2>Who can apply: qualification, age and medical standards</h2>
<p>All four posts need Class 12 (10+2) or equivalent with at least 50% marks in aggregate, and the result must be in hand by 13 November 2026. The 50% rule does not apply to Scheduled Caste, Scheduled Tribe, PwBD and ex-servicemen candidates, or to candidates holding a higher qualification such as a degree. Graduates may apply under this notification and the separate graduate notification, CEN 06/2026.</p>
<p>The age limit is 18 to 30 years as on 1 January 2027. For unreserved and EWS candidates that means a date of birth between 2 January 1997 and 1 January 2009. OBC-NCL candidates get three extra years, Scheduled Caste and Scheduled Tribe candidates get five, with further relaxations for PwBD candidates, ex-servicemen, widowed, divorced or judicially separated women who have not remarried, and serving railway staff. Check the nationality and other eligibility conditions in the detailed notice before applying.</p>
<p>Medical standards differ by post and can decide the outcome after the written stages. Trains Clerk needs A3, the strictest of the three standards, covering distant, colour, binocular, night and myopic vision tests, and the boards said a candidate who fails the medical for the opted post will not be offered another post. Commercial cum Ticket Clerk needs B2 and the two clerk-cum-typist posts need C2. Trains Clerk applicants who have had LASIK surgery must give a separate self-declaration.</p>
<h2>Fee, refund and correction window</h2>
<p>The fee is Rs 500 for General, OBC and EWS candidates, of which Rs 400 is refunded after appearing in CBT 1. Scheduled Caste, Scheduled Tribe, women, ex-servicemen, PwBD, transgender, minority and EBC candidates pay Rs 250, refunded in full after CBT 1 minus bank charges, and only to candidates who actually sit CBT 1. The fee for a submitted application is payable until 15 November 2026, and a correction window runs from 16 to 25 November 2026 at Rs 250 per correction, though account details and the chosen board cannot be changed.</p>
<h2>Exam pattern and selection</h2>
<p>Selection runs through CBT 1, CBT 2, document verification and a medical examination. CBT 1 screens candidates with 100 questions in 90 minutes: 40 on general awareness, 30 on mathematics and 30 on general intelligence and reasoning. CBT 2 carries 120 questions in 90 minutes: 50 on general awareness, 35 on mathematics and 35 on reasoning. Both papers deduct one-third of a mark per wrong answer. CBT 1 shortlists 15 times the vacancies, category-wise per board, and the CBT 2 score decides the rank, with candidates equal to the number of vacancies going to document verification. Minimum qualifying marks are 40% for unreserved and EWS candidates, 30% for OBC and Scheduled Caste, and 25% for Scheduled Tribe.</p>
<p>One change from the last undergraduate cycle: CEN 07/2026 has dispensed with the typing skill test for the two clerk-cum-typist posts. The boards said typing proficiency will still be checked after joining, and weak typing can delay confirmation. The CBT 1 date has not been announced yet; the boards said dates will be posted on the official RRB websites, with exam city intimation about 10 days beforehand and the e-call letter about 4 days before.</p>
<h2>How to apply</h2>
<p>First, fix the Aadhaar record: the name and date of birth in Aadhaar must match the Class 10 certificate exactly; corrections can take a week or more. Second, go to rrbapply.gov.in, create an account or log in with an earlier RRB account, and verify identity with Aadhaar or DigiLocker. Third, choose one board and rank the posts and zones, leaving out no post of interest: an omitted post counts as not interested, and preferences cannot be changed later. Fourth, take the live photograph, upload the scanned documents, pay the fee online by 15 November 2026, and save the confirmation page.</p>
<p>Two warnings matter. Never submit more than one form: multiple applications, even to the same board, lead to all of them being rejected and can lead to debarment from future RRB examinations. And no agent can secure a post: selection runs through the two computer-based tests, document verification and the medical examination, so any demand for money beyond the official fee is a scam flag. Apply only through rrbapply.gov.in, and never hand original certificates to a stranger.</p>
<h2>Why this drive matters</h2>
<p>With 1,688 posts for Class 12 pass candidates and a fee mostly refunded after CBT 1, RRB NTPC Undergraduate Recruitment 2026 is one of the most accessible railway recruitments of the year, but competition will be hard: the last undergraduate cycle had 3,445 posts, more than double this one, and some boards hold only a handful of seats in a given category. For readers tracking other large Indian drives, the <a href="https://growentix.cloud/articles/rrb-ntpc-graduate-3548-posts-20261027">RRB NTPC graduate recruitment for 3,548 posts</a> closes on 6 November 2026, and the <a href="https://growentix.cloud/articles/dpsa-vacancies-circular-39-2026-20261030">DPSA Circular 39 vacancies</a> remain a separate option, each with its own deadline and eligibility rules.</p>
<p><small>Sources: Railway Recruitment Boards, Centralised Employment Notification CEN 07/2026 (detailed notice, 15 October 2026), applications via <a href="https://rrbapply.gov.in">rrbapply.gov.in</a> and the unified official RRB website <a href="https://rrb.indianrailways.gov.in/">rrb.indianrailways.gov.in</a>, as reported by <a href="https://dishalu.in/rrb-ntpc-undergraduate-recruitment-2026">Dishalu</a> and <a href="https://www.sahisarkarijobs.in/job/rrb-ntpc-ug-recruitment-2026/">Sahi Sarkari Jobs</a>.</small></p>$$, 
'' ,
ARRAY['https://rrbapply.gov.in', 'https://rrb.indianrailways.gov.in/', 'https://dishalu.in/rrb-ntpc-undergraduate-recruitment-2026', 'https://www.sahisarkarijobs.in/job/rrb-ntpc-ug-recruitment-2026/'],
NOW(), NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
