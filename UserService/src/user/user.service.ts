import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc, updateDoc, where, query, collection, getDocs, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

interface User {
  email?: string;
  name?: string;
  year?: string;
  major?: string;
  role?: string;
  completed?: number;
}

export async function createUser(email: string): Promise<User> {
  try {
    await setDoc(doc(db, "users", email), {
      email: email,
      name: "-",
      year: "-",
      major: "-",
      role: "user",
      completed: 0,
    });
    return Promise.resolve({
      email: email,
      name: "-",
      year: "-",
      major: "-",
      role: "user",
      completed: 0,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createAdminUser(email: string): Promise<User> {
  try {
    await setDoc(doc(db, "users", email), {
      email: email,
      name: "-",
      year: "-",
      major: "-",
      role: "admin",
      completed: 0,
    });
    return Promise.resolve({
      email: email,
      name: "-",
      year: "-",
      major: "-",
      role: "admin",
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

export async function getAdminUsers(): Promise<User[]> {
  try {
    const q = query(collection(db, "users"), where("role", "==", "admin"));
    const querySnapshot = await getDocs(q);
    let adminsArray: (User)[];
    adminsArray = []
    querySnapshot.forEach((doc) =>  {
      const user = doc.data()
      adminsArray = adminsArray.concat([{
        email: user.email,
        name: user.name ? user.name : undefined,
        year: user.year ? user.year : undefined,
        major: user.major ? user.major : undefined,
        role: user.role,
        completed: user.completed,
      }])
    })

    if (querySnapshot) {
      return Promise.resolve(adminsArray);

    }
    return Promise.reject("no such user");
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getNormalUsers(): Promise<User[]> {
  try {
    const q = query(collection(db, "users"), where("role", "==", "user"));
    const querySnapshot = await getDocs(q);
    let userArray: (User)[];
    userArray = []
    querySnapshot.forEach((doc) =>  {
      const user = doc.data()
      userArray = userArray.concat([{
        email: user.email,
        name: user.name ? user.name : undefined,
        year: user.year ? user.year : undefined,
        major: user.major ? user.major : undefined,
        role: user.role,
        completed: user.completed,
      }])
    })

    if (querySnapshot) {
      return Promise.resolve(userArray);

    }
    return Promise.reject("no such user");
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateUser(email: string, params: any): Promise<User> {
  try {
    const document = doc(db, "users", email);
    await updateDoc(document, {
      name: params.name,
      year: params.year,
      major: params.major,
      role: params.role
    })
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

export async function delUser(user: string): Promise<null> {
  try {
    await deleteDoc(doc(db, "users", user));
    return null;
  } catch (error) {
    return Promise.reject(error);
  }
}