/*
  Warnings:

  - You are about to drop the column `instructorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `instructorId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `youtubePath` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "instructorId";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "instructorId",
DROP COLUMN "youtubePath",
ALTER COLUMN "description" DROP NOT NULL;

-- DropEnum
DROP TYPE "Role";
