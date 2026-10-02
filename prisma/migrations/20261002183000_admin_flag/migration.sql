-- Admin is now a flag, not a role: staff get read + review/verify powers only,
-- while their platform role (STUDENT/EMPLOYER) stays separate.
ALTER TABLE "User" ADD COLUMN "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- Promote existing ADMIN-role accounts to the flag ...
UPDATE "User" SET "isAdmin" = true WHERE role = 'ADMIN';

-- ... and restore the platform owner's real platform role.
UPDATE "User" SET role = 'EMPLOYER' WHERE email = 'hongtunekong@gmail.com';
