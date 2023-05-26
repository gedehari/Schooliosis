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

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_siswaNis_fkey` FOREIGN KEY (`siswaNis`) REFERENCES `Siswa`(`nis`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_guruNik_fkey` FOREIGN KEY (`guruNik`) REFERENCES `Guru`(`nik`) ON DELETE SET NULL ON UPDATE CASCADE;
