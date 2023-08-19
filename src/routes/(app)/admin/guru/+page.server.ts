import type { LoginStatus } from '$lib/auth/types';
import { prismaClient } from '$lib/server/prismaClient';
import { fail, type ActionFailure } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Agama, Guru, JenisKelamin } from '@prisma/client';

// TODO: add proper error handler

type GuruActionReturn = { status: LoginStatus };

export const load: PageServerLoad = async () => {
	const daftarGuru = await prismaClient.guru.findMany({
		include: {
			kelas: true,
			mataPelajaran: true
		},
		orderBy: {
			nik: 'desc'
		}
	});

	const daftarKelas = await prismaClient.kelas.findMany();
	const daftarMataPelajaran = await prismaClient.mataPelajaran.findMany();

	return {
		daftarGuru,
		daftarKelas,
		daftarMataPelajaran
	};
};

export const actions: Actions = {
	upsert: async ({ request }): Promise<ActionFailure<GuruActionReturn> | GuruActionReturn> => {
		const data = await request.formData();
		const form: Partial<Guru> = {
			nik: parseInt(data.get('nik')?.toString() || ''),
			nama: data.get('nama')?.toString() || '',
			tempatLahir: data.get('tempatLahir')?.toString() || '',
			tanggalLahir: new Date(data.get('tanggalLahir')?.toString() || ''),
			jenisKelamin: data.get('jenisKelamin')?.toString() as JenisKelamin | undefined,
			agama: data.get('agama')?.toString() as Agama | undefined,
			alamat: data.get('alamat')?.toString() || '',
			kelasId: parseInt(data.get('kelasId')?.toString() || '') || undefined,
			mataPelajaranId: parseInt(data.get('mataPelajaranId')?.toString() || '') || undefined
		};

		const guru = await prismaClient.guru.upsert({
			where: {
				nik: form.nik
			},
			update: {
				...form,
				nik: undefined
			},
			create: {
				...(form as Required<Guru>)
			}
		});

		if (!guru) {
			return fail(500, { status: 'ServerError' });
		}

		return { status: 'Ok' };
	},

	delete: async ({ request }): Promise<ActionFailure<GuruActionReturn> | GuruActionReturn> => {
		const data = await request.formData();
		const nik = parseInt(data.get('nik')?.toString() || '');

		const deletedGuru = await prismaClient.guru.delete({
			where: {
				nik
			}
		});

		if (!deletedGuru) {
			return fail(500, { status: 'ServerError' });
		}

		return { status: 'Ok' };
	}
};
