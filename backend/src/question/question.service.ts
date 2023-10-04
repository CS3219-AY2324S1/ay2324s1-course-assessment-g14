import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebase.config";

initializeApp(firebaseConfig);
const db = getFirestore();
