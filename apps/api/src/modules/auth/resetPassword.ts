import { renderOTPValidationEmail } from '@mns/email';
import type { OTPValidationEmailProps } from '@mns/utils';
import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';

export const resetPassword = async ({
  email,
  otp,
  expiresAt = 15,
}: OTPValidationEmailProps & { email: string }) => {
  try {
    const html = await renderOTPValidationEmail({ expiresAt, otp });

    emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_ADDRESS,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Request Password Reset OTP',
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
    console.error(`Reset Password Email error`, error);
  }
};
