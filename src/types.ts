import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
});

export const speciesSchema = z.enum(["dog", "cat"]);

export const petSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  species: speciesSchema,
  breed: z.string(),
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

export const hospitalSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  image: z.string(),
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
});

export type User = z.infer<typeof userSchema>;
export type Pet = z.infer<typeof petSchema>;
export type Diet = z.infer<typeof dietSchema>;
export type Medication = z.infer<typeof medicationSchema>;
export type Hospital = z.infer<typeof hospitalSchema>;
export type HospitalNote = z.infer<typeof hospitalNoteSchema>;
export type HospitalFavorite = z.infer<typeof hospitalFavoriteSchema>;
export type Species = z.infer<typeof speciesSchema>;
