import { useState } from "react";
import { isInputValid } from "../../../utils/validations";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../ErrorMessage";
import {
  dietNameErrorMessage,
  dietAmountErrorMessage,
  dietFrequencyErrorMessage,
} from "../../../utils/errorMessages";
import { useUserDataContext } from "../../../Providers/UseContext";

export const DietForm = ({
  isEdit,
  name,
  amount,
  frequency,
  petId,
  dietId,
}: {
  isEdit: boolean;
  name: string;
  amount: string;
  frequency: string;
  petId: number;
  dietId: number | null;
}) => {
  const [nameInput, setNameInput] = useState(name);
  const [amountInput, setAmountInput] = useState(amount);
  const [frequencyInput, setFrequencyInput] = useState(frequency);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const { postDiet, putDiet } = useUserDataContext();
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
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nameIsValid || !amountIsValid || !frequencyIsValid) {
          setShouldShowErrorMessage(true);
        } else {
          if (isEdit) {
            putDiet({
              id: dietId,
              petId: petId,
              name: nameInput,
              amount: amountInput,
              frequency: frequencyInput,
            }).then(resetState);
            navigate(-1);
          } else {
            postDiet({
              name: nameInput,
              petId: petId,
              amount: amountInput,
              frequency: frequencyInput,
            }).then(resetState);
            navigate(-1);
          }
        }
      }}
    >
      <div className="form-field-container">
        <label htmlFor="diet-name">Diet name:</label>
      </div>

      <div className="form-field-container form-input">
        <input
          placeholder="Name and brand of food"
          type="text"
          name="diet-name"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
      </div>
      <ErrorMessage message={dietNameErrorMessage} show={shouldShowNameError} />
      <div className="form-field-container">
        <label htmlFor="diet-amount">Amount fed:</label>
      </div>

      <div className="form-field-container form-input">
        <input
          placeholder="How much your pet gets at each feeding"
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
          placeholder="How many times per day your pet gets fed"
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
