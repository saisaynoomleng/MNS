import { QueryProvider } from '@/components/QueryProvider';
import { UserSessionContext } from '@/components/UserSessionContext';
import { UserSidebar } from '@/components/UserSidebar';
import { Bounded, SidebarProvider, SidebarTrigger } from '@mns/ui';

export default function UserLayout({ children }: LayoutProps<'/user'>) {
  return (
    <UserSessionContext>
      <Bounded as="main">
        <QueryProvider>
          <SidebarProvider>
            <UserSidebar />

            <div className="min-w-0 flex-1">
              <SidebarTrigger className="md:hidden" />
              {children}
            </div>
          </SidebarProvider>
        </QueryProvider>
      </Bounded>
    </UserSessionContext>
  );
}
