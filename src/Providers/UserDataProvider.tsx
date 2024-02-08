import { ReactNode, createContext, useEffect, useState } from "react";
import { Requests } from "../api";
import {
  Diet,
  Hospital,
  HospitalFavorite,
  HospitalNote,
  Medication,
  Pet,
} from "../Types/types";
import { useAuthContext } from "./UseContext";
import toast from "react-hot-toast";

type UserDataProvider = {
  getUserPets: (userId: string) => Promise<void>;
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
  getUserHospitalFavorites: (useId: string) => Promise<void>;
  getPetDiets: (petId: string) => Promise<void>;
  getPetMedications: (petId: string) => Promise<void>;
  postPet: (pet: Omit<Pet, "id">) => Promise<string>;
  postDiet: (diet: Omit<Diet, "id">) => Promise<string>;
  postMedication: (medication: Omit<Medication, "id">) => Promise<string>;
  postHospitalFavorite: (userId: number, hospitalId: number) => Promise<string>;
  postHospitalNote: (hospitalNote: Omit<HospitalNote, "id">) => Promise<string>;
  patchHospitalNote: (hospitalNote: HospitalNote) => Promise<string>;
  putDiet: (diet: Diet) => Promise<string>;
  putMedication: (medication: Medication) => Promise<string>;
  putPet: (pet: Pet) => Promise<void>;
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
  const { user } = useAuthContext();

  const getUserPets = async (userId: string) => {
    const userPets = await Requests.getPets(userId);
    setUserPets(userPets);
  };

  const getUserHospitalFavorites = async (userId: string) => {
    const userHospitalFavorites = await Requests.getUserHospitalFavorites(
      userId
    );
    const allHospitals = await Requests.getHospitals();
    const hospitalFavoritesIds = userHospitalFavorites.map(
      (favorite) => favorite.hospitalId
    );

    const hospitalFavorites = hospitalFavoritesIds.map((favoriteId) => {
      return allHospitals.find((hospital) => hospital.id === favoriteId);
    }) as Hospital[];
    setHospitalFavorites(hospitalFavorites);
  };

  const getPetDiets = async (petId: string) => {
    const petDiets = await Requests.getDiets(petId);
    setPetDiets(petDiets);
  };

  const getPetMedications = async (petId: string) => {
    const petMedications = await Requests.getMedications(petId);
    setPetMedications(petMedications);
  };

  const getUserHospitalNotes = async (userId: string) => {
    const hospitalNotes = await Requests.getUserHospitalNotes(userId);
    setHospitalNotes(hospitalNotes);
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
      .then(() => Requests.getUserHospitalFavorites(userId))
      .then((hospitalFavorites) => setHospitalFavorites(hospitalFavorites))
      .then(() => toast.success("Added hospital to your favorites list"));
  };

  const postHospitalNote = (hospitalNote: Omit<HospitalNote, "id">) => {
    return Requests.postHospitalNote(hospitalNote)
      .then(() => Requests.getUserHospitalNotes(hospitalNote.userId))
      .then((hospitalNotes) => setHospitalNotes(hospitalNotes))
      .then(() => toast.success("Added note to selected hospital"));
  };

  const patchHospitalNote = (hospitalNote: HospitalNote) => {
    return Requests.patchHospitalNote(hospitalNote.id, hospitalNote.note)
      .then(() => Requests.getUserHospitalNotes(hospitalNote.userId))
      .then((hospitalNotes) => setHospitalNotes(hospitalNotes))
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
    return Requests.putPet(pet).then(() => {
      getUserPets(pet.userId);
      toast.success("Updated pet");
    });
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
      .then(() => Requests.getUserHospitalFavorites(hospitalFavorite.userId))
      .then((hospitalFavorites) => setHospitalFavorites(hospitalFavorites))
      .then(() => toast.success("Removed hospital from your favorites list"));
  };

  const deleteHospitalNote = (hospitalNote: HospitalNote) => {
    return Requests.deleteHospitalNote(hospitalNote.id)
      .then(() => Requests.getUserHospitalNotes(hospitalNote.userId))
      .then((hospitalNotes) => setHospitalNotes(hospitalNotes))
      .then(() => toast.success("Deleted hospital note"))
      .catch((e) => {
        console.error(e);
        toast.error("Unable to delete note");
      });
  };

  const deletePet = (pet: Pet) => {
    return Requests.deletePet(pet.id)
      .then(() => getUserPets(pet.userId))
      .then(() => toast.success("Deleted pet profile"));
  };

  useEffect(() => {
    if (user) {
      setUserPets(user.pets);
      setHospitalFavorites(user.hospitalFavorites);
      setHospitalNotes(user.hospitalNotes);
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
          hospitalNotes,
          setHospitalNotes,
          getPetDiets,
          getPetMedications,
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
