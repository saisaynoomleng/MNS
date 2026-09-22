import type { Metadata } from 'next';
import './globals.css';
import { sue_ellen_francisco, chivo_mono, instrument_sans } from '@/lib/font';

export const metadata: Metadata = {
  title: {
    template: '%s | MNS',
    default: 'MNS',
  },
  description:
    'MNS Art is a design and engineering studio building custom web apps and Plug & Play SaaS tools for businesses in Myanmar, the US, and beyond.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sue_ellen_francisco.variable} ${chivo_mono.variable} ${instrument_sans.variable} min-h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
