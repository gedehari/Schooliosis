import { prismaClient } from '$lib/server/prismaClient';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const session = locals.session;
    const user = session.data.userId ? await prismaClient.user.findFirst({
        where: {
            id: session.data.userId
        },
        include: {
            siswa: true,
            guru: true
        }
    }) : undefined;

    return {
        me: user ? {
            name: user?.siswa?.nama ?? user?.guru?.nama
        } : undefined
    };
}) satisfies LayoutServerLoad;