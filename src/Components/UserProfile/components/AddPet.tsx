import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { dogBreeds, catBreeds } from "../../../assets/breedLists";
import { dogImages, catImages } from "../../../assets/breedImages";
import { Breed, Species } from "../../../Types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddPet = () => {
  const { user } = useAuthContext();
  const { postPet } = useUserDataContext();
  const [nameInput, setNameInput] = useState<string>("");
  const [speciesInput, setSpeciesInput] = useState<Species>("dog");
  const [breedInput, setBreedInput] = useState<Breed>("Mixed / Other");
  const [imageInput, setImageInput] = useState<string>("");
  const [dobInput, setDobInput] = useState<Date>("" as unknown as Date);
  const [yearsInput, setYearsInput] = useState<number>(0);
  const [monthsInput, setMonthsInput] = useState<number>(0);
  const [daysInput, setDaysInput] = useState<number>(0);

  const getBirthday = () => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    let birthYear = todayYear - yearsInput;
    let birthMonth = todayMonth - monthsInput;
    let birthDate = todayDate - daysInput;
    if (monthsInput > todayMonth) {
      birthYear--;
      birthMonth = birthMonth + 12;
    }
    if (birthDate > todayDate) {
      birthMonth--;
      birthDate = birthDate + 31;
    }
    if (birthDate < 10) {
      birthDate = birthDate.toString().padStart(2, "0");
    }
    if (birthMonth < 10) {
      birthMonth = birthMonth.toString().padStart(2, "0");
    }
    const birthday = `${birthYear}-${birthMonth}-${birthDate}`;
    setDobInput(birthday as unknown as Date);
  };

  const resetState = () => {
    setNameInput("");
    setSpeciesInput("dog");
    setBreedInput("Mixed / Other");
    setImageInput("");
    setDobInput("" as unknown as Date);
    setYearsInput(0);
    setMonthsInput(0);
    setDaysInput(0);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="form-container">
        <h2>Add a pet to your profile</h2>
        <form
          className="pet-form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            if (yearsInput > 0 || monthsInput > 0 || daysInput > 0) {
              getBirthday();
            }
            if (user) {
              postPet({
                userId: user.id,
                name: nameInput,
                species: speciesInput,
                breed: breedInput,
                image: imageInput,
                dob: dobInput,
              })
                .then(() => {
                  resetState();
                  navigate("/user-profile");
                })
                .catch((e: Error) => toast.error(e.message));
            }
          }}
        >
          <div className="form-field-container pet-form-label">
            {" "}
            <label htmlFor="pet-name">Pet Name:</label>
          </div>

          <div className="form-field-container pet-form-name-input">
            <input
              type="text"
              name="pet-name"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
          </div>

          <div className="form-field-container pet-form-label">
            <label htmlFor="species">Select a Species:</label>
          </div>

          <div className="form-field-container pet-form-input-left">
            <select
              name="species"
              id="species-select"
              value={speciesInput}
              onChange={(e) => {
                setSpeciesInput(e.target.value as Species);
              }}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>

          <div className="form-field-container pet-form-label-right">
            <label htmlFor="breed">Select a Breed:</label>
          </div>

          <div className="form-field-container pet-form-input-right">
            <select
              name="breed"
              id="breed-select"
              defaultValue="dog"
              onChange={(e) => {
                setBreedInput(e.target.value as Breed);
              }}
            >
              {(speciesInput === "cat" ? catBreeds : dogBreeds).map((breed) => {
                return (
                  <option value={breed} key={breed}>
                    {breed}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-field-container pet-form-label">
            <label htmlFor="image">Profile Image</label>
          </div>

          <div className="form-field-container pet-form-input-left">
            <select
              name="image"
              id="image-select"
              defaultValue=""
              onChange={(e) => {
                setImageInput(e.target.value);
              }}
            >
              <option value="">{`Choose a ${speciesInput} image`}</option>
              {(speciesInput === "cat" ? catImages : dogImages).map((image) => {
                return (
                  <option value={image.value} key={image.label}>
                    {image.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-field-container image-preview">
            {imageInput === "" ? (
              <div>Select an image to preview</div>
            ) : (
              <img src={imageInput} alt="pet profile image" />
            )}
          </div>

          <div className="form-field-container pet-form-label">
            <label htmlFor="dob">Birthday:</label>
          </div>

          <div className="form-field-container pet-form-input-left">
            <input
              type="date"
              name="dob"
              onChange={(e) => {
                setDobInput(e.target.value as unknown as Date);
              }}
            />
          </div>

          <div className="form-field-container pet-form-label">
            <span>Approximate Age:</span>
          </div>

          <div className="form-field-container age-input">
            <input
              type="number"
              name="age-years"
              min="0"
              max="30"
              onChange={(e) => {
                setYearsInput(e.target.value as unknown as number);
              }}
            />
          </div>

          <div className="form-field-container age-label">
            <label htmlFor="age-years">years</label>
          </div>

          <div className="form-field-container age-input">
            <input
              type="number"
              name="age-months"
              min="0"
              max="12"
              onChange={(e) => {
                setMonthsInput(e.target.value as unknown as number);
              }}
            />
          </div>

          <div className="form-field-container age-label">
            <label htmlFor="age-months">months</label>
          </div>

          <div className="form-field-container age-input">
            <input
              type="number"
              name="age-days"
              min="0"
              max="31"
              onChange={(e) => {
                setDaysInput(e.target.value as unknown as number);
              }}
            />
          </div>

          <div className="form-field-container age-label">
            <label htmlFor="age-days">days</label>
          </div>

          <div className="form-field-container pet-form-submit">
            <input type="submit" className="btn" />
          </div>
        </form>
      </div>
      <div className="image-credits">
        <a
          href="https://www.flaticon.com/free-stickers/dog"
          title="dog stickers"
        >
          Dog stickers created by DinosoftLabs - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-stickers/animals"
          title="animals stickers"
        >
          Animals stickers created by DinosoftLabs - Flaticon
        </a>
      </div>
    </>
  );
};
