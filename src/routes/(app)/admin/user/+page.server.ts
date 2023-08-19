import type { LoginStatus } from '$lib/auth/types';
import { prismaClient } from '$lib/server/prismaClient';
import { fail, type ActionFailure } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { User } from '@prisma/client';

// TODO: add proper error handler

type UserActionReturn = { status: LoginStatus };

export const load: PageServerLoad = async () => {
	const daftarUser = await prismaClient.user.findMany({
		include: {
			siswa: {
				select: {
					nama: true
				}
			},
			guru: {
				select: {
					nama: true
				}
			}
		},
		orderBy: {
			id: 'desc'
		}
	});

	return {
		daftarUser
	};
};

export const actions: Actions = {
	update: async ({ request }): Promise<ActionFailure<UserActionReturn> | UserActionReturn> => {
		const data = await request.formData();

		const form: Partial<User> = {
			id: parseInt(data.get('id')?.toString() || ''),
			email: data.get('email')?.toString()
		};

		const user = await prismaClient.user.update({
			where: {
				id: form.id
			},
			data: {
				email: form.email
			}
		});

		if (!user) {
			return fail(500, { status: 'ServerError' });
		}

		return { status: 'Ok' };
	},

	delete: async ({ request }): Promise<ActionFailure<UserActionReturn> | UserActionReturn> => {
		const data = await request.formData();
		const id = parseInt(data.get('id')?.toString() || '');

		const deletedUser = await prismaClient.user.delete({
			where: {
				id
			}
		});

		if (!deletedUser) {
			return fail(500, { status: 'ServerError' });
		}

		return { status: 'Ok' };
	}
};
