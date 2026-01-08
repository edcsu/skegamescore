import { AUTH } from "$lib/firebase/server/firebase.server";

export const getAuthUser = async (userToken: string) => {
    if (!userToken) {
        return null;
    }
    try {
        const verify = await AUTH.verifyIdToken(userToken, true);
        const user = await AUTH.getUser(verify.uid);
        return {
            id: user.uid,
            email: user.email
        };
    } catch (error) {
        return null;
    }
}