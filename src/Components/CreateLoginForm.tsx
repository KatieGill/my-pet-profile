import "../forms.css";
import { useState } from "react";
import { useAuthContext } from "../Providers/UseContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  arePasswordsValid,
  isPasswordValid,
  isUsernameAvailable,
  isUsernameValid,
} from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";
import {
  usernameError,
  usernameNotAvailableError,
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
  const navigate = useNavigate();

  const usernameAvailable = async (usernameInput: string) => {
    const available = await isUsernameAvailable(usernameInput);
    setUsernameIsAvailable(available);
  };

  usernameAvailable(usernameInput);

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

  return (
    <div className="form-container">
      <div className="btn form-home-btn">
        <Link to="/" className="navigation-title">
          Home
        </Link>
        <Link to="/" className="navigation-icon">
          <i className="fa-solid fa-house" title="home"></i>
        </Link>
      </div>
      <h2>Welcome New User!</h2>
      <form
        id="create-login-form"
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (!usernameIsValid || !passwordsAreValid || !usernameIsAvailable) {
            setShouldShowErrorMessage(true);
          } else {
            registerUser({
              username: usernameInput,
              password: passwordInput,
            })
              .then(() => navigate("/login"))
              .catch(() => toast.error("Unable to register user"));
          }
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
          <button
            className="btn icon-btn"
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
          </button>
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
