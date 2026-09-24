import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';
import { renderSignUpVerificationEmail } from '@mns/email';
import type { SignUpVerificationEmailProps } from '@mns/utils';
import { emailClient } from '../../lib/emailClient.js';

export const signUpVerification = async ({
  name,
  expiresAt = 15,
  url,
  email,
}: SignUpVerificationEmailProps & { email: string }) => {
  try {
    const html = await renderSignUpVerificationEmail({ name, url, expiresAt });

    await emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_ADDRESS,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Verify your MNS account',
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
    console.error(`Sign Up verification error`, JSON.stringify(error, null, 2));
  }
};
