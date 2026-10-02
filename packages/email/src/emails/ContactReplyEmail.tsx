import {
  Section,
  Html,
  Body,
  Text,
  Tailwind,
  Head,
  Preview,
  Container,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import { LinkEmail } from '../components/LinkEmail.js';

type ContactReplyEmailProps = {
  name: string;
  message: string;
};

const ContactReplyEmail = ({ name, message }: ContactReplyEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>mns. replied your message</title>
        </Head>

        <Body>
          <Preview>mns. replied your last message</Preview>

          <Container className="max-w-160 mx-auto">
            <LogoEmail />

            <Section>
              <Text>Hello {name},</Text>

              <Text>{message}</Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export const renderContactReplyEmail = async ({
  name,
  message,
}: ContactReplyEmailProps) => {
  return render(ContactReplyEmail({ name, message }));
};

export default ContactReplyEmail;
