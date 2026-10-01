'use client';

import { authClient } from '@/lib/auth-client';
import { Bounded, Button } from '@mns/ui';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <Bounded>
      <Button
        variant="destructive"
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push('/sign-in'),
            },
          })
        }
      >
        Sign Out
      </Button>
    </Bounded>
  );
}
