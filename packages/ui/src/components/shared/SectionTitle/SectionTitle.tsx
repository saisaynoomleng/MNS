import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

type SectionTitleProps<T extends Heading> = {
  as?: T;
  className?: string;
  size?: Size;
  children: React.ReactNode;
  hasUnderline?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Size = 'sm' | 'md' | 'lg';

const sizeVariants: Record<Size, string> = {
  sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
  md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
  lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
};

export const SectionTitle = <T extends Heading>({
  as,
  className,
  size = 'sm',
  children,
  hasUnderline = false,
  ...props
}: SectionTitleProps<T>): React.JSX.Element => {
  const Comp = as ?? 'h2';

  return (
    <Comp
      className={twMerge(
        clsx(
          'font-sans capitalize font-medium',
          sizeVariants[size],
          hasUnderline &&
            'underline underline-offset-8 decoration-primary decoration-wavy decoration-2',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
