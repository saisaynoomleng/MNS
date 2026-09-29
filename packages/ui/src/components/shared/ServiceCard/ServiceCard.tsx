import type { CallToActionProps, MediaProps } from '@mns/utils';
import clsx from 'clsx';
import type React from 'react';
import { twMerge } from 'tailwind-merge';
import { SectionTitle } from '../SectionTitle';

type ServiceCardProps = {
  className?: string;
  title: string;
  subtitle: string;
  excerpt: string;
  media: MediaProps;
  renderMedia: (props: MediaProps) => React.ReactElement;
  cta: CallToActionProps;
  renderCallToAction: (props: CallToActionProps) => React.ReactElement;
};

export const ServiceCard = ({
  className,
  title,
  subtitle,
  excerpt,
  media,
  renderMedia,
  cta,
  renderCallToAction,
}: ServiceCardProps): React.JSX.Element => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col gap-y-4 border p-6 justify-center items-center hover:primary-box-shadow',
          className,
        ),
      )}
    >
      <SectionTitle
        as="h4"
        className="first-letter:underline underline-offset-4 text-center"
      >
        {title}
      </SectionTitle>

      <p>{subtitle}</p>

      <div className="max-w-50">
        {renderMedia({ src: media.src, alt: media.alt })}
      </div>

      <p className="text-fs-300 text-center">{excerpt}</p>

      {renderCallToAction({ href: cta.href, label: cta.label })}
    </div>
  );
};
