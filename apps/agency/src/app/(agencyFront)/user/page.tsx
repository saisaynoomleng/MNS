'use client';

import {
  useGetMe,
  useUpdateUserAddress,
  useUpdateUserInfo,
} from '@/hooks/users';
import { authClient } from '@/lib/authClient';

import {
  Bounded,
  ChangeEmailForm,
  DeleteUserForm,
  Spinner,
  toast,
  UpdateUserAddressForm,
  UpdateUserDetailForm,
  UpdateUserPasswordForm,
} from '@mns/ui';
import {
  ChangeEmailFormInput,
  RequestEmailChangeFormInput,
  UpdateUserPassowrdFormInput,
} from '@mns/utils';

import { useRouter } from 'next/navigation';

const UserPage = () => {
  const router = useRouter();

  const { data: user, isPending: userPending, error } = useGetMe();

  const { mutateAsync: updateAction } = useUpdateUserInfo();
  const { mutateAsync: updateAddress } = useUpdateUserAddress();

  if (!user) return;

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
        onError: (ctx) => {
          toast.error(ctx.error.message);
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

  const handleUpdateUserPassword = async (
    data: UpdateUserPassowrdFormInput,
  ) => {
    await authClient.changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: data.revokeSession,
      },
      {
        onSuccess: () => {
          toast.success('Password updated!');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleDeleteAccount = async () => {
    await authClient.deleteUser();
  };

  return (
    <Bounded as="main" padding="sm" size="full" isCenterd={false} spacing="sm">
      <UpdateUserDetailForm
        updateAction={updateAction}
        userDetail={{
          name: user.name,
          companyName: user.companyName,
          position: user.position,
          phone: user.phone,
        }}
      />

      <UpdateUserAddressForm address={user.address} action={updateAddress} />

      <ChangeEmailForm
        currentEmail={user.email}
        requestAction={handleRequestEmailChange}
        changeAction={handleChangeEmail}
      />

      <UpdateUserPasswordForm action={handleUpdateUserPassword} />

      <DeleteUserForm action={handleDeleteAccount} />
    </Bounded>
  );
};

export default UserPage;
