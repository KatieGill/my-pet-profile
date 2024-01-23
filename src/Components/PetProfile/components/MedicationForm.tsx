import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../ErrorMessage";
import { useUserDataContext } from "../../../Providers/UseContext";
import {
  medicationNameErrorMessage,
  medicationAmountErrorMessage,
  medicationFrequencyErrorMessage,
} from "../../../utils/errorMessages";
import { isInputValid } from "../../../utils/validations";

export const MedicationForm = ({
  isEdit,
  name,
  amount,
  frequency,
  note,
  petId,
  medId,
}: {
  isEdit: boolean;
  name: string;
  amount: string;
  frequency: string;
  note: string | undefined;
  petId: number;
  medId: number | null;
}) => {
  const [nameInput, setNameInput] = useState<string>(name);
  const [amountInput, setAmountInput] = useState<string>(amount);
  const [frequencyInput, setFrequencyInput] = useState<string>(frequency);
  const [noteInput, setNoteInput] = useState<string | undefined>(note);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);

  const { postMedication, putMedication } = useUserDataContext();

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
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nameIsValid || !amountIsValid || !frequencyIsValid) {
          setShouldShowErrorMessage(true);
        } else {
          if (isEdit) {
            putMedication({
              id: medId,
              petId: petId,
              name: nameInput,
              amount: amountInput,
              frequency: frequencyInput,
              note: noteInput,
            }).then(resetState);
            navigate(-1);
          } else {
            postMedication({
              petId: petId,
              name: nameInput,
              amount: amountInput,
              frequency: frequencyInput,
              note: noteInput,
            }).then(resetState);
            navigate(-1);
          }
        }
      }}
    >
      <div className="form-field-container">
        <label htmlFor="med-name">Medication name:</label>
      </div>
      <div className="form-field-container form-input">
        <input
          value={nameInput}
          placeholder="Name and strength (i.e. Benadryl 25mg tablet)"
          type="text"
          name="med-name"
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
        <label htmlFor="med-amount">Amount:</label>
      </div>
      <div className="form-field-container form-input">
        <input
          value={amountInput}
          placeholder="Amount given at one time (i.e. 1/2 tablet)"
          type="text"
          name="med-amount"
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
        <input
          value={frequencyInput}
          placeholder="How often it is given (i.e. every 12 hours)"
          type="text"
          name="med-frequency"
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
        <input
          value={noteInput}
          placeholder="Make a note: what this for? What pharmacy is it filled at?"
          type="text"
          name="med-note"
          onChange={(e) => {
            setNoteInput(e.target.value);
          }}
        />
      </div>

      <div className="form-field-container form-submit">
        <input type="submit" className="btn" />
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
  );
};
