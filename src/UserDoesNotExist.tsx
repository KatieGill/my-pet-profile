import { Link } from "react-router-dom";
import { useAuthContext } from "./Providers/UseContext";

export const UserDoesNotExist = () => {
  const { user } = useAuthContext();
  return (
    <>
      <div className="container error-element">
        <h3>Requested user does not exist</h3>

        <div className="error-icon">
          <img src="/assets/error-element-icon.png" alt="error icon" />
        </div>
        <div className="btn">
          <Link to={user ? `/user-profile/${user.username}` : "/"}>
            Return to Home Page
          </Link>
        </div>
        <div className="image-credits">
          <div>
            <span>Icon made by: </span>
            <a href="https://www.flaticon.com/authors/lafs" title="LAFS">
              LAFS
            </a>

            <span>from </span>
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
