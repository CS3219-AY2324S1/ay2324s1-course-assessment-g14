import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { getAllQuestions } from "../api/questions/data";
import { getAllAdminUsers } from "../api/user";

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
  examples: Example[];
}

interface AdminUser {
  email: string;
  name?: string;
  year?: string;
  major?: string;
  role: string;
  completed: number;
}

export interface Example {
  text: string;
  image: string;
}

interface DataContextData {
  loading: boolean;
  response: Response;
  questions: Question[];
  getQuestions: () => void;  
  adminUsers: AdminUser[];
  getAdminUsers: () => void;
  // getExamples: (id: string) => void;
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
  adminUsers: [],
  getAdminUsers: () => undefined,
  // getExamples: (id: string) => undefined,
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response>(emptyResponse);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  const getQuestions = async () => {
    try {
      setLoading(true);
      
      const result = await (await getAllQuestions()).data;
      console.log(result)
      setLoading(false);
      setQuestions(result);
      setResponse({
        type: "success",
        message: "successfully retrieved questions",
      });
    } catch (e) {
      setLoading(false);
      setResponse({
        type: "error",
        message: e,
      });
    }
  };

  const getAdminUsers = async () => {
    try {
      setLoading(true);
      const result = await (await getAllAdminUsers()).data;
      setLoading(false);
      setAdminUsers(result);
      setResponse({
        type: "success",
        message: "successfully retrieved admin users",
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
    () => ({ loading, response, questions, getQuestions, adminUsers, getAdminUsers }),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, response, questions, adminUsers]
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
