import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_API_URL: z.url({ error: 'Must be a valid URL' }),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z
      .string()
      .min(1, { error: 'Sanity Project ID is required!' }),
    NEXT_PUBLIC_SANITY_DATASET: z.enum(['production', 'development']),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
