// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBTpliY65IDeDrk3qL2HVbpYGPPhr-LAg",
  authDomain: "netflix-clone-1a2ae.firebaseapp.com",
  projectId: "netflix-clone-1a2ae",
  storageBucket: "netflix-clone-1a2ae.appspot.com",
  messagingSenderId: "49411334668",
  appId: "1:49411334668:web:c93d4dc3bbe5b22813c429",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) 
: getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
