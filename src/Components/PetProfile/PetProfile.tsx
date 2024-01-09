import { useLocation } from "react-router";
import { Pet } from "../../Types/types";
import { Link, useNavigate } from "react-router-dom";
import { Diets } from "./components/Diets";
import { Medications } from "./components/Medications";
import { useEffect } from "react";
import { useUserDataContext } from "../../Providers/UseContext";

export const PetProfile = () => {
  const location = useLocation();
  const { pet } = location.state;
  const { id, name, userId, species, breed, image, dob } = pet as Pet;
  const { setCurrentPet, petDiets, petMedications, deletePet } =
    useUserDataContext();

  useEffect(() => {
    setCurrentPet(pet);
  }, [pet, setCurrentPet]);

  const calculateAge = (dob: Date) => {
    const today = new Date();
    const dateOfBirth = dob;

    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(dob);
  const navigate = useNavigate();

  return (
    <>
      <Link to="/delete-pet-profile" state={{ pet }}>
        Delete Pet Profile
      </Link>
      <div>{name}</div>
      <div className="profile-img">
        <img src={image} alt="profile image" />
      </div>
      <div>
        <div>Breed: {breed}</div>
        <div>Age: {age}</div>
      </div>
      <div className="diet-container">
        <h3>{`${name}'s Diet:`}</h3>
        <Link to="/add-diet" state={{ petId: id }}>
          Add new diet
        </Link>
        {petDiets.length > 0 ? (
          <Diets dietArray={petDiets} />
        ) : (
          <div>{name} does not have any diets yet</div>
        )}
      </div>
      <div className="meds-container">
        <h3>{`${name}'s Medications:`}</h3>
        <Link to="/add-medication" state={{ petId: id }}>
          Add new medication
        </Link>
        {petMedications.length > 0 ? (
          <Medications medicationArray={petMedications} />
        ) : (
          <div>{name} does not have any medications yet</div>
        )}
      </div>
      <Link to="/user-profile">Home</Link>
    </>
  );
};
