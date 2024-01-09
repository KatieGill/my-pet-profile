import { Link } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { Medication } from "../../../Types/types";
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
            <Link to="/edit-medication" state={{ medication }}>
              Edit Medication
            </Link>
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
