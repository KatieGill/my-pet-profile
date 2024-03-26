import { Link } from "react-router-dom";
import { DemoLogin } from "./DemoLogin";

export const HomePage = () => {
  return (
    <div className="container home-page">
      <h1>My Pet Profile</h1>
      <div className="logo-main">
        <img src="/assets/logo.png" alt="logo" />
      </div>
      <div className="btn">
        <Link to="login">Login</Link>
      </div>
      <div className="btn">
        <Link to="create-login">Create User Account</Link>
      </div>
      <DemoLogin />
      <div className="image-credits">
        <a
          href="https://www.flaticon.com/free-icons/pet"
          target="_blank"
          title="pet icons"
        >
          My Pet Profile Logo created by Becris - Flaticon
        </a>
      </div>
    </div>
  );
};
