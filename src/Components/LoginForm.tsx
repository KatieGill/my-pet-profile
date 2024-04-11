import "../forms.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useUserDataContext } from "../Providers/UseContext";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import toast from "react-hot-toast";
import { DemoLogin } from "./DemoLogin";

export const LoginForm = () => {
  const { login } = useAuthContext();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );
  const { showMenuItems, toggleHamburgerMenu } = useUserDataContext();
  const navigate = useNavigate();

  return (
    <>
      <nav className="nav">
        <div>
          <h3>
            My Pet Profile <i className="fa-solid fa-paw"></i>
          </h3>
        </div>
        <div className="nav-buttons">
          <button className="navigation-icon" onClick={toggleHamburgerMenu}>
            {showMenuItems === "flex" ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
          <div className="btn btn-nav">
            <Link to="/">Home</Link>
          </div>
          <div className="btn btn-nav">
            <Link to="/create-login">Create User Account</Link>
          </div>
        </div>
      </nav>
      <div className="hamburger-menu" style={{ display: showMenuItems }}>
        <Link to="/" onClick={toggleHamburgerMenu}>
          Home
        </Link>
        <Link to="/create-login" onClick={toggleHamburgerMenu}>
          Create User Account
        </Link>
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form
          className="form-grid password-form"
          onSubmit={(e) => {
            e.preventDefault();
            login({
              username: usernameInput,
              password: passwordInput,
            })
              .then(() => navigate(`/user-profile/${usernameInput}`))
              .catch((e: Error) => {
                if (
                  e.message === "Username not found" ||
                  e.message === "Password incorrect"
                ) {
                  setErrorMessage(e.message);
                  setShouldShowErrorMessage(true);
                } else {
                  toast.error("Unable to login");
                  console.error(e);
                }
              });
          }}
        >
          <div className="form-field-container form-label">
            <label id="username-label" htmlFor="username">
              Username:
            </label>
          </div>
          <div className="form-field-container form-input">
            <input
              type="text"
              name="username"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
            />
          </div>

          <div className="form-field-container form-label">
            <label id="password-label" htmlFor="password">
              Password:
            </label>
          </div>
          <div className="form-field-container form-input">
            <input
              type={showPassword}
              name="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
            />
          </div>
          <div className="form-field-container show-password-icon">
            <div
              className="icon-btn"
              onClick={(e) => {
                e.preventDefault();
                showPassword === "text"
                  ? setShowPassword("password")
                  : setShowPassword("text");
              }}
            >
              {showPassword === "password" ? (
                <i title="show password" className="fa-solid fa-eye"></i>
              ) : (
                <i title="hide password" className="fa-solid fa-eye-slash"></i>
              )}
            </div>
          </div>
          <ErrorMessage message={errorMessage} show={shouldShowErrorMessage} />
          <div className="form-field-container form-submit">
            <input className="btn btn-submit" type="submit"></input>
          </div>
        </form>
      </div>
      <DemoLogin />
    </>
  );
};
