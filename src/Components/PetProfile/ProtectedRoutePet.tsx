import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingElement } from "../../LoadingElement";
import { useAuthContext, useUserDataContext } from "../../Providers/UseContext";
import { AuthState, Pet } from "../../Types/types";
import { NoAuthError } from "../../NoAuthError";

export const ProtectedRoutePet = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useAuthContext();
  const [authState, setAuthState] = useState<AuthState>("loading");
  const { userPets } = useUserDataContext();
  const { petId } = useParams();

  useEffect(() => {
    const findPet = (petId: string | undefined) => {
      if (petId) return userPets.find((pet) => pet.id === +petId);
    };
    const calculateAuthState = (
      pet: Pet | undefined,
      isLoading: boolean
    ): AuthState => {
      if (isLoading) return "loading";
      if (!pet) return "unauthenticated";
      else return "authenticated";
    };
    const pet = findPet(petId);
    const authState = calculateAuthState(pet, isLoading);
    setAuthState(authState);
  }, [isLoading, petId, setAuthState, userPets]);

  if (authState === "authenticated") return <>{children}</>;
  else if (authState === "loading") return <LoadingElement />;
  else return <NoAuthError />;
};
