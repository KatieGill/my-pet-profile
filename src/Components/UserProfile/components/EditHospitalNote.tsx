import { useLoaderData } from "react-router-dom";
import { HospitalNoteForm } from "./HospitalNoteForm";
import { HospitalNoteInfo } from "../../../Types/types";

export const EditHospitalNote = () => {
  const { id, hospitalId, note, hospital } =
    useLoaderData() as HospitalNoteInfo;

  return (
    <>
      <div className="form-container">
        <h3>Edit the selected veterinary hospital note</h3>
        <HospitalNoteForm
          isEdit={true}
          noteId={id}
          hospitalId={hospitalId}
          hospitalName={hospital.name}
          note={note}
        />
      </div>
    </>
  );
};
