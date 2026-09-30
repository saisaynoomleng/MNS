import { replaceDash, toTitleCase, type MediaProps } from '@mns/utils';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type AppCardProps = {
  className?: string;
  name: string;
  type: string;
  myanmarOnly: boolean;
  href: string;
  media: MediaProps;
  renderMedia: (props: MediaProps) => React.ReactElement;
};

export const AppCard = ({
  className,
  name,
  media,
  renderMedia,
  myanmarOnly,
  type,
  href,
}: AppCardProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'min-w-80 max-w-80 border primary-box-shadow p-6 flex flex-col gap-y-3 hover:-translate-y-1 transition-transform duration-200 ease-in-out',
          className,
        ),
      )}
    >
      <div className="">{renderMedia({ src: media.src, alt: media.alt })}</div>

      <div className="space-y-2 text-center">
        <p className="text-fs-500 font-semibold font-sans">{name}</p>
        <p>[ {toTitleCase(replaceDash(type))} ]</p>
        <p className="text-muted-foreground text-fs-300">
          Only available in {myanmarOnly ? 'Myanmar' : 'Myanmar, U.S.'}
        </p>
      </div>
    </Link>
  );
};
