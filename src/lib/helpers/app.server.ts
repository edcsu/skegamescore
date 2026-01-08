import { AUTH } from "$lib/firebase/server/firebase.server";
import { redirect } from "@sveltejs/kit";

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

export const guardedRoutes = async(event: any) => {
    if (event.url.pathname.startsWith('/signin')) {
        if (event.locals.user) {
            throw redirect(302, '/');
        }
    }
    if (event.url.pathname.startsWith('/dashboard')) {
        if (!event.locals.user) {
            throw redirect(302, '/signin');
        }
    }
}