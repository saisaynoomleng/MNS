import { sanityFetch } from '@/sanity/lib/live';
import { ALL_CAPABILITIES_QUERY } from '@/sanity/lib/query';
import { Progress } from '@mns/ui';
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
    <div className={twMerge(clsx('grid md:grid-cols-3 gap-4', className))}>
      {capabilities.map((c) => (
        <div key={c._id} className="border p-2 max-w-100 space-y-2">
          <div className="flex justify-between items-center">
            <p className="flex gap-x-1 items-center">
              <span className="text-primary">
                <GoDotFill aria-hidden />
              </span>
              <span>{c.name}</span>
            </p>
            <p>{c.value}%</p>
          </div>
          <Progress value={c.value} />
        </div>
      ))}
    </div>
  );
};
