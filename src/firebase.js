// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBjsedE4P4cljb6T8XuXsiNgHpp7jRaCfA",
  authDomain: "ihm-b-crush.firebaseapp.com",
  projectId: "ihm-b-crush",
  storageBucket: "ihm-b-crush.appspot.com",
  messagingSenderId: "994703235263",
  appId: "1:994703235263:web:29c73473932cad9d5cce0a",
  measurementId: "G-YHL5FHHF00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
