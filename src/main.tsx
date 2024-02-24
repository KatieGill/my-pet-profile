import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
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
import { ConfirmDeletePet } from "./Components/PetProfile/components/ConfirmDeletePet.tsx";
import { EditPet } from "./Components/PetProfile/components/EditPet.tsx";
import { ProtectedRouteUser } from "./Components/UserProfile/ProtectedRouteUser.tsx";
import { PageNotFound } from "./PageNotFound.tsx";
import { EditUser } from "./Components/UserProfile/components/EditUser.tsx";
import { RootLayout } from "./Components/RootLayout.tsx";
import { PetDataProvider } from "./Providers/PetDataProvider.tsx";
import {
  hospitalNoteLoader,
  petDietLoader,
  petMedicationLoader,
  petProfileLoader,
  petProtectedRouteLoader,
  userProtectedRouteLoader,
} from "./loaderFunctions.ts";
import { ConfirmDeleteUser } from "./Components/UserProfile/components/ConfirmDeleteUser.tsx";
import { ProtectedRoutePet } from "./Components/PetProfile/ProtectedRoutePet.tsx";
import { UserDoesNotExist } from "./UserDoesNotExist.tsx";
import { PetDoesNotExist } from "./PetDoesNotExist.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      <Route path="/create-login" element={<CreateLoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/user-profile/:username"
        element={
          <ProtectedRouteUser>
            <RootLayout />
          </ProtectedRouteUser>
        }
        loader={userProtectedRouteLoader}
        errorElement={<UserDoesNotExist />}
      >
        <Route index element={<UserProfile />} />
        <Route path="edit-user" element={<RootLayout />}>
          <Route index element={<EditUser />} />
          <Route path="delete-user-profile" element={<ConfirmDeleteUser />} />
        </Route>

        <Route path="add-pet" element={<AddPet />} />
        <Route path="vet-hospitals" element={<ExploreHospitals />} />
        <Route path="add-hospital-note" element={<AddHospitalNote />} />
        <Route
          path="edit-hospital-note/:hospitalNoteId"
          element={<EditHospitalNote />}
          loader={hospitalNoteLoader}
        />
        <Route
          path="pet-profile/:petId"
          element={
            <ProtectedRoutePet>
              <RootLayout />
            </ProtectedRoutePet>
          }
          loader={petProtectedRouteLoader}
          errorElement={<PetDoesNotExist />}
        >
          <Route index element={<PetProfile />} loader={petProfileLoader} />
          <Route
            path="edit-pet"
            element={<RootLayout />}
            loader={petProfileLoader}
          >
            <Route index element={<EditPet />} loader={petProfileLoader} />
            <Route
              path="delete-pet-profile"
              element={<ConfirmDeletePet />}
              loader={petProfileLoader}
            />
          </Route>
          <Route
            path="add-diet"
            element={<AddDiet />}
            loader={petProfileLoader}
          />
          <Route
            path="edit-diet/:dietId"
            element={<EditDiet />}
            loader={petDietLoader}
          />
          <Route
            path="add-medication"
            element={<AddMedication />}
            loader={petProfileLoader}
          />
          <Route
            path="edit-medication/:medicationId"
            element={<EditMedication />}
            loader={petMedicationLoader}
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <AuthProvider>
      <UserDataProvider>
        <PetDataProvider>
          <RouterProvider router={router} />
        </PetDataProvider>
      </UserDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
