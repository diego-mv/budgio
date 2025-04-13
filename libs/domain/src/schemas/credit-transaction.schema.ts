import { CreditCardSchema } from './credit-card.schema';
import { z } from 'zod';

export const CreditTransactionSchema = z.object({
  id: z.string().uuid(),
  credit_card_id: z.string().uuid(),
  transaction_date: z.coerce.date(),
  amount: z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, {
    message: 'Must be a decimal with up to 15 digits and 2 decimal places',
  }),
  description: z.string().max(255).optional(),
  category_id: z.string().uuid(),
  total_installments: z.number().int().min(1),
  installment_number: z.number().int().min(1),
  applied_interest_rate: z
    .string()
    .regex(/^\d{1,3}(\.\d{1,2})?$/, {
      message: 'Must be a decimal with up to 5 digits and 2 decimal places',
    })
    .optional(),
  created_at: z.coerce.date(),
});

export const CreditTransactionRelSchema = CreditTransactionSchema.extend({
  credit_card: CreditCardSchema,
});

export const CreateCreditTransactionSchema = CreditTransactionSchema.omit({
  id: true,
  created_at: true,
});

export const PartialCreditTransactionSchema = CreditTransactionSchema.partial();

export type CreditTransaction = z.infer<typeof CreditTransactionSchema>;
export type CreateCreditTransaction = z.infer<
  typeof CreateCreditTransactionSchema
>;
export type PartialCreditTransaction = z.infer<
  typeof PartialCreditTransactionSchema
>;
export type CreditTransactionRel = z.infer<typeof CreditTransactionRelSchema>;
