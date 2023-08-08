import { env } from '$env/dynamic/private';
import { prismaClient } from '$lib/server/prismaClient';
import { getUserInfo } from '$lib/user/server';
import { redirect, type Handle } from '@sveltejs/kit';
import { handleSession } from 'svelte-kit-cookie-session';
import voca from 'voca';

let isConfigured = false;

export const handle: Handle = handleSession(
	{
		secret: env.COOKIE_SECRET,
		expires: 1
	},
	async ({ event, resolve }) => {
		const route = event.route.id;
		if (!route) {
			return resolve(event);
		}

		if (route.startsWith('/setup')) {
			if (isConfigured) {
				throw redirect(303, '/');
			}
		} else if (!isConfigured) {
			const isDbConfigured = await prismaClient.config.findFirst({
				where: {
					key: 'IS_CONFIGURED'
				}
			});
			if (isDbConfigured?.value === 'true') {
				isConfigured = true;
			}
			if (!isConfigured) {
				throw redirect(303, '/setup');
			}
		}

		const session = event.locals.session;
		const user = session.data.userId ? await getUserInfo(session.data.userId || 0, true) : undefined;

		if (user) {
			event.locals.userInfo = user;
			await session.refresh();
		} else {
			await session.set({ userId: undefined });
		}

		if (route.startsWith('/(app)')) {
			if (!user) {
				throw redirect(303, '/login');
			}
		}

		if (route.startsWith('/(auth)')) {
			if (!route.startsWith('/(auth)/logout')) {
				if (user) {
					throw redirect(303, `/${voca.lowerCase(user.identityType)}/dashboard`);
				}
			}
		}

		return resolve(event);
	}
);
