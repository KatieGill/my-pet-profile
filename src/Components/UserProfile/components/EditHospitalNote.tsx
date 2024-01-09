import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const EditHospitalNote = () => {
  const location = useLocation();
  const { note } = location.state;
  const [noteInput, setNoteInput] = useState<string>(note.note);
  const { patchHospitalNote } = useUserDataContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <form
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
                navigate("/user-profile");
              })
              .catch((e: Error) => toast.error(e.message));
          }
        }}
      >
        <h2>Edit veterinary hospital note</h2>
        <label htmlFor="note"></label>
        <textarea
          name="note"
          id="note-input"
          value={noteInput}
          cols="30"
          rows="10"
          onChange={(e) => {
            setNoteInput(e.target.value);
          }}
        ></textarea>
        <input type="submit" />
      </form>
    </>
  );
};
