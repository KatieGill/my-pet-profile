import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";

export const ConfirmDelete = () => {
  const { deletePet } = useUserDataContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { pet } = location.state;

  return (
    <>
      <h2>Are you sure you want to permanently delete your pet's profile?</h2>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        NO
      </button>
      <button
        onClick={() => {
          deletePet(pet).then(() => {
            navigate("/user-profile");
          });
        }}
      >
        YES
      </button>
    </>
  );
};
