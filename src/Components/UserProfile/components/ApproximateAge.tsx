import { useState } from "react";
import { calculateBirthday } from "../../../utils/functions";

export const ApproximateAge = ({
  setDobInput,
  dobInput,
  setShowApproximateAgeInput,
}: {
  setDobInput: (dobInput: Date) => void;
  dobInput: Date;
  setShowApproximateAgeInput: (boolean: boolean) => void;
}) => {
  const [yearsInput, setYearsInput] = useState<number>(0);
  const [monthsInput, setMonthsInput] = useState<number>(0);
  const [daysInput, setDaysInput] = useState<number>(0);

  const getBirthday = () => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    let birthYear = todayYear - yearsInput;
    let birthMonth = todayMonth - monthsInput;
    let birthDate = todayDate - daysInput;
    if (monthsInput > todayMonth) {
      birthYear--;
      birthMonth = birthMonth + 12;
    }
    if (birthDate > todayDate) {
      birthMonth--;
      birthDate = birthDate + 31;
    }
    if (birthDate < 10) {
      birthDate = birthDate.toString().padStart(2, "0");
    }
    if (birthMonth < 10) {
      birthMonth = birthMonth.toString().padStart(2, "0");
    }
    const birthday = `${birthYear}-${birthMonth}-${birthDate}`;
    setDobInput(birthday as unknown as Date);
  };

  const birthday = calculateBirthday(dobInput);

  return (
    <>
      <div className="form-field-container pet-form-label age-title">
        <span>Approximate Age:</span>
      </div>

      <div className="form-field-container age-input">
        <input
          type="number"
          name="age-years"
          min="0"
          max="30"
          onChange={(e) => {
            setYearsInput(e.target.value as unknown as number);
          }}
        />
      </div>

      <div className="form-field-container age-label">
        <label htmlFor="age-years">years</label>
      </div>

      <div className="form-field-container age-input">
        <input
          type="number"
          name="age-months"
          min="0"
          max="12"
          onChange={(e) => {
            setMonthsInput(e.target.value as unknown as number);
          }}
        />
      </div>

      <div className="form-field-container age-label">
        <label htmlFor="age-months">months</label>
      </div>

      <div className="form-field-container age-input">
        <input
          type="number"
          name="age-days"
          min="0"
          max="31"
          onChange={(e) => {
            setDaysInput(e.target.value as unknown as number);
          }}
        />
      </div>

      <div className="form-field-container age-label">
        <label htmlFor="age-days">days</label>
      </div>
      {dobInput ? (
        <div className="form-field-container calculated-birthday-display">
          Birthday: {birthday}
        </div>
      ) : (
        ""
      )}
      <div className="form-field-container calculate-birthday-btn">
        {" "}
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            getBirthday();
          }}
        >
          Calculate birthday
        </button>
      </div>
      <div className="form-field-container enter-birthday-button">
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            setShowApproximateAgeInput(false);
          }}
        >
          Enter birthday manually
        </button>
      </div>
    </>
  );
};
