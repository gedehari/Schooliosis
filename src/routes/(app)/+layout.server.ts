import { prismaClient } from '$lib/server/prismaClient';
import type { LayoutServerLoad } from './$types';

// export const load = (async ({ locals }) => {
//     const session = locals.session;
//     const user = session.data.userId ? await prismaClient.user.findFirst({
//         where: {
//             id: session.data.userId
//         },
//         include: {
//             siswa: true,
//             guru: true
//         }
//     }) : undefined;

//     return { user };
// }) satisfies LayoutServerLoad;