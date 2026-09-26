import type React from 'react';
import {
  Html,
  Section,
  Text,
  Preview,
  Tailwind,
  Body,
  Container,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import type { OTPValidationEmailProps } from '@mns/utils';
import { LinkEmail } from '../components/LinkEmail.js';

const OTPValidationEmail = ({
  otp,
  expiresAt = 15,
  name,
}: OTPValidationEmailProps): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <head>
          <title>Your MNS verification code</title>
        </head>
      </Html>

      <Body className="leading-normal tracking-normal overflow-x-hidden px-4 font-header">
        <Preview>Use this code to verify it's you — it expires soon.</Preview>

        <Container className="mx-auto max-w-160">
          <LogoEmail />

          <Text>Hi {name}</Text>

          <Text>Your OTP is</Text>

          <Text className="text-primary-600 font-bold text-2xl">{otp}</Text>

          <Text>
            This code expires in{' '}
            <span className="text-primary-600 font-bold">{expiresAt} </span>
            minutes.
          </Text>

          <Text>
            If you didn't request this, you can safely ignore this email.
          </Text>

          <LinkEmail />
        </Container>
      </Body>
    </Tailwind>
  );
};

export default OTPValidationEmail;

export const renderOTPValidationEmail = async ({
  otp,
  expiresAt = 15,
  name,
}: OTPValidationEmailProps) => {
  return await render(OTPValidationEmail({ otp, expiresAt, name }));
};
