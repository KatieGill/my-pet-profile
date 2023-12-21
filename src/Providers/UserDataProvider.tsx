import { ReactNode, createContext, useEffect, useState } from "react";
import { Requests } from "../api";
import { Pet } from "../types";
import { useAuthContext } from "./UseContext";

type UserDataProvider = {
  getUserPets: (userId: number) => void;
  userPets: Pet[];
  setUserPets: (userPets: Pet[]) => void;
};

export const UserDataContext = createContext<UserDataProvider>(
  {} as UserDataProvider
);
export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const { user } = useAuthContext();

  const getUserPets = async (userId: number) => {
    const userPets = await Requests.getPets(userId);
    setUserPets(userPets);
  };

  useEffect(() => {
    if (user) {
      getUserPets(user.id);
    }
  }, [user]);

  return (
    <>
      <UserDataContext.Provider value={{ getUserPets, userPets, setUserPets }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};
