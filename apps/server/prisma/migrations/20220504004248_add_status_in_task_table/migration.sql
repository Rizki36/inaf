-- CreateEnum
CREATE TYPE "StatusTask" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "StatusTask" NOT NULL DEFAULT E'OPEN';
