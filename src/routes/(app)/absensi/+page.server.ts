import { prismaClient } from "$lib/server/prismaClient";
import type { Siswa } from "@prisma/client";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    const siswaNis = (locals.userInfo?.profile as Siswa).nis;
    if (siswaNis == undefined) {
        throw error(500);
    }

    const presences = await prismaClient.absen.findMany({
        where: {
            siswaNis
        }
    })

    return {
        presences
    }
};