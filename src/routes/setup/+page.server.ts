import { setup } from '$lib/server/setup';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		const status = await setup({
			session: locals.session,
			instanceName: data.get('instanceName')?.toString() || '',
			adminEmail: data.get('adminEmail')?.toString() || '',
			adminPassword: data.get('adminPassword')?.toString() || ''
		});

		if (!status) {
			return fail(500);
		}

		throw redirect(303, `/admin/dashboard`);
	}
};
