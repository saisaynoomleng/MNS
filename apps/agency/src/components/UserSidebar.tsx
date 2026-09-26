'use client';

import { authClient } from '@/lib/authClient';
import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@mns/ui';
import { toTitleCase } from '@mns/utils';
import Image from 'next/image';
import { SignOutButton } from './SignOutButton';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

type SidebarLinksProps = {
  name: string;
  href: string;
};

const USER_LINKS: SidebarLinksProps[] = [
  { name: 'Profile', href: '/user' },
  { name: 'Apps Hub', href: '/user/apps-hub' },
];

export const UserSidebar = () => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  if (!session?.user) return null;

  const { user } = session;

  const userImage =
    user.image ?? `https://placehold.co/50?text=${session.user.name.charAt(0)}`;
  const isPlaceholder = userImage.includes('placehold.co');

  return (
    <Sidebar className="border-foreground/10">
      <SidebarHeader className="flex-row gap-x-2 items-center">
        <Image
          className="max-w-50 object-cover rounded-full"
          src={userImage}
          unoptimized={isPlaceholder}
          width={50}
          height={50}
          priority
          alt="user profile image"
          sizes=""
        />

        <p>{toTitleCase(user.name)}</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User Account</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {USER_LINKS.map((l) => (
                <SidebarMenuItem key={l.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={l.href}
                      className={clsx(
                        pathname === l.href &&
                          'bg-primary text-primary-foreground',
                      )}
                    >
                      {l.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Billing</SidebarGroupLabel>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Helpful Features</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
};
