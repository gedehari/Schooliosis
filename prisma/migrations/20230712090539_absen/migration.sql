-- CreateTable
CREATE TABLE `Absen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siswaNis` INTEGER NOT NULL,
    `statusAbsen` ENUM('Hadir', 'Izin', 'Sakit', 'Alpha') NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Absen_tanggal_key`(`tanggal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Absen` ADD CONSTRAINT `Absen_siswaNis_fkey` FOREIGN KEY (`siswaNis`) REFERENCES `Siswa`(`nis`) ON DELETE RESTRICT ON UPDATE CASCADE;
