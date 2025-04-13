import { z } from 'zod';

export const MonthlyBudgetSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  category_id: z.string().uuid(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(1900), // puedes ajustar el mínimo si lo deseas
  budget_amount: z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, {
    message: 'Must be a decimal with up to 15 digits and 2 decimal places',
  }),
  spent_amount: z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, {
    message: 'Must be a decimal with up to 15 digits and 2 decimal places',
  }),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const CreateMonthlyBudgetSchema = MonthlyBudgetSchema.omit({
  id: true,
  created_at: true,
});

export const PartialMonthlyBudgetSchema = MonthlyBudgetSchema.partial();

export type MonthlyBudget = z.infer<typeof MonthlyBudgetSchema>;
export type CreateMonthlyBudget = z.infer<typeof CreateMonthlyBudgetSchema>;
export type PartialMonthlyBudget = z.infer<typeof PartialMonthlyBudgetSchema>;
