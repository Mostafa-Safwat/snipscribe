/*
  Warnings:

  - You are about to drop the column `is_shared` on the `summaries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "summaries" DROP COLUMN "is_shared";

-- AlterTable
ALTER TABLE "summary_requests" ADD COLUMN     "is_shared" BOOLEAN NOT NULL DEFAULT false;
