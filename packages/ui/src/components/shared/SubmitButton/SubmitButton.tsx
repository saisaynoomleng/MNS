import { Button } from '#components/ui/button';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';
import { FaPaperPlane } from 'react-icons/fa6';

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export const SubmitButton = ({
  className,
  children,
  ...props
}: SubmitButtonProps): React.JSX.Element => {
  return (
    <Button
      type="submit"
      className={twMerge(
        clsx(
          'group overflow-x-hidden bg-foreground text-background hover:bg-foreground/80 ',
          className,
        ),
      )}
      {...props}
    >
      <span className="translate-x-[-200%] group-hover:rotate-45 group-hover:translate-x-0 duration-200 transition-transform ease-in-out">
        <FaPaperPlane />
      </span>

      <span>{children}</span>

      <span className="group-hover:translate-x-[200%] translate-x-0 duration-200 transition-transform ease-in-out group-hover:rotate-45">
        <FaPaperPlane />
      </span>
    </Button>
  );
};
