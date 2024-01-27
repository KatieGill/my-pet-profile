import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";
import toast from "react-hot-toast";

export const ConfirmDelete = () => {
  const { deletePet } = useUserDataContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { pet } = location.state;

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
            deletePet(pet)
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
