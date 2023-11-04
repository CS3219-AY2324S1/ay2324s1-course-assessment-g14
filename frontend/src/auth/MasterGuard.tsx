import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.context";

interface AuthGuardProps {
  children: ReactNode;
}

export default function MasterGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  if (user?.role !== 'master') {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
