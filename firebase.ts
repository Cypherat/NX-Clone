// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG-fZD0Go2mNdmYjGm0Qld0xQi6gaxpy8",
  authDomain: "netflix-clone-firat.firebaseapp.com",
  projectId: "netflix-clone-firat",
  storageBucket: "netflix-clone-firat.appspot.com",
  messagingSenderId: "738511959312",
  appId: "1:738511959312:web:d38f09c4b4d9faea906195"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) 
: getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
