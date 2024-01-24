import { useLocation } from "react-router-dom";
import { HospitalNoteForm } from "./HospitalNoteForm";

export const EditHospitalNote = () => {
  const location = useLocation();
  const { hospitalNote, hospital } = location.state;

  return (
    <>
      <div className="form-container">
        <h3>Edit the selected veterinary hospital note</h3>
        <HospitalNoteForm
          isEdit={true}
          noteId={hospitalNote.id}
          hospitalId={hospital.id}
          hospitalName={hospital.name}
          note={hospitalNote.note}
        />
      </div>
    </>
  );
};
