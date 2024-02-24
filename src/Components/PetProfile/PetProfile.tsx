import "./pet-profile.css";
import { PetInformation } from "../../Types/types";
import { Link, useLoaderData } from "react-router-dom";
import { DietCard } from "./components/DietCard";
import { MedicationCard } from "./components/MedicationCard";
import { calculateAge, calculateBirthday } from "../../utils/functions";
import { useEffect } from "react";
import { useAuthContext, usePetDataContext } from "../../Providers/UseContext";

export const PetProfile = () => {
  const { name, breed, image, dob, diets, medications } =
    useLoaderData() as PetInformation;
  const { petDiets, setPetDiets, petMedications, setPetMedications } =
    usePetDataContext();
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
        <div className="logo-small">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div className="nav-buttons">
          <div className="btn">
            <Link to="edit-pet">
              <span className="navigation-title">Edit Pet</span>
              <span className="navigation-icon">
                <i className="fa-regular fa-pen-to-square" title="edit pet"></i>
              </span>
            </Link>
          </div>
          <div className="btn">
            <Link to={`/user-profile/${user?.username}`}>
              <span className="navigation-title"> Home</span>
              <span className="navigation-icon">
                <i className="fa-solid fa-house" title="home"></i>
              </span>
            </Link>
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
          <Link to="add-diet">Add new diet</Link>
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
          <Link to="add-medication">Add new medication</Link>
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
