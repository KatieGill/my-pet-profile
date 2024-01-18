import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { useState } from "react";
import { Medication } from "../../../Types/types";

export const EditMedicationForm = () => {
  const location = useLocation();
  const { medication } = location.state;
  const { id, petId, name, amount, frequency, note } = medication as Medication;
  const [nameInput, setNameInput] = useState<string>(name);
  const [amountInput, setAmountInput] = useState<string>(amount);
  const [frequencyInput, setFrequencyInput] = useState<string>(frequency);
  const [noteInput, setNoteInput] = useState<string | undefined>(note);

  const { putMedication } = useUserDataContext();
  const resetState = () => {
    setNameInput("");
    setAmountInput("");
    setFrequencyInput("");
    setNoteInput(undefined);
  };
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          putMedication({
            id: id,
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
          {" "}
          <input
            type="text"
            name="med-name"
            value={nameInput}
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
            value={amountInput}
            onChange={(e) => {
              setAmountInput(e.target.value);
            }}
          />
        </div>

        <div className="form-field-container">
          <label htmlFor="med-frequency">Frequency:</label>
        </div>

        <div className="form-field-container form-input">
          {" "}
          <input
            type="text"
            name="med-frequency"
            value={frequencyInput}
            onChange={(e) => {
              setFrequencyInput(e.target.value);
            }}
          />
        </div>

        <div className="form-field-container">
          <label htmlFor="med-note">Note:</label>
        </div>

        <div className="form-field-container form-input">
          {" "}
          <input
            type="text"
            name="med-note"
            value={noteInput}
            onChange={(e) => {
              setNoteInput(e.target.value);
            }}
          />
        </div>

        <div className="form-field-container form-submit">
          <input type="submit" className="btn" />
        </div>
      </form>
    </div>
  );
};
