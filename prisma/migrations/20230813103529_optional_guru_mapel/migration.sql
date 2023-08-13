-- DropForeignKey
ALTER TABLE `Guru` DROP FOREIGN KEY `Guru_mataPelajaranId_fkey`;

-- AlterTable
ALTER TABLE `Guru` MODIFY `mataPelajaranId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `Guru_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `MataPelajaran`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
