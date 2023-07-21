import { prismaClient } from "$lib/server/prismaClient";
import type { Jadwal, JamPelajaran, MataPelajaran } from "@prisma/client";
import type { PageServerLoad } from "./$types";

type JadwalKelasReturn = {
    schedules: (Jadwal & {
        mataPelajaran: MataPelajaran | null;
        jamPelajaran: JamPelajaran;
    })[] | undefined
}

export const load: PageServerLoad = async ({ locals }): Promise<JadwalKelasReturn> => {
    const kelasId = locals.userInfo?.profile?.kelasId;
    if (kelasId == undefined) {
        return {
            schedules: undefined
        }
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