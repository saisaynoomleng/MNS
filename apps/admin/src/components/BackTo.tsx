import { Button } from '@mns/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

type BackToProps = {
  href: string;
  label: string;
  className?: string;
};

export const BackTo = ({ className, label, href }: BackToProps) => {
  return (
    <Button variant="link" asChild>
      <Link
        href={href}
        className={twMerge(
          clsx(
            'flex items-center gap-x-1 group capitalize bg-primary-800',
            className,
          ),
        )}
      >
        <span>
          <MdOutlineKeyboardDoubleArrowLeft
            className="group-hover:-translate-x-1 duration-200 transition-transform ease-in-out"
            aria-hidden
          />
        </span>
        <span>Back To</span>
        <span>{label}</span>
      </Link>
    </Button>
  );
};
