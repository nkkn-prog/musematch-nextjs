/*
  Warnings:

  - You are about to drop the column `experience` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "thumbnailPath" DROP NOT NULL,
ALTER COLUMN "youtubePath" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "experience",
DROP COLUMN "genres";
