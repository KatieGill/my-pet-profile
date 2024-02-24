import { useLoaderData } from "react-router-dom";
import { DietForm } from "./DietForm";
import { PetInformation } from "../../../Types/types";

export const AddDiet = () => {
  const { id, name } = useLoaderData() as PetInformation;

  return (
    <div className="form-container pet-data-form">
      <h3>Add a new diet for {name}</h3>
      <DietForm
        isEdit={false}
        name={""}
        amount={""}
        frequency={""}
        petId={id}
        dietId={null}
      />
    </div>
  );
};
