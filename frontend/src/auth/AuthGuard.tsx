import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.context";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" state={{ showAlert: true }} />;
  }
  return <>{children}</>;
}
