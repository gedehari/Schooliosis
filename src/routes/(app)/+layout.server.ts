import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.userInfo) {
        throw error(500);
    }

    return {
        userInfo: locals.userInfo
    };
}) satisfies LayoutServerLoad;