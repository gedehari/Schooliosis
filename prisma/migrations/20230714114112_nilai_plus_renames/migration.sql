-- CreateTable
CREATE TABLE `Nilai` (
    `siswaNis` INTEGER NOT NULL,
    `jenisNilai` ENUM('Tugas', 'Kuis', 'UTS', 'UAS') NOT NULL,
    `mataPelajaranId` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,

    PRIMARY KEY (`siswaNis`, `jenisNilai`, `mataPelajaranId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_siswaNis_fkey` FOREIGN KEY (`siswaNis`) REFERENCES `Siswa`(`nis`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `MataPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
