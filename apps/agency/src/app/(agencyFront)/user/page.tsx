'use client';

import { useGetUserById, useUpdateUserInfo } from '@/app/hooks/users';
import { authClient } from '@/lib/authClient';

import {
  Bounded,
  ChangeEmailForm,
  Separator,
  Spinner,
  toast,
  UpdateUserDetailForm,
} from '@mns/ui';
import { ChangeEmailFormInput, RequestEmailChangeFormInput } from '@mns/utils';

import { redirect, useRouter } from 'next/navigation';

const UserPage = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const router = useRouter();

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

  const handleRequestEmailChange = async (
    data: RequestEmailChangeFormInput,
  ) => {
    await authClient.emailOtp.requestEmailChange(
      {
        newEmail: data.newEmail,
      },
      {
        onSuccess: () => {
          toast.success('OPT is sent to your new email');
        },
      },
    );
  };

  const handleChangeEmail = async (data: ChangeEmailFormInput) => {
    await authClient.emailOtp.changeEmail(
      {
        newEmail: data.newEmail,
        otp: data.otp,
      },
      {
        onSuccess: () => {
          router.refresh();
          toast.success('Email Updated');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded as="main" padding="sm" size="full" isCenterd={false} spacing="sm">
      <UpdateUserDetailForm
        updateAction={updateAction}
        userDetail={{
          id: userId as string,
          name: user.name,
          companyName: user.companyName,
          position: user.position,
        }}
      />

      <ChangeEmailForm
        currentEmail={user.email}
        requestAction={handleRequestEmailChange}
        changeAction={handleChangeEmail}
      />
    </Bounded>
  );
};

export default UserPage;
