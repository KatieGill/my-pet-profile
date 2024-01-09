import { useState, useEffect } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { Requests } from "../../../api";
import { HospitalFavorite } from "../../../Types/types";
import { Link } from "react-router-dom";

export const HospitalFavorites = () => {
  const {
    hospitalFavorites,
    deleteHospitalFavorite,
    hospitalNotes,
    deleteHospitalNote,
  } = useUserDataContext();
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
        const note = hospitalNotes.find(
          (note) => note.hospitalId === hospital.id
        );
        return (
          <div className="hospital-card" key={hospital.id}>
            <h3>{hospital.name}</h3>
            <div className="hospital-img">
              <img src={hospital.image} alt="" />
            </div>
            <div>{hospital.address}</div>
            <div>{hospital.phone}</div>
            <div>
              {note ? (
                <>
                  <div>{note.note}</div>
                  <Link to="/edit-hospital-note" state={{ note }}>
                    Edit note
                  </Link>
                  <button
                    onClick={() => {
                      deleteHospitalNote(note);
                    }}
                  >
                    Delete Note
                  </button>
                </>
              ) : (
                <Link
                  to="/add-hospital-note"
                  state={{ hospitalId: hospital.id }}
                >
                  Add a note
                </Link>
              )}
            </div>

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
