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
          <div className="card" key={medication.id}>
            <div className="medication-info">
              <div>Medication name: {medication.name}</div>
              <div>Amount given: {medication.amount}</div>
              <div>Frequency given: {medication.frequency}</div>
              {medication.note ? <div>Note: {medication.note}</div> : ""}
            </div>
            <div className="card-btns">
              {" "}
              <div className="btn icon-btn">
                {" "}
                <Link to="/edit-medication" state={{ medication }}>
                  <i
                    className="fa-regular fa-pen-to-square"
                    title="edit medication"
                  ></i>
                </Link>
              </div>
              <button
                className="btn icon-btn"
                onClick={() => {
                  deleteMedication(medication);
                }}
              >
                <i className="fa-solid fa-trash" title="delete medication"></i>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
