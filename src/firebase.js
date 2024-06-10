// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "capstone-c0906.firebaseapp.com",
  projectId: "capstone-c0906",
  storageBucket: "capstone-c0906.appspot.com",
  messagingSenderId: "909103147024",
  appId: "1:909103147024:web:9edbaf7f3997865cd10295"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const database = getDatabase();