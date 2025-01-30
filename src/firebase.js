// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Js9eW_tWsAvSCNeRxTt2GyD4PF2qw0Y",
  authDomain: "zenithsggstest.firebaseapp.com",
  projectId: "zenithsggstest",
  storageBucket: "zenithsggstest.firebasestorage.app",
  messagingSenderId: "56336078050",
  appId: "1:56336078050:web:cfaecf6fe639ec3fcfbabb",
  measurementId: "G-P20E0P5376"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);


export { db,auth};
