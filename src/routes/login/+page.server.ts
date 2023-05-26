import { prismaClient } from '$lib/server/prismaClient';
import type { LoginStatus } from '$lib/status';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request, cookies }): Promise<{ status: LoginStatus }> => {
        const data = await request.formData();
        const identityType = data.get("identityType");
        const id = data.get("id");
        const password = data.get("password");
        const rememberMe = data.get("password") ? true : false;

        if (!identityType || !id || !password) {
            return {
                status: 'INVALID_LOGIN'
            }
        }

        const user = await prismaClient.user.findFirst({
            where: {
                siswaNis: parseInt(id.toString())
            }
        });

        console.log(user);

        if (user) {
            console.log("log me in!!!")
        }

        return {
            status: "INVALID_LOGIN"
        };
    }
} satisfies Actions
