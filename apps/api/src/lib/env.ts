import dotenv from 'dotenv';
import * as z from 'zod';

const appStage = process.env.APP_STAGE ?? 'dev';

dotenv.config({
  path: appStage === 'test' ? '.env.test' : '.env',
});

const schema = z.object({
  // Database
  DATABASE_URL: z
    .string()
    .startsWith('postgresql://')
    .min(1, { error: 'Database URL is required' }),

  // Auth
  BETTER_AUTH_SECRET: z
    .string()
    .min(1, { error: 'Better Auth secret is required' }),
  BETTER_AUTH_URL: z
    .url({ error: 'Must be a valid URL' })
    .min(1, { error: 'BetterAuth URL is required' }),

  // CORS
  AGENCY_FRONT_URL: z
    .url({ error: 'Must be a valid URL' })
    .min(1, { error: 'Agency URL is required' }),
  ADMIN_URL: z
    .url({ error: 'Must be a valid URL' })
    .min(1, { error: 'Amdmin URL is required' }),
  SMILO_URL: z
    .url({ error: 'Must be a valid URL' })
    .min(1, { error: 'Smilo URL is required' }),
  ALLOW_ORIGINS: z.string().min(1, { error: 'Allow Origin is required' }),

  // Server
  PORT: z.coerce.number().default(8000),
  NODE_ENV: z.enum(['production', 'development']).default('development'),
  APP_STAGE: z.enum(['dev', 'prod', 'test']).default('dev'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

  //   Logging
  LOG_LEVEL: z.string().min(1, 'Log Level is required'),

  //   AWS
  AWS_REGION: z.string().min(1, { error: 'AWS region is required' }),
  AWS_SECRET_ACCESS_KEY: z
    .string()
    .min(1, { error: 'AWS secret access key is required' }),
  AWS_ACCESS_KEY: z.string().min(1, { error: 'AWS access key is required' }),
});

type ENV = z.infer<typeof schema>;

let env: ENV;

try {
  env = schema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log(`Invalid environment variables`);

    error.issues.forEach((e) => {
      const message = e.message;
      const path = e.path.join('.');

      console.log(`${path}: ${message}`);
    });
  }

  process.exit(1);
}

export const isProd = () => process.env.APP_STAGE === 'prod';
export const isDev = () => process.env.APP_STAGE === 'dev';
export const isTest = () => process.env.APP_STAGE === 'test';

export default env;
