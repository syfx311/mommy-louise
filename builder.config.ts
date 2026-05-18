import { defineConfig } from '@builder.io/sdk';

export const builderConfig = defineConfig({
  apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
  customFonts: [
    {
      name: 'Brittany Signature',
      family: 'Brittany Signature, cursive',
      css: `
        @font-face {
          font-family: 'Brittany Signature';
          src: url('/fonts/BrittanySignature.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `,
    },
    {
      name: 'Allura',
      family: 'Allura, cursive',
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
      `,
    },
  ],
  typography: {
    defaultFont: 'Geist',
    fonts: [
      'Geist',
      'Playfair Display',
      'Noto Sans Adlam',
      'Noto Sans',
      'DM Sans',
      'Allura',
      'Brittany Signature',
    ],
  },
});
