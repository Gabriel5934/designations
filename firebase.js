import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqppjyJsEEMH6zbQTBqBqUlj2ZGVT5MGo",
  authDomain: "designations-51743.firebaseapp.com",
  projectId: "designations-51743",
  storageBucket: "designations-51743.appspot.com",
  messagingSenderId: "81341484476",
  appId: "1:81341484476:web:7d7d0d262daeef6593efb9",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
