import "../forms.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Providers/UseContext";
import { useState } from "react";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const { login } = useAuthContext();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const resetState = () => {
    setUsernameInput("");
    setPasswordInput("");
  };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          login({ username: usernameInput, password: passwordInput })
            .then(() => {
              resetState();
              navigate("/user-profile");
            })
            .catch((error: Error) => toast.error(error.message));
        }}
      >
        <div className="form-field-container">
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

        <div className="form-field-container">
          <label id="password-label" htmlFor="password">
            Password:
          </label>
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
        <div className="form-field-container form-submit">
          <input className="btn btn-submit" type="submit"></input>
        </div>
      </form>
    </div>
  );
};
