import schemaValidation from '$lib/components/forms/profile/profile.schema';
import { getUserById } from '$lib/firebase/server/users.server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {

    const user = await getUserById(locals.user.id);

    return {
        user,
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const profile = await schemaValidation(formData);

        if (!profile.success) {
            return fail(400, profile);
        }
        // await updateUserProfile(locals.user.id, { firstname, lastname });
        return { success: true };
    }
} satisfies Actions;