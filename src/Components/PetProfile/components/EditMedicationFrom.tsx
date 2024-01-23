import { useLocation } from "react-router-dom";
import { Medication } from "../../../Types/types";
import { MedicationForm } from "./MedicationForm";

export const EditMedicationForm = () => {
  const location = useLocation();
  const { medication } = location.state;
  const { id, petId, name, amount, frequency, note } = medication as Medication;

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
