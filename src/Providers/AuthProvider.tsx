import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { Requests } from "../api";
import { User } from "../types";
import toast from "react-hot-toast";

type AuthProvider = {
  user: User | undefined;
  setUser: (user: User) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  registerUser: (user: Omit<User, "id">) => Promise<string>;
  login: (user: Omit<User, "id">) => Promise<void>;
};

const AuthContext = createContext<AuthProvider>({} as AuthProvider);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerUser = (user: Omit<User, "id">) => {
    return Requests.postUser(user).then(() => toast.success("User registered"));
  };

  const login = async (user: Omit<User, "id">) => {
    const currentUser = await Requests.getUser(user.username);
    if (!currentUser) {
      toast.error(`Unable to find ${user.username}`);
    }
    if (user.password !== currentUser.password) {
      toast.error("password incorrect");
    } else {
      setUser(currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, registerUser, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "You should never use this outside of the context of a AuthProvider"
    );
  return context;
};
