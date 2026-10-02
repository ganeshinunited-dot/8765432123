-- Add password reset token fields to User
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiry" TIMESTAMP(3);
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
