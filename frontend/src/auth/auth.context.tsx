import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { User } from "firebase/auth";
import { deleteUser, registerUser, signIn, signOut } from "../api/auth";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { createAdminUser, createUser, getUser, UserModel } from "../api/user";

interface AuthContextData {
  user: UserModel | undefined;
  setUser: any | undefined;
  activeUser: User | undefined;
  error: string;
  success: boolean;
  signUp: (email: string, password: string) => void;
  signUpAdmin: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  removeAccount: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  user: undefined,
  setUser: undefined,
  activeUser: undefined,
  error: "",
  success: false,
  signUp: (email: string, password: string) => undefined,
  signUpAdmin: (email: string, password: string) => undefined,
  login: (email: string, password: string) => undefined,
  logout: () => undefined,
  removeAccount: () => undefined,
});

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", undefined);
  const [activeUser, setActiveUser] = useState<User>();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const response = await registerUser({
        email: email,
        password: password,
      });
      const u: User = response.data.user.user;
      const token: string = response.data.token;
      if (!u.email) {
        throw new Error("user returned without email");
      }
      await createUser(u.email, token);
      setSuccess(true);
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setError(e.response.data);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, []);

  const signUpAdmin = useCallback(async (email: string, password: string) => {
    try {
      const response = await registerUser({
        email: email,
        password: password,
      });
      const u: User = response.data.user.user;
      const token: string = response.data.token;
      if (!u.email) {
        throw new Error("user returned without email");
      }
      await createAdminUser(u.email, token);
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setError(e.response.data);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await signIn({ email: email, password: password });
        const u: User = response.data.user;
        if (!u.email) {
          throw new Error("user returned without email");
        }
        setActiveUser(u);
        const fetchedUser = await getUser(u.email);
        setUser(fetchedUser.data);
        navigate("/home", { replace: true });
      } catch (e) {
        if (e instanceof AxiosError && e.response) {
          setError(e.response.data);
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
      setActiveUser(undefined);
      navigate("/", { replace: true });
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setError(e.response.data);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [setUser, navigate]);

  const removeAccount = useCallback(async () => {
    try {
      await deleteUser();
      setUser(undefined);
      setActiveUser(undefined);
      navigate("/", { replace: true });
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setError(e.response.data);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [setUser, navigate]);

  const authContextProviderValue = useMemo(
    () => ({
      user,
      setUser,
      activeUser,
      error,
      success,
      signUp,
      signUpAdmin,
      login,
      logout,
      removeAccount,
    }),
    [
      user,
      setUser,
      activeUser,
      error,
      success,
      signUp,
      signUpAdmin,
      login,
      logout,
      removeAccount,
    ]
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
