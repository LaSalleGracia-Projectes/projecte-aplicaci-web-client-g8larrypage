import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDuHHQfNjhWfBvUuEPruNl_QuuJbj5FVLA",
    authDomain: "ciudaddelasleyendas.firebaseapp.com",
    databaseURL: "https://ciudaddelasleyendas-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ciudaddelasleyendas",
    storageBucket: "ciudaddelasleyendas.firebasestorage.app",
    messagingSenderId: "1059583276016",
    appId: "1:1059583276016:web:652d4eb18da95fc08ee335",
    measurementId: "G-RHT9MPZ7H6"
};

// Evita reinicialización en entornos como Next.js
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const db = getFirestore(app); // << esto es lo que debes pasar a `collection`

export { db };