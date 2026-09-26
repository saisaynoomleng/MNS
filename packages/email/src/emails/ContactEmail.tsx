import {
  Html,
  Section,
  Container,
  Text,
  Preview,
  Tailwind,
  Body,
  render,
  Link,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import { LinkEmail } from '../components/LinkEmail.js';

const ContactEmail = ({ name }: { name: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <head>
          <title>We've received your message</title>
        </head>

        <Body className="overflow-x-hidden leading-normal tracking-normal font-header">
          <Preview>Thanks for reaching out — we'll be in touch soon.</Preview>

          <Container className="max-w-160 mx-auto">
            <LogoEmail />

            <Section>
              <Text>Hello {name},</Text>
              <Text>
                Thanks for contacting
                <span className="font-semibold"> mns.</span> We've received your
                message and will get back to you shortly. In the meantime, feel
                free to reach us directly at{' '}
                <Link href="mailto:saileng9723@gmail.com">
                  saileng9723@gmail.com
                </Link>
              </Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ContactEmail;

export const renderContactEmail = async ({ name }: { name: string }) => {
  return await render(ContactEmail({ name }));
};
