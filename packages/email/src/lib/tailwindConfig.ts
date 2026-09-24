import type { TailwindConfig } from 'react-email';
import { colors } from './colors.js';

export default {
  theme: {
    extend: {
      colors,
    },
    fontFamily: {
      header: ['Instrument Sans', 'sans-serif'],
      body: ['Chivo Mono', 'monospace'],
      hand: ['Sue Ellen Francisco', 'cursive'],
    },
  },
} satisfies TailwindConfig;
