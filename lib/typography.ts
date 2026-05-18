/**
 * Typography utilities for consistent font usage across the project
 * Integrates all custom fonts including Brittany Signature
 */

export const typography = {
  // Signature/script fonts for special headings
  signature: {
    class: 'font-signature',
    style: { fontFamily: 'Brittany Signature, cursive' },
    description: 'Elegant signature font for special headings',
  },
  
  // Handwriting fonts
  handwrite: {
    class: 'font-handwrite',
    style: { fontFamily: 'Allura, cursive' },
    description: 'Handwriting style font',
  },

  // Display fonts
  serif: {
    class: 'font-serif',
    style: { fontFamily: 'Playfair Display, serif' },
    description: 'Elegant serif display font',
  },

  adlam: {
    class: 'font-noto-adlam',
    style: { fontFamily: 'Noto Sans Adlam, sans-serif' },
    description: 'Cultural display font',
  },

  // Body fonts
  sans: {
    class: 'font-sans',
    style: { fontFamily: 'Geist, sans-serif' },
    description: 'Default sans-serif body font',
  },

  noto: {
    class: 'font-noto-sans',
    style: { fontFamily: 'Noto Sans, sans-serif' },
    description: 'Noto Sans for better international support',
  },

  dm: {
    class: 'font-dm-sans',
    style: { fontFamily: 'DM Sans, sans-serif' },
    description: 'DM Sans geometric font',
  },
} as const;

/**
 * Preset combinations for common typography patterns
 */
export const typographyPresets = {
  // Main hero heading with signature font
  heroTitle: {
    className: 'text-4xl md:text-5xl lg:text-6xl font-signature leading-tight',
    style: {
      fontFamily: 'Brittany Signature, Allura, cursive',
      fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
    },
  },

  // Subheading with serif
  sectionHeading: {
    className: 'text-3xl md:text-4xl font-serif font-bold leading-tight',
  },

  // Body text default
  bodyText: {
    className: 'text-base md:text-lg leading-relaxed font-sans',
  },

  // Small text
  caption: {
    className: 'text-sm text-muted-foreground',
  },

  // Badge or label
  label: {
    className: 'text-xs font-medium uppercase tracking-wider',
  },
} as const;

/**
 * Get font style object by font key
 */
export function getTypography(
  fontKey: keyof typeof typography
) {
  return typography[fontKey];
}

/**
 * Get preset styles by preset name
 */
export function getPreset(
  presetKey: keyof typeof typographyPresets
) {
  return typographyPresets[presetKey];
}

/**
 * Merge typography class with additional classes
 */
export function mergeTypography(
  baseClass: string,
  additionalClasses?: string
): string {
  return additionalClasses ? `${baseClass} ${additionalClasses}` : baseClass;
}

/**
 * Create a typography config for a text element
 */
export interface TypographyConfig {
  font: keyof typeof typography;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'foreground' | 'muted' | 'primary' | 'accent' | 'secondary';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
  align?: 'left' | 'center' | 'right' | 'justify';
}

/**
 * Build typography class from config
 */
export function buildTypographyClass(config: TypographyConfig): string {
  const sizeClasses: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  const weightClasses: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const colorClasses: Record<string, string> = {
    foreground: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    accent: 'text-accent',
    secondary: 'text-secondary',
  };

  const lineHeightClasses: Record<string, string> = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  const alignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const fontTypography = typography[config.font];
  const classes = [fontTypography.class];

  if (config.size) classes.push(sizeClasses[config.size]);
  if (config.weight) classes.push(weightClasses[config.weight]);
  if (config.color) classes.push(colorClasses[config.color]);
  if (config.lineHeight) classes.push(lineHeightClasses[config.lineHeight]);
  if (config.align) classes.push(alignClasses[config.align]);

  return classes.join(' ');
}

/**
 * Example usage in components:
 * 
 * import { buildTypographyClass, getPreset, typography } from '@/lib/typography';
 * 
 * // Using preset
 * <h1 className={getPreset('heroTitle').className}>Cash Stuffing</h1>
 * 
 * // Using builder function
 * <h2 className={buildTypographyClass({
 *   font: 'signature',
 *   size: '3xl',
 *   color: 'primary',
 *   weight: 'bold'
 * })}>
 *   My Heading
 * </h2>
 * 
 * // Using direct typography object
 * <p style={typography.signature.style}>Direct style</p>
 * <p className={typography.sans.class}>Body text</p>
 */
