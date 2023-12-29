import { useLocation, useNavigate } from "react-router-dom";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import { useState } from "react";

export const CreateMedicationForm = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("");
  const [frequencyInput, setFrequencyInput] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string | undefined>(undefined);
  const { user } = useAuthContext();
  const location = useLocation();
  const petId = location.state.petId;
  const { postMedication } = useUserDataContext();
  const resetState = () => {
    setNameInput("");
    setAmountInput("");
    setFrequencyInput("");
    setNoteInput(undefined);
  };
  const navigate = useNavigate();
  console.log("pet id", petId);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (user) {
          postMedication({
            userId: user?.id,
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
      <label htmlFor="med-name">Medication name:</label>
      <input
        type="text"
        name="med-name"
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />
      <label htmlFor="med-amount">Amount:</label>
      <input
        type="text"
        name="med-amount"
        onChange={(e) => {
          setAmountInput(e.target.value);
        }}
      />
      <label htmlFor="med-frequency">Frequency:</label>
      <input
        type="text"
        name="med-frequency"
        onChange={(e) => {
          setFrequencyInput(e.target.value);
        }}
      />
      <label htmlFor="med-note">Note:</label>
      <input
        type="text"
        name="med-note"
        onChange={(e) => {
          setNoteInput(e.target.value);
        }}
      />
      <input type="submit" />
    </form>
  );
};
