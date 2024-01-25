import { Link } from "react-router-dom";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { Hospital, HospitalFavorite } from "../../../Types/types";
import { getSearchLocation } from "../../../utils/functions";
import { useEffect, useState } from "react";
import { Requests } from "../../../api";
import toast from "react-hot-toast";

export const HospitalCard = ({
  hospitalArray,
  isFavoriteList,
}: {
  hospitalArray: Hospital[];
  isFavoriteList: boolean;
}) => {
  const {
    hospitalNotes,
    deleteHospitalNote,
    deleteHospitalFavorite,
    hospitalFavorites,
    postHospitalFavorite,
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
      {hospitalArray.map((hospital: Hospital) => {
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
            <div className="hospital-info-container">
              <div className="hospital-info-icon">
                <i
                  className="fa-solid fa-location-dot"
                  title="map to address"
                ></i>
              </div>
              <div className="hospital-info-link">
                <a
                  href={`https://www.google.com/maps?q=${location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hospital.address}
                </a>
              </div>

              <div className="hospital-info-icon">
                <i className="fa-solid fa-phone" title="call"></i>
              </div>
              <div className="hospital-info-link">
                <a href={`tel: ${hospital.phone}`}>{hospital.phone}</a>
              </div>

              <div className="hospital-info-icon">
                <i
                  className="fa-solid fa-arrow-pointer"
                  title="visit website"
                ></i>
              </div>
              <div className="hospital-info-link">
                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </div>
            </div>
            {isFavoriteList ? (
              <div className="hospital-note-container">
                {note ? (
                  <>
                    <div className="hospital-note">{note.note}</div>
                    <div className="note-buttons">
                      <div className="btn icon-btn">
                        <Link
                          to="/edit-hospital-note"
                          state={{ hospitalNote: note, hospital: hospital }}
                        >
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
                        <i
                          className="fa-solid fa-trash"
                          title="delete note"
                        ></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="add-note">
                    <Link
                      to="/add-hospital-note"
                      state={{ hospital: hospital }}
                    >
                      <span>Create a note</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="favorite-btn-container">
              {isFavoriteList ? (
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
              ) : (
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
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};