import { prismaClient } from "$lib/server/prismaClient";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const kelasId = locals.userInfo?.profile?.kelasId;
    if (kelasId == undefined) {
        throw error(500);
    }

    const schedules = await prismaClient.jadwal.findMany({
        include: {
            jamPelajaran: true,
            mataPelajaran: true
        },
        where: {
            kelasId
        },
        orderBy: {
            jamPelajaranId: "asc"
        }
    })

    return {
        schedules
    }
};