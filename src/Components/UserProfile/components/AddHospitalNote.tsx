import { useLocation } from "react-router-dom";
import { HospitalNoteForm } from "./HospitalNoteForm";

export const AddHospitalNote = () => {
  const location = useLocation();
  const { id, name } = location.state;

  return (
    <>
      <div className="form-container">
        <h3>Add a note to the selected veterinary hospital</h3>
        <HospitalNoteForm
          isEdit={false}
          noteId={null}
          hospitalId={id}
          hospitalName={name}
          note={""}
        />
      </div>
    </>
  );
};
