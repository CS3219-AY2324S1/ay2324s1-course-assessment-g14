import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

interface Response {
  type: "success" | "error" | undefined;
  message: any;
  result: any;
  //result2: any;
}

interface DataContextData {
  loading: boolean;
  response: Response;
  getQuestions: () => void;
}

interface DataContextProviderProps {
  children: ReactNode;
}

const emptyResponse: Response = {
  type: undefined,
  message: "",
  result: undefined,
  //result2: undefined,
};

const DataContext = createContext<DataContextData>({
  loading: false,
  response: emptyResponse,
  getQuestions: () => undefined,
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response>(emptyResponse);

  const getQuestions = async () => {
    try {
      let questions: any[] = [];
      //let examples: any[] = [];
      setLoading(true);
      const questionsQuery = await getDocs(collection(db, "questions"));
      
      //TODO: get examples for questions
      //const examplesQuery = await getDocs(query(collection(db, "questions", "1", "examples")));
      //examplesQuery.forEach((doc) => examples.push(doc.data()));
      
      questionsQuery.forEach((doc) => questions.push(doc.data()));
      setLoading(false);
      setResponse({
        type: "success",
        message: "successfully retreived questions",
        result: questions,
        //result2: examples,
      });
    } catch (e) {
      setLoading(false);
      setResponse({
        type: "error",
        message: e,
        result: undefined,
        //result2: undefined,
      });
    }
  };

  const dataContextProviderValue = useMemo(
    () => ({ loading, response, getQuestions }),
    [loading, response]
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
