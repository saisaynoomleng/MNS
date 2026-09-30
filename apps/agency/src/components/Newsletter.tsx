import { handleNewsletterForm } from '@/actions/handleNewsletterForm';
import { NewsletterForm } from '@mns/ui';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type NewsletterProps = {
  className?: string;
};

export const Newsletter = ({ className }: NewsletterProps) => {
  return (
    <div className={twMerge(clsx('space-y-4 md:space-y-8', className))}>
      <NewsletterForm action={handleNewsletterForm} />
    </div>
  );
};
