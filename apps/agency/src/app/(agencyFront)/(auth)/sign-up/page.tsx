'use client';

import RenderAction from '@/components/RenderAction';
import { authClient } from '@/lib/authClient';
import { Bounded, SignUpForm } from '@mns/ui';
import React from 'react';

const SignUpPage = (): React.JSX.Element => {
  const handleSignUp = async () => {
    try {
      // await authClient.emailOtp.
    } catch (error) {}
  };
  const handleOAuth = async () => {};

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
