import { useState, useEffect } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { Requests } from "../../../api";
import { HospitalFavorite } from "../../../types";

export const HospitalFavorites = () => {
  const { hospitalFavorites, deleteHospitalFavorite } = useUserDataContext();
  const { user } = useAuthContext();
  const [userFavorites, setUserFavorites] = useState<HospitalFavorite[]>([]);

  const getUserFavorites = async (userId: number) => {
    const favorites = await Requests.getUserHospitalFavorites(userId);
    setUserFavorites(favorites);
  };

  useEffect(() => {
    if (user) {
      getUserFavorites(user.id);
    }
  }, [user]);

  return (
    <>
      {hospitalFavorites.map((hospital) => {
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
                const favorite = userFavorites.find(
                  (favorite) => favorite.hospitalId === hospital.id
                );
                if (favorite) {
                  deleteHospitalFavorite(favorite);
                  getUserFavorites(favorite.userId);
                }
              }}
            >
              Remove from favorites list
            </button>
          </div>
        );
      })}
    </>
  );
};
