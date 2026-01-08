import { onAuthStateChanged } from 'firebase/auth';
import type { LayoutLoad } from './$types';
import { AUTH } from '$lib/firebase/client/config.client';

export const load = (async() => {
    
    const getAuthUser = () => {
        return new Promise((resolve) => {
            onAuthStateChanged(AUTH, (user) => (resolve(user ? user : false)));
        });
    }
    return {
        getAuthUser: getAuthUser
    };
}) satisfies LayoutLoad;