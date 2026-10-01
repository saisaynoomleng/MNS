import localFont from 'next/font/local';

export const instrument_sans = localFont({
  src: [
    {
      path: './fonts/sans/InstrumentSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/sans/InstrumentSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/sans/InstrumentSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/sans/InstrumentSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-instrument-sans',
});

export const sue_ellen_francisco = localFont({
  src: './fonts/cursive/SueEllenFrancisco-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-sue-ellen-francisco',
});

export const chivo_mono = localFont({
  src: [
    {
      path: './fonts/mono/ChivoMono-ExtraLight.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-Light.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-Thin.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/mono/ChivoMono-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-chivo-mono',
});
