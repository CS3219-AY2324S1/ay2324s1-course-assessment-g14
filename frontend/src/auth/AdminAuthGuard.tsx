import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.context";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AdminAuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  if (user?.role !== "admin" && user?.role !== "maintainer") {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
