import { useLoaderData, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import toast from "react-hot-toast";
import { PetInformation } from "../../../Types/types";

export const ConfirmDeletePet = () => {
  const { deletePet } = useUserDataContext();
  const navigate = useNavigate();
  const { id, userId, name, species, breed, image, dob } =
    useLoaderData() as PetInformation;

  return (
    <>
      <div className="container container-sm">
        <h2>Are you sure you want to permanently delete your pet's profile?</h2>
        <button
          className="btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          NO
        </button>
        <button
          className="btn"
          onClick={() => {
            deletePet({ id, userId, name, species, breed, dob, image })
              .then(() => {
                navigate("/user-profile");
              })
              .catch((e) => {
                toast.error("Unable to delete pet");
                console.error(e);
              });
          }}
        >
          YES
        </button>
      </div>
    </>
  );
};
