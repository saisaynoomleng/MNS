import { SESClient } from '@aws-sdk/client-ses';
import env, { isProd } from './env.js';

export const emailClient = new SESClient({
  region: env.AWS_REGION,

  ...(isProd()
    ? {}
    : {
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      }),
});
