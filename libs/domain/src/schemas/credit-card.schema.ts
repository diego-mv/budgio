import { BankSchema } from './bank.schema';
import { UserSchema } from './user.schema';
import { z } from 'zod';

export const CreditCardSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  bank_id: z.string().uuid(),
  card_name: z.string().min(1).max(100),
  credit_limit: z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, {
    message: 'Must be a decimal with up to 15 digits and 2 decimal places',
  }),
  color: z.string().max(20).optional(),
  expiration_date: z.coerce.date().optional(),
  interest_rate: z
    .string()
    .regex(/^\d{1,3}(\.\d{1,2})?$/, {
      message: 'Must be a decimal with up to 5 digits and 2 decimal places',
    })
    .optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const CreditCardRelSchema = CreditCardSchema.extend({
  user: UserSchema,
  bank: BankSchema,
});

export const CreateCreditCardSchema = CreditCardSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const PartialCreditCardSchema = CreditCardSchema.partial();

export type CreditCard = z.infer<typeof CreditCardSchema>;
export type CreateCreditCard = z.infer<typeof CreateCreditCardSchema>;
export type PartialCreditCard = z.infer<typeof PartialCreditCardSchema>;
export type CreditCardRel = z.infer<typeof CreditCardRelSchema>;
