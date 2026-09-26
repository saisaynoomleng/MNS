import type { DeleteUserVerificationEmailProps } from '@mns/utils';
import {
  Html,
  Text,
  Section,
  Body,
  Tailwind,
  Preview,
  Head,
  Container,
  Link,
  render,
} from 'react-email';
import tailwindConfig from '../lib/tailwindConfig.js';
import { LogoEmail } from '../components/LogoEmail.js';
import { LinkEmail } from '../components/LinkEmail.js';

const DeleteUserVerificationEmail = ({
  url,
  expiresAt = 15,
}: DeleteUserVerificationEmailProps) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Confirm account deletion</title>
        </Head>

        <Body className="font-header leading-normal tracking-normal overflow-x-hidden">
          <Preview>
            Click this link to permanently delete your mns. account
          </Preview>

          <Container className="max-w-160 mx-auto">
            <LogoEmail />

            <Section>
              <Text>
                You requested to delete your{' '}
                <span className="font-semibold">mns.</span> account.
              </Text>

              <Text>
                <Link
                  href={url}
                  className="text-primary-600 underline underline-offset-2"
                >
                  Click this link
                </Link>{' '}
                to confirm. — this action is permanent and{' '}
                <span className="font-semibold">can't be undone.</span>
              </Text>

              <Text>
                This link expires in{' '}
                <span className="font-semibold text-primary-600">
                  {expiresAt}
                </span>{' '}
                minutes
              </Text>

              <Text>Didn't request this? Ignore this email.</Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default DeleteUserVerificationEmail;

export const renderDeleteUserVerificationEmail = async ({
  url,
  expiresAt = 15,
}: DeleteUserVerificationEmailProps) => {
  return await render(DeleteUserVerificationEmail({ url, expiresAt }));
};
