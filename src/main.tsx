import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CreateLoginForm } from "./Components/CreateLoginForm.tsx";
import { LoginForm } from "./Components/LoginForm.tsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Providers/AuthProvider.tsx";
import { UserDataProvider } from "./Providers/UserDataProvider.tsx";
import { UserProfile } from "./Components/UserProfile/UserProfile.tsx";
import { AddPet } from "./Components/UserProfile/components/AddPet.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-login", element: <CreateLoginForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/user-profile", element: <UserProfile /> },
  { path: "/add-pet", element: <AddPet /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <AuthProvider>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
