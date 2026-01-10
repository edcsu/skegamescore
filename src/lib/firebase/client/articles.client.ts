import { collection, getDocs, limit, orderBy, query, QuerySnapshot, type DocumentData } from "firebase/firestore";
import { DB } from "./config.client";
import type { Article } from "../../../routes/dashboard/articles/columns";

let articlesCollection = collection(DB, 'articles');

export const getHomeArticles = async (articleLimit = 10) => {
    try {
        const q = query(articlesCollection, orderBy('created_at', 'desc'), limit(articleLimit));
        const querySnapshot = await getDocs(q);
        const articles = await getMoreHelper(querySnapshot);
        return { ...articles };

    } catch (error: any) {
        throw new Error(error);
    }
}

export const getMoreHomeArticles = async (lastVisible: any, articleLimit = 10) => {
    try {
        const q = query(articlesCollection, orderBy('created_at', 'desc'), limit(articleLimit));
        const querySnapshot = await getDocs(q);
        const articles = await getMoreHelper(querySnapshot);
        return articles;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getMoreHelper = async (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
    return { articles, lastVisible };
}