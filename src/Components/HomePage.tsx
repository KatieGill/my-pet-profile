import { Link } from "react-router-dom";
import { DemoLogin } from "./DemoLogin";

export const HomePage = () => {
  return (
    <div className="container home-page">
      <h1>
        My Pet Profile <i className="fa-solid fa-paw"></i>
      </h1>
      <div className="btn btn-large">
        <Link to="login">Login</Link>
      </div>
      <div className="btn btn-large">
        <Link to="create-login">Create User Account</Link>
      </div>
      <DemoLogin />
    </div>
  );
};
