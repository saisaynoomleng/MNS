import { renderDeleteUserVerificationEmail } from '@mns/email';
import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';

type DeleteUserAccountEmailProps = {
  url: string;
  expiresAt?: number;
  email: string;
};

export const deleteUserAccountEmail = async ({
  url,
  expiresAt = 15,
  email,
}: DeleteUserAccountEmailProps) => {
  try {
    const html = await renderDeleteUserVerificationEmail({ url, expiresAt });

    emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_ADDRESS,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Verify your account deletion',
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
    console.error(`Delete User Email error`, error);
  }
};
