import { useEffect, useState } from "react";
import { Requests } from "../../../api";
import { Hospital } from "../../../Types/types";
import { useNavigate } from "react-router-dom";
import { HospitalCard } from "./HospitalCard";
import toast from "react-hot-toast";
import { useUserDataContext } from "../../../Providers/UseContext";

export const ExploreHospitals = () => {
  const [allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const navigate = useNavigate();
  const { showMenuItems, toggleHamburgerMenu } = useUserDataContext();
  const getAllHospitals = () => {
    return Requests.getHospitals()
      .then((allHospitals) => setAllHospitals(allHospitals))
      .catch((e) => {
        console.error(e);
        toast.error("Unable to display hospitals");
      });
  };

  useEffect(() => {
    getAllHospitals();
  }, []);

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
          <button
            className="btn btn-nav"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Home
          </button>
        </div>
      </nav>
      <div className="hamburger-menu" style={{ display: showMenuItems }}>
        <button
          onClick={(e) => {
            toggleHamburgerMenu();
            e.preventDefault();
            navigate(-1);
          }}
        >
          Home
        </button>
      </div>
      <h2>Explore Local Veterinary Hospitals</h2>
      <div>
        <p>
          Click the heart icon to add that veterinary hospital to your favorites
          list
        </p>
        <p>
          Click the links to get a map, call the hospital or visit their website
        </p>
      </div>
      <div className="container container-sm cards-container">
        <HospitalCard hospitalArray={allHospitals} isFavoriteList={false} />
      </div>
    </>
  );
};
