/*
  Warnings:

  - You are about to drop the column `googleToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `googleToken`,
    DROP COLUMN `githubToken`;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('AUTHENTICATED', 'ANONYMOUS') NOT NULL,
    `token` VARCHAR(191),
    `expires` DATETIME(3),
    `invalidate` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191),
    `googleToken` VARCHAR(191),
    `githubToken` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
