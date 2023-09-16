import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Response {
  type: "success" | "error" | undefined;
  message: any;
  result: any;
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
      setLoading(true);
      const query = await getDocs(collection(db, "questions"));
      query.forEach((doc) => questions.push(doc.data()));
      setLoading(false);
      setResponse({
        type: "success",
        message: "successfully retreived questions",
        result: questions,
      });
    } catch (e) {
      setLoading(false);
      setResponse({
        type: "error",
        message: e,
        result: undefined,
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
