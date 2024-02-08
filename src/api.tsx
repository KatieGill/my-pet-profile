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
  hospitalSchema,
  authenticatedUserDataSchema,
  userInformationSchema,
} from "./Types/types";

const baseUrl = "http://localhost:3000";

export const Requests = {
  login: (user: Omit<User, "id">) => {
    return fetch(`${baseUrl}/auth/login`, {
      body: JSON.stringify(user),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to login");
        } else {
          return response.json();
        }
      })
      .then((data) => authenticatedUserDataSchema.parse(data));
  },
  getLoggedInUserData: (username: string) => {
    return fetch(`${baseUrl}/user/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to get user data");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        return userInformationSchema.parse(data.userInformation);
      });
  },
  postUser: (user: Omit<User, "id">) => {
    return fetch(`${baseUrl}/user`, {
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
    return fetch(`${baseUrl}/hospital-note`, {
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

  postHospitalFavorite: (
    hospitalFavorite: Omit<HospitalFavorite, "id" | "hospital">
  ) => {
    return fetch(`${baseUrl}/hospital-favorite`, {
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
          throw new Error("Username not found");
        } else {
          return user;
        }
      });
  },

  getPets: (userId: string) => {
    return fetch(`${baseUrl}/pets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch all pets");
        } else {
          return response.json();
        }
      })
      .then((data) => z.array(petSchema).parse(data))
      .then((pets) => pets.filter((pet) => pet.userId === userId))
      .then((userPets) => userPets);
  },

  getDiets: (petId: string) => {
    return fetch(`${baseUrl}/diets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch all diets");
        } else {
          return response.json();
        }
      })
      .then((data) => z.array(dietSchema).parse(data))
      .then((diets) => diets.filter((diet) => diet.petId === petId))
      .then((petDiets) => petDiets);
  },

  getMedications: (petId: string) => {
    return fetch(`${baseUrl}/medications`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch all diets");
        } else {
          return response.json();
        }
      })
      .then((data) => z.array(medicationSchema).parse(data))
      .then((medications) =>
        medications.filter((medication) => medication.petId === petId)
      )
      .then((petMedications) => petMedications);
  },

  getHospitals: () => {
    return fetch(`${baseUrl}/hospital`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch all hospitals");
        } else {
          return response.json();
        }
      })
      .then((data) => z.array(hospitalSchema).parse(data.allHospitals));
  },

  getUserHospitalFavorites: (userId: number) => {
    return fetch(`${baseUrl}/hospital-favorite/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch all hospital favorites");
        } else {
          return response.json();
        }
      })
      .then((data) => z.array(hospitalFavoriteSchema).parse(data))
      .then((favorites) =>
        favorites.filter((favorites) => favorites.userId === userId)
      )
      .then((data) => z.array(hospitalFavoriteSchema).parse(data))
      .then((hospitalFavorites) => hospitalFavorites);
  },

  getUserHospitalNotes: (userId: number) => {
    return fetch(`${baseUrl}/hospital-note/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch all hospital notes");
        } else {
          return response.json();
        }
      })
      .then((data) => z.array(hospitalNoteSchema).parse(data))
      .then((notes) => notes.filter((note) => note.userId === userId))
      .then((data) => z.array(hospitalNoteSchema).parse(data))
      .then((userNotes) => userNotes);
  },

  patchHospitalNote: (noteId: number, note: string) => {
    return fetch(`${baseUrl}/hospital-note/${noteId}`, {
      body: JSON.stringify({ note: note }),
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to edit note");
        } else {
          return response.json();
        }
      })
      .then((data) => hospitalNoteSchema.parse(data));
  },

  putDiet: (diet: Diet) => {
    return fetch(`${baseUrl}/diets/${diet.id}`, {
      body: JSON.stringify({
        petId: diet.petId,
        name: diet.name,
        amount: diet.amount,
        frequency: diet.frequency,
      }),
      method: "PUT",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to update diet");
        } else {
          return response.json();
        }
      })
      .then((data) => dietSchema.parse(data));
  },

  putMedication: (medication: Medication) => {
    return fetch(`${baseUrl}/medications/${medication.id}`, {
      body: JSON.stringify({
        petId: medication.petId,
        name: medication.name,
        amount: medication.amount,
        frequency: medication.frequency,
        note: medication.note,
      }),
      method: "PUT",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to update medication");
        } else {
          return response.json();
        }
      })
      .then((data) => medicationSchema.parse(data));
  },

  putPet: (pet: Pet) => {
    return fetch(`${baseUrl}/pets/${pet.id}`, {
      body: JSON.stringify({
        userId: pet.userId,
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        image: pet.image,
        dob: pet.dob,
      }),
      method: "PUT",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to update pet");
        } else {
          return response.json();
        }
      })
      .then((data) => petSchema.parse(data));
  },

  deleteDiet: (dietId: string) => {
    return fetch(`${baseUrl}/diets/${dietId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to delete diet");
      }
    });
  },

  deleteMedication: (medicationId: string) => {
    return fetch(`${baseUrl}/medications/${medicationId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to delete medication");
      }
    });
  },

  deleteHospitalFavorite: (hospitalFavoriteId: number) => {
    return fetch(`${baseUrl}/hospital-favorite/${hospitalFavoriteId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to remove favorite");
      }
    });
  },

  deleteHospitalNote: (hospitalNoteId: number) => {
    return fetch(`${baseUrl}/hospital-note/${hospitalNoteId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to delete note");
      }
    });
  },

  deletePet: (petId: string) => {
    return fetch(`${baseUrl}/pets/${petId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to delete pet");
      }
    });
  },
};
