import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type NavLinkButtonProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
};

export const NavLinkButton = ({
  className,
  children,
  href,
}: NavLinkButtonProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'group overflow-hidden grid grid-cols-1 grid-rows-1 font-medium lowercase',
          className,
        ),
      )}
    >
      <span className="col-start-1 row-start-1  translate-y-0 group-hover:translate-y-[200%]   transition-all duration-400 ease-in-out">
        {children}
      </span>
      <span className="col-start-1 row-start-1  translate-y-[-200%] group-hover:translate-y-0  transition-all duration-400 ease-in-out">
        {children}
      </span>
    </Link>
  );
};
