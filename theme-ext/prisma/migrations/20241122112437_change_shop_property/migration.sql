/*
  Warnings:

  - You are about to drop the column `shopId` on the `Funnel` table. All the data in the column will be lost.
  - Added the required column `shopDomain` to the `Funnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Funnel_shopId_idx";

-- AlterTable
ALTER TABLE "Funnel" DROP COLUMN "shopId",
ADD COLUMN     "shopDomain" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Funnel_shopDomain_idx" ON "Funnel"("shopDomain");
