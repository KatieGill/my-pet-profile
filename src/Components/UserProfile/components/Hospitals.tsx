import { useEffect, useState } from "react";
import { Requests } from "../../../api";
import { Hospital } from "../../../Types/types";
import { useNavigate } from "react-router-dom";
import { HospitalCard } from "./HospitalCard";

export const Hospitals = () => {
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
        <button
          className="btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          Home
        </button>
      </nav>
      <div className="container container-sm cards-container">
        <HospitalCard hospitalArray={allHospitals} isFavoriteList={false} />
      </div>
    </>
  );
};
