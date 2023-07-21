import { prismaClient } from "$lib/server/prismaClient";
import type { Siswa } from "@prisma/client";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    const siswa = (locals.userInfo?.profile as Siswa)
    if (!siswa) {
        throw error(403);
    }

    const siswaNis = siswa.nis;
    const presences = await prismaClient.absen.findMany({
        where: {
            siswaNis
        }
    });

    return {
        presences
    }
};