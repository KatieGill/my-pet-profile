import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Providers/UseContext";
import toast from "react-hot-toast";

export const ConfirmDeleteUser = () => {
  const { logout, deleteUser, user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="container container-sm">
        <h2>Are you sure you want to permanently delete your profile?</h2>
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
            if (user)
              deleteUser(user.id)
                .then(() => {
                  logout();
                  navigate("/");
                })
                .catch((e) => {
                  console.error(e);
                  toast.error("Unable to delete user profile");
                });
          }}
        >
          YES
        </button>
      </div>
    </>
  );
};
