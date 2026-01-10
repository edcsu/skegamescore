import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { DB } from "./config.client";

let articlesCollection = collection(DB, 'articles');

export const getHomeArticles = async (articleLimit = 10) => {
    try {
        const q = query(articlesCollection, orderBy('created_at', 'desc'), limit(articleLimit));
        const querySnapshot = await getDocs(q);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log("Fetched articles:", articles);
        console.log("Last visible document:", lastVisible);

    } catch (error: any) {
        throw new Error(error);
    }
}