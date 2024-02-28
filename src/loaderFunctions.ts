import { Params } from "react-router-dom";
import { Requests } from "./api";

export const petProfileLoader = async ({
  params,
}: {
  params: Params<"petId">;
}) => {
  if (!params.petId) throw new Error("PetId parameter is undefined");
  const id = +params.petId;

  return await Requests.getCurrentPetInfo(id);
};

export const petDietLoader = async ({
  params,
}: {
  params: Params<"dietId">;
}) => {
  if (!params.dietId) throw new Error("DietId parameter is undefined");
  const id = +params.dietId;
  return await Requests.getCurrentDiet(id);
};

export const petMedicationLoader = async ({
  params,
}: {
  params: Params<"medicationId">;
}) => {
  if (!params.medicationId)
    throw new Error("MedicationId parameter is undefined");
  const id = +params.medicationId;
  return await Requests.getCurrentMedication(id);
};

export const hospitalNoteLoader = async ({
  params,
}: {
  params: Params<"hospitalNoteId">;
}) => {
  if (!params.hospitalNoteId)
    throw new Error("HospitalNoteId parameter is undefined");
  const id = +params.hospitalNoteId;
  return await Requests.getCurrentHospitalNote(id);
};

export const userProtectedRouteLoader = async ({
  params,
}: {
  params: Params<"username">;
}) => {
  if (!params.username) throw new Error("Username parameter is undefined");
  const username = params.username;
  return await Requests.getUserByUsername(username);
};

export const petProtectedRouteLoader = async ({
  params,
}: {
  params: Params<"petId">;
}) => {
  if (!params.petId) throw new Error("PetId parameter is undefined");
  const id = +params.petId;
  return await Requests.getCurrentPetInfo(id);
};
