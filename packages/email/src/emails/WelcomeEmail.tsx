import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Tailwind,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import type { WelcomeEmailProps } from '@mns/utils';
import { LinkEmail } from '../components/LinkEmail.js';

const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <head>
          <title>Welcome to MNS</title>
        </head>

        <Body className="font-header leading-normal tracking-normal overflow-x-hidden">
          <Preview>You're in — here's how to get started.</Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Text>Hello {name},</Text>

            <Text>
              Welcome to
              <span className="font-bold"> mns.</span> ! Your account has been
              created. Explore our Plug & Play apps, or reach out if you're
              considering an Enterprise project
            </Text>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default WelcomeEmail;

export const renderWelcomeEmail = async ({ name }: WelcomeEmailProps) => {
  return await render(WelcomeEmail({ name }));
};
