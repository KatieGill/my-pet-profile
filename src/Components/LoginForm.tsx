import "../forms.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Providers/UseContext";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";

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
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <div className="btn form-home-btn">
        <Link to="/">
          <span className="navigation-title">Home</span>
          <span className="navigation-icon">
            <i className="fa-solid fa-house" title="home"></i>
          </span>
        </Link>
      </div>
      <h2>Login</h2>
      <form
        id="login-form"
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          login({
            username: usernameInput,
            password: passwordInput,
          })
            .then(() => navigate("/user-profile"))
            .catch((error: Error) => {
              if (
                error.message === "Username not found" ||
                error.message === "Password incorrect"
              ) {
                setErrorMessage(error.message);
                setShouldShowErrorMessage(true);
              } else {
                console.log(error.message);
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
  );
};
