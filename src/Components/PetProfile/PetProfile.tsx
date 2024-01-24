import "./pet-profile.css";
import { useLocation } from "react-router";
import { Pet } from "../../Types/types";
import { Link } from "react-router-dom";
import { DietCard } from "./components/DietCard";
import { MedicationCard } from "./components/MedicationCard";
import { useEffect } from "react";
import { useUserDataContext } from "../../Providers/UseContext";
import { calculateAge, calculateBirthday } from "../../utils/functions";

export const PetProfile = () => {
  const location = useLocation();
  const { pet } = location.state;
  const { id, name, breed, image, dob } = pet as Pet;
  const { setCurrentPet, petDiets, petMedications } = useUserDataContext();
  const age = calculateAge(dob);
  const birthday = calculateBirthday(dob);

  useEffect(() => {
    setCurrentPet(pet);
  }, [pet, setCurrentPet]);

  return (
    <>
      <nav className="nav">
        <div className="logo-small">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div className="nav-buttons">
          <div className="btn">
            <Link to="/edit-pet" state={{ pet }}>
              Edit Pet
            </Link>
          </div>
          <div className="btn">
            <Link to="/user-profile">Home</Link>
          </div>
        </div>
      </nav>

      <div className="container pet-profile-container">
        <div>
          <h2>{name}</h2>
        </div>
        <div className="pet-info-container">
          <div className="profile-img">
            <img src={image} alt="profile image" />
          </div>
          <div className="pet-data">
            <div>Breed: {breed}</div>
            <div>Birthday: {birthday}</div>
            <div>Age: {age}</div>
          </div>
        </div>
      </div>

      <div className="diet-container container container-sm">
        <div className="btn cards-nav">
          <Link to="/add-diet" state={{ petId: id, petName: name }}>
            Add new diet
          </Link>
        </div>
        <h3>{`${name}'s Diet:`}</h3>
        <div className="cards-container">
          {petDiets.length > 0 ? (
            <DietCard dietArray={petDiets} />
          ) : (
            <div>{name} does not have any diets yet</div>
          )}
        </div>
      </div>

      <div className="meds-container container container-sm">
        <div className="btn cards-nav">
          <Link to="/add-medication" state={{ petId: id, petName: name }}>
            Add new medication
          </Link>
        </div>
        <h3>{`${name}'s Medications:`}</h3>
        <div className="cards-container">
          {petMedications.length > 0 ? (
            <MedicationCard medicationArray={petMedications} />
          ) : (
            <div>{name} does not have any medications yet</div>
          )}
        </div>
      </div>
    </>
  );
};
