import type { Guru, Siswa } from "@prisma/client"

export type UserIdentityType = "Siswa" | "Guru"

export type UserInfo = {
    identityType: UserIdentityType,
    id: number
    name: string,
    email: string
    profile?: Siswa | Guru
}