import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYqCFPFo6rK_xKEBkUIlz0aIpPs7jvk-M",
  authDomain: "rupiksha-95ec5.firebaseapp.com",
  projectId: "rupiksha-95ec5",
  storageBucket: "rupiksha-95ec5.firebasestorage.app",
  messagingSenderId: "266080010879",
  appId: "1:266080010879:web:444b77eb6fefc689fab54a",
  measurementId: "G-MCBSQ48PJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;
