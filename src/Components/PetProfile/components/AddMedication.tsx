import { useLoaderData } from "react-router-dom";
import { MedicationForm } from "./MedicationForm";
import { PetInformation } from "../../../Types/types";

export const AddMedication = () => {
  const { id, name } = useLoaderData() as PetInformation;

  return (
    <div className="form-container pet-data-form">
      <h3>Add a new medication for {name}</h3>
      <MedicationForm
        isEdit={false}
        name={""}
        amount={""}
        frequency={""}
        note={undefined}
        petId={id}
        medId={null}
      />
    </div>
  );
};
