import { Requests } from "./api";

export const petProfileLoader = async ({ params }) => {
  const id = +params.petId;

  return await Requests.getCurrentPetInfo(id);
};

export const petDietLoader = async ({ params }) => {
  const id = +params.dietId;
  return await Requests.getCurrentDiet(id);
};

export const petMedicationLoader = async ({ params }) => {
  const id = +params.medicationId;
  return await Requests.getCurrentMedication(id);
};

export const hospitalNoteLoader = async ({ params }) => {
  const id = +params.hospitalNoteId;
  return await Requests.getCurrentHospitalNote(id);
};

export const userProtectedRouteLoader = async ({ params }) => {
  const username = params.username;
  return await Requests.getUserByUsername(username);
};

export const petProtectedRouteLoader = async ({ params }) => {
  const id = +params.petId;
  return await Requests.getCurrentPetInfo(id);
};
