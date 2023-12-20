import { z } from "zod";
import {
  Pet,
  User,
  Diet,
  dietSchema,
  petSchema,
  userSchema,
  Medication,
  medicationSchema,
  HospitalNote,
  hospitalNoteSchema,
  HospitalFavorite,
  hospitalFavoriteSchema,
} from "./types";

const baseUrl = "http://localhost:3000";

export const Requests = {
  postUser: (user: Omit<User, "id">) => {
    return fetch(`${baseUrl}/users`, {
      body: JSON.stringify(user),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to create user");
        } else {
          return response.json();
        }
      })
      .then((data) => userSchema.parse(data));
  },

  postPet: (pet: Omit<Pet, "id">) => {
    return fetch(`${baseUrl}/pets`, {
      body: JSON.stringify(pet),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to create pet");
        } else {
          return response.json();
        }
      })
      .then((data) => petSchema.parse(data));
  },

  postDiet: (diet: Omit<Diet, "id">) => {
    return fetch(`${baseUrl}/diets`, {
      body: JSON.stringify(diet),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to create diet");
        } else {
          return response.json();
        }
      })
      .then((data) => dietSchema.parse(data));
  },

  postMedication: (medication: Omit<Medication, "id">) => {
    return fetch(`${baseUrl}/medications`, {
      body: JSON.stringify(medication),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to create medication");
        } else {
          return response.json();
        }
      })
      .then((data) => medicationSchema.parse(data));
  },

  postHospitalNote: (hospitalNote: Omit<HospitalNote, "id">) => {
    return fetch(`${baseUrl}/hospital-notes`, {
      body: JSON.stringify(hospitalNote),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to create hospital note");
        } else {
          return response.json();
        }
      })
      .then((data) => hospitalNoteSchema.parse(data));
  },

  postHospitalFavorite: (hospitalFavorite: Omit<HospitalFavorite, "id">) => {
    return fetch(`${baseUrl}/hospital-favorites`, {
      body: JSON.stringify(hospitalFavorite),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to create hospital favorite");
        } else {
          return response.json();
        }
      })
      .then((data) => hospitalFavoriteSchema.parse(data));
  },

  getUser: (username: string) => {
    return fetch(`${baseUrl}/users`)
      .then((response) => {
        if (!response) {
          throw new Error("Unable to fetch all users");
        } else {
          return response.json();
        }
      })
      .then((data) => z.array(userSchema).parse(data))
      .then((users) => users.find((user) => user.username === username))
      .then((user) => {
        if (!user) {
          throw new Error("User not found");
        } else {
          return user;
        }
      });
  },
};
