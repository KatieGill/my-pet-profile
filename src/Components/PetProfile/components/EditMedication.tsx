import { useLoaderData } from "react-router-dom";
import { Medication } from "../../../Types/types";
import { MedicationForm } from "./MedicationForm";

export const EditMedication = () => {
  const { id, petId, name, amount, frequency, note } =
    useLoaderData() as Medication;

  return (
    <div className="form-container">
      <h3>Edit the Selected Medication</h3>
      <MedicationForm
        isEdit={true}
        name={name}
        amount={amount}
        frequency={frequency}
        note={note}
        petId={petId}
        medId={id}
      />
    </div>
  );
};
