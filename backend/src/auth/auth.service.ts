import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "../firebase/firebase.config";

interface Result {
  success: boolean;
  data: {} | undefined;
}

initializeApp(firebaseConfig);
const auth = getAuth();

export async function signUp(email: string, password: string): Promise<Result> {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    if (data) {
      // get new user details
      return Promise.resolve({ success: true, data });
    }
    return Promise.reject({ success: false, data });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function login(email: string, password: string): Promise<Result> {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return Promise.resolve({ success: true, data });
  } catch (error) {
    console.error(error);
    return Promise.reject({ success: false, error });
  }
}

export async function logout(): Promise<Result> {
  try {
    await signOut(auth);
    return Promise.resolve({ success: true, data: "logged out" });
  } catch (error) {
    console.error(error);
    return Promise.reject({ success: false, error });
  }
}

export async function currentUser(): Promise<Result> {
  try {
    const user = await auth.currentUser;
    if (user) {
      return Promise.resolve({ success: true, data: user });
    }
    return Promise.reject({ success: false, error: "You're not logged in!" });
  } catch (error) {
    console.error(error);
    return Promise.reject({ success: false, error });
  }
}
