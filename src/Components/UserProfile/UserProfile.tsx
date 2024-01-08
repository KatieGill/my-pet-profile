import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useUserDataContext } from "../../Providers/UseContext";
import { Pets } from "./components/Pets";
import { HospitalFavorites } from "./components/HospitalFavorites";

export const UserProfile = () => {
  const { userPets, hospitalFavorites } = useUserDataContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <h2>Pet Profiles</h2>
      <div className="btn">
        <Link to="/add-pet">Add New Pet</Link>
      </div>
      <div>
        {userPets.length > 0 ? (
          <Pets />
        ) : (
          <div>You do not have any pet profiles yet!</div>
        )}
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
      <div>
        <h2>Favorite Veterinary Hospitals</h2>
        {hospitalFavorites?.length > 0 ? (
          <HospitalFavorites />
        ) : (
          <div>You do not have any favorite hospitals yet!</div>
        )}
      </div>
      <Link to="/vet-hospitals">Explore Veterinary Hospitals</Link>
    </>
  );
};
