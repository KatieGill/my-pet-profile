import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Hospital } from "../../../Types/types";
import { isNoteValid } from "../../../utils/validations";
import { ErrorMessage } from "../../../ErrorMessage";

const noteErrorMessage =
  "Please enter a note for the selected veterinary hospital";

export const AddHospitalNote = () => {
  const location = useLocation();
  const { id, name } = location.state.hospital as Hospital;
  const [noteInput, setNoteInput] = useState<string>("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const { postHospitalNote } = useUserDataContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const noteIsValid = isNoteValid(noteInput);
  const shouldShowNoteErrorMessage = !noteIsValid && shouldShowErrorMessage;

  return (
    <>
      <div className="form-container">
        <h2>Add a note to the selected veterinary hospital</h2>
        <form
          className="hospital-note-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!noteIsValid) {
              setShouldShowErrorMessage(true);
            } else {
              if (user) {
                postHospitalNote({
                  userId: user.id,
                  hospitalId: id,
                  note: noteInput,
                })
                  .then(() => {
                    setNoteInput("");
                    navigate(-1);
                  })
                  .catch((e: Error) => toast.error(e.message));
              }
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
          <ErrorMessage
            message={noteErrorMessage}
            show={shouldShowNoteErrorMessage}
          />
          <div className="form-field-container">
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <input type="submit" className="btn btn-submit" />
          </div>
        </form>
      </div>
    </>
  );
};
