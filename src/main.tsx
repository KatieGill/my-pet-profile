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
import { CreateDietForm } from "./Components/PetProfile/components/AddDietForm.tsx";
import { CreateMedicationForm } from "./Components/PetProfile/components/AddMedicationForm.tsx";
import { Hospitals } from "./Components/UserProfile/components/Hospitals.tsx";
import { AddHospitalNote } from "./Components/UserProfile/components/AddHospitalNote.tsx";
import { EditHospitalNote } from "./Components/UserProfile/components/EditHospitalNote.tsx";
import { EditDietForm } from "./Components/PetProfile/components/EditDietForm.tsx";
import { EditMedicationForm } from "./Components/PetProfile/components/EditMedicationFrom.tsx";
import { ConfirmDelete } from "./Components/PetProfile/components/ConfirmDelete.tsx";
import { EditPet } from "./Components/PetProfile/components/EditPet.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-login", element: <CreateLoginForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/user-profile", element: <UserProfile /> },
  { path: "/add-pet", element: <AddPet /> },
  { path: "/pet-profile", element: <PetProfile /> },
  { path: "/add-diet", element: <CreateDietForm /> },
  { path: "/add-medication", element: <CreateMedicationForm /> },
  { path: "/vet-hospitals", element: <Hospitals /> },
  { path: "/add-hospital-note", element: <AddHospitalNote /> },
  { path: "/edit-hospital-note", element: <EditHospitalNote /> },
  { path: "/edit-diet", element: <EditDietForm /> },
  { path: "/edit-medication", element: <EditMedicationForm /> },
  { path: "/delete-pet-profile", element: <ConfirmDelete /> },
  { path: "/edit-pet", element: <EditPet /> },
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
