'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '#components/ui/button';

export function DarkModeToggle() {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      className="rounded-full border-none aspect-square bg-transparent! hover:bg-transparent!"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <Moon color="#0e79b2" className="size-6" />
      ) : (
        <Sun color="#f3a644" className="size-6" />
      )}
    </Button>
  );
}
