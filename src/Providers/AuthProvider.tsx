import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Requests } from "../api";
import { User } from "../Types/types";
import toast from "react-hot-toast";

type AuthProvider = {
  user: User | null;
  setUser: (user: User) => void;
  registerUser: (user: Omit<User, "id">) => Promise<string>;
  login: (user: Omit<User, "id">) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthProvider>({} as AuthProvider);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerUser = (user: Omit<User, "id">) => {
    return Requests.postUser(user).then(() => toast.success("User registered"));
  };

  const login = async (user: Omit<User, "id">) => {
    const currentUser = await Requests.getUser(user.username);
    if (!currentUser) {
      throw new Error("Username does not exist");
    }
    if (user.password !== currentUser.password) {
      throw new Error("Password incorrect");
    } else {
      setUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
