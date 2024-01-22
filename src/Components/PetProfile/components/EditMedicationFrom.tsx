import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { useState } from "react";
import { Medication } from "../../../Types/types";
import { isInputValid } from "../../../utils/validations";
import { ErrorMessage } from "../../../ErrorMessage";
import {
  medicationAmountErrorMessage,
  medicationFrequencyErrorMessage,
  medicationNameErrorMessage,
} from "../../../utils/errorMessages";

export const EditMedicationForm = () => {
  const location = useLocation();
  const { medication } = location.state;
  const { id, petId, name, amount, frequency, note } = medication as Medication;
  const [nameInput, setNameInput] = useState<string>(name);
  const [amountInput, setAmountInput] = useState<string>(amount);
  const [frequencyInput, setFrequencyInput] = useState<string>(frequency);
  const [noteInput, setNoteInput] = useState<string | undefined>(note);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const { putMedication } = useUserDataContext();

  const nameIsValid = isInputValid(nameInput);
  const amountIsValid = isInputValid(amountInput);
  const frequencyIsValid = isInputValid(frequencyInput);

  const shouldShowNameError = !nameIsValid && shouldShowErrorMessage;
  const shouldShowAmountError = !amountIsValid && shouldShowErrorMessage;
  const shouldShowFrequencyError = !frequencyIsValid && shouldShowErrorMessage;

  const resetState = () => {
    setNameInput("");
    setAmountInput("");
    setFrequencyInput("");
    setNoteInput(undefined);
    setShouldShowErrorMessage(false);
  };
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>Edit the Selected Medication</h2>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nameIsValid || !amountIsValid || !frequencyIsValid) {
            setShouldShowErrorMessage(true);
          } else {
            putMedication({
              id: id,
              petId: petId,
              name: nameInput,
              amount: amountInput,
              frequency: frequencyInput,
              note: noteInput,
            }).then(resetState);
            navigate(-1);
          }
        }}
      >
        <div className="form-field-container pet-data-form">
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
        <ErrorMessage
          message={medicationNameErrorMessage}
          show={shouldShowNameError}
        />
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
        <ErrorMessage
          message={medicationAmountErrorMessage}
          show={shouldShowAmountError}
        />
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
        <ErrorMessage
          message={medicationFrequencyErrorMessage}
          show={shouldShowFrequencyError}
        />
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
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <input type="submit" className="btn" />
        </div>
      </form>
    </div>
  );
};
