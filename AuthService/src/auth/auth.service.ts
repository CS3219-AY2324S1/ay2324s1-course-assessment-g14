import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  deleteUser,
} from "firebase/auth";
import { firebaseConfig } from "../firebase/firebase.config";

initializeApp(firebaseConfig);
const auth = getAuth();
auth.onAuthStateChanged(function(user) { // Include to prevent loss of auth.currentUser upon page refresh
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

interface SignupCredential {
  user: UserCredential;
  token: string;
}

export async function signUp(
  email: string,
  password: string
): Promise<SignupCredential> {
  try {
    const user: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token: string = await user.user.getIdToken();
    return Promise.resolve({
      user: user,
      token: token,
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    const user: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function removeUser(): Promise<void> {
  try {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
