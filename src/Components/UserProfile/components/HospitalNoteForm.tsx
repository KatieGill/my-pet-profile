import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../ErrorMessage";
import {
  useUserDataContext,
  useAuthContext,
} from "../../../Providers/UseContext";
import { noteErrorMessage } from "../../../utils/errorMessages";
import { isNoteValid } from "../../../utils/validations";

export const HospitalNoteForm = ({
  isEdit,
  noteId,
  hospitalId,
  hospitalName,
  note,
}: {
  isEdit: boolean;
  noteId: number | null;
  hospitalId: number;
  hospitalName: string;
  note: string;
}) => {
  const [noteInput, setNoteInput] = useState<string>(note);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const { postHospitalNote, patchHospitalNote } = useUserDataContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const noteIsValid = isNoteValid(noteInput);
  const shouldShowNoteErrorMessage = !noteIsValid && shouldShowErrorMessage;
  return (
    <>
      <form
        className="hospital-note-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!noteIsValid) {
            setShouldShowErrorMessage(true);
          } else {
            if (user) {
              if (isEdit) {
                if (noteId)
                  patchHospitalNote({
                    id: noteId,
                    userId: user.id,
                    hospitalId: hospitalId,
                    note: noteInput,
                  })
                    .then(() => {
                      setNoteInput("");
                      navigate(-1);
                    })
                    .catch((e) => {
                      console.error(e);
                      toast.error("Unable to edit note");
                    });
              } else {
                postHospitalNote({
                  userId: user.id,
                  hospitalId: hospitalId,
                  note: noteInput,
                })
                  .then(() => {
                    setNoteInput("");
                    navigate(-1);
                  })
                  .catch((e) => {
                    console.error(e);
                    toast.error("Unable to create note");
                  });
              }
            }
          }
        }}
      >
        <div className="form-field-container">
          <label htmlFor="note">{hospitalName} Note:</label>
        </div>
        <div className="form-field-container">
          <textarea
            placeholder="This is a great place to document what services your pet receives here, which veterinarians you prefer or why you like this particular hospital!"
            value={noteInput}
            name="note"
            id="note-input"
            cols={80}
            rows={20}
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
    </>
  );
};
