import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.context";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  if (user?.role !== "admin" && user?.role !== "master") {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
