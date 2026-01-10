import { getHomeArticles } from "$lib/firebase/client/articles.client";
import { writable } from "svelte/store";

const articlesStore = writable({
    post:[],
    lastVisible: {},
    loading: false,
    error: null
});

export default {
    subscribe: articlesStore.subscribe,
    getHomeArticles: async () => {
        const data = await getHomeArticles(4);
    },
    loadMoreHomeArticles: async (limit = 10) => {},
}