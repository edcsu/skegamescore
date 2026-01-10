import schemaValidation from '$lib/components/forms/article/article.schema.js';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createArticle } from '$lib/firebase/server/article.server.js';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const article = await schemaValidation(formData);
        console.log(article?.error?.properties?.gametitle?.errors);

        if (!article.success) {
            return fail(400, article);
        }

        await createArticle(article.data, locals.user.id);
        
        throw redirect(303, '/dashboard/articles');
    }
};