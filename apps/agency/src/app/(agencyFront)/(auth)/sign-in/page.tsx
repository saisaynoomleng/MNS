'use client';

import { authClient } from '@/lib/authClient';
import { Bounded, SignInForm } from '@mns/ui';
import React from 'react';

const SignInPage = (): React.JSX.Element => {
  const handleSignInAction = async () => {};
  const handleOAuthAction = async () => {};

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
