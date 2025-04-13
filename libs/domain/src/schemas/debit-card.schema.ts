import { BankSchema } from './bank.schema';
import { UserSchema } from './user.schema';
import { z } from 'zod';

export const DebitCardSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  bank_id: z.string().uuid(),
  card_name: z.string().min(1).max(100),
  color: z.string().max(20).optional(),
  current_balance: z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, {
    message: 'Must be a decimal with up to 15 digits and 2 decimal places',
  }),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const DebitCardRelSchema = DebitCardSchema.extend({
  user: UserSchema,
  bank: BankSchema,
});

export const CreateDebitCardSchema = DebitCardSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const PartialDebitCardSchema = DebitCardSchema.partial();

export type DebitCard = z.infer<typeof DebitCardSchema>;
export type DebitCardRel = z.infer<typeof DebitCardRelSchema>;
export type CreateDebitCard = z.infer<typeof CreateDebitCardSchema>;
export type PartialDebitCard = z.infer<typeof PartialDebitCardSchema>;
