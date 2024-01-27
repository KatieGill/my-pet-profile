import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../ErrorMessage";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { Species, Breed } from "../../../Types/types";
import { catImages, dogImages } from "../../../assets/breedImages";
import { catBreeds, dogBreeds } from "../../../assets/breedLists";
import {
  petNameError,
  imageError,
  dobError,
} from "../../../utils/errorMessages";
import {
  isInputValid,
  isImageSelected,
  isDobValid,
} from "../../../utils/validations";
import { ApproximateAgeInput } from "./ApproximateAgeInput";
import toast from "react-hot-toast";

export const PetForm = ({
  isEdit,
  name,
  species,
  breed,
  image,
  dob,
  petId,
}: {
  isEdit: boolean;
  name: string;
  species: Species;
  breed: Breed;
  image: string;
  dob: Date;
  petId: string | null;
}) => {
  const { user } = useAuthContext();
  const { postPet, putPet } = useUserDataContext();
  const [nameInput, setNameInput] = useState<string>(name);
  const [speciesInput, setSpeciesInput] = useState<Species>(species);
  const [breedInput, setBreedInput] = useState<Breed>(breed);
  const [imageInput, setImageInput] = useState<string>(image);
  const [dobInput, setDobInput] = useState<Date>(dob);
  const [shouldShowErrorMessage, setShouldShouldErrorMessage] =
    useState<boolean>(false);
  const [showApproximateAgeInput, setShowApproximateAgeInput] =
    useState<boolean>(isEdit);
  const navigate = useNavigate();
  const petNameIsValid = isInputValid(nameInput);
  const imageIsSelected = isImageSelected(imageInput);
  const dobIsValid = isDobValid(dobInput);
  const shouldShowPetNameError = !petNameIsValid && shouldShowErrorMessage;
  const shouldShowImageError = !imageIsSelected && shouldShowErrorMessage;
  const shouldShowDobError = !dobIsValid && shouldShowErrorMessage;

  return (
    <>
      <form
        className="pet-form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (!petNameIsValid || !imageIsSelected || !dobIsValid) {
            setShouldShouldErrorMessage(true);
          } else {
            if (user) {
              if (isEdit) {
                if (petId) {
                  putPet({
                    id: petId,
                    userId: user.id,
                    name: nameInput,
                    species: speciesInput,
                    breed: breedInput,
                    image: imageInput,
                    dob: dobInput,
                  })
                    .then(() => {
                      navigate("/pet-profile", {
                        state: {
                          pet: {
                            id: petId,
                            userId: user.id,
                            name: nameInput,
                            species: speciesInput,
                            breed: breedInput,
                            image: imageInput,
                            dob: dobInput,
                          },
                        },
                      });
                    })
                    .catch((e: Error) => {
                      toast.error("Unable to edit pet");
                      console.error(e);
                    });
                }
              } else {
                postPet({
                  userId: user.id,
                  name: nameInput,
                  species: speciesInput,
                  breed: breedInput,
                  image: imageInput,
                  dob: dobInput,
                })
                  .then(() => navigate(-1))
                  .catch((e: Error) => {
                    toast.error("Unable to add pet");
                    console.error(e);
                  });
              }
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
                  setDobInput(new Date(`${e.target.value} GMT-0500`));
                }}
              />
            </div>
          </>
        )}

        {showApproximateAgeInput ? (
          <ApproximateAgeInput
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
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
