import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebase.config";

initializeApp(firebaseConfig);
const db = getFirestore();

interface User {
  email: string;
  name?: string;
  year?: string;
  major?: string;
  role: string;
  completed: number;
}

export async function createUser(email: string): Promise<User> {
  try {
    await setDoc(doc(db, "users", email), {
      email: email,
      role: "user",
      completed: 0,
    });
    return Promise.resolve({
      email: email,
      role: "user",
      completed: 0,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getUser(email: string): Promise<User> {
  try {
    const data = await getDoc(doc(db, "users", email));
    const user = data.data();
    if (user) {
      return Promise.resolve({
        email: email,
        name: user.name ? user.name : undefined,
        year: user.year ? user.year : undefined,
        major: user.major ? user.major : undefined,
        role: user.role,
        completed: user.completed,
      });
    }
    return Promise.reject("no such user");
  } catch (error) {
    return Promise.reject(error);
  }
}
