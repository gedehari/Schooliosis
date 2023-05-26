import type { RegisterStatus } from "$lib/status";
import { prismaClient } from "./prismaClient";
import bcrypt from "bcryptjs";

export type UserIdentityType = "student" | "teacher"

export async function register(
    identityType: UserIdentityType,
    id: string,
    email: string,
    password: string    
): Promise<RegisterStatus> {
    const exists = await prismaClient.user.count({
        where: {
            siswaNis: identityType == "student" ? {
                equals: parseInt(id)
            } : undefined,
            guruNik: identityType == "teacher" ? {
                equals: parseInt(id)
            } : undefined
        }
    });

    if (exists) {
        return "ALREADY_REGISTERED";
    }

    if (identityType == "student") {
        const studentExists = await prismaClient.siswa.count({
            where: {
                nis: {
                    equals: parseInt(id)
                }
            }
        })

        if (studentExists == 0) {
            return "ID_NOT_REGISTERED";
        }
    }
    else if (identityType == "teacher") {
        const teacherExists = await prismaClient.guru.count({
            where: {
                nik: {
                    equals: parseInt(id)
                }
            }
        })

        if (teacherExists == 0) {
            return "ID_NOT_REGISTERED";
        }
    }
    else {
        return "UNKNOWN";
    }

    // TODO: add password policy

    const passwordHash = await bcrypt.hash(password, 16)

    const newUser = await prismaClient.user.create({
        data: {
            identityType: identityType == "student" ? "Siswa" : "Guru",
            siswaNis: identityType == "student" ? parseInt(id) : undefined,
            guruNik: identityType == "teacher" ? parseInt(id) : undefined,
            email,
            passwordHash
        }
    })

    if (!newUser)
        return "SERVER_ERROR"

    return "SUCCESS";
}