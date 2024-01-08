import { useUserDataContext } from "../../../Providers/UseContext";
import { Diet } from "../../../types";

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
