import type React from 'react';
import { Section } from 'react-email';

export const LogoEmail = (): React.JSX.Element => {
  return (
    <Section className="mobile:px-6 px-[40px] pt-[40px] pb-[24px] text-center">
      <text className="font-header font-bold text-7xl text-center">mns.</text>
    </Section>
  );
};
