import { renderExistingUserSignUpEmail } from '@mns/email';
import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';

export const existingSignUpEmail = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  try {
    const today = new Date();
    const html = await renderExistingUserSignUpEmail({
      name,
      time: today,
    });

    emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_ADDRESS,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Existing Email Sign Up Alert',
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
    console.error(`Existing Email Sign Up error`, error);
  }
};
