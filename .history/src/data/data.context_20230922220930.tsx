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
  input: string
  output: string
  image: string
}

interface DataContextData {
  loading: boolean;
  response: Response;
  questions: Question[];
  getQuestions: () => void;
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
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response>(emptyResponse);
  const [questions, setQuestions] = useState<Question[]>([]);

  const getQuestions = async () => {
    try {
      setLoading(true);
      const query = await getDocs(collection(db, "questions"));
      const result = query.docs.map((d) => {
        const q = d.data();

        
        const getExamples = async () : Example[]=> {
        const examplesSnapshot = await getDocs(collection(db, "questions", q.id, "examples"));
        const examplesResult = examplesSnapshot.docs.map((data) => {
          const exampleData = data.data();
          return {
            input: exampleData.input,
            output: exampleData.output,
            image: exampleData.image || '', // Use an empty string if image is missing
          };

        
        
        })
      }
        return {
          id: q.id,
          title: q.title,
          tags: q.tags,
          categories: q.categories,
          constraints: q.constraints,
          difficulty: q.difficulty,
          description: q.description,
          examples: getExamples()
        };
      });
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
    () => ({ loading, response, questions, getQuestions }),
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