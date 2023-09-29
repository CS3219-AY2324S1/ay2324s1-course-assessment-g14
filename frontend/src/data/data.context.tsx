
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Response {
  type: "success" | "error" | undefined;
  message: any;
}

interface Question {
  id: string;

  title: string;
  tags: string[];
  categories: string[];
  constraints: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: Example[]
}

interface Example {
  text: string
  image: string
}

interface DataContextData {
  loading: boolean;
  response: Response;
  questions: Question[];
  getQuestions: () => void;
  getExamples: (id:string) => void
}

interface DataContextProviderProps {
  children: ReactNode;
}

const emptyResponse: Response = {
  type: undefined,
  message: "",
};

const DataContext = createContext<DataContextData>({
  loading: false,
  response: emptyResponse,
  questions: [],
  getQuestions: () => undefined,
  getExamples: (id:string) => undefined
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response>(emptyResponse);
  const [questions, setQuestions] = useState<Question[]>([]);


  const getExamples = async (id:string) => {
    const subCollRef = collection(db, "questions", id, "examples")

    const examplesSnapshot = await getDocs(subCollRef);
    
    const examplesResult = examplesSnapshot.docs.map((data) => {
      const exampleData = data.data();
 
      return {
        
        text: exampleData.text,
        image: exampleData.img || '', // Use an empty string if image is missing
      };

    
    
      }) 
      // console.log(examplesSnapshot)
      return examplesResult;
     }


  const getQuestions = async () => {
    try {
      setLoading(true);
      // console.log("penis")
      const query = await getDocs(collection(db, "questions"));
      const result = await Promise.all(query.docs.map(async (d) => {
        const q = d.data();
        // const getExamples = async () => {
        // const examplesSnapshot = await getDocs(collection(db, "questions", q.id, "examples"));
        // console.log(examplesSnapshot)
        // const examplesResult = examplesSnapshot.docs.map((data) => {
        //   const exampleData = data.data();
        //   return {
        //     text: exampleData.text,
        //     image: exampleData.img || '', // Use an empty string if image is missing
        //   };

        const examplesArray = await getExamples(d.id)
    
    
        // const examplesArray = await getExamples();
        return {
          id: d.id,
          title: q.title,
          tags: q.tags,
          categories: q.categories,
          constraints: q.constraints,
          difficulty: q.difficulty,
          description: q.description,
          examples: examplesArray
        };
      }));  
      setLoading(false);
      setQuestions(result);
      setResponse({
        type: "success",
        message: "successfully retreived questions",
      });
    } catch (e) {
      setLoading(false);
      setResponse({
        type: "error",
        message: e,
      });
    
    }
  
    
  };

  const dataContextProviderValue = useMemo(
    () => ({ loading, response, questions, getQuestions, getExamples }),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, response, questions]
  );
  


  return (
    <DataContext.Provider value={dataContextProviderValue}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  return useContext(DataContext);

};
