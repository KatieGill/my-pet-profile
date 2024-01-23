import { Pet } from "../../../Types/types";
import { Link, useLocation } from "react-router-dom";
import { PetForm } from "../../UserProfile/components/PetForm";
import { ImageCredits } from "../../UserProfile/components/ImageCredits";

export const EditPet = () => {
  const location = useLocation();
  const { pet } = location.state;
  const { id, name, species, breed, image, dob } = pet as Pet;

  return (
    <>
      <div className="form-container">
        <div className="btn cards-nav">
          <Link to="/delete-pet-profile" state={{ pet }}>
            Delete Pet Profile
          </Link>
        </div>
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
      <ImageCredits />
    </>
  );
};
