import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="container home-page">
      <h1>My Pet Profile</h1>
      <div className="logo-container"></div>
      <div className="btn">
        <Link to="login">Login</Link>
      </div>
      <div className="btn">
        <Link to="create-login">Create User Account</Link>
      </div>
    </div>
  );
};
