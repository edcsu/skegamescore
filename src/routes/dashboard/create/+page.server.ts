import schemaValidation from '$lib/components/forms/article/article.schema.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const article = await schemaValidation(formData);
        console.log(article?.error?.properties?.gametitle?.errors);
        
        if (!article.success) {
           return fail(400, article);
        }
    }
};