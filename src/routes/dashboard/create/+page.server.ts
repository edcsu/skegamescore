import schemaValidation from '$lib/components/forms/article/article.schema.js';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const article = await schemaValidation(formData);
        console.log(article);
        // Process form data here
        // return { success: true };
    }
};