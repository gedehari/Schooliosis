import { env } from "$env/dynamic/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { handleSession } from "svelte-kit-cookie-session";

export const handle = handleSession({
    secret: env.COOKIE_SECRET,
    expires: 1,
}, async ({ event, resolve }) => {
    const route = event.url.pathname;
    const sessionData = event.locals.session.data;

    if (route.startsWith("/dashboard")) {
        if (!sessionData.userId) {
            throw redirect(303, "/login");
        }
    }

    if (route.startsWith("/login")) {
        if (sessionData.userId) {
            throw redirect(303, "/dashboard");
        }
    }

    return resolve(event);
}) satisfies Handle;