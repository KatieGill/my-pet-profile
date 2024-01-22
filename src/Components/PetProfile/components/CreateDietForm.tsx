import { useState } from "react";
import { useUserDataContext } from "../../../Providers/UseContext";
import { useLocation, useNavigate } from "react-router-dom";
import { isInputValid } from "../../../utils/validations";
import {
  dietAmountErrorMessage,
  dietFrequencyErrorMessage,
  dietNameErrorMessage,
} from "../../../utils/errorMessages";
import { ErrorMessage } from "../../../ErrorMessage";

export const CreateDietForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [frequencyInput, setFrequencyInput] = useState("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const location = useLocation();
  const { petId, petName } = location.state;
  const { postDiet } = useUserDataContext();

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
    setShouldShowErrorMessage(false);
  };
  const navigate = useNavigate();
  return (
    <div className="form-container pet-data-form">
      <h2>Add a new diet for {petName}</h2>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nameIsValid || !amountIsValid || !frequencyIsValid) {
            setShouldShowErrorMessage(true);
          } else {
            postDiet({
              name: nameInput,
              petId: petId,
              amount: amountInput,
              frequency: frequencyInput,
            }).then(resetState);
            navigate(-1);
          }
        }}
      >
        <div className="form-field-container">
          <label htmlFor="diet-name">Diet name:</label>
        </div>

        <div className="form-field-container form-input">
          {" "}
          <input
            type="text"
            name="diet-name"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        </div>
        <ErrorMessage
          message={dietNameErrorMessage}
          show={shouldShowNameError}
        />
        <div className="form-field-container">
          {" "}
          <label htmlFor="diet-amount">Amount fed:</label>
        </div>

        <div className="form-field-container form-input">
          {" "}
          <input
            type="text"
            name="diet-amount"
            value={amountInput}
            onChange={(e) => {
              setAmountInput(e.target.value);
            }}
          />
        </div>
        <ErrorMessage
          message={dietAmountErrorMessage}
          show={shouldShowAmountError}
        />
        <div className="form-field-container">
          <label htmlFor="diet-frequency">Frequency Fed:</label>
        </div>

        <div className="form-field-container form-input">
          {" "}
          <input
            type="text"
            name="diet-frequency"
            value={frequencyInput}
            onChange={(e) => {
              setFrequencyInput(e.target.value);
            }}
          />
        </div>
        <ErrorMessage
          message={dietFrequencyErrorMessage}
          show={shouldShowFrequencyError}
        />
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
