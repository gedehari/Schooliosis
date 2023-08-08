import { prismaClient } from '$lib/server/prismaClient';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Siswa } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.userInfo?.identityType != 'Siswa') {
		throw error(403);
	}

	const siswaNis = (locals.userInfo?.profile as Siswa).nis;
	if (siswaNis == undefined) {
		throw error(500);
	}

	const subjects = await prismaClient.mataPelajaran.findMany({
		include: {
			nilai: {
				where: {
					siswaNis
				}
			}
		}
	});

	return {
		subjects
	};
};
