import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

interface AuthContextData {
  user: User | undefined;
  error: string;
  signUp: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  user: undefined,
  error: "",
  signUp: (email: string, password: string) => undefined,
  login: (email: string, password: string) => undefined,
  logout: () => undefined,
});

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", undefined);
  const [error, setError] = useState<string>("");

  const signUp = useCallback(
    (email: string, password: string) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((u) => setUser(u.user))
        .catch((e) => setError(e.message));
    },
    [setUser]
  );

  const login = useCallback(
    (email: string, password: string) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((u) => {
          setUser(u.user);
          navigate("/");
        })
        .catch((e) => setError(e.message));
    },
    [setUser, navigate]
  );

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => setUser(undefined))
      .catch((e) => setError(e.message));
  }, [setUser]);

  const authContextProviderValue = useMemo(
    () => ({ user, error, signUp, login, logout }),
    [user, error, signUp, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
