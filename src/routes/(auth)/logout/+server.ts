import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { logout } from '$lib/auth/server';

export const GET: RequestHandler = async ({ locals }) => {
	await logout(locals.session);
	throw redirect(303, '/login');
};
