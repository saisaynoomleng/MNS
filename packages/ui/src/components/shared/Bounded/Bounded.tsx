import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

type BoundedProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  size?: Size;
  padding?: Padding;
  spacing?: Spacing;
  isCenterd?: boolean;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

type Size = 'sm' | 'md' | 'full';

type Padding = 'none' | 'sm' | 'md' | 'lg';

type Spacing = 'none' | 'sm' | 'md' | 'lg';

const sizeVariants: Record<Size, string> = {
  sm: 'max-w-4xl',
  md: 'max-w-7xl',
  full: 'max-w-none',
};

const paddingVariants: Record<Padding, string> = {
  none: '',
  sm: 'px-4 md:px-8 lg:px-10',
  md: 'px-6 md:px-10 lg:px-12',
  lg: 'px-8 md:px-12 lg:px-16',
};

const spacingVariant: Record<Spacing, string> = {
  none: '',
  sm: 'space-y-4 md:space-y-6 lg:space-y-8',
  md: 'space-y-6 md:space-y-8 lg:space-y-10',
  lg: 'space-y-8 md:space-y-10 lg:space-y-12',
};

export const Bounded = <T extends React.ElementType>({
  as,
  className,
  size = 'full',
  padding = 'none',
  isCenterd = false,
  spacing = 'none',
  children,
  ...props
}: BoundedProps<T>): React.JSX.Element => {
  const Comp = as ?? 'section';

  return (
    <Comp
      className={twMerge(
        clsx(
          'py-4 md:py-6 lg:py-8',
          sizeVariants[size],
          paddingVariants[padding],
          spacingVariant[spacing],
          isCenterd && 'mx-auto',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
