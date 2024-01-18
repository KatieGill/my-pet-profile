import { Requests } from "../api";

export const arePasswordsValid = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

export const isPasswordValid = (password: string) => {
  return password.length > 4;
};

export const isUsernameValid = (username: string) => {
  return username.length > 1;
};

export const isUsernameAvailable = async (username: string) => {
  return await Requests.getUser(username)
    .then(() => {
      return false;
    })
    .catch(() => {
      return true;
    });
};
