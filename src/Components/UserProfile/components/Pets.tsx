import { useUserDataContext } from "../../../Providers/UseContext";
import { Link } from "react-router-dom";

export const Pets = () => {
  const { userPets } = useUserDataContext();

  return (
    <>
      {userPets.map((pet) => {
        return (
          <Link to="/pet-profile" state={{ pet: pet }} key={pet.id}>
            <div className="pet-card">
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
