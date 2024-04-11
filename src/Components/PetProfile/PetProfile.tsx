import "./pet-profile.css";
import { PetInformation } from "../../Types/types";
import { Link, useLoaderData } from "react-router-dom";
import { DietCard } from "./components/DietCard";
import { MedicationCard } from "./components/MedicationCard";
import { calculateAge, calculateBirthday } from "../../utils/functions";
import { useEffect } from "react";
import {
  useAuthContext,
  usePetDataContext,
  useUserDataContext,
} from "../../Providers/UseContext";

export const PetProfile = () => {
  const { name, breed, image, dob, diets, medications } =
    useLoaderData() as PetInformation;
  const { petDiets, setPetDiets, petMedications, setPetMedications } =
    usePetDataContext();
  const { showMenuItems, toggleHamburgerMenu } = useUserDataContext();
  const { user } = useAuthContext();

  const age = calculateAge(dob);
  const birthday = calculateBirthday(dob);

  useEffect(() => {
    setPetDiets(diets);
    setPetMedications(medications);
  }, [diets, medications, setPetDiets, setPetMedications]);

  return (
    <>
      <nav className="nav">
        <div>
          <h3>
            My Pet Profile <i className="fa-solid fa-paw"></i>
          </h3>
        </div>
        <div className="nav-buttons">
          <button className="navigation-icon" onClick={toggleHamburgerMenu}>
            {showMenuItems === "flex" ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
          <div className="btn btn-nav">
            <Link to="edit-pet">Edit Pet</Link>
          </div>
          <div className="btn btn-nav">
            <Link to={`/user-profile/${user?.username}`}>Home</Link>
          </div>
        </div>
      </nav>
      <div className="hamburger-menu" style={{ display: showMenuItems }}>
        <Link to="edit-pet" onClick={toggleHamburgerMenu}>
          Edit Pet
        </Link>
        <Link
          to={`/user-profile/${user?.username}`}
          onClick={toggleHamburgerMenu}
        >
          Home
        </Link>
      </div>
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
        <h3>{`${name}'s Diet:`}</h3>
        <div className="btn cards-nav">
          <Link to="add-diet">Add new diet</Link>
        </div>
        <div className="cards-container">
          {petDiets.length > 0 ? (
            <DietCard dietArray={petDiets} />
          ) : (
            <div>{name} does not have any diets yet</div>
          )}
        </div>
      </div>

      <div className="meds-container container container-sm">
        <h3>{`${name}'s Medications:`}</h3>
        <div className="btn cards-nav">
          <Link to="add-medication">Add new medication</Link>
        </div>
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
