import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "./Providers/UseContext";
import { LoadingElement } from "./LoadingElement";
import { UserInformation } from "./Types/types";
import { HomePage } from "./Components/HomePage";

type AuthState = "loading" | "unauthenticated" | "authenticated";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuthContext();
  const [authState, setAuthState] = useState<AuthState>("loading");

  const calculateAuthState = (
    user: UserInformation | null,
    isLoading: boolean
  ): AuthState => {
    if (isLoading) return "loading";
    else if (user === null) return "unauthenticated";
    else return "authenticated";
  };

  useEffect(() => {
    const authState = calculateAuthState(user, isLoading);
    setAuthState(authState);
  }, [isLoading, user]);

  if (authState === "authenticated") return <>{children}</>;
  else if (authState === "loading") return <LoadingElement />;
  else return <HomePage />;
};
