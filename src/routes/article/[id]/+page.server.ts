import { getArticleById } from '$lib/firebase/server/article.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const { article, author } = await getArticleById(params.id);
    let admin = false;

    if (!article) {
        throw error(404, { message: 'No article found'});
    }

    if (!author) {
        throw error(404, { message: 'No author found'});
    }

    if (author.uid === locals?.user?.id) {
        admin = true;
    }
    return { admin, article, author };
}) satisfies PageServerLoad;