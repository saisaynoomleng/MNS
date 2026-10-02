'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@mns/ui';
import { useRouter } from 'next/navigation';
import { MdNearbyError } from 'react-icons/md';

type SignOutProps = {
  state: 'collapsed' | 'expanded';
};

export const SignOutButton = ({ state }: SignOutProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/sign-in'),
      },
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleSignOut}
      className="rounded-lg"
    >
      {state === 'collapsed' ? (
        <span>
          <MdNearbyError />
        </span>
      ) : (
        <span>Sign Out</span>
      )}
    </Button>
  );
};
