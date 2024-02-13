import { Link } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { Diet } from "../../../Types/types";
import toast from "react-hot-toast";

export const DietCard = ({ dietArray }: { dietArray: Diet[] }) => {
  const { deleteDiet } = useUserDataContext();
  return (
    <>
      {dietArray.map((diet) => {
        return (
          <div className="card" key={diet.id}>
            <div className="diet-info">
              <div>
                <strong>Diet name:</strong> {diet.name}
              </div>
              <div>
                <strong>Amount fed:</strong> {diet.amount}
              </div>
              <div>
                <strong>Frequency fed:</strong> {diet.frequency}
              </div>
            </div>
            <div className="card-btns">
              <div className="icon-btn">
                <Link to="/edit-diet" state={{ diet }}>
                  <i
                    className="fa-regular fa-pen-to-square"
                    title="edit diet"
                  ></i>
                </Link>
              </div>
              <button
                className="icon-btn"
                onClick={() => {
                  deleteDiet(diet).catch((e) => {
                    console.error(e);
                    toast.error("Unable to delete diet");
                  });
                }}
              >
                <i className="fa-solid fa-trash" title="delete diet"></i>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
