
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const Firebase = {
  apiKey: "AIzaSyCWcGdgNbH4_EAWyHrwxJVDu19YynPvjjw",
  authDomain: "oil-project-7a9d5.firebaseapp.com",
  projectId: "oil-project-7a9d5",
  storageBucket: "oil-project-7a9d5.firebasestorage.app",
  messagingSenderId: "270950957985",
  appId: "1:270950957985:web:3901150a98ffa8312041e0"
};

const app = initializeApp(Firebase);
export const auth = getAuth(app);
export default app;