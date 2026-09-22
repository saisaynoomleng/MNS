import clsx from 'clsx';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

type LogoProps = {
  className?: string;
  size?: Size;
};

type Size = 'sm' | 'md' | 'lg';

const sizeVariants: Record<Size, string> = {
  sm: 'text-fs-500',
  md: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
  lg: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
};

export const Logo = ({
  className,
  size = 'sm',
}: LogoProps): React.JSX.Element => {
  return (
    <p
      className={twMerge(
        clsx('font-sans font-bold', sizeVariants[size], className),
      )}
    >
      mns.
    </p>
  );
};
