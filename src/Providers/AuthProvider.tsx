import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Requests } from "../api";
import { User } from "../Types/types";
import toast from "react-hot-toast";

type AuthProvider = {
  user: User | null;
  authState: AuthState;
  setUser: (user: User) => void;
  registerUser: (user: Omit<User, "id">) => Promise<string>;
  login: (user: Omit<User, "id">) => Promise<void>;
  logout: () => void;
};

type AuthState = "loading" | "unauthenticated" | "authenticated";

export const AuthContext = createContext<AuthProvider | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calculateAuthState = (
    user: User | null,
    isLoading: boolean
  ): AuthState => {
    if (isLoading) return "loading";
    else if (!user) return "unauthenticated";
    else return "authenticated";
  };

  const registerUser = (user: Omit<User, "id">) => {
    return Requests.postUser(user).then(() => toast.success("User registered"));
  };

  const login = async (user: Omit<User, "id">) => {
    setIsLoading(true);
    const currentUser = await Requests.getUser(user.username);
    if (user.password !== currentUser.password) {
      throw new Error("Password incorrect");
    } else {
      try {
        setUser(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    try {
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const authState = calculateAuthState(user, isLoading);

  return (
    <AuthContext.Provider
      value={{
        user,
        authState,
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
