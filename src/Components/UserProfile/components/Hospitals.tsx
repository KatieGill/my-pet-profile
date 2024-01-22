import { useEffect, useState } from "react";
import { Requests } from "../../../api";
import { Hospital } from "../../../Types/types";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getSearchLocation } from "../../../utils/functions";

export const Hospitals = () => {
  const [allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const { postHospitalFavorite, hospitalFavorites } = useUserDataContext();
  const { user } = useAuthContext();

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
        <div className="btn">
          <Link to="/user-profile">Home</Link>
        </div>
      </nav>
      <div className="container container-sm cards-container">
        {allHospitals.map((hospital) => {
          const location = getSearchLocation(hospital.address);
          return (
            <div className="hospital-card card" key={hospital.id}>
              <h3>{hospital.name}</h3>
              <div className="hospital-img">
                <img src={hospital.image} alt="" />
              </div>
              <div className="card-address">
                <a
                  href={`https://www.google.com/maps?q=${location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hospital.address}
                </a>
              </div>
              <div>
                <a href={`tel: ${hospital.phone}`}>{hospital.phone}</a>
              </div>
              <div className="card-website">
                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </div>
              <div className="favorite-btn-container">
                <button
                  className="btn icon-btn"
                  onClick={() => {
                    if (user) {
                      if (
                        hospitalFavorites.find(
                          (favorite) => favorite.name === hospital.name
                        )
                      ) {
                        toast.error(
                          "This hospital is already in your favorites list"
                        );
                      } else {
                        postHospitalFavorite(user.id, hospital.id);
                      }
                    }
                  }}
                >
                  <i
                    className="fa-solid fa-heart"
                    title="add to favorites list"
                  ></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
