import { z } from "zod";
import {
  Pet,
  User,
  Diet,
  dietSchema,
  petSchema,
  Medication,
  medicationSchema,
  HospitalNote,
  hospitalNoteSchema,
  HospitalFavorite,
  hospitalFavoriteSchema,
  hospitalSchema,
  userInformationSchema,
  petInformationSchema,
  hospitalNoteInfoSchema,
} from "./Types/types";

const baseUrl = "http://localhost:3000";

export const Requests = {
  login: (user: Omit<User, "id">) => {
    return fetch(`${baseUrl}/auth/login`, {
      body: JSON.stringify(user),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => userInformationSchema.parse(data));
  },

  getLoggedInUserData: (userId: number) => {
    return fetch(`${baseUrl}/user/${userId}`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((userInformation) => {
        return userInformationSchema.parse(userInformation);
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
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => userInformationSchema.parse(data));
  },

  postPet: (pet: Omit<Pet, "id">) => {
    return fetch(`${baseUrl}/pet`, {
      body: JSON.stringify(pet),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((pet) => petSchema.parse(pet));
  },

  postDiet: (diet: Omit<Diet, "id">) => {
    return fetch(`${baseUrl}/diet`, {
      body: JSON.stringify(diet),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((diet) => dietSchema.parse(diet));
  },

  postMedication: (medication: Omit<Medication, "id">) => {
    return fetch(`${baseUrl}/medication`, {
      body: JSON.stringify(medication),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((medication) => medicationSchema.parse(medication));
  },

  postHospitalNote: (hospitalNote: Omit<HospitalNote, "id">) => {
    return fetch(`${baseUrl}/hospital-note`, {
      body: JSON.stringify(hospitalNote),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((hospitalNote) => hospitalNoteSchema.parse(hospitalNote));
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
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((hospitalFavorite) =>
        hospitalFavoriteSchema.parse(hospitalFavorite)
      );
  },

  getPets: (userId: number) => {
    return fetch(`${baseUrl}/pet/user-pets/${userId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((pets) => z.array(petSchema).parse(pets));
  },

  getCurrentPetInfo: (petId: number) => {
    return fetch(`${baseUrl}/pet/${petId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((petInfo) => {
        return petInformationSchema.parse(petInfo);
      });
  },

  getDiets: (petId: number) => {
    return fetch(`${baseUrl}/diets/${petId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((diets) => z.array(dietSchema).parse(diets));
  },

  getCurrentDiet: (dietId: number) => {
    return fetch(`${baseUrl}/diet/${dietId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((diet) => dietSchema.parse(diet));
  },

  getMedications: (petId: number) => {
    return fetch(`${baseUrl}/medications/${petId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((medications) => z.array(medicationSchema).parse(medications));
  },

  getCurrentMedication: (medicationId: number) => {
    return fetch(`${baseUrl}/medication/${medicationId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((medication) => medicationSchema.parse(medication));
  },

  getHospitals: () => {
    return fetch(`${baseUrl}/hospital`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((allHospitals) => z.array(hospitalSchema).parse(allHospitals));
  },

  getUserHospitalFavorites: (userId: number) => {
    return fetch(`${baseUrl}/hospital-favorite/${userId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((hospitalFavorites) =>
        z.array(hospitalFavoriteSchema).parse(hospitalFavorites)
      );
  },

  getUserHospitalNotes: (userId: number) => {
    return fetch(`${baseUrl}/hospital-notes/${userId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((hospitalNotes) =>
        z.array(hospitalNoteSchema).parse(hospitalNotes)
      );
  },

  getCurrentHospitalNote: (hospitalNoteId: number) => {
    return fetch(`${baseUrl}/hospital-note/${hospitalNoteId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((hospitalNote) => hospitalNoteInfoSchema.parse(hospitalNote));
  },

  getUserByUsername: (username: string) => {
    return fetch(`${baseUrl}/user/find-user/${username}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((userInformation) => userInformationSchema.parse(userInformation));
  },

  patchHospitalNote: (noteId: number, note: string) => {
    return fetch(`${baseUrl}/hospital-note/${noteId}`, {
      body: JSON.stringify({ note: note }),
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((hospitalNote) => hospitalNoteSchema.parse(hospitalNote));
  },

  patchUsername: (username: string, userId: number) => {
    return fetch(`${baseUrl}/user/update-username/${userId}`, {
      body: JSON.stringify({ username: username }),
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => userInformationSchema.parse(data));
  },

  patchPassword: (password: string, userId: number) => {
    return fetch(`${baseUrl}/user/update-password/${userId}`, {
      body: JSON.stringify({ password: password }),
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => userInformationSchema.parse(data));
  },

  putDiet: (diet: Diet) => {
    return fetch(`${baseUrl}/diet/${diet.id}`, {
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
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((diet) => dietSchema.parse(diet));
  },

  putMedication: (medication: Medication) => {
    return fetch(`${baseUrl}/medication/${medication.id}`, {
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
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((medication) => medicationSchema.parse(medication));
  },

  putPet: (pet: Pet) => {
    return fetch(`${baseUrl}/pet/${pet.id}`, {
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
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        } else {
          return response.json();
        }
      })
      .then((pet) => petSchema.parse(pet));
  },

  deleteDiet: (dietId: number) => {
    return fetch(`${baseUrl}/diet/${dietId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      } else {
        return response.json();
      }
    });
  },

  deleteMedication: (medicationId: number) => {
    return fetch(`${baseUrl}/medication/${medicationId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      } else {
        return response.json();
      }
    });
  },

  deleteHospitalFavorite: (hospitalFavoriteId: number) => {
    return fetch(`${baseUrl}/hospital-favorite/${hospitalFavoriteId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      } else {
        return response.json();
      }
    });
  },

  deleteHospitalNote: (hospitalNoteId: number) => {
    return fetch(`${baseUrl}/hospital-note/${hospitalNoteId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      } else {
        return response.json();
      }
    });
  },

  deletePet: (petId: number) => {
    return fetch(`${baseUrl}/pet/${petId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      } else {
        return response.json();
      }
    });
  },

  deleteUser: (userId: number) => {
    return fetch(`${baseUrl}/user/${userId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      } else {
        return response.json();
      }
    });
  },
};
