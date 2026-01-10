import { error } from "@sveltejs/kit";
import { DB } from "./firebase.server";

const userCollection = DB.collection('users');

export const getUserById = async (userId: string) => {
    const userDoc = await userCollection.doc(userId).get();
    return userDoc?.data();
}

export const updateUserProfile = async (userId: string, profileData: { firstname?: string; lastname?: string; }) => {
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) {
        throw error(403, { message: 'This is not your profile' });
    }
    await userCollection.doc(userId).update(profileData);
}