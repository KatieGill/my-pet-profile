import "./user-profile.css";
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
      <nav className="nav">
        <button
          className="btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </nav>
      <h2>Your Pet Profiles</h2>

      <div className="container container-sm">
        <div className="btn cards-nav">
          <Link to="/add-pet">Add New Pet</Link>
        </div>
        <div className="cards-container">
          {userPets.length > 0 ? (
            <Pets />
          ) : (
            <div className="no-card-view">
              You do not have any pet profiles yet!
            </div>
          )}
        </div>
      </div>
      <h2>Favorite Veterinary Hospitals</h2>

      <div className="container container-sm">
        <div className="btn cards-nav">
          <Link to="/vet-hospitals">Explore Veterinary Hospitals</Link>
        </div>
        <div className="cards-container">
          {hospitalFavorites?.length > 0 ? (
            <HospitalFavorites />
          ) : (
            <div className="no-card-view">
              You do not have any favorite hospitals yet!
            </div>
          )}
        </div>
      </div>
    </>
  );
};
