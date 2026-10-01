import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: { API_URL: z.url({ error: 'Must be a valid URL' }) },
  runtimeEnv: {
    API_URL: process.env.API_URL,
  },
  skipValidation: !!process.env.SKIP_VALIDATION,
});
