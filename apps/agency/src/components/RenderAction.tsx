import { Button } from '@mns/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type RenderActionProps = {
  label: string;
  href: string;
  type?: 'link' | 'button';
  className?: string;
};

const RenderAction = ({
  label,
  href,
  type = 'link',
  className,
}: RenderActionProps) => {
  return (
    <>
      {type === 'link' ? (
        <Link
          href={href}
          className={twMerge(
            clsx(
              'text-primary hover:underline underline-offset-2 text-nowrap w-full',
              className,
            ),
          )}
        >
          {label}
        </Link>
      ) : (
        <Button variant="link" asChild>
          <Link
            href={href}
            className={twMerge(
              clsx(
                'text-primary hover:underline underline-offset-2 text-nowrap w-full',
                className,
              ),
            )}
          >
            {label}
          </Link>
        </Button>
      )}
    </>
  );
};

export default RenderAction;
