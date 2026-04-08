import { useAuth } from "@/hooks/useAuth";
import { useLoader } from "@/stores/loader-store";
import { Redirect } from "expo-router";
import { ReactNode } from "react";
import { Loader } from "../loader";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading } = useLoader();
  const { isAuthenticated } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Redirect href="/(login)" />;

  return <>{children}</>;
}
