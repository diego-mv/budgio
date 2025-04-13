import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  password_hash: true,
});

export const PartialUserSchema = UserSchema.partial();

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof UserSchema>;
export type PartialUser = z.infer<typeof UserSchema>;
