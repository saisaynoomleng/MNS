import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Logo, Separator } from '@mns/ui';
import { sanityFetch } from '@/sanity/lib/live';
import { NAVIGATION_QUERY } from '@/sanity/lib/query';
import { DesktopNav, MobileNav } from './MainNav';
import { DarkModeToggle } from '@mns/ui';

export const Header = async (): Promise<React.JSX.Element | null> => {
  const { data: navLinks } = await sanityFetch({
    query: NAVIGATION_QUERY,
    perspective: 'published',
    stega: false,
  });

  if (!navLinks) return null;

  return (
    <header
      className={clsx(
        'max-w-7xl mx-auto py-4 shadow px-4 md:px-6 flex justify-between items-center mt-4 md:mt-6 font-sans relative',
      )}
    >
      <div className="flex gap-x-1 md:gap-x-2 items-center">
        <Link href="/">
          <Logo />
        </Link>

        <Separator orientation="vertical" className="bg-muted" />

        <DarkModeToggle />
      </div>

      {/* desktop nav */}
      <DesktopNav navLinks={navLinks} className="hidden lg:flex" />

      {/* mobile nav */}
      <MobileNav navLinks={navLinks} className="block lg:hidden" />
    </header>
  );
};
