import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { Diet } from "../../../Types/types";
import { isInputValid } from "../../../utils/validations";
import { ErrorMessage } from "../../../ErrorMessage";
import {
  dietAmountErrorMessage,
  dietFrequencyErrorMessage,
  dietNameErrorMessage,
} from "../../../utils/errorMessages";

export const EditDietForm = () => {
  const location = useLocation();
  const { diet } = location.state;
  const { id, name, petId, amount, frequency } = diet as Diet;

  const [nameInput, setNameInput] = useState(name);
  const [amountInput, setAmountInput] = useState(amount);
  const [frequencyInput, setFrequencyInput] = useState(frequency);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const { putDiet } = useUserDataContext();

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
      <h2>Edit the Selected Diet</h2>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nameIsValid || !amountIsValid || !frequencyIsValid) {
            setShouldShowErrorMessage(true);
          } else {
            putDiet({
              id: id,
              petId: petId,
              name: nameInput,
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
          <label htmlFor="diet-amount">Amount fed:</label>
        </div>

        <div className="form-field-container form-input">
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
