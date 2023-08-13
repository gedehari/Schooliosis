import { prismaClient } from '$lib/server/prismaClient';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	const kelasId = locals.userInfo?.profile?.kelasId;
	if (kelasId == undefined) {
		throw error(500);
	}

	const schedules = prismaClient.jadwal.findMany({
		include: {
			jamPelajaran: true,
			mataPelajaran: true
		},
		where: {
			kelasId
		},
		orderBy: {
			jamPelajaranId: 'asc'
		}
	});

	return {
		streamed: {
			schedules: new Promise<Awaited<typeof schedules>>((resolve, reject) => {
				schedules.then(resolve).catch(reject);
			})
		}
	};
};
