// Font family definitions for Builder.io integration
export const FONT_FAMILIES = {
  sans: ['Geist', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
  adlam: ['Noto Sans Adlam', 'sans-serif'],
  noto: ['Noto Sans', 'sans-serif'],
  dm: ['DM Sans', 'sans-serif'],
  handwrite: ['Allura', 'cursive'],
  signature: ['Brittany Signature', 'cursive'],
} as const;

// CSS classes for font selection (Tailwind utility classes)
export const FONT_CLASSES = {
  sans: 'font-sans',
  serif: 'font-serif',
  adlam: 'font-noto-adlam',
  noto: 'font-noto-sans',
  dm: 'font-dm-sans',
  handwrite: 'font-handwrite',
  signature: 'font-signature',
} as const;

// Font selection options for Builder.io dropdowns
export const BUILDER_FONT_OPTIONS = [
  { label: 'Geist', value: 'Geist, sans-serif' },
  { label: 'Playfair Display', value: 'Playfair Display, serif' },
  { label: 'Noto Sans Adlam', value: 'Noto Sans Adlam, sans-serif' },
  { label: 'Noto Sans', value: 'Noto Sans, sans-serif' },
  { label: 'DM Sans', value: 'DM Sans, sans-serif' },
  { label: 'Allura', value: 'Allura, cursive' },
  { label: 'Brittany Signature', value: 'Brittany Signature, cursive' },
] as const;

// Type-safe font getter
export function getFontFamily(fontKey: keyof typeof FONT_FAMILIES): string {
  return FONT_FAMILIES[fontKey].join(', ');
}

// Type-safe class getter
export function getFontClass(fontKey: keyof typeof FONT_CLASSES): string {
  return FONT_CLASSES[fontKey];
}
