-- AlterTable
ALTER TABLE "UserOrganization" ADD COLUMN     "removedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';
