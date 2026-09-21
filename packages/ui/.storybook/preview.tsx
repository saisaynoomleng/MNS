import type { Preview } from '@storybook/react-vite';

import { withThemeByClassName } from '@storybook/addon-themes';

import '@fontsource-variable/instrument-sans'; // Defaults to wght axis
import '@fontsource-variable/chivo-mono'; // Defaults to wght axis
import '@fontsource/sue-ellen-francisco'; // Defaults to weight 400

import './fonts.css';
import '../src/globals.css';

import { Toaster } from '../src/components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <>
        <Story />

        <Toaster
          richColors
          closeButton
          position="bottom-center"
          theme="system"
          duration={3000}
        />
      </>
    ),
  ],
};

export default preview;
