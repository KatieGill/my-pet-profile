import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { useState } from "react";

export const CreateMedicationForm = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("");
  const [frequencyInput, setFrequencyInput] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string | undefined>(undefined);
  const location = useLocation();
  const { petId, petName } = location.state.petId;
  const { postMedication } = useUserDataContext();
  const resetState = () => {
    setNameInput("");
    setAmountInput("");
    setFrequencyInput("");
    setNoteInput(undefined);
  };
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>Add a new medication for {petName}</h2>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          postMedication({
            petId: petId,
            name: nameInput,
            amount: amountInput,
            frequency: frequencyInput,
            note: noteInput,
          }).then(resetState);
          navigate(-1);
        }}
      >
        <div className="form-field-container">
          {" "}
          <label htmlFor="med-name">Medication name:</label>
        </div>

        <div className="form-field-container form-input">
          <input
            type="text"
            name="med-name"
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        </div>

        <div className="form-field-container">
          {" "}
          <label htmlFor="med-amount">Amount:</label>
        </div>

        <div className="form-field-container form-input">
          {" "}
          <input
            type="text"
            name="med-amount"
            onChange={(e) => {
              setAmountInput(e.target.value);
            }}
          />
        </div>

        <div className="form-field-container">
          {" "}
          <label htmlFor="med-frequency">Frequency:</label>
        </div>

        <div className="form-field-container form-input">
          {" "}
          <input
            type="text"
            name="med-frequency"
            onChange={(e) => {
              setFrequencyInput(e.target.value);
            }}
          />
        </div>

        <div className="form-field-container">
          <label htmlFor="med-note">Note:</label>
        </div>

        <div className="form-field-container form-input">
          <input
            type="text"
            name="med-note"
            onChange={(e) => {
              setNoteInput(e.target.value);
            }}
          />
        </div>

        <div className="form-field-container form-submit">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
