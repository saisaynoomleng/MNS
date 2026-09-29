import { sanityFetch } from '@/sanity/lib/live';
import { ALL_CAPABILITIES_QUERY } from '@/sanity/lib/query';
import {
  AnimateSlideIn,
  AnimateSlideInGroup,
  Bounded,
  Progress,
  SectionTitle,
} from '@mns/ui';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { GoDotFill } from 'react-icons/go';

export const CapabilityProgress = async ({
  className,
}: {
  className?: string;
}): Promise<React.JSX.Element | null> => {
  const { data: capabilities } = await sanityFetch({
    query: ALL_CAPABILITIES_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!capabilities) return null;

  return (
    <Bounded
      className={twMerge(clsx('space-y-4 md:space-y-8', className))}
      size="full"
      isCenterd={false}
    >
      <AnimateSlideIn direction="top" className="col-span-full">
        <SectionTitle as="h3" className="text-center">
          Our Capabilities
        </SectionTitle>
      </AnimateSlideIn>

      <AnimateSlideInGroup
        direction="bottom"
        from="random"
        className="grid max-md:place-items-center md:grid-cols-3 gap-4 md:gap-8"
      >
        {capabilities.map((c) => (
          <div
            key={c._id}
            className="border p-2 max-md:w-100 min-w-50 max-w-100 space-y-2 secondary-box-shadow"
          >
            <div className="flex justify-between items-center">
              <p className="flex gap-x-1 items-center">
                <span className="text-primary">
                  <GoDotFill aria-hidden className="animate-pulse" />
                </span>
                <span>{c.name}</span>
              </p>
              <p>{c.value}%</p>
            </div>
            <Progress value={c.value} />
          </div>
        ))}
      </AnimateSlideInGroup>
    </Bounded>
  );
};
