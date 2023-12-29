import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useUserDataContext } from "../../Providers/UseContext";
import { Pets } from "./components/Pets";
import { useEffect } from "react";

export const UserProfile = () => {
  const { userPets, getUserPets } = useUserDataContext();
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUserPets(user.id);
    }
  }, [getUserPets, user]);

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
        <Link to="/add-pet">Add New Pet</Link>
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
