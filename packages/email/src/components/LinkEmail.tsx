import React from 'react';
import { Section, Img, Link, Row, Column, Text } from 'react-email';

const FACEBOOK_LINK = 'https://www.facebook.com';
const FACEBOOK_PNG_URL =
  'https://cdn.sanity.io/images/a8ioaakl/production/fc5ba79bb3147ba2d46ccb77e6eeed2dacc19e4b-640x640.png';

const YOUTUBE_LINK = 'https://www.youtube.com';
const YOUTUBE_PNG_URL =
  'https://cdn.sanity.io/images/a8ioaakl/production/91a1fdb50cb613533e51bd34e1355e2d96613f0e-640x640.png';

export const LinkEmail = (): React.JSX.Element => {
  return (
    <Section className="p-0">
      <Section className="mt-2 w-fit" align="left">
        <Row>
          <Column className="w-5">
            <Link
              href={FACEBOOK_LINK}
              className="block"
              target="_blank"
              rel="noreferrer nofollow"
            >
              <Img
                src={FACEBOOK_PNG_URL}
                alt="facebook logo png"
                width={50}
                height={50}
                className="block"
              />
            </Link>
          </Column>

          <Column className="w-5">
            <Link
              href={YOUTUBE_LINK}
              className="block"
              target="_blank"
              rel="noreferrer nofollow"
            >
              <Img
                src={YOUTUBE_PNG_URL}
                alt="github logo png"
                width={50}
                height={50}
                className="block"
              />
            </Link>
          </Column>
        </Row>
      </Section>

      <Section>
        <Text>
          5000 Euclid Ave, Apt 206
          <br />
          Cleveland, OH. 44103
          <br />
          United States
        </Text>

        {/* unsubscribe link */}
      </Section>
    </Section>
  );
};
