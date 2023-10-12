import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { User } from "firebase/auth";
import { registerUser, signIn, signOut } from "../api/auth";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { createUser, getUser, UserModel } from "../api/user";

interface AuthContextData {
  user: UserModel | undefined;
  setUser: any | undefined,
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
  setUser: undefined,
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
    async (email: string, password: string) => {
      try {
        const response = await registerUser({
          email: email,
          password: password,
        });
        const u: User = response.data.user;
        if (!u.email) {
          throw new Error("user returned without email");
        }
        const fetchedUser = await createUser(u.email);
        setUser(fetchedUser.data);
      } catch (e) {
        if (e instanceof AxiosError && e.response) {
          setError(e.response.data.code);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
    },
    [setUser]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await signIn({ email: email, password: password });
        const u: User = response.data.user;
        if (!u.email) {
          throw new Error("user returned without email");
        }
        console.log(u.email);
        const fetchedUser = await getUser(u.email);
        console.log(fetchedUser.data);
        setUser(fetchedUser.data);
        navigate("/home", { replace: true });
      } catch (e) {
        if (e instanceof AxiosError && e.response) {
          setError(e.response.data.code);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
    },
    [setUser, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await signOut();
      setUser(undefined);
      navigate("/", { replace: true });
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setError(e.response.data.code);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [setUser, navigate]);

  const authContextProviderValue = useMemo(
    () => ({ user, setUser, error, signUp, login, logout }),
    [user, setUser, error, signUp, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
