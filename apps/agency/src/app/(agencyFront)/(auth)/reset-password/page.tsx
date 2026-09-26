'use client';

import { authClient } from '@/lib/authClient';
import { Bounded, ResetPasswordForm, toast } from '@mns/ui';
import {
  CheckVerificationOTPFormInput,
  RequestPasswordResetFormInput,
  ResetPasswordFormInput,
} from '@mns/utils';

const ResetPassword = () => {
  const handleRequest = async (data: RequestPasswordResetFormInput) => {
    await authClient.emailOtp.requestPasswordReset(
      {
        email: data.email,
      },
      {
        onSuccess: () => {
          toast.success('OTP was sent to your email');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleVerification = async (data: CheckVerificationOTPFormInput) => {
    await authClient.emailOtp.checkVerificationOtp(
      {
        email: data.email,
        otp: data.otp,
        type: data.type,
      },
      {
        onSuccess: () => {
          toast.success('OTP verified successfully!');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleReset = async (data: ResetPasswordFormInput) => {
    await authClient.emailOtp.resetPassword(
      {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success('Password reset successfully');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded as="main" className="md:max-w-200">
      <ResetPasswordForm
        requestPasswordAction={handleRequest}
        checkVerificationAction={handleVerification}
        resetPasswordAction={handleReset}
      />
    </Bounded>
  );
};

export default ResetPassword;
