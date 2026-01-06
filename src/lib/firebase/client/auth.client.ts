import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User, type UserCredential } from "firebase/auth";
import { AUTH, DB } from "./config.client";
import { goto } from "$app/navigation";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "svelte-sonner";
import errorCodes from "../errorcodes";

export async function registerUser({ email, password }: { email: string; password: string }) {
    try {
        const request = await createUserWithEmailAndPassword(AUTH, email, password);
        await addUserToFirestore(request.user);
        toast.success("Registration successful!", {
            description: "You have successfully registered.",
        });
        await authRedirect("/", request.user.uid);
    } catch (error: any) {
        toast.error("Registration failed!", {
            description: errorCodes(error.code),
        });
        throw new Error(error);
    } finally {

    }
}

export async function addUserToFirestore(user : User) {
    try {
        const newUser = {
            uid: user.uid,
            email: user.email,
            firstname: "",
            lastname: "",
            isAdmin: false,
        }
        await setDoc(doc(DB, "users", user.uid), newUser);
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function authRedirect(url: string, userId: string) {
    await goto(url)
}