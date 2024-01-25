import { useEffect, useState } from "react";
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
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const { postMedication, putMedication } = useUserDataContext();
  const navigate = useNavigate();

  const nameIsValid = isInputValid(nameInput);
  const amountIsValid = isInputValid(amountInput);
  const frequencyIsValid = isInputValid(frequencyInput);

  const shouldShowNameError = !nameIsValid && shouldShowErrorMessage;
  const shouldShowAmountError = !amountIsValid && shouldShowErrorMessage;
  const shouldShowFrequencyError = !frequencyIsValid && shouldShowErrorMessage;
  const shouldShowPlaceholder = screenWidth >= 370;
  const shouldShowInfoIcon = screenWidth < 370;
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
  }, []);

  return (
    <form
      id="medication-form"
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
            }).then(() => navigate(-1));
          } else {
            postMedication({
              petId: petId,
              name: nameInput,
              amount: amountInput,
              frequency: frequencyInput,
              note: noteInput,
            }).then(() => navigate(-1));
          }
        }
      }}
    >
      <div className="form-field-container">
        {shouldShowInfoIcon ? (
          <i
            className="fa-solid fa-circle-info"
            title="Name and strength (i.e. Benadryl 25mg tablet)"
          ></i>
        ) : (
          ""
        )}
        <label htmlFor="med-name">Medication name:</label>
      </div>
      <div className="form-field-container form-input">
        <input
          value={nameInput}
          placeholder={
            shouldShowPlaceholder
              ? "Name and strength (i.e. Benadryl 25mg tablet)"
              : ""
          }
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
        {shouldShowInfoIcon ? (
          <i
            className="fa-solid fa-circle-info"
            title="Amount given at one time (i.e. 1/2 tablet)"
          ></i>
        ) : (
          ""
        )}
        <label htmlFor="med-amount">Amount:</label>
      </div>
      <div className="form-field-container form-input">
        <input
          value={amountInput}
          placeholder={
            shouldShowPlaceholder
              ? "Amount given at one time (i.e. 1/2 tablet)"
              : ""
          }
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
        {shouldShowInfoIcon ? (
          <i
            className="fa-solid fa-circle-info"
            title="How often it is given (i.e. every 12 hours)"
          ></i>
        ) : (
          ""
        )}
        <label htmlFor="med-frequency">Frequency:</label>
      </div>
      <div className="form-field-container form-input">
        <input
          value={frequencyInput}
          placeholder={
            shouldShowPlaceholder
              ? "How often it is given (i.e. every 12 hours)"
              : ""
          }
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
        {shouldShowInfoIcon ? (
          <i
            className="fa-solid fa-circle-info"
            title="Make a note: what this for? What pharmacy is it filled at?"
          ></i>
        ) : (
          ""
        )}
        <label htmlFor="med-note">Note:</label>
      </div>

      <div className="form-field-container form-input">
        <input
          value={noteInput}
          placeholder={
            shouldShowPlaceholder
              ? "Make a note: what this for? What pharmacy is it filled at?"
              : ""
          }
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
