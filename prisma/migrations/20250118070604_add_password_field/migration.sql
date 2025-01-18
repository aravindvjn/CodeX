/*
  Warnings:

  - You are about to drop the column `passwords` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwords",
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "snippet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "snippet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "snippet" ADD CONSTRAINT "snippet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
