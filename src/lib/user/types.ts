import type { Guru, IdentityType, Siswa } from "@prisma/client"

export type UserInfo = {
    identityType: IdentityType,
    id: number
    name: string,
    email: string
    profile?: Siswa | Guru
}