import { ReactNode, createContext, useEffect, useState } from "react";
import { Requests } from "../api";
import { HospitalFavorite, HospitalNote, Pet } from "../Types/types";
import { useAuthContext } from "./UseContext";
import toast from "react-hot-toast";

type UserDataProvider = {
  userPets: Pet[];
  setUserPets: (userPets: Pet[]) => void;
  hospitalFavorites: HospitalFavorite[];
  setHospitalFavorites: (favoriteHospitals: HospitalFavorite[]) => void;
  hospitalNotes: HospitalNote[];
  setHospitalNotes: (hospitalNotes: HospitalNote[]) => void;
  postPet: (pet: Omit<Pet, "id">) => Promise<string>;
  postHospitalFavorite: (userId: number, hospitalId: number) => Promise<string>;
  postHospitalNote: (hospitalNote: Omit<HospitalNote, "id">) => Promise<string>;
  patchHospitalNote: (hospitalNote: HospitalNote) => Promise<string>;
  putPet: (pet: Pet) => Promise<string>;
  deleteHospitalFavorite: (
    hospitalFavorite: HospitalFavorite
  ) => Promise<string>;
  deleteHospitalNote: (hospitalNote: HospitalNote) => Promise<string>;
  deletePet: (pet: Pet) => Promise<string>;
};

export const UserDataContext = createContext<UserDataProvider | null>(null);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
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

  const putPet = (pet: Pet) => {
    return Requests.putPet(pet)
      .then(() => getPets(pet.userId))
      .then(() => toast.success("Updated pet"));
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

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      getPets(user.id);
      getUserHospitalFavorites(user.id);
      getHospitalNotes(user.id);
    }

    setIsLoading(false);
  }, [user, setIsLoading]);

  return (
    <>
      <UserDataContext.Provider
        value={{
          userPets,
          setUserPets,
          hospitalFavorites,
          setHospitalFavorites,
          hospitalNotes,
          setHospitalNotes,
          postPet,
          postHospitalFavorite,
          postHospitalNote,
          patchHospitalNote,
          putPet,
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
