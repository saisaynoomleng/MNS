import { AdminHeader } from '@/components/AdminHeader';
import { AdminSidebar } from '@/components/AdminSidebar';
import { QueryProvider } from '@/components/QueryProvider';
import { AdminSessionContext } from '@/components/SessionContext';
import { SidebarProvider, SidebarTrigger, Toaster } from '@mns/ui';

const DashboardLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <QueryProvider>
      <AdminSessionContext>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarTrigger className="md:hidden" />

          <main className="w-full">
            <AdminHeader />
            {children}
          </main>

          <Toaster
            richColors
            closeButton
            position="bottom-center"
            duration={3000}
          />
        </SidebarProvider>
      </AdminSessionContext>
    </QueryProvider>
  );
};

export default DashboardLayout;
