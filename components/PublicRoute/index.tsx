import { useAuth } from "@/stores/auth-store";
import { Redirect } from "expo-router";
import { ReactNode } from "react";
import { Loader } from "../loader";

export function PublicRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const hasHydrated = useAuth((state) => state.hasHydrated);

  if (!hasHydrated) return <Loader />;
  if (isAuthenticated) return <Redirect href="/home" />;

  return <>{children}</>;
}
