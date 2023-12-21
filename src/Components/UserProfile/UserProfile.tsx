import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useUserDataContext } from "../../Providers/UseContext";
import { Pets } from "./components/Pets";

export const UserProfile = () => {
  const { userPets } = useUserDataContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <h2>Pet Profiles</h2>
      <div className="btn">
        <a>
          <Link to="/add-pet">Add New Pet</Link>
        </a>
      </div>
      <div>
        {userPets.length > 0 ? (
          <Pets />
        ) : (
          <div>You do not have any pet profiles yet!</div>
        )}
        <a
          href="https://www.flaticon.com/free-stickers/dog"
          title="dog stickers"
        >
          Dog stickers created by DinosoftLabs - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-stickers/animals"
          title="animals stickers"
        >
          Animals stickers created by DinosoftLabs - Flaticon
        </a>
      </div>
    </>
  );
};
