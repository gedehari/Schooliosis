import { env } from "$env/dynamic/private";
import { getUserInfo } from "$lib/user/server";
import { redirect, type Handle } from "@sveltejs/kit";
import { handleSession } from "svelte-kit-cookie-session";

export const handle = handleSession({
    secret: env.COOKIE_SECRET,
    expires: 1,
}, async ({ event, resolve }) => {
    const route = event.url.pathname;
    const session = event.locals.session;
    const user = session.data.userId
        ? await getUserInfo(session.data.userId || 0, true)
        : undefined

    if (user) {
        event.locals.userInfo = user;
        await session.refresh();
    }

    if (route.startsWith("/dashboard")) {
        if (!user) {
            throw redirect(303, "/login");
        }
    }

    if (route.startsWith("/login")) {
        if (user) {
            throw redirect(303, "/dashboard");
        }
    }

    return resolve(event);
}) satisfies Handle;