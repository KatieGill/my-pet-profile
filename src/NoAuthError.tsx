import { Link } from "react-router-dom";
import { useAuthContext } from "./Providers/UseContext";

export const NoAuthError = () => {
  const { user } = useAuthContext();
  return (
    <div className="container error-element">
      <h3>Not Authorized</h3>
      <p>Login to requested user account for access</p>

      <div className="error-icon">
        <img src="/assets/no-auth-icon.png" alt="error icon" />
      </div>
      <div className="btn">
        <Link to={user ? `/user-profile/${user.username}` : "/"}>
          Return to Home Page
        </Link>
      </div>
      <div className="image-credits">
        <div>
          <span>Icon made by: </span>
          <a
            href="https://www.flaticon.com/free-icons/padlock"
            title="padlock icons"
          >
            DinosoftLabs
          </a>

          <span>from </span>
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </div>
  );
};
