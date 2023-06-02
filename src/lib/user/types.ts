import type { Guru, Siswa } from "@prisma/client"

export type UserIdentityType = "Siswa" | "Guru"

export type UserInfo = {
    identityType: UserIdentityType,
    id?: string
    name: string,
    email?: string
    profile?: Siswa | Guru
}