import { urlFor } from '@/sanity/lib/image';
import { MediaProps } from '@mns/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export const RenderMedia = ({
  src,
  alt,
  className,
}: MediaProps & { className?: string }) => {
  return (
    <div
      className={twMerge(
        clsx('overflow-hidden aspect-square w-50 h-50 mx-auto'),
      )}
    >
      <Image
        src={urlFor(src).format('webp').url()}
        alt={alt}
        width={400}
        height={400}
        className={twMerge(clsx('min-w-full object-cover mx-auto', className))}
      />
    </div>
  );
};
