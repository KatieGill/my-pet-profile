import { Link } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { Medication } from "../../../Types/types";
import toast from "react-hot-toast";
export const MedicationCard = ({
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
              <div>
                <strong>Medication name:</strong> {medication.name}
              </div>
              <div>
                <strong>Amount given:</strong> {medication.amount}
              </div>
              <div>
                <strong>Frequency given:</strong> {medication.frequency}
              </div>
              {medication.note ? (
                <div>
                  <strong>Note:</strong> {medication.note}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="card-btns">
              <div className="icon-btn">
                <Link to="/edit-medication" state={{ medication }}>
                  <i
                    className="fa-regular fa-pen-to-square"
                    title="edit medication"
                  ></i>
                </Link>
              </div>
              <button
                className="icon-btn"
                onClick={() => {
                  deleteMedication(medication).catch((e) => {
                    console.error(e);
                    toast.error("Unable to delete medication");
                  });
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
