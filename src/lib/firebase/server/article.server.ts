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