import { getUserInfo } from "$lib/user/server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    const session = locals.session;
    const userInfo = await getUserInfo(session.data.userId ?? 0, true);
    if (!userInfo) {
        throw error(500);
    }

    return {
        me: userInfo
    };
}) satisfies PageServerLoad