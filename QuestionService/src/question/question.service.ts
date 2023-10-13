import { initializeApp } from "firebase/app";
import {deleteDoc, doc, getFirestore, setDoc} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebase.config"

initializeApp(firebaseConfig);
export const db = getFirestore();

interface Question {
  title: string;
  tags: string[];
  categories: string[];
  constraints: string[];
  difficulty: string;
  description: string;
  examples: Example[];
}

interface Example {
  text: string;
  image: string;
}

export async function deleteQuestion(questionId: string) {
  try {
    const docRef = doc(db, "questions", questionId);
    await deleteDoc(docRef);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function addQuestion(question: Question): Promise<Question> {
  try {
    let questionDoc: Omit<Question, "examples"> = question
    const docRef = doc(db, "questions", question.title);
    await setDoc(docRef, questionDoc);
    for (let i = 0; i < question.examples.length; i++) {
      const add = setDoc(doc(docRef, "examples", (i+1).toString()), question.examples[i]);
    }
    return Promise.resolve(question);
  } catch (error) {
    return Promise.reject(error);
  }
}