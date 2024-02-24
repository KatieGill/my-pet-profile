import { z } from "zod";
import { speciesSchema, breedSchema } from "./enums";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
});

export const userInformationSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export const petSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  species: speciesSchema,
  breed: breedSchema,
  image: z.string(),
  dob: z.coerce.date(),
});

export const dietSchema = z.object({
  id: z.number(),
  petId: z.number(),
  name: z.string(),
  amount: z.string(),
  frequency: z.string(),
});

export const medicationSchema = z.object({
  id: z.number(),
  petId: z.number(),
  name: z.string(),
  amount: z.string(),
  frequency: z.string(),
  note: z.string().optional(),
});

export const petInformationSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  species: speciesSchema,
  breed: breedSchema,
  image: z.string(),
  dob: z.coerce.date(),
  diets: z.array(dietSchema),
  medications: z.array(medicationSchema),
});

export const hospitalSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  image: z.string(),
  website: z.string(),
});

export const hospitalNoteSchema = z.object({
  id: z.number(),
  userId: z.number(),
  hospitalId: z.number(),
  note: z.string(),
});

export const hospitalFavoriteSchema = z.object({
  id: z.number(),
  userId: z.number(),
  hospitalId: z.number(),
  hospital: hospitalSchema.optional(),
});

export const hospitalNoteInfoSchema = z.object({
  hospital: hospitalSchema.partial(),
  id: z.number(),
  userId: z.number(),
  hospitalId: z.number(),
  note: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Pet = z.infer<typeof petSchema>;
export type Diet = z.infer<typeof dietSchema>;
export type Medication = z.infer<typeof medicationSchema>;
export type Hospital = z.infer<typeof hospitalSchema>;
export type HospitalNote = z.infer<typeof hospitalNoteSchema>;
export type HospitalFavorite = z.infer<typeof hospitalFavoriteSchema>;
export type Species = z.infer<typeof speciesSchema>;
export type Breed = z.infer<typeof breedSchema>;
export type UserInformation = z.infer<typeof userInformationSchema>;
export type PetInformation = z.infer<typeof petInformationSchema>;
export type HospitalNoteInfo = z.infer<typeof hospitalNoteInfoSchema>;

export type AuthState = "loading" | "unauthenticated" | "authenticated";
