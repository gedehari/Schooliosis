-- CreateTable
CREATE TABLE `Kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tingkat` SMALLINT NOT NULL,
    `huruf` CHAR(1) NOT NULL,
    `guruWaliNik` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MataPelajaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mataPelajaran` VARCHAR(64) NOT NULL,
    `singkatan` VARCHAR(16) NOT NULL,
    `kkm` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JamPelajaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mulai` INTEGER NOT NULL,
    `selesai` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jadwal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hari` INTEGER NOT NULL,
    `jenisJadwal` ENUM('Upacara', 'Pembelajaran', 'Istirahat') NOT NULL,
    `mataPelajaranId` INTEGER NULL,
    `jamPelajaranId` INTEGER NOT NULL,
    `kelasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_guruWaliNik_fkey` FOREIGN KEY (`guruWaliNik`) REFERENCES `Guru`(`nik`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `MataPelajaran`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_jamPelajaranId_fkey` FOREIGN KEY (`jamPelajaranId`) REFERENCES `JamPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
