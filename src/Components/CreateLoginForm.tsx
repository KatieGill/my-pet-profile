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

const passwordsMatchError = "Passwords do not match.";
const usernameError = "Username must be at least 2 characters long";
const usernameNotAvailableError =
  "Username already exists. Login or choose a new username.";
const passwordsLengthError = "Password must be at least 5 characters long";

export const CreateLoginForm = () => {
  const { registerUser } = useAuthContext();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState<boolean>(true);

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

  const resetState = () => {
    setUsernameInput("");
    setPasswordInput("");
    setConfirmPasswordInput("");
    setShouldShowErrorMessage(false);
    setUsernameIsAvailable(true);
  };

  const navigate = useNavigate();
  return (
    <div className="form-container">
      <div className="btn form-home-btn">
        <Link to="/">Home</Link>
      </div>
      <h2>Welcome New User!</h2>
      <form
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
              .then(resetState)
              .catch(() => toast.error("Unable to register user"));
            navigate("/login");
          }
        }}
      >
        <div className="form-field-container">
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
        <div className="form-field-container">
          <label htmlFor="password">Create a Password:</label>
        </div>
        <div className="form-field-container form-input">
          <input
            type="text"
            name="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
          />
        </div>
        <div className="form-field-container">
          <label htmlFor="confirm-password">Confirm password:</label>
        </div>
        <div className="form-field-container form-input">
          <input
            type="text"
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
