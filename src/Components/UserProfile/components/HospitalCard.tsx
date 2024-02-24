import { Link } from "react-router-dom";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { Hospital, HospitalFavorite } from "../../../Types/types";
import { getSearchLocation } from "../../../utils/functions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const HospitalCard = ({
  hospitalArray,
  isFavoriteList,
}: {
  hospitalArray: (Hospital | undefined)[];
  isFavoriteList: boolean;
}) => {
  const {
    hospitalNotes,
    hospitalFavorites,
    deleteHospitalNote,
    deleteHospitalFavorite,
    postHospitalFavorite,
  } = useUserDataContext();
  const { user } = useAuthContext();
  const [userFavorites, setUserFavorites] = useState<HospitalFavorite[]>([]);

  useEffect(() => {
    if (user) {
      setUserFavorites(hospitalFavorites);
    }
  }, [user, hospitalFavorites]);

  return (
    <>
      {hospitalArray.map((hospital: Hospital | undefined) => {
        if (!hospital) return;
        const location = getSearchLocation(hospital.address);
        const note = hospitalNotes.find(
          (note) => note.hospitalId === hospital.id
        );
        const favorite = userFavorites.find(
          (favorite) => favorite.hospitalId === hospital.id
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
                      <div className="icon-btn">
                        <Link to={`edit-hospital-note/${note.id}`}>
                          <i
                            className="fa-regular fa-pen-to-square"
                            title="edit note"
                          ></i>
                        </Link>
                      </div>
                      <button
                        className="icon-btn"
                        onClick={() => {
                          deleteHospitalNote(note).catch((e) => {
                            console.error(e);
                            toast.error("Unable to delete hospital note");
                          });
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
                      to="add-hospital-note"
                      state={{ id: hospital.id, name: hospital.name }}
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
              <button
                className="icon-btn"
                onClick={() => {
                  if (favorite) {
                    deleteHospitalFavorite(favorite).catch((e) => {
                      console.error(e);
                      toast.error(
                        "Unable to delete hospital from favorites list"
                      );
                    });
                  } else {
                    if (user) {
                      postHospitalFavorite(user.id, hospital.id).catch((e) => {
                        console.error(e);
                        toast.error("Unable to add hospital to favorites list");
                      });
                    }
                  }
                }}
              >
                <i
                  title={
                    favorite
                      ? "remove from favorites list"
                      : "add to favorites list"
                  }
                  className="fa-solid fa-heart"
                  style={{ color: favorite ? "#f55162" : "#232946" }}
                ></i>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
