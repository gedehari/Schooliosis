import type { LoginForm, LoginStatus } from "$lib/auth/types";
import { fail, type ActionFailure, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { login } from "$lib/auth/server";
import type { IdentityType } from "@prisma/client";

type LoginReturn = { status: LoginStatus }

export const actions = {
    default: async ({ request, locals }): Promise<ActionFailure<LoginReturn>> => {
        const data = await request.formData();

        const form: LoginForm = {
            identityType: data.get("identityType")?.toString() as IdentityType,
            id: parseInt(data.get("id")?.toString() || ""),
            password: data.get("password")?.toString() ?? "",
            rememberMe: data.get("rememberMe") ? true : false
        }

        const status = await login(locals.session, form);
        if (status == "ServerError") {
            return fail(500, { status });
        }
        else if (status != "Ok") {
            return fail(400, { status });
        }

        throw redirect(303, `/${form.identityType == "Siswa" ? "siswa" : "guru"}/dashboard`);
    }
} satisfies Actions
