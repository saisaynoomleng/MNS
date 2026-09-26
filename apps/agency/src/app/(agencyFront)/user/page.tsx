'use client';

import { useGetUserById, useUpdateUserInfo } from '@/app/hooks/users';
import { authClient } from '@/lib/authClient';

import { Bounded, Spinner, UpdateUserDetailForm } from '@mns/ui';
import { UpdateUserDetailFormInput } from '@mns/utils';

import { redirect } from 'next/navigation';

const UserPage = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const userId = session?.user.id;

  const {
    data: user,
    isPending: userPending,
    error,
  } = useGetUserById(userId as string);

  const { mutateAsync: updateAction } = useUpdateUserInfo();

  if (sessionPending) {
    return <Spinner />;
  }

  if (!session?.session.id) {
    redirect('/sign-in');
  }

  if (userPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>Failed to load user.</div>;
  }

  return (
    <Bounded padding="sm">
      <UpdateUserDetailForm
        updateAction={updateAction}
        userDetail={user}
        className="min-w-full"
      />
    </Bounded>
  );
};

export default UserPage;
