import { ReactNode, createContext, useEffect, useState } from "react";
import { Requests } from "../api";
import {
  Diet,
  HospitalFavorite,
  HospitalNote,
  Medication,
  Pet,
} from "../Types/types";
import { useAuthContext } from "./UseContext";
import toast from "react-hot-toast";

type UserDataProvider = {
  userPets: Pet[];
  setUserPets: (userPets: Pet[]) => void;
  currentPet: Pet | undefined;
  setCurrentPet: (pet: Pet) => void;
  petDiets: Diet[];
  setPetDiets: (userDiets: Diet[]) => void;
  petMedications: Medication[];
  setPetMedications: (medications: Medication[]) => void;
  hospitalFavorites: HospitalFavorite[];
  setHospitalFavorites: (favoriteHospitals: HospitalFavorite[]) => void;
  hospitalNotes: HospitalNote[];
  setHospitalNotes: (hospitalNotes: HospitalNote[]) => void;
  postPet: (pet: Omit<Pet, "id">) => Promise<string>;
  postDiet: (diet: Omit<Diet, "id">) => Promise<string>;
  postMedication: (medication: Omit<Medication, "id">) => Promise<string>;
  postHospitalFavorite: (userId: number, hospitalId: number) => Promise<string>;
  postHospitalNote: (hospitalNote: Omit<HospitalNote, "id">) => Promise<string>;
  patchHospitalNote: (hospitalNote: HospitalNote) => Promise<string>;
  putDiet: (diet: Diet) => Promise<string>;
  putMedication: (medication: Medication) => Promise<string>;
  putPet: (pet: Pet) => Promise<string>;
  deleteDiet: (diet: Diet) => Promise<string>;
  deleteMedication: (medication: Medication) => Promise<string>;
  deleteHospitalFavorite: (
    hospitalFavorite: HospitalFavorite
  ) => Promise<string>;
  deleteHospitalNote: (hospitalNote: HospitalNote) => Promise<string>;
  deletePet: (pet: Pet) => Promise<string>;
};

export const UserDataContext = createContext<UserDataProvider | null>(null);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [currentPet, setCurrentPet] = useState<Pet | undefined>(undefined);
  const [petDiets, setPetDiets] = useState<Diet[]>([]);
  const [petMedications, setPetMedications] = useState<Medication[]>([]);
  const [hospitalFavorites, setHospitalFavorites] = useState<
    HospitalFavorite[]
  >([]);
  const [hospitalNotes, setHospitalNotes] = useState<HospitalNote[]>([]);
  const { user, setIsLoading } = useAuthContext();

  const postPet = (pet: Omit<Pet, "id">) => {
    return Requests.postPet(pet)
      .then(() => getPets(pet.userId))
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

  const postHospitalNote = (hospitalNote: Omit<HospitalNote, "id">) => {
    return Requests.postHospitalNote(hospitalNote)
      .then(() => getHospitalNotes(hospitalNote.userId))
      .then(() => toast.success("Added note to selected hospital"));
  };

  const patchHospitalNote = (hospitalNote: HospitalNote) => {
    return Requests.patchHospitalNote(hospitalNote.id, hospitalNote.note)
      .then(() => getHospitalNotes(hospitalNote.userId))
      .then(() => toast.success("Updated hospital note"));
  };

  const putDiet = (diet: Diet) => {
    return Requests.putDiet(diet)
      .then(() => getPetDiets(diet.petId))
      .then(() => toast.success("Updated diet"));
  };

  const putMedication = (medication: Medication) => {
    return Requests.putMedication(medication)
      .then(() => getPetMedications(medication.petId))
      .then(() => toast.success("Updated medication"));
  };

  const putPet = (pet: Pet) => {
    return Requests.putPet(pet)
      .then(() => getPets(pet.userId))
      .then(() => toast.success("Updated pet"));
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

  const deleteHospitalNote = (hospitalNote: HospitalNote) => {
    return Requests.deleteHospitalNote(hospitalNote.id)
      .then(() => getHospitalNotes(hospitalNote.userId))
      .then(() => toast.success("Deleted hospital note"));
  };

  const deletePet = (pet: Pet) => {
    return Requests.deletePet(pet.id)
      .then(() => getPets(pet.userId))
      .then(() => toast.success("Deleted pet profile"));
  };

  const getUserHospitalFavorites = (userId: number) => {
    return Requests.getUserHospitalFavorites(userId)
      .then((hospitalFavorites) => setHospitalFavorites(hospitalFavorites))
      .catch((e) => {
        console.error(e);
        toast.error("Unable to display user hospital favorites");
      });
  };

  const getHospitalNotes = (userId: number) => {
    return Requests.getUserHospitalNotes(userId)
      .then((hospitalNotes) => setHospitalNotes(hospitalNotes))
      .catch((e) => {
        console.error(e);
        toast.error("Unable to display hospital notes");
      });
  };

  const getPets = (userId: number) => {
    return Requests.getPets(userId)
      .then((pets) => setUserPets(pets))
      .catch((e) => {
        console.error(e);
        toast.error("Unable to display pets");
      });
  };

  const getPetDiets = (petId: number) => {
    return Requests.getDiets(petId)
      .then((diets) => setPetDiets(diets))
      .catch((e) => {
        console.error(e);
        toast.error("Unable to display pet diets");
      });
  };

  const getPetMedications = (petId: number) => {
    return Requests.getMedications(petId)
      .then((medications) => setPetMedications(medications))
      .catch((e) => {
        console.error(e);
        toast.error("Unable to display pet medications");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      getPets(user.id);
      getUserHospitalFavorites(user.id);
      getHospitalNotes(user.id);
    }
    if (currentPet) {
      getPetDiets(currentPet.id);
      getPetMedications(currentPet.id);
    }
    setIsLoading(false);
  }, [user, currentPet, setIsLoading]);

  return (
    <>
      <UserDataContext.Provider
        value={{
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
          hospitalNotes,
          setHospitalNotes,
          postPet,
          postDiet,
          postMedication,
          postHospitalFavorite,
          postHospitalNote,
          patchHospitalNote,
          putDiet,
          putMedication,
          putPet,
          deleteDiet,
          deleteMedication,
          deleteHospitalFavorite,
          deleteHospitalNote,
          deletePet,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </>
  );
};
