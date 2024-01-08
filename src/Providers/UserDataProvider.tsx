import { ReactNode, createContext, useEffect, useState } from "react";
import { Requests } from "../api";
import { Diet, Hospital, HospitalFavorite, Medication, Pet } from "../types";
import { useAuthContext } from "./UseContext";
import toast from "react-hot-toast";

type UserDataProvider = {
  getUserPets: (userId: number) => void;
  userPets: Pet[];
  setUserPets: (userPets: Pet[]) => void;
  currentPet: Pet | undefined;
  setCurrentPet: (pet: Pet) => void;
  petDiets: Diet[];
  setPetDiets: (userDiets: Diet[]) => void;
  petMedications: Medication[];
  setPetMedications: (medications: Medication[]) => void;
  hospitalFavorites: Hospital[];
  setHospitalFavorites: (favoriteHospitals: Hospital[]) => void;
  getUserHospitalFavorites: (useId: number) => Promise<void>;
  getPetDiets: (petId: number) => Promise<void>;
  getPetMedications: (petId: number) => Promise<void>;
  postPet: (pet: Omit<Pet, "id">) => Promise<string>;
  postDiet: (diet: Omit<Diet, "id">) => Promise<string>;
  postMedication: (medication: Omit<Medication, "id">) => Promise<string>;
  postHospitalFavorite: (userId: number, hospitalId: number) => Promise<string>;
  deleteDiet: (diet: Diet) => Promise<string>;
  deleteMedication: (medication: Medication) => Promise<string>;
  deleteHospitalFavorite: (
    hospitalFavorite: HospitalFavorite
  ) => Promise<string>;
};

export const UserDataContext = createContext<UserDataProvider>(
  {} as UserDataProvider
);
export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [currentPet, setCurrentPet] = useState<Pet | undefined>(undefined);
  const [petDiets, setPetDiets] = useState<Diet[]>([]);
  const [petMedications, setPetMedications] = useState<Medication[]>([]);
  const [hospitalFavorites, setHospitalFavorites] = useState<Hospital[]>([]);

  const { user } = useAuthContext();

  const getUserPets = async (userId: number) => {
    const userPets = await Requests.getPets(userId);
    setUserPets(userPets);
  };

  const getUserHospitalFavorites = async (userId: number) => {
    const userHospitalFavorites = await Requests.getUserHospitalFavorites(
      userId
    );
    const allHospitals = await Requests.getHospitals();
    const hospitalFavoritesIds = userHospitalFavorites.map(
      (favorite) => favorite.hospitalId
    );

    const hospitalFavorites = hospitalFavoritesIds.map((favoriteId) => {
      return allHospitals.find((hospital) => hospital.id === favoriteId);
    });
    setHospitalFavorites(hospitalFavorites);
  };

  const getPetDiets = async (petId: number) => {
    const petDiets = await Requests.getDiets(petId);
    setPetDiets(petDiets);
  };

  const getPetMedications = async (petId: number) => {
    const petMedications = await Requests.getMedications(petId);
    setPetMedications(petMedications);
  };

  const postPet = (pet: Omit<Pet, "id">) => {
    return Requests.postPet(pet)
      .then(() => getUserPets(pet.userId))
      .then(() => toast.success(`Created ${pet.name}'s profile!`));
  };

  const postDiet = (diet: Omit<Diet, "id">) => {
    return Requests.postDiet(diet)
      .then(() => getPetDiets(diet.petId))
      .then(() => toast.success("Added diet to your pet's profile"));
  };

  const postMedication = (medication: Omit<Medication, "id">) => {
    return Requests.postMedication(medication)
      .then(() => getPetMedications(medication.petId))
      .then(() => toast.success("Added medication to your pet's profile"));
  };

  const postHospitalFavorite = (userId: number, hospitalId: number) => {
    return Requests.postHospitalFavorite({
      userId: userId,
      hospitalId: hospitalId,
    })
      .then(() => getUserHospitalFavorites(userId))
      .then(() => toast.success("Added hospital to your favorites list"));
  };

  const deleteDiet = (diet: Diet) => {
    return Requests.deleteDiet(diet.id)
      .then(() => getPetDiets(diet.petId))
      .then(() => toast.success("Deleted diet from your pet's profile"));
  };

  const deleteMedication = (medication: Medication) => {
    return Requests.deleteMedication(medication.id)
      .then(() => getPetMedications(medication.petId))
      .then(() => toast.success("Deleted medication from your pet's profile"));
  };

  const deleteHospitalFavorite = (hospitalFavorite: HospitalFavorite) => {
    return Requests.deleteHospitalFavorite(hospitalFavorite.id)
      .then(() => getUserHospitalFavorites(hospitalFavorite.userId))
      .then(() => toast.success("Removed hospital from your favorites list"));
  };

  useEffect(() => {
    if (user) {
      getUserPets(user.id);
      getUserHospitalFavorites(user.id);
    }
    if (currentPet) {
      getPetDiets(currentPet.id);
      getPetMedications(currentPet.id);
    }
  }, [user, currentPet]);

  return (
    <>
      <UserDataContext.Provider
        value={{
          getUserPets,
          userPets,
          setUserPets,
          currentPet,
          setCurrentPet,
          petDiets,
          setPetDiets,
          petMedications,
          setPetMedications,
          hospitalFavorites,
          setHospitalFavorites,
          getUserHospitalFavorites,
          getPetDiets,
          getPetMedications,
          postPet,
          postDiet,
          postMedication,
          postHospitalFavorite,
          deleteDiet,
          deleteMedication,
          deleteHospitalFavorite,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </>
  );
};
