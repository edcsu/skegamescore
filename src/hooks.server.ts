import { getAuthUser } from "$lib/helpers/app.server";
import { sequence } from "@sveltejs/kit/hooks";

const Auth = async ({ event, resolve }) => {
    const authCookie = event.cookies.get('SGS-T');
    try {
        event.locals.user = await getAuthUser(authCookie);
    } catch (error) {
        event.locals.user = null;
    }
    const response = await resolve(event);
    return response;
}


export const handle = sequence(Auth);