import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBgbMbPTEjA0c3JnbCfaWvntf4kjj6I0I",
  authDomain: "buildcarousel-b7966.firebaseapp.com",
  projectId: "buildcarousel-b7966",
  storageBucket: "buildcarousel-b7966.appspot.com",
  messagingSenderId: "463549739158",
  appId: "1:463549739158:web:b337c7cf3a0249459cd2b7",
  measurementId: "G-4R5GK3CLPT",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
