/*
  Warnings:

  - Added the required column `mataPelajaranId` to the `Guru` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Guru` ADD COLUMN `mataPelajaranId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Jadwal` ADD COLUMN `guruNik` INTEGER NULL;

-- CreateTable
CREATE TABLE `Absen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siswaNis` INTEGER NOT NULL,
    `statusAbsen` ENUM('Hadir', 'Izin', 'Sakit', 'Alpha') NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Absen_tanggal_key`(`tanggal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nilai` (
    `siswaNis` INTEGER NOT NULL,
    `jenisNilai` ENUM('Tugas', 'Kuis', 'UTS', 'UAS') NOT NULL,
    `mataPelajaranId` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,

    PRIMARY KEY (`siswaNis`, `jenisNilai`, `mataPelajaranId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `Guru_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `MataPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_guruNik_fkey` FOREIGN KEY (`guruNik`) REFERENCES `Guru`(`nik`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Absen` ADD CONSTRAINT `Absen_siswaNis_fkey` FOREIGN KEY (`siswaNis`) REFERENCES `Siswa`(`nis`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_siswaNis_fkey` FOREIGN KEY (`siswaNis`) REFERENCES `Siswa`(`nis`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `MataPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
