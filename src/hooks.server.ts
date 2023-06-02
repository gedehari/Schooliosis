import { env } from "$env/dynamic/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { handleSession } from "svelte-kit-cookie-session";

export const handle = handleSession({
    secret: env.COOKIE_SECRET,
    expires: 1,
}, async ({ event, resolve }) => {
    const route = event.url.pathname;
    const session = event.locals.session;
    await session.refresh();

    if (route.startsWith("/dashboard")) {
        if (!session.data.userId) {
            throw redirect(303, "/login");
        }
    }

    if (route.startsWith("/login")) {
        if (session.data.userId) {
            throw redirect(303, "/dashboard");
        }
    }

    return resolve(event);
}) satisfies Handle;