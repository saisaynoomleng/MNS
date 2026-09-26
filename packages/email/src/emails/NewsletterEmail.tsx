import type React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Tailwind,
  Head,
  render,
  Section,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import { LinkEmail } from '../components/LinkEmail.js';

const NewsletterEmail = (): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Thanks for subscribing to mns.</title>
        </Head>

        <Body className="font-header leading-normal tracking-normal overflow-x-hidden">
          <Preview>You're all set — we'll keep you posted.</Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Text>Hello,</Text>

              <Text>
                Thanks for subscribing. You'll hear from us when there's a new
                app launch or feature update worth sharing.
              </Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewsletterEmail;

export const renderNewsletterEmail = async () => {
  return await render(NewsletterEmail());
};
