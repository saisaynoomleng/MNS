import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_STUDIO_DATASET: z
      .enum(['production', 'development'])
      .default('production'),
    SANITY_STUDIO_PROJECT_ID: z
      .string()
      .min(1, { error: 'Sanity Project ID is required' }),
    API_URL: z.url({ error: 'Must be a valid URL' }),
  },
  runtimeEnv: {
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    API_URL: process.env.API_URL,
  },
  skipValidation: !!process.env.SKIP_VALIDATION,
});
