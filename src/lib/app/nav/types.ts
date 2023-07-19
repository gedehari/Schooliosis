type Routes = {
    [key: string]: RouteInfo
}

type RouteInfo = {
    name: string,
    icon: string,
    routes?: Routes
}

export const appRoutes: Routes = {
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
    absensi: {
        name: "Absensi",
        icon: "bi-card-checklist",
    },
    nilai: {
        name: "Nilai",
        icon: "bi-clipboard-data-fill",
    },
};

export type AppRoutes = keyof typeof appRoutes;