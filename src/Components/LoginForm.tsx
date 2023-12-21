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
      <h4>Login</h4>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={usernameInput}
        onChange={(e) => {
          setUsernameInput(e.target.value);
        }}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        value={passwordInput}
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
      />
      <input type="submit"></input>
    </form>
  );
};
