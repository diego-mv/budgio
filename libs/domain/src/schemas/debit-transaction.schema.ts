import { CategorySchema } from './category.schema';
import { DebitCardSchema } from './debit-card.schema';
import { z } from 'zod';

export const DebitTransactionSchema = z.object({
  id: z.string().uuid(),
  debit_card_id: z.string().uuid(),
  transaction_date: z.coerce.date(),
  amount: z.string().regex(/^\d{1,13}(\.\d{1,2})?$/, {
    message: 'Must be a decimal with up to 15 digits and 2 decimal places',
  }),
  description: z.string().max(255).optional(),
  category_id: z.string().uuid(),
  created_at: z.coerce.date(),
});

export const DebitTransactionRelSchema = DebitTransactionSchema.extend({
  debit_card: DebitCardSchema,
  category: CategorySchema,
});

export const CreateDebitTransactionSchema = DebitTransactionSchema.omit({
  id: true,
  created_at: true,
});

export const PartialDebitTransactionSchema = DebitTransactionSchema.partial();

export type DebitTransaction = z.infer<typeof DebitTransactionSchema>;
export type DebitTransactionRel = z.infer<typeof DebitTransactionRelSchema>;
export type CreateDebitTransaction = z.infer<
  typeof CreateDebitTransactionSchema
>;
export type PartialDebitTransaction = z.infer<
  typeof PartialDebitTransactionSchema
>;
