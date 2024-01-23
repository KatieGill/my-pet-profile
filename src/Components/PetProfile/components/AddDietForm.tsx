import { useLocation } from "react-router-dom";
import { DietForm } from "./DietForm";

export const CreateDietForm = () => {
  const location = useLocation();
  const { petId, petName } = location.state;

  return (
    <div className="form-container pet-data-form">
      <h3>Add a new diet for {petName}</h3>
      <DietForm
        isEdit={false}
        name={""}
        amount={""}
        frequency={""}
        petId={petId}
        dietId={null}
      />
    </div>
  );
};
