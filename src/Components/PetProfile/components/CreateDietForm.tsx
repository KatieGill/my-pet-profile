import { useState } from "react";
import { useUserDataContext } from "../../../Providers/UseContext";
import { useLocation, useNavigate } from "react-router-dom";

export const CreateDietForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [frequencyInput, setFrequencyInput] = useState("");

  const location = useLocation();
  const { petId } = location.state;
  const { postDiet } = useUserDataContext();

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

        postDiet({
          name: nameInput,
          petId: petId,
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
