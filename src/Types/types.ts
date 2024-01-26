import { z } from "zod";
import { speciesSchema, breedSchema } from "./enums";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export const petSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  species: speciesSchema,
  breed: breedSchema,
  image: z.string(),
  dob: z.coerce.date(),
});

export const dietSchema = z.object({
  id: z.string(),
  petId: z.string(),
  name: z.string(),
  amount: z.string(),
  frequency: z.string(),
});

export const medicationSchema = z.object({
  id: z.string(),
  petId: z.string(),
  name: z.string(),
  amount: z.string(),
  frequency: z.string(),
  note: z.string().optional(),
});

export const hospitalSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  image: z.string(),
  website: z.string(),
});

export const hospitalNoteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  hospitalId: z.string(),
  note: z.string(),
});

export const hospitalFavoriteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  hospitalId: z.string(),
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
