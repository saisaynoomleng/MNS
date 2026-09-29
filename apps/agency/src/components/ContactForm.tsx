import { handleContactUsForm } from '@/actions/handleContactUsForm';
import { ContactUsForm } from '@mns/ui';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const ContactForm = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => {
  return (
    <ContactUsForm
      action={handleContactUsForm}
      className={twMerge(clsx(className))}
    />
  );
};

export default ContactForm;
