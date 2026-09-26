'use client';

import { SignOutButton } from '@/components/SignOutButton';
import { authClient } from '@/lib/authClient';
import { Bounded, Spinner } from '@mns/ui';
import { redirect } from 'next/navigation';

const UserPage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }

  if (!session?.session.id) return redirect('/sign-in');

  return <Bounded isCenterd size="md"></Bounded>;
};

export default UserPage;
