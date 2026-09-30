import { APP_QUERY_RESULT } from '@/sanity/types';
import { Button, NewsletterForm } from '@mns/ui';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

type AppLaunchButtonProps = {
  className?: string;
  appUrl: string;
  demoUrl: string;
  stage: NonNullable<APP_QUERY_RESULT>['stage'];
};

const AppLaunchButton = ({
  className,
  appUrl,
  demoUrl,
  stage,
}: AppLaunchButtonProps) => {
  const isDisable = stage !== 'production';

  return (
    <div className={twMerge(clsx('space-y-2', className))}>
      <div className="flex gap-x-2">
        <Button
          asChild
          variant="link"
          disabled={isDisable}
          className={clsx(
            isDisable
              ? 'bg-muted pointer-events-none'
              : 'bg-primary-600 pointer-events-auto',
          )}
        >
          <Link href={appUrl} target="_blank">
            <span>Launch App</span>
            <span>
              <FaExternalLinkAlt aria-hidden />
            </span>
          </Link>
        </Button>

        <Button
          asChild
          variant="link"
          disabled={isDisable}
          className={clsx(
            isDisable
              ? 'bg-muted pointer-events-none'
              : 'bg-secondary-600 pointer-events-auto',
          )}
        >
          <Link href={demoUrl} target="_blank">
            <span>Launch Demo</span>
            <span>
              <FaExternalLinkAlt aria-hidden />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AppLaunchButton;
