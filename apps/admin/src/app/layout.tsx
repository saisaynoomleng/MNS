import type { Metadata } from 'next';
import './globals.css';
import { chivo_mono, instrument_sans, sue_ellen_francisco } from '@/lib/font';
import { QueryProvider } from '@/components/QueryProvider';
import { SidebarProvider, SidebarTrigger, Toaster } from '@mns/ui';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminSessionContext } from '@/components/SessionContext';

export const metadata: Metadata = {
  title: 'mns. admin',
  description: 'mns. admin',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${instrument_sans.variable} ${sue_ellen_francisco.variable} ${chivo_mono.variable} antialiased h-full`}
      data-scroll-behavior="smooth"
    >
      <body>
        <QueryProvider>
          <AdminSessionContext>
            <SidebarProvider>
              <AdminSidebar />
              <SidebarTrigger className="md:hidden" />

              <main className="w-full">{children}</main>

              <Toaster
                richColors
                closeButton
                position="bottom-center"
                duration={3000}
              />
            </SidebarProvider>
          </AdminSessionContext>
        </QueryProvider>
      </body>
    </html>
  );
}
