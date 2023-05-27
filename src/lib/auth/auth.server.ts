import { prismaClient } from "$lib/server/prismaClient";
import bcrypt from "bcryptjs";
import type { LoginForm, LoginStatus, RegisterForm, RegisterStatus } from "./types";

export async function login({ identityType, id, password, rememberMe }: LoginForm): Promise<LoginStatus> {
    const user = await prismaClient.user.findFirst({
        where: {
            siswaNis: identityType == "Siswa" ? parseInt(id) : undefined,
            guruNik: identityType == "Guru" ? parseInt(id) : undefined
        }
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return "InvalidLogin"
    }

    // TODO: add session thing

    return "Ok"
}

export async function register({ identityType, id, email, password }: RegisterForm): Promise<RegisterStatus> {
    const exists = await prismaClient.user.count({
        where: {
            siswaNis: identityType == "Siswa" ? parseInt(id) : undefined,
            guruNik: identityType == "Guru" ? parseInt(id) : undefined
        }
    });

    if (exists) {
        return "AlreadyRegistered";
    }

    if (identityType == "Siswa") {
        const siswaExists = await prismaClient.siswa.count({
            where: {
                nis: parseInt(id)
            }
        })

        if (!siswaExists) {
            return "IdNotRegistered";
        }
    }
    else if (identityType == "Guru") {
        const teacherExists = await prismaClient.guru.count({
            where: {
                nik: parseInt(id)
            }
        })

        if (!teacherExists) {
            return "IdNotRegistered";
        }
    }
    else {
        return "Unknown";
    }

    // TODO: add password policy

    const passwordHash = await bcrypt.hash(password, 16)

    const newUser = await prismaClient.user.create({
        data: {
            identityType,
            siswaNis: identityType == "Siswa" ? parseInt(id) : undefined,
            guruNik: identityType == "Guru" ? parseInt(id) : undefined,
            email,
            passwordHash
        }
    })

    if (!newUser)
        return "ServerError"

    return "Ok";
}
