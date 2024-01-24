import { useEffect, useState } from "react";
import { Requests } from "../../../api";
import { Hospital } from "../../../Types/types";
import { useNavigate } from "react-router-dom";
import { HospitalCard } from "./HospitalCard";

export const ExploreHospitals = () => {
  const [allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const navigate = useNavigate();
  const getAllHospitals = async () => {
    const allHospitals = await Requests.getHospitals();
    setAllHospitals(allHospitals);
  };

  useEffect(() => {
    getAllHospitals();
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="logo-small">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <button
          className="btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          Home
        </button>
      </nav>
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
