-- Delete the end-to-end test employer application created while verifying
-- the onboarding build live (Growentix Test Traders, test email
-- hongtunekong+growentix-test@gmail.com). Never a real company.
-- The User delete cascades to its Company, CompanyVerification and
-- Session rows (all onDelete: Cascade). The admin notification row
-- references the admin user, so it is deleted explicitly.

DELETE FROM "Notification" WHERE "title" = 'New employer application: Growentix Test Traders';
DELETE FROM "User" WHERE "email" = 'hongtunekong+growentix-test@gmail.com';
