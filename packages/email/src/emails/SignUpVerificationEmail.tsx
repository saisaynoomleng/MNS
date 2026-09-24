import type React from 'react';
import {
  Html,
  Section,
  Preview,
  Container,
  Text,
  Tailwind,
  Body,
  Link,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import type { SignUpVerificationEmailProps } from '@mns/utils';
import { LinkEmail } from '../components/LinkEmail.js';

const SingUpVerificationEmail = ({
  name,
  url,
  expiresAt = 15,
}: SignUpVerificationEmailProps): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <head>
          <title>Verify your MNS account</title>
        </head>

        <Body className="overflow-hidden leading-normal tracking-normal font-header">
          <Preview>One click to confirm your email and get started.</Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Text> Hi {name}</Text>

            <Text>
              Thanks for signing up. Confirm your email address to activate your
              account.
            </Text>

            <Text>
              <span>Click this link to </span>
              <Link
                href={url}
                className="text-primary underline underline-offset-4"
              >
                Verify Your Email
              </Link>
            </Text>

            <Text className="font-bold">
              This link expires in {expiresAt} minutes.
            </Text>

            <Text>
              If you didn't create this account, no further action is needed.
            </Text>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default SingUpVerificationEmail;

export const renderSignUpVerificationEmail = async ({
  name,
  url,
  expiresAt = 15,
}: SignUpVerificationEmailProps) => {
  return await render(SingUpVerificationEmail({ name, url, expiresAt }));
};
