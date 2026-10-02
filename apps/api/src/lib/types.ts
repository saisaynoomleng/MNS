import * as z from 'zod';
import type { auth } from '../lib/auth.js';

declare global {
  namespace Express {
    interface Request {
      user: typeof auth.$Infer.Session.user;
    }
  }
}

export const IdParamsSchema = z.object({
  id: z.uuid().min(1, { error: 'ID is required' }),
});
