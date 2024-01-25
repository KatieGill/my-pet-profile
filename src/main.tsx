import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
import "./responsive.css";
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

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-login", element: <CreateLoginForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/user-profile", element: <UserProfile /> },
  { path: "/add-pet", element: <AddPet /> },
  { path: "/pet-profile", element: <PetProfile /> },
  { path: "/add-diet", element: <AddDiet /> },
  { path: "/add-medication", element: <AddMedication /> },
  { path: "/vet-hospitals", element: <ExploreHospitals /> },
  { path: "/add-hospital-note", element: <AddHospitalNote /> },
  { path: "/edit-hospital-note", element: <EditHospitalNote /> },
  { path: "/edit-diet", element: <EditDiet /> },
  { path: "/edit-medication", element: <EditMedication /> },
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
