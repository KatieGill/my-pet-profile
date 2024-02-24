import "../forms.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Providers/UseContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  arePasswordsValid,
  isPasswordValid,
  isUsernameValid,
} from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";
import {
  usernameError,
  passwordsMatchError,
  passwordsLengthError,
} from "../utils/errorMessages";

export const CreateLoginForm = () => {
  const { registerUser } = useAuthContext();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );
  const [usernameNotAvailableError, setUsernameNotAvailableError] =
    useState<string>("");
  const navigate = useNavigate();

  const passwordsAreValid = arePasswordsValid(
    passwordInput,
    confirmPasswordInput
  );
  const passwordIsValid = isPasswordValid(passwordInput);
  const usernameIsValid = isUsernameValid(usernameInput);
  const shouldShowPasswordsMatchError =
    !passwordsAreValid && shouldShowErrorMessage;
  const shouldShowPasswordsLengthError =
    !passwordIsValid && shouldShowErrorMessage;
  const shouldShowUsernameError = !usernameIsValid && shouldShowErrorMessage;
  const shouldShowUsernameNotAvailableError =
    !usernameIsAvailable && shouldShowErrorMessage;

  useEffect(() => {
    const resetUsernameIsAvailable = () => {
      if (usernameInput === "") setUsernameIsAvailable(true);
    };
    resetUsernameIsAvailable();
  }, [usernameInput]);

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
      <h2>Welcome New User!</h2>
      <form
        className="form-grid password-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!usernameIsValid || !passwordsAreValid || !usernameIsAvailable) {
            setShouldShowErrorMessage(true);
            return;
          }
          registerUser({
            username: usernameInput,
            password: passwordInput,
          })
            .then(() => navigate("/login"))
            .catch((e: Error) => {
              if (e.message === "Username already exists") {
                setShouldShowErrorMessage(true);
                setUsernameIsAvailable(false);
                setUsernameNotAvailableError(e.message);
              } else {
                toast.error("Unable to register user");
                console.error(e);
              }
            });
        }}
      >
        <div className="form-field-container form-label">
          <label htmlFor="username">Create a Username:</label>
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
        <ErrorMessage message={usernameError} show={shouldShowUsernameError} />
        <ErrorMessage
          message={usernameNotAvailableError}
          show={shouldShowUsernameNotAvailableError}
        />
        <div className="form-field-container form-label">
          <label htmlFor="password">Create a Password:</label>
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
        <div className="form-field-container form-label">
          <label htmlFor="confirm-password">Confirm password:</label>
        </div>
        <div className="form-field-container form-input">
          <input
            type={showPassword}
            name="confirm-password"
            value={confirmPasswordInput}
            onChange={(e) => {
              setConfirmPasswordInput(e.target.value);
            }}
          />
        </div>
        <ErrorMessage
          message={passwordsMatchError}
          show={shouldShowPasswordsMatchError}
        />
        <ErrorMessage
          message={passwordsLengthError}
          show={shouldShowPasswordsLengthError}
        />
        <div className="form-field-container form-submit">
          <input type="submit" className="btn btn-submit"></input>
        </div>
      </form>
    </div>
  );
};
