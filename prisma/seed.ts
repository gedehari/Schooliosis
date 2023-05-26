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
    })

    const contohGuru = await prisma.guru.upsert({
        where: {
            nik: 3040
        },
        update: {},
        create: {
            nik: 6521,
            nama: "Contoh Guru",
            tempatLahir: "Denpasar",
            tanggalLahir: new Date(1990, 0, 1),
            jenisKelamin: "Perempuan",
            agama: "Hindu",
            alamat: "Jl. Contoh Alamat"
        }
    })

    console.log({ contohSiswa, contohGuru })
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
