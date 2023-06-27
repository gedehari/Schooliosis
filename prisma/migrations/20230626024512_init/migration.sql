-- CreateTable
CREATE TABLE `Siswa` (
    `nis` INTEGER NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `tempatLahir` VARCHAR(32) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `jenisKelamin` ENUM('Laki', 'Perempuan') NOT NULL,
    `agama` ENUM('Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu') NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `namaAyah` VARCHAR(255) NOT NULL,
    `pekerjaanAyah` VARCHAR(32) NULL,
    `namaIbu` VARCHAR(255) NOT NULL,
    `pekerjaanIbu` VARCHAR(32) NULL,
    `kelasId` INTEGER NULL,

    PRIMARY KEY (`nis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guru` (
    `nik` INTEGER NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `tempatLahir` VARCHAR(32) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `jenisKelamin` ENUM('Laki', 'Perempuan') NOT NULL,
    `agama` ENUM('Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu') NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `kelasId` INTEGER NULL,

    UNIQUE INDEX `Guru_kelasId_key`(`kelasId`),
    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identityType` ENUM('Siswa', 'Guru') NOT NULL,
    `siswaNis` INTEGER NULL,
    `guruNik` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_siswaNis_key`(`siswaNis`),
    UNIQUE INDEX `User_guruNik_key`(`guruNik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tingkat` SMALLINT NOT NULL,
    `huruf` CHAR(1) NOT NULL,

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
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `Guru_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_siswaNis_fkey` FOREIGN KEY (`siswaNis`) REFERENCES `Siswa`(`nis`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_guruNik_fkey` FOREIGN KEY (`guruNik`) REFERENCES `Guru`(`nik`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_mataPelajaranId_fkey` FOREIGN KEY (`mataPelajaranId`) REFERENCES `MataPelajaran`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_jamPelajaranId_fkey` FOREIGN KEY (`jamPelajaranId`) REFERENCES `JamPelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
