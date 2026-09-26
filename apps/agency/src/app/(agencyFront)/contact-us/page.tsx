import { handleContactUsForm } from '@/actions/handleContactUsForm';
import { Bounded, ContactUsForm } from '@mns/ui';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Have a project in mind or questions about our Plug & Play and Enterprise solutions? Get in touch with the mns team — we'd love to hear from you.`,
};

const ContactUsPage = (): React.JSX.Element => {
  return (
    <Bounded size="md" isCenterd padding="sm">
      <ContactUsForm
        action={handleContactUsForm}
        className="md:max-w-200 md:mx-auto"
      />
    </Bounded>
  );
};

export default ContactUsPage;
