import { get } from "svelte/store";
import type { Article } from "../../../routes/dashboard/articles/columns";
import { DB } from "./firebase.server";
import admin from "firebase-admin";
import { getUserById } from "./users.server";
import type { AppUser } from "$lib/utils";

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

export const getArticleById = async (articleId: string) => {
    const articleDoc = await articlesCollection.doc(articleId).get();   
    if (!articleDoc.exists) {
        throw new Error('Article not found');
    }
    const articleData = articleDoc.data();
    const author = await getUserById(articleData!.authorId) as AppUser;
    const article = { id: articleDoc.id, ...articleData } as Article;
    return { article, author };
}  

export const updateArticle = async (article:any, userId: string) => {
    const newArticle = await articlesCollection.add({
        ...article,
        authorId: userId,
        created_at: admin.firestore.Timestamp.now().seconds,
    });
    return newArticle;
}
