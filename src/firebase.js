import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "aviator-crash-c6593.firebaseapp.com",
  projectId: "aviator-crash-c6593",
  storageBucket: "aviator-crash-c6593.appspot.com",
  messagingSenderId: "588339959672",
  appId: "1:588339959672:web:de9c9e1673bccf77c4da8d",
  measurementId: "G-FME1Y1EFGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)