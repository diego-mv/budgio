import { z } from 'zod';

export const TokenTypeEnum = z.enum(['access', 'refresh']);

export const UserTokenSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  token_hash: z.string(),
  token_type: TokenTypeEnum,
  issued_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  invalidated_at: z.coerce.date().nullable().optional(),
  is_manual: z.boolean().default(false),
});

export type UserToken = z.infer<typeof UserTokenSchema>;
