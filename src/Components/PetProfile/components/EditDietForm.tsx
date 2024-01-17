import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { Diet } from "../../../Types/types";

export const EditDietForm = () => {
  const location = useLocation();
  const { diet } = location.state;
  const { id, name, petId, amount, frequency } = diet as Diet;

  const [nameInput, setNameInput] = useState(name);
  const [amountInput, setAmountInput] = useState(amount);
  const [frequencyInput, setFrequencyInput] = useState(frequency);

  const { putDiet } = useUserDataContext();

  const resetState = () => {
    setNameInput("");
    setAmountInput("");
    setFrequencyInput("");
  };
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          putDiet({
            id: id,
            petId: petId,
            name: nameInput,
            amount: amountInput,
            frequency: frequencyInput,
          }).then(resetState);
          navigate(-1);
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

        <div className="form-field-container form-submit">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
