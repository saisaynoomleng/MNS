import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Head,
  Tailwind,
  Section,
  Row,
  Column,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import { formatDateTimeUS } from '@mns/utils';
import { LinkEmail } from '../components/LinkEmail.js';

const ExistingUserSignUpEmail = ({
  name,
  time = '2026/12/21',
}: {
  name: string;
  time: Date | string;
}) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Someone tried to sign up with your email</title>
        </Head>

        <Body className="font-header overflow-x-hidden leading-normal tracking-normal">
          <Preview>
            We wanted to let you know about this activity on your account.
          </Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Text>Hello {name},</Text>

              <Text>
                We wanted to let you know about this activity on your account.
              </Text>

              <Text className="font-semibold">No new account was created</Text>
            </Section>

            <Section align="left">
              <Row align="left">
                <Column>
                  Date & Time:{' '}
                  <span className="font-semibold">
                    {formatDateTimeUS(time)}
                  </span>
                </Column>
              </Row>
            </Section>

            <Section>
              <Text>If this wasn't you, no action needed.</Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ExistingUserSignUpEmail;

export const renderExistingUserSignUpEmail = async ({
  name,
  time,
}: {
  name: string;
  time: Date | string;
}) => {
  return render(ExistingUserSignUpEmail({ name, time }));
};
