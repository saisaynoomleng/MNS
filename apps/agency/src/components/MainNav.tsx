'use client';

import { NAVIGATION_QUERY_RESULT } from '@/sanity/types';
import clsx from 'clsx';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { NavLinkButton } from './NavLinkButton';
import { Button, Separator } from '@mns/ui';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { authClient } from '@/lib/authClient';
import Image from 'next/image';

type MainNavProps = {
  className?: string;
  navLinks: NAVIGATION_QUERY_RESULT;
};

export const DesktopNav = ({
  navLinks,
  className,
}: MainNavProps): React.JSX.Element | null => {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const isLoggedIn = session?.session;

  const userImage = session?.user.image
    ? session.user.image
    : `https://placehold.co/600x400?text=${session?.user.name.charAt(0)}`;

  const isPlacehold = userImage.startsWith('https://placehold.co/')
    ? true
    : false;

  if (!navLinks) return null;

  return (
    <nav
      className={twMerge(clsx('flex items-center gap-x-2 ', className))}
      role="navigation"
    >
      <ul className="flex gap-x-4 items-center">
        {navLinks.navLinks?.map((l) => (
          <NavLinkButton
            href={l.href as string}
            key={l._key}
            className={clsx(pathname === l.href && 'text-primary')}
          >
            {l.label}
          </NavLinkButton>
        ))}
      </ul>

      <Separator orientation="vertical" className="bg-muted" />

      {isLoggedIn ? (
        <Link href="/user" className="overflow-hidden relative w-10 h-10">
          <Image
            src={userImage}
            alt=""
            fill
            unoptimized={isPlacehold}
            className="min-w-full object-cover rounded-full"
            sizes="(max-width: 50px) 100vw, 22vw"
          />
        </Link>
      ) : (
        <Button variant="pirmary" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </nav>
  );
};

export const MobileNav = ({
  className,
  navLinks,
}: MainNavProps): React.JSX.Element | null => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  const isLoggedIn = session?.session;
  const userImage = session?.user.image
    ? session.user.image
    : `https://placehold.co/600x400?text=${session?.user.name.charAt(0)}`;

  const isPlacehold = userImage.startsWith('https://placehold.co/')
    ? true
    : false;

  if (!navLinks) return null;

  return (
    <div className={twMerge(clsx('', className))}>
      <div className="flex items-center gap-x-1">
        {isLoggedIn ? (
          <Link href="/user" className="overflow-hidden relative w-10 h-10">
            <Image
              src={userImage}
              alt=""
              fill
              unoptimized={isPlacehold}
              className="min-w-full object-cover rounded-full"
              sizes="(max-width: 50px) 100vw, 22vw"
            />
          </Link>
        ) : (
          <Button variant="pirmary" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}

        <Separator className="bg-muted" orientation="vertical" />

        {navOpen ? (
          <Button
            aria-label="close menu button"
            className={clsx(
              'relative z-20 border-brand-black-950! text-brand-black-950!',
            )}
            variant="outline"
            onClick={() => setNavOpen(false)}
          >
            <IoClose aria-hidden />
            <span className="sr-only">close menu</span>
          </Button>
        ) : (
          <Button
            aria-label="open menu button"
            className={clsx('relative z-20')}
            variant="outline"
            onClick={() => setNavOpen(true)}
          >
            <RxHamburgerMenu aria-hidden />
            <span className="sr-only">open menu</span>
          </Button>
        )}
      </div>

      <nav
        role="navigation"
        className={clsx(
          'fixed inset-0 z-10 transition-transform duration-200 ease-in-out bg-paper text-foreground text-fs-500!',
          navOpen ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <ul className="flex flex-col gap-y-3 justify-center items-center h-full">
          {navLinks.navLinks?.map((l) => (
            <li key={l._key} onClick={() => setNavOpen(false)}>
              <NavLinkButton
                href={l.href as string}
                className={clsx(
                  pathname === l.href
                    ? 'text-secondary'
                    : 'text-brand-black-950',
                  'bg-brand-white backdrop-blur-3xl px-2 py-1 border-2 border-brand-black-950 rounded-full primary-box-shadow',
                )}
              >
                {l.label}
              </NavLinkButton>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
