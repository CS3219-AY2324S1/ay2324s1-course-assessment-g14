import { Request, Response } from "express";
import {addQuestion, db} from "./question.service";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";

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

export async function handleGetQuestions(req: Request, res: Response) {
  try {
    //   console.log(req.query.email);
    //   const { email } = req.query;
    const query = await getDocs(collection(db, "questions"));
    const result = await Promise.all(
      query.docs.map(async (d) => {
        const q = d.data();
        const examplesArray = await getExamples(d.id);

        return {
          id: d.id,
          title: q.title,
          tags: q.tags,
          categories: q.categories,
          constraints: q.constraints,
          difficulty: q.difficulty,
          description: q.description,
          examples: examplesArray,
        };
      })
    );

    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(500).send("no questions");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

const getExamples = async (id: string) => {
  const subCollRef = collection(db, "questions", id, "examples");

  const examplesSnapshot = await getDocs(subCollRef);

  const examplesResult = examplesSnapshot.docs.map((data) => {
    const exampleData = data.data();

    return {
      text: exampleData.text,
      image: exampleData.img || "", // Use an empty string if image is missing
    };
  });
  // console.log(examplesSnapshot)
  return examplesResult;
};

export async function handleDeleteQuestion(req: Request, res: Response) {
  const questionId = req.params.questionId;
  try {
    const docRef = doc(db, "questions", questionId);
    const result = await deleteDoc(docRef);
  } catch (err) {
    console.log(`error when deleting question with id ${questionId}` + err);
    res.status(500).send(err);
  }
}

export async function handleAddQuestion(req: Request, res: Response) {
  try {
    const {
      title,
      tags,
      categories,
      constraints,
      difficulty,
      description,
      examples,
    } = req.body;
    console.log(`adding question ${title}`);
    const question = await addQuestion({
      title: title,
      tags: tags,
      categories: categories,
      constraints: constraints,
      difficulty: difficulty,
      description: description,
      examples: examples,
    });
    res.status(200).send(question);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
