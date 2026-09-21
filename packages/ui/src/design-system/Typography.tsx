import type React from 'react';
import { Bounded, SectionTitle } from '../components/shared';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#components/ui/table';
import { Card, CardContent } from '#components/ui/card';

import { IoSettingsOutline } from 'react-icons/io5';
import { CiImageOn } from 'react-icons/ci';

const fontSizes = {
  900: { rem: '5.5rem', px: '88px' },
  800: { rem: '4.25rem', px: '68px' },
  700: { rem: '3.5rem', px: '56px' },
  600: { rem: '2.25rem', px: '36px' },
  500: { rem: '1.75rem', px: '28px' },
  400: { rem: '1rem', px: '16px' },
  300: { rem: '0.875rem', px: '14px' },
  200: { rem: '0.5rem', px: '8px' },
};

const icons: React.ReactElement[] = [
  <IoSettingsOutline aria-hidden />,
  <CiImageOn aria-hidden />,
];

export const Typography = (): React.JSX.Element => {
  return (
    <Bounded size="full" spacing="lg" padding="sm">
      <div className="space-y-4">
        <SectionTitle hasUnderline>Typography</SectionTitle>

        <p>
          Typography establishes hierarchy, improves readability, and creates a
          consistent visual language across the interface. Our type scale is
          designed to balance clarity and personality, with each style serving a
          specific role within the system.
        </p>
        <p>
          From expressive display styles to compact labels and captions,
          typography adapts across layouts while maintaining consistent spacing,
          weight, and rhythm.
        </p>
      </div>

      <div className="space-y-4">
        <SectionTitle as="h3">Type Faces</SectionTitle>

        <div className="grid max-md:gap-y-4 md:grid-cols-3 justify-between gap-x-6 ">
          <div className="grid grid-cols-2 font-sans p-6 items-center border-2 border-border primary-box-shadow">
            <p className="text-fs-600">Aa</p>
            <p className="font-extrabold">Instrument Sans</p>
          </div>

          <div className="grid grid-cols-2 font-mono px-6 items-center border-2 border-border primary-box-shadow">
            <p className="text-fs-600">Aa</p>
            <p className="font-extrabold">Chivo Mono</p>
          </div>

          <div className="grid grid-cols-2 font-cursive px-6 items-center border-2 border-border primary-box-shadow">
            <p className="text-fs-600">Aa</p>
            <p className="font-extrabold">Sue Ellen Francisco</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SectionTitle size="sm">Font sizes</SectionTitle>

        <Table>
          <TableCaption>Different font sizes</TableCaption>
          <TableHeader>
            <TableRow className="uppercase font-bold">
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Pixels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(fontSizes).map(([title, values]) => (
              <TableRow key={title}>
                <TableCell>{title}</TableCell>
                {Object.values(values).map((v, i) => (
                  <TableCell key={i}>{v}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <SectionTitle hasUnderline>Iconography</SectionTitle>
          <p>
            Icons provide a simple and recognizable visual language for
            communicating actions, navigation, status, and supporting
            information. The system uses icons from React Icons to maintain a
            consistent visual style across the interface.
          </p>

          <p>
            Icons should be clear, purposeful, and appropriately scaled to their
            surrounding content. They complement typography and UI elements
            without competing with the primary message.
          </p>
        </div>

        <Card className="rounded-none">
          <CardContent className="flex flex-wrap gap-2">
            {icons.map((icon, i) => {
              return (
                <span
                  key={i}
                  className="text-fs-600 p-1 border border-border/10"
                >
                  {icon}
                </span>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
};
