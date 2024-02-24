import { ReactNode, createContext, useState } from "react";
import { Diet, Medication } from "../Types/types";
import toast from "react-hot-toast";
import { Requests } from "../api";

type PetDataProvider = {
  petDiets: Diet[];
  setPetDiets: (petDiets: Diet[]) => void;
  petMedications: Medication[];
  setPetMedications: (petMedications: Medication[]) => void;
  postDiet: (diet: Omit<Diet, "id">) => Promise<string>;
  postMedication: (medication: Omit<Medication, "id">) => Promise<string>;
  putDiet: (diet: Diet) => Promise<string>;
  putMedication: (medication: Medication) => Promise<string>;
  deleteDiet: (diet: Diet) => Promise<string>;
  deleteMedication: (medication: Medication) => Promise<string>;
};

export const PetDataContext = createContext<PetDataProvider | null>(null);

export const PetDataProvider = ({ children }: { children: ReactNode }) => {
  const [petDiets, setPetDiets] = useState<Diet[]>([]);
  const [petMedications, setPetMedications] = useState<Medication[]>([]);

  const postDiet = (diet: Omit<Diet, "id">) => {
    return Requests.postDiet(diet).then(() =>
      toast.success("Added diet to your pet's profile")
    );
  };

  const postMedication = (medication: Omit<Medication, "id">) => {
    return Requests.postMedication(medication).then(() =>
      toast.success("Added medication to your pet's profile")
    );
  };

  const putDiet = (diet: Diet) => {
    return Requests.putDiet(diet).then(() => toast.success("Updated diet"));
  };

  const putMedication = (medication: Medication) => {
    return Requests.putMedication(medication).then(() =>
      toast.success("Updated medication")
    );
  };

  const deleteDiet = (diet: Diet) => {
    return Requests.deleteDiet(diet.id)
      .then(() => getPetDiets(diet.petId))
      .then(() => toast.success("Deleted diet from your pet's profile"));
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

  const deleteMedication = (medication: Medication) => {
    return Requests.deleteMedication(medication.id)
      .then(() => getPetMedications(medication.petId))
      .then(() => toast.success("Deleted medication from your pet's profile"));
  };

  return (
    <PetDataContext.Provider
      value={{
        petDiets,
        setPetDiets,
        petMedications,
        setPetMedications,
        postDiet,
        postMedication,
        putDiet,
        putMedication,
        deleteDiet,
        deleteMedication,
      }}
    >
      {children}
    </PetDataContext.Provider>
  );
};
