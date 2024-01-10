import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { dogBreeds, catBreeds } from "../../../assets/breedLists";
import { dogImages, catImages } from "../../../assets/breedImages";
import { Breed, Species } from "../../../Types/types";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export const EditPet = () => {
  const { user } = useAuthContext();
  const { putPet } = useUserDataContext();
  const location = useLocation();
  const { pet } = location.state;
  const { id, userId, name, species, breed, image, dob } = pet as Pet;
  const [nameInput, setNameInput] = useState<string>(name);
  const [speciesInput, setSpeciesInput] = useState<Species>(species);
  const [breedInput, setBreedInput] = useState<Breed>(breed);
  const [imageInput, setImageInput] = useState<string>(image);
  const [dobInput, setDobInput] = useState<Date>(dob);

  const resetState = () => {
    setNameInput("");
    setSpeciesInput("dog");
    setBreedInput("Mixed / Other");
    setImageInput("");
    setDobInput("" as unknown as Date);
  };

  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (user) {
            putPet({
              id: id,
              userId: userId,
              name: nameInput,
              species: speciesInput,
              breed: breedInput,
              image: imageInput,
              dob: dobInput,
            })
              .then(() => {
                resetState();
                navigate("/pet-profile", {
                  state: {
                    pet: {
                      id: id,
                      userId: userId,
                      name: nameInput,
                      species: speciesInput,
                      breed: breedInput,
                      image: imageInput,
                      dob: dobInput,
                    },
                  },
                });
              })

              .catch((e: Error) => toast.error(e.message));
          }
        }}
      >
        <h2>Add a pet to your profile</h2>

        <label htmlFor="pet-name">Pet Name:</label>
        <input
          type="text"
          name="pet-name"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
        <label htmlFor="species">Select a Species:</label>
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
        <label htmlFor="species">Select a Breed:</label>
        <select
          name="breed"
          id="breed-select"
          defaultValue={breedInput}
          onChange={(e) => {
            setBreedInput(e.target.value);
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
        <label htmlFor="image"></label>
        <select
          name="image"
          id="image-select"
          defaultValue={imageInput}
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
        <label htmlFor="dob"></label>
        <input
          type="date"
          name="dob"
          defaultValue={dobInput}
          onChange={(e) => {
            setDobInput(e.target.value);
          }}
        />
        <input type="submit" />
      </form>

      <div className="image-preview">
        {imageInput === "" ? (
          <div>Select an image to preview</div>
        ) : (
          <img src={imageInput} alt="pet profile image" />
        )}
      </div>
    </>
  );
};
