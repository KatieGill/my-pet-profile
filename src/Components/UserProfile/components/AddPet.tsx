import { ImageCredits } from "./ImageCredits";
import { PetForm } from "./PetForm";

export const AddPet = () => {
  return (
    <>
      <div className="form-container">
        <h2>Add a pet to your profile</h2>
        <PetForm
          isEdit={false}
          name={""}
          species={"dog"}
          breed={"Mixed / Other"}
          image={""}
          dob={"" as unknown as Date}
          petId={null}
        />
      </div>
      <ImageCredits />
    </>
  );
};
