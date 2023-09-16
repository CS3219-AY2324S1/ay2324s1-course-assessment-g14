import { createContext, ReactNode, useContext, useMemo } from "react";
import { db } from "../firebase/firebase";

interface DataContextData {}

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextData>({});

export function AuthContextProvider({ children }: DataContextProviderProps) {
  const dataContextProviderValue = useMemo(() => ({}), []);

  return (
    <DataContext.Provider value={dataContextProviderValue}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
