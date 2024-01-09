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
    <form
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
      <label htmlFor="diet-name">Diet name:</label>
      <input
        type="text"
        name="diet-name"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />
      <label htmlFor="diet-amount">Amount fed:</label>
      <input
        type="text"
        name="diet-amount"
        value={amountInput}
        onChange={(e) => {
          setAmountInput(e.target.value);
        }}
      />
      <label htmlFor="diet-frequency">Frequency Fed:</label>
      <input
        type="text"
        name="diet-frequency"
        value={frequencyInput}
        onChange={(e) => {
          setFrequencyInput(e.target.value);
        }}
      />
      <input type="submit" />
    </form>
  );
};
