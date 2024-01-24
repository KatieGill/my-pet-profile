import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../Providers/UseContext";

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
            deletePet(pet).then(() => {
              navigate("/user-profile");
            });
          }}
        >
          YES
        </button>
      </div>
    </>
  );
};
