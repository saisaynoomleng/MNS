import type React from 'react';
import { Img, Section } from 'react-email';

export const LogoEmail = (): React.JSX.Element => {
  return (
    <Section className="mobile:px-6 px-[40px] pt-[40px] pb-[24px] text-center">
      <Img
        src="https://cdn.sanity.io/images/a8ioaakl/production/9eb17fd66eca92018e76834374fd6d07664848d5-400x134.png"
        alt="mns logo"
        className="mx-auto max-w-50 object-cover"
        loading="lazy"
      />
    </Section>
  );
};
