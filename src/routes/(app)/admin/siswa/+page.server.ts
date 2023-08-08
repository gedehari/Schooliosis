import { prismaClient } from "$lib/server/prismaClient";
import type { Agama, JenisKelamin } from "@prisma/client";
import type { SiswaFormInput } from "../types";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

// TODO: add proper error handler

export const load: PageServerLoad = async () => {
    const daftarSiswa = await prismaClient.siswa.findMany({
        orderBy: {
            nis: "desc"
        }
    });

    const daftarKelas = await prismaClient.siswa.findMany()

    return {
        daftarSiswa,
        daftarKelas
    }
};

export const actions: Actions = {
    upsert: async ({ request }) => {
        const data = await request.formData();
        const form: SiswaFormInput = {
            nis: data.get("nis")?.toString() || "",
            nama: data.get("nama")?.toString() || "",
            tempatLahir: data.get("tempatLahir")?.toString() || "",
            tanggalLahir: data.get("tanggalLahir")?.toString() || "",
            jenisKelamin: data.get("jenisKelamin")?.toString() || "",
            agama: data.get("agama")?.toString() || "",
            alamat: data.get("alamat")?.toString() || "",
            namaAyah: data.get("namaAyah")?.toString() || "",
            pekerjaanAyah: data.get("pekerjaanAyah")?.toString() || "",
            namaIbu: data.get("namaIbu")?.toString() || "",
            pekerjaanIbu: data.get("pekerjaanIbu")?.toString() || "",
            kelasId: data.get("kelasId")?.toString() || "",
        }

        const siswa = await prismaClient.siswa.upsert({
            where: {
                nis: parseInt(form.nis)
            },
            update: {
                nis: parseInt(form.nis),
                nama: form.nama,
                tempatLahir: form.tempatLahir,
                tanggalLahir: form.tanggalLahir,
                jenisKelamin: form.jenisKelamin as JenisKelamin,
                agama: form.agama as Agama,
                alamat: form.alamat,
                namaAyah: form.namaAyah,
                pekerjaanAyah: form.pekerjaanAyah,
                namaIbu: form.namaIbu,
                pekerjaanIbu: form.pekerjaanIbu,
                kelasId: parseInt(form.kelasId),
            },
            create: {
                nis: parseInt(form.nis),
                nama: form.nama,
                tempatLahir: form.tempatLahir,
                tanggalLahir: form.tanggalLahir,
                jenisKelamin: form.jenisKelamin as JenisKelamin,
                agama: form.agama as Agama,
                alamat: form.alamat,
                namaAyah: form.namaAyah,
                pekerjaanAyah: form.pekerjaanAyah,
                namaIbu: form.namaIbu,
                pekerjaanIbu: form.pekerjaanIbu,
                kelasId: parseInt(form.kelasId),
            }
        });

        if (!siswa) {
            return fail(500, { status: "ServerError" });
        }

        return { status: "Ok" }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const nis = parseInt(data.get("nis")?.toString() || "");

        return { status: "Ok" }
    }
};