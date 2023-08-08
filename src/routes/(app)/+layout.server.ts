import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prismaClient } from '$lib/server/prismaClient';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.userInfo) {
		throw error(500);
	}

	const instanceName: string | undefined = (
		await prismaClient.config.findFirst({
			where: {
				key: 'INSTANCE_NAME'
			}
		})
	)?.value;

	return {
		instanceName,
		userInfo: locals.userInfo
	};
};
