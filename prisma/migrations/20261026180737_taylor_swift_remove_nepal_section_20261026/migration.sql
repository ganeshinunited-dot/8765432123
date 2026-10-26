-- Taylor Swift debut-20 article: remove the Nepal-angle section.
-- User direction 2026-10-26 evening: NO "for Nepali viewers" framing in
-- Taylor Swift content — it is entertainment news for the global/fan
-- audience. Removes the "For readers in Nepal" block (EN) and the
-- "नेपालका पाठकका लागि" block (NE) from the debut-20 article body.
-- Idempotent: re-running is a no-op once the blocks are gone.
UPDATE "Article"
SET "bodyEn" = REPLACE(REPLACE("bodyEn",
  '<h2>For readers in Nepal</h2>',
  ''),
  '<p>This is a music anniversary, and it does not change how Swift''s music is available. Nepali listeners can keep streaming the debut album as before, and the anniversary material is available through the usual online platforms. No Nepal concert or release event has been announced for the anniversary.</p>',
  ''),
  "bodyNe" = REPLACE(REPLACE("bodyNe",
  '<h2>नेपालका पाठकका लागि</h2>',
  ''),
  '<p>यो संगीत वार्षिकोत्सव हो र यसले स्विफ्टको संगीतको उपलब्धतामा परिवर्तन गर्दैन। नेपाली श्रोताहरूले डेब्यु एल्बम पहिले जस्तै स्ट्रिम गर्न सक्छन् र वार्षिकोत्सव सामग्री सामान्य अनलाइन प्लेटफर्महरूबाट उपलब्ध छ। वार्षिकोत्सवका लागि कुनै नेपाल कन्सर्ट वा रिलिज कार्यक्रम घोषणा भएको छैन।</p>',
  ''),
  "updatedAt" = NOW()
WHERE "slug" = 'taylor-swift-debut-album-turns-20-20261026';
