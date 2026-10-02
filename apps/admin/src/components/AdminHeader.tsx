'use client';

import clsx from 'clsx';
import { useAdminSession } from './SessionContext';
import { SidebarTrigger } from '@mns/ui';
import Image from 'next/image';

export const AdminHeader = () => {
  const { session } = useAdminSession();

  const { user } = session;

  const profileUrl = user.image
    ? user.image
    : `https://placehold.co/100?text=${user.name.charAt(0)}`;

  const isPlaceholder = profileUrl.includes('placehold.co');

  return (
    <header
      className={clsx(
        'flex justify-between items-center px-4 py-2 border border-muted m-2 rounded-lg shadow-sm',
      )}
    >
      <SidebarTrigger />
      {/* dark mode */}

      <div className="flex items-center gap-x-4 md:gap-x-6">
        {/*  */}

        <div>
          <Image
            src={profileUrl}
            width={30}
            height={30}
            alt="user profile photo"
            className="rounded-full"
            priority
            unoptimized={isPlaceholder}
          />
        </div>
      </div>
    </header>
  );
};
