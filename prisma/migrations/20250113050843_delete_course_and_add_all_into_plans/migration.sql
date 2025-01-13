/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cancellation` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consultation` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_planId_fkey";

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "cancellation" BOOLEAN NOT NULL,
ADD COLUMN     "consultation" TEXT NOT NULL,
ADD COLUMN     "contract" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Course";
