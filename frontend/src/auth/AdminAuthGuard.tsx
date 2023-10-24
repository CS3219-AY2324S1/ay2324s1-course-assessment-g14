import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.context";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AdminAuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  if (user?.role !== "admin") {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
}
