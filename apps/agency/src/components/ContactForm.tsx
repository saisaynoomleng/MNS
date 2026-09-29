import { handleContactUsForm } from '@/actions/handleContactUsForm';
import { ContactUsForm, SectionTitle } from '@mns/ui';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const ContactForm = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => {
  return (
    <div className="space-y-4 md:space-y-8">
      <SectionTitle as="h3" className="text-center">
        Have a project in mind?
      </SectionTitle>
      <ContactUsForm
        action={handleContactUsForm}
        className={twMerge(clsx(className))}
      />
    </div>
  );
};

export default ContactForm;
