import { Medication } from "../../../types";
export const Medications = ({
  medicationArray,
}: {
  medicationArray: Medication[];
}) => {
  return (
    <>
      {medicationArray.map((medication) => {
        return (
          <div>
            <div>Medication: {medication.name}</div>
            <div>Amount: {medication.amount}</div>
            <div>Frequency: {medication.frequency}</div>
            <div>Note: {medication.note}</div>
          </div>
        );
      })}
    </>
  );
};
