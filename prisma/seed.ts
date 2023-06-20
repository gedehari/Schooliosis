import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const contohSiswa = await prisma.siswa.upsert({
        where: {
            nis: 3040
        },
        update: {},
        create: {
            nis: 3040,
            nama: "Contoh Siswa",
            tempatLahir: "Denpasar",
            tanggalLahir: new Date(2007, 0, 1),
            jenisKelamin: "Laki",
            agama: "Hindu",
            alamat: "Jl. Contoh Alamat",
            namaAyah: "Contoh Nama Bapak",
            pekerjaanAyah: "Jadi Contoh",
            namaIbu: "Contoh Nama Ibu",
            pekerjaanIbu: "Jadi Contoh"
        }
    });

    const contohGuru = await prisma.guru.upsert({
        where: {
            nik: 6520
        },
        update: {},
        create: {
            nik: 6520,
            nama: "Contoh Guru",
            tempatLahir: "Denpasar",
            tanggalLahir: new Date(1990, 0, 1),
            jenisKelamin: "Perempuan",
            agama: "Hindu",
            alamat: "Jl. Contoh Alamat"
        }
    });

    const contohKelas = await prisma.kelas.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            tingkat: 7,
            huruf: "A",
            guruWaliNik: 6520
        }
    });

    const contohMataPelajaran = await prisma.mataPelajaran.createMany({
        data: [
            {
                id: 1,
                mataPelajaran: "Matematika",
                singkatan: "MTK",
                kkm: 80
            },
            {
                id: 2,
                mataPelajaran: "Ilmu Pengetahuan Alam",
                singkatan: "IPA",
                kkm: 80
            },
            {
                id: 3,
                mataPelajaran: "Ilmu Pengetahuan Sosial",
                singkatan: "IPS",
                kkm: 80
            },
            {
                id: 4,
                mataPelajaran: "Bahasa Indonesia",
                singkatan: "B.IND",
                kkm: 75
            },
            {
                id: 5,
                mataPelajaran: "Bahasa Inggris",
                singkatan: "B.ING",
                kkm: 75
            },
            {
                id: 6,
                mataPelajaran: "Pendidikan Kewarganegaraan",
                singkatan: "PKN",
                kkm: 75
            },
            {
                id: 7,
                mataPelajaran: "Seni Budaya",
                singkatan: "SBD",
                kkm: 75
            },
            {
                id: 8,
                mataPelajaran: "Teknologi Informasi dan Komunikasi",
                singkatan: "TIK",
                kkm: 75
            },
            {
                id: 9,
                mataPelajaran: "Pendidikan Jasmani dan Rohani",
                singkatan: "PJOK",
                kkm: 75
            },
        ],
        skipDuplicates: true
    });

    const contohJamPelajaran = prisma.jamPelajaran.createMany({
        data: [
            {
                id: 1,
                mulai: 27000,
                selesai: 29400
            },
            {
                id: 2,
                mulai: 29400,
                selesai: 31800
            },
            {
                id: 3,
                mulai: 31800,
                selesai: 34200
            },
            {
                id: 4,
                mulai: 34200,
                selesai: 35400
            },
            {
                id: 5,
                mulai: 35400,
                selesai: 37800
            },
            {
                id: 6,
                mulai: 37800,
                selesai: 40200
            },
            {
                id: 7,
                mulai: 40200,
                selesai: 42600
            },
            {
                id: 8,
                mulai: 42600,
                selesai: 43500
            },
            {
                id: 9,
                mulai: 43500,
                selesai: 45900
            },
            {
                id: 10,
                mulai: 45900,
                selesai: 48300
            }
        ],
        skipDuplicates: true
    });

    console.log({
        contohSiswa,
        contohGuru,
        contohKelas,
        contohMataPelajaran,
        contohJamPelajaran
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
