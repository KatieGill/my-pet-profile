import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../../Providers/UseContext";
import { LoadingElement } from "../../LoadingElement";
import { AuthState, UserInformation } from "../../Types/types";
import { useParams } from "react-router-dom";
import { NoAuthError } from "../../NoAuthError";

export const ProtectedRouteUser = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuthContext();
  const [authState, setAuthState] = useState<AuthState>("loading");
  const { username } = useParams();

  useEffect(() => {
    const calculateAuthState = (
      user: UserInformation | null,
      isLoading: boolean
    ): AuthState => {
      if (isLoading) return "loading";
      else if (user === null || user.username !== username)
        return "unauthenticated";
      else return "authenticated";
    };
    const authState = calculateAuthState(user, isLoading);
    setAuthState(authState);
  }, [isLoading, setAuthState, user, username]);

  if (authState === "authenticated") return <>{children}</>;
  else if (authState === "loading") return <LoadingElement />;
  else return <NoAuthError />;
};
