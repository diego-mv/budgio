import { z } from 'zod';

export const BankSchema = z.object({
  id: z.string().uuid(),
  bank_name: z.string().min(1).max(100),
  country: z.string().max(50).optional(),
  website: z.string().max(100).optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const CreateBankSchema = BankSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const PartialBankSchema = BankSchema.partial();

export type Bank = z.infer<typeof BankSchema>;
export type CreateBank = z.infer<typeof CreateBankSchema>;
export type PartialBank = z.infer<typeof PartialBankSchema>;
