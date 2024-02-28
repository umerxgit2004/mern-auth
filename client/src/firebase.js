// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-56b1a.firebaseapp.com",
  projectId: "mern-auth-56b1a",
  storageBucket: "mern-auth-56b1a.appspot.com",
  messagingSenderId: "133072509123",
  appId: "1:133072509123:web:591baa3f6539390416ea76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);