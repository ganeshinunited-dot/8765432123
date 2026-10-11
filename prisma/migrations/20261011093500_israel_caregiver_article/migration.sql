-- Publish Israel caregiver deadline article (1,464 posts, deadline 2026-10-12).
-- Requested by the site owner 2026-10-11 ("Gara - publish gara").
-- Idempotent: re-running will not duplicate the article.
INSERT INTO "Article" ("id", "slug", "category", "country", "titleEn", "titleNe", "excerptEn", "excerptNe", "bodyEn", "bodyNe", "sources", "publishedAt", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'israel-caregiver-deadline-oct-12-1464-jobs',
  'work-abroad',
  'Israel',
  'Israel Caregiver Jobs in Nepal: 1 Day Left to Apply for 1,464 Posts',
  'इजरायल केयरगिभर भर्ना: १,४६४ पदका लागि आवेदन दिन अब १ दिन मात्र बाँकी',
  'The Department of Foreign Employment is hiring 1,464 Nepali caregivers (1,132 women, 332 men) for long-term care centres in Israel. Online applications close on 12 October 2026 at 11:59 pm — here is who can apply and how.',
  'इजरायलका दीर्घकालीन हेरचाह केन्द्रहरूमा काम गर्ने १,४६४ नेपाली केयरगिभर (१,१३२ महिला, ३३२ पुरुष) भर्नाका लागि वैदेशिक रोजगार विभागले आवेदन मागेको छ। अनलाइन आवेदन अक्टोबर १२ राति ११:५९ बजे सकिँदैछ — कसले कसरी आवेदन दिने, यहाँ छ।',
  '<p>If you are searching for Israel caregiver jobs, Nepal''s biggest government-to-government opening of the year is closing fast. The Department of Foreign Employment has invited applications from Nepali citizens for <strong>1,464 caregiver (auxiliary worker) positions</strong> in Israel''s long-term care centres — 1,132 reserved for women and 332 for men. Applications close on <strong>12 October 2026 at 11:59 pm</strong>, and the whole process runs through the official online portal only.</p>
<h2>Who can apply for these Israel caregiver jobs</h2>
<p>Applicants must be between 25 and 45 years old, at least 1.5 metres tall and weigh at least 45 kilograms. On education, you qualify if you have completed Class 10 plus a 15-month ANM or CMA course, or Class 12 plus at least three months of caregiver training from a recognised institution. You must not have worked in Israel before, and you must not have immediate family members currently employed there.</p>
<p>Every applicant takes an English language test (Reading A2, Writing A1, Speaking B1, Listening A2 on the Cambridge Upskill test). Final selection is by lottery, conducted by Israel''s Population and Immigration Authority.</p>
<h2>Salary, hours and costs</h2>
<p>The bilateral agreement guarantees a minimum monthly salary of 5,881 Israeli shekels — roughly NPR 2.5 lakh — with the department''s notice listing 6,443.85 shekels as the monthly figure and overtime paid under Israeli regulations. The standard week is 42 hours with one weekly day off, plus annual leave under Israeli law.</p>
<p>Applicants cover their own costs: the English test (NPR 5,000), a medical examination (up to NPR 9,500), health insurance (NPR 3,708–4,931), pre-departure orientation (NPR 700), the welfare fund contribution (NPR 1,500) and a one-way airfare at market rates.</p>
<h2>How to apply before the deadline</h2>
<p>Apply only at <strong>ferms.dofe.gov.np</strong> — this is a government-to-government recruitment, so no agent or manpower company is involved. You will need your passport, a police clearance certificate, your English test certificate, academic and training certificates, a signed confidentiality waiver and a self-declaration on height, weight and caregiver training.</p>
<p>A warning worth heeding: the department recently cancelled hundreds of Israel caregiver applications over fake certificates. Submit only genuine documents — forged paperwork means cancellation and legal action.</p>
<p>The deadline is tomorrow night, right as Dashain begins — apply today before the festival rush takes over your week.</p>',
  '<p>यस वर्षको सबैभन्दा ठूलो सरकार-सरकार रोजगारीको अवसरमा आवेदन दिन अब १ दिन मात्र बाँकी छ। वैदेशिक रोजगार विभागले इजरायलका दीर्घकालीन हेरचाह केन्द्रहरूमा केयरगिभर (सहायक कार्यकर्ता) का <strong>१,४६४ पद</strong>मा नेपाली नागरिकबाट आवेदन मागेको छ — जसमा १,१३२ पद महिलाका लागि र ३३२ पद पुरुषका लागि छुट्याइएको छ। आवेदन <strong>अक्टोबर १२, २०२६ राति ११:५९ बजे</strong> सकिँदैछ, र सम्पूर्ण प्रक्रिया सरकारी अनलाइन पोर्टलबाट मात्र हुन्छ।</p>
<h2>कसले आवेदन दिन सक्छ</h2>
<p>आवेदकको उमेर २५ देखि ४५ वर्षबीच हुनुपर्छ, उचाइ कम्तीमा १.५ मिटर र तौल कम्तीमा ४५ केजी हुनुपर्छ। शैक्षिक योग्यताका हिसाबले कक्षा १० उत्तीर्ण गरी १५ महिने एएनएम वा सीएमए कोर्स पूरा गरेको, वा कक्षा १२ उत्तीर्ण गरी मान्यताप्राप्त संस्थाबाट कम्तीमा ३ महिने केयरगिभर तालिम लिएको हुनुपर्छ। यसअघि इजरायलमा काम नगरेको र हाल इजरायलमा नजिकको परिवारका सदस्य कार्यरत नभएको हुनुपर्छ।</p>
<p>सबै आवेदकले अङ्ग्रेजी भाषा परीक्षा दिनुपर्छ (क्याम्ब्रिज अपस्किल परीक्षा: पढाइ A2, लेखाइ A1, बोलाइ B1, सुनाइ A2)। अन्तिम छनोट इजरायलको जनसंख्या तथा अध्यागमन प्राधिकरण (PIBA) ले चिठ्ठामार्फत गर्नेछ।</p>
<h2>तलब, कामका घण्टा र खर्च</h2>
<p>द्विपक्षीय सम्झौताअनुसार न्यूनतम मासिक तलब ५,८८१ इजरायली शेकेल (करिब २ लाख ५० हजार रुपैयाँ) तोकिएको छ — विभागको सूचनामा मासिक ६,४४३.८५ शेकेल उल्लेख छ र इजरायली नियमअनुसार ओभरटाइम सुविधा पनि पाइनेछ। साप्ताहिक काम ४२ घण्टा, हप्तामा एक दिन बिदा र इजरायली कानुनअनुसार वार्षिक बिदा पाइनेछ।</p>
<p>आवेदकले आफ्नै खर्च बेहोर्नुपर्छ: अङ्ग्रेजी परीक्षा (५,००० रुपैयाँ), स्वास्थ्य परीक्षण (अधिकतम ९,५०० रुपैयाँ), स्वास्थ्य बीमा (३,७०८–४,९३१ रुपैयाँ), प्रस्थानपूर्व अभिमुखीकरण (७०० रुपैयाँ), कल्याणकारी कोष (१,५०० रुपैयाँ) र एकतर्फी हवाई टिकट बजार दरअनुसार।</p>
<h2>म्याद सकिनुअघि कसरी आवेदन दिने</h2>
<p>आवेदन <strong>ferms.dofe.gov.np</strong> बाट मात्र दिनुहोस् — यो सरकार-सरकार (G2G) भर्ना हो, त्यसैले कुनै एजेन्ट वा म्यानपावर कम्पनी संलग्न हुँदैन। राहदानी, प्रहरी चारित्रिक प्रमाणपत्र, अङ्ग्रेजी परीक्षा प्रमाणपत्र, शैक्षिक तथा तालिमका प्रमाणपत्र, हस्ताक्षरित गोपनीयता प्रतिबद्धता र उचाइ, तौल तथा केयरगिभर तालिमसम्बन्धी स्वघोषणा चाहिन्छ।</p>
<p>एउटा चेतावनी: विभागले भर्खरै नक्कली प्रमाणपत्रका कारण इजरायल केयरगिभरका सयौँ आवेदन रद्द गरेको थियो। सक्कली कागजात मात्र बुझाउनुहोस् — नक्कली कागजात भए आवेदन रद्द भई कानुनी कारबाही हुन्छ।</p>
<p>म्याद भोलि राति सकिँदैछ, दसैँ सुरु हुनै लाग्दा — चाडपर्वको व्यस्तताअघि आजै आवेदन दिनुहोस्।</p>',
  ARRAY['https://english.onlinekhabar.com/israel-opens-applications-for-1464-nepali-care-workers.html','https://english.nepalnews.com/s/diplomacy/israel-calls-for-1464-nepali-workers-for-care-centers/','https://sajhajobs.com/post_detail/israel-opens-1464-caregiver-jobs-for-nepalis-monthly-salary-3-lakh-plus','https://kathmandupost.com/national/2026/09/19/fees-keep-nepal-israel-farm-care-worker-deals-on-hold']::text[],
  NOW(), NOW(), NOW()
)
ON CONFLICT ("slug") DO NOTHING;
