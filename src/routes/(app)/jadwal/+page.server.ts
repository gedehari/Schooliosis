import { prismaClient } from "$lib/server/prismaClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const schedules = await prismaClient.jadwal.findMany({
        include: {
            jamPelajaran: true,
            mataPelajaran: true
        },
        orderBy: {
            jamPelajaranId: "asc"
        }
    })

    return {
        schedules
    }
};