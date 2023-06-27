import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {
        userInfo: locals.userInfo
    };
}) satisfies LayoutServerLoad;