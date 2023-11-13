import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { getAllQuestions } from "../api/questions/data";
import { getAllAdminUsers, getAllNormalUsers } from "../api/user";
import { useAuth } from "../auth/auth.context";

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

interface User {
  email: string;
  name?: string;
  year?: string;
  major?: string;
  role: string;
  completed: number;
  token: string;
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
  adminUsers: User[];
  getAdminUsers: () => void;
  normalUsers: User[];
  getNormalUsers: () => void;
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
  normalUsers: [],
  getNormalUsers: () => undefined,
  // getExamples: (id: string) => undefined,
});

export function DataContextProvider({ children }: DataContextProviderProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response>(emptyResponse);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [normalUsers, setNormalUsers] = useState<User[]>([]);

  const getQuestions = async () => {
    try {
      setLoading(true);
      if (user) {
        const result = (await getAllQuestions(user.token)).data;
        setQuestions(result);
        setResponse({
          type: "success",
          message: "successfully retrieved questions",
        });
      }
      setResponse({
        type: "error",
        message: "user not found",
      });
      setLoading(false);
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
      const result = (await getAllAdminUsers()).data;
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

  const getNormalUsers = async () => {
    try {
      setLoading(true);
      const result = await (await getAllNormalUsers()).data;
      setLoading(false);
      setNormalUsers(result);
      setResponse({
        type: "success",
        message: "successfully retrieved normal users",
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
    () => ({
      loading,
      response,
      questions,
      getQuestions,
      adminUsers,
      getAdminUsers,
      normalUsers,
      getNormalUsers
    }),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, response, questions, adminUsers, normalUsers]
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
