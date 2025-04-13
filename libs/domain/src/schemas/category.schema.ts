import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  description: z.string().max(255).optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  created_at: true,
});

export const PartialCategorySchema = CategorySchema.partial();

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type PartialCategory = z.infer<typeof PartialCategorySchema>;
