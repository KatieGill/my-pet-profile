import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { dogBreeds, catBreeds } from "../../../assets/breedLists";
import { dogImages, catImages } from "../../../assets/breedImages";
import { Breed, Species } from "../../../Types/types";
import { useNavigate } from "react-router-dom";
import {
  isDobValid,
  isImageSelected,
  isPetNameValid,
} from "../../../utils/validations";
import { ErrorMessage } from "../../../ErrorMessage";
import { ApproximateAge } from "./ApproximateAge";

const petNameError = "Pet name must be as least 1 character long";
const imageError = "Please select a profile image";
const dobError = "Please enter a birthday";

export const AddPet = () => {
  const { user } = useAuthContext();
  const { postPet } = useUserDataContext();
  const [nameInput, setNameInput] = useState<string>("");
  const [speciesInput, setSpeciesInput] = useState<Species>("dog");
  const [breedInput, setBreedInput] = useState<Breed>("Mixed / Other");
  const [imageInput, setImageInput] = useState<string>("");
  const [dobInput, setDobInput] = useState<Date>("" as unknown as Date);
  const [shouldShowErrorMessage, setShouldShouldErrorMessage] =
    useState<boolean>(false);
  const [showApproximateAgeInput, setShowApproximateAgeInput] =
    useState<boolean>(false);

  const petNameIsValid = isPetNameValid(nameInput);
  const imageIsSelected = isImageSelected(imageInput);
  const dobIsValid = isDobValid(dobInput);

  const shouldShowPetNameError = !petNameIsValid && shouldShowErrorMessage;
  const shouldShowImageError = !imageIsSelected && shouldShowErrorMessage;
  const shouldShowDobError = !dobIsValid && shouldShowErrorMessage;

  const resetState = () => {
    setNameInput("");
    setSpeciesInput("dog");
    setBreedInput("Mixed / Other");
    setImageInput("");
    setDobInput("" as unknown as Date);
    setShouldShouldErrorMessage(false);
    setShowApproximateAgeInput(false);
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
            if (!petNameIsValid || !imageIsSelected || !dobIsValid) {
              setShouldShouldErrorMessage(true);
            } else {
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
                  .catch((e: Error) => console.log(e.message));
              }
            }
          }}
        >
          <div className="form-field-container pet-form-label">
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
          <ErrorMessage message={petNameError} show={shouldShowPetNameError} />
          <div className="form-field-container pet-form-label">
            <label htmlFor="species">Select a Species:</label>
          </div>

          <div className="form-field-container pet-form-input">
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

          <div className="form-field-container pet-form-label">
            <label htmlFor="breed">Select a Breed:</label>
          </div>

          <div className="form-field-container pet-form-input">
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

          <div className="form-field-container pet-form-input">
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
          <ErrorMessage message={imageError} show={shouldShowImageError} />
          <div className="form-field-container image-preview">
            {imageInput === "" ? (
              <div>Select an image to preview</div>
            ) : (
              <img src={imageInput} alt="pet profile image" />
            )}
          </div>
          {showApproximateAgeInput ? (
            ""
          ) : (
            <>
              <div className="form-field-container pet-form-label">
                <label htmlFor="dob">Birthday:</label>
              </div>

              <div className="form-field-container pet-form-input">
                <input
                  type="date"
                  name="dob"
                  onChange={(e) => {
                    setDobInput(e.target.value as unknown as Date);
                  }}
                />
              </div>
            </>
          )}

          {showApproximateAgeInput ? (
            <ApproximateAge
              setDobInput={setDobInput}
              dobInput={dobInput}
              setShowApproximateAgeInput={setShowApproximateAgeInput}
            />
          ) : (
            <div className="show-approximate-age">
              <div>Unsure of your pet's birthday?</div>
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowApproximateAgeInput(true);
                }}
              >
                Enter approximate age
              </button>
            </div>
          )}
          <ErrorMessage message={dobError} show={shouldShowDobError} />
          <div className="form-field-container pet-form-submit">
            <input type="submit" className="btn btn-submit" />
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
