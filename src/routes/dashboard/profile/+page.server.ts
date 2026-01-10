import schemaValidation from '$lib/components/forms/profile/profile.schema';
import { getUserById, updateUserProfile } from '$lib/firebase/server/users.server';
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

        if(!profile.data)
        {
            return fail(422, { success: false, error: { message: 'Profile data is invalid' } });
        }

        await updateUserProfile(locals.user.id, profile.data);
        return { success: true };
    }
} satisfies Actions;