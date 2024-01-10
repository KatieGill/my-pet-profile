import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Hospital } from "../../../Types/types";

export const AddHospitalNote = () => {
  const location = useLocation();
  const { id, name } = location.state.hospital as Hospital;
  const [noteInput, setNoteInput] = useState<string>("");
  const { postHospitalNote } = useUserDataContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="form-container">
        <h2>Add a note to the selected veterinary hospital</h2>
        <form
          className="hospital-note-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (user) {
              postHospitalNote({
                userId: user.id,
                hospitalId: id,
                note: noteInput,
              })
                .then(() => {
                  setNoteInput("");
                  navigate("/user-profile");
                })
                .catch((e: Error) => toast.error(e.message));
            }
          }}
        >
          <div className="form-field-container">
            <label htmlFor="note">{name} Note:</label>
          </div>
          <div className="form-field-container">
            <textarea
              name="note"
              id="note-input"
              cols="80"
              rows="20"
              onChange={(e) => {
                setNoteInput(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="form-field-container">
            <input type="submit" className="btn btn-submit" />
          </div>
        </form>
      </div>
    </>
  );
};
