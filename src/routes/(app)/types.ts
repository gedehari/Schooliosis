type Routes = {
    [key: string]: RouteInfo
}

type RouteInfo = {
    name: string,
    icon: string,
    routes?: Routes
}

export const appRoutes: { [key: string]: Routes } = {
    siswa: {
        dashboard: {
            name: "Dashboard",
            icon: "bi-house-fill",
        },
        biodata: {
            name: "Biodata",
            icon: "bi-person-fill",
        },
        jadwal: {
            name: "Jadwal Kelas",
            icon: "bi-calendar-fill",
        },
        absensi: {
            name: "Absensi",
            icon: "bi-card-checklist",
        },
        nilai: {
            name: "Nilai",
            icon: "bi-trophy-fill",
        },
    },
    guru: {
        dashboard: {
            name: "Dashboard",
            icon: "bi-house-fill",
        },
        biodata: {
            name: "Biodata",
            icon: "bi-person-fill",
        },
        jadwal: {
            name: "Jadwal",
            icon: "bi-calendar-fill",
        },
        jadwalKelas: {
            name: "Jadwal Kelas",
            icon: "bi-calendar-fill",
        },
        absensi: {
            name: "Absensi",
            icon: "bi-card-checklist",
        },
        absensiSiswa: {
            name: "Absensi Siswa",
            icon: "bi-card-checklist",
        },
        nilaiSiswa: {
            name: "Nilai Siswa",
            icon: "bi-trophy-fill",
        },
    },
};

export type RouteSection = keyof typeof appRoutes;
export type SiswaRoutes = keyof typeof appRoutes.siswa;
export type GuruRoutes = keyof typeof appRoutes.guru;