import { SendEmailCommand } from '@aws-sdk/client-ses';
import { renderWelcomeEmail } from '@mns/email';
import type { WelcomeEmailProps } from '@mns/utils';
import { emailClient } from '../../lib/emailClient.js';
import env from '../../lib/env.js';

export const welcomeEmail = async ({
  name,
  email,
}: WelcomeEmailProps & { email: string }) => {
  try {
    const html = await renderWelcomeEmail({ name });

    await emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_ADDRESS,

        Destination: { ToAddresses: [email] },

        Message: {
          Subject: {
            Data: 'Welcome to MNS',
            Charset: 'utf-8',
          },

          Body: {
            Html: {
              Data: html,
              Charset: 'utf-8',
            },
          },
        },
      }),
    );
  } catch (error) {
    console.error(`Welcome email error`, JSON.stringify(error, null, 2));
  }
};
