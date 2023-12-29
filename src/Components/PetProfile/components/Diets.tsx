import { Diet } from "../../../types";

export const Diets = ({ dietArray }: { dietArray: Diet[] }) => {
  return (
    <>
      {dietArray.map((diet) => {
        return (
          <div>
            <div>Diet: {diet.name}</div>
            <div>Amount: {diet.amount}</div>
            <div>Frequency: {diet.frequency}</div>
          </div>
        );
      })}
    </>
  );
};
