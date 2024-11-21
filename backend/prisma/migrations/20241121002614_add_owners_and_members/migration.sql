/*
  Warnings:

  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BoardRole" AS ENUM ('OWNER', 'MEMBER');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "BoardMember" (
    "id" SERIAL NOT NULL,
    "boardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "BoardRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "BoardMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
