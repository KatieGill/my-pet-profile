import "./user-profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useUserDataContext } from "../../Providers/UseContext";
import { PetCard } from "./components/PetCard";
import { HospitalCard } from "./components/HospitalCard";

export const UserProfile = () => {
  const { userPets, hospitalFavorites } = useUserDataContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <nav className="nav">
        <div className="logo-small">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <button
          className="btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <span className="navigation-title">Logout</span>
          <span className="navigation-icon">
            <i className="fa-solid fa-right-from-bracket" title="logout"></i>
          </span>
        </button>
      </nav>
      <h2>Your Pet Profiles</h2>
      <div>Click on a pet to view their profile</div>
      <div className="container container-sm">
        <div className="btn cards-nav">
          <Link to="/add-pet">Add New Pet</Link>
        </div>
        <div className="cards-container">
          {userPets.length > 0 ? (
            <PetCard />
          ) : (
            <div className="no-card-view">
              <p>You do not have any pet profiles yet!</p>
              <p>Click 'Add New Pet' to get started</p>
            </div>
          )}
        </div>
      </div>
      <h2>Favorite Veterinary Hospitals</h2>
      <div className="container container-sm" id="hospital-favorites">
        <div className="btn cards-nav">
          <Link to="/vet-hospitals">Explore Veterinary Hospitals</Link>
        </div>
        <div className="cards-container">
          {hospitalFavorites?.length > 0 ? (
            <HospitalCard
              hospitalArray={hospitalFavorites}
              isFavoriteList={true}
            />
          ) : (
            <div className="no-card-view">
              <p>You do not have any favorite hospitals yet!</p>
              <p>Click 'Explore Veterinary Hospitals' to get started</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
