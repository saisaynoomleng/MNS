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
  useSidebar,
} from '@mns/ui';
import { SignOutButton } from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { BiSolidDashboard } from 'react-icons/bi';
import {
  MdFeaturedPlayList,
  MdOutlineDesignServices,
  MdOutlineEmail,
  MdPhonelink,
} from 'react-icons/md';
import { FaMoneyCheckDollar, FaUserGroup } from 'react-icons/fa6';
import { GiNewspaper } from 'react-icons/gi';
import { VscChatSparkleError } from 'react-icons/vsc';

type SidebarLinks = {
  label: string;
  href: string;
  icon: React.ReactElement;
};

const SIDEBAR_LINKS: SidebarLinks[] = [
  { label: 'Dashboard', href: '/', icon: <BiSolidDashboard aria-hidden /> },
  {
    label: 'Applications',
    href: '/applications',
    icon: <MdPhonelink aria-hidden />,
  },
  {
    label: 'Subscriptions',
    href: '/subscriptions',
    icon: <FaMoneyCheckDollar aria-hidden />,
  },
  {
    label: 'Services',
    href: '/services',
    icon: <MdOutlineDesignServices aria-hidden />,
  },
  {
    label: 'Contacts',
    href: '/contacts',
    icon: <MdOutlineEmail aria-hidden />,
  },
  {
    label: 'Newsletters',
    href: '/newsletters',
    icon: <GiNewspaper aria-hidden />,
  },
  {
    label: 'Feature Requests',
    href: '/feature-requests',
    icon: <MdFeaturedPlayList aria-hidden />,
  },
  {
    label: 'Error Reports',
    href: '/error-reports',
    icon: <VscChatSparkleError aria-hidden />,
  },
  { label: 'Customers', href: '/customers', icon: <FaUserGroup /> },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { state: SidebarState } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        {SidebarState === 'collapsed' ? (
          <span className="font-sans text-fs-500 font-bold text-primary">
            m
          </span>
        ) : (
          <Logo />
        )}
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
                      'flex gap-x-2',
                      pathname === s.href ? 'bg-primary text-background' : '',
                    )}
                  >
                    <span>{s.icon}</span>
                    <span className="sr-only">{s.label}</span>
                    <span
                      className={clsx(
                        SidebarState === 'collapsed' ? 'hidden' : 'block',
                      )}
                    >
                      {s.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignOutButton state={SidebarState} />
      </SidebarFooter>
    </Sidebar>
  );
};
