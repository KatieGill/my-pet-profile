import { useUserDataContext } from "../../../Providers/UseContext";
import { PetCard } from "./PetCard";

export const Pets = () => {
  const { userPets } = useUserDataContext();

  return (
    <>
      {userPets.map((pet) => {
        return <PetCard petName={pet.name} petImage={pet.image} />;
      })}
    </>
  );
};
