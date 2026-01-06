import { AUTH } from "$lib/firebase/client/config.client";
import { isClient } from "$lib/utils";
import { onAuthStateChanged } from "firebase/auth";
import { readable } from "svelte/store";

const DEFAULTS = { isAuthenticated: false, uid: null as string | null, email: null as string | null };

export default readable(
    DEFAULTS,
    (set) => {
        if (isClient()) {
            onAuthStateChanged(AUTH, (user) => {
                if (user) {
                    set({ isAuthenticated: true, uid: user.uid, email: user.email });
                } else {
                    set(DEFAULTS);
                }
            });
        }

    }
)