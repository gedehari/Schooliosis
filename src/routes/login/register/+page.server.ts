import { register, type UserIdentityType } from '$lib/server/auth';
import type { RegisterStatus } from '$lib/status';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request }): Promise<{ status: RegisterStatus }> => {
        const data = await request.formData();
        const identityType = data.get("identityType")?.toString() as UserIdentityType;
        const id = data.get("id")?.toString();
        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();
        const confirmPassword = data.get("password")?.toString();

        if (!identityType || !id || !email || !password || !confirmPassword) {
            return {
                status: "INVALID_REGISTER"
            }
        }

        if (password != confirmPassword) {
            return {
                status: "PASSWORD_MISMATCH"
            }
        }

        return {
            status: await register(identityType, id, email, password)
        };
    }
} satisfies Actions
