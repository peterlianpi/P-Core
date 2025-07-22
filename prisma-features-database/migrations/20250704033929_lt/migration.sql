/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TelegramSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwoFactorConfirmation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwoFactorToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UpdateLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOrganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VersionInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TelegramSetting" DROP CONSTRAINT "TelegramSetting_orgId_fkey";

-- DropForeignKey
ALTER TABLE "TelegramSetting" DROP CONSTRAINT "TelegramSetting_userId_fkey";

-- DropForeignKey
ALTER TABLE "TwoFactorConfirmation" DROP CONSTRAINT "TwoFactorConfirmation_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "PasswordResetToken";

-- DropTable
DROP TABLE "TelegramSetting";

-- DropTable
DROP TABLE "TwoFactorConfirmation";

-- DropTable
DROP TABLE "TwoFactorToken";

-- DropTable
DROP TABLE "UpdateLog";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserOrganization";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "VersionInfo";

-- DropEnum
DROP TYPE "LogType";

-- DropEnum
DROP TYPE "OrganizationUserRole";

-- DropEnum
DROP TYPE "Scope";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_apiKey_key" ON "UserSettings"("apiKey");
