import type { Actions } from './$types';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        return {
            id: data.get("id"),
            password: data.get("password")
        };
    }
} satisfies Actions
