import "./user-profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useUserDataContext } from "../../Providers/UseContext";
import { PetCard } from "./components/PetCard";
import { HospitalCard } from "./components/HospitalCard";

export const UserProfile = () => {
  const { userPets, hospitalFavorites, showMenuItems, toggleHamburgerMenu } =
    useUserDataContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const hospitalFavoritesArray = hospitalFavorites.map(
    (favorite) => favorite.hospital
  );

  return (
    <>
      <nav className="nav">
        <div>
          <h3>
            My Pet Profile <i className="fa-solid fa-paw"></i>
          </h3>
        </div>
        <div className="nav-buttons">
          <button className="navigation-icon" onClick={toggleHamburgerMenu}>
            {showMenuItems === "flex" ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
          <div className="btn btn-nav">
            <Link to="edit-user">Edit Profile</Link>
          </div>

          <button
            className="btn btn-nav"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="hamburger-menu" style={{ display: showMenuItems }}>
        <Link to="edit-user" onClick={toggleHamburgerMenu}>
          Edit Profile
        </Link>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <h2>Your Pet Profiles</h2>
      <div className="container container-sm">
        <div className="btn cards-nav">
          <Link to="add-pet">Add New Pet</Link>
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
          <Link to="vet-hospitals">Explore Veterinary Hospitals</Link>
        </div>
        <div className="cards-container">
          {hospitalFavorites?.length > 0 ? (
            <HospitalCard
              hospitalArray={hospitalFavoritesArray}
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
