import { useState } from "react";
import { useUserDataContext } from "../../../Providers/UseContext";
import { useLocation, useNavigate } from "react-router-dom";

export const CreateDietForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [frequencyInput, setFrequencyInput] = useState("");

  const location = useLocation();
  const { petId, petName } = location.state;
  const { postDiet } = useUserDataContext();

  const resetState = () => {
    setNameInput("");
    setAmountInput("");
    setFrequencyInput("");
  };
  const navigate = useNavigate();
  return (
    <div className="form-container">
      <h2>Add a new diet for {petName}</h2>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();

          postDiet({
            name: nameInput,
            petId: petId,
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

        <div className="form-field-container form-submit">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
