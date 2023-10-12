import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebase.config"

initializeApp(firebaseConfig);
export const db = getFirestore();
