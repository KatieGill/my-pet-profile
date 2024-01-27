import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Providers/UseContext";
import { LoadingElement } from "./LoadingElement";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuthContext();
  const navigate = useNavigate();
  if (authState === "authenticated") return <>{children}</>;
  else if (authState === "loading") return <LoadingElement />;
  else navigate("/");
};
