'use client';

import { authClient } from '@/lib/authClient';
import { Button, Spinner } from '@mns/ui';
import Image from 'next/image';
import Link from 'next/link';

export const UserButton = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }

  if (!session?.session?.id) {
    return (
      <Button variant="primary" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    );
  }

  const userImageUrl =
    session.user.image ??
    `https://placehold.co/600x400?text=${session?.user.name.charAt(0)}`;

  const isPlaceholder = userImageUrl.includes('placehold.co');

  return (
    <Button
      asChild
      variant="outline"
      className="border-none hover:bg-transparent bg-transparent"
    >
      <Link href="/user" className="overflow-hidden relative w-10 h-10">
        <Image
          src={userImageUrl}
          alt=""
          fill
          unoptimized={isPlaceholder}
          className="min-w-full object-cover rounded-full"
          sizes="(max-width: 50px) 100vw, 22vw"
        />
      </Link>
    </Button>
  );
};
