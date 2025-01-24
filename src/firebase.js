// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6Js9eW_tWsAvSCNeRxTt2GyD4PF2qw0Y",
  authDomain: "zenithsggstest.firebaseapp.com",
  projectId: "zenithsggstest",
  storageBucket: "zenithsggstest.firebasestorage.app",
  messagingSenderId: "56336078050",
  appId: "1:56336078050:web:cfaecf6fe639ec3fcfbabb",
  measurementId: "G-P20E0P5376"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Export auth for Firebase Authentication
export const auth = getAuth(app);

export const db = getFirestore(app);
