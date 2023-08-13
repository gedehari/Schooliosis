-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_guruNik_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_siswaNis_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_siswaNis_fkey` FOREIGN KEY (`siswaNis`) REFERENCES `Siswa`(`nis`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_guruNik_fkey` FOREIGN KEY (`guruNik`) REFERENCES `Guru`(`nik`) ON DELETE CASCADE ON UPDATE CASCADE;
