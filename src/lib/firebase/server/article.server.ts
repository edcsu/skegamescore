import type { Article } from "../../../routes/dashboard/articles/columns";
import { DB } from "./firebase.server";
import admin from "firebase-admin";

let articlesCollection = DB.collection('articles');

export const createArticle = async (article:any, userId: string) => {
    const newArticle = await articlesCollection.add({
        ...article,
        authorId: userId,
        created_at: admin.firestore.Timestamp.now().seconds,
    });
    return newArticle;
}

export const getUserArticles = async (userId: string) => {
    const userArticlesSnapshot = await articlesCollection
        .where('authorId', '==', userId)
        .orderBy('created_at', 'desc')
        .get(); 
    const userArticles = userArticlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
    return userArticles;
}