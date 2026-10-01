'use client';

import { authClient } from '@/lib/auth-client';
import { Bounded, Button } from '@mns/ui';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <Bounded size="full" isCenterd={false} padding="sm">
      <p>Hello</p>
    </Bounded>
  );
}
