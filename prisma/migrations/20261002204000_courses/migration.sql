-- Course marketplace: instructor accounts, courses, videos, reviews, purchases
CREATE TYPE "InstructorTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD');
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED');
CREATE TYPE "ReviewSentiment" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED');

ALTER TYPE "Role" ADD VALUE 'INSTRUCTOR';

CREATE TABLE "InstructorProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "bio" TEXT,
  "expertise" TEXT,
  "tier" "InstructorTier" NOT NULL DEFAULT 'BRONZE',
  "isPaid" BOOLEAN NOT NULL DEFAULT false,
  "paidAt" TIMESTAMP(3),
  "planName" TEXT,
  "isVerified" BOOLEAN NOT NULL DEFAULT false,
  "autoVerifyAt" INTEGER NOT NULL DEFAULT 25,
  "totalViews" INTEGER NOT NULL DEFAULT 0,
  "totalSales" INTEGER NOT NULL DEFAULT 0,
  "positiveReviews" INTEGER NOT NULL DEFAULT 0,
  "totalReviews" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "InstructorProfile_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "InstructorProfile_userId_key" ON "InstructorProfile"("userId");

CREATE TABLE "Course" (
  "id" TEXT NOT NULL,
  "instructorId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" INTEGER NOT NULL DEFAULT 0,
  "thumbnailUrl" TEXT,
  "category" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
  "views" INTEGER NOT NULL DEFAULT 0,
  "sales" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
CREATE INDEX "Course_instructorId_status_idx" ON "Course"("instructorId", "status");
CREATE INDEX "Course_status_featured_idx" ON "Course"("status", "featured");

CREATE TABLE "CourseVideo" (
  "id" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "fileId" TEXT,
  "durationSec" INTEGER,
  "position" INTEGER NOT NULL DEFAULT 0,
  "views" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CourseVideo_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CourseVideo_courseId_position_idx" ON "CourseVideo"("courseId", "position");

CREATE TABLE "CourseReview" (
  "id" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "studentId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "text" TEXT,
  "sentiment" "ReviewSentiment" NOT NULL DEFAULT 'NEUTRAL',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CourseReview_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "CourseReview_courseId_studentId_key" ON "CourseReview"("courseId", "studentId");
CREATE INDEX "CourseReview_courseId_createdAt_idx" ON "CourseReview"("courseId", "createdAt");

CREATE TABLE "CoursePurchase" (
  "id" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "studentId" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CoursePurchase_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "CoursePurchase_courseId_studentId_key" ON "CoursePurchase"("courseId", "studentId");
CREATE INDEX "CoursePurchase_courseId_status_idx" ON "CoursePurchase"("courseId", "status");

ALTER TABLE "InstructorProfile" ADD CONSTRAINT "InstructorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "InstructorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CourseVideo" ADD CONSTRAINT "CourseVideo_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CourseVideo" ADD CONSTRAINT "CourseVideo_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CourseReview" ADD CONSTRAINT "CourseReview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CourseReview" ADD CONSTRAINT "CourseReview_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CoursePurchase" ADD CONSTRAINT "CoursePurchase_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CoursePurchase" ADD CONSTRAINT "CoursePurchase_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
