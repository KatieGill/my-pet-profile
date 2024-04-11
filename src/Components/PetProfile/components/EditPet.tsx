import { PetInformation } from "../../../Types/types";
import { Link, useLoaderData } from "react-router-dom";
import { PetForm } from "../../UserProfile/components/PetForm";
import { ImageCredits } from "../../UserProfile/components/ImageCredits";

export const EditPet = () => {
  const { id, name, species, breed, image, dob } =
    useLoaderData() as PetInformation;

  return (
    <>
      <div className="form-container">
        <h2>Edit Profile for {name}</h2>
        <PetForm
          isEdit={true}
          name={name}
          species={species}
          breed={breed}
          image={image}
          dob={dob}
          petId={id}
        />
      </div>
      <div className="btn cards-nav delete-pet">
        <Link to="delete-pet-profile">Delete Pet Profile</Link>
      </div>
      <ImageCredits />
    </>
  );
};
