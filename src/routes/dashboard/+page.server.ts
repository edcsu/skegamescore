import type {  Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    articleform: async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const content = formData.get('content');
        console.log(formData);
    }
} satisfies Actions;