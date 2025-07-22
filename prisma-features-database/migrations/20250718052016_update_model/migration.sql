/*
  Warnings:

  - The `level` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `guardian` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,orgId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentCourseId,status,changedAt]` on the table `CourseStatusLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,orgId]` on the table `LessonBook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,courseId,type,forMonth,orgId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,orgId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,teacherId,dayOfWeek,startTime,orgId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rollNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,orgId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scheduleId,studentId]` on the table `StudentSchedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,orgId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `CourseStatusLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CourseStatusLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `LessonBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `LessonProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LessonProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfWeek` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `StudentSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- DropIndex
DROP INDEX "Teacher_email_key";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "roomId" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "teacherId" TEXT,
DROP COLUMN "level",
ADD COLUMN     "level" "CourseLevel";

-- AlterTable
ALTER TABLE "CourseStatusLog" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LessonBook" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "publicationDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "LessonProgress" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lessonDate" TIMESTAMP(3),
ADD COLUMN     "lessonNumber" INTEGER,
ADD COLUMN     "lessonTitle" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "studentNotes" TEXT,
ADD COLUMN     "teacherNotes" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'MONTHLY_FEE';

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "dayOfWeek" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "guardian",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isProspect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "parentName" TEXT,
ADD COLUMN     "parentPhone" TEXT,
ADD COLUMN     "rollNumber" TEXT;

-- AlterTable
ALTER TABLE "StudentCourse" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StudentSchedule" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "status" "CourseStatus" NOT NULL DEFAULT 'ENROLLED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subject" TEXT;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");

-- CreateIndex
CREATE INDEX "Invoice_orgId_idx" ON "Invoice"("orgId");

-- CreateIndex
CREATE INDEX "Invoice_number_orgId_idx" ON "Invoice"("number", "orgId");

-- CreateIndex
CREATE INDEX "Invoice_id_studentId_orgId_idx" ON "Invoice"("id", "studentId", "orgId");

-- CreateIndex
CREATE INDEX "Course_orgId_idx" ON "Course"("orgId");

-- CreateIndex
CREATE INDEX "Course_isActive_orgId_idx" ON "Course"("isActive", "orgId");

-- CreateIndex
CREATE INDEX "Course_isArchived_orgId_idx" ON "Course"("isArchived", "orgId");

-- CreateIndex
CREATE INDEX "Course_isDeleted_orgId_idx" ON "Course"("isDeleted", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_orgId_key" ON "Course"("name", "orgId");

-- CreateIndex
CREATE INDEX "CourseStatusLog_orgId_idx" ON "CourseStatusLog"("orgId");

-- CreateIndex
CREATE INDEX "CourseStatusLog_studentCourseId_orgId_idx" ON "CourseStatusLog"("studentCourseId", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseStatusLog_studentCourseId_status_changedAt_key" ON "CourseStatusLog"("studentCourseId", "status", "changedAt");

-- CreateIndex
CREATE INDEX "LessonBook_orgId_idx" ON "LessonBook"("orgId");

-- CreateIndex
CREATE INDEX "LessonBook_isActive_orgId_idx" ON "LessonBook"("isActive", "orgId");

-- CreateIndex
CREATE INDEX "LessonBook_isArchived_orgId_idx" ON "LessonBook"("isArchived", "orgId");

-- CreateIndex
CREATE INDEX "LessonBook_isDeleted_orgId_idx" ON "LessonBook"("isDeleted", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonBook_title_orgId_key" ON "LessonBook"("title", "orgId");

-- CreateIndex
CREATE INDEX "LessonProgress_orgId_idx" ON "LessonProgress"("orgId");

-- CreateIndex
CREATE INDEX "LessonProgress_lessonBookId_orgId_idx" ON "LessonProgress"("lessonBookId", "orgId");

-- CreateIndex
CREATE INDEX "Purchase_orgId_idx" ON "Purchase"("orgId");

-- CreateIndex
CREATE INDEX "Purchase_studentId_type_forMonth_orgId_idx" ON "Purchase"("studentId", "type", "forMonth", "orgId");

-- CreateIndex
CREATE INDEX "Purchase_type_orgId_idx" ON "Purchase"("type", "orgId");

-- CreateIndex
CREATE INDEX "Purchase_invoiceId_orgId_idx" ON "Purchase"("invoiceId", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_studentId_courseId_type_forMonth_orgId_key" ON "Purchase"("studentId", "courseId", "type", "forMonth", "orgId");

-- CreateIndex
CREATE INDEX "Room_orgId_idx" ON "Room"("orgId");

-- CreateIndex
CREATE INDEX "Room_name_orgId_idx" ON "Room"("name", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_orgId_key" ON "Room"("name", "orgId");

-- CreateIndex
CREATE INDEX "Schedule_orgId_idx" ON "Schedule"("orgId");

-- CreateIndex
CREATE INDEX "Schedule_dayOfWeek_startTime_orgId_idx" ON "Schedule"("dayOfWeek", "startTime", "orgId");

-- CreateIndex
CREATE INDEX "Schedule_courseId_teacherId_id_orgId_idx" ON "Schedule"("courseId", "teacherId", "id", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_courseId_teacherId_dayOfWeek_startTime_orgId_key" ON "Schedule"("courseId", "teacherId", "dayOfWeek", "startTime", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNumber_key" ON "Student"("rollNumber");

-- CreateIndex
CREATE INDEX "Student_orgId_idx" ON "Student"("orgId");

-- CreateIndex
CREATE INDEX "Student_isActive_orgId_idx" ON "Student"("isActive", "orgId");

-- CreateIndex
CREATE INDEX "Student_isArchived_orgId_idx" ON "Student"("isArchived", "orgId");

-- CreateIndex
CREATE INDEX "Student_isDeleted_orgId_idx" ON "Student"("isDeleted", "orgId");

-- CreateIndex
CREATE INDEX "Student_joinedAt_orgId_idx" ON "Student"("joinedAt", "orgId");

-- CreateIndex
CREATE INDEX "Student_createdAt_orgId_idx" ON "Student"("createdAt", "orgId");

-- CreateIndex
CREATE INDEX "Student_updatedAt_orgId_idx" ON "Student"("updatedAt", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_orgId_key" ON "Student"("email", "orgId");

-- CreateIndex
CREATE INDEX "StudentCourse_orgId_idx" ON "StudentCourse"("orgId");

-- CreateIndex
CREATE INDEX "StudentCourse_status_studentId_orgId_idx" ON "StudentCourse"("status", "studentId", "orgId");

-- CreateIndex
CREATE INDEX "StudentCourse_status_courseId_orgId_idx" ON "StudentCourse"("status", "courseId", "orgId");

-- CreateIndex
CREATE INDEX "StudentSchedule_orgId_idx" ON "StudentSchedule"("orgId");

-- CreateIndex
CREATE INDEX "StudentSchedule_status_studentId_orgId_idx" ON "StudentSchedule"("status", "studentId", "orgId");

-- CreateIndex
CREATE INDEX "StudentSchedule_studentId_scheduleId_orgId_idx" ON "StudentSchedule"("studentId", "scheduleId", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentSchedule_scheduleId_studentId_key" ON "StudentSchedule"("scheduleId", "studentId");

-- CreateIndex
CREATE INDEX "Teacher_orgId_idx" ON "Teacher"("orgId");

-- CreateIndex
CREATE INDEX "Teacher_isActive_orgId_idx" ON "Teacher"("isActive", "orgId");

-- CreateIndex
CREATE INDEX "Teacher_isAvailable_orgId_idx" ON "Teacher"("isAvailable", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_orgId_key" ON "Teacher"("email", "orgId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
