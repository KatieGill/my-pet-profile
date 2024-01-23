import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const EditHospitalNote = () => {
  const location = useLocation();
  const { note, hospital } = location.state;
  const [noteInput, setNoteInput] = useState<string>(note.note);
  const { patchHospitalNote } = useUserDataContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="form-container">
        <h2>Edit veterinary hospital note</h2>
        <form
          className="hospital-note-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (user) {
              patchHospitalNote({
                id: note.id,
                userId: note.userId,
                hospitalId: note.hospitalId,
                note: noteInput,
              })
                .then(() => {
                  setNoteInput("");
                  navigate(-1);
                })
                .catch((e: Error) => toast.error(e.message));
            }
          }}
        >
          <div className="form-field-container">
            <label htmlFor="note">{hospital.name}</label>
          </div>

          <div className="form-field-container"></div>
          <textarea
            name="note"
            id="note-input"
            value={noteInput}
            cols="80"
            rows="20"
            onChange={(e) => {
              setNoteInput(e.target.value);
            }}
          ></textarea>
          <div className="form-field-container">
            <input type="submit" className="btn btn-submit" />
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
