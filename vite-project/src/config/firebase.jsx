import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatapplication-58e23.firebaseapp.com",
  projectId: "chatapplication-58e23",
  storageBucket: "chatapplication-58e23.firebasestorage.app",
  messagingSenderId: "771199158656",
  appId: "1:771199158656:web:8e3220d6eef9d55bfc9965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}