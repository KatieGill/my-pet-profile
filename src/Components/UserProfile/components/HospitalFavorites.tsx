import { useState, useEffect } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { Requests } from "../../../api";
import { HospitalFavorite } from "../../../Types/types";
import { Link } from "react-router-dom";
import { getSearchLocation } from "../../../utils/functions";

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
        const location = getSearchLocation(hospital.address);
        const note = hospitalNotes.find(
          (note) => note.hospitalId === hospital.id
        );
        return (
          <div className="hospital-card card" key={hospital.id}>
            <h3>{hospital.name}</h3>
            <div className="hospital-img">
              <img src={hospital.image} alt="vet hospital image" />
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
            <div>{hospital.phone}</div>
            <div className="card-website">
              <a
                href={hospital.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
            <div className="hospital-note-container">
              {note ? (
                <>
                  <div className="hospital-note">{note.note}</div>
                  <div className="note-buttons">
                    <div className="btn icon-btn">
                      <Link to="/edit-hospital-note" state={{ note, hospital }}>
                        <i
                          className="fa-regular fa-pen-to-square"
                          title="edit note"
                        ></i>
                      </Link>
                    </div>
                    <button
                      className="btn icon-btn"
                      onClick={() => {
                        deleteHospitalNote(note);
                      }}
                    >
                      <i className="fa-solid fa-trash" title="delete note"></i>
                    </button>
                  </div>
                </>
              ) : (
                <div className="add-note icon-btn">
                  <Link to="/add-hospital-note" state={{ hospital: hospital }}>
                    <span>
                      Create a note{" "}
                      <i
                        className="fa-solid fa-note-sticky"
                        title="create a note"
                      ></i>
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <div className="favorite-btn-container">
              <button
                className="btn icon-btn"
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
                <i
                  className="fa-solid fa-heart-crack"
                  title="remove from favorites list"
                ></i>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
