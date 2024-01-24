import { useLocation } from "react-router-dom";
import { MedicationForm } from "./MedicationForm";

export const AddMedication = () => {
  const location = useLocation();
  const { petId, petName } = location.state;

  return (
    <div className="form-container pet-data-form">
      <h3>Add a new medication for {petName}</h3>
      <MedicationForm
        isEdit={false}
        name={""}
        amount={""}
        frequency={""}
        note={undefined}
        petId={petId}
        medId={null}
      />
    </div>
  );
};
