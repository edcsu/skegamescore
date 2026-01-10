import { DB } from "./firebase.server";

const userCollection = DB.collection('users');

export const getUserById = async (userId: string) => {
    const userDoc = await userCollection.doc(userId).get();
    return userDoc?.data();
}