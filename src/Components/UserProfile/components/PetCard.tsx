import { useUserDataContext } from "../../../Providers/UseContext";
import { Link } from "react-router-dom";

export const PetCard = () => {
  const { userPets } = useUserDataContext();
  return (
    <>
      {userPets.map((pet) => {
        return (
          <Link to={`pet-profile/${pet.id}`} key={pet.id}>
            <div className="pet-card card">
              <h3>{pet.name}</h3>
              <div className="pet-img">
                <img src={pet.image} alt="pet profile image" />
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};
