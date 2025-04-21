/*
  Warnings:

  - You are about to drop the column `title` on the `videos` table. All the data in the column will be lost.
  - Added the required column `language` to the `summary_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "summaries" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "body" DROP NOT NULL;

-- AlterTable
ALTER TABLE "summary_requests" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "title";
