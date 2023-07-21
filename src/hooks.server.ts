import { env } from "$env/dynamic/private";
import { getUserInfo } from "$lib/user/server";
import { redirect, type Handle } from "@sveltejs/kit";
import { handleSession } from "svelte-kit-cookie-session";

export const handle: Handle = handleSession({
    secret: env.COOKIE_SECRET,
    expires: 1, 
}, async ({ event, resolve }) => {
    const route = event.route.id;
    if (!route) {
        return resolve(event);
    }

    const session = event.locals.session;
    const user = session.data.userId
        ? await getUserInfo(session.data.userId || 0, true)
        : undefined

    if (user) {
        event.locals.userInfo = user;
        await session.refresh();
    }

    if (route.startsWith("/(app)")) {
        if (!user) {
            throw redirect(303, "/login");
        }
    }

    if (route.startsWith("/(auth)")) {
        if (!route.startsWith("/(auth)/logout")) {
            if (user) {
                throw redirect(303, `/${user.identityType == "Siswa" ? "siswa" : "guru"}/dashboard`);
            }
        }
    }

    return resolve(event);
});