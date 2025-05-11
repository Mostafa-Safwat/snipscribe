/*
  Warnings:

  - You are about to drop the column `is_shared` on the `summary_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "summaries" ADD COLUMN     "is_shared" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "summary_requests" DROP COLUMN "is_shared";
