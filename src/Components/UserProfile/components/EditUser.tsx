import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../ErrorMessage";
import {
  passwordsLengthError,
  passwordsMatchError,
  usernameError,
} from "../../../utils/errorMessages";
import {
  arePasswordsValid,
  isPasswordValid,
  isUsernameValid,
} from "../../../utils/validations";
import {
  useAuthContext,
  useUserDataContext,
} from "../../../Providers/UseContext";
import toast from "react-hot-toast";

export const EditUser = () => {
  const [newUsernameInput, setNewUsernameInput] = useState<string>("");
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] =
    useState<string>("");
  const [shouldShowUsernameErrorMessage, setShouldShowUsernameErrorMessage] =
    useState<boolean>(false);
  const [shouldShowPasswordErrorMessage, setShouldShowPasswordErrorMessage] =
    useState<boolean>(false);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState<boolean>(true);
  const [usernameNotAvailableError, setUsernameNotAvailableError] =
    useState<string>("");
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );
  const navigate = useNavigate();
  const { patchUsername, patchPassword, user } = useAuthContext();
  const { showMenuItems, toggleHamburgerMenu } = useUserDataContext();

  const passwordsAreValid = arePasswordsValid(
    newPasswordInput,
    confirmNewPasswordInput
  );
  const passwordIsValid = isPasswordValid(newPasswordInput);
  const usernameIsValid = isUsernameValid(newUsernameInput);
  const shouldShowPasswordsMatchError =
    !passwordsAreValid && shouldShowPasswordErrorMessage;
  const shouldShowPasswordsLengthError =
    !passwordIsValid && shouldShowPasswordErrorMessage;
  const shouldShowUsernameError =
    !usernameIsValid && shouldShowUsernameErrorMessage;
  const shouldShowUsernameNotAvailableError =
    !usernameIsAvailable && shouldShowUsernameErrorMessage;

  const resetUsernameForm = () => {
    setNewUsernameInput("");
    setShouldShowUsernameErrorMessage(false);
    setUsernameIsAvailable(true);
    setUsernameNotAvailableError("");
  };
  const resetPasswordForm = () => {
    setNewPasswordInput("");
    setConfirmNewPasswordInput("");
    setShouldShowPasswordErrorMessage(false);
  };
  return (
    <>
      <div className="container">
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
            <button
              className="btn btn-nav"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Home
            </button>
          </div>
        </nav>
        <div className="hamburger-menu" style={{ display: showMenuItems }}>
          <button
            onClick={(e) => {
              toggleHamburgerMenu();
              e.preventDefault();
              navigate(-1);
            }}
          >
            Home
          </button>
        </div>
        <h3>Edit your user information</h3>
        <h4>Username: {user?.username}</h4>
        <div className="form-container">
          <h4>Update Username</h4>
          <form
            className="form-grid username-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!usernameIsValid) {
                setShouldShowUsernameErrorMessage(true);
              } else {
                if (user) {
                  patchUsername(newUsernameInput, user.id)
                    .then(resetUsernameForm)
                    .catch((e) => {
                      if (
                        e.message ===
                          "Please change your username to something different than your current username" ||
                        e.message === "Username already exists"
                      ) {
                        setShouldShowUsernameErrorMessage(true);
                        setUsernameIsAvailable(false);
                        setUsernameNotAvailableError(e.message);
                      } else {
                        console.error(e);
                        toast.error("Unable to update username");
                      }
                    });
                }
              }
            }}
          >
            <div className="form-field-container form-label">
              <label htmlFor="username">New username:</label>
            </div>
            <div className="form-field-container form-input">
              <input
                type="text"
                name="username"
                onChange={(e) => {
                  setNewUsernameInput(e.target.value);
                }}
              />
            </div>

            <ErrorMessage
              message={usernameError}
              show={shouldShowUsernameError}
            />
            <ErrorMessage
              message={usernameNotAvailableError}
              show={shouldShowUsernameNotAvailableError}
            />
            <div className="form-field-container form-submit">
              <input type="submit" className="btn btn-submit" />
            </div>
          </form>
        </div>
        <div className="form-container">
          <h4>Update Password</h4>
          <form
            className="form-grid password-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!passwordIsValid || !passwordsAreValid) {
                setShouldShowPasswordErrorMessage(true);
              } else {
                if (user) {
                  patchPassword(newPasswordInput, user.id)
                    .then(resetPasswordForm)
                    .catch((e) => {
                      console.error(e);
                      toast.error("Unable to edit password");
                    });
                }
              }
            }}
          >
            <div className="form-field-container form-label">
              <label htmlFor="password">New password:</label>
            </div>
            <div className="form-field-container form-input">
              <input
                type={showPassword}
                name="password"
                onChange={(e) => {
                  setNewPasswordInput(e.target.value);
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
                  <i
                    title="hide password"
                    className="fa-solid fa-eye-slash"
                  ></i>
                )}
              </div>
            </div>
            <div className="form-field-container form-label">
              <label htmlFor="confirm password">Confirm new password:</label>
            </div>
            <div className="form-field-container form-input">
              <input
                type={showPassword}
                name="confirm password"
                onChange={(e) => {
                  setConfirmNewPasswordInput(e.target.value);
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
              <input type="submit" className="btn btn-submit" />
            </div>
          </form>
        </div>
        <div className="delete-user">
          <div className="btn">
            <Link to="delete-user-profile">Delete User Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
};
