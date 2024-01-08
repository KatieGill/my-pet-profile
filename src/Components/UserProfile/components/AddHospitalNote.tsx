import { useState } from "react";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AddHospitalNote = () => {
  const location = useLocation();
  const { hospitalId } = location.state;
  const [noteInput, setNoteInput] = useState<string>("");
  const { postHospitalNote } = useUserDataContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (user) {
            postHospitalNote({
              userId: user.id,
              hospitalId: hospitalId,
              note: noteInput,
            })
              .then(() => {
                setNoteInput("");
                navigate("/user-profile");
              })
              .catch((e: Error) => console.log(e.message));
          }
        }}
      >
        <h2>Add a note to the selected veterinary hospital</h2>
        <label htmlFor="note"></label>
        <textarea
          name="note"
          id="note-input"
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
