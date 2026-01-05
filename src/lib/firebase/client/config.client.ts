import type { FirebaseOptions } from "firebase/app";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { 
    PUBLIC_FirebaseApiKey, 
    PUBLIC_FirebaseAuthDomain, 
    PUBLIC_FirebaseProjectId,
    PUBLIC_FirebaseStorageBucket,
    PUBLIC_FirebaseMessagingSenderId,
    PUBLIC_FirebaseAppId,
    PUBLIC_FirebaseMeasurementId
 } from '$env/static/public';

const firebaseConfig = {
    apiKey: PUBLIC_FirebaseApiKey,
    authDomain: PUBLIC_FirebaseAuthDomain,
    projectId: PUBLIC_FirebaseProjectId,
    storageBucket: PUBLIC_FirebaseStorageBucket,
    messagingSenderId: PUBLIC_FirebaseMessagingSenderId,
    appId: PUBLIC_FirebaseAppId,
    measurementId: PUBLIC_FirebaseMeasurementId
};

if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig as FirebaseOptions);
}

const DB = getFirestore();
const AUTH = getAuth();

export { DB, AUTH };