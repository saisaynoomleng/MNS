import { sanityFetch } from '@/sanity/lib/live';
import { FOOTER_QUERY } from '@/sanity/lib/query';
import { Logo } from '@mns/ui';
import Link from 'next/link';
import React from 'react';
import { NavLinkButton } from './NavLinkButton';
import { FaFacebookSquare, FaYoutubeSquare } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

export const Footer = async (): Promise<React.JSX.Element | null> => {
  const { data: footer } = await sanityFetch({
    query: FOOTER_QUERY,
    perspective: 'published',
    stega: false,
  });

  if (!footer) return null;

  return (
    <footer className="bg-foreground text-background px-6 md:px-10 lg:px-12 grid md:grid-cols-2 lg:grid-cols-5 md:gap-x-8 lg:gap-x-12 gap-y-2 text-fs-300 py-6 md:py-8 lg:py-12">
      <div className="space-y-2">
        <Link href="/">
          <Logo size="lg" />
        </Link>

        <p>{footer.text}</p>
      </div>

      {footer.columns?.map((c) => (
        <div className="flex flex-col gap-y-4" key={c._key}>
          <p className="font-semibold underline underline-offset-4 text-secondary dark:text-secondary-600">
            {c.title}
          </p>
          <ul className="flex flex-col gap-y-2">
            {c.links?.map((l) => (
              <NavLinkButton key={l._key} href={l.href as string}>
                {l.label}
              </NavLinkButton>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-col gap-y-4 col-span-full lg:col-start-5 lg:col-end-6">
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold underline underline-offset-4 text-secondary dark:text-secondary-600">
            Contact us
          </p>

          <address>
            <p>{footer.street}</p>
            <p>
              <span>{footer.city}, </span>
              <span>{footer.state}.</span>
              <span>{footer.zip}</span>
            </p>
            <p>{footer.country}</p>
            <p>{footer.email}</p>
          </address>
        </div>

        <div className="flex gap-x-2">
          <div>
            <Link
              href={`mailto:${footer.email}`}
              className="hover:text-secondary"
            >
              <IoMdMail size={30} aria-hidden />
              <span className="sr-only">Email us at {footer.email}</span>
            </Link>
          </div>

          {footer.socialLinks?.map((s) => {
            const facebook = s.platform === 'facebook';

            if (facebook) {
              return (
                <div key={s._key}>
                  <Link
                    href={s.url as string}
                    target="_blank"
                    rel="noreferrer nofollow"
                    className="hover:text-secondary"
                  >
                    <FaFacebookSquare size={30} aria-hidden />
                    <span className="sr-only">Check us on Facebook</span>
                  </Link>
                </div>
              );
            }

            return (
              <div key={s._key}>
                <Link
                  href={s.url as string}
                  target="_blank"
                  rel="noreferrer nofollow"
                  className="hover:text-secondary"
                >
                  <FaYoutubeSquare size={30} aria-hidden />
                  <span className="sr-only">Check us on YouTube</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-span-full place-self-end">
        <p>&copy;mns. {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
};
