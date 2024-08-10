// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wildlens-tours.firebaseapp.com",
  projectId: "wildlens-tours",
  storageBucket: "wildlens-tours.appspot.com",
  messagingSenderId: "295938518838",
  appId: "1:295938518838:web:098719d0e9a1a05df84d97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);