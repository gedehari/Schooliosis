import { prismaClient } from '$lib/server/prismaClient';
import type { Agama, JenisKelamin, Siswa } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';
import { ActionFailure, fail } from '@sveltejs/kit';
import type { LoginStatus } from '$lib/auth/types';

// TODO: add proper error handler

type SiswaActionReturn = { status: LoginStatus };

export const load: PageServerLoad = async () => {
	const daftarSiswa = await prismaClient.siswa.findMany({
		include: {
			kelas: true
		},
		orderBy: {
			nis: 'desc'
		}
	});

	const daftarKelas = await prismaClient.kelas.findMany();

	return {
		daftarSiswa,
		daftarKelas
	};
};

export const actions: Actions = {
	upsert: async ({ request }): Promise<ActionFailure<SiswaActionReturn> | SiswaActionReturn> => {
		const data = await request.formData();
		const form: Partial<Siswa> = {
			nis: parseInt(data.get('nis')?.toString() || ''),
			nama: data.get('nama')?.toString() || '',
			tempatLahir: data.get('tempatLahir')?.toString() || '',
			tanggalLahir: new Date(data.get('tanggalLahir')?.toString() || ''),
			jenisKelamin: data.get('jenisKelamin')?.toString() as JenisKelamin | undefined,
			agama: data.get('agama')?.toString() as Agama | undefined,
			alamat: data.get('alamat')?.toString() || '',
			namaAyah: data.get('namaAyah')?.toString() || '',
			pekerjaanAyah: data.get('pekerjaanAyah')?.toString() || '',
			namaIbu: data.get('namaIbu')?.toString() || '',
			pekerjaanIbu: data.get('pekerjaanIbu')?.toString() || '',
			kelasId: parseInt(data.get('kelasId')?.toString() || '') || undefined
		};

		const siswa = await prismaClient.siswa.upsert({
			where: {
				nis: form.nis
			},
			update: {
				...form,
				nis: undefined
			},
			create: {
				...(form as Required<Siswa>)
			}
		});

		if (!siswa) {
			return fail(500, { status: 'ServerError' });
		}

		return { status: 'Ok' };
	},

	delete: async ({ request }): Promise<ActionFailure<SiswaActionReturn> | SiswaActionReturn> => {
		const data = await request.formData();
		const nis = parseInt(data.get('nis')?.toString() || '');

		const deletedSiswa = await prismaClient.siswa.delete({
			where: {
				nis
			}
		});

		if (!deletedSiswa) {
			return fail(500, { status: 'ServerError' });
		}

		return { status: 'Ok' };
	}
};
