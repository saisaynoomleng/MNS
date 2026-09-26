import { renderOTPValidationEmail } from '@mns/email';
import type { ChangeEmailFormInput } from '@mns/utils';
import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';

export const changeEmail = async ({ newEmail, otp }: ChangeEmailFormInput) => {
  try {
    const html = await renderOTPValidationEmail({ expiresAt: 15, otp });

    emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_ADDRESS,

        Destination: {
          ToAddresses: [newEmail],
        },

        Message: {
          Subject: {
            Data: 'Request for changing email',
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
    console.error(`Change Email error`, error);
  }
};
