import { useUserDataContext } from "../../../Providers/UseContext";
import { Medication } from "../../../types";
export const Medications = ({
  medicationArray,
}: {
  medicationArray: Medication[];
}) => {
  const { deleteMedication } = useUserDataContext();
  return (
    <>
      {medicationArray.map((medication) => {
        return (
          <div key={medication.id}>
            <div>Medication: {medication.name}</div>
            <div>Amount: {medication.amount}</div>
            <div>Frequency: {medication.frequency}</div>
            {medication.note ? <div>Note: {medication.note}</div> : ""}
            <button
              onClick={() => {
                deleteMedication(medication);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};
