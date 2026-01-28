-- AlterTable
ALTER TABLE "users" ADD COLUMN     "plan" TEXT,
ADD COLUMN     "planActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeCustomerId" TEXT;
