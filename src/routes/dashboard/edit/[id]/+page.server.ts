import schemaValidation from '$lib/components/forms/article/article.schema';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArticleById, updateArticle } from '$lib/firebase/server/article.server';

export const load = (async ({ locals, params }) => {
    const { article, author} = await getArticleById(params.id);
    if (!article) {
        throw error(404, { message: 'No article found'});
    }

    if (!author) {
        throw error(404, { message: 'No author found'});
    }

    if (author.uid !== locals.user.id) {
        throw error(403, { message: 'You do not have permission to edit this article' });
    }
    return { article, author };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals, params }) => {
        const formData = await request.formData();
        const article = await schemaValidation(formData);

        if (!article.success) {
            return fail(400, article);
        }

        await updateArticle(params.id, article.data, locals.user.id);
        
        throw redirect(303, '/dashboard/articles');
    }
};