import { AUTH } from '$lib/firebase/server/firebase.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request: any, cookies: any }) => {
    try {
        const { token, email } = await request.json()
        const verify = await AUTH.verifyIdToken(token ?? '', true)

        if (verify.email === email) {
            cookies.set('SGS-T', token, { maxAge: verify.exp, path: '/' })
            return json({ message: 'scucess' }, { status: 200 })

        }
        return json({ message: 'Bad token' }, { status: 403 })

    } catch (error) {
        return json({ message: 'Bad token' }, { status: 403 })
    }
};

export const GET: RequestHandler = async ({ cookies }) => {
    cookies.delete('SGS-T', { path: '/' })
    return json({ message: 'scucess' }, { status: 200 })
}