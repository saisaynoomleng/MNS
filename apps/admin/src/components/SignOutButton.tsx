'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@mns/ui';
import { useRouter } from 'next/navigation';

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/sign-in'),
      },
    });
  };

  return (
    <Button variant="destructive" onClick={() => handleSignOut}>
      Sign Out
    </Button>
  );
};
