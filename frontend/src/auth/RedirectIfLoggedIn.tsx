import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.context";

interface RedirectIfLoggedInProps {
  children: ReactNode;
}

export default function RedirectIfLoggedIn({ children }: RedirectIfLoggedInProps) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
}
