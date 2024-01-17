import "./pet-profile.css";
import { useLocation } from "react-router";
import { Pet } from "../../Types/types";
import { Link } from "react-router-dom";
import { Diets } from "./components/Diets";
import { Medications } from "./components/Medications";
import { useEffect } from "react";
import { useUserDataContext } from "../../Providers/UseContext";

export const PetProfile = () => {
  const location = useLocation();
  const { pet } = location.state;
  const { id, name, userId, species, breed, image, dob } = pet as Pet;
  const { setCurrentPet, petDiets, petMedications } = useUserDataContext();

  useEffect(() => {
    setCurrentPet(pet);
  }, [pet, setCurrentPet]);

  const calculateBirthday = (dob: Date) => {
    const dateOfBirth = new Date(`${dob} GMT-0500`);
    const dobYear = dateOfBirth.getFullYear();
    const dobMonth = dateOfBirth.getMonth();
    const dobDate = dateOfBirth.getDate();
    let month;
    switch (dobMonth) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }
    return `${month} ${dobDate}, ${dobYear}`;
  };

  const calculateAge = (dob: Date) => {
    const today = new Date();
    const dateOfBirth = new Date(`${dob} GMT-0500`);
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    const dobYear = dateOfBirth.getFullYear();
    const dobMonth = dateOfBirth.getMonth();
    const dobDate = dateOfBirth.getDate();
    let years = todayYear - dobYear;
    let months = 0;
    let days = 0;
    if (todayMonth >= dobMonth) {
      months = todayMonth - dobMonth;
    } else {
      years--;
      months = 12 + todayMonth - dobMonth;
    }
    if (todayDate >= dobDate) {
      days = todayDate - dobDate;
    } else {
      months--;
      days = 31 + todayDate - dobDate;
    }
    return `${years} years ${months} months ${days} days`;
  };

  const age = calculateAge(dob);
  const birthday = calculateBirthday(dob);

  return (
    <>
      <nav className="nav">
        <div className="btn">
          <Link to="/delete-pet-profile" state={{ pet }}>
            Delete Pet Profile
          </Link>
        </div>

        <div className="btn">
          <Link to="/edit-pet" state={{ pet }}>
            Edit Pet
          </Link>
        </div>
        <div className="btn">
          <Link to="/user-profile">Home</Link>
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
            <Diets dietArray={petDiets} />
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
            <Medications medicationArray={petMedications} />
          ) : (
            <div>{name} does not have any medications yet</div>
          )}
        </div>
      </div>
    </>
  );
};
