import { useLocation, useNavigate } from "react-router-dom";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import toast from "react-hot-toast";

export const ConfirmDelete = () => {
  const { deletePet } = useUserDataContext();
  const { logout, deleteUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { pet, user } = location.state;

  return (
    <>
      <div className="container container-sm">
        <h2>
          Are you sure you want to permanently delete your{" "}
          {pet !== undefined ? "pet's" : ""} profile?
        </h2>
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
            if (pet !== undefined) {
              deletePet(pet)
                .then(() => {
                  navigate("/user-profile");
                })
                .catch((e) => {
                  toast.error("Unable to delete pet");
                  console.error(e);
                });
            } else {
              deleteUser(user.id)
                .then(() => {
                  logout();
                  navigate("/");
                })
                .catch((e) => {
                  console.error(e);
                  toast.error("Unable to delete user profile");
                });
            }
          }}
        >
          YES
        </button>
      </div>
    </>
  );
};
