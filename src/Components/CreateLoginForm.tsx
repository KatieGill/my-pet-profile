import { useState } from "react";
import { useAuthContext } from "../Providers/UseContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CreateLoginForm = () => {
  const { registerUser } = useAuthContext();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const resetState = () => {
    setUsernameInput("");
    setPasswordInput("");
    setConfirmPasswordInput("");
  };

  const navigate = useNavigate();
  return (
    <form
      id="create-login-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (passwordInput === confirmPasswordInput) {
          registerUser({
            username: usernameInput,
            password: passwordInput,
          })
            .then(resetState)
            .catch(() => toast.error("Unable to register user"));
          navigate("/login");
        } else {
          toast.error("Passwords did not match");
        }
      }}
    >
      <h4>Welcome New User!</h4>
      <label htmlFor="username">Create a Username:</label>
      <input
        type="text"
        name="username"
        value={usernameInput}
        onChange={(e) => {
          setUsernameInput(e.target.value);
        }}
      />

      <label htmlFor="password">Create a Password:</label>
      <input
        type="text"
        name="password"
        value={passwordInput}
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
      />

      <label htmlFor="confirm-password">Confirm password:</label>
      <input
        type="text"
        name="confirm-password"
        value={confirmPasswordInput}
        onChange={(e) => {
          setConfirmPasswordInput(e.target.value);
        }}
      />
      <input type="submit"></input>
    </form>
  );
};
