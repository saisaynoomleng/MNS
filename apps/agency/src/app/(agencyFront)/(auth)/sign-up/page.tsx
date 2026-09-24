'use client';

import RenderAction from '@/components/RenderAction';
import { authClient } from '@/lib/authClient';
import { Bounded, SignUpForm, toast } from '@mns/ui';
import { OAuthProviders, SignUpFormInput } from '@mns/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpPage = (): React.JSX.Element => {
  const router = useRouter();

  const handleSignUp = async (data: SignUpFormInput) => {
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: '/user',
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
      console.error('Sign Up Error', JSON.stringify(error, null, 2));
    }
  };

  const handleOAuth = async (provider: OAuthProviders) => {
    try {
      await authClient.signIn.social(
        {
          provider,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error('OAuth sign in error', JSON.stringify(error, null, 2));
    }
  };

  return (
    <Bounded isCenterd size="md" className="md:min-h-dvh md:max-w-150">
      <SignUpForm
        callToAction={{ label: 'Sign In', href: '/sign-in' }}
        action={handleSignUp}
        OAuthAction={handleOAuth}
        renderAction={(props) =>
          RenderAction({ label: props.label, href: props.href })
        }
      />
    </Bounded>
  );
};

export default SignUpPage;
