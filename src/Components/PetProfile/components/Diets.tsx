import { Link } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import { Diet } from "../../../Types/types";

export const Diets = ({ dietArray }: { dietArray: Diet[] }) => {
  const { deleteDiet } = useUserDataContext();
  return (
    <>
      {dietArray.map((diet) => {
        return (
          <div key={diet.id}>
            <div>Diet: {diet.name}</div>
            <div>Amount: {diet.amount}</div>
            <div>Frequency: {diet.frequency}</div>
            <Link to="/edit-diet" state={{ diet }}>
              Edit Diet
            </Link>
            <button
              onClick={() => {
                deleteDiet(diet);
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
