import type { Metadata } from 'next';
import './globals.css';
import { chivo_mono, instrument_sans, sue_ellen_francisco } from '@/lib/font';
import { QueryProvider } from '@/components/QueryProvider';

export const metadata: Metadata = {
  title: 'mns. admin',
  description: 'mns. admin',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${instrument_sans.variable} ${sue_ellen_francisco.variable} ${chivo_mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
