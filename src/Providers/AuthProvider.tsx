import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Requests } from "../api";
import { AuthState, User, UserInformation } from "../Types/types";
import toast from "react-hot-toast";

type AuthProvider = {
  user: UserInformation | null;
  isLoading: boolean;
  setUser: (user: UserInformation) => void;
  setIsLoading: (boolean: boolean) => void;
  registerUser: (user: Omit<User, "id">) => Promise<string>;
  login: (user: Omit<User, "id">) => Promise<void>;
  logout: () => void;
  patchUsername: (name: string, userId: number) => Promise<string>;
  patchPassword: (password: string, userId: number) => Promise<string>;
  deleteUser: (userId: number) => Promise<string>;
};

export const AuthContext = createContext<AuthProvider | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInformation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const registerUser = (user: Omit<User, "id">) => {
    return Requests.postUser(user).then(() => toast.success("User registered"));
  };

  const login = async (user: Omit<User, "id">) => {
    setIsLoading(true);
    const currentUser = await Requests.login(user);
    try {
      setUser(currentUser);
      localStorage.setItem("current_user", JSON.stringify(currentUser.id));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("current_user");
    setUser(null);
  };

  const patchUsername = (username: string, userId: number) => {
    return Requests.patchUsername(username, userId)
      .then((user) => setUser(user))
      .then(() => toast.success("Updated username"));
  };

  const patchPassword = (password: string, userId: number) => {
    return Requests.patchPassword(password, userId)
      .then((user) => setUser(user))
      .then(() => toast.success("Updated password"));
  };

  const deleteUser = (userId: number) => {
    return Requests.deleteUser(userId).then(() =>
      toast.success("Deleted user profile")
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const currentUser = localStorage.getItem("current_user");
    const getUserData = (userId: number) => {
      return Requests.getLoggedInUserData(userId).then((userData) => {
        setUser(userData);
      });
    };
    try {
      if (currentUser !== null) {
        const userId = +JSON.parse(currentUser);
        getUserData(userId);
      }
    } catch (e) {
      console.log(e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        setIsLoading,
        registerUser,
        login,
        logout,
        patchUsername,
        patchPassword,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
