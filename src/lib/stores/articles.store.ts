import { getHomeArticles, getMoreHomeArticles } from "$lib/firebase/client/articles.client";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { writable } from "svelte/store";
import type { Article } from "../../routes/dashboard/articles/columns";

const articlesStore = writable({
    articles: [] as Article[],
    lastVisible: {} as QueryDocumentSnapshot<DocumentData, DocumentData>,
    loading: false,
    error: null
});

const updateArticles = (data: { articles: Article[]; lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> }) => {
    articlesStore.update(prev => {
        let newStore = {
            articles: [...prev.articles, ...data.articles],
            lastVisible: data.lastVisible,
            loading: false,
            error: null
        };
        return newStore;
    });
};

const setLoading = (loading: boolean) => {
    articlesStore.update(prev => {
        return { ...prev, loading };
    }); 
};

export default {
    subscribe: articlesStore.subscribe,
    getHomeArticles: async () => {
        setLoading(true);
        const data = await getHomeArticles(4);
        updateArticles(data);
        setLoading(false);
    },
    loadMoreHomeArticles: async (oldVisible: QueryDocumentSnapshot<DocumentData, DocumentData>) => { 
        setLoading(true);
        const data = await getMoreHomeArticles(oldVisible, 4);
        if (data)
        updateArticles(data);
        setLoading(false);
    },
}