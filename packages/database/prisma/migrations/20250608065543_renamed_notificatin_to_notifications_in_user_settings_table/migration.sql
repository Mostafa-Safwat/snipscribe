/*
  Warnings:

  - You are about to drop the column `notification` on the `user_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "notification",
ADD COLUMN     "notifications" BOOLEAN NOT NULL DEFAULT true;
