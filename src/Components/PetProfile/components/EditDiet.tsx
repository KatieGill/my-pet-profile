import { useLocation } from "react-router-dom";
import { DietForm } from "./DietForm";
import { Diet } from "../../../Types/types";

export const EditDiet = () => {
  const location = useLocation();
  const { diet } = location.state;
  const { id, name, petId, amount, frequency } = diet as Diet;

  return (
    <div className="form-container pet-data-form">
      <h3>Edit the Selected Diet</h3>
      <DietForm
        isEdit={true}
        name={name}
        amount={amount}
        frequency={frequency}
        petId={petId}
        dietId={id}
      />
    </div>
  );
};
