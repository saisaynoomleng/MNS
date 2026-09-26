import { QueryProvider } from '@/components/QueryProvider';
import { UserSidebar } from '@/components/UserSidebar';
import { Bounded, SidebarProvider, SidebarTrigger } from '@mns/ui';

export default function UserLayout({ children }: LayoutProps<'/user'>) {
  return (
    <Bounded as="main" className="overflow-hidden">
      <QueryProvider>
        <SidebarProvider>
          <UserSidebar />

          <div>
            <SidebarTrigger className="md:hidden" />
            {children}
          </div>
        </SidebarProvider>
      </QueryProvider>
    </Bounded>
  );
}
