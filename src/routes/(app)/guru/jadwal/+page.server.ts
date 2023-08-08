import type { Guru } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prismaClient } from '$lib/server/prismaClient';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.userInfo?.identityType != 'Guru') {
		throw error(403);
	}

	const guruNik = (locals.userInfo?.profile as Guru).nik;
	if (guruNik == undefined) {
		throw error(500);
	}

	const schedules = await prismaClient.jadwal.findMany({
		include: {
			jamPelajaran: true,
			mataPelajaran: true,
			kelas: {
				select: {
					tingkat: true,
					huruf: true
				}
			}
		},
		where: {
			guruNik
		},
		orderBy: {
			jamPelajaranId: 'asc'
		}
	});

	return {
		schedules
	};
};
