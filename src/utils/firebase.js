// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Export Firebase services and utilities
export { app, analytics, database, ref, onValue, set };