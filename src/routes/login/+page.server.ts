import type { LoginStatus, UserIdentityType } from "$lib/auth/types";
import { prismaClient } from "$lib/server/prismaClient";
import type { ActionFailure } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { login } from "$lib/auth/auth.server";

type LoginReturn = { status: LoginStatus }

export const actions = {
    default: async ({ request, cookies }): Promise<ActionFailure<LoginReturn> | LoginReturn> => {
        const data = await request.formData();

        const identityType = data.get("identityType")?.toString() as UserIdentityType;
        const id = data.get("id")?.toString();
        const password = data.get("password")?.toString();
        const rememberMe = data.get("password") ? true : false;

        if (!identityType || !id || !password) {
            return {
                status: "InvalidLogin"
            }
        }

        const status = await login({ identityType, id, password, rememberMe })

        return { status }
    }
} satisfies Actions
