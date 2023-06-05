import { register } from "$lib/auth/server";
import type { RegisterForm, RegisterStatus } from "$lib/auth/types";
import { fail, type ActionFailure } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { UserIdentityType } from "$lib/user/types";

type RegisterReturn = { status: RegisterStatus };

export const actions = {
    default: async ({ request, locals }): Promise<ActionFailure<RegisterReturn> | RegisterReturn> => {
        const data = await request.formData();

        const form: RegisterForm = {
            identityType: data.get("identityType")?.toString() as UserIdentityType,
            id: parseInt(data.get("id")?.toString() || ""),
            email: data.get("email")?.toString() || "",
            password: data.get("password")?.toString() ?? ""
        }

        // additional checks
        const confirmPassword = data.get("confirmPassword")?.toString() ?? "";
        if (form.password != confirmPassword) {
            throw fail(400, { status: "PasswordMismatch" });
        }

        const status = await register(locals.session, form);
        if (status == "ServerError") {
            return fail(500, { status });
        }
        else if (status != "Ok") {
            return fail(400, { status });
        }

        return { status };
    }
} satisfies Actions
