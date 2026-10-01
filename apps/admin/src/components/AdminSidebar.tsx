'use client';

import {
  Logo,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@mns/ui';
import { SignOutButton } from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type SidebarLinks = {
  label: string;
  href: string;
};

const SIDEBAR_LINKS: SidebarLinks[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Applications', href: '/applications' },
  { label: 'Subscriptions', href: '/subscriptions' },
  { label: 'Services', href: '/services' },
  { label: 'Contacts', href: '/contacts' },
  { label: 'Newsletters', href: '/newsletters' },
  { label: 'Feature Requests', href: '/feature-requests' },
  { label: 'Error Reports', href: '/error-reports' },
  { label: 'Customers', href: '/customers' },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SIDEBAR_LINKS.map((s) => (
              <SidebarMenuItem key={s.label}>
                <SidebarMenuButton asChild>
                  <Link
                    href={s.href}
                    className={clsx(
                      '',
                      pathname === s.href ? 'bg-primary text-background' : '',
                    )}
                  >
                    {s.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
};
