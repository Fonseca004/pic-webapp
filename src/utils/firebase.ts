import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAJLRFrK-84bMZQy6wwM2Vx180KMHf0rSg",
    authDomain: "rack-54906.firebaseapp.com",
    databaseURL: "https://rack-54906-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rack-54906",
    storageBucket: "rack-54906.firebasestorage.app",
    messagingSenderId: "1079060288831",
    appId: "1:1079060288831:web:bfbc5dd76aa2a3e7076f8a",
    measurementId: "G-JZ1Z7CE839"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Conditionally initialize Analytics (only in browser)
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    }).catch((err) => {
        console.warn("Firebase analytics not supported:", err);
    });
}

// Export the initialized services
export { app, analytics, database, ref, onValue, set, remove };
