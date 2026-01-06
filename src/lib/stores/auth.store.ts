import { AUTH } from "$lib/firebase/client/config.client";
import { isClient } from "$lib/utils";
import { onAuthStateChanged } from "firebase/auth";
import { on } from "svelte/events";
import { readable } from "svelte/store";
import { email, set } from "zod/v4";

const DEFAULTS = { isAuth: false, uid: null as string | null, email: null as string | null };

export default readable(
    DEFAULTS,
    (set) => {
        if (isClient()) {
            onAuthStateChanged(AUTH, (user) => {
                if (user) {
                    set({ isAuth: true, uid: user.uid, email: user.email });
                } else {
                    set(DEFAULTS);
                }
            });
        }

    }
)