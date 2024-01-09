import { useEffect, useState } from "react";
import { Requests } from "../../../api";
import { Hospital } from "../../../Types/types";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
      {allHospitals.map((hospital) => {
        return (
          <div className="hospital-card" key={hospital.id}>
            <h3>{hospital.name}</h3>
            <div className="hospital-img">
              <img src={hospital.image} alt="" />
            </div>
            <div>{hospital.address}</div>
            <div>{hospital.phone}</div>
            <button
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
              Add to favorites
            </button>
          </div>
        );
      })}
      <Link to="/user-profile">Home</Link>
    </>
  );
};
