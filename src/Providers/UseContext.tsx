import { useContext } from "react";
import { UserDataContext } from "./UserDataProvider";
import { AuthContext } from "./AuthProvider";
import { PetDataContext } from "./PetDataProvider";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "You should never use this outside of the context of a AuthProvider"
    );
  return context;
};

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error(
      "You should never use this outside of the context of a UserDataProvider"
    );
  }
  return context;
};

export const usePetDataContext = () => {
  const context = useContext(PetDataContext);
  if (!context) {
    throw new Error(
      "You should never use this outside of the context of a PetDataProvider"
    );
  }
  return context;
};
