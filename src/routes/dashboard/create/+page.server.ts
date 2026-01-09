import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        console.log('Form Data:', Object.fromEntries(formData.entries()));
        // Process form data here
        // return { success: true };
    }
};