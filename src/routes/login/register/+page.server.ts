import { register } from "$lib/auth/auth.server";
import type { RegisterStatus, UserIdentityType } from "$lib/auth/types";
import { fail, type ActionFailure } from "@sveltejs/kit";
import type { Actions } from "./$types";

type RegisterReturn = { status: RegisterStatus };

export const actions = {
    default: async ({ request }): Promise<ActionFailure<RegisterReturn> | RegisterReturn> => {
        const data = await request.formData();

        const identityType = data.get("identityType")?.toString() as UserIdentityType;
        const id = data.get("id")?.toString();
        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();
        const confirmPassword = data.get("password")?.toString();

        if (!identityType || !id || !email || !password || !confirmPassword) {
            return fail(400, { status: "InvalidRegister" });
        }

        if (password != confirmPassword) {
            return fail(400, { status: "PasswordMismatch" });
        }

        const status = await register({ identityType, id, email, password })

        if (status == "ServerError") {
            return fail(500, { status })
        }
        else if (status != "Ok") {
            return fail(400, { status })
        }

        return { status };
    }
} satisfies Actions
