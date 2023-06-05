import { prismaClient } from "$lib/server/prismaClient";
import type { UserIdentityType, UserInfo } from "./types";

type UserCache = {
    user: UserInfo,
    expire: number
}

const userCache: { [key: number]: UserCache } = {};

export async function getUserInfo(userId: number, includeProfile = false): Promise<UserInfo | undefined> {
    // console.log("userCache:\n", userCache);

    const cached = userCache[userId];

    if (cached && cached.expire >= Date.now()) {
        if (includeProfile) {
            if (cached.user.profile) {
                console.log("Used user cache, with profile");
                return cached.user;
            }
        }
        else {
            console.log("Used user cache, without profile");
            const { identityType, id, name, email } = cached.user;
            return { identityType, id, name, email };
        }
    }

    const user = await prismaClient.user.findFirst({
        where: {
            id: userId
        },
        include: {
            siswa: true,
            guru: true
        }
    });

    if (!user) {
        return undefined;
    }

    const identityType = user.identityType as UserIdentityType;
    const userInfo = {
        identityType,
        id: user.id,
        name: user.siswa?.nama ?? user.guru?.nama ?? "",
        email: user.email,
        profile: includeProfile ? (user.siswa ?? user.guru ?? undefined) : undefined
    };

    userCache[userId] = {
        user: userInfo,
        expire: Date.now() + (10 * 1000)
    }

    return userInfo;
}