import { useState } from "react";
import { useAuthContext } from "../../../Providers/UseContext";
import { Species } from "../../../types";
import { dogBreeds, catBreeds } from "../../../assets/breedLists";

export const AddPet = () => {
  const { user } = useAuthContext();
  const [userId, setUserId] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState<string>("");
  const [speciesInput, setSpeciesInput] = useState<string>("dog");
  const [breedInput, setBreedInput] = useState<string>("Mixed / Other");
  const [imageInput, setImageInput] = useState<string>("");
  const [dobInput, setDobInput] = useState<Date | null>(null);
  return (
    <form>
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
        defaultValue={"dog"}
        value={speciesInput}
        onChange={(e) => {
          setSpeciesInput(e.target.value);
        }}
      >
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>
      <label htmlFor="species">Select a Breed:</label>
      <select
        name="breed"
        id="breed-select"
        defaultValue="Mixed / Other"
        value={breedInput}
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
      <select name="image" id="image-select"></select>
    </form>
  );
};
