
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBK0PABogg4zltUGC8f0vR3bHvZR7XWYTQ",
  authDomain: "scholarship-22b36.firebaseapp.com",
  projectId: "scholarship-22b36",
  storageBucket: "scholarship-22b36.firebasestorage.app",
  messagingSenderId: "732336744549",
  appId: "1:732336744549:web:ebfe9d547c1247ad2abe8c",
  measurementId: "G-HYGYRYXC42"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();