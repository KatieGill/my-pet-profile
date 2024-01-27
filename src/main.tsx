import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CreateLoginForm } from "./Components/CreateLoginForm.tsx";
import { LoginForm } from "./Components/LoginForm.tsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Providers/AuthProvider.tsx";
import { UserDataProvider } from "./Providers/UserDataProvider.tsx";
import { UserProfile } from "./Components/UserProfile/UserProfile.tsx";
import { AddPet } from "./Components/UserProfile/components/AddPet.tsx";
import { PetProfile } from "./Components/PetProfile/PetProfile.tsx";
import { AddDiet } from "./Components/PetProfile/components/AddDiet.tsx";
import { AddMedication } from "./Components/PetProfile/components/AddMedication.tsx";
import { ExploreHospitals } from "./Components/UserProfile/components/ExploreHospitals.tsx";
import { AddHospitalNote } from "./Components/UserProfile/components/AddHospitalNote.tsx";
import { EditHospitalNote } from "./Components/UserProfile/components/EditHospitalNote.tsx";
import { EditDiet } from "./Components/PetProfile/components/EditDiet.tsx";
import { EditMedication } from "./Components/PetProfile/components/EditMedication.tsx";
import { ConfirmDelete } from "./Components/PetProfile/components/ConfirmDelete.tsx";
import { EditPet } from "./Components/PetProfile/components/EditPet.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { ErrorElement } from "./ErrorElement.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorElement /> },
  {
    path: "/create-login",
    element: <CreateLoginForm />,
    errorElement: <ErrorElement />,
  },
  { path: "/login", element: <LoginForm />, errorElement: <ErrorElement /> },
  {
    path: "/user-profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/add-pet",
    element: (
      <ProtectedRoute>
        <AddPet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/pet-profile",
    element: (
      <ProtectedRoute>
        <PetProfile />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/add-diet",
    element: (
      <ProtectedRoute>
        <AddDiet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/add-medication",
    element: (
      <ProtectedRoute>
        <AddMedication />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/vet-hospitals",
    element: (
      <ProtectedRoute>
        <ExploreHospitals />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/add-hospital-note",
    element: (
      <ProtectedRoute>
        <AddHospitalNote />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/edit-hospital-note",
    element: (
      <ProtectedRoute>
        <EditHospitalNote />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/edit-diet",
    element: (
      <ProtectedRoute>
        <EditDiet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/edit-medication",
    element: (
      <ProtectedRoute>
        <EditMedication />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/delete-pet-profile",
    element: (
      <ProtectedRoute>
        <ConfirmDelete />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: "/edit-pet",
    element: (
      <ProtectedRoute>
        <EditPet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
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
