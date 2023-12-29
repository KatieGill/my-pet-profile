import { ReactNode, createContext, useEffect, useState } from "react";
import { Requests } from "../api";
import { Diet, Medication, Pet } from "../types";
import { useAuthContext } from "./UseContext";
import toast from "react-hot-toast";

type UserDataProvider = {
  getUserPets: (userId: number) => void;
  userPets: Pet[];
  setUserPets: (userPets: Pet[]) => void;
  userDiets: Diet[];
  setUserDiets: (userDiets: Diet[]) => void;
  userMedications: Medication[];
  setUserMedications: (medications: Medication[]) => void;
  filterPetDiets: (petId: number) => Diet[];
  filterPetMedications: (petId: number) => Medication[];
  postPet: (pet: Omit<Pet, "id">) => Promise<string>;
  postDiet: (diet: Omit<Diet, "id">) => Promise<string>;
  postMedication: (medication: Omit<Medication, "id">) => Promise<string>;
};

export const UserDataContext = createContext<UserDataProvider>(
  {} as UserDataProvider
);
export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [userDiets, setUserDiets] = useState<Diet[]>([]);
  const [userMedications, setUserMedications] = useState<Medication[]>([]);
  const { user } = useAuthContext();

  const getUserPets = async (userId: number) => {
    const userPets = await Requests.getPets(userId);
    setUserPets(userPets);
  };

  const getUserDiets = async (userId: number) => {
    const userDiets = await Requests.getDiets(userId);
    setUserDiets(userDiets);
  };

  const getUserMedications = async (userId: number) => {
    const userMedications = await Requests.getMedications(userId);
    setUserMedications(userMedications);
  };

  const filterPetDiets = (petId: number) => {
    return userDiets.filter((diet) => diet.petId === petId);
  };

  const filterPetMedications = (petId: number) => {
    return userMedications.filter((medication) => medication.petId === petId);
  };

  const postPet = (pet: Omit<Pet, "id">) => {
    return Requests.postPet(pet)
      .then(() => getUserPets(pet.userId))
      .then(() => toast.success(`Created ${pet.name}'s profile!`));
  };

  const postDiet = (diet: Omit<Diet, "id">) => {
    return Requests.postDiet(diet)
      .then(() => getUserDiets(diet.userId))
      .then(() => toast.success("Added diet to your pet's profile"));
  };

  const postMedication = (medication: Omit<Medication, "id">) => {
    return Requests.postMedication(medication)
      .then(() => getUserMedications(medication.userId))
      .then(() => toast.success("Added medication to your pet's profile"));
  };

  useEffect(() => {
    if (user) {
      getUserPets(user.id);
      getUserDiets(user.id);
      getUserMedications(user.id);
    }
  }, [user]);

  return (
    <>
      <UserDataContext.Provider
        value={{
          getUserPets,
          userPets,
          setUserPets,
          userDiets,
          setUserDiets,
          userMedications,
          setUserMedications,
          filterPetDiets,
          filterPetMedications,
          postPet,
          postDiet,
          postMedication,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </>
  );
};
