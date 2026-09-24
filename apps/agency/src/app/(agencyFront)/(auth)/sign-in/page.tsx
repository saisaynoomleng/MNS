'use client';

import { authClient } from '@/lib/authClient';
import { Bounded, SignInForm, toast } from '@mns/ui';
import { OAuthProviders, SignInFormInput } from '@mns/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignInPage = (): React.JSX.Element => {
  const router = useRouter();

  const handleSignInAction = async (data: SignInFormInput) => {
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        },
        {
          onSuccess: () => {
            router.push('/user');
          },

          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error('Sign In Error', JSON.stringify(error, null, 2));
    }
  };

  const handleOAuthAction = async (provider: OAuthProviders) => {
    try {
      await authClient.signIn.social(
        {
          provider,
        },
        {
          onSuccess: () => {
            router.push('/user');
          },

          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error(`OAuth Sign in error`, JSON.stringify(error, null, 2));
    }
  };

  return (
    <Bounded
      size="md"
      isCenterd
      className="md:min-h-dvh md:flex justify-center items-center"
    >
      <SignInForm
        action={handleSignInAction}
        OAuthAction={handleOAuthAction}
        className="max-w-100 md:max-w-150 mx-auto"
      />
    </Bounded>
  );
};

export default SignInPage;
