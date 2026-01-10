import { getUserArticles } from '$lib/firebase/server/article.server';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const articles = await getUserArticles(locals.user.id);
    return { articles };
}) satisfies PageServerLoad;